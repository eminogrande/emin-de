---
title: "Badass Box 4 装在 Fazua Ride 50 上，黄灯闪烁"
description: "我的 Badass Box 4 装在 Fazua Ride 50 上一直闪黄灯。黄灯是什么意思，磁铁该装在哪，那个黑色圆环是干嘛的，以及 Badass 官方怎么说。"
date: "2026-10-14"
updated: "2026-10-14"
lang: zh
translated_from: "en/badass-box-4-fazua-ride-50-yellow-light"
source_sections: ["what-i-bought-and-what-went-wrong", "what-the-yellow-light-means", "the-black-ring-nobody-explains", "asking-the-people-who-make-it", "where-the-magnet-actually-goes", "the-white-light-that-was-not-the-box", "firmware-the-app-and-why-i-left-them-alone", "the-order-i-would-test-in-next-time"]
category: building
format: guide
author: emin
provenance: mixed
ai_assisted: true
reviewed_by_human: false
tags: ["ebike", "tuning", "Fazua Ride 50", "Badass Box", "how-to"]
source_links: [{"title": "FAZUA RIDE 50 TRAIL/STREET user manual", "url": "https://fazua.com/documents/1194/EN_Benutzerhandbuch_FAZUA_RIDE_50.pdf", "note": "Status LED colours, troubleshooting table, battery and restart steps."}, {"title": "FAZUA RIDE 50 EVATION user manual", "url": "https://fazua.com/documents/1197/EN_Benutzerhandbuch_FAZUA_RIDE_50_EVATION.pdf", "note": "The 4 to 15 mm gap between sensor mark and spoke magnet."}, {"title": "badassBox 4 Fazua product page", "url": "https://www.badassebikes.com/en/badassbox/badassbox-4-fazua_156_1051", "note": "Scope of delivery, including the 5 mm distance bush."}, {"title": "Badass eBikes: installing the badassBox4 classically on the chain stay", "url": "https://www.youtube.com/watch?v=jBTKFzDBUNY", "note": "Where the magnet sits relative to the box."}, {"title": "FAZUA Toolbox Software", "url": "https://fazua.com/en/support/help-center/fazua-toolbox-software/", "note": "Reading firmware version and error codes over USB."}]
tldr: ["Fazua 遥控器上闪黄灯是软故障。如果传感器上装了 Badass Box，问题通常出在辐条磁铁没有干净地经过盒子。", "对我来说，解决办法是把磁铁移到离盒子最近的那根辐条上，紧挨着它。", "那个黑色的 5 毫米圆环是垫在传感器和后下叉之间的，不是垫在磁铁下面的，而且只有在间隙太大时才用。", "只有顶部 LED 亮白灯，说明电池没电了或者没装好，不是盒子的问题。把电池拔出来，重新咔哒一声装回去。"]
sections: [{"basically": "一个调谐夹片装在速度传感器上，几分钟还好好的，然后就开始闪黄灯，没了助力。"}, {"basically": "黄灯是软故障。电机接收不到速度脉冲，说明书上说检查辐条磁铁。"}, {"basically": "盒子里有个 5 毫米的塑料环，说明书和视频都没提过。我们一开始猜错了它的用途。"}, {"basically": "Badass 当天下午就回复了。圆环垫在传感器下面，间隙是 5 到 10 毫米。"}, {"basically": "盒子末端的卡扣，扣在离它最近的那根辐条上。对我来说这就是全部的解决办法。"}, {"basically": "一个 LED 亮白灯，没有助力模式，看起来像是盒子把什么东西弄坏了。其实是电池没装好。"}, {"basically": "App 提示要更新固件，Badass 说千万别更新。在 Toolbox 里读一下版本号，什么都别改。"}, {"basically": "电池，不装盒子的车，然后是磁铁。一次只改一个地方，这样黄灯才能告诉你问题出在哪。"}]
---
## 我买了什么，出了什么问题

我骑的是一辆 Fazua Ride 50。10 月 7 日，我在 ebiketuningshop.com 上花 149 欧元买了一个适配 Fazua 的 Badass Box 4。这个盒子卡在后下叉上的 Fazua 速度传感器外面。里面有一节 AAA 电池和一些电子元件，配合它自带的辐条磁铁，改变电机接收到的信号，这样助力就不会在 25 km/h 时切断。

它正常工作了几分钟。然后遥控器上最上面的 LED 开始闪黄灯。有时电机还以较低的功率继续工作，有时完全没有助力。

盒子里的电池是新的。自行车电池还有大约 90% 的电量。磁铁的位置也是按照我理解说明书上要求放的。还是黄灯。

## 黄灯意味着什么

Fazua 遥控器有五个 LED。最上面那个同时兼任状态指示灯。Ride 50 手册把闪黄灯称为软故障，一种临时性或非关键性的故障，大多数情况下意味着性能下降。在故障排除表里，原因是"速度传感器和 BOTTOM BRACKET 之间可能连接不良。"解决办法是检查辐条磁铁的位置。

所以，传感器上装了 Badass Box 之后，黄灯意味着电机没有收到干净的速度信号。盒子位于磁铁和传感器之间。如果磁铁经过时距离太远或位置不对，脉冲就会丢失，Fazua 就会报错。

红灯是硬故障，那就意味着自行车完全不能用了。那是另一个问题，不是我遇到的情况。

## 没人解释的黑色圆环

盒子里有一个黑色的小硬塑料圆环。Badass 商店把它列为 5 mm 间距衬套。它宽 15 mm，孔径 5.3 mm，厚度 5 mm。说明书上画了盒子、电池、磁铁、卡扣和一根可选的扎带。没有圆环。安装视频里也没有出现它。

我和我的 agent 一起研究了这个问题，它猜测这个圆环是垫在辐条磁铁下面、拇指螺丝上的，用来把磁铁推得离盒子更近。这听起来很合理。但圆环根本放不进磁铁下面。这个猜测是错的，它建议从花鼓端开始把磁铁往外推的想法也是错的。

## 问制造的人

于是我写信给 Badass 和那家商店，问了四个问题。这个圆环是干什么用的，装在哪里，间隙应该是多少，黄灯是间隙引起的还是盒子坏了。

Badass 当天下午就回复了，四行短句。

1. 它在需要时缩小盒子和磁铁之间的距离。
2. 它装在传感器和后下叉之间。
3. 间隙应该是 5 到 10 mm。
4. "Ja, unwahrscheinlich." 我的理解是，是的，间隙可能导致这个问题，而盒子坏了的可能性不大。

商店也回复了。他们让我去找 Badass，并说如果确认盒子坏了可以换货。Badass 还给个人消费者一个月的退款期。

在我的车上，这个圆环用不了。把传感器往车轮方向抬高 5 mm 会让它碰到辐条。所以这个圆环就留在抽屉里了。这就是"if needed"的意思。它是为那些传感器离辐条很远的车架准备的。

```
侧视图

  辐条       [磁铁]
                |  5 到 10 mm
          [ 传感器上的盒子 ]
          [ 5 mm 圆环 ]        仅在间隙过大时使用
  ========== 后下叉 ==========
```

## 磁铁到底该放在哪

有两个要点，对应的是不同的螺丝。

磁铁沿辐条的位置决定了它经过盒子的哪个部位。说明书上带绿色对勾的图示显示，磁铁应该位于盒子远离线缆的那一端，也就是卡扣那一端。Badass 的视频换了个说法，在盒子朝向花鼓的那一侧边缘，然后你一边用手转动车轮一边"摸索正确的位置"。

间隙是磁铁表面和盒子之间的距离。Badass 说 5 到 10 mm。老款 Evation 的 Fazua 手册允许传感器标记和磁铁之间 4 到 15 mm，那是不装盒子的情况。

这就是我实际犯的错误。后轮有交叉的辐条，每隔一根就有一根经过时离后下叉更近一些。我的磁铁装在了一根较远的辐条上。从我的照片上看，它离盒子有 15 到 20 mm。太远了。

对我管用的修法：

1. 抬起后轮，让它能自由转动。
2. 慢慢转动车轮，看哪根辐条经过时离盒子最近。
3. 把磁铁移到那根辐条上，磁铁面朝向盒子，紧挨着盒子。
4. 再次转动车轮。磁铁必须近距离经过但绝不能碰到。
5. 关掉自行车再打开，让旧故障清除，然后用手转动曲柄一到两分钟。
6. 如果黄灯又亮了，沿辐条把磁铁移动几毫米，重复上述步骤。

移动磁铁之后，台架测试没有再出现黄灯。还需要一次更长的骑行来验证。

## 那个不是盒子造成的白灯

测试进行到一半时，发生了另一件事。只有最上面的 LED 亮着，白色，我怎么按都改变不了模式。开机时遥控器依次亮过绿色、蓝色和粉色，然后就退回到那一个白灯。

这看起来像是盒子把什么东西弄坏了。其实不是。白色是无助力模式的颜色。而 Ride 50 手册说："如果 BATTERY 电量耗尽，状态指示灯最上面的 LED 会亮白色，或者所有 LED 都不亮。"我的电池没有没电，所以最可能是电池没有安装到位。

我把电池从驱动组件里拔出来，重新卡进去。又变蓝了，River 模式，助力回来了。

如果这也不管用，手册里还有两个步骤。按住电池上的按钮 3 秒关机，然后再按一次，这会重置电池保护。或者按住遥控器中间的按钮 8 秒，直到所有 LED 熄灭，等到最上面的 LED 闪绿色或蓝色，然后正常启动。

## 固件、App，以及我为什么都没碰

遥控器不显示速度，所以我想装 FAZUA app 来测试。连不上。新版 FAZUA App 需要最新固件，而在 Ride 50 上还需要一个蓝牙芯片更新，这个更新只能通过老版 Rider App 完成。

Badass 在其商店页面上写明不要更新电机固件，因为更新可能会关闭调优的大门。"An e-bike that works probably does not need an update." 所以我没有更新，也没有用 app 来测试。

你仍然可以读取固件信息而不做任何改动。免费的 FAZUA Toolbox 在电脑上运行。取出驱动组件，把电池装进去，打开 USB 盖，接上一根 mini USB 数据线，Toolbox 就会显示版本号和错误码。永远不要点更新。骑行前记得把盖子装回去，因为没有它驱动组件就不防水了。我目前还没用到这个。

## 下次我会按这个顺序排查

1. 先检查盒子里的 AAA 电池。用万用表测，应该显示 1.5 V 左右。Badass 要用普通电池，不能用充电电池。
2. 把盒子取下来测试自行车，磁铁放回原来的位置。如果不装盒子也闪黄灯，那问题出在自行车上，不是盒子的问题。
3. 把盒子推上去，直到卡扣"咔哒"一声锁紧。磁铁装在离卡扣端最近、经过时距离最近的那根辐条上。
4. 间隙保持在 5 到 10 毫米，要近，但绝不能碰到。
5. 每次闪黄灯后重启，测试一分钟，一次只改一个地方。
6. 只有顶部 LED 亮白灯，说明是电池的问题，不是盒子。把电池拔出来，再"咔哒"一声装回去。
7. 固件别动。
8. 如果都不管用，发邮件到 service@badassebikes.com，附上盒子和磁铁的照片。他们当天就回复了我。

Badass 自己也说了，按照德国 StVO 法规，这个盒子不允许在公共道路上使用，只能在私人场地用。把它取下来，自行车就恢复原样了。
