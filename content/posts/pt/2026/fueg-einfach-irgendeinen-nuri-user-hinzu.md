---
title: "Adiciona qualquer utilizador Nuri"
description: "Referral, Guardian, herança, Multisig e poupança conjunta vão ser uma só funcionalidade na Nuri. Adicionas um username nas Settings, o resto vem daí."
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
tldr: ["A minha ideia para a Nuri é uma única funcionalidade. Adicionas o username de alguém nas Settings.", "Daí nascem o Referral, o Guardian, a herança, o Multisig e a poupança conjunta, consoante o que permitires.", "A Fee fica no nosso frontend, aberta no código-fonte, e és tu que a defines entre 0 e 21 por cento."]
sections: [{"basically": "Na Nuri, Referral, Guardian, herança e Multisig vão ser uma só funcionalidade. Adicionas um username nas Settings."}, {"basically": "Quem adiciona um amigo na Nuri divide a Fee com ele. Com 10 pessoas, divide-se por 10."}, {"basically": "Cada pagamento envia alguns satoshis aos teus amigos e uma notificação push. É isso que torna a Nuri viral."}, {"basically": "Num Expanding Multisig, as chaves dos teus Guardians só ficam ativas quando perderes as tuas."}, {"basically": "Um Guardian ajuda-te a recuperar a tua chave. Um herdeiro só tem acesso quando não fizeres nada durante um ano."}, {"basically": "A Nuri não cobra a Fee nos providers, cobra-a no próprio frontend, aberta no código-fonte."}, {"basically": "Na Nuri defines a tua própria Fee, de 0 a 21 por cento. Nas minhas festas, as doações renderam cinco vezes mais."}, {"basically": "Cada chamada à API na Nuri será um pequeno pagamento x402 ou L402. Assim o problema da Fee fica resolvido."}, {"basically": "Multisig ninguém percebe. Três pessoas e uma hardware wallet, toda a gente percebe. É assim que explicamos a Nuri."}, {"basically": "O primeiro passo na Nuri é só um amigo nas Settings que também ganha. Tudo o resto constrói-se a partir daí."}]
---
Acho que resolvi uma parada bem legal hoje de manhã. É sobre um recurso para a Nuri. Essa é a ideia, para começar.

## Um recurso em vez de cinco

Quero juntar Multisig, Guardians, Herança e Indicação em um recurso só. E funciona assim. Eu simplesmente adiciono seu username nas Configurações do meu app. Só isso.

No momento em que faço isso, você recebe 50 por cento das taxas que eu pago para a Nuri. Você pode ser meu Guardião ao mesmo tempo. Isso quer dizer que você me ajuda com sua passkey a recuperar minha conta no futuro. Você também pode entrar na carteira como co-signatário. Ou nós somos uma empresa e queremos ter uma carteira Multisig juntos.

São todos recursos diferentes. Mas todos se baseiam no mesmo recurso de frontend. Simplesmente adicione qualquer usuário da Nuri.

## A taxa é dividida

As taxas que eu pago para a Nuri, vamos fixar em algo como 2,1 por cento, para começar. Toda vez que eu faço um pagamento, metade vai para a Nuri e a outra metade vai para a pessoa que eu adicionei.

Você também pode adicionar 10 usernames. Aí você tem uma carteira com 10 pessoas, e as taxas são divididas por 10. Todas as suas novas pessoas recebem automaticamente uma parte, e a Nuri fica com um décimo.

Claro que daria para se adicionar mutuamente, aí voltaria para mim de novo. Temos que tomar cuidado para não criar um loop aí. Isso obviamente não pode acontecer.

## Minha mãe recebe 17 satoshis

Bitcoiners querem fazer outras pessoas virarem bitcoiners. Agora posso convidar minha mãe. E ela recebe uma notificação push toda vez que eu faço um pagamento. Você acabou de receber 20 satoshis. Você acabou de receber 17 satoshis.

Eu conheço isso de mim mesmo. Em outro serviço, recebo uma mensagem no Telegram toda vez que acontece uma troca, e lá está escrito que acabei de ganhar 10 satoshis. É a coisa mais viral que já vivi na minha vida. É engraçado, e a gente fica se dando um pouco de dinheiro um para o outro.

Com Arkade também podemos mandar 1, 2, 3, 4 ou 5 satoshis sem taxa. E isso também mostra um pouco como Arkade é foda nesse ponto.

## Expansão em vez de Decaimento Multisig

As chaves que adicionamos fazem o oposto do que normalmente fazemos na Nuri. Se não queremos que elas sejam signatárias desde o início, então não é um Multisig Decaindo, mas sim um Multisig Expandindo.

Isso quer dizer que, se eu perder todas as minhas chaves, depois de um tempo, um ano ou algo assim, as chaves dos meus Guardiões se ativam automaticamente. Com Bitcoin dá para fazer isso. Com Ethereum provavelmente vai ser mais difícil, mas com certeza também dá.

E claro, são Configurações que dá para configurar. Ninguém deve conseguir acessar seu dinheiro só porque você não moveu seus bitcoins por um ano.

## Guardião e herança

Guardião é um recurso. Eu gostaria de fazer exatamente igual à Bitkey. Eles construíram isso de um jeito que seus Guardiões podem te ajudar a recuperar sua chave, mas não têm acesso ao seu dinheiro. Como exatamente eles fizeram isso, ainda precisamos ver.

O outro recurso é Herança, e isso é extremamente importante. Quero, por exemplo, colocar minha irmã como herdeira na minha conta. Toda vez que eu faço um pagamento, um contador é zerado de novo. E se alguma coisa acontecer comigo, por qualquer motivo, eu não acordar no dia seguinte, então ela é ativada automaticamente depois de um ano e tem acesso aos meus fundos. Isso é absurdamente importante e absurdamente legal.

## A taxa fica no frontend

Muito mais importante é onde a taxa fica. Hoje nós a cobramos dos provedores, e isso é um erro. Devemos zerar a taxa nos provedores em todo lugar e cobrar nós mesmos, no frontend ou no nosso backend. Atrás da Nuri podem estar dez milhões de provedores, tanto faz. Eles ficam com o spread deles e a taxa deles, e nós não adicionamos nada em cima.

Assim podemos distinguir entre taxa da Nuri e taxa do parceiro. Isso é simplesmente limpo. E quero mostrar para as pessoas no código open source, olha aqui, aqui está a taxa, está no código-fonte. Quero que sejamos a empresa mais transparente do mundo.

Minha história favorita sobre isso é o escândalo na comunidade da Aave, quando trocaram o provedor de swap nos bastidores. Isso mostra que backends não têm mais poder, mas sim frontends. Quem tem os usuários, tem o fosso.

## Defina sua própria taxa

Nós até deixamos as pessoas definirem a taxa elas mesmas. Simplesmente por justiça. Se você não quer pagar taxas, pode colocar em 0 por cento. Mas também pode colocar em 21 por cento, se quiser. E se alguém perguntar, por que vocês cobram 2 por cento, aí dizemos, vai nas Configurações e muda isso.

Por que eu acho que isso funciona? Por causa das minhas festas em Berlim. Não importava qual entrada eu cobrava e não importava qual preço pela cerveja, as pessoas nunca achavam legal. Em algum momento a gente disse, foda-se, doação pela cerveja, doação pela entrada. Ganhamos mais ou menos cinco vezes mais dinheiro.

Quando você dá às pessoas a possibilidade de definir isso elas mesmas, também existem pessoas que colocam bem mais alto. Porque acham a gamificação foda ou porque estão junto pela missão. Existem os ricos e os pobres, os mão de vaca e os outros. Eu colocaria minha taxa em 21 por cento para pessoas que conheço numa conferência e adiciono à minha conta. Aí elas recebem automaticamente minha parte.

## Cada chamada é um pequeno pagamento

Tenho uma ideia ainda melhor de como cobrar a taxa. Simplesmente colocamos um portão de micropagamentos na API da Nuri, e os micropagamentos são nossas taxas. Cada operação no app custa então um pequeno pagamento x402 ou L402. L402, se tiver a ver com Bitcoin, x402, se tiver a ver com cripto.

Um exemplo. Salvar ou ler uma nova senha no seu gerenciador de senhas da Nuri custa algo como 0,1 centavo ou 1 centavo. E podemos tirar isso direto da carteira, porque ela é agentic. No Router eu já faço assim. Você pode usar com um token ou paga pelas chamadas, e podemos dar um preço diferente para cada endpoint individual.

Aí você não precisa construir um sistema de taxas próprio. Qualquer um pode integrar nossa API onde quiser, e nós recebemos os pagamentos automaticamente. Eu começaria com a agenda de contatos, 0,1 centavo toda vez que se adiciona um contato. Se isso funcionar, expandimos para o app inteiro. Um recurso de cada vez.

## Carteira familiar e carteiras de hardware

Quando as pessoas experimentaram uma vez como funciona uma carteira tipo Safe, que temos como empresa, elas acham muito legal. Eu tenho uma chave, mas só podemos pagar juntos. Isso é uma experiência cripto muito foda.

Ou uma carteira familiar. Minha mãe, minha irmã e eu. Dois de nós bastam para pagar juntos. Multisig ninguém consegue imaginar. Mas dizer, somos três pessoas e uma carteira de hardware, ou somos cinco pessoas e uma IA, isso todo mundo entende.

E mantemos o princípio que ninguém mais consegue fazer. Carteira de um clique com Face ID. Sem seed, sem frase seed, resistente a phishing, Multisig por padrão.

## O primeiro passo

Vamos com calma, devagar. O primeiro passo é só que eu possa adicionar um amigo como meu Padawan nas Configurações e ele receba algo automaticamente. Depois vemos no nosso banco de dados quem adicionou quem e quais trocas aconteceram, e pagamos as indicações.

E quando você envia algo, deveríamos ter um autocomplete de todos os usuários da Nuri. Não só seus contatos, mas simplesmente todos. Eu digito L e acho todas as pessoas com L, igual no PayPal.

Depois vêm rotação de chaves, adicionar e remover chaves e uma carteira de hardware junto. Temos que fazer tudo isso de qualquer jeito. Mas pela visão, acho que isso é absolutamente perfeito. Porque é um recurso tão absurdamente viral, que você pode ganhar junto com o outro ou ser co-signatário dele.
