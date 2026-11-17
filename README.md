# HM Schoonmaakdiensten — website

Een moderne, statische landingspagina voor HM Schoonmaakdiensten in de regio Roermond. De opbouw is gebaseerd op een service-landingspagina: **hero → intro → diensten → klantlogo's → waar zoek je naar → maak kennis met ons werk → werkgebied → onze belofte → werken bij HM → footer**. De uitvoering is eigen: HM-content, paars (#7c65ab) en diep blauw (#002464). Bij elke dienst hoort sinds deze versie een eigen pagina met uitleg, werkwijze, FAQ en offerteformulier.

## Bestanden

| Bestand | Functie |
| --- | --- |
| `index.html` | De landingspagina |
| `schoonmaakonderhoud.html` | Dienstpagina met uitleg, FAQ en offerteformulier |
| `glasbewassing.html` | Dienstpagina met uitleg, FAQ en offerteformulier |
| `vloeronderhoud.html` | Dienstpagina met uitleg, FAQ en offerteformulier |
| `sanitair-hygiene.html` | Dienstpagina met uitleg, FAQ en offerteformulier |
| `eenmalige-schoonmaak.html` | Dienstpagina met uitleg, FAQ en offerteformulier |
| `buitenschoonmaak.html` | Dienstpagina met uitleg, FAQ en offerteformulier |
| `kantoren-bedrijfspanden.html` | Sectorpagina met uitleg, FAQ en offerteformulier |
| `retail-winkels.html` | Sectorpagina met uitleg, FAQ en offerteformulier |
| `zorg-welzijn.html` | Sectorpagina met uitleg, FAQ en offerteformulier |
| `onderwijs-kinderopvang.html` | Sectorpagina met uitleg, FAQ en offerteformulier |
| `hotels-horeca.html` | Sectorpagina met uitleg, FAQ en offerteformulier |
| `industrie-logistiek.html` | Sectorpagina met uitleg, FAQ en offerteformulier |
| `over-ons.html` | Over HM Schoonmaakdiensten |
| `werkgebied.html` | Werkgebied in Limburg en Noord-Brabant |
| `onze-belofte.html` | De drie beloftes van HM |
| `werken-bij.html` | Werken bij HM en open sollicitatie |
| `contact.html` | Contactgegevens en offerteformulier |
| `roermond.html` | Lokale pagina voor schoonmaak in Roermond |
| `kantoorschoonmaak-roermond.html` | Kantoorschoonmaak in Roermond |
| `glasbewassing-roermond.html` | Glasbewassing in Roermond |
| `build-diensten.js` | Genereert de zes dienstpagina's opnieuw |
| `build-sectoren.js` | Genereert de zes sectorpagina's opnieuw |
| `build-paginas.js` | Genereert de algemene en lokale pagina's opnieuw |
| `assets/css/style.css` | Gedeelde vormgeving: header, footer, kaart, cijfers, formulier, carrières |
| `assets/css/diensten.css` | Vormgeving van de landingspagina (hero, dienstenband, zoekkolommen, werk) |
| `assets/css/dienstpagina.css` | Vormgeving van de dienstpagina's |
| `assets/css/infopagina.css` | Vormgeving van de algemene en lokale pagina's |
| `assets/js/site.js` | Menu, privacyvenster, scrollgedrag en de offerteformulieren |
| `assets/img/` | Logo, favicon, partnerlogo's, dienstfoto's en placeholders |
| `robots.txt` / `sitemap.xml` | Voor zoekmachines, inclusief de dienst- en sectorpagina's |
| `artifact.html` | Losse single-file preview van de homepage |
| `build-artifact.js` | Maakt `artifact.html` opnieuw na wijzigingen op de homepage |
| `README.md` | Dit bestand |

## Lokaal bekijken

Dubbelklik op `index.html`. De site werkt zonder server of build. De lettertypes worden via Google Fonts geladen; met een internetverbinding ziet alles er hetzelfde uit als online. De dienstenkaarten op de homepage linken naar de zes aparte dienstpagina's.

## Online zetten

De site staat op GitHub Pages via de repository `xleroyz7/hm-schoonmaakdiensten` en is bereikbaar op `www.hmschoonmaakdiensten.nl`.

1. Zet de gewijzigde bestanden in de repository en push naar `main`.
2. GitHub Pages bouwt de site automatisch opnieuw.
3. Controleer of `https://www.hmschoonmaakdiensten.nl/` zonder waarschuwing laadt.
4. Controleer in GitHub → Settings → Pages of **Enforce HTTPS** aan staat; het certificaat voor het eigen domein is actief.
5. Meld de site aan bij Google Search Console en dien `sitemap.xml` in.

Er is geen database, CMS of servercode nodig. De offerteformulieren op de dienstpagina's openen WhatsApp of het e-mailprogramma; bezoekers kunnen ook bellen of mailen.

## Opbouw

1. **Hero:** full-bleed achtergrond met witte lijnen, het HM-logo en een scrollknop.
2. **Intro:** gecentreerde titel, korte uitleg en een contactknop.
3. **Onze schoonmaakdiensten:** paarse band met een horizontale carrousel van zes diensten.
4. **Klantlogo's:** "Wij werken onder andere voor..." met de partnerlogo's.
5. **Waar ben je naar op zoek?:** drie kolommen met links naar diensten, sectoren en informatie over HM.
6. **Maak kennis met ons werk:** drie kaarten met uitleg en een CTA.
7. **Werkgebied:** kaart van Zuid-Oost Nederland met de provincies Limburg en Noord-Brabant en de steden Roermond, Venray, Maastricht en Eindhoven.
8. **Onze belofte:** drie 100%-afspraken (maatwerk, vaste gezichten, heldere afspraken) in de plek van de eerdere reviewtitel. De percentages tellen op zodra de sectie in beeld komt.
9. **Werken bij HM:** donkere sectie met een open sollicitatie-CTA en het HM-logo.
10. **Footer:** witte bovenlaag met een golfrand, paarse middenlaag met het grote HM-logo en een witte onderbalk. De golfachtergrond beweegt langzaam mee; bij `prefers-reduced-motion` staat de animatie uit.

## Dienstenpagina's

Elke dienstenkaart op de homepage opent een eigen pagina:

- `schoonmaakonderhoud.html`
- `glasbewassing.html`
- `vloeronderhoud.html`
- `sanitair-hygiene.html`
- `eenmalige-schoonmaak.html`
- `buitenschoonmaak.html`

De pagina's hebben dezelfde header, footer en privacyverklaring als de homepage. De inhoud is per dienst opgebouwd uit een hero met foto, een uitleg met inbegrepen taken, de werkwijze in vier stappen, veelgestelde vragen, links naar de andere diensten en een offerteformulier. De opmaak staat in `assets/css/dienstpagina.css`.

De offerteformulieren gebruiken de bestaande formulierlogica in `assets/js/site.js`: vier stappen, een controlescherm en daarna de keuze om de aanvraag via WhatsApp, e-mail of het klembord te versturen. Er is geen server of formulierendpoint: de bezoeker rondt de aanvraag zelf af in WhatsApp of het e-mailprogramma. De privacyverklaring licht dit toe. Voor een echte serververzending moet de samenvatting worden gekoppeld aan een formulierendpoint.

Na een wijziging in de dienstteksten of het formulier: `node build-diensten.js` opnieuw uitvoeren. De gegenereerde HTML-bestanden niet los aanpassen, tenzij je ze daarna niet opnieuw laat genereren.

## Sectorpagina's

De zes sectoren uit "Waar ben je naar op zoek?" hebben een eigen pagina:

- `kantoren-bedrijfspanden.html`
- `retail-winkels.html`
- `zorg-welzijn.html`
- `onderwijs-kinderopvang.html`
- `hotels-horeca.html`
- `industrie-logistiek.html`

Elke pagina heeft dezelfde huisstijl als de dienstpagina's, met een sectorgerichte hero, aandachtspunten, relevante diensten, werkwijze, FAQ en een offerteformulier. In het formulier is de sector alvast geselecteerd; de bezoeker kiest daarna de dienst en planning. De pagina's linken onderling naar de andere sectoren en naar de passende diensten.

Na een wijziging in de sectorteksten: `node build-sectoren.js` opnieuw uitvoeren.

## Algemene en lokale pagina's

Naast de dienst- en sectorpagina's zijn er:

- `roermond.html` — lokale landingspagina voor schoonmaak in Roermond.
- `kantoorschoonmaak-roermond.html` — kantoorschoonmaak in Roermond.
- `glasbewassing-roermond.html` — glasbewassing in Roermond.
- `over-ons.html`, `werkgebied.html`, `onze-belofte.html`, `werken-bij.html` en `contact.html`.

Deze pagina's gebruiken dezelfde header, footer en huisstijl. De lokale pagina's linken naar de relevante diensten en sectoren en hebben een offerteformulier. De contactpagina bundelt telefoon, e-mail, WhatsApp, het adres en het offerteformulier.

Na een wijziging in deze pagina's: `node build-paginas.js` opnieuw uitvoeren.

## SEO

De technische basis staat op orde:

- Unieke titels en meta-descriptions per pagina, met dienst of sector en de regio.
- Canonieke URL's, Open Graph- en Twitter-kaarten met echte foto's.
- `LocalBusiness`-schema op de homepage met diensten, werkgebied en `@id`; `Service`- en `BreadcrumbList`-schema op dienst- en sectorpagina's.
- Semantische koppen, beschrijvende linkteksten en alt-teksten bij inhoudsafbeeldingen.
- `sitemap.xml` met alle 21 pagina's en `robots.txt` met sitemapverwijzing.
- Mobielvriendelijke, snelle statische pagina's; de artefactpreview staat op `noindex`.

Voor lokale vindbaarheid zijn de stappen buiten de code minstens zo belangrijk:

1. **Google Business Profile** aanmaken en volledig invullen: categorie, werkgebied, openingstijden, diensten, foto's en een link naar de site.
2. **KvK, btw en vestigingsadres** staan in de footer, privacyverklaring en het LocalBusiness-schema. Houd naam, adres en telefoon overal exact hetzelfde. Kies bij Google Business Profile eventueel een servicegebied als het adres niet openbaar hoeft te zijn.
3. **Echte Google-reviews** verzamelen na opleveringen en daarop reageren. Geen reviews verzinnen en geen self-serving review-schema toevoegen.
4. **Google Search Console** verifiëren, `sitemap.xml` indienen en de indexering en zoekopdrachten volgen.
5. **Lokale content** toevoegen met echte lokale informatie, bijvoorbeeld een sterke pagina per stad of werkgebied. Vermijd dunne duplicate-pagina's.
6. **Vermeldingen en backlinks** opbouwen via lokale directories, leveranciers, samenwerkingen, sponsoring en vakorganisaties.
7. **Blijf meten**: kijk maandelijks naar vertoningen, klikken, posities en aanvragen. SEO is geen eenmalige instelling; content en autoriteit groeien door de tijd.

Niemand kan een vaste positie in Google garanderen. Deze basis vergroot de kans om gevonden te worden, maar lokale autoriteit, reviews en concurrentie in de regio bepalen uiteindelijk het resultaat.

## Stijl

De site gebruikt één lettertype, **Archivo**, voor koppen en tekst. Alle kaarten en knoppen hebben afgeronde hoeken. De header staat op de hero als een witte pill-navigatie; de footer gebruikt dezelfde golfvorm als de referentiepagina.

Kleuren staan bovenaan `assets/css/style.css` in `:root`:

- Primair blauw: `#002464` voor links, selecties en accenten.
- Blauw hover/detail: `#0b3d82`.
- Blauwe tint: `#e6eef8`.
- Paars: `#7c65ab` voor het logo, de knoppen, de footer en de dienstenband.
- Paars donker: `#6a5398` voor hover.
- Footer/donker: `#1d283e`.
- Basis: wit, lichtgrijs en donker navy voor contrast.

## Nog invullen of bevestigen

1. **Partnerlogo's.** De site gebruikt logo's van Nike, adidas, PUMA, Moncler, Gucci en Louis Vuitton. Controleer of deze merken als klant of partner genoemd mogen worden. Zo niet, verwijder ze dan uit de klantlogosectie.
2. **KvK, btw en vestigingsadres.** Deze staan nu in de footer, de privacyverklaring en het LocalBusiness-schema: Pastoor Zandersstraat 42, 6071 VC Swalmen; KvK 91847370; btw NL004919702B54. Controleer of het adres openbaar mag zijn; kies bij Google Business Profile eventueel voor een servicegebied zonder zichtbaar adres. Het IBAN staat bewust niet op de website; gebruik dat alleen op facturen.
3. **Bereikbaarheid.** Er staat nu geen openingstijd. Vul de juiste tijden of bereikbaarheid aan.
4. **Diensten en doelgroep.** De site richt zich op bedrijven, winkels en organisaties. Verzorgt HM ook particuliere schoonmaak of huishouding? Dan kan daar een extra dienst of pagina bij.
5. **Google-reviews.** Lokale reviews zijn het sterkste bewijs voor een klein bedrijf. Zodra er echte reviews zijn, kunnen die een plek krijgen naast de intro of bij de diensten.
6. **Social media.** Er staan nog geen links naar Facebook, Instagram of LinkedIn op de site.
7. **Foto's.** Alle zes dienstenkaarten en de werkkaart Werken bij HM hebben nu een eigen foto. Voor de hero en de werkkaart Glas- en gevelreiniging staan nog logo's of placeholders. Vervang die door echte foto's.
8. **Algemene voorwaarden.** De footer verwijst nu naar "op aanvraag". Voeg een definitieve versie toe als die er is.
9. **Privacytekst.** De tekst is praktisch en beschrijft wat de site doet, maar laat hem juridisch controleren voordat je live gaat.
10. **HTTPS.** Het certificaat en Enforce HTTPS zijn ingericht. Controleer na een wijziging of `https://www.hmschoonmaakdiensten.nl/` zonder waarschuwing laadt.
11. **Procentuele beloftes.** De homepage gebruikt bewust 100%-beloftes over de werkwijze en geen verzonnen klantpercentages. Heb je echte enquête- of reviewcijfers, vervang ze dan in `index.html` en vermeld de bron.

## Concurrentie-onderzoek

De landingspagina is geïnspireerd op de opbouw van `vebego.nl/cleaningservices`: full-bleed hero, korte intro, dienstenband, klantlogo's, zoekkolommen en werkkaarten. De uitvoering is eigen: HM-kleuren, HM-content en geen overgenomen teksten of beelden. Eerdere benchmarks waren CSU, Asito, Vebego/Hago, Claro Clean en SCR Roermond. Lokale vindbaarheid, reviews en een korte contactroute wegen zwaarder dan een groot megamenu.

Bronnen:

- [Vebego Cleaning Services](https://www.vebego.nl/cleaningservices)
- [The Clean Group](https://thecleangroup.nl/)
- [CSU](https://www.csu.nl/)
- [Asito](https://www.asito.nl/)
- [Schoonmaakcentrale Roermond](https://www.scr-roermond.nl/)
- [Claro Clean Roermond](https://claroclean.nl/winkel-schoonmaak-roermond)

## Aanpassen

- Teksten: `index.html`.
- Dienstinhoud: `build-diensten.js`, daarna `node build-diensten.js`.
- Sectorinhoud: `build-sectoren.js`, daarna `node build-sectoren.js`.
- Algemene en lokale pagina's: `build-paginas.js`, daarna `node build-paginas.js`.
- Kleuren, spacing en typografie: `assets/css/style.css` en `assets/css/diensten.css`, bovenaan bij `:root`.
- Opmaak dienstpagina's: `assets/css/dienstpagina.css`.
- Menu, privacyvenster en offerteformulieren: `assets/js/site.js`.
- Na een wijziging in `index.html`: `node build-artifact.js` opnieuw uitvoeren als je ook `artifact.html` wilt bijwerken.

De site is bewust rustig gehouden: veel beeld, korte copy, paars als merkkleur en een moderne groteske typografie. De hero en de werkkaart Glas- en gevelreiniging bevatten nog tijdelijke placeholders. Geen standaardtemplate, geen verzonnen klantlogo's en geen nep-reviews.
