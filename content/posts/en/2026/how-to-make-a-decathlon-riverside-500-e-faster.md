---
title: "How to make a Decathlon Riverside 500 E faster"
seo_title: "Riverside 500 E tuning how-to | emin.de"
description: "A complete how-to for the Decathlon Riverside 500 E: the free magnet hack, the Badass Box, and a KT controller swap, with drawings, part links and test steps."
date: 2026-10-13
updated: 2026-10-13
lang: en
translations: {}
category: building
format: guide
author: emin
provenance: written
ai_assisted: true
reviewed_by_human: false
tags: ["ebike","tuning","Decathlon","Riverside 500 E","KT controller","how-to"]
source_links:
  - { title: "Decathlon: Riverside 500 E product page", url: "https://decathlon.co.uk/p/electric-hybrid-bike-riverside-500-e/_/R-p-169143", note: "Motor and battery specs." }
  - { title: "Arthur Brs: Riverside 500E Speed Unlock", url: "https://www.youtube.com/watch?v=Cdm-WZnxCZ4", note: "The video that confirms the service menu does not exist on this model." }
  - { title: "Pedelec-Forum: Riverside 500 e schneller machen", url: "https://www.pedelecforum.de/forum/index.php?threads/riverside-500-e-schneller-machen.102938/", note: "German thread asking the same question." }
  - { title: "K&J Magnetics: Reed switches and Hall effect sensors", url: "https://www.kjmagnetics.com/blog/reed-switches-and-hall-effect-sensors/", note: "Trigger fields, magnet orientation and polarity." }
  - { title: "KT controller 17A with LCD3", url: "https://www.aliexpress.us/item/3256808397983216.html", note: "The controller I use in the swap." }
tldr:
  - "The Riverside 500 E has a rear hub motor, so the usual tuning chips do not fit."
  - "The free fix is moving the spoke magnet to the crank arm. Assist keeps pushing to about 32 km/h."
  - "The real fix is a KT controller swap, about 65 dollars in parts."
  - "Both are reversible if you keep the old parts."
basically:
  the-bike-and-why-it-stops-at-25: "A house brand hub motor, a sealed controller and no hidden menu. Everything cheap that works on other bikes does not work here."
  first-check-what-actually-limits-the-bike: "Faster and more power are two different screws. Pick which one you are turning."
  the-free-fix-move-the-magnet: "The controller measures the wheel through a spoke magnet. Measure the crank instead and it stops cutting off."
  how-strong-the-magnet-has-to-be: "Any small neodymium disc works if it is close enough. Too strong never hurts, too far does."
  the-clean-fix-badass-box: "A clip with a magnet inside that doubles the pulses. No wires, no soldering, off again in a minute."
  the-real-fix-kt-controller: "About 65 dollars of AliExpress parts replace the brain of the bike. More amps and a display that lets you set the limit."
  wiring-and-first-start: "Phase and hall wires are the only risky part. Everything else is plug and cable ties."
  what-can-break-and-what-it-costs: "The old parts go back in if it fails. The law cares above 25, so decide where you ride it."
---
## The bike and why it stops at 25

The Riverside 500 E is Decathlon's hybrid pedelec. The motor is a 250 watt brushless hub in the rear wheel, house brand "Vision", 42 Nm of torque, fed by a 36 V 11.6 Ah battery. Like every pedelec sold in the EU, the assist shuts off at 25 km/h.

That matters for tuning because almost everything on the market is made for mid drive motors. SpeedBox, PearTune and the motor-specific Badass Boxes are built for Bosch, Brose, Shimano. None of them physically fit this bike.

So the options narrow down to three: trick the speed sensor, clip a box onto it, or replace the controller. There is no hidden service menu either. The Rockrider E-ST 100 has one where you can shrink the wheel size in the display. The 500 E display has no wheel entry at all. I checked the whole menu and the forums agree.

## First check what actually limits the bike

Two separate limits live in the controller. The speed limit kills the assist at 25. The current limit, around 13 A on this bike, caps torque. Raising one does nothing for the other.

```
want faster            want harder push
     |                       |
speed sensor hack      controller with more amps
or KT controller      (KT 15A / 17A / 22A)
     |                       |
assist to ~32 km/h     same top speed, more torque
```

The free magnet hack only touches speed. A controller swap touches both, because a KT controller lets you set the current and the limit in the display.

## The free fix, move the magnet

Look at the rear wheel. On the left chainstay, close to the dropout, sits a small black sensor on a cable. Opposite it, clamped to a spoke, sits a magnet. That pair is the speedometer of the whole system.

The hack: the controller believes whatever speed that sensor reports. If the sensor measures your pedal instead of the wheel, the controller thinks you are slow and keeps pushing.

```
BEFORE (stock)                          AFTER (hack)

  frame                                  frame
   |                                      |
   | sensor --- 2mm --- spoke              | sensor (turned inward,
   |            magnet                    |  cable still attached)
   |                                      |        3-5 mm
   v                                      v   +------------+
[ rear wheel ]                        crank arm  | magnet now |
                                      (rotates)  | on the arm  |
                                                 +------------+
```

Steps:

1. Unscrew the sensor from the chainstay. It is usually a Torx T25, and the screw sits in thread locker, so go slow.
2. Zip tie the sensor so it faces the inside of the crank arm. The cable stays connected.
3. Take the magnet off the spoke and stick it to the inside of the crank arm, at the same height as the sensor. Tape or a zip tie holds it fine for testing.
4. The gap between magnet and sensor is 3 to 5 mm on every pass of the crank.
5. Lift the rear wheel, turn the pedals by hand. The display must show a speed. If it shows zero or an error, the motor will not run at all, so fix the gap first.

The display now lies to you. At a real 25 km/h it reads 6 or 7. Use a phone GPS for the truth. Reverse the whole thing in ten minutes.

Result: assist up to roughly 32 to 35 km/h, limited by how fast you can spin the cranks. Cost: zero.

## How strong the magnet has to be

The sensor is a reed switch or a hall sensor. It triggers somewhere between 10 and 100 gauss at its face, which is not much. The stock spoke magnet normally does the job if the gap is small.

If it does not trigger reliably, any small neodymium disc works. N42 to N52 strength, 10 to 15 mm diameter, 3 to 5 mm thick. That costs one or two dollars. Too strong never hurts. Too far does.

Polarity matters. Hall sensors want one pole facing them, reed switches want the magnetic axis parallel to the switch. The practical rule: if the display stays at zero, flip the magnet 180 degrees and try again. That fixes it almost every time.

## The clean fix, Badass Box

If the zip tie look is not for you, the Badass Box 4 Universal does the same job in a housing. It clips around the sensor and doubles the magnetic pulses per wheel turn, so the controller counts half speed. No wires, no soldering, off the bike again in under a minute, and it leaves no trace for a workshop diagnostic.

It costs around 130 euros, which is real money for what is inside, but it is the only option that keeps the warranty intact. One catch: the spoke magnet has to pass the sensor at 8 to 14 mm distance, and the box shows half your real speed on the console unless you pair the Boost Buddy app.

## The real fix, KT controller

The brain of the bike is a controller sealed in the compartment under the battery, glued in. Replace it and you own the current and the speed limit.

Parts, all AliExpress, about 65 dollars:

| Part | Price | What it does |
| --- | --- | --- |
| KT controller 17A with LCD3 | $45.73 | New brain, current set by display |
| 9-pin motor extension cable | $10.90 | Watertight harness you cut up |
| KT-V12L pedal sensor | $2.94 | 12 signal cadence sensor for the KT |
| 5-pin SM display cable, 170 cm | $5.33 | LCD3 to the handlebar |

Pick 17A, not 22A. The battery management system of the 36 V 11.6 Ah pack supplies about 20 to 25 A, and a 22 A controller rides that line. 17 A is roughly 610 W peak against the stock 470 W, a clear push without cooking anything.

## Wiring and first start

The stock pedal sensor speaks its own protocol, so the KT gets its own 12 signal sensor on the bottom bracket. Everything else is plug and play except the motor.

```
controller                 motor (Vision hub)
   |                            |
   |  3 phase wires   thick: yellow / green / blue
   |  5 hall wires    thin: red black yellow green blue
   |                            |
   +--- solder 1:1, colours matching, then heat shrink
```

1. Photograph every connector on the old controller before unplugging anything.
2. Open the compartment under the battery. The lid is glued, lever it carefully.
3. Cut the old motor connectors off, solder the KT harness to the motor wires colour to colour, shrink tube everything.
4. First start with the rear wheel off the ground. If the motor stutters or spins backwards, the hall order is wrong. Battery off, swap two hall wires, try again. It is normally one or two attempts out of six combinations. Never unplug anything with the battery live.
5. Clamp the KT-V12L sensor on the left side of the bottom bracket, magnet disc facing the sensor, 3 to 5 mm gap.
6. Mount the LCD3, set 36 V, wheel size 28 inch, pedal signals 12, current 17 A.
7. If an assist limit still kicks in, shrink the wheel diameter value in the display. 28 to 22 inch reads about 25 percent slow and moves the cutoff accordingly.
8. Test in the yard, then the street. Full repair path: the old controller and its connectors go back in and the bike is stock again.

One honest warning. The Vision hub pinout is not documented. If the hall guessing never settles, buy the KT dual mode controller instead, it runs sensorless and ignores the hall wires completely.

## What can break and what it costs

The motor is a geared hub with no cooling. Sustained 600 W uphill will cook the windings eventually. Ride the current down to 15 A if the bike mostly climbs.

The law in Germany: above 25 km/h assist the bike is no longer a pedelec. Insurance and approval become the question, and the warranty is gone the moment the compartment is opened. Ride the unlocked setting on private ground and none of that exists.

Money at risk is 65 dollars of parts plus an afternoon. Both fixes are reversible. Keep the old connectors in a bag, tape it under the battery cover, and you can always go back.

For me the order was clear. Test the magnet hack first, because it is free and takes fifteen minutes. If the speed is enough and you do not mind the lying display, stop there. If you also want the torque, or a display that tells the truth, the KT swap is the real fix.
