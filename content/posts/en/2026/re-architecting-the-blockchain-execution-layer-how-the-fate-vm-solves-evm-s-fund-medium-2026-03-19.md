---
title: "Re-architecting the Blockchain Execution Layer, How the FATE VM Solves EVM’s Fundamental Flaws"
description: "How Erik Stenman built FATE, a typed VM that makes contracts about ten times smaller and three times faster than on the EVM."
date: "2026-03-19T03:55:43.287Z"
updated: "2026-03-19T03:55:43.287Z"
lang: "en"
category: "building"
format: "essay"
author: "emin"
provenance: "mixed"
ai_assisted: true
reviewed_by_human: false
source: "medium"
third_party_summary: false
cover: "../../../media/re-architecting-the-blockchain-execution-layer-how-the-fate-vm-solves-evm-s-fund-medium-2026-03-19/01-eec7f941.png"
voice_check:
  em_dash: 2
  unobserved: 205
emin_check_pct: null
voice_rewrite: "v1"
review_status: "draft-emin-voice"
original_url: "https://medium.com/@em/re-architecting-the-blockchain-execution-layer-how-the-fate-vm-solves-evms-fundamental-flaws-ddcb8f74b251"
tldr:
  - "Dr. Erik Stenman built FATE, a typed VM for Aeternity, to fix the design flaws of the EVM."
  - "FATE drops flat memory and arbitrary jumps and puts typed variables, functions, big integers and maps into the VM."
  - "In Stenman's benchmark the bytecode is about 9.6 times smaller and runs three times faster than on the EVM."
basically:
  why-the-evm-needs-fixing: "An untyped stack machine with flat memory and raw 256-bit words gives bloated, slow and unsafe contracts."
  typed-variables-instead-of-flat-memory: "No raw memory pointers. FATE variables carry their own type tag, and negative names write to state."
  functions-instead-of-arbitrary-jumps: "Callers name a typed function, and code is only basic blocks, so invalid jumps cannot happen."
  high-level-data-types-and-maps-in-the-vm: "Big integers, tuples, lists, chain types and maps live in the VM, so compilers skip the boilerplate."
  the-results: "About 9.6 times smaller bytecode, three times faster execution and lower gas for the end user."
---
If you read this article and feel interested in working with me, Emin Mahrt, on similar amazing things, please feel free to contact me via emin@nuri.com. The following article is based our past work, re-architecting Ethereums EVM. I was just a spectator, but it was one of the most interesting things in the past years to follow, and listen to, so i thought its a nice thing to share it here for others.

<https://www.youtube.com/watch?v=a77DGGzMyN8>

## Why the EVM needs fixing

When you look at the Ethereum Virtual Machine (EVM) from the side of language design and low-level runtime safety, you see a lot of bottlenecks in the architecture. The EVM is an untyped, stack-based machine with a flat memory model, and it relies heavily on low-level byte manipulation, arbitrary jumps and raw 256-bit words. That worked to bootstrap the early smart contract ecosystem, but these design choices led to bloated bytecode, slow execution and frequent security holes.

In a technical deep dive, Dr. Erik Stenman explains the architecture of the Fast Aeternity Transaction Engine (FATE), a high-level, strongly-typed virtual machine built to fix the old mistakes of the EVM. By rethinking how a blockchain VM handles state, memory and code execution, Stenman and his team got an execution environment where the compiled code is virtually 10 times smaller and runs 3 times faster than the EVM equivalent before it.

This is what Stenman did to make the Ethereum EVM paradigm better.

## Typed variables instead of flat memory

One of the most dangerous things about the EVM is that it relies on raw memory pointers. In the EVM, smart contracts read and write raw bytes to a linear memory array, and that can easily end in out-of-bounds errors, pointer aliasing, or reading the bytes as a different data structure than the one they really are.

Stenman took flat memory out of the VM completely. Instead of memory addresses, FATE uses variables, separate storage slots that live locally in the scope of a function. A storage slot in FATE doesn't limit the size of the data it holds, and the data carries its own type tag. If a slot holds a boolean, the VM guarantees it will only be read as a boolean (`true` or `false`), so the ambiguity of "0 or 1" integer evaluations is gone.

FATE also abstracts the work with the state tree. It uses a special class of variables with "negative names" (for example `-1`, `-2`). Writing to a negative variable schedules a write to the persistent state tree of the contract. So developers don't have to manage complex storage pointers by hand, like the `SLOAD` and `SSTORE` key derivations in the EVM.

## Functions instead of arbitrary jumps

Control flow in the EVM relies heavily on Program Counters (PC) and arbitrary jumps. A smart contract on the EVM starts executing at address `0x00` and works as one giant monolithic block of code, where jump tables route execution to a specific function based on a 4-byte function selector.

FATE treats functions and type signatures as native, first-class things at the VM level. Execution doesn't start at an arbitrary `0x00` entry point anymore. A caller names the exact function and passes typed arguments, and the VM checks these arguments against the strict type signature of the function before execution even starts.

Inside a function, FATE represents code only as a sequence of basic blocks. There is no raw "code memory" you can manipulate or jump into. A basic block is just a list of instructions in order, and as soon as you need branching, execution moves cleanly to a new, clearly marked basic block. So the "invalid jump destination" bugs that are typical for EVM bytecode are impossible by structure.

## High-level data types and maps in the VM

The EVM natively knows exactly one data type, a 256-bit word. To work with strings, lists, arrays or arbitrarily large numbers, the compiler has to inject thousands of lines of assembly to pad bytes, manage pointers and compute lengths.

FATE puts complex data types directly into the VM runtime, and that cuts bytecode bloat and execution overhead a lot. Instead of a hardcoded 256-bit limit, which risks overflows or forces you to include expensive SafeMath libraries, FATE supports integers of infinite size natively. It handles Tuples, Lists and Variant Types (for example Optional types) natively. And blockchain things like Addresses, Contracts, Oracles and State Channels are native, heavily optimized types in FATE. When you work with them, the VM runs native opcodes that plug directly into the transaction mechanics of the node, and it skips the massive overhead of EVM external calls.

In the EVM, storing mappings (key-value stores) means you hash the key with the position of the storage slot to get a random 256-bit storage address. That makes iterating over mappings impossible, and reads and writes are relatively expensive. Stenman designed Maps as a separate thing, handled outside the normal variable storage. FATE allows local memory maps, but state maps are stored efficiently right inside the Aeternity state tree. A developer works with the map naturally, and the FATE engine defers and batches the real reads and writes to the state tree and only reads exactly the elements you asked for.

## The results

By removing flat memory, adding native high-level types and strict basic-block control flow, Stenman cut out the massive compiler boilerplate that plagues EVM smart contracts. The results in Stenman’s benchmark are big. FATE contract bytecode is about 9.6 times smaller (roughly 10% of the size) than the same contract compiled for an EVM architecture. And because the VM spends zero cycles on parsing padding bytes, calculating memory offsets or running monolithic jump routing, FATE runs three times faster and the gas costs for the end user go down a lot.

![](../../../media/re-architecting-the-blockchain-execution-layer-how-the-fate-vm-solves-evm-s-fund-medium-2026-03-19/01-eec7f941.png)
