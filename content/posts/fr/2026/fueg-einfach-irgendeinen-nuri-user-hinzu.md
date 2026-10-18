---
title: "Ajoute n'importe quel utilisateur Nuri"
description: "Parrainage, Guardian, héritage, Multisig et épargne commune deviennent une seule fonctionnalité chez Nuri. Tu ajoutes un nom d'utilisateur dans les paramètres, le reste suit."
date: "2026-10-18"
updated: "2026-10-18"
lang: fr
translated_from: "de/fueg-einfach-irgendeinen-nuri-user-hinzu"
source_sections: ["ein-feature-statt-fünf", "die-fee-wird-geteilt", "meine-mama-kriegt-17-satoshi", "expanding-statt-decaying-multisig", "guardian-und-erbe", "die-fee-liegt-im-frontend", "setz-deine-fee-selbst", "jeder-call-ist-eine-kleine-zahlung", "familienwallet-und-hardware-wallets", "der-erste-schritt"]
category: nuri
format: essay
author: emin
provenance: transcript
ai_assisted: true
reviewed_by_human: false
image: "/media/fueg-einfach-irgendeinen-nuri-user-hinzu/cover.png"
tags: ["Nuri", "Multisig", "Referral", "Inheritance", "x402", "L402"]
tldr: ["Mon idée pour Nuri, c'est une seule fonctionnalité. Tu ajoutes le nom d'utilisateur de quelqu'un dans les paramètres.", "De là découlent le parrainage, Guardian, l'héritage, le Multisig et l'épargne commune, selon ce que tu autorises.", "La commission est chez nous dans le frontend, en clair dans le code source, et c'est toi qui la fixes entre 0 et 21 pour cent."]
sections: [{"basically": "Chez Nuri, parrainage, Guardian, héritage et Multisig deviennent une seule fonctionnalité. Tu ajoutes un nom d'utilisateur dans les paramètres."}, {"basically": "Qui ajoute un ami sur Nuri partage la commission avec lui. Avec 10 personnes, elle est divisée par 10."}, {"basically": "Chaque paiement envoie quelques satoshis et une notification push à tes proches. Ça rend Nuri viral."}, {"basically": "Avec un Multisig extensible, les clés de tes Guardians ne s'activent que quand tu as perdu les tiennes."}, {"basically": "Un Guardian t'aide à récupérer ta clé. Un héritier n'y touche que si tu ne fais rien pendant un an."}, {"basically": "Nuri ne prend pas la commission chez les providers, mais dans son propre frontend, en clair dans le code source."}, {"basically": "Chez Nuri, tu fixes ta commission toi-même, de 0 à 21 pour cent. À mes soirées, les dons ont rapporté cinq fois plus."}, {"basically": "Chaque appel API chez Nuri sera un petit paiement x402 ou L402. Comme ça, le problème de commission est réglé."}, {"basically": "Multisig, personne ne comprend. Trois personnes et un hardware wallet, tout le monde comprend. C'est comme ça qu'on explique Nuri."}, {"basically": "Première étape chez Nuri, c'est juste un ami dans les paramètres qui gagne avec toi. Tout le reste se construit là-dessus."}]
---
Je crois que j'ai trouvé un truc plutôt pas mal ce matin. C'est une feature pour Nuri. C'est l'idée de base.

## Une feature au lieu de cinq

Je veux regrouper Multisig, Guardians, Inheritance et Referral dans une seule feature. Et voilà comment. Dans mon app, dans les Settings, j'ajoute simplement ton username. Rien de plus.

À la seconde où je fais ça, tu touches 50 pour cent des fees que je paie à Nuri. Tu peux être mon Guardian en même temps. Ça veut dire que tu m'aides avec ton passkey à récupérer mon compte plus tard. Tu peux aussi entrer dans la wallet comme co-signataire. Ou alors on est une boîte et on veut une wallet multisig ensemble.

Ce sont toutes des features différentes. Mais elles reposent toutes sur la même feature frontend. Ajoute juste n'importe quel user Nuri.

## La fee est partagée

Les fees que je paie à Nuri, on les fixe pour commencer à genre 2,1 pour cent. À chaque fois que je fais un paiement, la moitié va à Nuri et l'autre moitié va à la personne que j'ai ajoutée.

Tu peux aussi ajouter 10 usernames. Là tu as une wallet avec 10 personnes, et les fees sont divisées par 10. Tous tes nouveaux gens touchent automatiquement leur part, et Nuri touche un dixième.

On pourrait bien sûr s'ajouter mutuellement, et là ça me revient. Il faut qu'on fasse gaffe à ne pas créer une boucle. Ça, ça ne marche pas, évidemment.

## Ma mère reçoit 17 satoshis

Les bitcoiners veulent convertir d'autres gens au Bitcoin. Maintenant je peux inviter ma mère. Et elle reçoit une push notification à chaque fois que je fais un paiement. Tu viens de recevoir 20 satoshis. Tu viens de recevoir 17 satoshis.

Je connais ça de moi-même. Sur un autre service, je reçois un message Telegram à chaque fois qu'un swap a lieu, et dedans il y a écrit que je viens de gagner 10 satoshis. C'est le truc le plus viral que j'aie jamais vécu moi-même. C'est marrant, et on se file un peu de fric mutuellement comme ça.

Avec Arkade, on peut aussi s'envoyer 1, 2, 3, 4 ou 5 satoshis sans fee. Et ça montre aussi un peu à quel point Arkade déchire à ce niveau-là.

## Expanding au lieu de Decaying Multisig

Les keys qu'on ajoute font l'inverse de ce qu'on fait d'habitude chez Nuri. Si on ne veut pas qu'elles soient signataires dès le départ, alors ce n'est pas un decaying multisig, mais un expanding multisig.

Ça veut dire que si je perds toutes mes keys, alors au bout d'un moment, un an ou un truc comme ça, les keys de mes guardians s'activent automatiquement. Sur Bitcoin, on peut faire ça. Sur Ethereum, ce sera sans doute plus dur, mais ça doit marcher aussi.

Et bien sûr, ce sont des settings qu'on peut régler. Personne ne doit pouvoir toucher ton fric juste parce que tu n'as pas bougé tes bitcoins pendant un an.

## Guardian et héritage

Guardian, c'est une feature. Là, j'aimerais faire exactement comme Bitkey. Ils ont construit ça de façon à ce que tes guardians puissent t'aider à récupérer ta key, mais n'aient pas accès à ton fric. Comment ils ont fait ça exactement, il faudra qu'on regarde.

L'autre feature, c'est Inheritance, et c'est hyper important. Je veux par exemple entrer ma sœur comme héritière chez moi. À chaque fois que je fais un paiement, un compteur est remis à zéro. Et s'il m'arrive un truc, pour n'importe quelle raison, je ne me réveille pas le lendemain matin, alors elle est activée automatiquement au bout d'un an et a accès à mes fonds. Un truc comme ça, c'est hyper important et hyper cool.

## La fee est dans le frontend

Encore bien plus important, c'est où se trouve la fee. Aujourd'hui on la prend chez les providers, et c'est une erreur. On devrait mettre la fee à zéro partout chez les providers et la prendre chez nous, dans le frontend ou dans notre backend. Derrière Nuri, il peut y avoir dix millions de providers, on s'en fiche complètement. Ils prennent leur spread et leur fee, et on ne rajoute rien chez eux.

Comme ça, on peut distinguer entre Nuri fee et partner fee. C'est juste clean. Et je veux montrer aux gens dans le code open source, regarde, voilà la fee, elle est dans le code source. Je veux qu'on soit la boîte la plus transparente du monde.

Mon histoire préférée là-dessus, c'est le tollé dans la communauté Aave quand le swap provider a été changé en coulisses. Ça montre que les backends n'ont plus le pouvoir, ce sont les frontends. Celui qui a les utilisateurs a le moat.

## Fixe ta fee toi-même

On laisse même les gens fixer la fee eux-mêmes. Juste par fair-play. Si tu ne veux pas payer de fees, tu peux passer à 0 pour cent. Mais tu peux aussi passer à 21 pour cent si tu veux. Et si quelqu'un demande, pourquoi vous prenez 2 pour cent, on dit, va dans les settings et change ça.

Pourquoi je crois que ça marche ? À cause de mes soirées à Berlin. Peu importe l'entrée que je faisais payer et peu importe le prix de la bière, les gens ne trouvaient jamais ça cool. À un moment, on a dit, fuck it, don pour la bière, don pour l'entrée. On a gagné à peu près cinq fois plus de fric.

Quand tu donnes aux gens la possibilité de fixer ça eux-mêmes, il y a aussi des gens qui le mettent nettement plus haut. Parce qu'ils kiffent la gamification ou parce qu'ils adhèrent à la mission. Il y a les riches et les pauvres, les radins et les autres. Moi, pour les gens que je rencontre à une conférence et que j'ajoute à mon compte, je mettrais ma fee à 21 pour cent. Comme ça, ils touchent automatiquement mon split.

## Chaque call est un petit paiement

J'ai encore une meilleure idée pour prendre la fee. On gate simplement l'API Nuri avec des micropayments, et les micropayments sont nos fees. Chaque opération dans l'app coûte alors un petit paiement x402 ou L402. L402 si c'est un truc Bitcoin, x402 si c'est un truc crypto.

Un exemple. Sauvegarder ou lire un nouveau mot de passe dans ton gestionnaire de mots de passe Nuri coûte genre 0,1 centime ou 1 centime. Et on peut le prendre directement dans la wallet, parce qu'elle est agentic. Sur le router, je fais déjà ça. Tu peux l'utiliser avec un token ou tu paies pour les calls, et on peut donner un prix différent à chaque endpoint.

Comme ça, tu n'as pas besoin de construire ton propre système de fees. N'importe qui peut intégrer notre API où il veut, et on reçoit automatiquement les paiements. Je commencerais avec le carnet de contacts, 0,1 centime à chaque fois qu'on ajoute un contact. Si ça tourne, on l'étend à toute l'app. Une feature à la fois.

## Wallet familiale et hardware wallets

Quand les gens ont vu une fois comment marche une wallet Safe comme celle qu'on a en boîte, ils trouvent ça vraiment cool. J'ai une clé, mais on ne peut payer que tous ensemble. C'est une crypto expérience vraiment géniale.

Ou une wallet familiale. Ma mère, ma sœur et moi. Deux d'entre nous suffisent pour payer ensemble. Multisig, personne ne peut se l'imaginer. Mais dire, on est trois personnes et une hardware wallet, ou on est cinq personnes et une IA, ça, tout le monde comprend.

Et on reste sur le principe que personne d'autre n'arrive à faire. Wallet one-click Face ID. Seedless, pas de seed phrase, phishing-resistant, multisig par défaut.

## Le premier pas

On y va tout doucement. Le premier pas, c'est juste que je puisse ajouter un pote comme mon padawan dans les settings et qu'il reçoive automatiquement un truc. Ensuite, on voit dans notre base de données qui a ajouté qui et quels swaps ont eu lieu, et on paie les referrals.

Et quand tu envoies un truc, on devrait avoir une autocomplétion de tous les users Nuri. Pas seulement tes contacts, mais tout simplement tous. Je tape L et je trouve tous les gens avec L, comme chez PayPal.

Plus tard viendront la rotation des keys, ajouter et supprimer des keys, et une hardware wallet en plus. De toute façon, il faudra tout faire. Mais niveau vision, je crois que c'est absolument parfait. Parce que c'est une feature tellement virale, tu peux gagner de l'argent avec l'autre ou être son co-signataire.
