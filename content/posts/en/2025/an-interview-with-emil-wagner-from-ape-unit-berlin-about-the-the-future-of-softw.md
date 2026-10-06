---
title: "An Interview with Emil Wagner from Ape Unit Berlin about the Future of Software Planning with AI"
description: "I talk with Emil Wagner from Ape Unit Berlin about planning software when agents write the code. Milestones and goals first, tasks later."
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
voice_rewrite: "v1"
review_status: "draft-emin-voice"
original_url: "https://medium.com/@em/an-interview-with-emil-wagner-from-ape-unit-berlin-about-the-the-future-of-software-planning-with-fa20225e8fa1"
tldr:
  - "Software planning is moving from coordinating developers to orchestrating AI agents."
  - "Emil Wagner's advice is to think in shippable milestones first and in tasks second."
  - "Agents need acceptance criteria, the current docs and a repository that holds the whole plan."
basically:
  from-task-lists-to-milestones: "Split the project into milestones that each ship, and the tasks almost write themselves."
  what-tests-are-for: "Tests force you to say what the code should do. Define them first and let AI write the rest."
  briefing-the-agents: "Give agents milestones, acceptance criteria and the current docs, or they charge ahead blind."
  let-the-system-interview-you: "I want a tool that interviews me and tells me what is hard, easy or impossible to build."
  dependencies-and-one-repository-for-everything: "Code, milestones, a dependency chart and a living doc can all sit in one Git repository."
---
# An Interview with Emil Wagner from Ape Unit Berlin about the Future of Software Planning with AI

This is a talk I had with Emil Wagner from Ape Unit Berlin about how software planning changes with AI. We start with the old way, where you break a project into small tasks, find the dependencies, and use docs and Google when you hit a problem. Then we look ahead, where you orchestrate AI agents to do those tasks, and they need clear instructions and a controlled environment so they stick to the scope. The main theme is that the hard part is not writing the code. It's the planning and the detailed briefing of the features and goals before that, maybe split into milestones or a product roadmap, before you even get to single tasks.

## From task lists to milestones

### Emin Mahrt

You've spent a lot of time doing software engineering yourself, a lot of hands on work. Now imagine there were no AI systems at all. You'd still have to plan a project. You'd bring together skills from different people, and when it comes to building it you'd use the classic raw materials, the documentation for the packages and services you want to use. And normally you'd... what do we still do? We search. We google if someone already had the same error. Our main resources are the code itself, the docs, Google, and of course the knowledge in the heads of colleagues.

Planning an app means you break everything into small work packages, describe them clearly and show the dependencies. Right? Sometimes one deliverable really depends on another one.

If I look ahead, I think the future of programming is orchestration. Instead of coordinating a lot of human developers, you orchestrate a lot of agents. You point every agent at a narrow task and try to stop it from doing more than it was asked. People already spin up sandboxed environments for each agent. The agent builds something and submits a pull request, and then someone, a human or an agent, reviews it and accepts and merges it, or rejects it with "Sorry, that's out of scope."

The thing I never really learned is how to write really good tasks. Writing a good task is hard for me. I only drew that Mermaid chart you saw because I thought it might be easier for me to design the app visually first, just to see the connections. But in the end I'm sure we could already build the whole thing, as long as we understand it at a high level and break it down into a really good briefing. What the app is, how it works, what it does and what it doesn't do. I've been saying this for years, that this is the real work. Not building it, but forcing yourself to specify the features.

Do you have practical tips, things that also worked well with real human teams? How do you do the planning phase, and the task planning? Ideally I want a clean task list.

### Emil Wagner

Before I get to single tasks I try to split the project into stages. Call them milestones, or call it a product roadmap. Splitting the path gives you prioritization for free, which features matter early and which can come later. It also helps people. When you point at the summit up there, most devs can't imagine how they will ever get there. Break it into goals that are concrete and reachable and suddenly it feels doable.

Take Tidy. On that product we worked with a continuous operation idea. Every single version had to be deployable and had to work. Maybe it did very little, but it ran in production. That approach is useful. Version 1 may ship only one or two features, but everything around them is complete. If you build a mobile app you'd say every version must be shippable to the App Store or Google Play, even if functionality is missing.

So long before I write tasks, I describe goals for each milestone. Once those are clear it's a lot easier to break the goals into tasks. You ask what has to be done so that Milestone 1 is true. Think about Wallet Version 1. Maybe it can only send and receive a transaction. Version 2 adds social recovery. Version 3, and so on. After that people can often write their own tasks, and that's great because they understand them better and you avoid misunderstandings.

## What tests are for

### Emin Mahrt

What about tests?

### Emil Wagner

Everything has to get done, just not always by the same person. In a bigger team someone might focus on acceptance tests and someone else on unit tests. Good tests keep quality and maintainability under control, and they force you to say what the code should do.

A big benefit, especially in big teams, is shared understanding. Tests, code reviews and docs are all tools to share knowledge.

I also read about an approach where you define only the tests and let an AI write all the code that's needed to pass them. For example, when a transaction is broadcast the API must return a transaction hash, and if it doesn't, something is broken and you go and look. You end up writing more tests than you normally would, but the principle is sound.

## Briefing the agents

### Emin Mahrt

Let's say people like you and me become software conductors. You're way deeper down the rabbit hole than I am, and if you write a technical briefing the agents will probably do exactly what you want. I tend to write in natural language and the agents get creative in ways I didn't ask for.

### Emil Wagner

Why not put the briefing together with ChatGPT? Break it down step by step with it. You'll get a good start that way.

### Emin Mahrt

I tried that a couple of times. Right now I'm thinking about making a Markdown file with milestones and tasks, or maybe better deliverables. I'm still figuring out what exactly belongs in there.

### Emil Wagner

Maybe don't list every task there. Put in the milestones, the deliverables for each iteration, and add acceptance criteria. The more context you give, the better the output from your agents. Large language models like to charge ahead without reading the latest released package or the current docs, so you have to pull them back and say look, here is the actual API reference, read it.

Copy and pasting the relevant docs straight in helps a lot.

## Let the system interview you

### Emin Mahrt

I'd love a blueprint that shows what a founder, or anyone, needs to prepare so that later, whether it's a human or a machine, they can build it cleanly.

In the old days you talked to a client, got out of them what they really wanted, passed it to the developers and hoped everyone understood. Today, whether it's those AI game builders or apps like Llama, Replit or whatever, nobody really guides you through a structured interview to collect all the inputs.

Ideally I want to be interviewed by the system, so it can squeeze out of me exactly what it needs. And then it tells me that part is hard, that part is easy, this feature would need a database and since we don't have one we skip it. I actually saw that yesterday in a tool I built. It refused a feature because we had no database. I loved that and right away bought $25 of credits to keep testing.

Take this VS Code extension, TaskMaster. It already has thousands of installs. Its only job is to create tasks and then watch that the AI doesn't do anything beyond those tasks. They promise that the AI builds nothing you didn't ask for and that they guard against infinite loops.

But I could do it so much better if I had your knowledge. Of course everything changes every week.

### Emil Wagner

Try to break it down before you get to tasks. Think product roadmap first. What must version 0.1 of the app do? Start with the simplest piece. Maybe it can send and receive one transaction. Keys have to be generated, fine. The next version adds social recovery. Iterate. Some of your charts cover a lot of backend plumbing, stitching different services together. Maybe treat those as separate steps, backend functionality first, then UI, then more features.

## Dependencies and one repository for everything

### Emin Mahrt

When you zoom out, milestones also depend on other things. If this breaks, you already know the domino effect. It's like a Bitcoin soft fork. You don't want existing stuff to fail, you only want to add new abilities. Sometimes you need a hard fork, but only if you're willing to break backward compatibility.

I picture tasks as puzzle pieces inside the bigger project, each with dependencies. A task spec should say what it does, and also where it sits, what parts it touches, what APIs it depends on and where the specialist docs are.

Right now a lot of people are still chaotic. They throw all kinds of stuff at the AI and see what sticks, instead of sitting down and doing proper planning. I'd love to do a real planning session with you sometime, maybe on a small side project, just to build a proper pipeline.

### Emil Wagner

Totally. It's normal to start a bit messy and then sort it out. I'd focus less on single tasks and more on the higher level structure first. Once you have the roadmap, an agent can even ask what tasks it needs to hit Milestone 1 and write its own to-do list.

And yes, you always have dependencies and the risk of devs stepping on each other's toes. That's why we have version control and branches. But you could really aim for a Git repository that holds everything. The code, a README with the milestones, a Mermaid chart of the dependencies, and even a living document generated by the agents, because keeping that up to date by hand is a pain.

### Emin Mahrt

Cool. Super interesting. Thanks for your time.
