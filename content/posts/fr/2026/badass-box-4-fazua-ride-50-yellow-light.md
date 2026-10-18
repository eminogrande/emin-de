---
title: "Badass Box 4 sur un Fazua Ride 50, le voyant jaune"
description: "Ma Badass Box 4 sur un Fazua Ride 50 n'arrêtait pas de clignoter en jaune. Ce que signifie le voyant, où va l'aimant, à quoi sert la bague noire et ce que Badass a dit."
date: "2026-10-14"
updated: "2026-10-14"
lang: fr
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
tldr: ["Le clignotement jaune sur la commande Fazua est un défaut mineur. Avec une Badass Box sur le capteur, cela indique que l'aimant de rayon n'atteint pas proprement la box.", "Pour moi, la solution a été de déplacer l'aimant sur le rayon qui passe le plus près de la box, juste à côté.", "La bague noire de 5 mm se place entre le capteur et la base arrière, pas sous l'aimant, et seulement si l'écart est trop grand.", "Seule la LED supérieure blanche signifie une batterie à plat ou mal installée, pas la box. Retirez la batterie et recliquez-la."]
sections: [{"basically": "Un clip de tuning sur le capteur de vitesse, quelques bonnes minutes, puis un voyant jaune clignotant et plus d'assistance."}, {"basically": "Le jaune est un défaut mineur. Le moteur manque des impulsions de vitesse, et le manuel dit de vérifier l'aimant de rayon."}, {"basically": "Une bague en plastique de 5 mm dans la boîte qu'aucun dépliant ni aucune vidéo ne mentionne. Notre première intuition à son sujet était fausse."}, {"basically": "Badass a répondu le après-midi même. La bague va sous le capteur, l'écart est de 5 à 10 mm."}, {"basically": "Extrémité Snap lock de la box, sur le rayon qui passe le plus près. C'était toute la solution pour moi."}, {"basically": "Une seule LED blanche et aucun mode donne l'impression que la box a cassé quelque chose. C'était la batterie mal enclenchée."}, {"basically": "L'application veut un nouveau firmware, Badass dit de ne jamais mettre à jour. Lisez la version dans la Toolbox, ne changez rien."}, {"basically": "Batterie, vélo sans box, puis aimant. Un changement à la fois, pour qu'un voyant jaune vous dise quelque chose."}]
---
## Ce que j'ai acheté et ce qui a mal tourné

Je roule sur un Fazua Ride 50, et le 7 octobre j'ai acheté une Badass Box 4 pour Fazua, 149 euros sur ebiketuningshop.com. La boîte se clipse sur le capteur de vitesse Fazua sur la base arrière. À l'intérieur il y a une pile AAA et un peu d'électronique, et avec son propre aimant de rayon elle modifie le signal que le moteur reçoit, pour que l'assistance ne s'arrête pas à 25 km/h.

Ça a marché quelques minutes. Puis la LED du haut sur la télécommande a commencé à clignoter en jaune. Parfois le moteur continuait avec moins de puissance, parfois il n'y avait plus d'assistance du tout.

La pile dans la boîte était neuve. La batterie du vélo était à environ 90 pour cent. L'aimant était là où j'avais compris que la notice le voulait. Toujours jaune.

## Ce que veut dire la lumière jaune

La télécommande Fazua a cinq LED. Celle du haut sert aussi de voyant d'état. Le manuel du Ride 50 appelle le jaune clignotant un défaut léger, un défaut temporaire ou non critique qui dans la plupart des cas veut dire performance réduite. Dans le tableau de dépannage, la cause est « Il pourrait y avoir une mauvaise connexion entre le capteur de vitesse et le BOITIER DE PEDALIER. » et la solution est de vérifier la position de l'aimant de rayon.

Donc avec une Badass Box sur le capteur, jaune veut dire que le moteur ne reçoit pas un signal de vitesse propre. La boîte se trouve entre l'aimant et le capteur. Si l'aimant passe trop loin ou au mauvais endroit, des impulsions se perdent et Fazua le signale.

Le rouge est un défaut grave, et là le vélo ne peut plus être utilisé du tout. C'est un autre problème et ce n'est pas ce que j'avais.

## L'anneau noir que personne n'explique

Dans la boîte il y avait un petit anneau en plastique dur noir. La boutique Badass le décrit comme une entretoise de 5 mm. Il fait 15 mm de large, a un trou de 5,3 mm et fait 5 mm d'épaisseur. La notice montre la boîte, la pile, l'aimant, le clip de fermeture et un collier en option. Pas d'anneau. La vidéo d'installation ne le montre pas non plus.

J'ai travaillé là-dessus avec mon agent, et il a deviné que l'anneau allait sous l'aimant de rayon, sur la vis à oreilles, pour rapprocher l'aimant de la boîte. Ça semblait logique. Mais l'anneau ne rentre pas sous l'aimant. La supposition était fausse, et son idée de partir du moyeu et de pousser l'aimant vers l'extérieur aussi.

## Demander à ceux qui le fabriquent

Alors j'ai écrit à Badass et à la boutique et j'ai posé quatre questions. À quoi sert l'anneau, où il va, quel écart est le bon, et est-ce que la lumière jaune peut venir de l'écart ou si la boîte est cassée.

Badass a répondu le même après-midi, en quatre lignes courtes.

1. Il réduit la distance entre la boîte et l'aimant, si nécessaire.
2. Il va entre le capteur et la base arrière.
3. L'écart devrait être de 5 à 10 mm.
4. « Ja, unwahrscheinlich. » Je lis ça comme oui, l'écart peut en être la cause, et un défaut est improbable.

La boutique a répondu aussi. Ils m'ont renvoyé vers Badass et ont dit qu'ils échangent la boîte si elle s'avère cassée. Badass donne aussi aux clients particuliers un mois de satisfait ou remboursé.

Sur mon vélo l'anneau ne marche pas. Relever le capteur de 5 mm vers la roue le ferait toucher les rayons. Donc l'anneau reste dans le tiroir. C'est ce que veut dire « si nécessaire ». C'est pour les cadres où le capteur est loin des rayons.

```
vue de côté

  rayons     [aimant]
                |  5 à 10 mm
          [ boîte sur capteur ]
          [ anneau 5 mm ]        seulement si l'écart est trop grand
  ========== base arrière ==========
```

## Où va vraiment l'aimant

Deux choses comptent, et ce sont des vis différentes.

La position le long du rayon décide quelle partie de la boîte l'aimant passe devant. L'image de la notice avec le tick vert montre l'aimant au bout de la boîte opposé au câble, le côté du clip de fermeture. La vidéo Badass le dit en d'autres mots, au bord de la boîte vers le moyeu, et ensuite on « tâtonne autour de la bonne position » en tournant la roue à la main.

L'écart est la distance entre la face de l'aimant et la boîte. Badass dit 5 à 10 mm. Le manuel Fazua pour l'ancien Evation autorise 4 à 15 mm entre le repère du capteur et l'aimant, sans aucune boîte.

Et voilà mon vrai erreur. La roue arrière a des rayons qui se croisent, et un sur deux passe un peu plus près de la base arrière. Mon aimant était sur un des éloignés. Sur ma photo il semblait à 15 ou 20 mm de la boîte. C'est trop loin.

Ce qui a réglé le problème pour moi :

1. Soulever la roue arrière pour qu'elle tourne librement.
2. La tourner lentement et regarder quel rayon passe le plus près de la boîte.
3. Déplacer l'aimant sur ce rayon, côté aimant face à la boîte, juste à côté de la boîte.
4. Tourner la roue à nouveau. L'aimant doit passer près mais ne jamais toucher.
5. Éteindre et rallumer le vélo, pour que l'ancien défaut disparaisse, et tourner les manivelles à la main pendant une minute ou deux.
6. Si le jaune revient, déplacer l'aimant de quelques millimètres le long du rayon et recommencer.

Après l'avoir déplacé, le test sur béquille a tourné sans jaune. Une sortie plus longue devra encore le prouver.

## La lumière blanche qui n'était pas la boîte

À mi-chemin des tests, autre chose s'est passé. Seule la LED du haut était allumée, blanche, et rien de ce que je tapotais ne changeait le mode. Au démarrage la télécommande a fait ses couleurs, vert, bleu et rose, puis elle est retombée sur cette unique lumière blanche.

Ça ressemble à la boîte qui a cassé quelque chose. Ce n'était pas le cas. Le blanc est la couleur pour aucune assistance. Et le manuel du Ride 50 dit « Si la BATTERIE est vide, la LED supérieure de l'indicateur d'état s'allume en blanc ou aucune LED ne s'allume. » Ma batterie n'était pas vide, donc elle était très probablement mal enclenchée.

J'ai sorti la batterie du drivepack et je l'ai reclipée. Bleu à nouveau, mode River, assistance de retour.

Si jamais ça ne suffit pas, le manuel a deux étapes de plus. Maintenir le bouton sur la batterie pendant 3 secondes pour l'éteindre, puis appuyer à nouveau, ça réinitialise la protection de la batterie. Ou maintenir le bouton central de la télécommande pendant 8 secondes jusqu'à ce que toutes les LED s'éteignent, attendre que la LED du haut clignote en vert ou en bleu, et démarrer normalement.

## Firmware, l'appli et pourquoi je n'y ai pas touché

La télécommande n'affiche pas de vitesse, donc je voulais l'appli FAZUA pour les tests. Elle ne s'est pas connectée. La nouvelle FAZUA App a besoin du dernier firmware, et sur un Ride 50 aussi d'une mise à jour de la puce Bluetooth qui ne marche que via l'ancienne Rider App.

Badass écrit sur ses pages de boutique de ne pas mettre à jour le firmware du moteur, parce que les mises à jour peuvent fermer la porte au tuning. « Un vélo électrique qui marche n'a probablement pas besoin de mise à jour. » Donc je n'ai pas mis à jour, et j'ai testé sans l'appli.

On peut quand même lire le firmware sans rien changer. La FAZUA Toolbox gratuite tourne sur un ordinateur. Sortir le drivepack, mettre la batterie dedans, ouvrir le cache USB, brancher un câble de données mini USB, et la Toolbox affiche la version et les codes d'erreur. Ne jamais appuyer sur update. Remettre le cache avant de rouler, parce que sans lui le drivepack n'est pas étanche. Je n'en ai pas encore eu besoin.

## L'ordre dans lequel je testerais la prochaine fois

1. Vérifier d'abord la pile AAA dans le boîtier. Un multimètre devrait afficher environ 1,5 V. Badass veut une pile normale, pas une rechargeable.
2. Tester le vélo sans le boîtier, aimant remis à sa place d'origine. Si ça clignote jaune sans le boîtier, le problème vient du vélo, pas du boîtier.
3. Pousser le boîtier jusqu'au clic du verrou. Aimant sur le rayon qui passe au plus près, du côté du verrou.
4. Écart de 5 à 10 mm, proche mais jamais en contact.
5. Redémarrer après chaque jaune, tester une minute, changer une seule chose à la fois.
6. Seule la LED du haut en blanc veut dire pile, pas boîtier. La sortir, la remettre en place jusqu'au clic.
7. Ne pas toucher au firmware.
8. Si rien ne marche, écrire à service@badassebikes.com avec des photos du boîtier et de l'aimant. Ils m'ont répondu le jour même.

Badass dit lui-même que le boîtier n'est pas autorisé sur la voie publique selon le StVO allemand, seulement sur terrain privé. On l'enlève et le vélo redevient d'origine.
