---
title: "Karpathy'nin microgpt.py'si, kodun Türkçe açıklaması, satır satır"
description: "Andrej Karpathy'nin microgpt.py'si saf Python'da minicik bir GPT eğitiyor. İşte onun kodu ve her parçanın ne yaptığı, sade bir dille."
date: "2026-02-15T21:45:00Z"
updated: "2026-02-15"
lang: tr
translated_from: "en/microgpt-py-karpathy-the-code-in-plain-english-line-by-line"
source_sections: ["the-original-code", "a-walkthrough-so-you-can-build-it-again", "autograd-and-the-weights", "the-math-parts-and-the-forward-pass", "training-and-making-names", "if-you-want-to-build-it-again"]
category: agents-ai
format: guide
author: ai-desk
provenance: ai_generated
ai_assisted: true
reviewed_by_human: false
image: "/media/microgpt-py-karpathy-the-code-in-plain-english-line-by-line/cover.webp"
third_party_summary: true
tldr: ["Andrej Karpathy'nin microgpt.py'si NumPy'sız, düz Python'da minicik bir GPT eğitiyor ve çalıştırıyor.", "Bu yazı onun orijinal kodunu olduğu gibi gösteriyor, sonra aynı sırayla adım adım açıklıyor.", "Karakter tokenizer'ını, küçük bir autograd motorunu, GPT forward pass'ini, Adam eğitimini ve örnekleme kısmını kapsıyor."]
sections: [{"basically": "Karpathy'nin tam microgpt.py'si, değiştirilmeden, aşağıdaki her şeyin referansı olarak."}, {"basically": "Model karakterleri okuyor ve bir sonrakini tahmin ediyor, örneklerle dolu küçük bir metin dosyasıyla eğitiliyor."}, {"basically": "Her sayı, ebeveynlerini hatırlayan bir Value düğümü, böylece backprop grafı elle gezebiliyor."}, {"basically": "Linear, softmax ve RMSNorm bir GPT oluşturuyor: token'ı gömüyor, attention ve MLP çalıştırıyor ve logit'ler veriyor."}, {"basically": "Her adım bir isim üzerinde NLL loss, backprop ve Adam ile eğitiliyor. Sonra model yeni isimler örneklüyor."}, {"basically": "Sekiz adım, satırları yüklemekten örnekleme döngüsüne kadar, sıfırdan yazmak için ihtiyacın olan her şey."}]
---
![](../../../media/microgpt-py-karpathy-the-code-in-plain-english-line-by-line/cover.jpg)

Andrej Karpathy `microgpt.py`'yi yazdı. Bu yazıda onu adım adım anlatıyorum.

Burada iki şey var. Birincisi, onun orijinal `microgpt.py` kodu, olduğu gibi. İkincisi de nasıl çalıştığının sade bir dille açıklaması, kodla aynı sırayla, böylece programcı olmasan bile hikayeyi takip edebilirsin.

## Orijinal kod

```python
"""
The most atomic way to train and inference a GPT in pure, dependency-free Python.
This file is the complete algorithm.
Everything else is just efficiency.

@karpathy
"""

import os       # os.path.exists
import math     # math.log, math.exp
import random   # random.seed, random.choices, random.gauss, random.shuffle
random.seed(42) # Let there be order among chaos

# Let there be an input dataset `docs`: list[str] of documents (e.g. a dataset of names)
if not os.path.exists('input.txt'):
    import urllib.request
    names_url = 'https://raw.githubusercontent.com/karpathy/makemore/refs/heads/master/names.txt'
    urllib.request.urlretrieve(names_url, 'input.txt')
docs = [l.strip() for l in open('input.txt').read().strip().split('\n') if l.strip()] # list[str] of documents
random.shuffle(docs)
print(f"num docs: {len(docs)}")

# Let there be a Tokenizer to translate strings to discrete symbols and back
uchars = sorted(set(''.join(docs))) # unique characters in the dataset become token ids 0..n-1
BOS = len(uchars) # token id for the special Beginning of Sequence (BOS) token
vocab_size = len(uchars) + 1 # total number of unique tokens, +1 is for BOS
print(f"vocab size: {vocab_size}")

# Let there be Autograd, to recursively apply the chain rule through a computation graph
class Value:
    __slots__ = ('data', 'grad', '_children', '_local_grads') # Python optimization for memory usage

    def __init__(self, data, children=(), local_grads=()):
        self.data = data                # scalar value of this node calculated during forward pass
        self.grad = 0                   # derivative of the loss w.r.t. this node, calculated in backward pass
        self._children = children       # children of this node in the computation graph
        self._local_grads = local_grads # local derivative of this node w.r.t. its children

    def __add__(self, other):
        other = other if isinstance(other, Value) else Value(other)
        return Value(self.data + other.data, (self, other), (1, 1))

    def __mul__(self, other):
        other = other if isinstance(other, Value) else Value(other)
        return Value(self.data * other.data, (self, other), (other.data, self.data))

    def __pow__(self, other): return Value(self.data**other, (self,), (other * self.data**(other-1),))
    def log(self): return Value(math.log(self.data), (self,), (1/self.data,))
    def exp(self): return Value(math.exp(self.data), (self,), (math.exp(self.data),))
    def relu(self): return Value(max(0, self.data), (self,), (float(self.data > 0),))
    def __neg__(self): return self * -1
    def __radd__(self, other): return self + other
    def __sub__(self, other): return self + (-other)
    def __rsub__(self, other): return other + (-self)
    def __rmul__(self, other): return self * other
    def __truediv__(self, other): return self * other**-1
    def __rtruediv__(self, other): return other * self**-1

    def backward(self):
        topo = []
        visited = set()
        def build_topo(v):
            if v not in visited:
                visited.add(v)
                for child in v._children:
                    build_topo(child)
                topo.append(v)
        build_topo(self)
        self.grad = 1
        for v in reversed(topo):
            for child, local_grad in zip(v._children, v._local_grads):
                child.grad += local_grad * v.grad

# Initialize the parameters, to store the knowledge of the model.
n_embd = 16     # embedding dimension
n_head = 4      # number of attention heads
n_layer = 1     # number of layers
block_size = 16 # maximum sequence length
head_dim = n_embd // n_head # dimension of each head
matrix = lambda nout, nin, std=0.08: [[Value(random.gauss(0, std)) for _ in range(nin)] for _ in range(nout)]
state_dict = {'wte': matrix(vocab_size, n_embd), 'wpe': matrix(block_size, n_embd), 'lm_head': matrix(vocab_size, n_embd)}
for i in range(n_layer):
    state_dict[f'layer{i}.attn_wq'] = matrix(n_embd, n_embd)
    state_dict[f'layer{i}.attn_wk'] = matrix(n_embd, n_embd)
    state_dict[f'layer{i}.attn_wv'] = matrix(n_embd, n_embd)
    state_dict[f'layer{i}.attn_wo'] = matrix(n_embd, n_embd)
    state_dict[f'layer{i}.mlp_fc1'] = matrix(4 * n_embd, n_embd)
    state_dict[f'layer{i}.mlp_fc2'] = matrix(n_embd, 4 * n_embd)
params = [p for mat in state_dict.values() for row in mat for p in row] # flatten params into a single list[Value]
print(f"num params: {len(params)}")

# Define the model architecture: a stateless function mapping token sequence and parameters to logits over what comes next.
# Follow GPT-2, blessed among the GPTs, with minor differences: layernorm -> rmsnorm, no biases, GeLU -> ReLU
def linear(x, w):
    return [sum(wi * xi for wi, xi in zip(wo, x)) for wo in w]

def softmax(logits):
    max_val = max(val.data for val in logits)
    exps = [(val - max_val).exp() for val in logits]
    total = sum(exps)
    return [e / total for e in exps]

def rmsnorm(x):
    ms = sum(xi * xi for xi in x) / len(x)
    scale = (ms + 1e-5) ** -0.5
    return [xi * scale for xi in x]

def gpt(token_id, pos_id, keys, values):
    tok_emb = state_dict['wte'][token_id] # token embedding
    pos_emb = state_dict['wpe'][pos_id] # position embedding
    x = [t + p for t, p in zip(tok_emb, pos_emb)] # joint token and position embedding
    x = rmsnorm(x)

    for li in range(n_layer):
        # 1) Multi-head attention block
        x_residual = x
        x = rmsnorm(x)
        q = linear(x, state_dict[f'layer{li}.attn_wq'])
        k = linear(x, state_dict[f'layer{li}.attn_wk'])
        v = linear(x, state_dict[f'layer{li}.attn_wv'])
        keys[li].append(k)
        values[li].append(v)
        x_attn = []
        for h in range(n_head):
            hs = h * head_dim
            q_h = q[hs:hs+head_dim]
            k_h = [ki[hs:hs+head_dim] for ki in keys[li]]
            v_h = [vi[hs:hs+head_dim] for vi in values[li]]
            attn_logits = [sum(q_h[j] * k_h[t][j] for j in range(head_dim)) / head_dim**0.5 for t in range(len(k_h))]
            attn_weights = softmax(attn_logits)
            head_out = [sum(attn_weights[t] * v_h[t][j] for t in range(len(v_h))) for j in range(head_dim)]
            x_attn.extend(head_out)
        x = linear(x_attn, state_dict[f'layer{li}.attn_wo'])
        x = [a + b for a, b in zip(x, x_residual)]
        # 2) MLP block
        x_residual = x
        x = rmsnorm(x)
        x = linear(x, state_dict[f'layer{li}.mlp_fc1'])
        x = [xi.relu() for xi in x]
        x = linear(x, state_dict[f'layer{li}.mlp_fc2'])
        x = [a + b for a, b in zip(x, x_residual)]

    logits = linear(x, state_dict['lm_head'])
    return logits

# Let there be Adam, the blessed optimizer and its buffers
learning_rate, beta1, beta2, eps_adam = 0.01, 0.85, 0.99, 1e-8
m = [0.0] * len(params) # first moment buffer
v = [0.0] * len(params) # second moment buffer

# Repeat in sequence
num_steps = 1000 # number of training steps
for step in range(num_steps):

    # Take single document, tokenize it, surround it with BOS special token on both sides
    doc = docs[step % len(docs)]
    tokens = [BOS] + [uchars.index(ch) for ch in doc] + [BOS]
    n = min(block_size, len(tokens) - 1)

    # Forward the token sequence through the model, building up the computation graph all the way to the loss.
    keys, values = [[] for _ in range(n_layer)], [[] for _ in range(n_layer)]
    losses = []
    for pos_id in range(n):
        token_id, target_id = tokens[pos_id], tokens[pos_id + 1]
        logits = gpt(token_id, pos_id, keys, values)
        probs = softmax(logits)
        loss_t = -probs[target_id].log()
        losses.append(loss_t)
    loss = (1 / n) * sum(losses) # final average loss over the document sequence. May yours be low.

    # Backward the loss, calculating the gradients with respect to all model parameters.
    loss.backward()

    # Adam optimizer update: update the model parameters based on the corresponding gradients.
    lr_t = learning_rate * (1 - step / num_steps) # linear learning rate decay
    for i, p in enumerate(params):
        m[i] = beta1 * m[i] + (1 - beta1) * p.grad
        v[i] = beta2 * v[i] + (1 - beta2) * p.grad ** 2
        m_hat = m[i] / (1 - beta1 ** (step + 1))
        v_hat = v[i] / (1 - beta2 ** (step + 1))
        p.data -= lr_t * m_hat / (v_hat ** 0.5 + eps_adam)
        p.grad = 0

    print(f"step {step+1:4d} / {num_steps:4d} | loss {loss.data:.4f}")

# Inference: may the model babble back to us
temperature = 0.5 # in (0, 1], control the "creativity" of generated text, low to high
print("\n--- inference (new, hallucinated names) ---")
for sample_idx in range(20):
    keys, values = [[] for _ in range(n_layer)], [[] for _ in range(n_layer)]
    token_id = BOS
    sample = []
    for pos_id in range(block_size):
        logits = gpt(token_id, pos_id, keys, values)
        probs = softmax([l / temperature for l in logits])
        token_id = random.choices(range(vocab_size), weights=[p.data for p in probs])[0]
        if token_id == BOS:
            break
        sample.append(uchars[token_id])
    print(f"sample {sample_idx+1:2d}: {''.join(sample)}")
```

## Tekrar inşa edebilmen için adım adım anlatım

Bu bölüm, scripti adım adım izlediğin bir inşa gibi anlatıyor. Python okuyabiliyorsan ve biraz temel cebir biliyorsan, bunu bitirdiğinde programı sıfırdan yazabiliyor olmalısın. Her parçanın ne yaptığını ve neden orada olduğunu anlatıyor, parçaları birbirine bağlıyor ki bütün akışı gör: veriden tokenlara, oradan modele, loss'a, gradyanlara, optimizere ve en sonunda örneklemeye kadar.

Adım 0 hedef. Model bir token dizisini okuyor, burada tokenlar sadece karakterler, ve bir sonraki tokenı tahmin ediyor. Eğitim, modele doğru bir sonraki karaktere yüksek olasılık vermeyi öğretiyor. Eğitimden sonra karakterleri tek tek örnekleyip isimlere benzeyen yeni stringler üretebiliyorsun.

Adım 1 minicik bir veri seti. Script her satırda bir eğitim örneği olan `input.txt` adında bir metin dosyası istiyor. Dosya yoksa klasik bir veri setini indiriyor, bir isim listesi. Sonra bunları karıştırıyor, böylece eğitim dosyanın sırasından etkilenip yanlı olmuyor.

Adım 2 bir karakter tokenizerı. Tokenizer bilerek olabildiğince küçük tutuluyor. Veri setindeki her benzersiz karakteri topluyor, her birine bir tam sayı id veriyor ve bir de BOS adında özel bir token ekliyor, "beginning of sequence" yani dizinin başlangıcı. Yani `0..len(uchars)-1` idleri gerçek karakterler, `BOS = len(uchars)` ise özel işaret.

BOS orada çünkü üretime bilinen bir tokenla başlama noktası veriyor ve aynı zamanda üretilen ismin sonunu da işaretliyor. Script BOS'u hem başlangıç hem bitiş için kullanıyor.

## Autograd ve ağırlıklar

Adım 3 minicik bir autograd motoru. Modeldeki her şey küçük sayı düğümlerinden, `Value` sınıfından inşa ediliyor. Bir `Value`, `data` tutuyor, bu forward passtaki sayı, bir de `grad` tutuyor, bu da backward passtaki d(loss)/d(bu). Ayrıca çocuklarına olan bağlantıları ve zincir kuralı için gereken yerel türevleri de saklıyor.

Yani `a*b + c` gibi bir matematik yazdığında, kod hesaplama grafiğini kendiliğinden kuruyor.

Backprop şöyle çalışıyor. Önce düğümlerin topolojik sırasını oluşturuyor, çocuklar ebeveynlerden önce. Sonra `loss.grad = 1` yapıyor. Ardından düğümleri ters sırada geziyor ve gradyanları çocuklara aşağı doğru aktarıyor. Micrograd ile aynı fikir, sadece doğrudan bu dosyanın içine yazılmış.

Adım 4 başlangıç ağırlıklarını kuruyor. Script birkaç hiperparametreyle minik bir GPT tanımlıyor. `n_embd` embedding boyutu, yani token başına vektörün uzunluğu. `n_head` attention head sayısı, `n_layer` transformer katmanı sayısı ve `block_size` en uzun bağlam.

Sonra `Value` listelerinin listeleri olan matrislerle dolu bir `state_dict` oluşturuyor. Token embeddingleri `wte[vocab_size][n_embd]` ve pozisyon embeddingleri `wpe[block_size][n_embd]` var. Her katman attention ağırlıkları (Wq, Wk, Wv, Wo) ve MLP ağırlıkları (fc1, fc2) alıyor. Bir de `lm_head[vocab_size][n_embd]` var, dil modeli başı, gizli durumu logitlere çeviriyor.

Bütün ağırlıklar küçük rastgele sayılar olarak başlıyor.

Önemli olan şu ki, bunların hepsi elle yapılıyor, NumPy yok. Yavaş, ama algoritmanın en basit hali bu.

## Matematik parçaları ve forward pass

Adım 5 temel matematik parçaları. `linear(x, w)` bir matris çarpımı yapıyor. Girdi `x`, uzunluğu `nin` olan bir vektör, ağırlıklar `w` ise `[nout][nin]` boyutunda bir matris ve çıkan şey uzunluğu `nout` olan bir vektör.

Softmax logitleri olasılıklara çeviriyor. Sayılar stabil kalsın diye max(logit) çıkarıyor, sonra üstel alıyor, sonra toplama bölüyor. Böylece olasılıkların toplamı 1 oluyor.

RMSNorm bir vektörü ölçekliyor ki ortalama karesel büyüklüğü yaklaşık 1 olsun. Ortalama kareyi hesaplıyor `ms = mean(x_i^2)`, sonra ölçeği `scale = 1/sqrt(ms + eps)`, ve `x * scale` döndürüyor. Bu eğitimi stabil tutuyor.

Adım 6 GPT forward passi, her seferinde bir pozisyon. `gpt(token_id, pos_id, keys, values)` fonksiyonu sana bir sonraki token için logitleri veriyor.

Embeddinglerle başlıyor. Token embeddingine bakıyor `tok_emb = wte[token_id]` ve pozisyon embeddingine `pos_emb = wpe[pos_id]`, bunları topluyor `x = tok_emb + pos_emb` ve normalize ediyor `x = rmsnorm(x)`.

Sonra transformer blokları geliyor, her katman için bir kere, ve her katmanın iki parçası var.

İlk parça multi-head self-attention. `x` üzerinde lineer katmanlar çalıştırarak `q, k, v` üretiyor ve `k, v`'yi çalışan önbelleğe, `keys[layer]` ve `values[layer]`'a ekliyor. Sonra her head için o head'in boyutlarını kesip alıyor, attention skorlarını dot(q, k_t) / sqrt(d) olarak hesaplıyor, skorlara softmax uygulayıp ağırlıkları buluyor ve head çıktısı olarak v'lerin ağırlıklı toplamını alıyor. Bütün head çıktıları birleştiriliyor, üstüne çıktı projeksiyonu `Wo` geliyor ve bir residual bağlantı girdiyi geri ekliyor.

İkinci parça MLP. O da sadece fc1, sonra ReLU, sonra fc2, ve yine bir residual bağlantı.

Yani şekil her zaman uzunluğu `n_embd` olan bir vektör.

En sonda `logits = lm_head * x` vocabdaki her token için bir logit veriyor ve `softmax` bu logitleri olasılıklara çeviriyor.

## Eğitim ve isim üretme

Adım 7 eğitim döngüsü, yani nasıl öğrendiği. Her eğitim adımı bir doküman kullanıyor, yani bir isim.

Önce tokenize ediyor. Kod `[BOS] + [doc için char idler] + [BOS]` gibi bir token listesi yapıyor ve bundan `block_size`'a kadar geçiş alıyor. Yani tokenlar `t0, t1, t2, ...` ise, çiftler halinde eğitiyor, girdi `t0` hedef `t1`, girdi `t1` hedef `t2`, ve böyle devam ediyor.

Sonra forward pass lossu hesaplıyor. Her pozisyon için `gpt(token_id, pos_id, keys, values)` çalıştırıyor, softmax ile `probs` elde ediyor, doğru `target_id`'ye verdiği olasılığı alıyor ve loss negatif log olabilirlik `-log(probs[target_id])` oluyor. Tüm pozisyonların ortalaması son `loss`u veriyor.

Sonra backward pass. `loss.backward()` grafı geziyor ve her parametre `Value`sunun gradyanını dolduruyor.

Ve sonra Adam güncellemesi. Adam parametre başına iki hareketli ortalama tutuyor, `m`, birinci moment yani ortalama gradyan, ve `v`, ikinci moment yani ortalama karesel gradyan. Sapmayı `m_hat` ve `v_hat` ile düzeltiyor ve sonra `p.data -= lr * m_hat / (sqrt(v_hat) + eps)` ile güncelliyor. Ayrıca adımlar boyunca düz bir çizgide azalan bir öğrenme oranı kullanıyor.

Adım 8 inference, yani isimleri nasıl ürettiği. Eğitimden sonra script isimleri şöyle örnekliyor. `token_id = BOS` ile başlıyor. Sonra `block_size`'a kadar her pozisyon için GPT forward çalıştırıyor, logitleri `temperature`'a bölüyor, softmax ile olasılıkları buluyor ve bunlardan bir sonraki token idyi örnekliyor. Token BOS ise duruyor, çünkü ismin sonu bu. Değilse, eşleşen karakteri ekliyor.

Bu da sana 20 tane uydurma, halüsinasyon isim veriyor.

## Tekrar inşa etmek istersen

İşte sıfırdan yazabileceğin iskelet. 1) veri seti satırlarını yükle, 2) vocabı ve BOS'u kur, 3) `Value` ve `backward()` yaz, 4) `state_dict` içinde ağırlıkları kur, 5) `linear`, `softmax` ve `rmsnorm` yaz, 6) `gpt()` yaz, yani embeddingler, sonra bloklar, sonra logitler, 7) eğitim döngüsü, tokenize et, NLL lossu hesapla, backprop yap ve Adam güncellemesini uygula, ve 8) örnekleme döngüsü, bir tokenı diğerinin ardından üreten.
