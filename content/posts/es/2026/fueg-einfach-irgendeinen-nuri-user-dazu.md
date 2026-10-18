---
title: "Simplemente añade cualquier usuario de Nuri"
description: "Referral, Guardian, herencia, Multisig y ahorro conjunto serán una función en Nuri. Añades un nombre de usuario en los ajustes, el resto se sigue de ahí."
date: "2026-10-18"
updated: "2026-10-18"
lang: es
translated_from: "de/fueg-einfach-irgendeinen-nuri-user-dazu"
source_sections: ["ein-feature-statt-fünf", "die-fee-wird-geteilt", "meine-mama-kriegt-17-satoshi", "expanding-statt-decaying-multisig", "guardian-und-erbe", "die-fee-liegt-im-frontend", "setz-deine-fee-selbst", "jeder-call-ist-eine-kleine-zahlung", "familienwallet-und-hardware-wallets", "der-erste-schritt"]
category: nuri
format: essay
author: emin
provenance: transcript
ai_assisted: true
reviewed_by_human: false
image: "/media/fueg-einfach-irgendeinen-nuri-user-dazu/cover.png"
tags: ["Nuri", "Multisig", "Referral", "Inheritance", "x402", "L402"]
tldr: ["Mi idea para Nuri es una única función. Añades en los ajustes el nombre de usuario de alguien.", "De ahí se siguen Referral, Guardian, herencia, Multisig y ahorro conjunto, según lo que permitas.", "La fee está en nuestro frontend, abierta en el código fuente, y la pones tú mismo entre 0 y 10 por ciento."]
sections: [{"basically": "En Nuri, Referral, Guardian, herencia y Multisig serán una función. Añades un nombre de usuario en los ajustes."}, {"basically": "Quien añade un amigo en Nuri, comparte la fee con él. Con 10 personas se divide entre 10."}, {"basically": "Cada pago envía a tu gente unos pocos satoshis y una notificación push. Eso hace a Nuri viral."}, {"basically": "En un Expanding Multisig, las keys de tus Guardians solo se activan cuando has perdido las tuyas."}, {"basically": "Un Guardian te ayuda a recuperar tu key. Un heredero solo accede cuando no haces nada durante un año."}, {"basically": "Nuri no cobra la fee a los proveedores, sino en su propio frontend, abierto en el código fuente."}, {"basically": "En Nuri pones tu fee tú mismo, de 0 a 10 por ciento. En mis fiestas, las donaciones trajeron el quíntuple."}, {"basically": "Cada llamada API en Nuri será un pequeño pago x402 o L402. Con eso el problema de la fee está resuelto."}, {"basically": "Nadie entiende Multisig. Tres personas y una hardware wallet lo entiende cualquiera. Así explicamos Nuri."}, {"basically": "El paso uno en Nuri es solo un amigo en los ajustes que gana contigo. Todo lo demás se construye sobre eso."}]
---
Creo que esta mañana he resuelto algo bastante bueno. Se trata de un feature para Nuri. Esa es la idea, para empezar.

## Un feature en lugar de cinco

Quiero meter Multisig, Guardians, Inheritance y Referral en un solo feature. Y funciona así. Simplemente añado tu username en los settings de mi app. Nada más.

En el momento en que hago eso, recibes el 50 por ciento de las fees que pago a Nuri. Al mismo tiempo puedes ser mi Guardian. Eso significa que me ayudas con tu passkey a recuperar mi cuenta en el futuro. También puedes entrar en la wallet como co-signer. O somos una empresa y queremos tener una multisig wallet juntos.

Todos estos son features diferentes. Pero todos se basan en el mismo feature de frontend. Simplemente añade cualquier usuario de Nuri.

## La fee se divide

Las fees que pago a Nuri las fijamos de momento en algo así como 2,1 por ciento. Cada vez que hago un pago, la mitad va a Nuri y la otra mitad a la persona que he añadido.

También puedes añadir 10 usernames. Entonces tienes una wallet con 10 personas, y las fees se dividen entre 10. Todas tus nuevas personas reciben automáticamente un cut, y Nuri recibe una décima parte.

Por supuesto, uno podría añadirse mutuamente, entonces volvería a mí. Tenemos que vigilar no construir un loop ahí. Eso obviamente no puede ser.

## Mi mamá recibe 17 satoshis

Los bitcoiners quieren que otras personas se conviertan en bitcoiners. Ahora puedo invitar a mi mamá. Y ella recibe una push notification cada vez que hago un pago. Acabas de recibir 20 satoshis. Acabas de recibir 17 satoshis.

Lo conozco por mí mismo. En otro servicio recibo un mensaje de Telegram cada vez que ocurre un swap, y ahí dice que acabo de ganar 10 satoshis. Es lo más viral que he experimentado para mí mismo. Es divertido, y uno se da un poco de dinero mutuamente.

Con Arkade también podemos enviar 1, 2, 3, 4 o 5 satoshis sin fee. Y eso también muestra un poco lo genial que es Arkade en ese punto.

## Expanding en lugar de Decaying Multisig

Las keys que añadimos hacen lo contrario de lo que normalmente hacemos en Nuri. Si no queremos que sean signers desde el principio, entonces no es un Decaying Multisig, sino un Expanding Multisig.

Eso significa que si pierdo todas mis keys, las keys de mis Guardians se activan automáticamente después de un tiempo, un año o así. Con Bitcoin se puede hacer. Con Ethereum probablemente será más difícil, pero seguro que también se puede.

Y claro, esos son settings que se pueden configurar. Nadie debería poder acceder a tu dinero solo porque no has movido tus bitcoin durante un año.

## Guardian y herencia

Guardian es un feature. Ahí me gustaría hacerlo exactamente igual que Bitkey. Ellos lo han construido de tal manera que tus Guardians pueden ayudarte a recuperar tu key, pero no tienen acceso a tu dinero. Cómo exactamente lo han hecho, todavía tenemos que mirarlo.

El otro feature es Inheritance, y eso es extremadamente importante. Por ejemplo, quiero registrar a mi hermana como heredera. Cada vez que hago un pago, un counter se resetea a cero. Y si me pasara algo, por la razón que sea, no me despierto al día siguiente, entonces ella se activa automáticamente después de un año y tiene acceso a mis funds. Algo así es exageradamente importante y exageradamente cool.

## La fee está en el frontend

Mucho más importante es dónde está la fee. Hoy la tomamos de los providers, y eso es un error. Deberíamos poner la fee en los providers a cero en todas partes y tomarla nosotros, en el frontend o en nuestro backend. Detrás de Nuri pueden haber diez millones de providers, completamente igual. Ellos toman su spread y su fee, y nosotros no añadimos nada encima.

Así podemos distinguir entre Nuri fee y partner fee. Eso es simplemente limpio. Y quiero mostrarle a la gente en el código open source, mira, aquí está la fee, está en el source code. Quiero que seamos la empresa más transparente del mundo.

Mi historia favorita para esto es el escándalo en la comunidad de Aave, cuando en segundo plano se cambió el swap provider. Ahí se ve que los backends ya no tienen poder, sino los frontends. Quien tiene los usuarios, tiene el moat.

## Fija tu fee tú mismo

Incluso dejamos que la gente fije la fee ellos mismos. Simplemente por justicia. Si no quieres pagar fees, puedes ir a 0 por ciento. Pero también puedes ir a 10 por ciento, si quieres. Y si alguien pregunta, por qué cobran 2 por ciento, entonces decimos, ve a los settings y cámbialo.

Por qué creo que esto funciona, viene de mis fiestas en Berlín. No importa qué entrada cobraba y no importa qué precio por la cerveza, a la gente nunca le parecía cool. En algún momento dijimos, fuck it, donación para la cerveza, donación para la entrada. Ganamos aproximadamente cinco veces más dinero.

Cuando le das a la gente la posibilidad de fijarlo ellos mismos, también hay gente que lo pone significativamente más alto. Porque les encanta la gamification o porque están en la misión. Están los ricos y los pobres, los tacaños y los otros. Yo pondría mi fee al 10 por ciento para personas que conozco en una conferencia y añado a mi cuenta. Entonces ellos reciben automáticamente mi split.

## Cada call es un pequeño pago

Tengo una idea aún mejor de cómo tomar la fee. Simplemente gateamos la Nuri API con micropayments, y los micropayments son nuestras fees. Cada operación en la app cuesta entonces un pequeño pago x402 o L402. L402, si tiene que ver con Bitcoin, x402, si tiene que ver con crypto.

Un ejemplo. Guardar o leer una nueva contraseña en tu Nuri password manager cuesta 0,1 centavos o 1 centavo. Y eso lo podemos tomar directamente de la wallet, porque es agentic. Con el router ya lo hago así. Lo puedes usar con un token o pagas por los calls, y podemos darle a cada endpoint un precio diferente.

Entonces no tienes que construir un sistema de fees propio. Cualquiera puede integrar nuestra API donde quiera, y recibimos automáticamente los payments. Empezaría con la libreta de contactos, 0,1 centavos cada vez que añades un contacto. Si eso funciona, lo expandimos a toda la app. Un feature at a time.

## Familienwallet y hardware wallets

Cuando la gente ha experimentado una vez cómo funciona una Safe wallet como la que tenemos como empresa, les parece realmente cool. Yo tengo una llave, y tenemos que estar juntos. Esa es una crypto experience realmente genial.

O una familienwallet. Mi mamá, mi hermana y yo. Dos de nosotros pueden estar juntos. Multisig nadie se lo puede imaginar. Pero decir, somos tres personas y una hardware wallet, o somos cinco personas y una AI, eso lo entiende todo el mundo.

Y nos mantenemos en el principio que nadie más logra. One click face ID wallet. Seedless, sin seed phrase, phishing resistant, multisig by default.

## El primer paso

Nos acercamos muy despacio. El primer paso es solo que yo pueda añadir a un amigo como mi Padawan en los ajustes y que luego reciba algo automáticamente. Luego vemos en nuestra base de datos quién ha añadido a quién y qué swaps han ocurrido, y pagamos los referrals.

Y si envías algo, deberíamos tener un autocompletado de todos los usuarios de Nuri. No solo tus contactos, sino simplemente todo el mundo. Tecleo L y encuentro a toda la gente con L, igual que en PayPal.

Más tarde vienen la rotación de claves, añadir y eliminar keys y una hardware wallet. Todo eso tenemos que hacerlo de todas formas. Pero desde la visión, creo que es absolutamente perfecto. Porque es una función tan brutalmente viral que puedes ganar junto con el otro o ser su co-signer.
