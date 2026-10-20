---
title: "microgpt.py ya Karpathy: tunavunja kodi mstari kwa mstari kwa lugha rahisi"
description: "microgpt.py ya Andrej Karpathy inatumia Python tupu kuunda GPT ndogo. Hapa tunaichambua kodi hiyo kipande kwa kipande ili uielewe vizuri."
date: "2026-02-15T21:45:00Z"
updated: "2026-02-15"
lang: sw
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
tldr: ["microgpt.py ya Andrej Karpathy inafundisha na kuendesha GPT ndogo kwa kutumia Python ya kawaida bila hata NumPy.", "Posti hii inaonyesha kodi yake ya asili, kisha tunaichambua hatua kwa hatua.", "Tutagusia tokenizer ya herufi, injini ndogo ya autograd, forward pass ya GPT, mafunzo ya Adam na jinsi ya kutoa majibu (sampling)."]
sections: [{"basically": "Hii hapa ni microgpt.py ya Karpathy kama ilivyo, itumie kama rejea yako wakati tunachambua sehemu zake."}, {"basically": "Modeli hii inajifunza herufi ili ibashiri herufi inayofuata, ikitumia faili ndogo ya maandishi kama mfano."}, {"basically": "Kila namba ni node ya Value inayokumbuka wazazi wake ili backprop iweze kupita kwenye grafu bila maktaba za ziada."}, {"basically": "Linear, softmax, na RMSNorm ndizo zinazounda msingi wa GPT hii, ikichakata attention na MLP ili kutoa logits."}, {"basically": "Modeli inajifunza kwa hatua kwa hatua, ikitumia NLL loss, backprop na Adam, kisha inatengeneza majina mapya."}, {"basically": "Kuna hatua nane tu, kuanzia kupakia data hadi loop ya sampling, ndizo unazohitaji ili kuiandika kuanzia mwanzo."}]
---
![](../../../media/microgpt-py-karpathy-the-code-in-plain-english-line-by-line/cover.jpg)

Andrej Karpathy ametengeneza `microgpt.py`. Posti hii inakuchambulia kodi hiyo hatua kwa hatua.

Kuna mambo mawili hapa. Kwanza ni kodi yenyewe ya `microgpt.py`, kama ilivyo. Pili ni maelezo ya kirahisi ya jinsi inavyofanya kazi, kwa mtiririko uleule wa kodi, ili uweze kuelewa hata kama wewe siyo programu (programmer).

## The original code

```python
"""
Njia ya msingi kabisa ya kutrain na kutumia GPT kwenye Python safi, bila kuweka madependency yoyote.
Faili hili lina algorithm nzima.
Vingine vyote ni kwa ajili ya kuongeza ufanisi tu.

@karpathy
"""

import os       # os.path.exists
import math     # math.log, math.exp
import random   # random.seed, random.choices, random.gauss, random.shuffle
random.seed(42) # Acha utaratibu utawale kwenye fujo

# Wacha tuwe na dataset ya input `docs`: list[str] ya nyaraka (mfano: orodha ya majina)
if not os.path.exists('input.txt'):
    import urllib.request
    names_url = 'https://raw.githubusercontent.com/karpathy/makemore/refs/heads/master/names.txt'
    urllib.request.urlretrieve(names_url, 'input.txt')
docs = [l.strip() for l in open('input.txt').read().strip().split('\n') if l.strip()] # list[str] ya nyaraka
random.shuffle(docs)
print(f"num docs: {len(docs)}")

# Wacha tuwe na Tokenizer ya kutafsiri maandishi kuwa alama (tokens) na kurudisha nyuma
uchars = sorted(set(''.join(docs))) # herufi za kipekee kwenye dataset zinakuwa token ids 0..n-1
BOS = len(uchars) # token id kwa ajili ya alama maalum ya kuanzia (Beginning of Sequence - BOS)
vocab_size = len(uchars) + 1 # jumla ya tokens za kipekee, +1 ni kwa ajili ya BOS
print(f"vocab size: {vocab_size}")

# Wacha tuwe na Autograd, ya kufanya chain rule kupitia computation graph
class Value:
    __slots__ = ('data', 'grad', '_children', '_local_grads') # Python optimization kwa ajili ya memory

    def __init__(self, data, children=(), local_grads=()):
        self.data = data                # thamani ya nodi hii iliyohesabiwa wakati wa forward pass
        self.grad = 0                   # derivative ya loss kuhusiana na nodi hii, iliyohesabiwa kwenye backward pass
        self._children = children       # watoto wa nodi hii kwenye computation graph
        self._local_grads = local_grads # derivative ya ndani ya nodi hii kuhusiana na watoto wake

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

# Initialize parameters, ili kuhifadhi maarifa ya modeli.
n_embd = 16     # embedding dimension
n_head = 4      # idadi ya attention heads
n_layer = 1     # idadi ya layers
block_size = 16 # urefu wa juu wa sequence
head_dim = n_embd // n_head # dimension ya kila head
matrix = lambda nout, nin, std=0.08: [[Value(random.gauss(0, std)) for _ in range(nin)] for _ in range(nout)]
state_dict = {'wte': matrix(vocab_size, n_embd), 'wpe': matrix(block_size, n_embd), 'lm_head': matrix(vocab_size, n_embd)}
for i in range(n_layer):
    state_dict[f'layer{i}.attn_wq'] = matrix(n_embd, n_embd)
    state_dict[f'layer{i}.attn_wk'] = matrix(n_embd, n_embd)
    state_dict[f'layer{i}.attn_wv'] = matrix(n_embd, n_embd)
    state_dict[f'layer{i}.attn_wo'] = matrix(n_embd, n_embd)
    state_dict[f'layer{i}.mlp_fc1'] = matrix(4 * n_embd, n_embd)
    state_dict[f'layer{i}.mlp_fc2'] = matrix(n_embd, 4 * n_embd)
params = [p for mat in state_dict.values() for row in mat for p in row] # flatten params kuwa single list[Value]
print(f"num params: {len(params)}")

# Define architecture ya modeli: function isiyohifadhi state inayochora token sequence na params kwenda kwenye logits.
# Fuata GPT-2, iliyobarikiwa kati ya ma-GPT, na tofauti ndogo: layernorm -> rmsnorm, hakuna biases, GeLU -> ReLU
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
    x = [t + p for t, p in zip(tok_emb, pos_emb)] # joint token na position embedding
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

# Wacha tuwe na Adam, optimizer aliyebarikiwa na buffers zake
learning_rate, beta1, beta2, eps_adam = 0.01, 0.85, 0.99, 1e-8
m = [0.0] * len(params) # first moment buffer
v = [0.0] * len(params) # second moment buffer

# Rudia kwenye sequence
num_steps = 1000 # idadi ya steps za training
for step in range(num_steps):

    # Chukua dokumenti moja, iweke kwenye tokens, izungushie alama ya BOS pande zote
    doc = docs[step % len(docs)]
    tokens = [BOS] + [uchars.index(ch) for ch in doc] + [BOS]
    n = min(block_size, len(tokens) - 1)

    # Pitisha token sequence kupitia modeli, ukijenga computation graph hadi kwenye loss.
    keys, values = [[] for _ in range(n_layer)], [[] for _ in range(n_layer)]
    losses = []
    for pos_id in range(n):
        token_id, target_id = tokens[pos_id], tokens[pos_id + 1]
        logits = gpt(token_id, pos_id, keys, values)
        probs = softmax(logits)
        loss_t = -probs[target_id].log()
        losses.append(loss_t)
    loss = (1 / n) * sum(losses) # final average loss juu ya dokumenti sequence. Na iwe ndogo kwako.

    # Rudisha loss nyuma (backward), ukihesabu gradients kuhusiana na parameters zote za modeli.
    loss.backward()

    # Adam optimizer update: update parameters za modeli kulingana na gradients husika.
    lr_t = learning_rate * (1 - step / num_steps) # linear learning rate decay
    for i, p in enumerate(params):
        m[i] = beta1 * m[i] + (1 - beta1) * p.grad
        v[i] = beta2 * v[i] + (1 - beta2) * p.grad ** 2
        m_hat = m[i] / (1 - beta1 ** (step + 1))
        v_hat = v[i] / (1 - beta2 ** (step + 1))
        p.data -= lr_t * m_hat / (v_hat ** 0.5 + eps_adam)
        p.grad = 0

    print(f"step {step+1:4d} / {num_steps:4d} | loss {loss.data:.4f}")

# Inference: modeli na iweze kuongea nasi
temperature = 0.5 # kati ya (0, 1], dhibiti "ubunifu" wa maandishi yaliyotengenezwa, chini kwenda juu
print("\n--- inference (majina mapya, ya kubuni) ---")
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

## Mwongozo wa kuijenga upya

Sehemu hii inaelezea script hii kama ujenzi unaouangalia hatua kwa hatua. Kama unaelewa Python na unajua angalau algebra ya msingi, unapaswa kuweza kuandika programu hii upya kuanzia mwanzo baada ya kusoma hapa. Inaelezea kila sehemu inafanya nini na kwa nini iko hapo, na inaunganisha sehemu hizo ili uone mtiririko mzima, kuanzia data, kwenda kwenye token, model, loss, gradients, optimizer na mwishowe kwenye sampling.

Step 0 ni lengo. Model inasoma mfuatano wa token, ambazo hapa ni herufi tu, na kutabiri token inayofuata. Mafunzo yanaijenga ili ipe nafasi kubwa ya uwezekano (probability) kwa herufi sahihi inayofuata. Baada ya mafunzo, unaweza kusample herufi moja baada ya nyingine na kupata maneno mapya yanayoonekana kama majina.

Step 1 ni dataset ndogo. Script inahitaji faili la maandishi `input.txt` lenye mfano mmoja wa mafunzo kila mstari. Kama faili hilo halipo, inapakua dataset ya kawaida, orodha ya majina. Kisha inachanganya ili mafunzo yasipendelee mpangilio wa faili.

Step 2 ni character tokenizer. Tokenizer imewekwa ndogo iwezekanavyo kwa makusudi. Inakusanya kila herufi ya kipekee kwenye dataset, inampa kila moja namba ya kitambulisho (id), na inaongeza token moja maalum inayoitwa BOS, kwa ajili ya "beginning of sequence". Kwa hivyo id `0..len(uchars)-1` ni herufi halisi na `BOS = len(uchars)` ni alama maalum.

BOS iko hapo kwa sababu inapa generation token moja inayojulikana ya kuanzia, na pia inaashiria mwisho wa jina lililotengenezwa. Script inatumia BOS kwa ajili ya kuanzia na kusimama.

## Autograd na uzito (weights)

Step 3 ni engine ndogo ya autograd. Kila kitu kwenye model kimejengwa kutokana na nodes ndogo za namba, darasa la `Value`. `Value` inashikilia `data`, ambayo ni namba kutoka kwenye forward pass, na `grad`, ambayo ni d(loss)/d(hii) kutoka kwenye backward pass. Pia inatunza viungo vya watoto wake na derivatives za ndani unazohitaji kwa chain rule.

Kwa hivyo unapoandika hesabu kama `a*b + c`, code inajijengea computation graph yenyewe.

Backprop inafanya kazi hivi: Kwanza inajenga mpangilio wa topological wa nodes, watoto kabla ya wazazi. Kisha inaweka `loss.grad = 1`. Na kisha inatembea kwenye nodes kwa mpangilio wa kinyume na kupitisha gradients chini kwa watoto. Ni wazo lilelile la micrograd, limeandikwa tu moja kwa moja kwenye faili hili.

Step 4 inaweka uzito (weights) wa kuanzia. Script inafafanua GPT ndogo yenye hyperparameters chache. `n_embd` ni ukubwa wa embedding, yaani urefu wa vector kwa kila token. `n_head` ni idadi ya attention heads, `n_layer` ni idadi ya transformer layers, na `block_size` ni urefu wa muktadha (context).

Kisha inatengeneza `state_dict` iliyojaa matrices, ambazo ni orodha za orodha za `Value`. Kuna token embeddings `wte[vocab_size][n_embd]` na position embeddings `wpe[block_size][n_embd]`. Kila layer inapata uzito wa attention (Wq, Wk, Wv, Wo) na uzito wa MLP (fc1, fc2). Na kuna language model head `lm_head[vocab_size][n_embd]`, ambayo inageuza hidden state kuwa logits.

Uzito wote unaanza kama namba ndogo za bahati nasibu.

Kitu muhimu ni kwamba yote haya yanafanywa kwa mkono, hakuna NumPy. Inakwenda polepole, lakini ndiyo algorithm katika hali yake rahisi zaidi.

## Sehemu za hesabu na forward pass

Step 5 ni sehemu za msingi za hesabu. `linear(x, w)` inafanya matrix multiply. Input `x` ni vector ya urefu `nin`, uzito `w` ni matrix `[nout][nin]`, na kinachotoka ni vector ya urefu `nout`.

Softmax inageuza logits kuwa probabilities. Inatoa max(logit) ili namba zibaki imara, kisha inachukua exponent, kisha inagawanya kwa jumla. Kwa hivyo probabilities zinajumlishwa kuwa 1.

RMSNorm inaskali vector ili ukubwa wake wa wastani wa mraba uwe karibu na 1. Inahesabu mean square `ms = mean(x_i^2)`, kisha scale `scale = 1/sqrt(ms + eps)`, na kutoa `x * scale`. Hii inafanya mafunzo kuwa imara.

Step 6 ni GPT forward pass, sehemu moja kwa wakati mmoja. Function `gpt(token_id, pos_id, keys, values)` inakupa logits kwa ajili ya token inayofuata.

Inaanza na embeddings. Inatafuta token embedding `tok_emb = wte[token_id]` na position embedding `pos_emb = wpe[pos_id]`, inaziunganisha kama `x = tok_emb + pos_emb` na kuzisawazisha na `x = rmsnorm(x)`.

Kisha zinakuja transformer blocks, mara moja kwa kila layer, na kila layer ina sehemu mbili.

Sehemu ya kwanza ni multi-head self-attention. Inatengeneza `q, k, v` kwa kuendesha linear layers kwenye `x`, na inaongeza `k, v` kwenye cache inayotembea `keys[layer]` na `values[layer]`. Kisha kwa kila head inakata vipimo vya head hiyo, inahesabu attention scores kama dot(q, k_t) / sqrt(d), inaendesha softmax kwenye scores kupata uzito, na kuchukua weighted sum ya v's kama head output. Outputs zote za head zinaunganishwa pamoja, output projection `Wo` inafanyika juu, na residual connection inaongeza input tena.

Sehemu ya pili ni MLP. Hiyo ni fc1 tu, kisha ReLU, kisha fc2, na tena residual connection.

Kwa hivyo umbo ni vector ya urefu `n_embd` kila wakati.

Mwishoni, `logits = lm_head * x` inatoa logit moja kwa kila token kwenye vocab, na `softmax` inageuza logits hizo kuwa probabilities.

## Mafunzo na kutengeneza majina

Step 7 ni training loop, kwa hivyo jinsi inavyojifunza. Kila hatua ya mafunzo inatumia document moja, kwa hivyo jina moja.

Kwanza inaitoa token. Code inatengeneza token list kama `[BOS] + [char ids for doc] + [BOS]` na kuchukua transitions hadi `block_size` kutoka humo. Kwa hivyo kama tokens ni `t0, t1, t2, ...`, inafundisha kwa jozi, input `t0` na target `t1`, input `t1` na target `t2`, na kuendelea.

Kisha forward pass inahesabu loss. Kwa kila nafasi inaendesha `gpt(token_id, pos_id, keys, values)`, inaendesha softmax kupata `probs`, inachukua probability iliyotoa kwa `target_id` sahihi, na loss ni negative log likelihood `-log(probs[target_id])`. Wastani wa kila kitu ni `loss` ya mwisho.

Kisha backward pass. `loss.backward()` inatembea kwenye graph na kujaza gradient kwa kila parameter ya `Value`.

Na kisha Adam update. Adam inatunza moving averages mbili kwa kila parameter, `m`, moment ya kwanza au mean gradient, na `v`, moment ya pili au mean squared gradient. Inasahihisha bias na `m_hat` na `v_hat` na kisha inafanya update na `p.data -= lr * m_hat / (sqrt(v_hat) + eps)`. Pia inatumia learning rate inayoshuka kwenye mstari mnyoofu kulingana na hatua.

Step 8 ni inference, kwa hivyo jinsi inavyotengeneza majina. Baada ya mafunzo, script inasample majina hivi: Inaanza na `token_id = BOS`. Kisha kwa kila nafasi hadi `block_size` inaendesha GPT forward, inagawanya logits kwa `temperature`, inaendesha softmax kupata probabilities, na kusample token id inayofuata kutoka hapo. Kama token ni BOS inasimama, kwa sababu huo ndio mwisho wa jina. Kama siyo, inaongeza herufi inayolingana.

Hiyo inakupa majina 20 ya kubuni, yaliyohallucinated.

## Kama unataka kuijenga upya

Huu hapa ni mchoro unaoweza kuandika kuanzia mwanzo: 1) pakia mistari ya dataset, 2) jenga vocab pamoja na BOS, 3) andika `Value` na `backward()`, 4) weka uzito (weights) kwenye `state_dict`, 5) andika `linear`, `softmax` na `rmsnorm`, 6) andika `gpt()`, yaani embeddings, kisha blocks, kisha logits, 7) training loop, tokenize, hesabu NLL loss, backprop na fanya Adam update, na 8) sampling loop, inayozalisha token moja baada ya nyingine.
