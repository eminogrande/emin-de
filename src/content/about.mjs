// The single source of the About body. The page renders this through
// renderHtml(); the Markdown mirror returns the same string behind an H1.
// Bare YouTube URLs become the privacy-friendly lite cards from markdown.mjs.
import { KNOWS_ABOUT, AUTHOR_SAME_AS, CONTACT } from '../lib/site.mjs';

export function aboutMarkdown() {
	return `I am Emin Henri Mahrt, a German-Turkish product engineer and founder from Berlin. I build Bitcoin self-custody and agent-payment infrastructure, and I publish long-form writing about the engineering behind it. This site is where the long version goes, at the length the subject needs.

Most of what interests me sits where trust has to be built into the thing itself: keys a provider cannot move, payments that settle without an account, and software that a stranger can check.

## Nuri

Since 2025 I have been rebuilding [nuri.com](https://nuri.com) as a self-custody Bitcoin wallet. The brand and domain moved to new ownership in January 2025, which the old company announced in its [goodbye to Nuri](https://www.bitwala.com/blog/goodbye-nuri). The software is built by Nurisoft Development OÜ in Tallinn, where I am CEO. We are a team of three, as the [trust page](https://nuri.com/trust) states along with the rest of the setup.

Your wallet key is derived from a passkey through the WebAuthn PRF extension. Nuri does not store it. Every address is a MuSig2 2-of-2 between your key and our co-signing key, and the co-signature decays on a Bitcoin timelock of about 77 days, after which your key alone can spend. The [recovery tool](https://github.com/nuri-com/local-nuri-prf-passkey-recovery-tool) rebuilds the keys offline, without our servers. The Visa card is optional and comes from Wirex; euro IBANs come from Monerium. Nuri is not a bank.

## proud magazine, 2009 to 2014

In 2009 I co-founded *proud*, a monthly Berlin magazine about music, art and city politics, and I was its publisher and the person responsible under press law. The German National Library holds the legal-deposit copies, recorded under [DNB ID 992028108](https://d-nb.info/992028108), and records the monthly run from 2009 to its final issue 32 in 2014. Issue 26 survives as a [scanned masthead](http://web.archive.org/web/20120103153435/http://proud.de/uploads/26-proud-magazine-berlin-2011.pdf). It was free, with a circulation of 20,000 according to [Fachzeitungen.de](https://www.fachzeitungen.de/zeitschrift-magazin-proud-magazine). My 2011 story "The Story of Funktion One" is cited in the [Wikipedia article on Berghain](https://en.wikipedia.org/wiki/Berghain).

What stayed was the routine: report it, edit it, put it in front of people, take the correction.

## Dropspot, 2013 to 2014

In 2013 I co-founded Dropspot, an app that pushed a news item to your phone when you were near the place it was about. Axel Springer became a shareholder in 2014, and BILD [covered the product](https://www.bild.de/digital/smartphone-und-tablet/dropspot/app-zeigt-nachrichten-in-der-naehe-36168566.bild.html). I left in April 2014.

## Abend, 2013 to 2016

Also in 2013 I co-founded Abend and was its CTO. It booked Facebook event ads automatically: an organizer entered a budget and a target group, and the tool built and ran the campaign. The [founder profile](https://gust.com/companies/abend) is still online. More than a thousand clubs and festivals used it, according to [The Hundert](https://web.archive.org/web/2020/https://the-hundert.com/startups/abend-the-berlin-facebook-event-promotion-startup).

## æternity, 2017 to 2019

In 2017 I joined [æternity](https://aeternity.com) as COO. The role is in an [App Developer Magazine interview](https://appdevelopermagazine.com/5782/2018/1/9/Developing-on-blockchain-needs-to-become-easier) from January 2018. Later I became CPO, a title used in a [Nägele law firm workshop post](https://www.naegele.law/archiv/naegele-aeternity-and-the-2nd-lunch-and-learn-coding-workshop) the following year. In 2019 I joined the foundation board, announced in the [foundation blog](https://medium.com/aeternity-crypto-foundation/%C3%A6ternity-crypto-foundation-names-emin-mahrt-board-member-we-are-now-preparing-for-developer-f0f07b5cad86). My work covered governance, state channels and developer tooling.

## BSDEX, 2021 to 2022

In 2021 and 2022 I was Chief Product Officer at Börse Stuttgart Digital Exchange. The role is on the record in a [Bank Blog contributor line](https://www.der-bank-blog.de/geburt-dezentrales-finanzsystem/technologie/37690031/) from August 2022 and on the [CAC22A agenda](https://crypto-assets-conference.de/hubfs/Previous%20CAC%20-%20Agenda/FSBC%20_%20CAC22A%20_%20Agenda.pdf) from April 2022.

## Bitcoin and open source

I have been in Bitcoin since 2012, when mining was still done on graphics cards and [Room 77](https://www.coindesk.com/tech/2020/10/19/closing-time-for-bitcoins-iconic-room-77-and-thats-ok-says-owner) in Berlin was where the people who took it seriously met. The habit that survived is the checking: run the thing, read the code, write down what happened.

My open source work is mostly small and practical. The account is [github.com/eminogrande](https://github.com/eminogrande). A substantial recent piece is the [passkey PRF smartcard](https://github.com/nuri-com/nuri-passkey-prf-smartcard), a Java Card applet that works as a FIDO2 authenticator and a Bitcoin co-signer, MIT licensed.

## Selected talks and videos

Four recordings, chosen because the event, the date and the role are documented.

**After the ICO: The New Rules of Governance**, investor panel, CoinAgenda Europe 2018, Malta.

https://www.youtube.com/watch?v=qjCT2coz1o4

**Governance**, BlackSeaChain 2, Varna, 28 July 2018. The [event page is archived](https://web.archive.org/web/2020/https://blackseachain.com/).

https://www.youtube.com/watch?v=h3aQeZT-C4I

**The State of æternity Development**, æternity Universe One, Prague, September 2019.

https://www.youtube.com/watch?v=WCvpL262CXQ

Also from that event, the [foundation panel](https://www.youtube.com/watch?v=oUyPunjd0Do).

**CeFi vs DeFi: Exploring the differences and potential for financial markets**, keynote, Crypto Assets Conference CAC22A, Frankfurt, 4 April 2022. The [agenda PDF](https://crypto-assets-conference.de/hubfs/Previous%20CAC%20-%20Agenda/FSBC%20_%20CAC22A%20_%20Agenda.pdf) lists the session.

https://www.youtube.com/watch?v=eDYt0Bynze8

More stages and interviews:

- Erlang/Elixir Meetup, Krakow, 19 February 2019, co-talk with Yanislav Malahov: [recording](https://www.youtube.com/watch?v=hNxnaf2TWGE).
- Starfleet 2 Demo Day, Sofia, 12 April 2019, opening update: [recording](https://www.youtube.com/watch?v=X-IXkSGdoyo).
- CV Labs, Zug, 19 December 2019, protocol session: [event post](https://forum.aeternity.com/t/aeternity-cv-labs-zug-december-19-2019/5593).
- CoinAgenda Europe, Monaco, 28 September 2021, Scaling Solutions panel: [archived schedule](https://web.archive.org/web/20210922205016/https://coinagenda.com/europe-2021-schedule/).
- Bitcoin Amsterdam, 6 November 2026, moderator of "Will Self-Custody Ever Be Safe?": [speaker profile](https://bitcoin.amsterdam/speakers/emin-mahrt), [archived agenda](https://web.archive.org/web/20261107171217/https://www.bitcoin.amsterdam/agenda).
- App Developer Magazine, January 2018, interview: [article](https://appdevelopermagazine.com/5782/2018/1/9/Developing-on-blockchain-needs-to-become-easier).

My own explainer and product videos are on the [talks page](/talks).

## Free speech

The core rule of this site comes from *proud*: free speech. Nothing here is censored. The details are on the [principles page](/principles).

## Contact

${CONTACT.email} · [X](${CONTACT.x}) · [LinkedIn](${CONTACT.linkedin}) · [Signal](${CONTACT.signal})

## Agent infrastructure

Alongside Nuri: x402 payments so software can pay for access without a signup flow, MCP servers so a model can call a system instead of scraping it, and the unglamorous work of making a website legible to both a search crawler and an agent.

## What I write about here

${KNOWS_ABOUT.map((topic) => `- ${topic}`).join('\n')}

## How these articles get written

Long-form, one subject per piece, and only about things I actually built or measured. Every article opens with a TL;DR so you can leave early, carries a standalone takeaway per section, and ends with its real sources. If a number is in here, it came from a run I can point at.

Each article is also published as clean Markdown at its own URL, included in a public JSON API, and exposed through an MCP server. That is deliberate: the writing should be as easy for a model to quote correctly as it is for a person to read.

## Who else writes here

Some short posts may come from the [AI desk](/author/ai-desk): an openly named AI writing desk, not a person. Its posts carry the AI-written badge on the page, in the Markdown mirror and in the structured data. It has no invented biography and no photo.

## Writing elsewhere

${AUTHOR_SAME_AS.filter((url) => /medium\.com|substack\.com|proud\.de/.test(url)).map((url) => `- [${new URL(url).hostname.replace(/^www\./, '')}](${url})`).join('\n')}

[Contact](/contact) if you are working on something adjacent.
`;
}
