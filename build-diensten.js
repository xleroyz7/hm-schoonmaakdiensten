/* =========================================================
   Bouwt de zes dienstpagina's van HM Schoonmaakdiensten.
   Uitvoeren vanuit de projectmap: node build-diensten.js
   ========================================================= */

const fs = require('fs');
const path = require('path');

const root = __dirname;
const baseUrl = 'https://www.hmschoonmaakdiensten.nl';
const phone = '06 39140047';
const phoneHref = 'tel:+31639140047';
const email = 'info@hmschoonmaakdiensten.nl';

const services = [
  {
    slug: 'schoonmaakonderhoud',
    name: 'Schoonmaakonderhoud',
    formValue: 'Schoonmaakonderhoud',
    image: 'hm-schoonmaakonderhoud.jpg',
    imageWidth: 960,
    imageHeight: 720,
    imageAlt: 'Medewerker van HM Schoonmaakdiensten maakt een bureau schoon met een microvezeldoek',
    metaTitle: 'Schoonmaakonderhoud in Roermond en Midden-Limburg',
    metaDescription: 'Structureel schoonmaakonderhoud voor kantoren, winkels en bedrijfspanden. HM stemt taken, frequentie en planning af. Vraag een offerte aan.',
    heroTitle: 'Schoonmaakonderhoud voor een werkplek die klopt.',
    heroIntro: 'Een nette werkplek zegt iets over uw organisatie. HM zorgt voor structureel schoonmaakonderhoud, afgestemd op uw pand, uw mensen en uw dagelijkse ritme. Met vaste gezichten en één aanspreekpunt.',
    sectionTitle: 'Een schone werkplek, elke dag opnieuw.',
    paragraphs: [
      'Van de eerste indruk bij de entree tot de vergaderruimte waar uw klanten aanschuiven: schoonmaakonderhoud bepaalt hoe uw locatie aanvoelt. HM houdt werkplekken, vloeren, sanitair en gemeenschappelijke ruimtes structureel schoon.',
      'We beginnen met een korte intake en een bezoek aan de locatie. Daarna bepalen we samen welke taken hoe vaak terugkomen en op welke momenten we aan de slag gaan. Zo blijft het werk voorspelbaar, ook als uw planning verandert.'
    ],
    included: [
      'Werkplekken, bureaus en vergaderruimtes',
      'Zuigen en dweilen van vloeren',
      'Sanitair en wastafels',
      'Keuken, kantine en pantry',
      'Afvalbakken legen en bijhouden',
      'Deurklinken, schakelaars en contactpunten',
      'Periodieke extra taken in overleg'
    ],
    tags: ['Kantoren', 'Winkels', 'Zorg', 'Onderwijs', 'Horeca', 'Bedrijfspanden'],
    faqs: [
      {
        q: 'Hoe vaak kan HM schoonmaken?',
        a: 'Dat hangt af van uw pand en het gebruik. Dagelijks, meerdere keren per week of periodiek is allemaal mogelijk. We adviseren een frequentie op basis van de intake.'
      },
      {
        q: 'Kunnen jullie buiten openingstijden werken?',
        a: 'Ja. We stemmen de werktijden af, bijvoorbeeld vroeg in de ochtend, na sluitingstijd of in het weekend, zodat uw bedrijf zo min mogelijk wordt gestoord.'
      },
      {
        q: 'Nemen jullie eigen materialen en middelen mee?',
        a: 'Ja, we werken met onze eigen materialen en middelen. Heeft u specifieke wensen of wilt u bestaande middelen gebruiken? Dat spreken we vooraf af.'
      },
      {
        q: 'Wat kost schoonmaakonderhoud?',
        a: 'De prijs hangt af van de oppervlakte, frequentie, sanitaire voorzieningen en extra taken. Na een intake ontvangt u een heldere offerte zonder verrassingen.'
      }
    ]
  },
  {
    slug: 'glasbewassing',
    name: 'Glasbewassing',
    formValue: 'Glasbewassing',
    image: 'hm-glasbewassing.jpg',
    imageWidth: 720,
    imageHeight: 540,
    imageAlt: 'Medewerkster van HM Schoonmaakdiensten wast een glaswand met een ruitentrekker',
    metaTitle: 'Glasbewassing in Roermond en Midden-Limburg',
    metaDescription: 'Glasbewassing voor ramen, glaswanden en kozijnen. HM werkt veilig en stemt de planning af op uw pand. Vraag een offerte aan.',
    heroTitle: 'Helder glas. Een verzorgde uitstraling.',
    heroIntro: 'Glas vertelt het eerste verhaal van uw pand. HM maakt ramen, glaswanden en kozijnen schoon, veilig en op een moment dat uw bedrijf zo min mogelijk wordt gestoord.',
    sectionTitle: 'Helder glas, van binnen en buiten.',
    paragraphs: [
      'Stof, regen en aanslag zijn direct zichtbaar in glas. Daarom werken we met de juiste materialen en een vaste werkwijze: eerst vuil losmaken, dan grondig afnemen en nawassen, zodat er geen strepen achterblijven.',
      'We bespreken vooraf welke oppervlakken aan de beurt zijn en of er bijzonderheden zijn, zoals glaswanden, hoge ramen of een gevel die extra aandacht nodig heeft. Veiligheid en een nette afwerking staan voorop.'
    ],
    included: [
      'Ramen en glaswanden, binnen en buiten',
      'Kozijnen en dorpels',
      'Glazen deuren en scheidingswanden',
      'Verwijderen van waterstrepen en aanslag',
      'Werk op hoogte met veilige hulpmiddelen',
      'Gevelreiniging in overleg',
      'Afstemming over frequentie en planning'
    ],
    tags: ['Kantoren', 'Winkels', 'Showrooms', 'Horeca', 'Zorg', 'Bedrijfspanden'],
    faqs: [
      {
        q: 'Hoe vaak is glasbewassing nodig?',
        a: 'Voor de meeste bedrijfspanden is vier tot twaalf keer per jaar gebruikelijk. Ligging, weer en uitstraling bepalen de beste frequentie; we adviseren u graag.'
      },
      {
        q: 'Wat gebeurt er bij regen?',
        a: 'Lichte regen is meestal geen probleem. Bij onveilige omstandigheden of harde wind verplaatsen we het werk liever. U hoort dat tijdig van ons.'
      },
      {
        q: 'Doen jullie ook kozijnen en glaswanden?',
        a: 'Ja, we reinigen niet alleen ramen, maar ook kozijnen, dorpels, glazen deuren en scheidingswanden. Gevelreiniging stemmen we per pand af.'
      },
      {
        q: 'Kunnen jullie op hoogte werken?',
        a: 'Voor glas op hoogte bekijken we vooraf welke veilige methode past. Bijzondere hoogtes of bereikbaarheid bespreken we tijdens de intake.'
      }
    ]
  },
  {
    slug: 'vloeronderhoud',
    name: 'Vloeronderhoud',
    formValue: 'Vloeronderhoud',
    image: 'hm-vloeronderhoud.jpg',
    imageWidth: 720,
    imageHeight: 540,
    imageAlt: 'Medewerkster van HM Schoonmaakdiensten dweilt een kantoervloer',
    metaTitle: 'Vloeronderhoud in Roermond en Midden-Limburg',
    metaDescription: 'Dagelijks en periodiek vloeronderhoud, afgestemd op uw vloertype en loopstromen. HM adviseert en verzorgt. Vraag een offerte aan.',
    heroTitle: 'Vloeronderhoud dat uw vloer langer mooi houdt.',
    heroIntro: 'Elke vloer vraagt om een eigen aanpak. HM combineert dagelijks onderhoud met periodieke machinale reiniging, afgestemd op het materiaal en de loopstromen in uw pand.',
    sectionTitle: 'Het juiste onderhoud voor elke vloer.',
    paragraphs: [
      'Van de entree tot de kantine: vloeren krijgen veel te verduren. Regelmatig zuigen en dweilen houdt ze schoon, maar periodiek machinaal onderhoud voorkomt dat vuil en aanslag zich opstapelen.',
      'We kijken naar het vloertype, de intensiteit van het gebruik en de gewenste uitstraling. Op basis daarvan stellen we een onderhoudsplan op dat past bij uw locatie en planning.'
    ],
    included: [
      'Zuigen en dweilen van alle vloeren',
      'Machinaal schrobben en dieptereinigen',
      'Behandeling van randen, hoeken en overgangen',
      'Vlekbehandeling in overleg',
      'Strippen en polijsten waar passend',
      'Onderhoudsadvies per vloertype',
      'Periodieke extra beurten'
    ],
    tags: ['Kantoren', 'Winkels', 'Zorg', 'Onderwijs', 'Horeca', 'Bedrijfspanden'],
    faqs: [
      {
        q: 'Welke vloeren onderhouden jullie?',
        a: 'We onderhouden onder andere vinyl, linoleum, tegel, beton en gladde vloeren. Voor tapijt of bijzondere materialen bekijken we per locatie wat mogelijk is.'
      },
      {
        q: 'Wat is periodiek vloeronderhoud?',
        a: 'Dat is een grondiger behandeling dan de dagelijkse schoonmaak, bijvoorbeeld machinaal schrobben of polijsten. Zo blijft de vloer egaler en gaat hij langer mee.'
      },
      {
        q: 'Moet de vloer lang drogen?',
        a: 'Dat verschilt per materiaal en methode. We stemmen het werk zo af dat uw locatie er zo min mogelijk last van heeft, bijvoorbeeld na sluitingstijd.'
      },
      {
        q: 'Kunnen jullie oude vlekken verwijderen?',
        a: 'We beoordelen de vlek en het vloermateriaal. Veel vlekken zijn goed aan te pakken, maar sommige beschadigingen of verkleuringen zijn niet volledig te herstellen.'
      }
    ]
  },
  {
    slug: 'sanitair-hygiene',
    name: 'Sanitair en hygiëne',
    formValue: 'Sanitair en hygiëne',
    image: 'hm-sanitair-hygiene.jpg',
    imageWidth: 960,
    imageHeight: 720,
    imageAlt: 'Medewerker van HM Schoonmaakdiensten maakt een wastafel schoon in een sanitairruimte',
    metaTitle: 'Sanitair en hygiëne in Roermond en Midden-Limburg',
    metaDescription: 'Schoon sanitair, aangevulde dispensers en extra hygiënerondes waar nodig. HM houdt uw voorzieningen representatief. Vraag een offerte aan.',
    heroTitle: 'Sanitair en hygiëne om op te vertrouwen.',
    heroIntro: 'Schone toiletten en wasruimtes zijn een visitekaartje. HM verzorgt de dagelijkse hygiëne, signaleert aandachtspunten en houdt uw voorzieningen netjes en verzorgd.',
    sectionTitle: 'Hygiëne die vertrouwen geeft.',
    paragraphs: [
      'Sanitair krijgt veel te verduren en valt direct op als het niet klopt. Daarom werken we met vaste routines, passende middelen en extra aandacht voor contactpunten zoals kranen, klinken en dispensers.',
      'We stemmen de frequentie af op het aantal bezoekers en het gebruik van uw pand. Zo blijft het sanitair ook op drukke dagen representatief, zonder dat u er zelf naar om hoeft te kijken.'
    ],
    included: [
      'Toiletten, urinoirs en wastafels',
      'Spiegels, deuren en klinken',
      'Dispensers bijvullen in overleg',
      'Afvalbakken en hygiënische voorzieningen',
      'Behandeling van kalk- en urineaanslag',
      'Extra hygiënerondes in overleg',
      'Signaleren van gebreken'
    ],
    tags: ['Kantoren', 'Zorg', 'Onderwijs', 'Horeca', 'Winkels', 'Bedrijfspanden'],
    faqs: [
      {
        q: 'Hoe vaak moet sanitair worden schoongemaakt?',
        a: 'Dat hangt af van het aantal bezoekers en het gebruik. In veel kantoren is dagelijks of meerdere keren per week nodig; in drukke locaties stemmen we extra rondes af.'
      },
      {
        q: 'Vullen jullie ook dispensers bij?',
        a: 'Ja, in overleg. We kunnen zeep, papier en handdoeken bijhouden en signaleren wanneer de voorraad bijna op is.'
      },
      {
        q: 'Verwijderen jullie kalk en urineaanslag?',
        a: 'Ja, met middelen die passen bij het materiaal. Bij hardnekkige aanslag bespreken we een extra behandeling of een dieptereiniging.'
      },
      {
        q: 'Wat als er een hygiëneprobleem is?',
        a: 'Laat het ons weten. We kijken mee, passen de frequentie of werkwijze aan en plannen zo nodig een extra reiniging.'
      }
    ]
  },
  {
    slug: 'eenmalige-schoonmaak',
    name: 'Eenmalige schoonmaak',
    formValue: 'Eenmalige schoonmaak',
    frequencyPreselect: 'Eenmalig',
    image: 'hm-eenmalige-schoonmaak.jpg',
    imageWidth: 960,
    imageHeight: 720,
    imageAlt: 'Medewerkster van HM Schoonmaakdiensten maakt glas schoon bij een eenmalige schoonmaak',
    metaTitle: 'Eenmalige schoonmaak in Roermond en Midden-Limburg',
    metaDescription: 'Een eenmalige schoonmaak voor een verhuizing, oplevering of grondige schoonmaak. HM plant het werk in op uw moment. Vraag een offerte aan.',
    heroTitle: 'Eenmalige schoonmaak voor een frisse start.',
    heroIntro: 'Voor een verhuizing, oplevering, verbouwing of een grondige schoonmaak op zijn tijd. HM plant het werk in op uw moment en levert een ruimte op die klaar is voor gebruik.',
    sectionTitle: 'Een frisse start, zonder gedoe.',
    paragraphs: [
      'Soms is de gewone schoonmaak niet genoeg. Na een verbouwing, bij een verhuizing of voor een belangrijke opening wilt u dat alles klopt. We pakken dan in één keer de ruimtes aan die extra aandacht nodig hebben.',
      'Samen bepalen we de scope: welke ruimtes, welke werkzaamheden en welk resultaat voor ogen staat. We stemmen materialen, tijden en toegang af, zodat het werk soepel verloopt.'
    ],
    included: [
      'Intensieve schoonmaak van werkplekken',
      'Bouw- en opleverschoonmaak',
      'Keuken, pantry en sanitair',
      'Glas aan de binnenzijde',
      'Vloeren, plinten en contactpunten',
      'Vlekken en achterstallig onderhoud',
      'Afvoer van afval in overleg'
    ],
    tags: ['Verhuizingen', 'Opleveringen', 'Verbouwingen', 'Evenementen', 'Kantoren', 'Bedrijfspanden'],
    faqs: [
      {
        q: 'Hoe snel kunnen jullie starten?',
        a: 'Dat hangt af van de planning en de omvang. Neem contact op; vaak kunnen we binnen enkele dagen schakelen.'
      },
      {
        q: 'Wat kost een eenmalige schoonmaak?',
        a: 'De prijs hangt af van het aantal vierkante meters, de mate van vervuiling en de werkzaamheden. Na een korte intake maken we een heldere offerte.'
      },
      {
        q: 'Kunnen jullie ’s avonds of in het weekend werken?',
        a: 'Ja, in overleg. We plannen het werk zo dat het past bij uw opening, verhuizing of oplevering.'
      },
      {
        q: 'Nemen jullie materialen mee?',
        a: 'Ja, we nemen onze eigen materialen en middelen mee. Heeft u bijzonderheden of een specifiek middel in gedachten? Laat het ons weten.'
      }
    ]
  },
  {
    slug: 'buitenschoonmaak',
    name: 'Buitenschoonmaak',
    formValue: 'Buitenschoonmaak',
    image: 'hm-buitenschoonmaak.jpg',
    imageWidth: 960,
    imageHeight: 720,
    imageAlt: 'Medewerker van HM Schoonmaakdiensten veegt bladeren op een bestrate buitenruimte bij een bedrijfspand',
    metaTitle: 'Buitenschoonmaak in Roermond en Midden-Limburg',
    metaDescription: 'Buitenschoonmaak voor paden, entrees, terrassen en de omgeving van uw pand. HM houdt uw buitenruimte netjes en veilig. Vraag een offerte aan.',
    heroTitle: 'Buitenschoonmaak voor een verzorgde entree.',
    heroIntro: 'De buitenkant is het eerste wat bezoekers zien. HM houdt paden, terrassen en de directe omgeving van uw pand netjes, veilig en uitnodigend.',
    sectionTitle: 'Een verzorgde entree, het hele jaar door.',
    paragraphs: [
      'Bladeren, zwerfafval en vuil bij de entree vallen direct op. Met periodiek buitenonderhoud houdt u de eerste indruk van uw bedrijf op orde en verkleint u de kans op onveilige situaties.',
      'We kijken naar de indeling van het terrein en het gebruik in de verschillende seizoenen. Op basis daarvan spreken we een vaste route en frequentie af, afgestemd op uw locatie.'
    ],
    included: [
      'Vegen van paden en entrees',
      'Verwijderen van bladeren en zwerfafval',
      'Terrassen en buitenmeubilair',
      'Omgeving van afvalcontainers',
      'Onkruid verwijderen in overleg',
      'Controle van putten en roosters',
      'Extra beurten na storm of evenementen'
    ],
    tags: ['Kantoren', 'Bedrijventerreinen', 'Winkels', 'Horeca', 'Zorg', 'Vastgoed'],
    faqs: [
      {
        q: 'Wat valt onder buitenschoonmaak?',
        a: 'Denk aan paden, entrees, terrassen, parkeerplaatsen en de directe omgeving van uw pand. We stellen de taken samen met u vast.'
      },
      {
        q: 'Hoe vaak is buitenonderhoud nodig?',
        a: 'Dat verschilt per seizoen en ligging. In de herfst zijn extra beurten vaak nodig; in rustige periodes kan een vaste frequentie voldoende zijn.'
      },
      {
        q: 'Verwijderen jullie ook onkruid?',
        a: 'Ja, in overleg. We verwijderen onkruid waar dat veilig en verantwoord kan. Chemische bestrijding doen we alleen als dat is toegestaan en afgesproken.'
      },
      {
        q: 'Doen jullie ook gladheidsbestrijding?',
        a: 'Gladheidsbestrijding valt niet standaard onder deze dienst. We kunnen wel bespreken wat er in de winter nodig is voor uw locatie.'
      }
    ]
  }
];

const sharedSteps = [
  ['Kennismaken', 'We bespreken uw locatie, wensen en planning. Vrijblijvend en zonder verplichtingen.'],
  ['Inventariseren', 'We bekijken het pand, meten de ruimtes en stemmen taken en frequentie af.'],
  ['Voorstel op maat', 'U ontvangt een heldere offerte met taken, planning en prijs. Geen verrassingen.'],
  ['Uitvoeren', 'Vaste medewerkers, één aanspreekpunt en korte lijnen. Bijsturen kan altijd.']
];

function sprite() {
  return `<svg xmlns="http://www.w3.org/2000/svg" style="display:none" aria-hidden="true" focusable="false">
    <symbol id="i-check" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></symbol>
    <symbol id="i-arrow" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></symbol>
    <symbol id="i-phone" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></symbol>
    <symbol id="i-mail" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></symbol>
    <symbol id="i-pin" viewBox="0 0 24 24"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></symbol>
    <symbol id="i-close" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></symbol>
    <symbol id="i-menu" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></symbol>
    <symbol id="i-chat" viewBox="0 0 24 24"><path d="M21 11.5a8.4 8.4 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7a8.5 8.5 0 1 1 16.1-3.8Z"/><path d="M8.5 10.5c.4 2.6 1.9 4.1 4.5 4.5"/></symbol>
    <symbol id="i-copy" viewBox="0 0 24 24"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></symbol>
  </svg>`;
}

function header(options = {}) {
  const ctaHref = options.ctaHref || '#offerte';
  const ctaLabel = options.ctaLabel || 'Offerte aanvragen';
  return `<header class="site-header" id="site-header">
    <div class="shell header__inner">
      <a class="brand" href="index.html" aria-label="HM Schoonmaakdiensten — naar de homepage">
        <img class="brand__mark" src="assets/img/hm-mark-purple.png" width="1217" height="718" alt="">
        <span class="brand__text"><span class="brand__tag">SCHOONMAAKDIENSTEN</span></span>
      </a>

      <nav class="nav" aria-label="Hoofdnavigatie">
        <a href="diensten.html">Diensten</a>
        <a href="sectoren.html">Sectoren</a>
        <a href="over-ons.html">Over ons</a>
        <a href="werken-bij.html">Werken bij HM</a>
        <a href="contact.html">Contact</a>
      </nav>

      <div class="header__actions">
        <a class="header__phone" href="${phoneHref}">
          <svg class="icon icon--sm" aria-hidden="true"><use href="#i-phone"/></svg>
          ${phone}
        </a>
        <a class="btn btn--primary btn--sm" href="${ctaHref}" data-open-quote aria-haspopup="dialog">${ctaLabel}</a>
        <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-nav" aria-label="Menu openen" id="menu-toggle">
          <svg class="icon icon--lg" aria-hidden="true"><use href="#i-menu"/></svg>
        </button>
      </div>
    </div>

    <div class="mobile-nav" id="mobile-nav" hidden>
      <div class="shell">
        <nav aria-label="Mobiele navigatie">
          <a class="mobile-nav__link" href="diensten.html">Diensten</a>
          <a class="mobile-nav__link" href="sectoren.html">Sectoren</a>
          <a class="mobile-nav__link" href="over-ons.html">Over ons</a>
          <a class="mobile-nav__link" href="werken-bij.html">Werken bij HM</a>
          <a class="mobile-nav__link" href="contact.html">Contact</a>
        </nav>
        <div class="mobile-nav__actions">
          <a class="btn btn--primary btn--full" href="${ctaHref}" data-open-quote aria-haspopup="dialog">${ctaLabel}</a>
        </div>
        <div class="mobile-nav__contact">
          <a href="${phoneHref}">${phone}</a>
          <a href="mailto:${email}">${email}</a>
        </div>
      </div>
    </div>
  </header>`;
}

function footer() {
  return `<footer class="footer" id="contact">
    <div class="footer__ambient" aria-hidden="true">
      <svg viewBox="0 0 1440 700" preserveAspectRatio="xMidYMid slice" focusable="false">
        <defs>
          <linearGradient id="footer-grad-a" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#2b2a4d"/>
            <stop offset=".55" stop-color="#5b4a86"/>
            <stop offset="1" stop-color="#7c65ab"/>
          </linearGradient>
          <linearGradient id="footer-grad-b" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#002464" stop-opacity=".7"/>
            <stop offset="1" stop-color="#7c65ab" stop-opacity="0"/>
          </linearGradient>
          <radialGradient id="footer-grad-c" cx=".2" cy=".8" r=".8">
            <stop offset="0" stop-color="#7c65ab" stop-opacity=".55"/>
            <stop offset="1" stop-color="#7c65ab" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <rect width="1440" height="700" fill="#1d283e"/>
        <path class="footer__blob footer__blob--a" d="M1020 -120C1290 -160 1560 60 1520 380C1480 700 1200 860 900 800C600 740 520 540 620 320C700 140 780 -80 1020 -120Z" fill="url(#footer-grad-a)"/>
        <path class="footer__blob footer__blob--b" d="M-140 300C140 180 400 340 680 300C960 260 1160 80 1580 160L1580 560C1220 500 980 660 700 700C420 740 160 600 -140 660Z" fill="#7c65ab" opacity=".35"/>
        <path class="footer__blob footer__blob--c" d="M-120 520C160 420 380 540 620 600C860 660 1080 780 1180 960L-120 960Z" fill="url(#footer-grad-b)" opacity=".55"/>
        <rect width="1440" height="700" fill="url(#footer-grad-c)"/>
      </svg>
    </div>

    <div class="footer__links">
      <div class="shell">
        <div class="footer__main">
          <div class="footer__brand">
            <a class="brand" href="index.html" aria-label="HM Schoonmaakdiensten — naar de homepage">
              <img class="brand__mark" src="assets/img/hm-mark-purple.png" width="1217" height="718" alt="">
              <span class="brand__text"><span class="brand__tag">SCHOONMAAKDIENSTEN</span></span>
            </a>
            <p>Schoonmaakdiensten voor bedrijven, winkels en organisaties in Roermond, Limburg en Noord-Brabant.</p>
            <a class="btn btn--primary footer__cta" href="https://wa.me/31639140047?text=Hallo%20HM%20Schoonmaakdiensten%2C%20ik%20wil%20graag%20een%20offerte%20aanvragen." target="_blank" rel="noopener">
              Stuur een WhatsApp-bericht
              <svg class="icon icon--sm" aria-hidden="true"><use href="#i-arrow"/></svg>
            </a>
          </div>
          <div>
            <h3>Navigatie</h3>
            <ul>
              <li><a href="diensten.html">Diensten</a></li>
              <li><a href="sectoren.html">Sectoren</a></li>
              <li><a href="over-ons.html">Over ons</a></li>
              <li><a href="onze-belofte.html">Onze belofte</a></li>
              <li><a href="werkgebied.html">Werkgebied</a></li>
              <li><a href="werken-bij.html">Werken bij HM</a></li>
              <li><a href="contact.html">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3>Contact</h3>
            <ul class="footer__contact">
              <li><svg class="icon" aria-hidden="true"><use href="#i-phone"/></svg><a href="${phoneHref}">${phone}</a></li>
              <li><svg class="icon" aria-hidden="true"><use href="#i-mail"/></svg><a href="mailto:${email}">${email}</a></li>
              <li><svg class="icon" aria-hidden="true"><use href="#i-pin"/></svg><span>Pastoor Zandersstraat 42<br>6071 VC Swalmen</span></li>
            </ul>
            <p class="footer__small">Werkgebied: Limburg en Noord-Brabant<br>KvK 91847370 · BTW NL004919702B54</p>
          </div>
        </div>
      </div>
    </div>

    <div class="footer__wave" aria-hidden="true">
      <svg viewBox="0 0 1440 360" preserveAspectRatio="none" focusable="false">
        <path class="footer__wave-back" d="M0 0H1440V250C1270 340 1110 358 930 338C750 318 630 240 450 248C290 255 140 312 0 358Z"/>
        <path class="footer__wave-front" d="M0 0H1440V220C1270 310 1110 340 930 310C750 280 630 200 450 208C290 215 140 282 0 342Z"/>
      </svg>
    </div>

    <div class="footer__middle">
      <div class="shell footer__middle-inner">
        <a class="footer__logo" href="index.html" aria-label="HM Schoonmaakdiensten — naar de homepage">
          <img src="assets/img/hm-logo-white.png" width="1456" height="839" alt="">
        </a>
        <p>Een schone omgeving. Een beter resultaat.</p>
        <a class="footer__to-top" href="#top">
          Terug naar boven
          <svg class="icon icon--sm" aria-hidden="true" style="transform:rotate(-90deg)"><use href="#i-arrow"/></svg>
        </a>
      </div>
    </div>

    <div class="footer__bottom">
      <div class="shell footer__bottom-inner">
        <span>© <span id="year">2026</span> HM Schoonmaakdiensten. Alle rechten voorbehouden.</span>
        <div class="footer__legal">
          <button type="button" data-open-privacy>Privacyverklaring</button>
          <a href="mailto:${email}?subject=Algemene%20voorwaarden">Algemene voorwaarden op aanvraag</a>
        </div>
      </div>
    </div>
  </footer>

  <dialog class="privacy-dialog" id="privacy-dialog" aria-labelledby="privacy-title">
    <div class="dialog__head">
      <h2 id="privacy-title">Privacyverklaring</h2>
      <button class="icon-btn" type="button" data-close-dialog aria-label="Sluiten">
        <svg class="icon" aria-hidden="true"><use href="#i-close"/></svg>
      </button>
    </div>
    <div class="dialog__body">
      <p class="dialog__updated">Laatst bijgewerkt: november 2026</p>
      <p>HM Schoonmaakdiensten is gevestigd aan de Pastoor Zandersstraat 42, 6071 VC Swalmen (KvK 91847370, btw NL004919702B54) en verwerkt persoonsgegevens die u zelf verstrekt via de offerteformulieren op deze website, per e-mail, telefoon of WhatsApp.</p>
      <h3>Welke gegevens verwerken we?</h3>
      <ul>
        <li>Naam, bedrijfsnaam en contactgegevens, zoals telefoonnummer, e-mailadres, plaats en postcode.</li>
        <li>De inhoud van uw bericht of aanvraag.</li>
      </ul>
      <h3>Waarvoor gebruiken we de gegevens?</h3>
      <p>Alleen om uw aanvraag te behandelen, contact op te nemen en een voorstel op maat te doen.</p>
      <h3>Hoe lang bewaren we de gegevens?</h3>
      <p>Niet langer dan nodig is voor de aanvraag en de daaruit volgende samenwerking.</p>
      <h3>Delen met anderen</h3>
      <p>We verkopen uw gegevens niet en delen ze alleen met partijen die nodig zijn voor de uitvoering of wanneer de wet dat verplicht.</p>
      <h3>Uw rechten</h3>
      <p>U kunt vragen om inzage, correctie of verwijdering via <a href="mailto:${email}">${email}</a> of <a href="${phoneHref}">${phone}</a>.</p>
      <h3>Cookies en formulieren</h3>
      <p>Deze website gebruikt geen trackingcookies. De offerteformulieren openen WhatsApp of uw e-mailprogramma; u kunt ook bellen of mailen.</p>
    </div>
  </dialog>`;
}

function formOptions() {
  const values = [
    'Schoonmaakonderhoud',
    'Glasbewassing',
    'Vloeronderhoud',
    'Sanitair en hygiëne',
    'Eenmalige schoonmaak',
    'Buitenschoonmaak',
    'Meerdere diensten',
    'Weet ik nog niet'
  ];
  return values;
}

function quoteSection(service, options = {}) {
  const selectedSector = options.selectedSector || '';
  const serviceHint = options.serviceHint || 'De gekozen dienst staat alvast voor u klaar.';
  const serviceOptions = formOptions().map((value) => {
    const checked = value === service.formValue ? ' checked' : '';
    return `<label class="option"><input type="radio" name="dienst" value="${value}"${checked}><span class="option__dot" aria-hidden="true"></span><span>${value}</span></label>`;
  }).join('\n                ');

  const sectorOptions = ['Kantoor', 'Retail', 'Zorg', 'Onderwijs', 'Horeca', 'Industrie', 'Vastgoed', 'Anders'].map((value) => {
    const checked = value === selectedSector ? ' checked' : '';
    return `<label class="option"><input type="radio" name="sector" value="${value}"${checked}><span class="option__dot" aria-hidden="true"></span><span>${value}</span></label>`;
  }).join('\n                ');

  const frequencyOptions = ['Dagelijks', 'Meerdere keren per week', 'Wekelijks', 'Maandelijks', 'Eenmalig'].map((value) => {
    const checked = value === service.frequencyPreselect ? ' checked' : '';
    return `<label class="option"><input type="radio" name="frequentie" value="${value}"${checked}><span class="option__dot" aria-hidden="true"></span><span>${value}</span></label>`;
  }).join('\n                  ');

  return `<section class="quote quote--service" id="offerte" aria-labelledby="offerte-title">
      <div class="shell quote__inner">
        <div class="quote__panel">
          <div class="quote__panel-head">
            <h2 id="offerte-title">Vraag een offerte aan</h2>
            <p>Vertel ons kort over uw locatie en wensen. In vier korte stappen ontvangen we alle informatie voor een voorstel op maat.</p>
          </div>

          <noscript>
            <p class="quote__form-note">JavaScript staat uit. Bel <a href="${phoneHref}">${phone}</a> of mail <a href="mailto:${email}">${email}</a> voor een offerte.</p>
          </noscript>

          <form id="quote-form" novalidate>
            <div class="stepper" id="quote-stepper" aria-label="Voortgang offerteaanvraag">
              <div class="stepper__step is-active" data-step-indicator="1">
                <div class="stepper__bar"><span></span></div>
                <span class="stepper__label">Situatie</span>
              </div>
              <div class="stepper__step" data-step-indicator="2">
                <div class="stepper__bar"><span></span></div>
                <span class="stepper__label">Dienst</span>
              </div>
              <div class="stepper__step" data-step-indicator="3">
                <div class="stepper__bar"><span></span></div>
                <span class="stepper__label">Planning</span>
              </div>
              <div class="stepper__step" data-step-indicator="4">
                <div class="stepper__bar"><span></span></div>
                <span class="stepper__label">Contact</span>
              </div>
            </div>

            <div class="form-step" data-step="1" tabindex="-1">
              <h3>Waar zoekt u schoonmaak voor?</h3>
              <p class="form-hint">Kies de sector die het beste past.</p>
              <div class="option-grid" role="radiogroup" aria-label="Sector">
                ${sectorOptions}
              </div>
              <p class="form-error" data-error="1" role="alert"></p>
            </div>

            <div class="form-step" data-step="2" tabindex="-1" hidden>
              <h3>Welke dienst heeft u nodig?</h3>
              <p class="form-hint">${serviceHint}</p>
              <div class="option-grid" role="radiogroup" aria-label="Dienst">
                ${serviceOptions}
              </div>
              <p class="form-error" data-error="2" role="alert"></p>
            </div>

            <div class="form-step" data-step="3" tabindex="-1" hidden>
              <h3>Hoe vaak en wanneer?</h3>
              <p class="form-hint">Zo kunnen we de planning en het voorstel goed afstemmen.</p>
              <div class="option-group">
                <p class="option-group__title">Frequentie</p>
                <div class="option-grid" role="radiogroup" aria-label="Frequentie">
                  ${frequencyOptions}
                </div>
              </div>
              <div class="option-group">
                <p class="option-group__title">Gewenste start</p>
                <div class="option-grid" role="radiogroup" aria-label="Gewenste start">
                  <label class="option"><input type="radio" name="start" value="Zo snel mogelijk"><span class="option__dot" aria-hidden="true"></span><span>Zo snel mogelijk</span></label>
                  <label class="option"><input type="radio" name="start" value="Binnen een maand"><span class="option__dot" aria-hidden="true"></span><span>Binnen een maand</span></label>
                  <label class="option"><input type="radio" name="start" value="Later of in overleg"><span class="option__dot" aria-hidden="true"></span><span>Later / in overleg</span></label>
                </div>
              </div>
              <p class="form-error" data-error="3" role="alert"></p>
            </div>

            <div class="form-step" data-step="4" tabindex="-1" hidden>
              <h3>Waar mogen we u bereiken?</h3>
              <p class="form-hint">Vul minimaal een telefoonnummer of e-mailadres in.</p>
              <div class="form-grid">
                <div class="field">
                  <label for="q-naam">Naam *</label>
                  <input id="q-naam" name="naam" type="text" autocomplete="name" required>
                </div>
                <div class="field">
                  <label for="q-bedrijf">Bedrijfsnaam</label>
                  <input id="q-bedrijf" name="bedrijf" type="text" autocomplete="organization">
                </div>
                <div class="field">
                  <label for="q-telefoon">Telefoon</label>
                  <input id="q-telefoon" name="telefoon" type="tel" autocomplete="tel">
                </div>
                <div class="field">
                  <label for="q-email">E-mail</label>
                  <input id="q-email" name="email" type="email" autocomplete="email">
                </div>
                <div class="field">
                  <label for="q-plaats">Plaats *</label>
                  <input id="q-plaats" name="plaats" type="text" autocomplete="address-level2" required>
                </div>
                <div class="field">
                  <label for="q-postcode">Postcode</label>
                  <input id="q-postcode" name="postcode" type="text" autocomplete="postal-code">
                </div>
                <div class="field field--full">
                  <label for="q-toelichting">Toelichting</label>
                  <textarea id="q-toelichting" name="toelichting" rows="3" placeholder="Bijvoorbeeld: aantal ruimtes of vierkante meters"></textarea>
                </div>
              </div>
              <p class="form-error" data-error="4" role="alert"></p>
            </div>

            <div class="form-actions">
              <button class="btn btn--text" type="button" id="quote-back" hidden>
                <svg class="icon icon--sm" aria-hidden="true" style="transform:rotate(180deg)"><use href="#i-arrow"/></svg>
                Terug
              </button>
              <div class="form-actions__right">
                <button class="btn btn--primary" type="button" id="quote-next">
                  Volgende
                  <svg class="icon icon--sm" aria-hidden="true"><use href="#i-arrow"/></svg>
                </button>
                <button class="btn btn--primary" type="submit" id="quote-submit" hidden>
                  Bekijk aanvraag
                  <svg class="icon icon--sm" aria-hidden="true"><use href="#i-arrow"/></svg>
                </button>
              </div>
            </div>
            <p class="quote__form-note">Uw gegevens worden alleen gebruikt om uw aanvraag te behandelen. Bekijk de <button class="text-link" type="button" data-open-privacy>privacyverklaring</button>.</p>
          </form>

          <div class="quote-summary" id="quote-summary" hidden aria-live="polite">
            <span class="kicker">Uw aanvraag</span>
            <h3>Controleer en verstuur</h3>
            <p>Uw aanvraag is nog niet verzonden. Kies hieronder hoe u deze wilt delen.</p>
            <dl class="summary-list" id="summary-list"></dl>
            <div class="summary__actions">
              <a class="btn btn--primary" id="send-whatsapp" href="https://wa.me/31639140047" target="_blank" rel="noopener">
                Verstuur via WhatsApp
                <svg class="icon icon--sm" aria-hidden="true"><use href="#i-chat"/></svg>
              </a>
              <a class="btn btn--line" id="send-email" href="mailto:${email}">
                Verstuur via e-mail
                <svg class="icon icon--sm" aria-hidden="true"><use href="#i-mail"/></svg>
              </a>
              <button class="btn btn--line" type="button" id="copy-request">
                <svg class="icon icon--sm" aria-hidden="true"><use href="#i-copy"/></svg>
                Kopieer aanvraag
              </button>
              <button class="btn btn--text" type="button" id="edit-request">Aanpassen</button>
            </div>
            <p class="copy-note" id="copy-status" role="status"></p>
            <p class="copy-note">Liever direct contact? Bel <a href="${phoneHref}">${phone}</a> of mail <a href="mailto:${email}">${email}</a>.</p>
          </div>
        </div>
      </div>
    </section>`;
}

function page(service) {
  const url = `${baseUrl}/${service.slug}.html`;
  const otherLinks = services
    .filter((other) => other.slug !== service.slug)
    .map((other) => `<a class="other-link" href="${other.slug}.html"><span>${other.name}</span><svg class="icon" aria-hidden="true"><use href="#i-arrow"/></svg></a>`)
    .join('\n          ');

  const included = service.included
    .map((item) => `<li><svg class="icon" aria-hidden="true"><use href="#i-check"/></svg><span>${item}</span></li>`)
    .join('\n              ');

  const faqs = service.faqs
    .map((faq, index) => `<details class="faq-item"${index === 0 ? ' open' : ''}>
                <summary>${faq.q}</summary>
                <p>${faq.a}</p>
              </details>`)
    .join('\n              ');

  const paragraphs = service.paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join('\n          ');
  const tags = service.tags.map((tag) => `<span class="service-tag">${tag}</span>`).join('\n          ');

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: service.name,
        serviceType: service.name,
        description: service.metaDescription,
        url,
        areaServed: ['Roermond', 'Venray', 'Weert', 'Venlo', 'Sittard-Geleen', 'Heerlen', 'Maastricht', 'Eindhoven', "'s-Hertogenbosch", 'Tilburg', 'Breda', 'Limburg', 'Noord-Brabant'],
        provider: {
          '@type': 'LocalBusiness',
          name: 'HM Schoonmaakdiensten',
          telephone: '+31639140047',
          email,
          url: `${baseUrl}/`
        }
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${baseUrl}/` },
          { '@type': 'ListItem', position: 2, name: 'Diensten', item: `${baseUrl}/#diensten` },
          { '@type': 'ListItem', position: 3, name: service.name, item: url }
        ]
      }
    ]
  };

  return `<!doctype html>
<html lang="nl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta name="claude:viewport-fit-sides" content="cover">
  <title>${service.metaTitle} | HM Schoonmaakdiensten</title>
  <meta name="description" content="${service.metaDescription}">
  <meta name="theme-color" content="#ffffff">
  <link rel="canonical" href="${url}">

  <meta property="og:type" content="website">
  <meta property="og:locale" content="nl_NL">
  <meta property="og:site_name" content="HM Schoonmaakdiensten">
  <meta property="og:title" content="${service.metaTitle} | HM Schoonmaakdiensten">
  <meta property="og:description" content="${service.metaDescription}">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${baseUrl}/assets/img/${service.image}">
  <meta property="og:image:width" content="${service.imageWidth}">
  <meta property="og:image:height" content="${service.imageHeight}">
  <meta property="og:image:alt" content="${service.imageAlt}">
  <meta name="twitter:card" content="summary_large_image">

  <link rel="icon" href="assets/img/favicon-purple.png" type="image/png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800&display=swap">
  <link rel="stylesheet" href="assets/css/style.css">
  <link rel="stylesheet" href="assets/css/dienstpagina.css">

  <script type="application/ld+json">
${JSON.stringify(structuredData, null, 2)}
  </script>
</head>
<body class="page-dienst">

  <a class="skip-link" href="#main">Direct naar de inhoud</a>

  ${sprite()}

  ${header()}

  <main id="main">
    <section class="service-hero" id="top" aria-labelledby="service-title">
      <div class="shell">
        <nav class="breadcrumb breadcrumb--light" aria-label="Kruimelpad">
          <a href="index.html">Home</a>
          <span class="breadcrumb__sep" aria-hidden="true">/</span>
          <a href="diensten.html">Diensten</a>
          <span class="breadcrumb__sep" aria-hidden="true">/</span>
          <span aria-current="page">${service.name}</span>
        </nav>

        <div class="service-hero__grid">
          <div class="service-hero__content">
            <p class="kicker kicker--light">${service.name}</p>
            <h1 class="service-hero__title" id="service-title">${service.heroTitle}</h1>
            <p class="service-hero__intro">${service.heroIntro}</p>
            <div class="service-hero__actions">
              <a class="btn btn--primary" href="#offerte">
                Vraag een offerte aan
                <svg class="icon icon--sm" aria-hidden="true"><use href="#i-arrow"/></svg>
              </a>
              <a class="btn btn--light" href="${phoneHref}">
                <svg class="icon icon--sm" aria-hidden="true"><use href="#i-phone"/></svg>
                Bel ${phone}
              </a>
            </div>
            <div class="service-hero__trust">
              <span><svg class="icon" aria-hidden="true"><use href="#i-check"/></svg>Vrijblijvende intake</span>
              <span><svg class="icon" aria-hidden="true"><use href="#i-check"/></svg>Vast aanspreekpunt</span>
              <span><svg class="icon" aria-hidden="true"><use href="#i-check"/></svg>Afspraken die kloppen</span>
            </div>
          </div>

          <figure class="service-hero__media">
            <img src="assets/img/${service.image}" width="${service.imageWidth}" height="${service.imageHeight}" alt="${service.imageAlt}" fetchpriority="high">
            <figcaption class="service-hero__badge">
              <svg class="icon" aria-hidden="true"><use href="#i-check"/></svg>
              Vaste gezichten op locatie
            </figcaption>
          </figure>
        </div>
      </div>
    </section>

    <section class="service-section service-section--white" aria-labelledby="wat-title">
      <div class="shell service-split">
        <div class="service-copy">
          <p class="kicker">In de praktijk</p>
          <h2 class="service-section__title" id="wat-title">${service.sectionTitle}</h2>
          ${paragraphs}
          <p class="service-tags-label">Past bij</p>
          <div class="service-tags">
            ${tags}
          </div>
        </div>
        <aside class="service-included" aria-labelledby="included-title">
          <p class="kicker">Inbegrepen</p>
          <h3 id="included-title">Wat u van ons mag verwachten</h3>
          <ul class="check-list">
              ${included}
          </ul>
          <p class="service-note">Elke locatie is anders. Taken, frequentie en materialen stemmen we samen af.</p>
        </aside>
      </div>
    </section>

    <section class="service-section service-section--tint" aria-labelledby="process-title">
      <div class="shell">
        <div class="service-section__head">
          <p class="kicker">Werkwijze</p>
          <h2 class="service-section__title" id="process-title">Van kennismaking tot vaste uitvoering.</h2>
          <p class="service-section__lead">We houden het overzichtelijk: één aanspreekpunt, duidelijke afspraken en een planning die past.</p>
        </div>
        <div class="process-grid">
          ${sharedSteps.map((step, index) => `<article class="process-step">
            <span class="process-step__num">${String(index + 1).padStart(2, '0')}</span>
            <h3>${step[0]}</h3>
            <p>${step[1]}</p>
          </article>`).join('\n          ')}
        </div>
      </div>
    </section>

    <section class="service-section service-section--white" aria-labelledby="faq-title">
      <div class="shell faq-grid">
        <div class="faq-intro">
          <p class="kicker">Veelgestelde vragen</p>
          <h2 class="service-section__title" id="faq-title">Goed om te weten.</h2>
          <p class="service-section__lead">Staat uw vraag er niet tussen? Stel hem via het formulier of bel ons. We denken graag met u mee.</p>
          <p class="faq-help">Liever direct contact? Bel <a href="${phoneHref}">${phone}</a> of mail <a href="mailto:${email}">${email}</a>.</p>
        </div>
        <div class="faq-list">
              ${faqs}
        </div>
      </div>
    </section>

    <section class="other-services" aria-labelledby="other-title">
      <div class="shell">
        <p class="kicker">Ook interessant</p>
        <h2 class="service-section__title" id="other-title">Meer diensten van HM.</h2>
        <div class="other-grid">
          ${otherLinks}
        </div>
      </div>
    </section>

    ${quoteSection(service)}
  </main>

  ${footer()}

  <script src="assets/js/site.js" defer></script>
</body>
</html>
`;
}

if (require.main === module) {
  services.forEach((service) => {
    const file = path.join(root, `${service.slug}.html`);
    fs.writeFileSync(file, page(service), 'utf8');
    console.log(`geschreven: ${service.slug}.html`);
  });

  console.log(`\n${services.length} dienstpagina's bijgewerkt.`);
}

module.exports = {
  baseUrl,
  phone,
  phoneHref,
  email,
  services,
  sprite,
  header,
  footer,
  quoteSection
};
