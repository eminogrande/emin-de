---
title: "¿Puede el sonido hacer lo que hacen las partículas cuánticas?"
description: "El sonido se curva, se dispersa e interfiere como los electrones en la doble rendija. Entonces, ¿es cuántico el sonido? Dónde funciona la comparación y dónde se rompe."
date: "2026-10-13"
updated: "2026-10-13"
lang: es
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
tldr: ["El sonido se curva, se dispersa e interfiere como cualquier onda, y puedes hacer la doble rendija con dos altavoces.", "Así que la doble rendija prueba si algo es una onda, no si es cuántico.", "La parte cuántica son los impactos individuales aleatorios, las amplitudes de probabilidad, el colapso al medir y el entrelazamiento.", "El sonido solo se vuelve cuántico como fonones en sólidos fríos, y las ondas clásicas no pueden hacer computación cuántica."]
sections: [{"basically": "Quería saber si las ondas sonoras se comportan como partículas cuánticas, y la respuesta es sí y no."}, {"basically": "El sonido es una onda de presión en un medio, y la física clásica predice exactamente lo que hará después."}, {"basically": "El sonido se refleja, se curva, se dispersa en las esquinas e interfiere, así que tiene todo comportamiento de onda clásica."}, {"basically": "El sonido se curva alrededor de las puertas porque su longitud de onda es de metros, mientras que la luz y los electrones necesitan rendijas diminutas."}, {"basically": "Dos altavoces tocando el mismo tono crean puntos fuertes y suaves en una habitación, el patrón de la doble rendija en sonido."}, {"basically": "Los electrones individuales caen como puntos, acumulan franjas con el tiempo, y las franjas desaparecen cuando compruebas el camino."}, {"basically": "Una onda sonora es presión de aire, una onda cuántica es una amplitud de probabilidad, y solo eso hace que los impactos individuales sean aleatorios."}, {"basically": "Medir una onda sonora la empuja un poco, pero comprobar el camino de un electrón borra la interferencia."}, {"basically": "La física cuántica no puede explicar cómo una medición elige un resultado, y el sonido clásico nunca tiene ese problema."}, {"basically": "El observador en física cuántica es cualquier detector o entorno que toma información del camino, no una mente humana."}, {"basically": "Los fonones son sonido cuantizado en sólidos y muestran comportamiento cuántico real, pero solo en laboratorios fríos y controlados."}, {"basically": "El sonido puede mezclar ondas, pero sin entrelazamiento no puede alcanzar el enorme espacio de estados que usa una computadora cuántica."}, {"basically": "El sonido copia las franjas de la doble rendija, pero la aleatoriedad, el colapso y el entrelazamiento siguen siendo solo cuánticos."}]
---
## La pregunta que no dejaba de dar vueltas en mi cabeza

Tenía una pregunta simple en la cabeza desde hacía un tiempo. El sonido es una onda. La luz es una onda, y los electrones también se comportan como ondas. Todo el mundo conoce el experimento de la doble rendija, donde los electrones forman franjas en una pantalla y las franjas desaparecen en cuanto compruebas por qué rendija pasaron. Entonces, ¿puede el sonido hacer lo mismo? ¿Pueden las ondas sonoras mostrar el mismo comportamiento que los objetos cuánticos, con interferencia y con este extraño efecto de la observación?

Me metí a fondo en el tema, y la respuesta corta es sí y no. El sonido hace mucho de lo que hacen las ondas cuánticas. Pero la parte que hace que la física cuántica sea cuántica es exactamente la parte que el sonido no puede hacer. Aquí está dónde está esa línea.

## Qué es el sonido

El sonido es una onda mecánica. Necesita algo a través de qué viajar, como el aire, el agua o un sólido, y por eso no hay sonido en el vacío. Un cono de altavoz o una palmada empuja las moléculas de aire que tiene al lado, juntándolas, luego se separan de nuevo, y este patrón de aire comprimido y enrarecido se mueve hacia afuera. Las moléculas en sí no vuelan hasta tu oído. Solo oscilan de un lado a otro alrededor de su posición, y solo la perturbación viaja.

Una onda sonora tiene una longitud de onda, la distancia de una compresión a la siguiente. Tiene una frecuencia, cuántas de esas pasan por segundo, y la oímos como tono. Los humanos oímos aproximadamente desde 20 Hz hasta 20.000 Hz. Tiene una amplitud, qué tan fuerte es el empuje, y la oímos como volumen. Y tiene una velocidad que depende del medio. En el aire a temperatura ambiente el sonido se mueve a unos 343 metros por segundo, en el agua de mar a unos 1.531.

Lo importante para mi pregunta es que todo esto es física clásica. Si conoces la fuente y el medio, puedes calcular exactamente qué hará la onda a continuación. No hay nada aleatorio en ello.

## El sonido hace todo lo que hace una onda

El sonido se refleja. Eso es un eco, y es como el sonar encuentra cosas bajo el agua. El sonido se refracta, así que se curva cuando el aire se calienta o se enfría o cuando el viento cambia, y una voz puede llegar más lejos con el viento. El sonido se difracta, se curva alrededor de las esquinas y se dispersa después de una puerta, y por eso puedes oír a alguien en la habitación de al lado sin verlo. Los sonidos graves se curvan más fácilmente que los agudos, y por eso un trueno lejano es solo un retumbo grave.

Y el sonido interfiere. Cuando dos ondas sonoras se encuentran y sus picos se alinean, se suman y suena más fuerte. Cuando el pico de una se encuentra con el valle de la otra, se cancelan y suena más bajo, en teoría hasta el silencio. Dos tonos con casi el mismo tono se hacen más fuertes y más suaves en un ritmo lento, y eso se llama batidos.

Así que el sonido tiene el conjunto completo, y la vieja física clásica de ondas explica cada parte de ello.

## Por qué importa el tamaño

Lo que ves depende mucho del tamaño de la onda. Un tono de 100 Hz en el aire tiene una longitud de onda de unos 3,4 metros, un tono de 10 kHz de unos 3,4 centímetros. Ese es el tamaño de puertas, habitaciones, muebles y personas. Así que el sonido se curva alrededor de nuestro mundo cotidiano todo el tiempo, y oímos cosas que no podemos ver.

La luz visible tiene longitudes de onda de unos 400 a 700 nanómetros. Para hacer que la luz se curve e interfiera necesitas rendijas diminutas hechas con mucha precisión, y por eso la luz no dobla las esquinas en la vida diaria. Los electrones también tienen una longitud de onda, y en los experimentos habituales es más o menos del tamaño del espacio entre átomos en un cristal.

Así que el mismo comportamiento ondulatorio aparece en escalas completamente diferentes. El sonido lo hace en un salón, los electrones lo hacen a la escala de los átomos. Eso por sí solo no te dice nada sobre cuántico o no cuántico. Es solo longitud de onda.

## La doble rendija con dos altavoces

Realmente puedes hacer la doble rendija con sonido, y es una demostración clásica en el aula. Una forma es una pared con dos aberturas. La forma más fácil es dos altavoces alimentados por el mismo generador de señal, así ambos reproducen el mismo tono al mismo tiempo. Un montaje típico los coloca a medio metro de distancia y reproduce algo alrededor de 2.000 Hz.

Luego caminas lentamente por la habitación frente a ellos. Oyes puntos fuertes y puntos suaves, uno tras otro. Esas son las mismas franjas brillantes y oscuras que Thomas Young vio con la luz, y la gente las llama franjas de Young para el sonido. Con un micrófono y un medidor puedes mapear el patrón exactamente. Justo en el medio, a la misma distancia de ambos altavoces, suena fuerte.

En una habitación normal se complica, porque las paredes reflejan el sonido y añaden más ondas encima. Afuera o en una habitación insonorizada funciona mejor. Y casi nunca obtienes silencio perfecto en los puntos suaves, porque las dos ondas no llegan con exactamente la misma fuerza.

## La doble rendija con electrones

Ahora la versión cuántica. Una fuente envía fotones individuales o electrones individuales, uno a la vez, hacia una pared con dos rendijas estrechas. Detrás hay una pantalla que registra dónde cae cada uno.

Cada electrón individual llega como un punto en un lugar. Pero cuando envías muchos de ellos, mantienes ambas rendijas abiertas y no compruebas qué rendija usaron, los puntos lentamente forman franjas. Es el mismo tipo de patrón de interferencia que con el sonido. Y no pueden estar interfiriendo entre sí, porque vienen de uno en uno. Cada electrón de alguna manera pasa por ambos caminos como una onda y aterriza como una partícula.

Luego pones un detector en las rendijas para averiguar qué camino tomó cada electrón. Las franjas desaparecen. Obtienes dos bandas simples detrás de las dos rendijas, como obtendrías disparando bolitas a través de ellas.

## Dos tipos de onda

Aquí es donde entendí que la doble rendija es una prueba para ondas y no una prueba para lo cuántico. Young lo hizo con luz a principios del siglo XIX para mostrar que la luz es una onda, mucho antes de que alguien hablara de física cuántica. El sonido, el agua y la luz todos hacen ese patrón de franjas. Si ves franjas, aprendiste que algo es ondulatorio, y eso es todo lo que aprendiste.

La verdadera diferencia es qué está ondeando. En el experimento del sonido es la presión del aire, algo físico que puedes medir en cada punto. El volumen en un punto es simplemente la suma de las dos ondas. En el experimento cuántico la onda es la función de onda, y no es una cosa física moviéndose a través de un medio. Es una amplitud de probabilidad. Te dice qué tan probable es encontrar el electrón en un punto determinado. La regla para eso se llama la regla de Born, y dice que tomas el tamaño de la onda en un punto y lo elevas al cuadrado, y eso te da la probabilidad. Las franjas vienen de las amplitudes de los dos caminos sumándose, y solo aparecen después de muchos impactos individuales.

La función de onda en sí cambia suave y predeciblemente mientras nadie mida, siguiendo la ecuación de Schrödinger. Pero dónde aterriza un electrón individual es aleatorio. Los experimentos que rompen las llamadas desigualdades de Bell sugieren que esta aleatoriedad es real y no solo conocimiento faltante, así que no hay detalles locales ocultos que simplemente no hayamos encontrado todavía.

## Mirar cambia a un electrón, no a un sonido

Supongamos que intentas averiguar por cuál rendija pasó el sonido. Colocas un micrófono cerca de una rendija. El micrófono toma algo de energía de la onda y dispersa un poco de ella, y el patrón detrás cambia un poco. Pero el sonido sigue siendo una onda sonora. Más lejos todavía interfiere, y nada de su naturaleza cambió.

Es como comprobar la presión de un neumático. Algo de aire siempre escapa, así que cambias lo que mides. Ese también es un efecto del observador, pero uno clásico y aburrido. Puedes calcularlo, y con un instrumento mejor puedes hacerlo más pequeño.

Con el electrón es diferente. Tan pronto como obtienes la información de qué camino tomó, las franjas desaparecen por completo. Esto no es un detector torpe que empuja al electrón demasiado fuerte. Está ligado a la información en sí. El principio de incertidumbre de Heisenberg pone un límite estricto sobre qué tan precisamente puedes conocer algunos pares de cosas al mismo tiempo, como la posición y el momento. En la física cuántica hay una perturbación mínima que no puedes eliminar mediante ingeniería.

## El problema de la medición

La física cuántica tiene dos reglas para cómo cambia un estado, y no encajan entre sí. Cuando nadie mide, la función de onda evoluciona suavemente, podrías hacerla retroceder, y las superposiciones siguen siendo superposiciones. Cuando mides, obtienes un resultado, elegido al azar con las probabilidades de la regla de Born, y el estado salta para coincidir con ese resultado. La gente llama a eso el colapso. Es repentino y no se puede deshacer.

La ecuación de Schrödinger no contiene el colapso, y el colapso rompe sus reglas. La teoría tampoco dice qué cuenta como una medición, o dónde termina el sistema cuántico y empieza el dispositivo de medición. Esa brecha es el problema de la medición, y los físicos todavía discuten al respecto. La visión de Copenhague toma el colapso como una regla. Muchos Mundos dice que no hay colapso en absoluto. La mecánica bohmiana añade variables ocultas. Las teorías de colapso objetivo como GRW hacen que el colapso sea un proceso físico real.

La decoherencia explica parte de esto. Un sistema cuántico toca su entorno todo el tiempo, moléculas de aire y luz y todo lo demás, y se entrelaza con él. Visto solo desde el sistema, la interferencia se desvanece rápido y empieza a parecer clásico. Esa es una gran parte de por qué nunca vemos cosas grandes en dos lugares a la vez. Pero la decoherencia no explica por qué obtienes este resultado y no el otro.

El sonido no tiene nada parecido a esto. Una onda sonora tiene propiedades definidas todo el tiempo, y medir solo las revela, quizás con una pequeña perturbación.

## El observador no es una mente

La palabra observador confunde a mucha gente. Las historias populares la convirtieron en la idea de que la conciencia crea la realidad, que el electrón decide porque un humano mira. Algunas discusiones tempranas en torno a von Neumann y Wigner presionaron en esa dirección. Pero la física no necesita a una persona. El observador es cualquier sistema físico que interactúa con el electrón y extrae la información de qué camino tomó. Un detector en una habitación vacía lo hace, y el entorno también lo hace.

Creo que interacción de medición sería una palabra mejor que observador. Es un proceso físico, no uno mental, y la vieja palabra sigue alimentando un montón de tonterías esotéricas sobre la física cuántica.

## Fonones, el cuanto de sonido

Hay un lugar donde el sonido realmente se vuelve cuántico, y es dentro de los sólidos. En un cristal, los átomos se sientan en una cuadrícula y vibran juntos. La física cuántica dice que esta energía de vibración viene en pequeños paquetes fijos, y un paquete se llama fonón. El nombre viene de la palabra griega para sonido. Un fonón es para el sonido en un cristal lo que un fotón es para la luz. No es una partícula básica como un electrón, es una cuasipartícula, una vibración compartida de muchos átomos. Las ondas de fonón largas son solo las ondas sonoras ordinarias en ese sólido.

Y los fonones hacen las verdaderas cosas cuánticas. Los investigadores hicieron fonones individuales, los pusieron en superposición, mostraron interferencia entre caminos de fonones, entrelazaron fonones e incluso ejecutaron un borrador cuántico con ellos. Para eso acoplan los fonones a qubits superconductores en un chip y enfrían todo a temperaturas criogénicas, para que las vibraciones de calor aleatorias no eliminen el efecto.

Así que sí, el sonido puede ser cuántico. Pero solo como fonones, en un sólido, en un laboratorio, en un frío extremo. El sonido en el aire de tu sala de estar es una onda de presión clásica, y la física clásica lo describe casi a la perfección. Los fonones podrían seguir siendo importantes más adelante, como una forma de almacenar información cuántica y moverla entre circuitos superconductores y luz.

## Por qué los altavoces no pueden construir una computadora cuántica

Lo siguiente que me pregunté fue por qué nadie construye una computadora con altavoces, si una computadora cuántica funciona con superposición e interferencia y el sonido tiene ambas.

La respuesta es el tamaño del espacio en el que trabaja la máquina. Con n qubits, una computadora cuántica funciona en un espacio de 2 elevado a la n estados, así que cada qubit extra lo duplica. La superposición le permite usar todo ese espacio, y el entrelazamiento vincula los qubits entre sí. Muchos algoritmos cuánticos necesitan ese enlace.

Las ondas clásicas pueden sumarse, y puedes mezclar muchas frecuencias en un sonido. Pero para obtener exponencialmente muchos estados de un sistema de ondas clásico, necesitarías exponencialmente más de algo físico, como frecuencias más y más altas o más y más energía. Añadir altavoces solo lo hace crecer lentamente. Las ondas clásicas tampoco tienen entrelazamiento entre partes separadas ni interferencia de amplitudes de probabilidad. Y la corrección de errores cuánticos depende de propiedades cuánticas y mediciones que un sistema de sonido clásico simplemente no tiene.

## Lo que saco de esto

El sonido es una excelente manera de sentir qué es la interferencia. Puedes caminar por una habitación y escuchar las franjas. Pero la doble rendija con sonido solo demuestra que el sonido es una onda. La parte cuántica es otra cosa. Es que un electrón individual interfiere consigo mismo, que el patrón se construye a partir de impactos individuales aleatorios, que comprobar el camino mata el patrón, y que nadie puede explicar completamente cómo una medición elige un resultado.

| | Sonido en el aire | Electrón o fotón |
|---|---|---|
| Qué está ondulando | presión del aire | amplitud de probabilidad |
| Necesita un medio | sí | no |
| Interferencia | sí | sí |
| Llega como puntos individuales | no | sí |
| Dónde aterriza un impacto | predecible | aleatorio |
| Comprobar el camino | pequeña perturbación | el patrón desaparece |
| Entrelazamiento | no | sí |

Así que mi respuesta honesta a mi propia pregunta es que las ondas sonoras pueden copiar la apariencia de la física cuántica, las franjas y las ondas, pero no lo que sucede dentro. Donde el sonido realmente se vuelve cuántico, como fonones en un cristal frío, sigue todas las extrañas reglas cuánticas, incluido el problema de la medición. La matemática de las ondas es un lenguaje compartido para ambos, pero describe dos cosas muy diferentes.
