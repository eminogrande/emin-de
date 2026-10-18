---
title: "microgpt.py von Karpathy, der Code auf Deutsch, Zeile für Zeile"
description: "Andrej Karpathys microgpt.py trainiert ein winziges GPT in reinem Python. Hier ist sein Code und was jeder Teil macht, in einfachem Deutsch."
date: "2026-02-15T21:45:00Z"
updated: "2026-02-15"
lang: de
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
tldr: ["Andrej Karpathys microgpt.py trainiert und betreibt ein winziges GPT in reinem Python, ohne NumPy.", "Dieser Post zeigt seinen Originalcode unverändert und erklärt ihn dann Schritt für Schritt in derselben Reihenfolge.", "Er behandelt den Zeichen-Tokenizer, eine kleine Autograd-Engine, den GPT-Forward-Pass, Adam-Training und Sampling."]
sections: [{"basically": "Karpathys komplettes microgpt.py, unverändert, als Referenz für alles Weitere unten."}, {"basically": "Das Modell liest Zeichen und sagt das nächste voraus, trainiert auf einer kleinen Textdatei mit Beispielen."}, {"basically": "Jede Zahl ist ein Value-Knoten, der sich an seine Eltern erinnert, damit Backprop den Graphen von Hand durchlaufen kann."}, {"basically": "Linear, Softmax und RMSNorm bauen ein GPT, das einen Token einbettet, Attention und ein MLP ausführt und Logits ausgibt."}, {"basically": "Jeder Schritt trainiert auf einem Namen mit NLL-Loss, Backprop und Adam. Dann sampelt das Modell neue Namen."}, {"basically": "Acht Schritte, vom Laden der Zeilen bis zur Sampling-Schleife, sind alles, was du brauchst, um es von Grund auf zu schreiben."}]
---
![](../../../media/microgpt-py-karpathy-the-code-in-plain-english-line-by-line/cover.jpg)

Andrej Karpathy hat `microgpt.py` geschrieben. Dieser Post geht den Code durch.

Es gibt hier zwei Dinge. Erstens seinen originalen `microgpt.py`-Code, so wie er ist. Und zweitens eine Erklärung in einfachem Englisch, wie das Ganze funktioniert, in derselben Reihenfolge wie der Code, damit du der Geschichte folgen kannst, auch wenn du kein Programmierer bist.

## Der originale Code

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

## Eine Anleitung, damit du es nachbauen kannst

Dieser Teil erklärt das Skript wie eine Bauanleitung, die du Schritt für Schritt nachvollziehen kannst. Wenn du Python lesen kannst und ein bisschen Grundalgebra beherrschst, solltest du das Programm danach komplett von Grund auf neu schreiben können. Es erklärt, was jeder Teil macht und warum er da ist, und es verbindet die Teile, damit du den ganzen Ablauf siehst: von den Daten zu den Tokens zum Modell zum Loss zu den Gradienten zum Optimizer und am Ende zum Sampling.

Schritt 0 ist das Ziel. Das Modell liest eine Sequenz von Tokens, das sind hier einfach Zeichen, und sagt das nächste Token voraus. Das Training bringt ihm bei, dem richtigen nächsten Zeichen eine hohe Wahrscheinlichkeit zu geben. Nach dem Training kannst du Zeichen für Zeichen samplen und bekommst neue Strings, die wie Namen aussehen.

Schritt 1 ist ein winziger Datensatz. Das Skript erwartet eine Textdatei `input.txt` mit einem Trainingsbeispiel pro Zeile. Wenn die Datei nicht da ist, lädt es einen klassischen Datensatz runter, eine Liste mit Namen. Dann mischt es sie durch, damit das Training nicht durch die Reihenfolge der Datei verzerrt wird.

Schritt 2 ist ein Zeichen-Tokenizer. Der Tokenizer ist absichtlich so klein wie möglich gehalten. Er sammelt jedes einzigartige Zeichen im Datensatz, gibt jedem eine Integer-ID und fügt ein spezielles Token namens BOS hinzu, für "beginning of sequence". Also sind die IDs `0..len(uchars)-1` die echten Zeichen und `BOS = len(uchars)` ist der spezielle Marker.

BOS ist da, weil es der Generierung ein bekanntes Token zum Starten gibt, und es markiert auch das Ende eines generierten Namens. Das Skript benutzt BOS für beides, Start und Stopp.

## Autograd und die Gewichte

Schritt 3 ist eine winzige Autograd-Engine. Alles im Modell ist aus kleinen Zahlenknoten gebaut, der `Value`-Klasse. Ein `Value` hält `data`, das ist die Zahl aus dem Forward-Pass, und `grad`, das ist d(loss)/d(this) aus dem Backward-Pass. Er behält auch Links zu seinen Kindern und die lokalen Ableitungen, die du für die Kettenregel brauchst.

Wenn du also Mathe wie `a*b + c` schreibst, baut der Code den Berechnungsgraphen von selbst.

Backprop funktioniert dann so. Zuerst baut es eine topologische Reihenfolge der Knoten, Kinder vor Eltern. Dann setzt es `loss.grad = 1`. Und dann läuft es die Knoten in umgekehrter Reihenfolge durch und reicht die Gradienten an die Kinder weiter. Es ist die gleiche Idee wie micrograd, nur direkt in diese Datei geschrieben.

Schritt 4 richtet die Startgewichte ein. Das Skript definiert ein winziges GPT mit ein paar Hyperparametern. `n_embd` ist die Embedding-Größe, also die Länge des Vektors pro Token. `n_head` ist die Anzahl der Attention-Heads, `n_layer` die Anzahl der Transformer-Layer und `block_size` der längste Kontext.

Dann erstellt es ein `state_dict` voller Matrizen, das sind Listen von Listen von `Value`. Es gibt Token-Embeddings `wte[vocab_size][n_embd]` und Positions-Embeddings `wpe[block_size][n_embd]`. Jeder Layer bekommt Attention-Gewichte (Wq, Wk, Wv, Wo) und MLP-Gewichte (fc1, fc2). Und da ist der Language-Model-Head `lm_head[vocab_size][n_embd]`, der den Hidden State in Logits verwandelt.

Alle Gewichte starten als kleine Zufallszahlen.

Das Wichtige ist, dass all das von Hand gemacht wird, kein NumPy. Es ist langsam, aber es ist der Algorithmus in seiner einfachsten Form.

## Die Mathe-Teile und der Forward-Pass

Schritt 5 ist die grundlegende Mathe. `linear(x, w)` macht eine Matrixmultiplikation. Der Input `x` ist ein Vektor der Länge `nin`, die Gewichte `w` sind eine Matrix `[nout][nin]`, und was rauskommt, ist ein Vektor der Länge `nout`.

Softmax verwandelt Logits in Wahrscheinlichkeiten. Es subtrahiert max(logit), damit die Zahlen stabil bleiben, dann nimmt es die Exponentialfunktion, dann teilt es durch die Summe. So summieren sich die Wahrscheinlichkeiten auf 1.

RMSNorm skaliert einen Vektor, damit seine durchschnittliche quadrierte Größe etwa 1 ist. Es berechnet das mittlere Quadrat `ms = mean(x_i^2)`, dann den Skalierungsfaktor `scale = 1/sqrt(ms + eps)`, und gibt `x * scale` zurück. Das hält das Training stabil.

Schritt 6 ist der GPT-Forward-Pass, eine Position nach der anderen. Die Funktion `gpt(token_id, pos_id, keys, values)` gibt dir Logits für das nächste Token.

Es startet mit den Embeddings. Es schaut das Token-Embedding `tok_emb = wte[token_id]` und das Positions-Embedding `pos_emb = wpe[pos_id]` nach, addiert sie als `x = tok_emb + pos_emb` und normalisiert mit `x = rmsnorm(x)`.

Dann kommen die Transformer-Blöcke, einmal für jeden Layer, und jeder Layer hat zwei Teile.

Der erste Teil ist Multi-Head-Self-Attention. Es erzeugt `q, k, v`, indem es lineare Layer auf `x` anwendet, und es hängt `k, v` an den laufenden Cache `keys[layer]` und `values[layer]` an. Dann schneidet es für jeden Head die Dimensionen dieses Heads raus, berechnet Attention-Scores als dot(q, k_t) / sqrt(d), lässt Softmax über die Scores laufen, um Gewichte zu bekommen, und nimmt eine gewichtete Summe der v's als Head-Output. Alle Head-Outputs werden zusammengefügt, die Output-Projektion `Wo` kommt oben drauf, und eine Residual-Verbindung addiert den Input wieder dazu.

Der zweite Teil ist das MLP. Das ist einfach fc1, dann ReLU, dann fc2, und wieder eine Residual-Verbindung.

Die Form ist also immer ein Vektor der Länge `n_embd`.

Am Ende gibt `logits = lm_head * x` einen Logit pro Token im Vokabular, und `softmax` verwandelt diese Logits in Wahrscheinlichkeiten.

## Training und Namen machen

Schritt 7 ist die Trainingsschleife, also wie es lernt. Jeder Trainingsschritt benutzt ein Dokument, also einen Namen.

Zuerst tokenisiert es ihn. Der Code macht eine Token-Liste wie `[BOS] + [char ids for doc] + [BOS]` und nimmt bis zu `block_size` Übergänge daraus. Wenn die Tokens also `t0, t1, t2, ...` sind, trainiert es auf Paaren, Input `t0` mit Ziel `t1`, Input `t1` mit Ziel `t2`, und so weiter.

Dann berechnet der Forward-Pass den Loss. Für jede Position lässt es `gpt(token_id, pos_id, keys, values)` laufen, lässt Softmax laufen, um `probs` zu bekommen, nimmt die Wahrscheinlichkeit, die es dem richtigen `target_id` gegeben hat, und der Loss ist die negative Log-Likelihood `-log(probs[target_id])`. Der Durchschnitt über alle Positionen ist der finale `loss`.

Dann der Backward-Pass. `loss.backward()` läuft den Graphen durch und füllt den Gradienten für jeden Parameter-`Value`.

Und dann das Adam-Update. Adam hält zwei gleitende Durchschnitte pro Parameter, `m`, das erste Moment oder mittlerer Gradient, und `v`, das zweite Moment oder mittlerer quadrierter Gradient. Es korrigiert den Bias mit `m_hat` und `v_hat` und aktualisiert dann mit `p.data -= lr * m_hat / (sqrt(v_hat) + eps)`. Es benutzt auch eine Lernrate, die über die Schritte linear abnimmt.

Schritt 8 ist Inference, also wie es Namen erzeugt. Nach dem Training sampled das Skript Namen so. Es startet mit `token_id = BOS`. Dann lässt es für jede Position bis zu `block_size` den GPT-Forward laufen, teilt die Logits durch `temperature`, lässt Softmax laufen, um Wahrscheinlichkeiten zu bekommen, und sampled die nächste Token-ID daraus. Wenn das Token BOS ist, hört es auf, weil das das Ende des Namens ist. Wenn nicht, hängt es das passende Zeichen an.

Das gibt dir 20 erfundene, halluzinierte Namen.

## Wenn du es nachbauen willst

Hier ist das Gerüst, das du von Grund auf schreiben könntest. 1) die Datensatz-Zeilen laden, 2) das Vokabular plus BOS bauen, 3) `Value` und `backward()` schreiben, 4) die Gewichte im `state_dict` einrichten, 5) `linear`, `softmax` und `rmsnorm` schreiben, 6) `gpt()` schreiben, also Embeddings, dann Blöcke, dann Logits, 7) die Trainingsschleife, tokenisieren, den NLL-Loss berechnen, Backprop und das Adam-Update machen, und 8) die Sampling-Schleife, die ein Token nach dem anderen generiert.
