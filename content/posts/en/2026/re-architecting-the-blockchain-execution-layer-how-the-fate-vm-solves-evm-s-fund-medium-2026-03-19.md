---
title: "Re-architecting the Blockchain Execution Layer: How the FATE VM Solves EVM’s Fundamental Flaws"
description: "If you read this article and feel interested in working with me, Emin Mahrt, on similar amazing things, please feel free to contact me via emin@nuri.com —..."
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
original_url: "https://medium.com/@em/re-architecting-the-blockchain-execution-layer-how-the-fate-vm-solves-evms-fundamental-flaws-ddcb8f74b251"
---
If you read this article and feel interested in working with me, Emin Mahrt, on similar amazing things, please feel free to contact me via emin@nuri.com — the following article is based our past work, re-architecting Ethereums EVM. I was just a spectator, but it was one of the most interesting things in the past years to follow, and listen to, so i thought its a nice thing to share it here for others.

<https://www.youtube.com/watch?v=a77DGGzMyN8>

When evaluating the Ethereum Virtual Machine (EVM) from the perspective of language design and low-level runtime safety, numerous architectural bottlenecks become apparent. The EVM operates as an untyped, stack-based machine with a flat memory model, relying heavily on low-level byte manipulation, arbitrary jumps, and raw 256-bit words. While effective in bootstrapping the early smart contract ecosystem, these design choices have led to bloated bytecode, inefficient execution, and frequent security vulnerabilities.

In a technical deep dive, Dr. Erik Stenman outlines the architecture of the **Fast Aeternity Transaction Engine (FATE)**, a high-level, strongly-typed virtual machine explicitly designed to rectify the historical missteps of the EVM. By fundamentally reimagining how a blockchain VM handles state, memory, and code execution, Stenman and his team achieved an execution environment that is virtually 10 times smaller in compiled code size and 3 times faster than its EVM-equivalent predecessor.

Here is a technical breakdown of what Stenman did to make the “Ethereum EVM paradigm” better.

## 1. Eliminating Flat Memory in Favor of Typed Storage Variables

One of the most dangerous attributes of the EVM is its reliance on raw memory pointers. In the EVM, smart contracts read and write raw bytes to a linear memory array, which can easily result in out-of-bounds errors, pointer aliasing, or misinterpreting the actual data structures those bytes represent.

**The FATE Solution:** Stenman stripped flat memory out of the VM entirely. Instead of memory addresses, FATE uses **variables** — distinct storage slots that exist locally within a function’s scope.

- **Dynamic Typing & Tagging:** A storage slot in FATE does not restrict the size of the data it holds. The data inherently carries its type tag. If a slot holds a boolean, the VM guarantees it will only be evaluated as a boolean (`true` or `false`), stripping away the ambiguity of "0 or 1" integer evaluations.
- **Negative Variables for State Management:** FATE abstracts state tree interactions by using a specialized class of variables designated with “negative names” (e.g., `-1`, `-2`). Writing to a negative variable inherently schedules a write to the contract's persistent state tree. This abstraction prevents developers from having to manually manage complex storage pointers (like the `SLOAD`/`SSTORE` key derivations in the EVM).

## 2. First-Class Functions Over Arbitrary Jumps

The EVM’s control flow relies heavily on Program Counters (PC) and arbitrary jumps. A smart contract deployed to the EVM executes starting from address `0x00`, functioning as a giant monolithic block of code where the user relies on jump tables to route execution to a specific function based on a 4-byte function selector.

**The FATE Solution:** FATE treats **functions** and **type signatures** as native, first-class entities at the VM level.

- **Type-Checked Invocations:** Execution no longer begins at an arbitrary `0x00` entry point. A caller specifies the exact function name and passes typed arguments. The VM intercepts this at the entry level, verifying the caller's arguments against the function's strict type signature before execution even begins.
- **Basic Blocks Control Flow:** Inside a function, FATE represents code strictly as a sequence of basic blocks. There is no raw “code memory” to manipulate or arbitrarily jump into. A basic block is simply a list of sequential instructions. As soon as branching logic is required, execution cleanly transitions to a new, definitively marked basic block, making the “invalid jump destination” vulnerabilities characteristic of EVM bytecode structurally impossible.

## 3. Native High-Level Data Types

The EVM natively understands exactly one data type: a 256-bit word. Operating on strings, lists, arrays, or arbitrarily large numbers requires thousands of lines of compiler-injected assembly to pad bytes, manage pointers, and compute lengths.

**The FATE Solution:** By embedding complex data types directly into the VM runtime, FATE aggressively reduces bytecode bloat and execution overhead. FATE includes native support for:

- **Unbounded Integers:** Rather than hardcoding a 256-bit limit (which risks overflows or forces expensive SafeMath library inclusions), FATE supports infinite-size integers natively.
- **Constructed Types:** FATE handles Tuples, Lists, and Variant Types (e.g., Optional types) natively.
- **First-Class Chain Primitives:** Blockchain-specific constructs like Addresses, Contracts, Oracles, and State Channels are heavily optimized, native types in FATE. When interacting with these elements, the VM executes native opcodes that plug directly into the node’s underlying transaction mechanics, completely bypassing the massive overhead of EVM external calls.

## 4. Optimized State Map Abstractions

In the EVM, storing mappings (key-value stores) requires hashing the key with the storage slot position to derive a random 256-bit storage address. This makes iterating over mappings impossible and reads/writes relatively expensive.

**The FATE Solution:** Stenman designed Maps as a distinct entity handled outside standard variable storage. While FATE allows local memory maps, state maps are stored directly inside the Aeternity state tree efficiently. Crucially, a developer interacts with the map naturally, but the FATE engine defers and batches the actual reads and writes to the state tree only reading exactly the elements requested.

## Conclusion: The Performance Yield

By removing flat memory, implementing native high-level types, and introducing strict basic-block control flow, Stenman managed to cut out the massive compiler boilerplate that plagues EVM smart contracts.

The results shown in Stenman’s benchmark are profound: FATE contract bytecode is approximately **9.6 times smaller** (roughly 10% the size) than the identical contract compiled for an EVM architecture. Consequently, because the VM spends zero cycles parsing padding bytes, calculating memory offsets, or executing monolithic jump routing, FATE runs **three times faster** while significantly lowering the gas costs for the end user.

![](../../../media/re-architecting-the-blockchain-execution-layer-how-the-fate-vm-solves-evm-s-fund-medium-2026-03-19/01-eec7f941.png)
