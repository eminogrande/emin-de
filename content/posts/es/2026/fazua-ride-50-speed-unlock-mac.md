---
title: "Desbloqueo de velocidad del Fazua Ride 50 desde un Mac, sin caja"
description: "Cómo mi agente y yo subimos el límite de velocidad de un Fazua Ride 50 Evation de 25 a 55 y luego 69.77 km/h por USB desde un MacBook, con firmware 2.04 y una herramienta de código abierto."
date: "2026-10-16"
updated: "2026-10-18"
lang: es
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
tldr: ["El Fazua Ride 50 guarda su límite de 25 km/h como un solo valor en el drivepack. Con el firmware 2.04 puedes cambiarlo por USB.", "Lo hice desde un MacBook Pro M4. La herramienta de código abierto era solo para Windows, así que mi agente cambió su capa USB por hidapi.", "El firmware 2.50 tuvo que volver primero a 2.04, a través del FAZUA Toolbox oficial. El archivo 2.04 es el original de fazua.com.", "Lectura de vuelta después de escribir, primero 55,01 km/h, dos días después valor raw 1938, eso son 69,77 km/h. Si estás en Berlín, te ayudo a desbloquear el tuyo gratis."]
sections: [{"basically": "Una Canyon Roadlite:ON de 2020 con un Fazua Ride 50 Evation, y una caja de tuning que no paraba de parpadear en amarillo."}, {"basically": "La caja le miente al sensor de velocidad. El software simplemente cambia el límite contra el que el motor comprueba."}, {"basically": "Mi bici, mi MacBook, un cable mini USB, un destornillador T10, el FAZUA Toolbox y unas 75 líneas de Python."}, {"basically": "Drivepack fuera, batería puesta, tapa del USB quitada, cable dentro. El Mac lo ve como evation v2.50."}, {"basically": "Primero solo leer. El mío decía 24,98 km/h y una rueda de 2121 mm. Ese archivo es también la copia de seguridad."}, {"basically": "En el FAZUA Toolbox elige Manual, no Online, selecciona el archivo 2.04 y deja que flashee y calibre."}, {"basically": "Un comando escribe el nuevo límite, la bici lo confirma, y una segunda lectura muestra 55,01 km/h."}, {"basically": "Los LED blancos parpadeando por turnos es el mando actualizándose. Déjalo en paz hasta que se ponga verde."}, {"basically": "Un clic equivocado, dos escrituras abortadas, y una luz roja que solo era un drivepack mal asentado."}, {"basically": "El límite es el mismo en cada modo. La autonomía no. Un comando lo devuelve a 25."}, {"basically": "Dos días después pasé al valor raw 1938, el año de nacimiento de mi padre. Eso son 69,77 km/h."}, {"basically": "Si estás en Berlín y quieres desbloquear tu Fazua Ride 50, escríbeme. Es gratis."}]
---
## La bici y el problema

Mi bici es una Canyon Roadlite:ON AL 7.0 de 2020, talla M, gris pace y naranja. El motor es un Fazua Evation, que Fazua hoy llama Ride 50 Evation. El drivepack, motor y batería en una sola pieza larga, va en el tubo diagonal y sale con una palanca. La batería es una Energy 250, el mando táctil va integrado en el cuadro. No hay pantalla en el manillar, así que la bici nunca te dice a qué velocidad vas.

Antes de esto mi drivepack corría el firmware 2.50 y la batería el firmware 1.15. Eso solo lo sé porque lo leí con el FAZUA Toolbox, ver abajo.

La asistencia se corta a 25 km/h, como en cada pedelec de la UE. Quería ver cómo se siente la bici con más. Así que el 7 de octubre compré una Badass Box 4 para Fazua. Escribí sobre ello en [Badass Box 4 en una Fazua Ride 50, la luz amarilla](/posts/badass-box-4-fazua-ride-50-yellow-light). Funcionó uno o dos minutos, luego el LED superior parpadeó amarillo otra vez. Iman más cerca, otro radio, girado 90 grados, el soporte de Badass dijo que la instalación se ve bien. Aún amarillo tras unos minutos de pedaleo.

## La idea, cambiar un número en vez de engañar al sensor

La Badass Box va en el sensor de velocidad en la vaina y cambia los pulsos del imán del radio, para que el motor crea que vas más lento de lo que vas. Eso es un truco sobre la señal, y en mi bici Fazua lo notó al rato y marcó un fallo leve.

El motor en sí solo compara tu velocidad con un valor guardado. Fazua lo llama bikeMaxSpeed. Los distribuidores pueden verlo en el Toolbox, pero para usuarios normales está en gris. Si cambias ese valor, no hay nada que engañar. El sensor reporta la velocidad real y el motor simplemente ayuda más tiempo.

Mi agente encontró dos formas de hacerlo. La empresa italiana Eplus vende Flash Home por 134 euros más IVA, solo Windows. Y está FazuaUnlocker en GitHub por quezzas, gratis, licencia MIT, también solo Windows. Ambos dicen lo mismo. Funciona en el firmware 2.04. En 2.50 primero vuelves a 2.04.

```
antes (box)                            después (software)

imán del radio -> [box] -> sensor      imán del radio -> sensor
                 |  más lento falso                    |  velocidad real
                 v                                     v
drivepack: límite 25 km/h              drivepack: límite 55 km/h
           -> amarillo tras 1-2 min             -> sin box, sin amarillo
```

## Lo que usé

1. La bici, batería completamente cargada.
2. Un MacBook Pro M4, 16 GB, macOS 15.5. Corre en Apple Silicon, sin Windows, sin máquina virtual.
3. Un cable mini USB de datos. No un cable solo de carga.
4. Un destornillador Torx T10 para la tapa USB.
5. FAZUA Toolbox 2.29 basic para macOS en Apple Silicon, de la web de Fazua.
6. Firmware 2.04, archivo evation_Software_2.04.bin. El enlace original de fazua.com ya no está, pero el Internet Archive lo guardó el 9 de julio de 2022. SHA-256 8fe885c9dfc7caa9cf8e61b88051bf8d42da53747c4fd86d2b72c3c2ef23d32e. Mi agente lo comparó con la copia que circula en GitHub, y son idénticos al byte.
7. Mi fork de FazuaUnlocker, [github.com/eminogrande/FazuaUnlocker](https://github.com/eminogrande/FazuaUnlocker), con Python 3.9 y la librería hidapi.

La herramienta original habla con el drivepack a través de las funciones USB de Windows. Mi agente dejó el protocolo, el checksum y la lógica de escritura exactamente como están y solo reemplazó esa capa con hidapi, que también corre en macOS. Ese es el archivo fazua_mac.py, unas 75 líneas. El firmware en sí está cifrado, así que nadie aquí cambia el firmware. La herramienta solo cambia un ajuste.

## Paso 1, conectar el drivepack al Mac

1. Saca el drivepack de la bici. La batería se queda dentro del drivepack y tiene que estar encendida.
2. Desatornilla la tapa USB del drivepack con el T10. Está abajo cerca de las aletas de refrigeración.
3. Conecta el cable mini USB al Mac y pon el drivepack plano en el suelo o una mesa.
4. Comprueba que el Mac lo ve. En la terminal `system_profiler SPUSBDataType | grep evation` me mostró `evation v2.50`. Para la herramienta es un dispositivo USB HID con ID 10C4:1001.

Fazua dice en su propia guía que solo necesitas el drivepack para una actualización de firmware, no la bici entera. La rueda no necesita girar para nada de esto.

## Paso 2, lee antes de escribir

Cierra primero el FAZUA Toolbox, porque mantiene la conexión USB. Luego:

```sh
git clone https://github.com/eminogrande/FazuaUnlocker.git
cd FazuaUnlocker
python3 -m venv .venv && .venv/bin/pip install -r requirements-mac.txt
.venv/bin/python fazua_mac.py --read-only
```

El mío respondió tras unos 110 ms. Max Bike Speed 24.98 km/h, valor raw 694. Longitud de rueda 2121 mm. Shaft offset 30533. La herramienta deriva una pequeña clave de escritura de ese offset, la mía era ba88. Mi agente guardó esta lectura como archivo JSON, así siempre puedo volver a exactamente estos valores.

Luego una prueba en seco, que construye el paquete de escritura con checksum pero no envía nada:

```sh
.venv/bin/python fazua_mac.py 55 --dry-run
```

## Paso 3, downgrade a 2.04

Esta es la parte con riesgo real. Si el flash se interrumpe, el drivepack puede quedar muerto. Así que batería llena, cable fijo, drivepack quieto.

1. Abre el FAZUA Toolbox, ve a FIRMWARE UPDATE, haz clic en UPDATE NOW.
2. Elige Manual. No Online, porque Online instala la versión más nueva otra vez.
3. Elige evation_Software_2.04.bin y comprueba el nombre del archivo antes de pulsar START.
4. Espera. Tras el flash el motor calibra y puede vibrar un poco. No muevas el drivepack.
5. Comprueba otra vez con system_profiler. El mío ahora decía `evation v2.04`.

Leer otra vez tras el downgrade seguía mostrando 24.98 km/h. El cambio de firmware por sí solo no desbloquea nada.

## Paso 4, escribir 55 km/h

```sh
.venv/bin/python fazua_mac.py 55 --force
```

La herramienta mostró el cambio de 24.98 km/h, raw 694, a 55.00 km/h, raw 1528. Luego "Write cycle acknowledged by bike", luego leyó el valor de vuelta por sí misma. "SUCCESS: bikeMaxSpeed is now 55.01 km/h". Una lectura separada unos segundos después dijo lo mismo, longitud de rueda aún 2121 mm.

La herramienta acepta de 5 a 75 km/h. Elegí 55 porque quiero ver cómo es. Mi agente sugirió 45, porque el motor no tiene potencia infinita y por encima de cierta velocidad la mayor parte viene de tus piernas de todos modos. Pongas lo que pongas, el motor solo ayuda más tiempo, no hace la bici más rápida por sí solo.

## Paso 5, de vuelta a la bici

1. Desconecta el cable, atornilla la tapa USB de vuelta a mano, 1 a 1.5 Nm. Sin la tapa el drivepack no es impermeable.
2. Mete el drivepack en la bici hasta que haga clic.
3. Enciende.

En mi bici el mando luego parpadeó en blanco, dos LEDs arriba y dos abajo, por turnos. Eso parece un error. No lo es. Fazua escribe en su guía de actualización "Flashing LEDs indicates an update of the remote. Do not touch the remote during the update and do not switch off the e-bike." El drivepack pone el mando a su propio nivel de firmware. El mío se apagó una vez, volvió, y luego todo estaba verde.

Luego lo probé. Parece funcionar. Aún no tengo velocidad máxima exacta, porque la bici no tiene pantalla. La próxima vez un teléfono con velocímetro GPS va en el manillar.

## Qué salió mal en el camino

Mi agente hizo clic por sí solo en el Toolbox en el Mac, y el primer clic le dio a CALIBRATION en lugar de FIRMWARE UPDATE. Solo abrió la página, no empezó nada. Luego el clic en Manual no llegó, porque los clics enviados en segundo plano no alcanzaban ese diálogo. Mi agente se detuvo ahí, porque un clic equivocado en START habría instalado 2.50 otra vez. Hice clic en Manual y elegí el archivo yo mismo.

Los dos primeros intentos de escritura se abortaron. La herramienta pide un sí antes de escribir, y la forma en que mi agente enviaba las respuestas no llegaba a esa pregunta. No se escribió nada, la lectura posterior seguía mostrando 24,98 km/h. Con --force funcionó.

Más tarde saqué el drivepack otra vez, cerré la tapa USB y moví el imán, y entonces el LED superior estaba rojo. Rojo no es el imán. El manual de Fazua dice que rojo arriba significa un error de conexión entre el drivepack y la caja del pedalier, la pieza del cuadro donde se enchufa. Lo saqué, revisé los contactos, lo empujé de nuevo hasta que hizo clic, y quedó bien.

Y después de 15 minutos parado el sistema se apaga solo. Eso también es normal, está en el manual.

## Batería, modos y volver atrás

El límite es un valor en el drivepack. Verde, azul y rosa usan los mismos 55 km/h. Los modos solo cambian cuánto empuja el motor y lo rápido que se vacía la batería. Ir más rápido cuesta mucha más energía, así que por encima de 25 la autonomía cae rápido.

Con el firmware 2.04 la batería también se queda despierta más tiempo después de montar. En la 2.50 Fazua había recortado ese standby a entre una y tres horas, en el firmware más viejo llega hasta ocho. Así que después de montar mantengo el botón de la batería dos segundos hasta que los LEDs se apagan.

Volver a stock es un comando con el cable conectado:

```sh
.venv/bin/python fazua_mac.py 25 --force
```

Eplus escribe que se puede actualizar a 2.50 otra vez después de desbloquear. No lo he probado, así que por ahora me quedo en 2.04 y no pulso actualizar ni en el Toolbox ni en la app.

Por encima de 25 km/h la bici ya no es un pedelec. En Alemania entonces solo está permitida en terreno privado, no en vías públicas, y la garantía y el seguro pueden desaparecer. Flashear firmware puede romper el drivepack. Todo lo que hay aquí es bajo tu propio riesgo.

## Actualización, valor raw 1938

Dos días después la batería volvió a estar en el Mac y quería subir más. Primero pedí 69.69 km/h. Eso no existe exactamente. El drivepack no guarda km/h, guarda un número entero, el valor raw, y km/h es valor raw por 0.036. Así que 69.69 se convirtió en raw 1936, que es 69.70 km/h.

Luego elegí el valor raw 1938, porque 1938 es el año en que nació mi padre. 1938 por 0.036 es 69.768, la herramienta muestra 69.77 km/h. Es el mismo tipo de número que antes. 55.01 también era solo redondeo, 1528 por 0.036 es 55.008.

Los pasos fueron los mismos que en el paso 2 y el paso 4. Primero solo leer, seguía diciendo 55.01 km/h, raw 1528, rueda 2121 mm. Luego una prueba en seco. En el paquete solo cambiaron los dos bytes de velocidad, todo lo demás quedó igual. Luego:

```sh
.venv/bin/python fazua_mac.py 69.768 --force
```

Mi agente tecleó 69.768 con tres decimales solo para que la herramienta caiga exactamente en 1938. A la bici le envía el número entero. "Write cycle acknowledged by bike", luego "SUCCESS: bikeMaxSpeed is now 69.77 km/h". Una lectura separada después mostró raw 1938, longitud de rueda 2121 mm, nada más cambió.

El ajuste parece funcionar. Sigo sin velocidad máxima medida. 69.77 km/h es el corte de asistencia configurado, no una velocidad medida ni una velocidad que la bici alcanza por sí sola.

Volver a 55 es `.venv/bin/python fazua_mac.py 55.008 --force`, que da raw 1528 otra vez.

## Ayuda gratis en Berlín

Si estás en Berlín y quieres desbloquear tu Fazua Ride 50 de la misma forma, escríbeme a [emin@emin.de](mailto:emin@emin.de). Lo hago gratis. Otra vez, por encima de 25 km/h es solo para terreno privado, y lo haces bajo tu propio riesgo.
