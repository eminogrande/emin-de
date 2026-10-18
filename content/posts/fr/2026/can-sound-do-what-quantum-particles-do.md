---
title: "Le son peut-il faire ce que font les particules quantiques ?"
description: "Le son se courbe, se diffuse et interfère comme les électrons dans la double fente. Le son est-il donc quantique ? Où la comparaison fonctionne et où elle s'arrête."
date: "2026-10-13"
updated: "2026-10-13"
lang: fr
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
tldr: ["Le son se courbe, se diffuse et interfère comme n'importe quelle onde, et on peut faire la double fente avec deux enceintes.", "Donc la double fente teste si quelque chose est une onde, pas si c'est quantique.", "La partie quantique, c'est les impacts uniques aléatoires, les amplitudes de probabilité, l'effondrement quand on mesure, et l'intrication.", "Le son ne devient quantique que sous forme de phonons dans les solides froids, et les ondes classiques ne peuvent pas faire de calcul quantique."]
sections: [{"basically": "Je voulais savoir si les ondes sonores se comportent comme des particules quantiques, et la réponse est oui et non."}, {"basically": "Le son est une onde de pression dans un milieu, et la physique classique prédit exactement ce qu'il fait ensuite."}, {"basically": "Le son se réfléchit, se courbe, se diffuse au coin des murs et interfère, donc il a tous les comportements d'une onde classique."}, {"basically": "Le son contourne les portes parce que sa longueur d'onde fait des mètres, alors que la lumière et les électrons ont besoin de fentes minuscules."}, {"basically": "Deux enceintes jouant la même note créent des zones fortes et faibles dans une pièce, le motif de la double fente en son."}, {"basically": "Les électrons uniques arrivent en points, forment des franges avec le temps, et les franges disparaissent quand on vérifie le chemin."}, {"basically": "Une onde sonore est une pression d'air, une onde quantique est une amplitude de probabilité, et c'est seulement ça qui rend les impacts uniques aléatoires."}, {"basically": "Mesurer une onde sonore la perturbe un peu, mais vérifier le chemin d'un électron efface l'interférence."}, {"basically": "La physique quantique ne peut pas expliquer comment une mesure choisit un résultat, et le son classique n'a jamais ce problème."}, {"basically": "L'observateur en physique quantique, c'est n'importe quel détecteur ou environnement qui prend l'information du chemin, pas un esprit humain."}, {"basically": "Les phonons sont du son quantifié dans les solides et montrent un vrai comportement quantique, mais seulement dans des labos froids et contrôlés."}, {"basically": "Le son peut mélanger des ondes, mais sans intrication il ne peut pas atteindre l'immense espace d'états qu'utilise un ordinateur quantique."}, {"basically": "Le son copie les franges de la double fente, mais l'aléatoire, l'effondrement et l'intrication restent uniquement quantiques."}]
---
## La question qui me revenait sans cesse

J'avais une question simple en tête depuis un moment. Le son est une onde. La lumière est une onde, et les électrons se comportent aussi comme des ondes. Tout le monde connaît l'expérience des fentes de Young, où les électrons forment des rayures sur un écran, et où ces rayures disparaissent dès que vous vérifiez par quelle fente ils sont passés. Alors, le son peut-il faire la même chose ? Les ondes sonores peuvent-elles montrer le même comportement que les objets quantiques, avec des interférences et ce curieux effet d'observation ?

J'ai creusé le sujet, et la réponse courte est oui et non. Le son fait beaucoup de choses que font les ondes quantiques. Mais la partie qui rend la physique quantique « quantique » est précisément celle que le son ne peut pas accomplir. Voici où se situe cette limite.

## Ce qu'est le son

Le son est une onde mécanique. Il a besoin d'un support pour se déplacer, comme l'air, l'eau ou un solide, et c'est pourquoi il n'y a pas de son dans le vide. Le cône d'un haut-parleur ou un claquement de mains rapproche les molécules d'air adjacentes, puis elles s'écartent à nouveau, et ce motif d'air comprimé et raréfié se propage vers l'extérieur. Les molécules elles-mêmes ne volent pas jusqu'à votre oreille. Elles oscillent simplement d'avant en arrière autour de leur position, et seule la perturbation voyage.

Une onde sonore a une longueur d'onde, la distance entre deux zones de compression. Elle a une fréquence, le nombre d'ondes qui passent chaque seconde, ce que nous percevons comme la hauteur tonale. Les humains entendent environ de 20 Hz à 20 000 Hz. Elle a une amplitude, la force de la poussée, que nous percevons comme le volume. Et elle a une vitesse qui dépend du milieu. Dans l'air à température ambiante, le son se déplace à environ 343 mètres par seconde, et dans l'eau de mer à environ 1 531.

Ce qui est important pour ma question, c'est que tout cela relève de la physique classique. Si vous connaissez la source et le milieu, vous pouvez calculer exactement ce que l'onde fera ensuite. Rien là-dedans n'est aléatoire.

## Le son fait tout ce qu'une onde fait

Le son se réfléchit. C'est l'écho, et c'est ainsi que le sonar trouve des objets sous l'eau. Le son se réfracte, il se courbe donc lorsque l'air devient plus chaud ou plus froid ou quand le vent change, et une voix peut porter plus loin avec le vent. Le son se diffracte, il contourne les coins et se diffuse après une porte, et c'est pourquoi vous pouvez entendre quelqu'un dans la pièce voisine sans le voir. Les sons graves se courbent plus facilement que les sons aigus, ce qui explique pourquoi le tonnerre lointain n'est qu'un grondement sourd.

Et le son interfère. Lorsque deux ondes sonores se rencontrent et que leurs sommets s'alignent, elles s'additionnent et le son devient plus fort. Lorsque le sommet de l'une rencontre le creux de l'autre, elles s'annulent et le son diminue, en théorie jusqu'au silence. Deux notes ayant presque la même hauteur deviennent plus fortes et plus faibles dans un rythme lent, ce qu'on appelle des battements.

Le son possède donc l'ensemble complet, et la vieille physique ondulatoire classique explique chaque partie de ce phénomène.

## Pourquoi la taille compte

Ce que vous voyez dépend beaucoup de la taille de l'onde. Une note de 100 Hz dans l'air a une longueur d'onde d'environ 3,4 mètres, une note de 10 kHz environ 3,4 centimètres. C'est la taille des portes, des pièces, des meubles et des gens. Le son contourne donc notre monde quotidien tout le temps, et nous entendons des choses que nous ne pouvons pas voir.

La lumière visible a des longueurs d'onde d'environ 400 à 700 nanomètres. Pour faire en sorte que la lumière se courbe et interfère, vous avez besoin de minuscules fentes fabriquées avec beaucoup de précision, et c'est pourquoi la lumière ne contourne pas les coins dans la vie quotidienne. Les électrons ont aussi une longueur d'onde, et dans les expériences habituelles, elle est à peu près de la taille de l'espacement entre les atomes dans un cristal.

Le même comportement ondulatoire apparaît donc à des échelles complètement différentes. Le son le fait dans un salon, les électrons le font à l'échelle des atomes. Cela ne vous dit rien sur le caractère quantique ou non. C'est juste une question de longueur d'onde.

## Les fentes de Young avec deux haut-parleurs

Vous pouvez vraiment réaliser l'expérience des fentes de Young avec du son, et c'est une démonstration classique en classe. Une méthode consiste à utiliser un mur avec deux ouvertures. Une méthode plus simple est d'utiliser deux haut-parleurs pilotés par le même générateur de signaux, afin que les deux jouent la même note de manière synchrone. Une installation typique les place à environ un demi-mètre de distance et diffuse un son autour de 2 000 Hz.

Ensuite, vous marchez lentement à travers la pièce devant eux. Vous entendez des zones fortes et des zones faibles, l'une après l'autre. Ce sont les mêmes rayures brillantes et sombres que Thomas Young a observées avec la lumière, et les gens les appellent les franges de Young pour le son. Avec un microphone et un appareil de mesure, vous pouvez cartographier le motif exactement. Juste au milieu, à égale distance des deux haut-parleurs, le son est fort.

Dans une pièce normale, c'est le bordel, car les murs réfléchissent le son et ajoutent d'autres ondes par-dessus. C'est à l'extérieur ou dans une chambre sourde que cela fonctionne le mieux. Et vous n'obtenez presque jamais un silence parfait dans les zones faibles, car les deux ondes n'arrivent pas avec exactement la même intensité.

## Les fentes de Young avec des électrons

Passons maintenant à la version quantique. Une source envoie des photons uniques ou des électrons uniques, un par un, vers un mur avec deux fentes étroites. Derrière se trouve un écran qui enregistre l'endroit où chacun atterrit.

Chaque électron arrive comme un seul point à un seul endroit. Mais lorsque vous en envoyez beaucoup, que vous laissez les deux fentes ouvertes et que vous ne vérifiez pas quelle fente ils ont utilisée, les points forment lentement des rayures. C'est le même type de motif d'interférence qu'avec le son. Et ils ne peuvent pas interférer les uns avec les autres, car ils arrivent un par un. Chaque électron passe en quelque sorte par les deux chemins sous forme d'onde et atterrit sous forme de particule.

Ensuite, vous placez un détecteur au niveau des fentes pour savoir quel chemin chaque électron a pris. Les rayures disparaissent. Vous obtenez deux bandes simples derrière les deux fentes, comme vous l'obtiendriez en tirant des petites billes à travers elles.

## Deux types d'ondes

C'est là que j'ai compris que les fentes de Young sont un test pour les ondes et non un test pour le quantique. Young l'a fait avec la lumière au début du 19ème siècle pour montrer que la lumière est une onde, bien avant que quiconque ne parle de physique quantique. Le son, l'eau et la lumière créent tous ce motif de rayures. Si vous voyez des rayures, vous avez appris que quelque chose est ondulatoire, et c'est tout ce que vous avez appris.

La vraie différence est ce qui ondule. Dans l'expérience sonore, c'est la pression de l'air, quelque chose de physique que vous pouvez mesurer en tout point. Le volume sonore à un endroit donné est simplement la somme des deux ondes. Dans l'expérience quantique, l'onde est la fonction d'onde, et ce n'est pas une chose physique se déplaçant dans un milieu. C'est une amplitude de probabilité. Elle vous indique la probabilité de trouver l'électron à un certain endroit. La règle pour cela s'appelle la règle de Born, et elle dit que vous prenez la taille de l'onde à un point donné et vous l'élevez au carré, et cela vous donne la probabilité. Les rayures proviennent de l'addition des amplitudes des deux chemins, et elles n'apparaissent qu'après de nombreux impacts individuels.

La fonction d'onde elle-même change de manière fluide et prévisible tant que personne ne mesure, en suivant l'équation de Schrödinger. Mais l'endroit où un électron unique atterrit est aléatoire. Les expériences qui brisent les soi-disant inégalités de Bell suggèrent que ce caractère aléatoire est réel et non dû à une simple méconnaissance, il n'y a donc pas de détails locaux cachés que nous n'avons pas encore trouvés.

## Regarder change un électron, pas un son

Mettons que vous vouliez savoir par quelle fente le son est passé. Vous placez un micro près d'une fente. Le micro prend un peu d'énergie à l'onde et en diffuse une petite partie, et le motif derrière change un peu. Mais le son reste une onde sonore. Plus loin, il produit toujours des interférences, et rien dans sa nature n'a changé.

C'est comme vérifier la pression d'un pneu. Un peu d'air s'échappe toujours, donc vous modifiez ce que vous mesurez. C'est aussi un effet de l'observateur, mais un effet classique, sans mystère. Vous pouvez le calculer, et avec un meilleur instrument, vous pouvez le réduire.

Avec l'électron, c'est différent. Dès que vous obtenez l'information sur le chemin qu'il a pris, les franges disparaissent complètement. Ce n'est pas un détecteur maladroit qui bouscule trop fort l'électron. C'est lié à l'information elle-même. Le principe d'incertitude de Heisenberg fixe une limite stricte à la précision avec laquelle on peut connaître certaines paires de grandeurs en même temps, comme la position et la quantité de mouvement. En physique quantique, il existe une perturbation minimale qu'aucune ingénierie ne peut éliminer.

## Le problème de la mesure

La physique quantique a deux règles pour décrire le changement d'un état, et elles ne collent pas ensemble. Quand personne ne mesure, la fonction d'onde évolue de façon fluide, on pourrait rembobiner le film, et les superpositions restent des superpositions. Quand vous mesurez, vous obtenez un seul résultat, tiré au hasard selon les probabilités de la règle de Born, et l'état saute pour correspondre à ce résultat. C'est ce qu'on appelle l'effondrement. C'est soudain et irréversible.

L'équation de Schrödinger ne contient pas l'effondrement, et l'effondrement brise ses règles. La théorie ne dit pas non plus ce qui compte comme une mesure, ni où s'arrête le système quantique et où commence l'appareil de mesure. Cet angle mort, c'est le problème de la mesure, et les physiciens s'écharpent encore dessus. L'interprétation de Copenhague pose l'effondrement comme une règle. Les mondes multiples disent qu'il n'y a aucun effondrement. La mécanique bohmienne ajoute des variables cachées. Les théories d'effondrement objectif comme GRW font de l'effondrement un processus physique réel.

La décohérence en explique une partie. Un système quantique touche son environnement en permanence, les molécules d'air, la lumière et tout le reste, et s'intrique avec lui. Vu du système seul, l'interférence s'estompe vite et tout commence à avoir l'air classique. C'est en grande partie pour cela qu'on ne voit jamais de gros objets à deux endroits en même temps. Mais la décohérence n'explique pas pourquoi vous obtenez ce résultat-là en particulier et pas un autre.

Le son ne connaît rien de tout ça. Une onde sonore a des propriétés bien définies tout le temps, et la mesure ne fait que les révéler, avec peut-être une petite perturbation.

## L'observateur n'est pas un esprit

Le mot observateur égare beaucoup de monde. La vulgarisation en a fait l'idée que la conscience crée la réalité, que l'électron choisit parce qu'un humain regarde. Quelques discussions du début autour de von Neumann et Wigner allaient dans ce sens. Mais la physique n'a pas besoin d'une personne. L'observateur est n'importe quel système physique qui interagit avec l'électron et en extrait l'information sur le chemin emprunté. Un détecteur dans une pièce vide le fait, et l'environnement le fait aussi.

Je pense qu'interaction de mesure conviendrait mieux qu'observateur. C'est un processus physique, pas mental, et l'ancien terme continue de nourrir un paquet d'âneries ésotériques sur la physique quantique.

## Les phonons, le quantum de son

Il y a un endroit où le son devient vraiment quantique, et c'est au cœur des solides. Dans un cristal, les atomes sont rangés en réseau et vibrent ensemble. La physique quantique dit que cette énergie de vibration vient sous forme de petits paquets fixes, et un paquet s'appelle un phonon. Le nom vient du mot grec pour le son. Un phonon est au son dans un cristal ce qu'un photon est à la lumière. Ce n'est pas une particule élémentaire comme un électron, c'est une quasi-particule, une vibration partagée par de nombreux atomes. Les ondes de phonons longues ne sont rien d'autre que les ondes sonores ordinaires dans ce solide.

Et les phonons font les vraies choses quantiques. Des chercheurs ont créé des phonons uniques, les ont mis en superposition, ont montré des interférences entre chemins de phonons, ont intriqué des phonons et ont même fait fonctionner une gomme quantique avec eux. Pour ça, ils couplent les phonons à des qubits supraconducteurs sur une puce et refroidissent le tout à des températures cryogéniques, pour que les vibrations thermiques aléatoires ne détruisent pas l'effet.

Alors oui, le son peut être quantique. Mais seulement sous forme de phonons, dans un solide, dans un labo, dans un froid extrême. Le son dans l'air de votre salon est une onde de pression classique, et la physique classique le décrit presque parfaitement. Les phonons pourraient quand même compter plus tard, comme moyen de stocker de l'information quantique et de la faire passer entre circuits supraconducteurs et lumière.

## Pourquoi les haut-parleurs ne peuvent pas faire un ordinateur quantique

La question suivante que je me suis posée, c'est pourquoi personne ne fabrique un ordinateur avec des haut-parleurs, si un ordinateur quantique tourne grâce à la superposition et à l'interférence et que le son a les deux.

La réponse tient à la taille de l'espace dans lequel la machine travaille. Avec n qubits, un ordinateur quantique travaille dans un espace de 2 puissance n états, donc chaque qubit en plus le double. La superposition lui permet d'exploiter tout cet espace, et l'intrication relie les qubits entre eux. Beaucoup d'algorithmes quantiques ont besoin de ce lien.

Les ondes classiques peuvent s'additionner, et on peut mélanger plein de fréquences dans un seul son. Mais pour tirer un nombre exponentiel d'états d'un système d'ondes classiques, il faudrait une quantité exponentielle de quelque chose de physique, comme des fréquences de plus en plus hautes ou de plus en plus d'énergie. Ajouter des haut-parleurs ne fait grandir le système que lentement. Les ondes classiques n'ont pas non plus d'intrication entre parties distinctes ni d'interférence d'amplitudes de probabilité. Et la correction d'erreurs quantiques dépend de propriétés et de mesures quantiques qu'un système sonore classique n'a tout simplement pas.

## Ce que j'en retiens

Le son est un formidable moyen de ressentir ce qu'est l'interférence. On peut marcher dans une pièce et entendre les zones d'ombre et de volume. Mais la double fente avec du son prouve seulement que le son est une onde. La part quantique, c'est autre chose. C'est le fait qu'un seul électron interfère avec lui-même, que le motif se construit à partir d'impacts uniques aléatoires, que vérifier le chemin détruit le motif, et que personne ne peut expliquer entièrement comment une mesure choisit un résultat.

| | Son dans l'air | Électron ou photon |
|---|---|---|
| Ce qui oscille | pression de l'air | amplitude de probabilité |
| A besoin d'un milieu | oui | non |
| Interférence | oui | oui |
| Arrive sous forme de points uniques | non | oui |
| Où un impact atterrit | prévisible | aléatoire |
| Vérifier le chemin | petite perturbation | le motif disparaît |
| Intrication | non | oui |

Ma réponse honnête à ma propre question, c'est donc que les ondes sonores peuvent imiter l'apparence de la physique quantique, les franges et les ondulations, mais pas ce qui se passe à l'intérieur. Là où le son devient vraiment quantique, sous forme de phonons dans un cristal froid, il obéit à toutes les règles bizarres du quantique, problème de la mesure compris. Les maths des ondes sont un langage commun aux deux, mais elles décrivent deux réalités bien différentes.
