---
title: "声音能做到量子粒子所做的事吗？"
description: "声音会像双缝实验中的电子一样弯曲、扩散和干涉。那么声音是量子的吗？本文探讨这种类比在哪里成立，又在哪里失效。"
date: "2026-10-13"
updated: "2026-10-13"
lang: zh
translated_from: "en/can-sound-do-what-quantum-particles-do"
source_sections: ["the-question-i-kept-coming-back-to", "what-sound-is", "sound-does-everything-a-wave-does", "why-size-matters", "the-double-slit-with-two-speakers", "the-double-slit-with-electrons", "two-kinds-of-wave", "looking-changes-an-electron-not-a-sound", "the-measurement-problem", "the-observer-is-not-a-mind", "phonons-the-quantum-of-sound", "why-speakers-cant-build-a-quantum-computer", "what-i-take-from-it"]
category: science
format: explainer
author: emin
provenance: mixed
ai_assisted: true
reviewed_by_human: false
tags: ["physics", "quantum mechanics", "sound", "double slit", "phonons"]
source_links: [{"title": "Young's fringes with sound waves (IOPSpark)", "url": "https://spark.iop.org/youngs-fringes-sound-waves", "note": "The two-speaker double slit as a classroom experiment."}, {"title": "Diffraction through slits (Salford Acoustics)", "url": "http://salfordacoustics.co.uk/sound-waves/diffraction/diffraction-through-slits", "note": "Sound through two slits and Young's fringes for sound."}, {"title": "The Nature of Sound (The Physics Hypertextbook)", "url": "https://physics.info/sound/"}, {"title": "Why does a double slit with sound never give complete destructive interference?", "url": "https://physics.stackexchange.com/questions/183399/why-does-a-double-slit-experiment-with-sound-waves-never-result-in-complete-dest"}, {"title": "What is the difference between quantum and classical interference?", "url": "https://physics.stackexchange.com/questions/225797/what-is-the-difference-between-quantum-and-classical-interference"}, {"title": "The Measurement Problem (John D. Norton, University of Pittsburgh)", "url": "https://sites.pitt.edu/~jdnorton/teaching/HPS_0410/chapters/quantum_theory_measurement/index.html"}, {"title": "Philosophical Issues in Quantum Theory (Stanford Encyclopedia of Philosophy)", "url": "https://plato.stanford.edu/entries/qt-issues/"}, {"title": "The Role of Decoherence in Quantum Mechanics (Stanford Encyclopedia of Philosophy)", "url": "https://plato.stanford.edu/entries/qm-decoherence/"}, {"title": "Observer effect (physics), Wikipedia", "url": "https://en.wikipedia.org/wiki/Observer_effect_(physics)", "note": "Why the observer is a physical interaction, not a mind."}, {"title": "Phonon (Britannica)", "url": "https://www.britannica.com/science/phonon"}, {"title": "Quantum Erasure Using Entangled Surface Acoustic Phonons (Phys. Rev. X)", "url": "https://link.aps.org/doi/10.1103/PhysRevX.10.021055", "note": "Entangled phonons and a quantum eraser on a chip."}, {"title": "Quantum Acoustics with Multimode Surface Acoustic Wave Cavities (JILA thesis)", "url": "https://jila.colorado.edu/sites/default/files/2024-05/SlettenThesis.pdf"}, {"title": "New device opens door to storing quantum information as sound waves (Caltech)", "url": "https://www.caltech.edu/about/news/new-device-opens-door-to-storing-quantum-information-as-sound-waves"}, {"title": "The Classical-Quantum Limit (PRX Quantum)", "url": "https://link.aps.org/doi/10.1103/PRXQuantum.5.020331"}, {"title": "If quantum speed-up is due to the wave-like nature of quantum mechanics, why not just use regular waves?", "url": "https://quantumcomputing.stackexchange.com/questions/2595/if-quantum-speed-up-is-due-to-the-wave-like-nature-of-quantum-mechanics-why-not"}]
tldr: ["声音像任何波一样会弯曲、扩散和干涉，你可以用两个扬声器来做双缝实验。", "所以双缝实验测试的是某物是否为波，而不是它是否为量子的。", "量子的部分是随机的单次撞击、概率幅、测量时的坍缩以及纠缠。", "声音只有在冷固体中以声子的形式才具有量子性，而经典波无法进行量子计算。"]
sections: [{"basically": "我想知道声波是否表现得像量子粒子，答案是既是也不是。"}, {"basically": "声音是介质中的压力波，经典物理学可以精确预测它接下来的行为。"}, {"basically": "声音会反射、弯曲、绕过角落扩散并发生干涉，因此它具有所有经典的波行为。"}, {"basically": "声音会绕过门弯曲，因为它的波长有几米长，而光和电子需要微小的狭缝。"}, {"basically": "两个播放相同音调的扬声器会在房间里产生响亮和安静的点，这就是声音的双缝图样。"}, {"basically": "单个电子像点一样落下，随时间积累成条纹，而当你检查路径时，条纹就会消失。"}, {"basically": "声波是气压，量子波是概率幅，只有后者才会使单次撞击变得随机。"}, {"basically": "测量声波会轻微扰动它，但检查电子的路径会消除干涉。"}, {"basically": "量子物理学无法解释测量如何选出一个结果，而经典声音从来没有这个问题。"}, {"basically": "量子物理学中的观察者是指任何获取路径信息的探测器或环境，而不是人类的心灵。"}, {"basically": "声子是固体中的量子化声音，表现出真正的量子行为，但只在寒冷、受控的实验室中。"}, {"basically": "声音可以混合波，但没有纠缠，它就无法达到量子计算机所使用的巨大状态空间。"}, {"basically": "声音复制了双缝实验的条纹，但随机性、坍缩和纠缠仍然只属于量子领域。"}]
---
## 我一直在思考的那个问题

我脑子里一直有个简单的问题。声音是波。光是波，电子的行为也像波。每个人都知道双缝实验，电子在屏幕上形成条纹，可一旦你去查看它们走的是哪条缝，条纹就消失了。那么声音也能做到同样的事吗？声波能表现出和量子物体一样的行为吗，包括干涉，还有这种奇怪的观测效应？

我深入研究了一番，简短的答案是：是，也不是。声音确实能做到量子波做的很多事情。但让量子物理成为量子物理的那一部分，恰恰是声音做不到的。下面就是那条界线所在。

## 声音是什么

声音是一种机械波。它需要某种介质来传播，比如空气、水或固体，这就是为什么真空中没有声音。扬声器振膜或拍手会推动旁边的空气分子挤在一起，然后它们又散开，这种疏密交替的空气模式向外传播。分子本身并没有飞到你的耳朵里。它们只是在原地来回振动，只有扰动在传播。

声波有波长，即从一个密部到下一个密部的距离。它有频率，即每秒经过多少个这样的波动，我们听到的就是音高。人类的听觉范围大约从 20 Hz 到 20,000 Hz。它有振幅，即推动的强度，我们听到的就是响度。它还有速度，取决于介质。在室温下的空气中，声音的传播速度约为每秒 343 米，在海水中约为 1,531 米。

对我的问题来说，重要的是，所有这些都是经典物理学。如果你知道声源和介质，你就能精确计算出波接下来会做什么。其中没有任何随机性。

## 声音能做波能做的一切

声音会反射。这就是回声，也是声呐在水下探测物体的原理。声音会折射，所以当空气变暖或变冷、或者风向改变时，声音会弯曲，声音可以顺着风传得更远。声音会衍射，它会绕过拐角，穿过门口后散开，这就是为什么你能听到隔壁房间的人说话而看不见他们。低频声音比高频声音更容易弯曲，这就是为什么远处的雷声只是低沉的隆隆声。

声音还会干涉。当两列声波相遇且波峰对齐时，它们会叠加，声音变得更响。当一列波的波峰遇到另一列波的波谷时，它们会抵消，声音变得更安静，理论上可以降到完全无声。两个音高几乎相同的音调会以缓慢的节奏时强时弱，这叫做拍频。

所以声音拥有全套的波动性质，而古老的经典波动物理学可以解释它的每一个部分。

## 为什么尺度很重要

你观察到什么，很大程度上取决于波的尺度。100 Hz 的音调在空气中的波长约为 3.4 米，10 kHz 的音调约为 3.4 厘米。这正好是门、房间、家具和人的尺度。所以声音一直在我们日常的世界里绕来绕去，我们能听到看不见的东西。

可见光的波长约为 400 到 700 纳米。要让光弯曲和干涉，你需要用极高精度制作的微小狭缝，这就是为什么光在日常生活中不会绕过拐角。电子也有波长，在通常的实验中，它大约相当于晶体中原子间距的大小。

所以同样的波动行为出现在完全不同的尺度上。声音在客厅里就能做到，电子则在原子尺度上做到。这本身并不能告诉你它是量子的还是非量子的。这只是波长的问题。

## 用两个扬声器做双缝实验

你真的可以用声音做双缝实验，这是经典的课堂演示。一种方法是做一堵有两个开口的墙。更简单的方法是用两个由同一个信号发生器驱动的扬声器，这样它们就同步播放同一个音调。一个典型的装置是把它们间隔约半米，播放大约 2,000 Hz 的声音。

然后你在它们前面慢慢走过房间。你会听到一个接一个的响点和静点。这些就是托马斯·杨用光看到的明暗条纹，人们称之为声音的杨氏条纹。用麦克风和仪表，你可以精确地绘制出这个图案。在正中间，到两个扬声器距离相同的地方，声音最响。

在普通房间里情况会变得混乱，因为墙壁会反射声音，叠加更多的波。在室外或消声室里效果最好。而且在静点你几乎永远得不到完全的寂静，因为两列波到达时的强度并不完全相同。

## 电子的双缝实验

现在是量子版本。一个源一次发射一个光子或一个电子，射向一堵有两条窄缝的墙。墙后面是一个屏幕，记录每个粒子落在哪里。

每个电子都作为一个点落在一个位置上。但当你发射许多电子，保持两条缝都打开，并且不去检查它们走的是哪条缝时，这些点会慢慢形成条纹。这和声音的干涉图案是同一类。而且它们不可能是相互干涉的，因为它们是一个一个来的。每个电子以某种方式作为波同时穿过两条路径，然后作为粒子落下。

然后你在缝处放一个探测器，来查明每个电子走的是哪条路。条纹消失了。你得到的是两条缝后面的两条普通带，就像你用小球射过缝隙得到的那样。

## 两种波

到这里我才明白，双缝实验是对波的检验，而不是对量子的检验。杨在 19 世纪初用光做了这个实验，来证明光是波，那远远早于任何人谈论量子物理的时候。声音、水和光都能产生那种条纹图案。如果你看到了条纹，你学到的是某个东西具有波动性，仅此而已。

真正的区别在于，是什么在波动。在声音实验中，波动的是气压，是某种物理的、你可以在每个点上测量的东西。某个位置的响度就是两列波的简单叠加。在量子实验中，波是波函数，它不是穿过介质运动的物理实体。它是一个概率幅。它告诉你在某个位置找到电子的可能性有多大。关于这个的规则叫做玻恩规则，它说你取波在某点的大小，然后平方，就得到了概率。条纹来自两条路径的振幅叠加，而且只有在许多次单个撞击累积之后才会显现。

波函数本身在没有人测量的时候，会平滑且可预测地变化，遵循薛定谔方程。但单个电子落在哪里是随机的。那些打破所谓贝尔不等式的实验表明，这种随机性是真实的，而不仅仅是知识的缺失，所以不存在我们尚未发现的隐藏的局部细节。

## 观察会改变电子，但不会改变声音

假设你想找出声音穿过了哪个缝。你在其中一个缝附近放一个麦克风。麦克风会从声波中吸收一些能量并散射掉一小部分，后面的干涉图样会随之改变一点点。但声音仍然是声波。在更远的地方它依然会产生干涉，它的本质没有任何改变。

这就像检查轮胎气压。总会漏掉一点空气，所以你改变了你测量对象的状态。这也是一种观察者效应，但只是个无聊的经典物理效应。你可以计算出这个偏差，而且用更好的仪器就能把它缩得更小。

电子的情况则完全不同。一旦你获得了它走哪条路径的信息，条纹就会完全消失。这并不是因为探测器太笨拙、推电子推得太重。这与信息本身捆绑在一起。Heisenberg 的不确定性原理对你同时掌握某些成对属性（比如位置和动量）的精确程度设定了一个硬性限制。在量子物理中，存在一种你无法通过工程手段消除的最小扰动。

## 测量问题

量子物理对于状态如何改变有两条规则，而且它们互不相容。当没人测量时，波函数平滑演化，你可以让它倒流，叠加态依然是叠加态。当你测量时，你会得到一个结果，这个结果是根据 Born rule 概率随机选出的，状态会瞬间跳变以匹配那个结果。人们称之为坍缩。它是突然发生的，且不可逆转。

Schrödinger 方程里不包含坍缩，而坍缩打破了方程的规则。理论也没说到底什么才算作测量，或者量子系统在哪里结束、测量设备从哪里开始。这个缺口就是测量问题，物理学家至今仍在为此争论。哥本哈根学派把坍缩当作一条规则。多世界诠释说根本没有坍缩。Bohmian mechanics 增加了隐变量。像 GRW 这样的客观坍缩理论则把坍缩看作一个真实的物理过程。

退相干解释了一部分原因。一个量子系统时刻都在接触它的环境, , 空气分子、光以及其他一切, , 并与之发生纠缠。单从系统本身来看，干涉会迅速褪去，看起来就像经典物理一样。这很大程度上解释了为什么我们从未见过宏然大物同时出现在两个地方。但退相干并没有解释为什么你会得到这一个结果而不是另一个。

声音完全没有这种特性。声波在任何时刻都有确定的属性，测量只是揭示它们，或许伴随一点微小的扰动。

## 观察者不是意识

“观察者”这个词误导了很多人。流行故事把它变成了“意识创造现实”的想法，觉得电子是因为人在看才做决定。冯·诺依曼和维格纳早期的一些讨论确实往那个方向推过。但物理学不需要人。观察者是任何与电子相互作用并带走“路径信息”的物理系统。空房间里的探测器可以做到，环境也可以做到。

我觉得用“测量相互作用”比“观察者”更好。这是一个物理过程，而不是心理过程，旧词一直在给关于量子物理的玄学废话提供养料。

## Phonons，声音的量子

声音确实有一个地方会变得量子化，那就是在固体内部。在晶体中，原子排成网格并一起振动。量子物理说这种振动能量是以微小的固定数据包形式出现的，一个数据包就叫一个 Phonon。这个名字来自希腊语中表示“声音”的词。Phonon 之于晶体中的声音，就像 photon 之于光。它不是像电子那样的基本粒子，它是一个准粒子，是许多原子共同振动的产物。长波长的 Phonon 就是固体中普通的声波。

Phonons 会表现出真正的量子行为。研究人员已经制造出单个 Phonon，将它们置于叠加态，展示了 Phonon 路径之间的干涉，让 Phonon 发生纠缠，甚至用它们运行了量子擦除实验。为此，他们将 Phonon 与芯片上的超导 qubit 耦合，并将整个装置冷却到极低温，这样随机的热振动就不会冲刷掉量子效应。

所以，没错，声音可以是量子的。但仅限于在实验室、极端寒冷环境下的固体中的 Phonon。你客厅空气中的声音是经典的压力波，经典物理几乎完美地描述了它。Phonons 以后可能仍然很重要，它是存储量子信息并在超导电路与光之间传递信息的一种方式。

## 为什么不能用扬声器制造量子计算机

我接下来的疑问是，如果量子计算机靠叠加和干涉运行，而声音两者兼具，为什么没人用扬声器造计算机。

答案在于机器运行的空间大小。对于 n 个 qubit，量子计算机在 2 的 n 次方个状态的空间中运行，每增加一个 qubit 空间就翻倍。叠加态让它能利用整个空间，而纠缠则把 qubit 相互连接。许多量子算法都需要这种连接。

经典波可以叠加，你可以在一个声音里混合许多频率。但要从经典波系统中获得指数级增长的状态，你需要指数级增加某些物理量，比如越来越高的频率或越来越多的能量。增加扬声器只能让它缓慢增长。经典波在独立部分之间也没有纠缠，也没有概率幅的干涉。而且量子纠错依赖于经典声音系统根本不具备的量子特性和测量方式。

## 我的感悟

声音是感受什么是干涉的一种极好方式。你可以走过房间听出那些“条纹”。但声音的双缝实验只能证明声音是一种波。量子部分是另一回事。那是关于单个电子与自身干涉，关于图样是从随机的单次打击中累积出来的，关于检查路径会杀死图样，以及没人能完全解释测量是如何挑选出那一个结果的。

| | 空气中的声音 | 电子或 photon |
|---|---|---|
| 什么在波动 | 空气压力 | 概率幅 |
| 需要介质吗 | 是 | 否 |
| 干涉现象 | 是 | 是 |
| 以单个点到达 | 否 | 是 |
| 落点位置 | 可预测 | 随机 |
| 检查路径 | 微小扰动 | 图样消失 |
| 纠缠 | 否 | 是 |

所以，对我自己问题的诚实回答是：声波可以模仿量子物理的外表, , 那些条纹和波动, , 但模仿不了内核。在声音真正变向量子的地方（即冷晶体中的 Phonon），它遵循所有奇怪的量子规则，包括测量问题。波的数学是两者的共同语言，但它描述的是两个截然不同的事物。
