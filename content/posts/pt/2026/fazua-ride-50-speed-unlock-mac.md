---
title: "Desbloqueio de velocidade do Fazua Ride 50 a partir de um Mac, sem caixa"
description: "Como eu e o meu agente aumentámos o limite de velocidade de um Fazua Ride 50 Evation de 25 para 55 km/h por USB a partir de um MacBook, com o firmware 2.04 e uma ferramenta open source."
date: "2026-10-16"
updated: "2026-10-16"
lang: pt
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
tldr: ["O Fazua Ride 50 guarda o seu limite de 25 km/h como um único valor no drivepack. No firmware 2.04 podes alterá-lo por USB.", "Fiz isso a partir de um MacBook Pro M4. A ferramenta open source era só para Windows, por isso o meu agente trocou a camada USB dela por hidapi.", "O firmware 2.50 teve de voltar primeiro para 2.04, através do FAZUA Toolbox oficial. O ficheiro 2.04 é o original do fazua.com.", "Leitura de confirmação depois de escrever, 55,01 km/h. A Badass Box não é necessária para isto."]
sections: [{"basically": "Um Canyon Roadlite:ON de 2020 com um Fazua Ride 50 Evation, e uma caixa de tuning que ficava sempre a piscar em amarelo."}, {"basically": "A caixa mente ao sensor de velocidade. O software simplesmente muda o limite que o motor verifica."}, {"basically": "A minha bicicleta, o meu MacBook, um cabo mini USB, uma chave T10, o FAZUA Toolbox e cerca de 75 linhas de Python."}, {"basically": "Drivepack fora, bateria ligada, tampa USB fora, cabo dentro. O Mac vê-o como evation v2.50."}, {"basically": "Primeiro só leitura. O meu dizia 24,98 km/h e uma roda de 2121 mm. Esse ficheiro também é o backup."}, {"basically": "No FAZUA Toolbox escolhe Manual, não Online, seleciona o ficheiro 2.04 e deixa-o fazer o flash e a calibração."}, {"basically": "Um comando escreve o novo limite, a bicicleta confirma, e uma segunda leitura mostra 55,01 km/h."}, {"basically": "LEDs brancos a piscar por turnos é o remote a atualizar-se a si próprio. Não lhe mexas até mostrar verde."}, {"basically": "Um clique errado, duas escritas abortadas, e uma luz vermelha que era só um drivepack mal encaixado."}, {"basically": "O limite é o mesmo em todos os modos. A autonomia não. Um comando repõe os 25."}]
---
## A bicicleta e o problema

A minha bicicleta é uma Canyon Roadlite:ON AL 7.0 de 2020, tamanho M, cinzento pace e laranja. O motor é um Fazua Evation, que a Fazua hoje chama Ride 50 Evation. O drivepack, motor e bateria numa só peça comprida, fica no tubo inferior e sai com uma alavanca. A bateria é uma Energy 250, o comando tátil está integrado no quadro. Não há ecrã no guiador, por isso a bicicleta nunca te diz a que velocidade vais.

Antes disto o meu drivepack corria o firmware 2.50 e a bateria o firmware 1.15. Só sei isto porque o li com o FAZUA Toolbox, ver abaixo.

A assistência corta aos 25 km/h, como em todas as pedelecs na UE. Eu queria ver como a bicicleta se sente com mais. Por isso, a 7 de outubro comprei uma Badass Box 4 para Fazua. Escrevi sobre isso em [Badass Box 4 numa Fazua Ride 50, a luz amarela](/posts/badass-box-4-fazua-ride-50-yellow-light). Funcionou durante um ou dois minutos, depois o LED de cima voltou a piscar em amarelo. Íman mais perto, outro raio, rodado 90 graus, o apoio da Badass disse que a instalação parece bem. Continuou amarelo depois de alguns minutos a andar.

## A ideia, mudar um número em vez de enganar o sensor

A Badass Box fica no sensor de velocidade na escora e altera os impulsos do íman do raio, para o motor pensar que vais mais devagar do que vais. Isso é um truque no sinal, e na minha bicicleta a Fazua reparou ao fim de um tempo e assinalou uma falha ligeira.

O motor em si só compara a tua velocidade com um valor guardado. A Fazua chama-lhe bikeMaxSpeed. Os revendedores conseguem vê-lo no Toolbox, mas para utilizadores normais está acinzentado. Se mudares esse valor, não há nada para enganar. O sensor reporta a velocidade real e o motor simplesmente ajuda durante mais tempo.

O meu agente encontrou duas formas de fazer isso. A empresa italiana Eplus vende o Flash Home por 134 euros mais IVA, só para Windows. E há o FazuaUnlocker no GitHub por quezzas, grátis, licença MIT, também só para Windows. Ambos dizem o mesmo. Funciona no firmware 2.04. No 2.50 primeiro voltas ao 2.04.

```
antes (box)                            depois (software)

íman do raio -> [box] -> sensor        íman do raio -> sensor
                 |  mais devagar falso              |  velocidade real
                 v                                       v
drivepack: limite 25 km/h              drivepack: limite 55 km/h
           -> amarelo após 1-2 min              -> sem box, sem amarelo
```

## O que usei

1. A bicicleta, bateria totalmente carregada.
2. Um MacBook Pro M4, 16 GB, macOS 15.5. Corre em Apple Silicon, sem Windows, sem máquina virtual.
3. Um cabo de dados mini USB. Não um cabo só de carregamento.
4. Uma chave Torx T10 para a tampa USB.
5. FAZUA Toolbox 2.29 basic para macOS em Apple Silicon, do site da Fazua.
6. Firmware 2.04, ficheiro evation_Software_2.04.bin. O link original da fazua.com desapareceu, mas o Internet Archive guardou-o de 9 de julho de 2022. SHA-256 8fe885c9dfc7caa9cf8e61b88051bf8d42da53747c4fd86d2b72c3c2ef23d32e. O meu agente comparou-o com a cópia que circula no GitHub, e são idênticos ao byte.
7. O meu fork do FazuaUnlocker, [github.com/eminogrande/FazuaUnlocker](https://github.com/eminogrande/FazuaUnlocker), com Python 3.9 e a biblioteca hidapi.

A ferramenta original fala com o drivepack através das funções USB do Windows. O meu agente deixou o protocolo, o checksum e a lógica de escrita exatamente como estão e só substituiu essa camada pela hidapi, que também corre em macOS. Esse é o ficheiro fazua_mac.py, cerca de 75 linhas. O firmware em si é encriptado, por isso ninguém aqui muda o firmware. A ferramenta só muda uma definição.

## Passo 1, ligar o drivepack ao Mac

1. Tira o drivepack da bicicleta. A bateria fica dentro do drivepack e tem de estar ligada.
2. Desaparafusa a tampa USB no drivepack com a T10. Fica na parte de baixo, perto das aletas de arrefecimento.
3. Liga o cabo mini USB ao Mac e deita o drivepack no chão ou numa mesa.
4. Verifica que o Mac o vê. No terminal `system_profiler SPUSBDataType | grep evation` mostrou `evation v2.50` para mim. Para a ferramenta é um dispositivo USB HID com ID 10C4:1001.

A Fazua diz no seu próprio guia que só precisas do drivepack para uma atualização de firmware, não da bicicleta toda. A roda não precisa de girar para nada disto.

## Passo 2, lê antes de escrever

Fecha primeiro o FAZUA Toolbox, porque ele segura a ligação USB. Depois:

```sh
git clone https://github.com/eminogrande/FazuaUnlocker.git
cd FazuaUnlocker
python3 -m venv .venv && .venv/bin/pip install -r requirements-mac.txt
.venv/bin/python fazua_mac.py --read-only
```

O meu respondeu após cerca de 110 ms. Max Bike Speed 24.98 km/h, valor bruto 694. Comprimento da roda 2121 mm. Shaft offset 30533. A ferramenta deriva uma pequena chave de escrita desse offset, a minha era ba88. O meu agente guardou esta leitura como ficheiro JSON, para eu poder sempre voltar exatamente a estes valores.

Depois um dry run, que constrói o pacote de escrita com checksum mas não envia nada:

```sh
.venv/bin/python fazua_mac.py 55 --dry-run
```

## Passo 3, downgrade para 2.04

Esta é a parte com risco real. Se o flash for interrompido, o drivepack pode morrer. Por isso bateria cheia, cabo fixo, drivepack quieto.

1. Abre o FAZUA Toolbox, vai a FIRMWARE UPDATE, clica em UPDATE NOW.
2. Escolhe Manual. Não Online, porque Online instala outra vez a versão mais recente.
3. Escolhe evation_Software_2.04.bin e verifica o nome do ficheiro antes de carregares em START.
4. Espera. Depois do flash o motor calibra e pode vibrar um bocado. Não mexas no drivepack.
5. Verifica outra vez com system_profiler. O meu agora dizia `evation v2.04`.

Ler outra vez depois do downgrade ainda mostrava 24.98 km/h. A mudança de firmware sozinha não desbloqueia nada.

## Passo 4, escrever 55 km/h

```sh
.venv/bin/python fazua_mac.py 55 --force
```

A ferramenta mostrou a mudança de 24.98 km/h, bruto 694, para 55.00 km/h, bruto 1528. Depois "Write cycle acknowledged by bike", depois leu o valor de volta sozinha. "SUCCESS: bikeMaxSpeed is now 55.01 km/h". Uma leitura separada alguns segundos depois disse o mesmo, comprimento da roda ainda 2121 mm.

A ferramenta aceita 5 a 75 km/h. Escolhi 55 porque quero ver como é. O meu agente sugeriu 45, porque o motor não tem potência infinita e acima de certa velocidade a maior parte vem das tuas pernas de qualquer forma. O que quer que definas, o motor só ajuda durante mais tempo, não torna a bicicleta mais rápida por si só.

## Passo 5, de volta à bicicleta

1. Desliga o cabo, aparafusa a tampa USB de volta à mão, 1 a 1.5 Nm. Sem a tampa o drivepack não é à prova de água.
2. Mete o drivepack na bicicleta até fazer clique.
3. Liga.

Na minha bicicleta o comando depois piscou em branco, dois LEDs em cima e dois em baixo, alternadamente. Parece um erro. Não é. A Fazua escreve no seu guia de atualização "Flashing LEDs indicates an update of the remote. Do not touch the remote during the update and do not switch off the e-bike." O drivepack traz o comando para o seu próprio nível de firmware. O meu desligou-se uma vez, voltou a ligar, e depois estava tudo verde.

Depois testei. Parece funcionar. Ainda não tenho velocidade máxima exata, porque a bicicleta não tem ecrã. Para a próxima um telemóvel com velocímetro GPS vai no guiador.

## O que correu mal pelo caminho

O meu agente clicou sozinho no Toolbox no Mac, e o primeiro clique acertou em CALIBRATION em vez de FIRMWARE UPDATE. Só abriu a página, nada começou. Depois o clique em Manual não acertou, porque cliques enviados em segundo plano não chegavam a essa janela. O meu agente parou ali, porque um clique errado em START teria instalado o 2.50 outra vez. Cliquei eu em Manual e no ficheiro.

As duas primeiras tentativas de escrita abortaram. A ferramenta pede um yes antes de escrever, e a forma como o meu agente enviava as respostas não chegava a essa pergunta. Nada foi escrito, a leitura a seguir ainda mostrava 24,98 km/h. Com --force passou.

Mais tarde tirei o drivepack outra vez, fechei a tampa USB e mexi no íman, e aí o LED de cima ficou vermelho. Vermelho não é o íman. O manual da Fazua diz que vermelho em cima significa um erro de ligação entre o drivepack e a caixa do movimento pedaleiro, a peça no quadro onde ele encaixa. Tirei-o, verifiquei os contactos, empurrei-o outra vez até fazer clique, e ficou bom.

E depois de 15 minutos parado o sistema desliga-se sozinho. Isso também é normal, está no manual.

## Bateria, modos e voltar atrás

O limite é um valor no drivepack. Verde, azul e rosa usam todos os mesmos 55 km/h. Os modos só mudam o quanto o motor empurra e a velocidade a que a bateria fica vazia. Andar mais depressa custa muito mais energia, por isso acima dos 25 a autonomia cai depressa.

No firmware 2.04 a bateria também fica acordada mais tempo depois da volta. No 2.50 a Fazua tinha cortado esse standby para uma a três horas, no firmware mais antigo vai até oito. Por isso, depois de andar, seguro o botão da bateria durante dois segundos até os LEDs se apagarem.

Voltar ao original é um comando com o cabo ligado:

```sh
.venv/bin/python fazua_mac.py 25 --force
```

A Eplus escreve que se pode atualizar outra vez para o 2.50 depois do desbloqueio. Ainda não experimentei isso, por isso, por agora, fico no 2.04 e não carrego em update nem no Toolbox nem na app.

Acima dos 25 km/h a bicicleta já não é um pedelec. Na Alemanha só é permitida em terreno privado, não na via pública, e a garantia e o seguro podem ir-se. Fazer flash de firmware pode estragar o drivepack. Tudo aqui é por tua conta e risco.
