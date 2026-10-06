---
title: "An Interview with Emil Wagner from Ape Unit Berlin about the The Future of Software Planning with…"
description: "This discussion explores the evolving landscape of software development, particularly with the rise of AI. The conversation highlights the traditional..."
date: "2025-05-20T12:16:07.923Z"
updated: "2025-05-20T12:16:07.923Z"
lang: "en"
category: "agents-ai"
format: "summary"
author: "ai-desk"
provenance: "ai_generated"
ai_assisted: true
reviewed_by_human: false
source: "medium"
third_party_summary: false
voice_check:
  em_dash: 25
  unobserved: 157
emin_check_pct: null
original_url: "https://medium.com/@em/an-interview-with-emil-wagner-from-ape-unit-berlin-about-the-the-future-of-software-planning-with-fa20225e8fa1"
---
# An Interview with Emil Wagner from Ape Unit Berlin about the The Future of Software Planning with AI.

This discussion explores the evolving landscape of software development, particularly with the rise of AI. The conversation highlights the traditional process of breaking down projects into smaller, manageable tasks, identifying dependencies, and utilising resources like documentation and search engines when encountering issues. Looking ahead, the focus shifts to orchestrating AI agents to perform these tasks, emphasising the importance of clear instructions and controlled environments to ensure they stick to the defined scope. A central theme is that the true difficulty lies not in writing the code itself, but in the initial planning and detailed briefing of the project’s features and goals, potentially broken down into milestones or a product roadmap, before diving into individual tasks.

**By Emin Mahrt (Interviewer):**

### You’ve spent a lot of time doing software-engineering work.

So, you’ve done a great deal of hands-on engineering yourself. Now imagine there were **no** AI systems at all. You’d still have to plan a project: you’d assemble skills from different people, and when it came to implementation you’d rely on the traditional “raw materials” — documentation for the packages and services you want to use. Normally you’d … what do we still do? We search. We google whether someone has already hit the same error. Our core resources are the code itself, the docs, Google, and of course the knowledge sitting in colleagues’ heads.

Planning an app means breaking everything into small work packages, describing them clearly, and showing their dependencies. Right? Sometimes one deliverable absolutely depends on another.

Now, looking ahead, the future of programming will be *orchestration*: instead of coordinating a lot of human developers, you orchestrate a lot of **agents**. You point every agent at a narrowly defined task and try to stop it from doing more than it was asked. These days people actually spin up sandboxed environments for each agent; the agent builds something, submits a pull request, then someone (human or agent) reviews, accepts, merges — or rejects it with “Sorry, that’s out of scope.”

The thing I’ve *never* really learned is how to write truly solid tasks. Writing a good task is hard for me. I drew that Mermaid chart you saw only because I thought I might find it easier to design the app visually first, just to see the connections. But in the end I’m convinced we could already build the whole thing — as long as we understand it at a high level and break it down into a really good **briefing**: what the app is, how it works, what it does *and* doesn’t do. I’ve been saying for years that *this* is the real work. Not building it, but forcing yourself to specify the features.

Do you have any practical tips — things that also worked well with real human teams? How do you do the planning phase, especially the task planning? Ideally I want a clean task list.

### **Emil Wagner**

Before I get to individual tasks I try to carve the project into **stages** — call them *milestones*, call it a *product roadmap*. Splitting the path adds built-in prioritization: which features matter early, which can come later. It also helps people. When you point at “the summit up there,” most devs can’t visualize how they’ll ever get there. Break it into reachable, concrete goals and it suddenly feels doable.

Take *Tidy* — on that product we worked with a “continuous-operation” paradigm. Every single version had to be **deployable** and had to **work**. Maybe it did very little, but it *ran* in production. That approach is useful: Version 1 may ship only one or two features, but everything around them is complete. If you were building a mobile app you’d say, “Every version must be shippable to the App Store or Google Play — even if functionality is missing.”

So, long before writing tasks, I describe **goals** for each milestone. Once those are clear it’s *far* easier to break the goals into tasks: “What has to be done so Milestone 1 is true?” Think through Wallet Version 1: maybe it can only send and receive a transaction. Version 2 adds social recovery. Version 3… and so on. After that, people can often write their *own* tasks, which is great because they understand them better and you avoid misunderstandings.

### What about tests? (Emin Mahrt)

Everything has to get done — just not necessarily by the same person. In a larger team someone might focus on acceptance tests, someone else on unit tests. Good tests keep *quality* and *maintainability* under control; they force you to state what the code should do.

A big benefit — especially in large teams — is **shared understanding**. Tests, code reviews, docs: they’re all knowledge-sharing tools.

Interestingly, I read an approach where you’d define *only* the tests and let an AI write all the code required to satisfy them. For instance, “When a transaction is broadcast, the API must return a transaction hash; if not, something’s broken — go investigate.” You end up writing more tests than you normally would, but the principle is sound.

### Let’s say people like you and me become *software conductors*. You’re way deeper down the rabbit hole than I am, but if *you* write a technical briefing the agents will probably do exactly what you intend. I tend to write in natural language and the agents get creative in ways I didn’t ask for.

Why not assemble the briefing *with* ChatGPT? Break it down interactively. You’ll get a solid start that way.

### I’ve tried that a couple of times.

Right now I’m thinking of producing a Markdown file: milestones, tasks — well, maybe “deliverables.” I’m still figuring out what **exactly** belongs in there.

### Maybe don’t list every task there.

Put the milestones — the deliverables for each iteration — and add **acceptance criteria**. The richer the context, the better the output from your agents. Large-language models tend to charge ahead without reading the *latest* released package or the **current** docs, so you have to pull them back: “Look, here’s the *actual* API reference — read it!”

Copy-pasting the relevant docs straight in helps a lot.

### I’d love a blueprint that shows what a founder — or anyone — needs to prepare so that, downstream, whether it’s a human or a machine, they can implement cleanly.

In the old days you’d talk to a client, extract what they really wanted, pass it to developers, and hope everyone understood. Today, whether it’s those AI “game-builders” or apps like Llama, Replit, or whatever, nobody really guides you through a **structured interview** to capture all the inputs.

Ideally, I want to be *interviewed* by the system so it can squeeze out of me exactly what it needs — and then tell me, “That part’s hard, that part’s easy, this feature would need a database; since we don’t have one, we’ll skip it.” I actually saw that yesterday in a tool I built — it refused a feature because we had no database. I loved that and immediately bought $25 of credits to keep testing.

Take this VS Code extension “TaskMaster.” It already has thousands of installs. Its only job is to create tasks and then monitor that the AI *doesn’t* do anything beyond those tasks. They promise: “The AI builds nothing you didn’t ask for, and we guard against infinite loops.”

But I could do it so much better if I had your knowledge. Of course everything changes weekly.

### Emil Wagner

Try breaking it down before you hit “tasks.” Think product-road-map first. What must Version 0.1 of the app do? Start with the simplest piece: maybe it can send and receive one transaction. Keys have to be generated — fine. Next version adds social recovery. Iterate. Some of your charts cover a lot of backend plumbing: stitching different services together. Maybe treat those as separate steps: backend functionality first, then UI, then more features.

### Emin Mahrt

When you zoom out, milestones depend on other things too. If *this* breaks, you already know the domino effect. It’s like a Bitcoin soft-fork: you don’t want existing stuff to fail; you only want to add new abilities. Sometimes you need a hard-fork — but only if you’re willing to break backward compatibility.

I’m picturing tasks as puzzle pieces inside the larger project, each with dependencies. A task spec should say not only **what** it does but *where* it sits, what parts it touches, what APIs it depends on, and where the specialist docs live.

Right now a lot of people are still chaotic: they throw all sorts of stuff at the AI and see what sticks instead of sitting down and doing proper planning. I’d love to do a real planning session with you sometime — maybe on a small side project — just to build a proper pipeline.

### **Emil Wagner:**

Totally. It’s normal to start a bit messy and then sort. I’d focus less on individual tasks and more on the higher-level structure first. Once you have the roadmap, an agent can even ask, “What tasks do I need to hit Milestone 1?” — and write its own to-do list.

Yes, you always have dependencies and the risk of devs stepping on each other’s toes. That’s why we have version control and branches. But you could absolutely aim for a Git repository that holds everything: code, a README with the milestones, a Mermaid chart of dependencies, even a living document generated *by* the agents — because hand-maintaining that is a pain.

### **Emin Mahrt**

Cool. Super interesting. Thanks for your time.
