---
title: "microgpt.py by Karpathy, the code in plain English, line by line"
description: "Andrej Karpathy's microgpt.py trains a tiny GPT in pure Python. Here is his code and what every part does, in plain English."
date: "2026-02-15T21:45:00Z"
updated: "2026-02-15T21:45:00Z"
lang: "en"
category: "agents-ai"
format: "guide"
author: "ai-desk"
provenance: "ai_generated"
ai_assisted: true
voice_rewrite: "v1"
review_status: "draft-emin-voice"
reviewed_by_human: false
source: "emino.app"
third_party_summary: true
cover: "../../../media/microgpt-py-karpathy-the-code-in-plain-english-line-by-line/cover.webp"
voice_check:
  em_dash: 0
  unobserved: 234
emin_check_pct: null
original_url: "https://emino.app/posts/microgpt-karpathy-line-by-line/"
---
![](../../../media/microgpt-py-karpathy-the-code-in-plain-english-line-by-line/cover.jpg)

Andrej Karpathy wrote `microgpt.py`. This post walks through it.

There are two things here. First his original `microgpt.py` code, as is. And second a plain English explanation of how it works, in the same order as the code, so you can follow the story even if you're not a programmer.

## The original code

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

## A walkthrough, so you can build it again

This part explains the script like a build you watch step by step. If you can read Python and a bit of basic algebra, you should be able to write the program again from scratch after this. It explains what each part does and why it's there, and it connects the parts so you see the whole flow, from data to tokens to the model to the loss to the gradients to the optimizer and in the end to sampling.

Step 0 is the goal. The model reads a sequence of tokens, which here are just characters, and predicts the next token. Training teaches it to give a high probability to the right next character. After training you can sample characters one by one and get new strings that look like names.

Step 1 is a tiny dataset. The script wants a text file `input.txt` with one training example per line. If the file isn't there, it downloads a classic dataset, a list of names. Then it shuffles them, so the training doesn't get biased by the order of the file.

Step 2 is a character tokenizer. The tokenizer is kept as small as possible on purpose. It collects every unique character in the dataset, gives each one an integer id, and adds one special token called BOS, for "beginning of sequence". So the ids `0..len(uchars)-1` are the real characters and `BOS = len(uchars)` is the special marker.

BOS is there because it gives generation one known token to start from, and it also marks the end of a generated name. The script uses BOS for both start and stop.

Step 3 is a tiny autograd engine. Everything in the model is built from small number nodes, the `Value` class. A `Value` holds `data`, which is the number from the forward pass, and `grad`, which is d(loss)/d(this) from the backward pass. It also keeps links to its children and the local derivatives you need for the chain rule.

So when you write math like `a*b + c`, the code builds the computation graph by itself.

Backprop then works like this. First it builds a topological order of the nodes, children before parents. Then it sets `loss.grad = 1`. And then it walks the nodes in reverse order and passes the gradients down to the children. It's the same idea as micrograd, just written right into this file.

Step 4 sets up the starting weights. The script defines a tiny GPT with a few hyperparameters. `n_embd` is the embedding size, so the length of the vector per token. `n_head` is the number of attention heads, `n_layer` the number of transformer layers and `block_size` the longest context.

Then it makes a `state_dict` full of matrices, which are lists of lists of `Value`. There are token embeddings `wte[vocab_size][n_embd]` and position embeddings `wpe[block_size][n_embd]`. Every layer gets attention weights (Wq, Wk, Wv, Wo) and MLP weights (fc1, fc2). And there's the language model head `lm_head[vocab_size][n_embd]`, which turns the hidden state into logits.

All weights start as small random numbers.

The important thing is that all of this is done by hand, no NumPy. It's slow, but it's the algorithm in its simplest form.

Step 5 is the basic math parts. `linear(x, w)` does a matrix multiply. The input `x` is a vector of length `nin`, the weights `w` are a matrix `[nout][nin]`, and what comes out is a vector of length `nout`.

Softmax turns logits into probabilities. It subtracts max(logit) so the numbers stay stable, then takes the exponent, then divides by the sum. So the probabilities add up to 1.

RMSNorm scales a vector so its average squared size is about 1. It computes the mean square `ms = mean(x_i^2)`, then the scale `scale = 1/sqrt(ms + eps)`, and gives back `x * scale`. This keeps training stable.

Step 6 is the GPT forward pass, one position at a time. The function `gpt(token_id, pos_id, keys, values)` gives you logits for the next token.

It starts with the embeddings. It looks up the token embedding `tok_emb = wte[token_id]` and the position embedding `pos_emb = wpe[pos_id]`, adds them up as `x = tok_emb + pos_emb` and normalizes with `x = rmsnorm(x)`.

Then come the transformer blocks, once for each layer, and each layer has two parts.

The first part is multi-head self-attention. It makes `q, k, v` by running linear layers on `x`, and it appends `k, v` to the running cache `keys[layer]` and `values[layer]`. Then for each head it cuts out that head's dimensions, computes attention scores as dot(q, k_t) / sqrt(d), runs softmax on the scores to get weights, and takes a weighted sum of the v's as the head output. All head outputs get joined together, the output projection `Wo` goes on top, and a residual connection adds the input back.

The second part is the MLP. That's just fc1, then ReLU, then fc2, and again a residual connection.

So the shape is always a vector of length `n_embd`.

At the end, `logits = lm_head * x` gives one logit per token in the vocab, and `softmax` turns those logits into probabilities.

Step 7 is the training loop, so how it learns. Every training step uses one document, so one name.

First it tokenizes it. The code makes a token list like `[BOS] + [char ids for doc] + [BOS]` and takes up to `block_size` transitions from it. So if the tokens are `t0, t1, t2, ...`, it trains on pairs, input `t0` with target `t1`, input `t1` with target `t2`, and so on.

Then the forward pass computes the loss. For each position it runs `gpt(token_id, pos_id, keys, values)`, runs softmax to get `probs`, takes the probability it gave to the right `target_id`, and the loss is the negative log likelihood `-log(probs[target_id])`. The average over all positions is the final `loss`.

Then the backward pass. `loss.backward()` walks the graph and fills in the gradient for every parameter `Value`.

And then the Adam update. Adam keeps two moving averages per parameter, `m`, the first moment or mean gradient, and `v`, the second moment or mean squared gradient. It corrects the bias with `m_hat` and `v_hat` and then updates with `p.data -= lr * m_hat / (sqrt(v_hat) + eps)`. It also uses a learning rate that goes down in a straight line over the steps.

Step 8 is inference, so how it makes names. After training the script samples names like this. It starts with `token_id = BOS`. Then for each position up to `block_size` it runs the GPT forward, divides the logits by `temperature`, runs softmax to get probabilities and samples the next token id from them. If the token is BOS it stops, because that's the end of the name. If not, it appends the matching character.

That gives you 20 made up, hallucinated names.

## If you want to build it again

Here's the skeleton you could write from scratch. 1) load the dataset lines, 2) build the vocab plus BOS, 3) write `Value` and `backward()`, 4) set up the weights in `state_dict`, 5) write `linear`, `softmax` and `rmsnorm`, 6) write `gpt()`, so embeddings, then blocks, then logits, 7) the training loop, tokenize, compute the NLL loss, backprop and do the Adam update, and 8) the sampling loop, which generates one token after the other.
