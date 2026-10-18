---
title: "O som pode fazer o que as partículas quânticas fazem?"
description: "O som curva, espalha e interfere como os elétrons na fenda dupla. Então o som é quântico? Onde a comparação funciona e onde quebra."
date: "2026-10-13"
updated: "2026-10-13"
lang: pt
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
tldr: ["O som curva, espalha e interfere como qualquer onda, e dá para fazer a fenda dupla com duas caixas de som.", "Então a fenda dupla testa se algo é uma onda, não se é quântico.", "A parte quântica são os impactos únicos aleatórios, as amplitudes de probabilidade, o colapso quando você mede e o emaranhamento.", "O som só fica quântico como fônons em sólidos frios, e ondas clássicas não conseguem fazer computação quântica."]
sections: [{"basically": "Eu queria saber se ondas sonoras se comportam como partículas quânticas, e a resposta é sim e não."}, {"basically": "O som é uma onda de pressão num meio, e a física clássica prevê exatamente o que ele faz em seguida."}, {"basically": "O som reflete, curva, espalha pelos cantos e interfere, então tem todo comportamento de onda clássica."}, {"basically": "O som curva pelas portas porque seu comprimento de onda tem metros, enquanto luz e elétrons precisam de fendas minúsculas."}, {"basically": "Duas caixas de som tocando o mesmo tom criam pontos altos e baixos numa sala, o padrão da fenda dupla no som."}, {"basically": "Elétrons únicos caem como pontos, acumulam listras com o tempo, e as listras somem quando você verifica o caminho."}, {"basically": "Uma onda sonora é pressão do ar, uma onda quântica é uma amplitude de probabilidade, e só isso torna impactos únicos aleatórios."}, {"basically": "Medir uma onda sonora a perturba um pouco, mas verificar o caminho de um elétron apaga a interferência."}, {"basically": "A física quântica não consegue explicar como uma medição escolhe um resultado, e o som clássico nunca tem esse problema."}, {"basically": "O observador na física quântica é qualquer detector ou ambiente que pega informação do caminho, não uma mente humana."}, {"basically": "Fônons são som quantizado em sólidos e mostram comportamento quântico real, mas só em laboratórios frios e controlados."}, {"basically": "O som pode misturar ondas, mas sem emaranhamento não alcança o espaço de estados enorme que um computador quântico usa."}, {"basically": "O som copia as listras da fenda dupla, mas aleatoriedade, colapso e emaranhamento ficam só no quântico."}]
---
## A pergunta que não me saía da cabeça

Há um tempo que tinha uma pergunta simples na cabeça. O som é uma onda. A luz é uma onda, e os eletrões também se comportam como ondas. Toda a gente conhece a experiência da dupla fenda, em que os eletrões fazem riscas num ecrã e as riscas desaparecem assim que se verifica qual a fenda que usaram. Então, o som consegue fazer o mesmo? Conseguem as ondas sonoras mostrar o mesmo comportamento dos objetos quânticos, com interferência e com este estranho efeito da observação?

Fui a fundo nisto, e a resposta curta é sim e não. O som faz muito do que as ondas quânticas fazem. Mas a parte que torna a física quântica quântica é exatamente a parte que o som não consegue fazer. É aqui que fica essa linha.

## O que é o som

O som é uma onda mecânica. Precisa de algo através do qual viajar, como ar, água ou um sólido, e é por isso que não há som no vácuo. Um cone de altifalante ou uma palma empurra as moléculas de ar ao lado, juntando-as, depois elas afastam-se de novo, e este padrão de ar comprimido e rarefeito move-se para fora. As moléculas em si não voam até ao teu ouvido. Apenas oscilam para trás e para a frente à volta do seu lugar, e só a perturbação viaja.

Uma onda sonora tem um comprimento de onda, a distância de uma compressão à seguinte. Tem uma frequência, quantas dessas passam por segundo, e ouvimos isso como tom. Os humanos ouvem aproximadamente de 20 Hz até 20.000 Hz. Tem uma amplitude, a força do empurrão, e ouvimos isso como volume. E tem uma velocidade que depende do meio. No ar à temperatura ambiente, o som move-se a cerca de 343 metros por segundo, na água do mar a cerca de 1.531.

O importante para a minha pergunta é que tudo isto é física clássica. Se conheceres a fonte e o meio, consegues calcular exatamente o que a onda vai fazer a seguir. Nada nisto é aleatório.

## O som faz tudo o que uma onda faz

O som reflete-se. É um eco, e é assim que o sonar encontra coisas debaixo de água. O som refrata-se, por isso curva-se quando o ar fica mais quente ou mais frio ou quando o vento muda, e uma voz consegue chegar mais longe com o vento. O som difrata-se, curva-se à volta de cantos e espalha-se depois de uma porta, e é por isso que consegues ouvir alguém na divisão ao lado sem a veres. Os sons graves curvam-se mais facilmente do que os agudos, e é por isso que um trovão distante é apenas um estrondo grave.

E o som interfere. Quando duas ondas sonoras se encontram e os seus picos se alinham, somam-se e fica mais alto. Quando o pico de uma encontra o vale da outra, anulam-se e fica mais baixo, em teoria até ao silêncio. Dois tons com quase o mesmo tom ficam mais altos e mais baixos num ritmo lento, e a isso chama-se batimentos.

Portanto, o som tem o conjunto completo, e a velha física clássica das ondas explica cada parte dele.

## Porque é que o tamanho importa

O que vês depende muito do tamanho da onda. Um tom de 100 Hz no ar tem um comprimento de onda de cerca de 3,4 metros, um tom de 10 kHz cerca de 3,4 centímetros. Esse é o tamanho de portas, divisões, móveis e pessoas. Por isso o som curva-se à volta do nosso mundo quotidiano a toda a hora, e ouvimos coisas que não conseguimos ver.

A luz visível tem comprimentos de onda de cerca de 400 a 700 nanómetros. Para fazer a luz curvar-se e interferir precisas de fendas minúsculas feitas com muita precisão, e é por isso que a luz não dobra esquinas no dia a dia. Os eletrões também têm um comprimento de onda, e nas experiências habituais é aproximadamente do tamanho do espaçamento entre átomos num cristal.

Portanto, o mesmo comportamento ondulatório aparece em escalas completamente diferentes. O som fá-lo numa sala de estar, os eletrões fazem-no à escala dos átomos. Só isso não te diz nada sobre quântico ou não quântico. É apenas o comprimento de onda.

## A dupla fenda com dois altifalantes

Consegues mesmo fazer a dupla fenda com som, e é uma demonstração clássica em sala de aula. Uma maneira é uma parede com duas aberturas. A maneira mais fácil é dois altifalantes alimentados pelo mesmo gerador de sinal, para que ambos toquem o mesmo tom em sincronia. Uma montagem típica coloca-os a cerca de meio metro de distância e toca algo por volta de 2.000 Hz.

Depois andas devagar através da sala à frente deles. Ouves pontos altos e pontos baixos, um a seguir ao outro. Essas são as mesmas riscas claras e escuras que Thomas Young viu com a luz, e as pessoas chamam-lhes franjas de Young para o som. Com um microfone e um medidor consegues mapear o padrão exatamente. Mesmo no meio, à mesma distância de ambos os altifalantes, está alto.

Numa sala normal fica confuso, porque as paredes refletem o som e acrescentam mais ondas por cima. Lá fora ou numa sala morta funciona melhor. E quase nunca consegues silêncio perfeito nos pontos baixos, porque as duas ondas não chegam com exatamente a mesma força.

## A dupla fenda com eletrões

Agora a versão quântica. Uma fonte envia fotões únicos ou eletrões únicos, um de cada vez, em direção a uma parede com duas fendas estreitas. Atrás está um ecrã que regista onde cada um aterra.

Cada eletrão único chega como um ponto num só lugar. Mas quando envias muitos deles, manténs ambas as fendas abertas e não verificas qual a fenda que usaram, os pontos vão formando riscas lentamente. É o mesmo tipo de padrão de interferência que com o som. E não podem estar a interferir uns com os outros, porque vêm um a um. Cada eletrão passa de alguma forma por ambos os caminhos como uma onda e aterra como uma partícula.

Depois colocas um detetor nas fendas para descobrir qual o caminho que cada eletrão tomou. As riscas desaparecem. Ficas com duas bandas simples atrás das duas fendas, como terias se disparasses bolinhas através delas.

## Dois tipos de onda

Foi aqui que percebi que a dupla fenda é um teste para ondas e não um teste para o quântico. Young fê-lo com luz no início do século XIX para mostrar que a luz é uma onda, muito antes de alguém falar de física quântica. O som, a água e a luz fazem todos esse padrão de riscas. Se vês riscas, aprendeste que algo é ondulatório, e foi só isso que aprendeste.

A verdadeira diferença é o que está a ondular. Na experiência do som é a pressão do ar, algo físico que consegues medir em cada ponto. O volume num ponto é apenas a soma das duas ondas. Na experiência quântica a onda é a função de onda, e não é uma coisa física a mover-se através de um meio. É uma amplitude de probabilidade. Diz-te quão provável é encontrar o eletrão num certo ponto. A regra para isso chama-se regra de Born, e diz que pegas no tamanho da onda num ponto e elevas ao quadrado, e isso dá-te a probabilidade. As riscas vêm das amplitudes dos dois caminhos a somarem-se, e só aparecem depois de muitos impactos únicos.

A própria função de onda muda de forma suave e previsível enquanto ninguém mede, seguindo a equação de Schrödinger. Mas onde um único eletrão aterra é aleatório. Experiências que violam as chamadas desigualdades de Bell sugerem que esta aleatoriedade é real e não apenas conhecimento em falta, por isso não há detalhes locais escondidos que ainda não tenhamos encontrado.

## Olhar muda um elétron, não um som

Digamos que você tente descobrir por qual fenda o som passou. Você coloca um microfone perto de uma das fendas. O microfone retira um pouco de energia da onda e espalha um pouco dela, e o padrão atrás muda um pouco. Mas o som ainda é uma onda sonora. Mais longe, ele ainda interfere, e nada sobre sua natureza mudou.

É como verificar a pressão de um pneu. Um pouco de ar sempre escapa, então você muda o que está medindo. Isso também é um efeito do observador, mas um efeito clássico e chato. Você pode calculá-lo, e com um instrumento melhor você pode torná-lo menor.

Com o elétron é diferente. Assim que você obtém a informação de qual caminho ele tomou, as faixas desaparecem completamente. Isso não é um detector desajeitado que empurra o elétron com força demais. Está ligado à informação em si. O princípio da incerteza de Heisenberg coloca um limite rígido sobre quão precisamente você pode saber alguns pares de coisas ao mesmo tempo, como posição e momento. Na física quântica, há uma perturbação mínima que você não consegue eliminar com engenharia.

## O problema da medição

A física quântica tem duas regras para como um estado muda, e elas não se encaixam. Quando ninguém mede, a função de onda evolui suavemente, você poderia fazê-la rodar ao contrário, e superposições continuam sendo superposições. Quando você mede, você obtém um resultado, escolhido aleatoriamente com as probabilidades da regra de Born, e o estado salta para corresponder a esse resultado. As pessoas chamam isso de colapso. É repentino e não pode ser desfeito.

A equação de Schrödinger não contém o colapso, e o colapso quebra suas regras. A teoria também não diz o que conta como medição, ou onde o sistema quântico termina e o dispositivo de medição começa. Essa lacuna é o problema da medição, e os físicos ainda discutem sobre isso. A visão de Copenhague toma o colapso como uma regra. Muitos Mundos diz que não existe colapso algum. A mecânica bohmiana adiciona variáveis ocultas. Teorias de colapso objetivo como GRW tornam o colapso um processo físico real.

A decoerência explica parte disso. Um sistema quântico toca seu ambiente o tempo todo, moléculas de ar, luz e tudo o mais, e fica emaranhado com ele. Visto apenas a partir do sistema, a interferência desaparece rapidamente e ele começa a parecer clássico. Essa é uma grande parte do porquê nunca vemos coisas grandes em dois lugares ao mesmo tempo. Mas a decoerência não explica por que você obtém este resultado e não aquele outro.

O som não tem nada parecido com isso. Uma onda sonora tem propriedades definidas o tempo todo, e medi-la apenas as revela, talvez com uma pequena perturbação.

## O observador não é uma mente

A palavra observador confunde muitas pessoas. Histórias populares transformaram isso na ideia de que a consciência cria a realidade, que o elétron decide porque um humano olha. Algumas discussões iniciais em torno de von Neumann e Wigner empurraram nessa direção. Mas a física não precisa de uma pessoa. O observador é qualquer sistema físico que interage com o elétron e extrai a informação de qual caminho ele tomou. Um detector em uma sala vazia faz isso, e o ambiente também faz isso.

Eu acho que interação de medição seria uma palavra melhor do que observador. É um processo físico, não um mental, e a palavra antiga continua alimentando um monte de besteiras esotéricas sobre a física quântica.

## Fônons, o quantum do som

Existe um lugar onde o som realmente se torna quântico, e é dentro de sólidos. Em um cristal, os átomos ficam em uma grade e vibram juntos. A física quântica diz que essa energia de vibração vem em pequenos pacotes fixos, e um pacote é chamado de fônon. O nome vem da palavra grega para som. Um fônon é para o som em um cristal o que um fóton é para a luz. Não é uma partícula básica como um elétron, é uma quase-partícula, uma vibração compartilhada de muitos átomos. Ondas longas de fônons são apenas as ondas sonoras comuns naquele sólido.

E os fônons fazem as coisas quânticas reais. Pesquisadores criaram fônons únicos, colocaram-nos em superposição, mostraram interferência entre caminhos de fônons, emaranharam fônons e até rodaram um apagador quântico com eles. Para isso, eles acoplam os fônons a qubits supercondutores em um chip e resfriam tudo a temperaturas criogênicas, para que vibrações térmicas aleatórias não apaguem o efeito.

Então sim, o som pode ser quântico. Mas apenas como fônons, em um sólido, em um laboratório, em frio extremo. O som no ar da sua sala de estar é uma onda de pressão clássica, e a física clássica a descreve quase perfeitamente. Fônons ainda podem ser importantes mais tarde, como uma maneira de armazenar informação quântica e movê-la entre circuitos supercondutores e luz.

## Por que alto-falantes não podem construir um computador quântico

A próxima coisa que me perguntei foi por que ninguém constrói um computador com alto-falantes, se um computador quântico roda em superposição e interferência e o som tem ambos.

A resposta é o tamanho do espaço em que a máquina trabalha. Com n qubits, um computador quântico trabalha em um espaço de 2 elevado a n estados, então cada qubit extra dobra esse espaço. A superposição permite que ele use todo esse espaço, e o emaranhamento liga os qubits uns aos outros. Muitos algoritmos quânticos precisam desse link.

Ondas clássicas podem se somar, e você pode misturar muitas frequências em um único som. Mas para obter exponencialmente muitos estados de um sistema de ondas clássicas, você precisaria de exponencialmente mais de algo físico, como frequências cada vez maiores ou mais e mais energia. Adicionar alto-falantes apenas faz o sistema crescer lentamente. Ondas clássicas também não têm emaranhamento entre partes separadas e nenhuma interferência de amplitudes de probabilidade. E a correção de erros quânticos depende de propriedades quânticas e medições que um sistema de som clássico simplesmente não tem.

## O que eu tiro disso

O som é uma ótima maneira de sentir o que é a interferência. Você pode andar por uma sala e ouvir as faixas. Mas a fenda dupla com som apenas prova que o som é uma onda. A parte quântica é outra coisa. É que um elétron único interfere consigo mesmo, que o padrão se constrói a partir de impactos únicos aleatórios, que verificar o caminho mata o padrão, e que ninguém consegue explicar totalmente como uma medição escolhe um resultado.

| | Som no ar | Elétron ou fóton |
|---|---|---|
| O que vibra | pressão do ar | amplitude de probabilidade |
| Precisa de um meio | sim | não |
| Interferência | sim | sim |
| Chega como pontos únicos | não | sim |
| Onde um impacto cai | previsível | aleatório |
| Verificar o caminho | pequena perturbação | padrão desaparece |
| Emaranhamento | não | sim |

Então, minha resposta honesta à minha própria pergunta é que ondas sonoras podem copiar a aparência da física quântica, as faixas e as ondas, mas não o que acontece por dentro. Onde o som realmente se torna quântico, como fônons em um cristal frio, ele segue todas as estranhas regras quânticas, o problema da medição incluído. A matemática das ondas é uma linguagem compartilhada para ambos, mas descreve duas coisas muito diferentes.
