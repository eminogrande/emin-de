---
title: "The Invisible Giants, 21 Developers Who Built Your Internet"
description: "We praise the founders of Facebook and Google, but the internet runs on open source code from a small group of volunteers. Here are 21 of them."
date: "2025-12-07T17:25:01Z"
updated: "2025-12-07T17:25:01Z"
lang: "en"
category: "building"
format: "guide"
author: "ai-desk"
provenance: "ai_generated"
ai_assisted: true
reviewed_by_human: false
source: "emino.app"
third_party_summary: false
cover: "../../../media/the-invisible-giants-21-developers-who-built-your-internet/cover.webp"
voice_check:
  em_dash: 3
  unobserved: 255
emin_check_pct: null
voice_rewrite: "v1"
review_status: "draft-emin-voice"
original_url: "https://emino.app/posts/the-invisible-giants-21-developers-who-built-your-internet/"
tldr:
  - "The internet runs on open source code kept alive by a small group of mostly invisible volunteers."
  - "This is a list of the top 21 npm developers, from Paul Millr's chokidar to Feross Aboukhadijeh's WebTorrent."
  - "Their packages, like Babel, glob, express, lodash and yargs, run hundreds of millions of times."
basically:
  numbers-1-to-7-watchers-utils-and-babel: "Chokidar, chalk, micromatch and Babel: the first seven keep files watched, logs colored and code compiled."
  numbers-8-to-14-npm-express-and-the-node-style: "Isaac created npm itself, Doug keeps Express alive, and TJ defined how Node code looks."
  numbers-15-to-21-streams-polyfills-and-p2p: "Minimist, lodash, yargs, polyfills, streams, node-gyp and WebTorrent round out the list."
---
![](../../../media/the-invisible-giants-21-developers-who-built-your-internet/cover.jpg)

We always praise the founders of Facebook or Google. But the internet we use today is actually built on open source code, and a lot of that code is kept alive by a small group of volunteers. These are the invisible giants. You most likely use their code every single day and never notice it.

This is the story of the top 21, and it starts with the man who watches your files.

## Numbers 1 to 7: watchers, utils and Babel

Number 1 is Paul Millr, the watchman. Paul is [`@paulmillr`](https://github.com/paulmillr) on GitHub and his big thing is [`chokidar`](https://github.com/paulmillr/chokidar). It's used in more than 30 million repositories and has hundreds of millions of downloads. In the early days of Node.js, just watching a file for changes, so your app could reload on its own, was broken. It was buggy, it crashed on Macs and it ignored errors on Windows. Paul didn't just accept that, he built Chokidar. And it fixed the most painful part of a developer's day, which is waiting. Every time you hit `Ctrl+S` in VS Code, or your React app updates in the browser right away, that is Paul's code running in the background and watching the world for you.

Number 2 is Sindre Sorhus, the king of productivity. Sindre is [`@sindresorhus`](https://github.com/sindresorhus) and his most famous creation is [`chalk`](https://github.com/chalk/chalk), with more than 1.9 billion downloads. He is a legend who believes in the Unix Philosophy, small modules that do one thing well. Chalk brought color to the terminal. Before Sindre the terminal was a bleak black and white wall of text. He made errors red, warnings yellow and success green. He literally colored the developer's world, and that means less eye strain and less confusion for millions of people.

Number 3 is Jon Schlinkert, the master of micro utils. Jon is [`@jonschlinkert`](https://github.com/jonschlinkert) and his big one is [`micromatch`](https://github.com/micromatch/micromatch), with more than 1.3 billion downloads. Jon is the master of matching. If you ever typed `*.js` to find all JavaScript files, or `src/**/*.css` to find styles, you used Jon's logic. His code is the invisible sorting machine inside Webpack, Babel and ESLint. When you ask for a file, it makes sure the computer actually finds the right one.

Number 4 is Brian Woodward, the partner in code. Brian is [`@doowb`](https://github.com/doowb) and his big one is [`handlebars-helpers`](https://github.com/helpers/handlebars-helpers), with more than 860 million downloads. He often works together with Jon Schlinkert and builds the glue that holds static sites together. He makes the helpers that let templating engines do their job, like formatting dates, looping through data and automating boring HTML tasks. He is the reason your blog generator works.

Number 5 is Daniel Tschinder, the modernizer. Daniel is [`@danez`](https://github.com/danez) and his big one is [`babel-plugin-transform...`](https://babeljs.io), with more than 774 million downloads. He is a core pillar of the Babel team. Babel is the time machine of the web. You write code from the future today and it turns it into code that older browsers understand. Without Daniel we would still write old JavaScript, ES5. He lets the whole industry move forward without leaving people on older computers behind.

Number 6 is Henry Zhu, the Babel keeper. Henry is [`@hzoo`](https://github.com/hzoo) and his big one is [`babel-core`](https://github.com/babel/babel), with more than 743 million downloads. Henry is the face of open source sustainability. As the lead maintainer of Babel he runs the compiler that powers React, Vue and Next.js. He holds the keys to the kingdom. If Babel breaks, the modern web breaks. So his package is really the peace of mind that your code runs anywhere, on any device.

Number 7 is Logan Smyth, the architect. Logan is [`@loganfsmyth`](https://github.com/loganfsmyth) and his big one is [`babel-loader`](https://github.com/babel/babel-loader), with more than 739 million downloads. Logan builds the bridges. He works on how Babel talks to other tools, mainly Webpack. He made the layer that connects your build system to the compiler, so the whole pipeline of modern web development keeps flowing and doesn't clog.

## Numbers 8 to 14: npm, Express and the Node style

Number 8 is Isaac Z. Schlueter, the father of npm. Isaac is [`@isaacs`](https://github.com/isaacs). His most downloaded package is [`glob`](https://github.com/isaacs/node-glob), with more than 736 million downloads, and he also created `npm`. Isaac is royalty, he created npm itself. Glob teaches Node.js how to find files on a hard drive with patterns. But he didn't just write a package, he built the playground everyone else on this list plays in. Every time you run `npm install`, you use his invention.

Number 9 is Brian Ng, the AST surgeon. Brian is [`@existentialism`](https://github.com/existentialism) and his big one is [`babel-types`](https://github.com/babel/babel), with more than 685 million downloads. Brian's work lets software understand other software. He maintains the tools that take code apart into Abstract Syntax Trees (ASTs). And these tools don't just read code, they change it with a scalpel. That is what lets tools fix your bugs on their own or format your messy code.

Number 10 is Doug Wilson, the server savior. Doug is [`@dougwilson`](https://github.com/dougwilson) and his big one is [`express`](https://github.com/expressjs/express), with more than 668 million downloads. If you ever visited a website that runs on Node.js, it most likely ran on Express. Doug has been the tireless maintainer of the standard web framework for Node. He keeps the internet running. From small blogs to huge APIs, his code takes the request and sends the response.

Number 11 is Sebastian McKenzie, the creator. Sebastian is [`@sebmck`](https://github.com/sebmck) and his big one is [`yarn`](https://github.com/yarnpkg/yarn), with more than 632 million downloads, and he also created Babel. Sebastian is a prodigy. He created Babel (first called `6to5`) as a teenager and then created Yarn, a faster alternative to npm. He pretty much dragged JavaScript alone from the dark ages of 2009 into the modern era, and he defined how we worked in the 2010s.

Number 12 is James Kyle, the evangelist. James is [`@thejameskyle`](https://github.com/thejameskyle) and his big ones are [`flow`](https://flow.org/) and Babel plugins, with more than 625 million downloads. James was the bridge between complex compilers and normal humans. He wrote the manuals, the guides and the plugins that made tools like Babel and Flow usable. He turned impossible tech into easy tools.

Number 13 is Mathias Bynens, the Unicode guardian. Mathias is [`@mathias`](https://github.com/mathias) and his big one is [`he`](https://github.com/mathias/he), for HTML entities, with more than 481 million downloads. Computers are bad at text, especially emojis and weird symbols. Mathias is the world expert on how JavaScript handles characters. If you ever used an emoji 🚀 in a password or a username and the site didn't crash, thank Mathias. He makes sure the web speaks every human language the right way.

Number 14 is TJ Holowaychuk, the godfather. TJ is [`@tjholowaychuk`](https://github.com/tjholowaychuk) and his big ones are [`commander`](https://github.com/tj/commander.js) and `mocha`, with more than 364 million downloads. He is the most prolific programmer in Node history. He wrote the first versions of Express, Mocha and Commander. He defined the style of Node.js. If you write code that looks clean and elegant, you are most likely copying TJ's style.

## Numbers 15 to 21: streams, polyfills and P2P

Number 15 is James Halliday, the philosopher. James is [`@substack`](https://github.com/substack) and his big ones are [`minimist`](https://github.com/substack/minimist) and `browserify`, with more than 417 million downloads. Substack came up with the idea that you can write Node.js code and run it in the browser. He created Browserify. With that he started the bundling revolution, and that leads straight to the tools we use today.

Number 16 is John-David Dalton, the performance obsessive. JD is [`@jdalton`](https://github.com/jdalton) and his big one is [`lodash`](https://github.com/lodash/lodash), with more than 375 million downloads. JD Dalton saw that the standard JavaScript library was too slow and had a lot missing. So he built Lodash, a utility belt that became the most depended upon library in history. He was obsessed with speed, and his functions were often faster than the ones built into the browser.

Number 17 is Ben Coe, the command line commander. Ben is [`@bcoe`](https://github.com/bcoe) and his big one is [`yargs`](https://github.com/yargs/yargs), with more than 310 million downloads. Ben makes the command line friendly. He maintains Yargs, the tool that reads command line arguments. Every time you type a command like `--help` or `--version`, Ben's code figures out what you mean and tells the program what to do.

Number 18 is Jordan Harband, the polyfill king. Jordan is [`@ljharb`](https://github.com/ljharb) and his big one is [`object.assign`](https://github.com/ljharb/object.assign), with more than 279 million downloads. Jordan keeps things backward compatible. He maintains hundreds of polyfills, little shims that teach old browsers new tricks. He fights for the people on old computers, so the web stays open to everyone and not just to people with the newest MacBooks.

Number 19 is Dominic Tarr, the stream master. Dominic is [`@dominictarr`](https://github.com/dominictarr) and his big one is [`through`](https://github.com/dominictarr/through), with more than 279 million downloads. Dominic is a mad scientist of data streams. He wrote the tools that let data flow through apps like water through pipes. And he pushed the idea of small modules more than anyone else, and built a huge network of tiny, perfect tools.

Number 20 is Nathan Rajlich, the plumber. Nathan is [`@tootallnate`](https://github.com/TooTallNate) and his big one is [`node-gyp`](https://github.com/nodejs/node-gyp), with more than 224 million downloads. Nathan does the heavy lifting. He maintains the tools that let Node.js talk to C++ and to low level parts of the system. He builds the bridge between the easy world of JavaScript and the hard world of machine code.

Number 21 is Feross Aboukhadijeh, the P2P pioneer. Feross is [`@feross`](https://github.com/feross) and his big ones are [`standard`](https://github.com/standard/standard) and `webtorrent`, with more than 206 million downloads. Feross is a visionary who wants a decentralized web. He built WebTorrent, which is BitTorrent in the browser, and Standard, a linter that bans semicolons. He shows that JavaScript can do anything, even stream movies peer to peer right in your browser without a plugin. He keeps pushing what is possible in a web browser.
