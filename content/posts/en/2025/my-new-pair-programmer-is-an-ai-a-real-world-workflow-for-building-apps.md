---
title: "My New Pair Programmer is an AI: A Real-World Workflow for Building Apps"
description: "The world of software development is buzzing with the promise of AI. We see demos of complex applications being built in minutes from a single prompt. But..."
date: "2025-06-30T10:44:48.609Z"
updated: "2025-06-30T10:44:48.609Z"
lang: "en"
category: "agents-ai"
format: "essay"
author: "ai-desk"
provenance: "ai_generated"
ai_assisted: true
reviewed_by_human: false
canonical: "https://medium.com/@em/my-new-pair-programmer-is-an-ai-a-real-world-workflow-for-building-apps-041b168cb1cb"
source: "medium"
third_party_summary: false
voice_check:
  em_dash: 5
  unobserved: 103
emin_check_pct: null
---
The world of software development is buzzing with the promise of AI. We see demos of complex applications being built in minutes from a single prompt. But what does the day-to-day reality look like for a developer using these tools? How do you go from a bug to a bug-fix, from an idea to a feature, when your primary collaborator is an AI?

I spent a day building and fixing an iOS application using an AI-powered coding assistant. The process was a fascinating, frustrating, and ultimately productive dance between human instruction and artificial intelligence. This is a real-world look at that workflow — the good, the bad, and the buggy.

## The Core Workflow: From Prompt to Push

My process for working with the AI has evolved into a clear, iterative cycle. It’s less about writing code and more about being an expert director.

### Step 1: See It, Circle It, Ship It to the AI

It starts with a visual bug. In my app, the “Add Money” button wasn’t working, while a similar “Top-up” button worked perfectly. Instead of diving into the code, my first step was documentation.

1. **Screenshot:** I take a screenshot of the app screen on my phone.
1. **Annotate:** Using a simple editing tool, I circle the broken “Add Money” button and the working “Top-up” button. This visual context is invaluable for the AI.
1. **Copy & Paste:** With my phone connected to my computer, I copy the annotated screenshot and paste it directly into the AI assistant’s chat. The AI can *see* what I’m talking about.

*(Note: This is a descriptive placeholder for a visual element described in the text.)*

### Step 2: Write the Instruction in Plain English

Next, I become an instructor. My programming language is now English. I write a clear, detailed prompt:

*“On the Card View screen, when you click the Add Money button in the top right, can you please open the same screen as when you click the top up icon below the card? I circled both in red on the screenshot.”*

The more specific I am — mentioning screen names (`Card View`), component names (`NuriHed`, `NuriButton`), and desired behavior—the better the result.

### Step 3: Review the Changes, Test, and Commit

The AI analyzes my request and the existing code, then presents its proposed changes in a “diff” view — lines to be deleted in red, lines to be added in green. My job is to be the senior developer, reviewing the pull request. Does it make sense? Does it look right?

If it does, I accept the changes, rebuild the application, and test it immediately on my device. In this case, the “Add Money” button now worked perfectly. Success!

The final, crucial step is to commit the change. I instruct the AI: `"Please commit and push this to GitHub."` Using version control is my safety net. If the AI destroys something later, I can always revert to a working version.

## The Reality: When the AI Gets It Wrong

This workflow sounds smooth, but it’s rarely a straight line. The AI is a powerful but flawed partner.

**The Unintended Side Effects**

In another instance, I asked the AI to fix the vertical alignment of a small chevron icon. It fixed the alignment, but in the process, it changed the size of the entire card element on the screen. Why? I don’t know. For now, it was an acceptable trade-off. This is a common occurrence: you fix one thing, and the AI inadvertently alters another. You have to be constantly vigilant.

**Spiraling and Getting Stuck**

Sometimes, the AI simply gets stuck. It can get caught in a loop, repeatedly trying and failing to implement a change. I’ve seen it get confused by its own tools, throwing internal errors. The classic IT solution often works: **close the program and restart it.** Sometimes, switching to a different AI model (e.g., from Gemini to Claude 3 Opus) can break the deadlock, although this can have cost implications.

**The Siren Song of Unplanned Features**

It’s easy to get lost in “feature universes.” I had a “nice-to-have” idea: add a “Share” button to a QR code screen. The AI implemented it quickly. But the result was half-baked — it shared the text address but failed to share the QR code image itself.

This is a trap. I spent time on a feature that wasn’t on my roadmap and didn’t even work correctly. The discipline to stick to the plan is more important than ever when the barrier to starting something new is just a single sentence.

## The New Role of the Developer: From Coder to Conductor

Using an AI assistant has fundamentally changed my relationship with code.

I’ve gone from someone who was proud to “speak the language of the computer” to someone who instructs it in English. I’m less of a hands-on builder and more of an architect, a reviewer, and a quality assurance engineer, all rolled into one. The satisfaction of crafting a perfect function with my own hands is replaced by the satisfaction of guiding a powerful tool to a desired outcome. It’s a different, more managerial kind of pride.

## Key Lessons Learned

If you’re going to integrate an AI pair programmer into your workflow, here are my key takeaways:

- **Be Hyper-Specific:** Vague instructions lead to vague (and often wrong) results. Use screen names, component names, and clear logic.
- **A Picture is often Worth 1,000 Lines of Code:** Use annotated screenshots whenever possible.
- **Isolate Your Tasks:** Start a new chat for each distinct bug or feature to prevent the AI from mixing up contexts.
- **Commit Religiously:** Version control is your best friend. Commit working changes often so you can always go back.
- **“Make It Work, Then Make It Pretty”:** Get the functionality right first. You can always ask the AI to refactor or clean up the UI in a separate step.
- **Know When to Walk Away:** If the AI is struggling with a task for more than a couple of iterations, it might be faster to either write the code yourself or re-think your approach.

AI-assisted development isn’t magic. It’s a powerful, imperfect tool that requires a new set of skills. It demands clear communication, sharp-eyed reviewing, and disciplined project management. It won’t replace developers, but it is changing what it means to be one.
