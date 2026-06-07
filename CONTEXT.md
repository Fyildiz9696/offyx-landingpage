# CONTEXT.md — offyx Domain-Glossar

## Produkte

| Term | Definition |
|---|---|
| **Geschäftsadresse** | Ladungsfähige Postadresse in Berlin (Laubacher Str. 44), eintragungsfähig ins Handelsregister |
| **Virtual Office Basic** | Eigenständiges Adresspaket ab 79 €/Monat – Briefkastenservice + Post-Scan |
| **Virtual Office Plus** | Erweitertes Adresspaket ab 99 €/Monat – Basic + Coworking-Nutzung + Weiterleitung. **Empfohlenes Paket.** |
| **Schließfach** | Separat mietbares Schließfach ab 19 €/Monat, ohne Mitgliedschaft buchbar |
| **Coworking Flex** | Gelegentliche Coworking-Nutzung per Einzelslot (24 €/4h) oder Paket (10er: 210 €) |
| **Coworking Regular** | Regelmäßige Nutzung per Mitgliedschaft – Basic 169 €, Flex 249 €, Pro 349 €/Mo |

## Hero-Finder

| Term | Definition |
|---|---|
| **Tile** | Auswählbare Kachel im Hero (Geschäftsadresse / Schließfach / Coworking / Virtual Office Plus) |
| **FinderState** | Zustand der Hero-Inline-Auswahl: `tiles` → `intermediate` → `result` |
| **Intermediate Step** | Zwischenfrage nach Tile-Klick (max. 1 Frage) bei mehrdeutigen Pfaden |
| **Result Card** | Inline-Paket-Darstellung im Hero: Paketname, Preis, Persona-Text, Features, CTAs |

## Pfad-Logik

| Tile | Intermediate? | Mögliche Ergebnisse |
|---|---|---|
| Geschäftsadresse | Ja – „Nur Adresse oder mit Coworking?" | Basic / Plus |
| Schließfach | Nein | Schließfach |
| Coworking | Ja – „Gelegentlich oder täglich?" | Coworking Flex / Coworking Regular |
| Virtual Office Plus | Nein | Virtual Office Plus |
