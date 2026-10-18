---
title: "Ajoute simplement un utilisateur Nuri"
description: "Parrainage, Guardian, héritage, Multisig et épargne commune deviennent une fonctionnalité chez Nuri. Tu ajoutes un nom d'utilisateur dans les paramètres, le reste en découle."
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
tldr: ["Mon idée pour Nuri est une seule fonctionnalité. Tu ajoutes dans les paramètres le nom d'utilisateur de quelqu'un.", "De là découlent parrainage, Guardian, héritage, Multisig et épargne commune, selon ce que tu autorises.", "La commission est chez nous dans le frontend, ouverte dans le code source, et tu la fixes toi-même entre 0 et 21 pour cent."]
sections: [{"basically": "Chez Nuri, parrainage, Guardian, héritage et Multisig deviennent une fonctionnalité. Tu ajoutes un nom d'utilisateur dans les paramètres."}, {"basically": "Qui ajoute un ami chez Nuri partage la commission avec lui. Avec 10 personnes, elle est divisée par 10."}, {"basically": "Chaque paiement envoie quelques satoshis à tes gens et une notification push. Ça rend Nuri viral."}, {"basically": "Avec un Expanding Multisig, les clés de tes Guardians ne s'activent que quand tu as perdu les tiennes."}, {"basically": "Un Guardian t'aide à récupérer ta clé. Un héritier n'y accède que si tu ne fais rien pendant un an."}, {"basically": "Nuri ne prend pas la commission chez les fournisseurs, mais dans son propre frontend, ouvert dans le code source."}, {"basically": "Chez Nuri, tu fixes ta commission toi-même, de 0 à 21 pour cent. À mes soirées, les dons ont rapporté cinq fois plus."}, {"basically": "Chaque appel API chez Nuri sera un petit paiement x402 ou L402. Avec ça, le problème de commission est réglé."}, {"basically": "Personne ne comprend le Multisig. Trois personnes et un hardware wallet, tout le monde comprend. C'est comme ça qu'on explique Nuri."}, {"basically": "La première étape chez Nuri, c'est juste un ami dans les paramètres qui gagne avec toi. Tout le reste se construit là-dessus."}]
---
Je crois que j'ai résolu un truc plutôt bon ce matin. Il s'agit d'une fonctionnalité pour Nuri. Voilà l'idée pour commencer.

## Une fonctionnalité au lieu de cinq

Je veux regrouper Multisig, Guardians, Inheritance et Referral en une seule fonctionnalité. Et voilà comment ça marche. Dans mon appli, dans les réglages, j'ajoute simplement ton nom d'utilisateur. Rien de plus.

Au moment où je fais ça, tu reçois 50 pour cent des frais que je paie à Nuri. Tu peux en même temps être mon Guardian. Ça veut dire que tu m'aides avec ton passkey à récupérer mon compte dans le futur. Tu peux aussi entrer dans le wallet en tant que co-signataire. Ou alors on est une boîte et on veut avoir un wallet multisig ensemble.

Ce sont toutes des fonctionnalités différentes. Mais elles reposent toutes sur la même fonctionnalité frontend. Ajoute simplement n'importe quel utilisateur Nuri.

## Les frais sont partagés

Les frais que je paie à Nuri, on les fixe pour commencer à genre 2,1 pour cent. Chaque fois que je fais un paiement, la moitié va à Nuri et l'autre moitié à la personne que j'ai ajoutée.

Tu peux aussi ajouter 10 noms d'utilisateur. Alors tu as un wallet avec 10 personnes, et les frais sont divisés par 10. Tous tes nouveaux gens reçoivent automatiquement une part, et Nuri reçoit un dixième.

On pourrait bien sûr aussi s'ajouter mutuellement, alors ça me reviendrait. On doit faire attention à ne pas créer de boucle là. Ça, ça ne marche pas, évidemment.

## Ma mère reçoit 17 satoshis

Les bitcoiners veulent amener d'autres gens à devenir bitcoiners. Maintenant je peux inviter ma mère. Et elle reçoit une notification push à chaque fois que je fais un paiement. Tu viens de recevoir 20 satoshis. Tu viens de recevoir 17 satoshis.

Je connais ça de moi-même. Sur un autre service, je reçois à chaque fois un message Telegram quand un swap a lieu, et dedans il est écrit que je viens de gagner 10 satoshis. C'est le truc le plus viral que j'aie jamais vécu pour moi-même. C'est marrant, et on se donne mutuellement un peu d'argent comme ça.

Avec Arkade, on peut aussi envoyer 1, 2, 3, 4 ou 5 satoshis sans frais. Et ça montre aussi un peu à quel point Arkade est génial à ce niveau-là.

## Expanding au lieu de Decaying Multisig

Les clés qu'on ajoute font le contraire de ce qu'on fait d'habitude chez Nuri. Si on ne veut pas qu'elles soient signataires dès le début, alors ce n'est pas un Decaying Multisig, mais un Expanding Multisig.

Ça veut dire que si je perds toutes mes clés, alors après un certain temps, un an ou quelque chose comme ça, les clés de mes Guardians s'activent automatiquement. Avec Bitcoin, on peut faire ça. Avec Ethereum, ce sera probablement plus difficile, mais ça doit être faisable aussi.

Et bien sûr, ce sont des réglages qu'on peut configurer. Personne ne doit pouvoir accéder à ton argent juste parce que tu n'as pas bougé tes bitcoins pendant un an.

## Guardian et héritage

Guardian est une fonctionnalité. Là, j'aimerais le faire exactement comme Bitkey. Ils ont construit ça de telle sorte que tes Guardians peuvent t'aider à récupérer ta clé, mais n'ont pas accès à ton argent. Comment exactement ils ont fait ça, on doit encore regarder.

L'autre fonctionnalité, c'est Inheritance, et c'est extrêmement important. Je voudrais par exemple enregistrer ma sœur comme héritière chez moi. Chaque fois que je fais un paiement, un compteur est remis à zéro. Et s'il devait m'arriver quelque chose, pour n'importe quelle raison, je ne me réveille pas le lendemain matin, alors elle est automatiquement activée après un an et a accès à mes fonds. Un truc comme ça, c'est super important et super cool.

## Les frais sont dans le frontend

Encore bien plus important, c'est où se trouvent les frais. Aujourd'hui, on les prend chez les providers, et c'est une erreur. On devrait mettre les frais à zéro partout chez les providers et les prendre chez nous, dans le frontend ou dans notre backend. Derrière Nuri, il peut y avoir dix millions de providers, complètement égal. Ils prennent leur spread et leurs frais, et on ne rajoute rien chez eux.

Comme ça, on peut distinguer entre frais Nuri et frais partenaires. C'est simplement propre. Et je veux montrer aux gens dans le code open source, regarde, voilà les frais, c'est dans le code source. Je veux qu'on soit la boîte la plus transparente du monde.

Mon histoire préférée pour ça, c'est le tollé dans la communauté Aave quand le provider de swap a été changé en arrière-plan. Là on voit que les backends n'ont plus de pouvoir, mais les frontends. Celui qui a les utilisateurs a le moat.

## Fixe tes frais toi-même

On laisse même les gens fixer leurs frais eux-mêmes. Simplement par équité. Si tu ne veux pas payer de frais, tu peux aller à 0 pour cent. Mais tu peux aussi aller à 21 pour cent si tu veux. Et si quelqu'un demande pourquoi vous prenez 2 pour cent, alors on dit, va dans les réglages et change ça.

Pourquoi je crois que ça marche, ça vient de mes soirées à Berlin. Peu importe l'entrée que j'ai prise et peu importe le prix de la bière, les gens ne trouvaient jamais ça cool. À un moment, on a dit, fuck it, don pour la bière, don pour l'entrée. On a gagné environ cinq fois plus d'argent.

Quand tu donnes aux gens la possibilité de fixer ça eux-mêmes, alors il y a aussi des gens qui le mettent nettement plus haut. Parce qu'ils trouvent la gamification géniale ou parce qu'ils sont là pour la mission. Il y a les riches et les pauvres, les radins et les autres. Moi, pour les gens que je rencontre à une conférence et que j'ajoute à mon compte, je mettrais mes frais à 21 pour cent. Comme ça, ils reçoivent automatiquement ma part.

## Chaque appel est un petit paiement

J'ai encore une meilleure idée de comment on prend les frais. On gate simplement l'API Nuri avec des micropaiements, et les micropaiements sont nos frais. Chaque opération dans l'appli coûte alors un petit paiement x402 ou L402. L402 si ça a un rapport avec Bitcoin, x402 si ça a un rapport avec la crypto.

Un exemple. Sauvegarder ou lire un nouveau mot de passe dans ton gestionnaire de mots de passe Nuri coûte genre 0,1 cent ou 1 cent. Et on peut le prendre directement depuis le wallet, parce qu'il est agentic. Sur le Router, je fais déjà ça comme ça. Tu peux l'utiliser avec un token ou tu paies pour les appels, et on peut donner un prix différent à chaque endpoint.

Alors tu n'as pas besoin de construire ton propre système de frais. N'importe qui peut intégrer notre API où il veut, et on reçoit automatiquement les paiements. Je commencerais par le carnet de contacts, 0,1 cent à chaque fois qu'on ajoute un contact. Si ça tourne, on l'étend à toute l'appli. Une fonctionnalité à la fois.

## Wallet familial et hardware wallets

Quand les gens ont une fois vécu comment fonctionne un wallet Safe comme celui qu'on a en tant que boîte, ils trouvent ça vraiment cool. J'ai une clé, et on doit être ensemble. C'est une expérience crypto vraiment géniale.

Ou un wallet familial. Ma mère, ma sœur et moi. Deux d'entre nous peuvent être ensemble. Multisig, personne ne peut se l'imaginer. Mais dire, on est trois personnes et un hardware wallet, ou on est cinq personnes et une IA, ça, tout le monde comprend.

Et on reste sur le principe que personne d'autre n'arrive à faire. Wallet one-click Face ID. Seedless, pas de seed phrase, résistant au phishing, multisig par défaut.

## La première étape

On y va tout doucement. La première étape, c'est juste que je puisse ajouter un ami comme mon Padawan dans les réglages et qu'il reçoive automatiquement quelque chose. Ensuite, on voit dans notre base de données qui a ajouté qui et quels swaps ont eu lieu, et on paie les parrainages.

Et quand tu envoies quelque chose, on devrait avoir une autocomplétion de tous les utilisateurs Nuri. Pas seulement tes contacts, mais tout le monde. Je tape L et je trouve tous les gens avec L, comme sur PayPal.

Plus tard viendront la rotation des clés, l'ajout et la suppression de clés et un hardware wallet. De toute façon, on doit tout faire ça. Mais niveau vision, je pense que c'est absolument parfait. Parce que c'est un truc tellement viral que tu peux gagner de l'argent avec l'autre ou être son co-signataire.
