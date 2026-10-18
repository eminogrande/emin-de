---
title: "Radikaler Georgismus"
description: "Ein Vortrag eines Mitglieds des Amoveo-Projekts über die Grundsteuer auf einer Blockchain und warum Krypto den Georgismus endlich funktionieren lassen könnte"
date: "2026-01-20T09:50:01Z"
updated: "2026-01-20"
lang: de
translated_from: "en/radical-georgism"
source_sections: ["land-value-has-two-parts", "the-blockchain-as-the-assessor", "a-land-registry-in-a-verkle-tree", "how-the-code-guesses-land-value", "beachfronts-gaming-and-who-gets-the-tax", "a-truth-both-sides-hate", "what-money-really-is", "complexity-moats-and-yield"]
category: culture
format: summary
author: ai-desk
provenance: ai_generated
ai_assisted: true
reviewed_by_human: false
image: "/media/radical-georgism/cover.webp"
third_party_summary: true
tldr: ["Ein Vortrag von Anfang 2026 argumentiert, dass Blockchains eine Grundsteuer endlich funktionieren lassen könnten, ganz ohne menschliche Gutachter, die man bestechen kann.", "Grundstücke werden zu Pfaden in einem Verkle-Baum, und der Code schätzt den Grundstückswert anhand der Nachbargrundstücke mit exponentieller Gewichtung.", "In der zweiten Hälfte geht es um das Geld selbst: ein grundstücksgedeckter, renditeträchtiger Token gegen Bitcoins Lindy-Effekt und Netzwerk-Burggraben."]
sections: [{"basically": "Der Georgismus besteuert den Standortwert, den eine Gemeinschaft schafft, zu 100% und Gebäude zu 0%."}, {"basically": "Die Grundsteuer ist daran gescheitert, dass Menschen die Werte festgelegt haben und bestochen werden konnten. Eine Blockchain kann man nicht bestechen."}, {"basically": "Teile die Erde etwa 23-mal in zwei Hälften und jedes Grundstück auf der Erde bekommt seinen eigenen Pfad in einem Verkle-Baum."}, {"basically": "Der Algorithmus bewertet ein Grundstück hauptsächlich nach dem Land direkt daneben, und je weiter er herauszoomt, desto weniger zählt es."}, {"basically": "Das Modell könnte Strandgrundstücke zu niedrig besteuern und die Steuer könnte an alle VEO-Inhaber gehen, aber es kann trotzdem die bessere Lösung sein."}, {"basically": "Eine Idee, die für Linke und Rechte gleichermaßen giftig ist, könnte eine tiefe Wahrheit enthalten: Besteuere nur Land und lass die Schöpfer in Ruhe."}, {"basically": "Geld kann man nicht essen. In dieser Sichtweise braucht eine Währung einen Abfluss, etwa Steuern oder Grundstücksgebühren, um ihren Wert zu halten."}, {"basically": "Die Debatte: Bitcoins Einfachheit und Burggraben gegen die Behauptung, dass ein renditeträchtiges Asset langfristig gewinnt."}]
---
![](../../../media/radical-georgism/cover.jpg)

Das hier ist die Zusammenfassung eines Gesprächs von Anfang 2026, das hauptsächlich ein Mitglied des Amoveo-Projekts geführt hat.

Es geht um Georgismus, also die Landwertsteuer (LVT), und Blockchain. Die Idee: Krypto könnte das einzige Werkzeug sein, das endlich eine funktionierende Landwertsteuer möglich macht.

Das Mitglied sieht darin eine große politische Ironie, ein echtes Paradox. Anarchisten und Libertäre auf der einen Seite und die „LVT-Leute", die Georgisten, auf der anderen stehen sich oft feindlich gegenüber, aber sie halten die Schlüssel zu den Zielen des anderen in der Hand.

Die Anarchisten haben die dezentralen Werkzeuge, um den traditionellen Staat zu zerlegen, und die Georgisten haben das Steuermodell, das eine staatenlose Gesellschaft wirtschaftlich tatsächlich funktionieren lassen könnte. Radikaler Georgismus ist also ein fehlendes Bindeglied zwischen zwei Ideologien, die oft aneinandergeraten: Anarchokapitalismus, der staatliche Eingriffe hasst, und Sozialismus, der sich auf Ressourcen konzentriert, die der Gemeinschaft gehören.

## Landwert hat zwei Teile

Ein Kerngedanke der Diskussion ist, dass Landwert aus zwei Teilen besteht. Da gibt es die Verbesserungen, also das, was der Eigentümer baut, und da gibt es den Standortwert, den die Gemeinschaft drumherum schafft. Dein Land wird wertvoller, wenn ein Nachbar ein großartiges Restaurant baut, selbst wenn du gar nichts tust.

Und anders als ein Computer oder ein Auto hat Land niemand erschaffen. Sein Wert kommt daher, wo es liegt. Wenn du ein Grundstück in der Wüste besitzt und jemand baut eine Stadt drumherum, schießt dein Landwert nach oben, und du hast null Arbeit reingesteckt.

Die georgistische Antwort ist, diesen Standortwert, das unverdiente Vermögen, mit 100 % zu besteuern und Verbesserungen wie Gebäude, Farmen und Fabriken mit 0 %. So bauen die Leute produktive Dinge, statt einfach auf Land zu sitzen und darauf zu warten, dass der Preis steigt.

## Die Blockchain als Gutachter

Historisch ist die LVT daran gescheitert, dass Menschen den Landwert berechnen, und das führt zu Korruption im ganzen System. Wer den Wert festlegt, kann bestochen werden, um die Steuer für Freunde zu senken oder für Feinde zu erhöhen. Das Mitglied argumentiert, dass eine Blockchain diese Berechnungen automatisch durchführen kann, auf eine Weise, die transparent, mathematisch und nicht korrumpierbar ist. Man braucht also keine zentrale Steuerbehörde, die Fehler macht.

Die Blockchain wird zu einem mathematischen Richter, dem unbestechlichen Gutachter, und ohne menschliche Gutachter wird das System zu einer trustless Wirtschaftsmaschine.

## Ein Landregister in einem Verkle-Baum

Die technische Idee ist, Verkle-Bäume zu nutzen, eine Datenstruktur, die sehr effizient für Proofs ist, als globales Landregister. Ein Binärbaum sitzt in einem Verkle-Baum zur Basis 256, und Grundstücke werden durch eine Reihe von Linien definiert, die auf den Globus gezeichnet werden.

Du ziehst eine Linie über den Globus und halbierst ihn. Dann halbierst du diese Hälften wieder. Wenn du das ungefähr 23-mal machst, bleibt ein kleines Grundstück übrig. Jedes Stück Land auf der Erde hat also seinen eigenen Pfad aus 23 binären Entscheidungen, links oder rechts, Nord oder Süd.

Ein großes technisches Problem 2026 ist State Bloat, das heißt, die Blockchain wird zu schwer, um auf einem normalen Computer zu laufen. Mit Verkle-Proofs kann ein Nutzer beweisen, dass er ein Stück Land besitzt, und seine Steuerrechnung berechnen, ohne das ganze globale Register herunterzuladen. Er braucht nur die Linien, also die Proofs, die zu seinem eigenen Grundstück führen.

## Wie der Code den Landwert schätzt

Die Bewertung ist das Gehirn des Systems. Es gibt keinen menschlichen Gutachter, also muss der Code den Wert des Landes schätzen. Das Mitglied schlägt einen Algorithmus vor, der sich den durchschnittlichen Landpreis in den Zweigen des Baums rund um das Grundstück ansieht.

Wenn du zu weit rauszoomst, nimmst du Niedrigwertgebiete wie den Ozean mit rein, und Ausreißer wie eine zufällige Villa im Wald können die Daten verzerren. Also nutzen sie exponentielle Gewichtung. Sie legt das meiste Gewicht auf den Preis des Landes direkt neben dem Grundstück und liefert eine gut genug Schätzung des reinen Landwerts.

Du schaust dir die Zweige des Baums auf verschiedenen Zoomstufen an, und je weiter der Baum rauszoomt, desto weniger interessiert sich das System für diese Daten.

Die Formel, die die Landwerte rund um das Grundstück gewichtet, ist

$$V_{estimate} = \sum_{n=1}^{D} \left( \frac{1}{2} \right)^n \times A_n$$

Hier ist $n$ die Ebene des Baums, also wie weit du rausgezoomt bist, $A_n$ ist der Durchschnittspreis pro Quadratmeter in diesem Zweig und $D$ ist die Gesamttiefe, normalerweise um die 23.

Für normale Leute heißt das: Wenn das Land deines Nachbarn viel wert ist, nimmt der Algorithmus an, dass dein Land, der Standort, auch viel wert ist. Und wegen des

$$(1/2)^n$$

-Multiplikators erhöht ein Preissprung in einer Stadt 160 Kilometer entfernt nicht versehentlich deine Steuern auf dem Land.

## Strandgrundstücke, Gaming und wer die Steuer bekommt

Jemand im Chat brachte das Strandproblem auf. Landwerte verlaufen nicht immer glatt, und ein Grundstück am Strand kann einen massiven Preissprung haben im Vergleich zu Land nur ein paar Meter weiter im Inland. Die Schlussfolgerung der Gruppe war, dass das Modell solche Ausreißer vielleicht zu niedrig besteuert, aber es wäre immer noch viel effizienter als jedes Steuersystem, das heute existiert.

Um zu verhindern, dass Nutzer das System mit schiefen Datenbäumen austricksen, die ihre Steuern senken, schlägt das Mitglied einen Reorganization Incentive vor. Wenn Nutzer den Baum so reorganisieren können, dass ihre eigenen Rechnungen so klein wie möglich werden, bauen sie ganz natürlich einen perfekt balancierten Binärbaum, und das ist genau das, was die Blockchain braucht, um schnell zu bleiben.

In einem perfekten georgistischen System fließen die Steuern zurück an die lokale Gemeinschaft, die den Wert geschaffen hat. Aber auf einer pseudonymen Blockchain ist es schwer zu beweisen, welche Wallet zu welcher Nachbarschaft gehört, und auf einer globalen Chain weiß niemand, wer wo wohnt.

Das Mitglied schlägt einen Kompromiss vor. Selbst wenn die Landsteuer einfach an alle geht, die die Währung halten, die VEO-Holder, würde der Gewinn an wirtschaftlicher Effizienz das System trotzdem gegen traditionelle Alternativen wie Banken und Regierungen gewinnen lassen. Es ist nicht perfekt lokal, aber es ist effizient genug, um sie auszustechen.

## Eine Wahrheit, die beide Seiten hassen

Das Mitglied sagt außerdem, dass eine Idee, die für Linke und Rechte gleichermaßen politisch giftig ist, wahrscheinlich eine tiefe Wahrheit enthält. Wenn du jede Steuer außer der Landsteuer abschaffst, bekommst du etwas, das hyperkapitalistisch für Schöpfer ist, aber kommunal für die Oberfläche der Erde.

Die Diskussion erwähnt auch, dass in einigen nordischen Ländern das Eigentum bereits durch das Jedermannsrecht (Allemannsretten) eingeschränkt ist, die Öffentlichkeit darf also Privatland betreten oder dort campen. Landrechte sind ein soziales Konstrukt, und eine Blockchain kann sie neu definieren.

In dieser Sichtweise ist Geographie Daten und die Welt ist ein Satz mathematischer Proofs. Wenn Landtitel zu Verkle-Baum-Pfaden werden und die Landbewertung zu einem gewichteten Durchschnitt der Datenpunkte daneben, bekommst du eine Gesellschaft, in der Monopole auf Land unmöglich sind, weil die Steuer es zu teuer macht, ungenutztes Land zu halten, in der Produktivität nie bestraft wird, weil deine Gebäude und Arbeit mit 0 % besteuert werden, und in der Regierung Code ist, weil der Steuereintreiber ein Open-Source-Algorithmus ist.

## Was Geld wirklich ist

Ein späterer Teil des Gesprächs wird zu einer Debatte darüber, was Geld wirklich ist und ob Bitcoin (BTC) gegen ein Asset bestehen kann, das über Land eine Rendite erwirtschaftet. Das Mitglied argumentiert aus Sicht des Monetary Realism, die andere Seite, distbit, verteidigt den Lindy-Effekt und Netzwerk-Moats.

Die Sicht des Mitglieds ist hart: „Geld kann man nicht essen.“ Geld hat an sich keinen Wert, es ist nur ein Anspruch auf die Zeit und Energie anderer Menschen. Damit eine Währung langfristig wertvoll bleibt, braucht es eine Senke, einen Grund, warum Menschen gezwungen sind, ihre Arbeitskraft zu verkaufen, um an sie zu kommen.

Modernes Fiat wie der USD wird durch die Pflicht gestützt, Steuern zu zahlen. Das System des Mitglieds wird durch die Pflicht gestützt, für Landnutzung zu zahlen. Bitcoin dagegen setzt auf die freiwillige Erwartung zukünftigen Werts, und das Mitglied warnt, dass es sich wie ein Pyramidensystem verhalten könnte, wenn das Wachstum stoppt.

Das vorgeschlagene Landregister verwaltet also nicht nur Land, es frisst auch die Währung, in der es denominiert ist. In einem Harberger-Tax-Modell zahlst du laufend einen Prozentsatz des Werts, den du deinem eigenen Eigentum beimisst, um deinen Titel zu behalten.

Wenn du das im nativen Token des Systems zahlst, wird der Token renditetragend. Wenn globale Immobilien im Wert von Hunderten von Billionen in das Register wandern, wächst die Nachfrage nach dem Token mit. Die Währung liegt nicht einfach nur rum, sie fängt die wirtschaftliche Energie des Landes ein, für das sie steht.

## Komplexität, Moats und Rendite

distbits technische Kritik ist, dass Komplexität Risiko bedeutet. Bitcoin ist einfach, und genau deshalb ist es sicher. Ein Landregister, automatisierte Steuern und Rendite obendrauf geben Hackern und Systemausfällen eine viel größere Angriffsfläche. Das Mitglied antwortet, dass Rendite kein Feature ist, sondern ein Überlebensbedürfnis, wie in der Biologie.

Ein Asset, das gegenüber einem effizienteren Konkurrenten mit Rendite 5% seines relativen Werts verliert, wird seinen Schelling-Punkt, den Ort, an dem sich alle zu treffen einig sind, sehr schnell verlieren.

Das Mitglied sagt auch, dass Immobilien bereits eine Art Geld sind. Menschen nutzen Eigentum, um Vermögen zu speichern und sich gegen Inflation abzusichern. Statt also Bitcoin zu einem Konkurrenten von Immobilien aufzubauen, finden sie es einfacher, Immobilien mit Krypto-Features wie Tokenisierung und permissionlosen Registern aufzurüsten. Warum einen Immobilienmarkt von über 300 Billionen Dollar bekämpfen, wenn man ihn einfach in eine Blockchain absorbieren kann?

Das Mitglied glaubt auch nicht an Markentreue im Finanzwesen. distbit argumentiert, Bitcoin habe mit Sicherheit, Liquidität und Geschichte einen Moat, aber das Mitglied hält Open-Source-Software für wirtschaftlich nicht klebrig. In einer digitalen Welt wird es immer einfacher, sein Vermögen von einem Asset ohne Rendite wie BTC zu einem mit Rendite zu bewegen.

Wenn ein besseres Geld auftaucht, glaubt das Mitglied, werden die Menschen schneller wechseln, als die etablierten Akteure erwarten.

Das Mitglied denkt von ersten Prinzipien aus, wie in der Physik, und kümmert sich nicht um Marktstimmung oder Krypto-Kultur. Die Fragen sind: Woher kommt der Druck, der Menschen zwingt, den Token zu nutzen, also die Energiesenke? Dann der total adressierbare Markt (TAM), also warum auf den Goldmarkt (14 Bio. $) zielen, wenn der Landmarkt 20-mal größer ist? Und dann Spieltheorie.

Wenn Asset A 5% Rendite bringt und Asset B 0%, wann hält ein rationaler Akteur Asset B? Die Antwort des Mitglieds ist: langfristig fast nie.
