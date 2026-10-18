---
title: "Débridage de la vitesse du Fazua Ride 50 depuis un Mac, sans boîtier"
description: "Comment mon agent et moi avons relevé la limite de vitesse d'un Fazua Ride 50 Evation de 25 à 55 puis 69,77 km/h via USB depuis un MacBook, avec le firmware 2.04 et un outil open source."
date: "2026-10-16"
updated: "2026-10-18"
lang: fr
translated_from: "en/fazua-ride-50-speed-unlock-mac"
source_sections: ["the-bike-and-the-problem", "the-idea-change-one-number-instead-of-fooling-the-sensor", "what-i-used", "step-1-connect-the-drivepack-to-the-mac", "step-2-read-before-you-write", "step-3-downgrade-to-204", "step-4-write-55-kmh", "step-5-back-into-the-bike", "what-went-wrong-on-the-way", "battery-modes-and-going-back", "update-raw-value-1938", "free-help-in-berlin"]
category: building
format: guide
author: emin
provenance: mixed
ai_assisted: true
reviewed_by_human: false
tags: ["ebike", "tuning", "Fazua Ride 50", "Canyon Roadlite:ON", "macOS", "how-to"]
source_links: [{"title": "FazuaUnlocker, my fork with the Mac port", "url": "https://github.com/eminogrande/FazuaUnlocker", "note": "fazua_mac.py, README-MAC.md and the firmware download script."}, {"title": "FazuaUnlocker by quezzas", "url": "https://github.com/quezzas/FazuaUnlocker", "note": "The original Windows tool, MIT licence."}, {"title": "FAZUA Toolbox Software", "url": "https://fazua.com/en/support/help-center/fazua-toolbox-software/", "note": "The official tool for firmware updates over USB."}, {"title": "FAZUA: How to do a Ride 50 firmware update", "url": "https://fazua.com/en/support/help-center/videos/how-to-fazua-ride-50-firmware-update", "note": "Manual firmware install, and why the remote LEDs flash afterwards."}, {"title": "Eplus Flash Home, Fazua speed unlocker", "url": "https://www.eplus.bike/en/prodotto/fazua-software-home-speed-unlocker/", "note": "The paid Windows version of the same idea, and the 2.50 to 2.04 downgrade note."}, {"title": "Firmware 2.04, archived original from fazua.com", "url": "https://web.archive.org/web/20220709185915/https://fazua.com/documents/826/evation_Software_2.04.bin", "note": "Internet Archive snapshot of 9 July 2022."}]
tldr: ["Le Fazua Ride 50 stocke sa limite de 25 km/h comme une simple valeur dans le drivepack. Avec le firmware 2.04, on peut la modifier via USB.", "Je l'ai fait depuis un MacBook Pro M4. L'outil open source était Windows only, alors mon agent a remplacé sa couche USB par hidapi.", "Le firmware 2.50 a dû d'abord revenir en 2.04, via la FAZUA Toolbox officielle. Le fichier 2.04 est l'original de fazua.com.", "Relecture après écriture : d'abord 55,01 km/h, deux jours plus tard valeur brute 1938, soit 69,77 km/h. Si vous êtes à Berlin, je vous aide à débloquer le vôtre gratuitement."]
sections: [{"basically": "Un Canyon Roadlite:ON de 2020 avec un Fazua Ride 50 Evation, et un boîtier de tuning qui clignotait jaune sans arrêt."}, {"basically": "Le boîtier ment au capteur de vitesse. Le logiciel change juste la limite que le moteur vérifie."}, {"basically": "Mon vélo, mon MacBook, un câble mini USB, un tournevis T10, la FAZUA Toolbox et environ 75 lignes de Python."}, {"basically": "Drivepack sorti, batterie branchée, cache USB enlevé, câble branché. Le Mac le voit comme evation v2.50."}, {"basically": "D'abord lecture seule. Le mien affichait 24,98 km/h et une roue de 2121 mm. Ce fichier sert aussi de sauvegarde."}, {"basically": "Dans la FAZUA Toolbox, choisir Manual, pas Online, sélectionner le fichier 2.04 et laisser flasher et calibrer."}, {"basically": "Une commande écrit la nouvelle limite, le vélo la confirme, et une deuxième lecture affiche 55,01 km/h."}, {"basically": "Des LED blanches qui clignotent en alternance, c'est la télécommande qui se met à jour. Ne pas y toucher tant qu'elle n'affiche pas vert."}, {"basically": "Un mauvais clic, deux écritures avortées, et un voyant rouge qui n'était qu'un drivepack mal enfoncé."}, {"basically": "La limite est la même dans tous les modes. L'autonomie, non. Une commande la ramène à 25."}, {"basically": "Deux jours plus tard je suis passé à la valeur brute 1938, l'année de naissance de mon père. Soit 69,77 km/h."}, {"basically": "Si vous êtes à Berlin et voulez débloquer votre Fazua Ride 50, écrivez-moi. C'est gratuit."}]
---
## Le vélo et le problème

Mon vélo est un Canyon Roadlite:ON AL 7.0 de 2020, taille M, gris pace et orange. Le moteur est un Fazua Evation, que Fazua appelle aujourd'hui Ride 50 Evation. Le drivepack, moteur et batterie en une seule longue pièce, se loge dans le tube diagonal et se retire avec un levier. La batterie est une Energy 250, la télécommande tactile est intégrée au cadre. Il n'y a pas d'écran sur le guidon, donc le vélo ne vous dit jamais à quelle vitesse vous allez.

Avant ça, mon drivepack tournait sous le firmware 2.50 et la batterie sous le firmware 1.15. Je ne le sais que parce que je l'ai lu avec la FAZUA Toolbox, voir plus bas.

L'assistance se coupe à 25 km/h, comme sur tous les pedelecs de l'UE. Je voulais voir ce que le vélo donne avec plus. Alors le 7 octobre j'ai acheté une Badass Box 4 pour Fazua. J'en ai parlé dans [Badass Box 4 sur un Fazua Ride 50, la lumière jaune](/posts/badass-box-4-fazua-ride-50-yellow-light). Ça a marché pendant une ou deux minutes, puis la LED du haut a clignoté en jaune à nouveau. Aimant plus près, autre rayon, tourné à 90 degrés, le support Badass a dit que l'installation avait l'air bonne. Toujours jaune après quelques minutes de route.

## L'idée, changer un chiffre au lieu de tromper le capteur

La Badass Box se monte sur le capteur de vitesse au niveau des haubans et modifie les impulsions de l'aimant de rayon, pour que le moteur croie que vous allez plus lentement qu'en réalité. C'est une ruse sur le signal, et sur mon vélo Fazua l'a remarqué au bout d'un moment et a signalé une erreur logicielle.

Le moteur lui-même ne fait que comparer votre vitesse avec une valeur stockée. Fazua l'appelle bikeMaxSpeed. Les revendeurs peuvent la voir dans la Toolbox, mais pour les utilisateurs normaux elle est grisée. Si vous changez cette valeur, il n'y a rien à tromper. Le capteur rapporte la vitesse réelle et le moteur aide simplement plus longtemps.

Mon agent a trouvé deux façons de faire ça. L'entreprise italienne Eplus vend Flash Home pour 134 euros hors TVA, Windows uniquement. Et il y a FazuaUnlocker sur GitHub par quezzas, gratuit, licence MIT, Windows uniquement aussi. Les deux disent la même chose. Ça marche sur le firmware 2.04. Sur 2.50, il faut d'abord revenir à 2.04.

```
avant (box)                            après (logiciel)

aimant de rayon -> [box] -> capteur    aimant de rayon -> capteur
                 |  fausse vitesse                      |  vitesse réelle
                 v                                       v
drivepack : limite 25 km/h             drivepack : limite 55 km/h
           -> jaune après 1-2 min                 -> pas de box, pas de jaune
```

## Ce que j'ai utilisé

1. Le vélo, batterie complètement chargée.
2. Un MacBook Pro M4, 16 Go, macOS 15.5. Il tourne sur Apple Silicon, pas de Windows, pas de machine virtuelle.
3. Un câble de données mini USB. Pas un câble de charge uniquement.
4. Un tournevis Torx T10 pour le capuchon USB.
5. FAZUA Toolbox 2.29 basic pour macOS sur Apple Silicon, depuis le site de Fazua.
6. Firmware 2.04, fichier evation_Software_2.04.bin. Le lien original fazua.com a disparu, mais l'Internet Archive l'a conservé depuis le 9 juillet 2022. SHA-256 8fe885c9dfc7caa9cf8e61b88051bf8d42da53747c4fd86d2b72c3c2ef23d32e. Mon agent l'a comparé avec la copie qui circule sur GitHub, et elles sont identiques à l'octet près.
7. Mon fork de FazuaUnlocker, [github.com/eminogrande/FazuaUnlocker](https://github.com/eminogrande/FazuaUnlocker), avec Python 3.9 et la bibliothèque hidapi.

L'outil original parle au drivepack via les fonctions USB de Windows. Mon agent a laissé le protocole, la somme de contrôle et la logique d'écriture exactement tels quels et a seulement remplacé cette couche par hidapi, qui tourne aussi sur macOS. C'est le fichier fazua_mac.py, environ 75 lignes. Le firmware lui-même est chiffré, donc personne ici ne modifie le firmware. L'outil ne change qu'un paramètre.

## Étape 1, connecter le drivepack au Mac

1. Sortez le drivepack du vélo. La batterie reste à l'intérieur du drivepack et doit être allumée.
2. Dévissez le capuchon USB du drivepack avec le T10. Il se trouve en bas, près des ailettes de refroidissement.
3. Connectez le câble mini USB au Mac et posez le drivepack à plat sur le sol ou une table.
4. Vérifiez que le Mac le voit. Dans le terminal, `system_profiler SPUSBDataType | grep evation` a affiché `evation v2.50` chez moi. Pour l'outil, c'est un périphérique USB HID avec l'ID 10C4:1001.

Fazua dit dans son propre guide qu'on n'a besoin que du drivepack pour une mise à jour du firmware, pas du vélo entier. La roue n'a pas besoin de tourner pour tout ça.

## Étape 2, lire avant d'écrire

Quittez d'abord la FAZUA Toolbox, parce qu'elle garde la connexion USB. Ensuite :

```sh
git clone https://github.com/eminogrande/FazuaUnlocker.git
cd FazuaUnlocker
python3 -m venv .venv && .venv/bin/pip install -r requirements-mac.txt
.venv/bin/python fazua_mac.py --read-only
```

Le mien a répondu après environ 110 ms. Max Bike Speed 24,98 km/h, valeur brute 694. Circonférence de roue 2121 mm. Décalage d'axe 30533. L'outil dérive une petite clé d'écriture de ce décalage, la mienne était ba88. Mon agent a sauvegardé cette lecture dans un fichier JSON, pour que je puisse toujours revenir exactement à ces valeurs.

Puis un essai à blanc, qui construit le paquet d'écriture avec la somme de contrôle mais n'envoie rien :

```sh
.venv/bin/python fazua_mac.py 55 --dry-run
```

## Étape 3, rétrograder vers 2.04

C'est la partie avec un vrai risque. Si le flash est interrompu, le drivepack peut être mort. Donc batterie pleine, câble bien fixé, drivepack immobile.

1. Ouvrez la FAZUA Toolbox, allez à FIRMWARE UPDATE, cliquez sur UPDATE NOW.
2. Choisissez Manual. Pas Online, parce qu'Online installe à nouveau la version la plus récente.
3. Sélectionnez evation_Software_2.04.bin et vérifiez le nom du fichier avant d'appuyer sur START.
4. Attendez. Après le flash, le moteur se calibre et peut vibrer un peu. Ne bougez pas le drivepack.
5. Vérifiez à nouveau avec system_profiler. Le mien affichait maintenant `evation v2.04`.

Une nouvelle lecture après la rétrogradation montrait toujours 24,98 km/h. Le changement de firmware à lui seul ne débloque rien.

## Étape 4, écrire 55 km/h

```sh
.venv/bin/python fazua_mac.py 55 --force
```

L'outil a montré le passage de 24,98 km/h, brut 694, à 55,00 km/h, brut 1528. Puis "Write cycle acknowledged by bike", puis il a relu la valeur tout seul. "SUCCESS: bikeMaxSpeed is now 55.01 km/h". Une lecture séparée quelques secondes plus tard disait la même chose, circonférence de roue toujours 2121 mm.

L'outil accepte de 5 à 75 km/h. J'ai choisi 55 parce que je veux voir comment c'est. Mon agent a suggéré 45, parce que le moteur n'a pas une puissance infinie et qu'au-dessus d'une certaine vitesse, la majeure partie vient de vos jambes de toute façon. Quelle que soit la valeur choisie, le moteur aide seulement plus longtemps, il ne rend pas le vélo plus rapide par lui-même.

## Étape 5, retour dans le vélo

1. Débranchez le câble, revissez le capuchon USB à la main, 1 à 1,5 Nm. Sans le capuchon, le drivepack n'est pas étanche.
2. Remettez le drivepack dans le vélo jusqu'au clic.
3. Allumez.

Sur mon vélo, la télécommande a alors clignoté en blanc, deux LED en haut et deux en bas, en alternance. Ça ressemble à une erreur. Ça n'en est pas une. Fazua écrit dans son guide de mise à jour "Flashing LEDs indicates an update of the remote. Do not touch the remote during the update and do not switch off the e-bike." Le drivepack met la télécommande à son propre niveau de firmware. La mienne s'est éteinte une fois, s'est rallumée, et ensuite tout était vert.

Ensuite j'ai testé. Ça semble marcher. Je n'ai pas encore de vitesse de pointe exacte, parce que le vélo n'a pas d'écran. La prochaine fois, un téléphone avec un compteur GPS ira sur le guidon.

## Ce qui a mal tourné en route

Mon agent a cliqué tout seul dans la Toolbox sur le Mac, et le premier clic est tombé sur CALIBRATION au lieu de FIRMWARE UPDATE. Ça a juste ouvert la page, rien n'a démarré. Ensuite le clic sur Manual n'est pas passé, parce que les clics envoyés en arrière-plan n'atteignaient pas cette boîte de dialogue. Mon agent s'est arrêté là, parce qu'un mauvais clic sur START aurait réinstallé la 2.50. J'ai cliqué moi-même sur Manual et sur le fichier.

Les deux premières tentatives d'écriture ont avorté. L'outil demande un yes avant d'écrire, et la façon dont mon agent envoyait les réponses n'atteignait pas cette question. Rien n'a été écrit, la lecture faite après affichait toujours 24,98 km/h. Avec --force, c'est passé.

Plus tard j'ai ressorti le drivepack, refermé le capuchon USB et déplacé l'aimant, et là la LED du haut était rouge. Le rouge, ce n'est pas l'aimant. Le manuel Fazua dit que le rouge en haut signifie une erreur de connexion entre le drivepack et le boîtier de pédalier, la partie du cadre dans laquelle il se branche. Je l'ai ressorti, vérifié les contacts, repoussé jusqu'au clic, et c'était bon.

Et au bout de 15 minutes sans bouger, le système s'éteint tout seul. C'est normal aussi, c'est dans le manuel.

## Batterie, modes et retour en arrière

La limite est une seule valeur dans le drivepack. Vert, bleu et rose utilisent tous les mêmes 55 km/h. Les modes changent seulement la force avec laquelle le moteur pousse et la vitesse à laquelle la batterie se vide. Rouler plus vite coûte beaucoup plus d'énergie, donc au-dessus de 25 l'autonomie chute vite.

Avec le firmware 2.04, la batterie reste aussi éveillée plus longtemps après la sortie. Sur la 2.50, Fazua avait réduit cette veille à une à trois heures, sur l'ancien firmware ça monte jusqu'à huit. Donc après avoir roulé, je maintiens le bouton de la batterie deux secondes jusqu'à ce que les LED s'éteignent.

Revenir à l'origine se fait en une commande, câble branché :

```sh
.venv/bin/python fazua_mac.py 25 --force
```

Eplus écrit qu'on peut repasser en 2.50 après le déblocage. Je n'ai pas essayé, donc pour l'instant je reste en 2.04 et je n'appuie pas sur update ni dans la Toolbox ni dans l'app.

Au-dessus de 25 km/h, le vélo n'est plus un pedelec. En Allemagne, il n'est alors autorisé que sur terrain privé, pas sur la voie publique, et la garantie comme l'assurance peuvent sauter. Flasher un firmware peut briquer le drivepack. Tout ce qui est ici est à vos risques et périls.

## Mise à jour, valeur brute 1938

Deux jours plus tard, la batterie était de nouveau sur le Mac et je voulais monter plus haut. J'ai d'abord demandé 69,69 km/h. Ça n'existe pas exactement. Le drivepack ne stocke pas des km/h, il stocke un nombre entier, la valeur brute, et km/h, c'est valeur brute fois 0,036. Donc 69,69 est devenu brut 1936, soit 69,70 km/h.

Ensuite j'ai choisi la valeur brute 1938, parce que 1938 est l'année de naissance de mon père. 1938 fois 0,036 fait 69,768, l'outil affiche 69,77 km/h. C'est le même genre de nombre qu'avant. 55,01 était aussi seulement arrondi, 1528 fois 0,036 fait 55,008.

Les étapes ont été les mêmes qu'à l'étape 2 et l'étape 4. D'abord lecture seule, elle disait toujours 55,01 km/h, brut 1528, roue 2121 mm. Puis un essai à blanc. Dans le paquet, seuls les deux octets de vitesse ont changé, tout le reste est resté identique. Puis :

```sh
.venv/bin/python fazua_mac.py 69.768 --force
```

Mon agent a tapé 69,768 avec trois décimales seulement pour que l'outil tombe exactement sur 1938. Vers le vélo, il envoie le nombre entier. "Write cycle acknowledged by bike", puis "SUCCESS: bikeMaxSpeed is now 69.77 km/h". Une lecture séparée après coup a montré brut 1938, circonférence de roue 2121 mm, rien d'autre n'a changé.

Le réglage semble fonctionner. Je n'ai toujours pas de vitesse de pointe mesurée. 69,77 km/h est la limite d'assistance configurée, pas une vitesse mesurée ni une vitesse que le vélo atteint tout seul.

Revenir à 55, c'est `.venv/bin/python fazua_mac.py 55.008 --force`, ce qui redonne brut 1528.

## Aide gratuite à Berlin

Si vous êtes à Berlin et voulez débloquer votre Fazua Ride 50 de la même façon, écrivez-moi à [emin@emin.de](mailto:emin@emin.de). Je le fais gratuitement. Encore une fois, au-dessus de 25 km/h c'est seulement pour terrain privé, et vous le faites à vos risques et périls.
