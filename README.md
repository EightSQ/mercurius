# mercurius - a parcel tracking system

> Mercurius
> - römische Entsprechung zum griechischen Gott Hermes

## Der Stack
Mercurius basiert auf dem Realtime-Framework [Meteor](https://www.meteor.com/) und arbeitet mit MongoDB als Datenbank. Vorteil liegt hier bei der Unterstützung von Realtime-Aktualisierungen in der Anwendung. Auf eine API für externe Anwendungen (wie sie z.B. zum Eingeben von neuen Sendungen in das System durch externe Systeme, oder durch interne System für das Routing nötig werden), wird in diesem Software-Stack verzichtet, da der eigentliche Fokus auf der Webanwendung liegt. Jedoch ist es ohne weiteres möglich, entsprechende APIs an die Datenbank anzubinden.

**MongoDB** ist eine NoSQL-Datenbank, d.h. sie weicht von der strikten Normalisierung klassischer, relationaler Datenbanksysteme bewusst ab. Für unsere Zwecke eignet sich ein NoSQL-System dennoch gut, da wir so bei der Form der Daten flexibel sind, und ggf. später neue Datenformate (z.B. Kundennummern, Push-Notifications, Sondermeldungen, etc.) mit in die *documents* speichern können, ohne dafür aufwendig die Datenbankstruktur migrieren zu müssen (wie es bei einer klassischen Datenbankstruktur der Fall wäre. Zudem kann MongoDB Datenbestand wie auch Arbeitslast leichter als klassische Datenbanken auf mehrere Server verteilen, wodurch auch bei sehr großem Datenaufkommen (womit bei einem großen Versanddienstleister zu rechnen ist), das System skalierbar bleibt und nicht auf Grenzen der Erweiterbarkeit stoßen wird.

## Die Sendungsnummer
Die **HUPID** (Hermes Universal Parcel Identification Number) besteht aus 19 Ziffern. Ein Vorteil dieser Länge liegt darin, dass eine Zahl dieser Größe als *unsigned long long* mit 64bit, d.h. in 8 Bytes platzsparend gespeichert werden kann.

![HUPID Blueprint](/blueprints/hupid_blueprint.png)

### Type specifier
Mit einer Ziffer wird der Sendungstyp kodiert. Dieser steht von **0 - 5** für die Hermes-üblichen Typen Päckchen bis XXL-Paket. Die Ziffer **9** steht für Sperrgut. Die Ziffern **6-8** sind zwecks Erweiterbarkeit des Systems reserviert.

### Unique Digits
7 Ziffern genügen für 10 Mio. Sendungen pro Tag pro Tupel von Start-/ Ziel-Verteilzentrum bzw. Land. Diese Range erscheint ausreichend, um ein einfaches "Raten" von möglichen Sendungsnummern auszuschließen.

### Origin-/ Destination-Center
Hermes unterhält 63 Paketzentren in Deutschland. Da der Unternehmensschwerpunkt in Deutschland sind, sind 63 Zahlen (aus zwei Ziffern) für jene reserviert. Mit den übrigen Zahlen können, für Sendungen aus, ins oder durch das Ausland, Länder kodiert werden. Die hier eingebauten Informationen über Start und Ziel der Sendung ermöglichen ein einfaches Routing in einem Paketzentrum, ohne dass dort zunächst das Ziel hinter einer Sendungsnummer etwa aus einer Datenbank herausgesucht werden muss.

### Year specifier
Zwei Ziffern für die Jahresangabe reichen aus, um für 100 Jahre eindeutige Sendungsnummern zu haben.

### Checksumme
Um beim Eintippen der Sendungsnummer nicht ständig auf Fehler zu tappen, enthält die **HUPID** eine Checksumme, die aus einfach mit einer Art von Quersumme gebildet wird (Codebeispiel zur Implementierung [hier](https://github.com/EightSQ/mercurius/blob/24c555764da82f799ab2fc51a18afc31c95e892c/imports/api/helpers.parcels.js#L13).

## Einrichtung

Noch gibt es nichts einzurichten :(

## Verwendung
Das Skript zur Injektion von Demo-Daten in das System (um es ausprobieren zu können) speist mithilfe der kleinen API (die in der Praxis um Authentifikation erweitert werden muss), Daten in das System ein. Eine kurze Dokumentation dieser API befindet sich [hier](docs/API.md).
