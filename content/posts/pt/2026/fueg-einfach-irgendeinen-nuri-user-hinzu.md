---
title: "Simplesmente adicione qualquer usuário Nuri"
description: "Referral, Guardian, herança, Multisig e poupança conjunta vão virar um recurso na Nuri. Você adiciona um username nas configurações, o resto vem daí."
date: "2026-10-18"
updated: "2026-10-18"
lang: pt
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
tldr: ["Minha ideia para a Nuri é um único recurso. Você adiciona nas configurações o username de alguém.", "Daí vêm Referral, Guardian, herança, Multisig e poupança conjunta, dependendo do que você permitir.", "A fee fica no nosso frontend, aberta no código-fonte, e você mesmo define ela entre 0 e 21 por cento."]
sections: [{"basically": "Na Nuri, Referral, Guardian, herança e Multisig vão virar um recurso. Você adiciona um username nas configurações."}, {"basically": "Quem adiciona um amigo na Nuri divide a fee com ele. Com 10 pessoas, ela é dividida por 10."}, {"basically": "Cada pagamento manda alguns satoshis para o seu pessoal e uma notificação push. Isso torna a Nuri viral."}, {"basically": "Num Expanding Multisig, as chaves dos seus Guardians só ficam ativas quando você perde as suas."}, {"basically": "Um Guardian ajuda você a recuperar sua chave. Um herdeiro só consegue acesso quando você não faz nada por um ano."}, {"basically": "A Nuri não cobra a fee dos provedores, mas no próprio frontend, aberta no código-fonte."}, {"basically": "Na Nuri você define sua própria fee, de 0 a 21 por cento. Nas minhas festas, doações renderam cinco vezes mais."}, {"basically": "Cada chamada de API na Nuri será um pequeno pagamento x402 ou L402. Assim o problema da fee está resolvido."}, {"basically": "Ninguém entende Multisig. Três pessoas e uma hardware wallet, todo mundo entende. É assim que explicamos a Nuri."}, {"basically": "O primeiro passo na Nuri é só um amigo nas configurações que ganha junto. Todo o resto é construído sobre isso."}]
---
Acho que resolvi algo bem legal hoje de manhã. É sobre um recurso para a Nuri. Essa é a ideia, para começar.

## Um recurso em vez de cinco

Quero juntar Multisig, Guardians, Inheritance e Referral em um único recurso. E funciona assim. Eu simplesmente adiciono o seu username nas configurações do meu app. Só isso.

No momento em que faço isso, você recebe 50 por cento das fees que eu pago à Nuri. Você pode ser meu Guardian ao mesmo tempo. Isso significa que você me ajuda com o seu passkey a recuperar minha conta no futuro. Você também pode entrar na wallet como co-signer. Ou nós somos uma empresa e queremos ter uma wallet multisig juntos.

Esses são todos recursos diferentes. Mas todos se baseiam no mesmo recurso de frontend. Simplesmente adicione qualquer usuário Nuri.

## A fee é dividida

As fees que eu pago à Nuri, vamos inicialmente fixar em algo como 2,1 por cento. Toda vez que eu faço um pagamento, metade vai para a Nuri e a outra metade vai para a pessoa que eu adicionei.

Você também pode adicionar 10 usernames. Aí você simplesmente tem uma wallet com 10 pessoas, e as fees são divididas por 10. Todas as suas novas pessoas recebem automaticamente uma parte, e a Nuri recebe um décimo.

Claro que também daria para se adicionar mutuamente, aí voltaria para mim de novo. Temos que tomar cuidado para não criar um loop aí. Isso obviamente não pode acontecer.

## Minha mãe recebe 17 satoshis

Bitcoiners querem fazer outras pessoas se tornarem bitcoiners. Agora posso convidar minha mãe. E ela recebe uma push notification toda vez que eu faço um pagamento. Você acabou de receber 20 satoshis. Você acabou de receber 17 satoshis.

Conheço isso de mim mesmo. Em outro serviço, recebo uma mensagem no Telegram toda vez que acontece um swap, e lá está escrito que acabei de ganhar 10 satoshis. É a coisa mais viral que já experimentei comigo mesmo. É engraçado, e as pessoas meio que dão dinheiro uma à outra assim.

Com Arkade também podemos mandar 1, 2, 3, 4 ou 5 satoshis sem fee. E isso também mostra um pouco como Arkade é foda nesse ponto.

## Expanding em vez de Decaying Multisig

As keys que adicionamos fazem o oposto do que normalmente fazemos na Nuri. Se não queremos que elas sejam signatárias desde o início, então não é um Decaying Multisig, mas um Expanding Multisig.

Isso significa que, se eu perder todas as minhas keys, depois de um tempo, um ano ou algo assim, as keys dos meus Guardians se ativam automaticamente. No Bitcoin dá para fazer isso. No Ethereum provavelmente será mais difícil, mas certamente também dá.

E claro, essas são configurações que se pode ajustar. Ninguém deve conseguir acessar seu dinheiro só porque você não moveu seus bitcoins por um ano.

## Guardian e herança

Guardian é um recurso. Eu gostaria de fazer exatamente como a Bitkey. Eles construíram isso de um jeito que seus Guardians podem te ajudar a recuperar sua key, mas não têm acesso ao seu dinheiro. Como exatamente eles fizeram isso, ainda precisamos verificar.

O outro recurso é Inheritance, e isso é extremamente importante. Eu gostaria, por exemplo, de registrar minha irmã como herdeira. Toda vez que eu faço um pagamento, um contador é zerado de novo. E se algo acontecer comigo, por qualquer motivo, eu não acordar no dia seguinte, então ela é ativada automaticamente depois de um ano e tem acesso aos meus funds. Algo assim é exageradamente importante e exageradamente legal.

## A fee está no frontend

Muito mais importante é onde a fee está. Hoje nós a cobramos nos providers, e isso é um erro. Devemos colocar a fee em zero em todos os providers e cobrá-la nós mesmos, no frontend ou no nosso backend. Atrás da Nuri podem então estar dez milhões de providers, tanto faz. Eles cobram seu spread e sua fee, e nós não adicionamos nada em cima.

Com isso podemos distinguir entre fee da Nuri e fee do parceiro. Isso é simplesmente clean. E quero mostrar às pessoas no código open source, olha aqui, aqui está a fee, está no código-fonte. Quero que sejamos a empresa mais transparente do mundo.

Minha história favorita sobre isso é o protesto na comunidade Aave, quando o provider de swap foi trocado nos bastidores. Isso mostra que backends não têm mais poder, mas frontends sim. Quem tem os usuários tem o moat.

## Defina sua própria fee

Nós até deixamos as pessoas definirem a fee elas mesmas. Simplesmente por justiça. Se você não quer pagar fees, pode colocar em 0 por cento. Mas também pode colocar em 21 por cento, se quiser. E se alguém perguntar, por que vocês cobram 2 por cento, então dizemos, vá nas configurações e mude isso.

Por que acho que isso funciona vem das minhas festas em Berlim. Não importa qual entrada eu cobrava e não importa qual preço pela cerveja, as pessoas nunca achavam legal. Em algum momento dissemos, foda-se, doação pela cerveja, doação pela entrada. Ganhamos aproximadamente cinco vezes mais dinheiro.

Quando você dá às pessoas a possibilidade de definir isso elas mesmas, também existem pessoas que colocam bem mais alto. Porque acham a gamificação foda ou porque estão pela missão. Existem os ricos e os pobres, os mão de vaca e os outros. Para pessoas que conheço numa conferência e adiciono à minha conta, eu colocaria minha fee em 21 por cento. Aí elas recebem automaticamente meu split.

## Cada call é um pequeno pagamento

Tenho uma ideia ainda melhor de como cobrar a fee. Simplesmente protegemos a API da Nuri com micropayments, e os micropayments são nossas fees. Cada operação no app custa então um pequeno pagamento x402 ou L402. L402, se tiver a ver com Bitcoin, x402, se tiver a ver com cripto.

Um exemplo. Salvar ou ler uma nova senha no seu gerenciador de senhas Nuri custa simplesmente 0,1 centavo ou 1 centavo. E podemos tirar isso diretamente da wallet, porque ela é agentic. No Router já faço isso assim. Você pode usá-lo com um token ou paga pelas calls, e podemos dar um preço diferente a cada endpoint individual.

Aí você não precisa construir um sistema de fees próprio. Qualquer um pode integrar nossa API onde quiser, e recebemos automaticamente os pagamentos. Eu começaria com a lista de contatos, 0,1 centavo toda vez que se adiciona um contato. Quando isso funcionar, expandimos para o app inteiro. Um recurso de cada vez.

## Wallet familiar e hardware wallets

Quando as pessoas experimentaram uma vez como funciona uma wallet tipo Safe, que temos como empresa, elas acham isso muito legal. Eu tenho uma chave, e precisamos estar juntos. Essa é uma experiência cripto realmente foda.

Ou uma wallet familiar. Minha mãe, minha irmã e eu. Dois de nós podem estar juntos. Multisig ninguém consegue imaginar. Mas dizer, somos três pessoas e uma hardware wallet, ou somos cinco pessoas e uma AI, isso todo mundo entende.

E mantemos o princípio que ninguém mais consegue fazer. Wallet com um clique e Face ID. Seedless, sem seed phrase, resistente a phishing, multisig por padrão.

## O primeiro passo

Vamos com calma, bem devagar. O primeiro passo é apenas que eu possa adicionar um amigo como meu Padawan nas configurações e ele receba algo automaticamente. Depois vemos na nossa base de dados quem adicionou quem e quais swaps aconteceram, e pagamos os referrals.

E quando enviares algo, devíamos ter um autocompletar de todos os utilizadores da Nuri. Não só os teus contactos, mas simplesmente toda a gente. Eu escrevo L e encontro todas as pessoas com L, tal como no PayPal.

Mais tarde vêm a rotação de chaves, adicionar e apagar keys e uma hardware wallet. Isso temos de fazer tudo de qualquer maneira. Mas em termos de visão, acho que é absolutamente perfeito. Porque é uma feature tão viral que podes ganhar com o outro ou ser o seu co-signer.
