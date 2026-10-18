---
title: "从Mac解锁Fazua Ride 50速度限制,无需盒子"
description: "我和我的agent如何通过USB从MacBook将Fazua Ride 50 Evation的速度限制从25提高到55公里/小时,使用固件2.04和一个开源工具。"
date: "2026-10-16"
updated: "2026-10-16"
lang: zh
translated_from: "en/fazua-ride-50-speed-unlock-mac"
source_sections: ["the-bike-and-the-problem", "the-idea-change-one-number-instead-of-fooling-the-sensor", "what-i-used", "step-1-connect-the-drivepack-to-the-mac", "step-2-read-before-you-write", "step-3-downgrade-to-204", "step-4-write-55-kmh", "step-5-back-into-the-bike", "what-went-wrong-on-the-way", "battery-modes-and-going-back"]
category: building
format: guide
author: emin
provenance: mixed
ai_assisted: true
reviewed_by_human: false
tags: ["ebike", "tuning", "Fazua Ride 50", "Canyon Roadlite:ON", "macOS", "how-to"]
source_links: [{"title": "FazuaUnlocker, my fork with the Mac port", "url": "https://github.com/eminogrande/FazuaUnlocker", "note": "fazua_mac.py, README-MAC.md and the firmware download script."}, {"title": "FazuaUnlocker by quezzas", "url": "https://github.com/quezzas/FazuaUnlocker", "note": "The original Windows tool, MIT licence."}, {"title": "FAZUA Toolbox Software", "url": "https://fazua.com/en/support/help-center/fazua-toolbox-software/", "note": "The official tool for firmware updates over USB."}, {"title": "FAZUA: How to do a Ride 50 firmware update", "url": "https://fazua.com/en/support/help-center/videos/how-to-fazua-ride-50-firmware-update", "note": "Manual firmware install, and why the remote LEDs flash afterwards."}, {"title": "Eplus Flash Home, Fazua speed unlocker", "url": "https://www.eplus.bike/en/prodotto/fazua-software-home-speed-unlocker/", "note": "The paid Windows version of the same idea, and the 2.50 to 2.04 downgrade note."}, {"title": "Firmware 2.04, archived original from fazua.com", "url": "https://web.archive.org/web/20220709185915/https://fazua.com/documents/826/evation_Software_2.04.bin", "note": "Internet Archive snapshot of 9 July 2022."}]
tldr: ["Fazua Ride 50将25公里/小时的限制作为一个值存储在驱动包中。在固件2.04上,你可以通过USB更改它。", "我是从MacBook Pro M4上做的。开源工具只支持Windows,所以我的agent把它的USB层换成了hidapi。", "固件2.50必须先回到2.04,通过官方的FAZUA Toolbox。2.04文件是来自fazua.com的原版。", "写入后读回,55.01公里/小时。Badass Box不需要这个。"]
sections: [{"basically": "一辆2020年的Canyon Roadlite:ON,配备Fazua Ride 50 Evation,还有一个一直闪黄灯的调校盒。"}, {"basically": "盒子对速度传感器撒谎。软件只是改变电机检查的限制。"}, {"basically": "我的自行车,我的MacBook,一根mini USB线,一把T10螺丝刀,FAZUA Toolbox和大约75行Python代码。"}, {"basically": "驱动包取出,电池打开,USB盖打开,线插入。Mac将其识别为evation v2.50。"}, {"basically": "首先只读取。我的显示24.98公里/小时和2121毫米车轮。该文件也是备份。"}, {"basically": "在FAZUA Toolbox中选择手动,而不是在线,选择2.04文件并让它刷写和校准。"}, {"basically": "一个命令写入新限制,自行车确认它,第二次读取显示55.01公里/小时。"}, {"basically": "白色LED轮流闪烁是遥控器在自我更新。别管它,直到它显示绿色。"}, {"basically": "一次错误的点击,两次中止的写入,以及一个只是驱动包没插好的红灯。"}, {"basically": "每种模式的限制都相同。续航里程不是。一个命令就能回到25。"}]
---
## 自行车与问题

我的自行车是一辆 2020 年的 Canyon Roadlite:ON AL 7.0，M 码，速度灰配橙色。电机是 Fazua Evation，Fazua 现在称之为 Ride 50 Evation。驱动包，电机和电池一体成型，安装在下管中，用一个杠杆就能取出来。电池是 Energy 250，触摸遥控器内置于车架。车把上没有显示屏，所以这辆车永远不会告诉你速度有多快。

在此之前，我的驱动包运行的是固件 2.50，电池固件是 1.15。我之所以会知道这些，只是因为我用 FAZUA Toolbox 读取了信息，见下文。

助力在 25 km/h 时停止，就像欧盟的每一辆电助力自行车一样。我想看看如果速度更快，这辆车感觉如何。所以在 10 月 7 日，我买了一个适用于 Fazua 的 Badass Box 4。我在 [Badass Box 4 on a Fazua Ride 50, the yellow light](/posts/badass-box-4-fazua-ride-50-yellow-light) 一文中写过这件事。它工作了一两分钟，然后顶部的 LED 又开始闪烁黄光。磁铁靠近一点，换个辐条，旋转 90 度，Badass 客服说安装看起来没问题。但骑了几分钟后还是黄灯。

## 思路，改一个数字而不是欺骗传感器

Badass Box 安装在后下叉的速度传感器上，改变辐条磁铁的脉冲，让电机以为你的速度比实际慢。这是一种信号欺骗，在我的车上，Fazua 过了一会儿就察觉到了，并标记了一个软故障。

电机本身只是将你的速度与一个存储值进行比较。Fazua 称之为 bikeMaxSpeed。经销商可以在 Toolbox 中看到它，但对普通用户来说是灰色的不可更改状态。如果你改变这个值，就没有什么可欺骗的了。传感器报告真实速度，电机只是助力更久。

我的助手找到了两种方法。意大利公司 Eplus 出售 Flash Home，售价 134 欧元加增值税，仅限 Windows。还有 GitHub 上 quezzas 开发的 FazuaUnlocker，免费，MIT 许可证，也仅限 Windows。两者的说法都一样。它在固件 2.04 上有效。在 2.50 上，你得先回退到 2.04。

```
之前 (盒子)                           之后 (软件)

辐条磁铁 -> [盒子] -> 传感器        辐条磁铁 -> 传感器
                 |  伪造变慢                         |  真实速度
                 v                                   v
驱动包: 限制 25 km/h               驱动包: 限制 55 km/h
           -> 1-2 分钟后变黄灯                -> 没有盒子，没有黄灯
```

## 我用到的东西

1. 自行车，电池充满电。
2. 一台 MacBook Pro M4，16 GB 内存，macOS 15.5。它运行在 Apple Silicon 上，没有 Windows，没有虚拟机。
3. 一根 mini USB 数据线。不是只能充电的线。
4. 一把用于 USB 盖子的 Torx T10 螺丝刀。
5. 适用于 Apple Silicon 上 macOS 的 FAZUA Toolbox 2.29 基础版，来自 Fazua 官网。
6. 固件 2.04，文件 evation_Software_2.04.bin。原始的 fazua.com 链接已经失效，但互联网档案馆（Internet Archive）保留了 2022 年 7 月 9 日的版本。SHA-256 8fe885c9dfc7caa9cf8e61b88051bf8d42da53747c4fd86d2b72c3c2ef23d32e。我的助手将其与 GitHub 上流传的副本进行了比较，它们逐字节完全一致。
7. 我 Fork 的 FazuaUnlocker，[github.com/eminogrande/FazuaUnlocker](https://github.com/eminogrande/FazuaUnlocker)，使用 Python 3.9 和 hidapi 库。

原始工具通过 Windows USB 功能与驱动包通信。我的助手完全保留了协议、校验和以及写入逻辑，只把那一层替换成了 hidapi，它也能在 macOS 上运行。这就是 fazua_mac.py 文件，大约 75 行。固件本身是加密的，所以这里没有人修改固件。该工具只是改变一个设置。

## 第 1 步，将驱动包连接到 Mac

1. 从自行车上取下驱动包。电池留在驱动包内，并且必须处于开启状态。
2. 用 T10 螺丝刀拧开驱动包上的 USB 盖子。它位于底部靠近散热片的地方。
3. 将 mini USB 线连接到 Mac，并将驱动包平放在地板或桌子上。
4. 检查 Mac 是否识别到它。在终端中，`system_profiler SPUSBDataType | grep evation` 显示我的设备为 `evation v2.50`。对该工具来说，这是一个 ID 为 10C4:1001 的 USB HID 设备。

Fazua 在其官方指南中表示，固件更新只需要驱动包，不需要整辆车。在这个过程中，轮子不需要转动。

## 第 2 步，写入前先读取

首先退出 FAZUA Toolbox，因为它会占用 USB 连接。然后：

```sh
git clone https://github.com/eminogrande/FazuaUnlocker.git
cd FazuaUnlocker
python3 -m venv .venv && .venv/bin/pip install -r requirements-mac.txt
.venv/bin/python fazua_mac.py --read-only
```

我的设备在大约 110 毫秒后响应。最大自行车速度（Max Bike Speed）24.98 km/h，原始值 694。轮长 2121 mm。轴偏移量（Shaft offset）30533。该工具从该偏移量推导出一个小的写入密钥，我的是 ba88。我的助手将此读取结果保存为 JSON 文件，这样我随时可以恢复到这些确切的值。

然后进行模拟运行（dry run），它会构建带有校验和的写入数据包但不发送任何内容：

```sh
.venv/bin/python fazua_mac.py 55 --dry-run
```

## 第 3 步，降级到 2.04

这是有实际风险的部分。如果刷写中断，驱动包可能会变砖。所以电池要满电，线缆要固定好，驱动包要静止放置。

1. 打开 FAZUA Toolbox，进入 FIRMWARE UPDATE，点击 UPDATE NOW。
2. 选择手动（Manual）。不要选在线（Online），因为在线会再次安装最新版本。
3. 选择 evation_Software_2.04.bin，并在按下 START 之前检查文件名。
4. 等待。刷写后电机会进行校准，可能会有轻微震动。不要移动驱动包。
5. 再次用 system_profiler 检查。我的现在显示 `evation v2.04`。

降级后再次读取，仍然显示 24.98 km/h。仅仅改变固件并不能解锁任何东西。

## 第 4 步，写入 55 km/h

```sh
.venv/bin/python fazua_mac.py 55 --force
```

工具显示了从 24.98 km/h（原始值 694）到 55.00 km/h（原始值 1528）的变化。然后显示 "Write cycle acknowledged by bike"（自行车确认写入周期），随后它自动回读了该值。"SUCCESS: bikeMaxSpeed is now 55.01 km/h"（成功：bikeMaxSpeed 现在是 55.01 km/h）。几秒钟后单独读取的结果相同，轮长仍为 2121 mm。

该工具接受 5 到 75 km/h 的范围。我选择 55 是因为我想看看效果如何。我的助手建议 45，因为电机功率并非无穷大，超过一定速度后，大部分动力还是要靠你的腿。无论你设置什么，电机只是助力更久，它不会自己让车变快。

## 第 5 步，装回自行车

1. 拔掉线缆，用手拧回 USB 盖子，扭矩 1 到 1.5 Nm。没有盖子驱动包就不防水。
2. 将驱动包放入自行车，直到卡入到位。
3. 开机。

在我的车上，遥控器随后闪烁白光，顶部两个 LED 和底部两个 LED 交替闪烁。这看起来像错误。其实不是。Fazua 在其更新指南中写道：“LED 闪烁表示遥控器正在更新。更新期间请勿触摸遥控器，也不要关闭电助力自行车。”驱动包会将遥控器升级到它自己的固件版本。我的遥控器熄灭了一次，重新亮起，然后一切变绿。

然后我测试了。似乎有效。我还没有确切的最高速度，因为这辆车没有显示屏。下次我会把一个带 GPS 速度计的手机装在车把上。

## 路上出了什么问题

我的 agent 自己在 Mac 上点了 Toolbox，第一下点到了 CALIBRATION 而不是 FIRMWARE UPDATE。只是打开了页面，什么都没开始。然后点 Manual 没点中，因为后台发的点击到不了那个对话框。我的 agent 停在那里，因为点错 START 会再装一次 2.50。我自己点了 Manual 和文件。

前两次写入尝试都中止了。工具写入前会问 yes，我的 agent 喂答案的方式没到那个问题。什么都没写入，之后读出来还是 24.98 km/h。用 --force 就过了。

后来我又把 drivepack 拿出来，合上 USB 盖，动了磁铁，然后顶部 LED 变红了。红色不是磁铁的问题。Fazua 手册说顶部红色表示 drivepack 和 bottom bracket 之间的连接错误，就是车架上插进去的那个部件。我把它拿出来，检查了触点，再推回去直到咔哒一声，就好了。

静置 15 分钟后系统会自动关机。这也正常，手册里有写。

## 电池、模式和刷回去

限速是 drivepack 里的一个值。绿色、蓝色、粉色都用同一个 55 km/h。模式只改变电机推多少和电池多快没电。骑得越快耗电越多，所以超过 25 之后续航掉得很快。

在 2.04 固件上，骑行后电池保持唤醒的时间也更长。2.50 上 Fazua 把待机砍到了一到三小时，旧固件上最长八小时。所以骑完后我按住电池上的按钮两秒，直到 LED 熄灭。

连上线刷回原厂就是一条命令：

```sh
.venv/bin/python fazua_mac.py 25 --force
```

Eplus 写道解锁后可以再更新到 2.50。我没试过，所以现在我留在 2.04，不在 Toolbox 或 app 里点更新。

超过 25 km/h 后这辆车就不再是 pedelec。在德国它只允许在私人场地上骑，不能上公共道路，保修和保险可能也会失效。刷固件可能搞坏 drivepack。这里的一切都由你自己承担风险。
