# Time Sheet Converter

Kleines JavaScript-Kommandozeilenprogramm zur Umwandlung eines Zeiterfassungs-Exports in eine CSV-Datei mit Datum, Arbeitsstunden und Tätigkeit.

Das Programm läuft mit Node.js und verarbeitet bereits exportierte CSV-Dateien. Excel-Dateien (`.xlsx`) werden nicht direkt eingelesen.

## Verwendung

Voraussetzung ist eine aktuelle Node.js-LTS-Version. Repository herunterladen oder klonen und im Projektordner ausführen:

```sh
node timeSheet.js --input zeiterfassung.csv --output ergebnis.csv
```

Für zusätzliche Ausgaben der eingelesenen und umgewandelten Daten:

```sh
node timeSheet.js --input zeiterfassung.csv --output ergebnis.csv -v
```

Die Eingabedatei muss selbst bereitgestellt werden; die oben genannten Dateinamen sind Beispiele. Verwende für die Ausgabe einen anderen Dateinamen: Eine bereits vorhandene Ausgabedatei wird überschrieben.

Das Skript verwendet ausschließlich integrierte Node.js-Module; für diese Aufrufe ist keine Paketinstallation erforderlich.

## Eingabeformat

Erwartet wird eine UTF-8-CSV-Datei mit Semikolon als Trennzeichen und einer Kopfzeile. Die Spalten werden nach ihrer Position ausgewählt, nicht nach ihren Namen:

| Position in der Eingabe | Erwarteter Inhalt | Verwendung |
| --- | --- | --- |
| 1 (Index 0) | Datum im Format `TT.MM.JJJJ` | Datum wird zu `MM/TT/JJJJ` umgestellt |
| 4 (Index 3) | Arbeitsstunden | Wert wird unverändert übernommen |
| 14 (Index 13) | Tätigkeit | Text wird unverändert übernommen |

Jede Datenzeile benötigt daher mindestens 14 Spalten. Die erste eingelesene Zeile wird als Kopfzeile übersprungen. Die übrigen Spalten werden nicht in die Ausgabe übernommen.

## Ausgabeformat

Die Ausgabedatei verwendet ebenfalls Semikolons. Ihre Kopfzeile lautet:

```text
Date (US format);Quantity (hours);Activity
```

Die Umwandlung ändert das Datumsformat und wählt die drei benötigten Spalten aus. Stunden werden weder berechnet noch in ein anderes Zahlenformat umgewandelt.

## Aktueller Umfang und Grenzen

- Das Skript ist auf die beschriebene Spaltenanordnung zugeschnitten.
- CSV-Felder mit eingebetteten Semikolons, Zeilenumbrüchen oder CSV-Anführungszeichen werden nicht korrekt geparst.
- Datumswerte, Spaltenanzahl und Stundenwerte werden nicht umfassend validiert.
- Aktuell einfache Dateinamen wie `zeiterfassung.csv` verwenden. Zusätzliche Punkte im Dateinamen oder Pfad werden von der Dateitypprüfung abgelehnt.
- Die dokumentierte zusätzliche Ausgabe wird mit `-v` aktiviert.
- Es gibt derzeit keine automatisierten Tests; `npm test` enthält lediglich einen Platzhalter.

## Offene Aufgaben

- [ ] **Erfundene Beispieldateien ergänzen:** eine passende Eingabe-CSV und die erwartete Ausgabe-CSV hinzufügen, damit sich die Umwandlung direkt nachvollziehen lässt.
- [ ] **Kleine technische Bereinigung:** Dateinamen mit mehreren Punkten korrekt zulassen und bei Fehlern einen passenden Fehlerstatus zurückgeben.

Diese Aufgaben sind noch nicht umgesetzt. Die vorliegende Ergänzung dokumentiert das bestehende Programm und verändert seine Funktionsweise nicht.
