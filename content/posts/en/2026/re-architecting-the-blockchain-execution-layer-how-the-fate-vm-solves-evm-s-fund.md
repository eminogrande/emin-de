---
title: "How the FATE VM fixes the basic flaws of the EVM"
description: "Erik Stenman built FATE, a typed VM without flat memory or raw jumps. Contracts get about 10 times smaller and run 3 times faster than on the EVM."
date: "2026-03-19T03:50:15Z"
updated: "2026-03-19T03:50:15Z"
lang: "en"
category: "building"
format: "essay"
author: "ai-desk"
provenance: "ai_generated"
ai_assisted: true
reviewed_by_human: false
source: "emino.app"
third_party_summary: false
voice_check:
  em_dash: 0
  unobserved: 181
emin_check_pct: 54
voice_rewrite: "v1"
review_status: "draft-emin-voice"
original_url: "https://emino.app/posts/re-architecting-the-blockchain-execution-layer-how-the-fate-/"
---
If you look at the Ethereum Virtual Machine (EVM) like a
language designer, and you care about safety down at the
runtime level, you see a lot of problems in how it's built.

The EVM is an untyped stack machine with flat memory. It works
with low-level byte handling, jumps to anywhere and raw
256-bit words. That was good enough to get the first smart
contracts going, but it also gave us bloated bytecode, slow
execution and a lot of security bugs.

In a technical deep dive Dr. Erik Stenman explains how the
Fast Aeternity Transaction Engine (FATE) is built. It's a
high-level, strongly typed virtual machine and it was made on
purpose to fix the old mistakes of the EVM.

Stenman and his team rethought how a blockchain VM handles
state, memory and running code, and they got a VM where the
compiled code is about 10 times smaller and runs 3 times
faster than the EVM version before it.

So here is what Stenman did to make the "Ethereum EVM
paradigm" better.

The first thing is memory. One of the most dangerous parts of
the EVM is that it works with raw memory pointers. Smart
contracts read and write raw bytes into one long memory array,
and that easily gives you out-of-bounds errors, pointer
aliasing, or bytes that get read as the wrong data structure.

Stenman just took flat memory out of the VM. FATE has no
memory addresses, it has variables, separate storage slots
that live locally inside the scope of a function. A slot
doesn't limit how big the data in it is, and the data always
carries its own type tag.

If a slot holds a boolean, the VM makes sure it's only ever
read as a boolean (`true` or `false`), so there is no more
guessing with "0 or 1" integers.

For state FATE uses a special kind of variable with "negative
names", like `-1` or `-2`. When you write to a negative
variable, the VM schedules a write to the persistent state
tree of the contract.

So developers don't have to handle complex storage pointers by
hand anymore, like the `SLOAD` and `SSTORE` key derivations in
the EVM.

The second thing is control flow. The EVM depends on program
counters (PC) and jumps to any place in the code. A contract
on the EVM starts running at address `0x00`, it's one giant
block of code, and it uses jump tables to get to the right
function based on a 4-byte function selector.

FATE makes functions and type signatures real first-class
things inside the VM. Execution doesn't start at some `0x00`
entry point anymore. The caller names the exact function and
passes typed arguments, and the VM checks these arguments
against the strict type signature of the function before
anything runs.

Inside a function FATE keeps the code as a list of basic
blocks and nothing else. There is no raw "code memory" you can
change or jump into. A basic block is just a list of
instructions that run one after the other.

As soon as you need a branch, execution moves to a new basic
block that is clearly marked. So the "invalid jump
destination" bugs you know from EVM bytecode just can't happen
by design.

The third thing is data types. The EVM knows exactly one data
type, a 256-bit word. If you want strings, lists, arrays or
really big numbers, the compiler has to inject thousands of
lines of assembly to pad bytes, handle pointers and count
lengths.

FATE puts complex data types right into the VM runtime, and
that cuts a lot of bytecode bloat and execution cost. FATE has
integers with no size limit, so no hard 256-bit cap that can
overflow or that forces you to pull in an expensive SafeMath
library.

It handles tuples, lists and variant types (for example
optional types) natively. And blockchain things like
addresses, contracts, oracles and state channels are native
and very optimized types in FATE.

When you work with them the VM runs native opcodes that plug
right into the transaction mechanics of the node, so you skip
all the overhead of external calls in the EVM.

The fourth thing is maps. In the EVM a mapping (a key-value
store) works by hashing the key together with the storage slot
position, and that gives a random 256-bit storage address.

So you can't iterate over a mapping, and reads and writes are
quite expensive. Stenman made maps their own thing, handled
outside the normal variable storage. FATE lets you have local
memory maps, but state maps sit directly and efficiently
inside the Aeternity state tree.

A developer just uses the map like a normal map, and the FATE
engine waits and batches the real reads and writes to the
state tree, and it only reads exactly the elements you ask
for.

So by taking out flat memory, adding native high-level types
and using strict basic-block control flow, Stenman got rid of
the huge compiler boilerplate that EVM smart contracts are
full of.

The numbers in his benchmark are big. FATE bytecode is about
9.6 times smaller (roughly 10% of the size) than the same
contract compiled for the EVM. And because the VM spends zero
cycles on padding bytes, memory offsets or one big jump
routing, FATE runs three times faster and gas gets a lot
cheaper for the user.

<p><img src="/media/re-architecting-the-blockchain-execution-layer-how-the-fate-/cover.webp" alt="cover"></p>
