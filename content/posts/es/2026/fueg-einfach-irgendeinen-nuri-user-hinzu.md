---
title: "Simplemente añade a cualquier usuario de Nuri"
description: "Referral, Guardian, herencia, Multisig y ahorro conjunto serán una función en Nuri. Añades un nombre de usuario en los ajustes, el resto viene solo."
date: "2026-10-18"
updated: "2026-10-18"
lang: es
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
tldr: ["Mi idea para Nuri es una sola función. Añades en los ajustes el nombre de usuario de alguien.", "De ahí salen Referral, Guardian, herencia, Multisig y ahorro conjunto, según lo que permitas.", "La comisión está en nuestro frontend, abierta en el código fuente, y la pones tú mismo entre 0 y 21 por ciento."]
sections: [{"basically": "En Nuri, Referral, Guardian, herencia y Multisig serán una función. Añades un nombre de usuario en los ajustes."}, {"basically": "Quien añade a un amigo en Nuri, comparte la comisión con él. Con 10 personas, se divide entre 10."}, {"basically": "Cada pago manda unos pocos satoshis a tu gente y una notificación push. Eso hace que Nuri se vuelva viral."}, {"basically": "En un Expanding Multisig, las keys de tus Guardians solo se activan cuando has perdido las tuyas."}, {"basically": "Un Guardian te ayuda a recuperar tu key. Un heredero solo entra cuando no has hecho nada durante un año."}, {"basically": "Nuri no cobra la comisión en los proveedores, sino en su propio frontend, abierto en el código fuente."}, {"basically": "En Nuri pones tu comisión tú mismo, de 0 a 21 por ciento. En mis fiestas, las donaciones trajeron el quíntuple."}, {"basically": "Cada llamada a la API en Nuri será un pequeño pago x402 o L402. Con eso el problema de la comisión está resuelto."}, {"basically": "Multisig no lo entiende nadie. Tres personas y una hardware wallet lo entiende todo el mundo. Así explicamos Nuri."}, {"basically": "El primer paso en Nuri es solo un amigo en los ajustes, que gana contigo. Todo lo demás se construye sobre eso."}]
---
Creo que esta mañana he resuelto algo bastante bueno. Es una funcionalidad para Nuri. Por ahora es solo la idea.

## Una funcionalidad en vez de cinco

Quiero meter Multisig, Guardians, Inheritance y Referral en una sola funcionalidad. Y funciona así. En mi app, en los Settings, simplemente añado tu username. Nada más.

En el momento en que hago eso, tú recibes el 50 por ciento de las fees que yo pago a Nuri. Al mismo tiempo puedes ser mi Guardian. Eso significa que me ayudas con tu passkey a recuperar mi cuenta en el futuro. También puedes entrar en la wallet como co-firmante. O somos una empresa y queremos tener una wallet Multisig juntos.

Todo eso son funcionalidades distintas. Pero todas se basan en la misma funcionalidad de frontend. Simplemente añade a cualquier usuario de Nuri.

## La fee se divide

Las fees que yo pago a Nuri las fijamos de momento en, digamos, un 2,1 por ciento. Cada vez que hago un pago, la mitad va a Nuri y la otra mitad a la persona que he añadido.

También puedes añadir 10 usernames. Entonces tienes una wallet con 10 personas y las fees se dividen entre 10. Toda tu gente nueva recibe automáticamente su parte, y Nuri se lleva una décima parte.

Por supuesto, también nos podríamos añadir mutuamente, y entonces el dinero volvería a mí. Tenemos que asegurarnos de no crear un bucle ahí. Eso obviamente no puede ser.

## Mi madre recibe 17 satoshis

Los bitcoiners quieren convertir a otras personas en bitcoiners. Ahora puedo invitar a mi madre. Y ella recibe una push notification cada vez que yo hago un pago. Acabas de recibir 20 satoshis. Acabas de recibir 17 satoshis.

Lo conozco por mí mismo. En otro servicio recibo un mensaje de Telegram cada vez que se hace un swap, y ahí dice que acabo de ganar 10 satoshis. Es lo más viral que he experimentado en mi vida. Es divertido, y así nos vamos pasando un poco de dinero unos a otros.

Con Arkade también podemos mandar 1, 2, 3, 4 o 5 satoshis sin fee. Y eso también demuestra un poco lo bueno que es Arkade en ese punto.

## Expanding en vez de Decaying Multisig

Las keys que añadimos hacen lo contrario de lo que solemos hacer en Nuri. Si no queremos que sean firmantes desde el principio, entonces no es un Decaying Multisig, sino un Expanding Multisig.

Eso significa que, si pierdo todas mis keys, las keys de mis Guardians se activan automáticamente después de un tiempo, un año más o menos. En Bitcoin se puede hacer. En Ethereum probablemente será más difícil, pero seguro que también se puede.

Y claro, son Settings que se pueden configurar. Nadie debería poder acceder a tu dinero solo porque no hayas movido tus bitcoin durante un año.

## Guardian y herencia

Guardian es una funcionalidad. Me gustaría hacerlo exactamente igual que Bitkey. Ellos lo han construido de forma que tus Guardians pueden ayudarte a recuperar tu key, pero no tienen acceso a tu dinero. Cómo lo han hecho exactamente, todavía tenemos que mirarlo.

La otra funcionalidad es Inheritance, y eso es extremadamente importante. Por ejemplo, quiero registrar a mi hermana como heredera. Cada vez que hago un pago, un contador se resetea a cero. Y si me pasara algo, por la razón que sea, no me despierto al día siguiente, entonces ella se activa automáticamente después de un año y tiene acceso a mis fondos. Algo así es increíblemente importante e increíblemente guay.

## La fee está en el frontend

Mucho más importante es dónde está la fee. Hoy la cobramos en los providers, y eso es un error. Deberíamos poner la fee en los providers a cero en todas partes y cobrarla nosotros, en el frontend o en nuestro backend. Detrás de Nuri puede haber diez millones de providers, da completamente igual. Ellos se llevan su spread y su fee, y nosotros no añadimos nada encima.

Así podemos distinguir entre fee de Nuri y fee del partner. Es simplemente limpio. Y quiero mostrarle a la gente en el código open source, mira, aquí está la fee, está en el código fuente. Quiero que seamos la empresa más transparente del mundo.

Mi historia favorita sobre esto es el escándalo en la comunidad de Aave cuando cambiaron el proveedor de swaps en segundo plano. Ahí se ve que los backends ya no tienen poder, sino los frontends. Quien tiene los usuarios tiene el moat.

## Pon tu propia fee

Incluso dejamos que la gente ponga su propia fee. Simplemente por justicia. Si no quieres pagar fees, puedes ponerlo al 0 por ciento. Pero también puedes subirlo al 21 por ciento si quieres. Y si alguien pregunta por qué cobráis un 2 por ciento, le decimos, ve a los Settings y cámbialo.

¿Por qué creo que esto funciona? Por mis fiestas en Berlín. No importaba qué entrada cobrara ni qué precio tuviera la cerveza, a la gente nunca le parecía bien. En algún momento dijimos, fuck it, donación para la cerveza, donación para la entrada. Ganamos aproximadamente cinco veces más dinero.

Cuando le das a la gente la posibilidad de decidirlo ellos mismos, también hay gente que lo pone mucho más alto. Porque les mola la gamificación o porque están por la misión. Están los ricos y los pobres, los tacaños y los demás. Yo, para la gente que conozco en una conferencia y añado a mi cuenta, pondría mi fee al 21 por ciento. Así reciben automáticamente mi parte.

## Cada llamada es un pequeño pago

Tengo una idea aún mejor de cómo cobrar la fee. Simplemente protegemos la API de Nuri con micropagos, y los micropagos son nuestras fees. Cada operación en la app cuesta entonces un pequeño pago x402 o L402. L402 si tiene que ver con Bitcoin, x402 si tiene que ver con cripto.

Un ejemplo. Guardar o leer una nueva contraseña en tu gestor de contraseñas de Nuri cuesta 0,1 céntimos o 1 céntimo. Y eso lo podemos sacar directamente de la wallet, porque es agéntica. En el router ya lo hago así. Puedes usarlo con un token o pagas por las llamadas, y podemos darle a cada endpoint un precio distinto.

Entonces no tienes que construir tu propio sistema de fees. Cualquiera puede integrar nuestra API donde quiera, y nosotros recibimos los pagos automáticamente. Yo empezaría con la agenda de contactos, 0,1 céntimos cada vez que añades un contacto. Si eso funciona, lo ampliamos a toda la app. Una funcionalidad cada vez.

## Wallet familiar y hardware wallets

Cuando la gente ha experimentado una vez cómo funciona una wallet tipo Safe, como la que tenemos nosotros como empresa, les parece realmente genial. Yo tengo una llave, pero solo podemos pagar juntos. Es una experiencia cripto realmente buena.

O una wallet familiar. Mi madre, mi hermana y yo. Dos de nosotros bastan para pagar juntos. Multisig es algo que nadie se imagina. Pero decir que somos tres personas y una hardware wallet, o que somos cinco personas y una IA, eso lo entiende todo el mundo.

Y nos mantenemos en el principio que nadie más consigue. One-Click-Face-ID-Wallet. Sin seed, sin seed phrase, resistente al phishing, Multisig por defecto.

## El primer paso

Vamos con mucho cuidado. El primer paso es solo que yo pueda añadir a un amigo como mi Padawan en los Settings y que él reciba algo automáticamente. Luego vemos en nuestra base de datos quién ha añadido a quién y qué swaps han ocurrido, y pagamos los referrals.

Y cuando envías algo, deberíamos tener un autocompletado de todos los usuarios de Nuri. No solo tus contactos, sino simplemente todos. Escribo una L y encuentro a toda la gente con L, como en PayPal.

Más adelante vienen la rotación de keys, añadir y eliminar keys y una hardware wallet. Todo eso tenemos que hacerlo de todos modos. Pero desde la visión, creo que es absolutamente perfecto. Porque es una funcionalidad tan brutalmente viral que puedes ganar con el otro o ser su co-firmante.
