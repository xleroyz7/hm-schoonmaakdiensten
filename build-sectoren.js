/* =========================================================
   Bouwt de zes sectorpagina's van HM Schoonmaakdiensten.
   Uitvoeren vanuit de projectmap: node build-sectoren.js
   ========================================================= */

const fs = require('fs');
const path = require('path');
const {
  baseUrl,
  phone,
  phoneHref,
  email,
  services,
  sprite,
  header,
  footer,
  quoteSection
} = require('./build-diensten.js');

const root = __dirname;

const sectors = [
  {
    slug: 'kantoren-bedrijfspanden',
    name: 'Kantoren & bedrijfspanden',
    formSector: 'Kantoor',
    image: 'hm-schoonmaakonderhoud.jpg',
    imageWidth: 960,
    imageHeight: 720,
    imageAlt: 'Medewerker van HM Schoonmaakdiensten maakt een bureau schoon met een microvezeldoek',
    metaTitle: 'Schoonmaak voor kantoren en bedrijfspanden',
    metaDescription: 'Schoonmaak voor kantoren en bedrijfspanden in Roermond en Midden-Limburg. Vaste gezichten, flexibele tijden en een verzorgde werkplek. Vraag een offerte aan.',
    heroTitle: 'Schoonmaak voor kantoren en bedrijfspanden.',
    heroIntro: 'Een representatief kantoor vraagt om schoonmaak die past bij het gebruik, de openingstijden en de mensen die er werken. HM zorgt voor een vaste routine en een aanspreekpunt dat meedenkt.',
    sectionTitle: 'Een werkplek waar mensen graag binnenkomen.',
    paragraphs: [
      'Van de entree en vergaderruimtes tot keuken en sanitair: uw pand laat zien wie u bent. HM houdt de ruimtes die ertoe doen schoon en verzorgd, zonder dat uw team erop hoeft te wachten.',
      'We werken op tijden die bij uw organisatie passen en stemmen taken af op het aantal werkplekken, bezoekers en gedeelde voorzieningen. Zo blijft de schoonmaak voorspelbaar en zichtbaar.'
    ],
    included: [
      'Werkplekken en vergaderruimtes',
      'Keuken, pantry en koffiehoeken',
      'Sanitair en wastafels',
      'Vloeren en entrees',
      'Afvalbakken en contactpunten',
      'Glas aan de binnenzijde',
      'Flexibele schoonmaaktijden'
    ],
    relevant: ['schoonmaakonderhoud', 'glasbewassing', 'vloeronderhoud'],
    faqs: [
      ['Kunnen jullie buiten kantooruren schoonmaken?', 'Ja. We stemmen de tijden af, bijvoorbeeld vroeg in de ochtend, na kantoortijd of in het weekend. Zo merkt uw team zo min mogelijk van het werk.'],
      ['Werken jullie met vaste medewerkers?', 'We streven naar vaste gezichten op locatie. Zo kennen onze medewerkers uw pand, afspraken en gewoontes en hoeft u niet steeds opnieuw uit te leggen wat belangrijk is.'],
      ['Hoe vaak is schoonmaak nodig?', 'Dat hangt af van de oppervlakte, het aantal werkplekken en het gebruik. Na een korte intake adviseren we een frequentie die past bij uw organisatie.'],
      ['Nemen jullie ook sanitair en de keuken mee?', 'Ja, sanitair, pantry en keuken kunnen onderdeel zijn van het onderhoud. We spreken de taken en frequentie vooraf duidelijk af.']
    ]
  },
  {
    slug: 'retail-winkels',
    name: 'Retail & winkels',
    formSector: 'Retail',
    image: 'hm-glasbewassing.jpg',
    imageWidth: 720,
    imageHeight: 540,
    imageAlt: 'Medewerkster van HM Schoonmaakdiensten wast een glaswand met een ruitentrekker',
    metaTitle: 'Schoonmaak voor retail en winkels',
    metaDescription: 'Schoonmaak voor winkels en retail in Roermond en Midden-Limburg. Verzorgde klantroutes, glas en sanitair, afgestemd op uw openingstijden. Vraag een offerte aan.',
    heroTitle: 'Schoonmaak voor retail en winkels.',
    heroIntro: 'Een schone winkel is onderdeel van de eerste indruk. HM stemt de schoonmaak af op openingstijden, loopstromen en piekmomenten, zodat klanten altijd een verzorgde winkel binnenkomen.',
    sectionTitle: 'Een winkel die er altijd verzorgd uitziet.',
    paragraphs: [
      'Etalages, spiegels, vloeren en pashokjes vallen direct op. We houden de klantroute netjes en zorgen dat drukke zones, ingangen en sanitaire voorzieningen op tijd aandacht krijgen.',
      'We plannen voor of na openingstijd, of op rustige momenten. Zo blijft de winkel draaien en ziet uw team er geen extra taak bij.'
    ],
    included: [
      'Vloeren en ingangen',
      'Etalages, spiegels en glas',
      'Pashokjes en klantroutes',
      'Kassa, balie en contactpunten',
      'Sanitair en personeelsruimtes',
      'Afval en verpakkingen',
      'Schoonmaak voor of na sluitingstijd'
    ],
    relevant: ['schoonmaakonderhoud', 'glasbewassing', 'buitenschoonmaak'],
    faqs: [
      ['Kunnen jullie voor openingstijd schoonmaken?', 'Ja. We plannen het werk voor opening, na sluiting of op rustige momenten, zodat klanten en medewerkers er zo min mogelijk van merken.'],
      ['Doen jullie ook etalages en glaspuien?', 'Ja, glas en etalages kunnen worden meegenomen. Voor de buitenkant stemmen we af met onze glasbewassing en de bereikbaarheid van de puien.'],
      ['Kunnen jullie meerdere vestigingen onderhouden?', 'Ja, meerdere locaties zijn mogelijk. We maken per vestiging duidelijke afspraken over taken, tijden en het aanspreekpunt.'],
      ['Is schoonmaak in het weekend mogelijk?', 'Ja, in overleg. We kijken naar uw openingstijden en de drukste momenten om een passende planning te maken.']
    ]
  },
  {
    slug: 'zorg-welzijn',
    name: 'Zorg & welzijn',
    formSector: 'Zorg',
    image: 'hm-sanitair-hygiene.jpg',
    imageWidth: 960,
    imageHeight: 720,
    imageAlt: 'Medewerker van HM Schoonmaakdiensten maakt een wastafel schoon in een sanitairruimte',
    metaTitle: 'Schoonmaak voor zorg en welzijn',
    metaDescription: 'Schoonmaak voor zorg- en welzijnslocaties in Roermond en Midden-Limburg. Hygiënische routines, vaste gezichten en afstemming met uw team. Vraag een offerte aan.',
    heroTitle: 'Schoonmaak voor zorg en welzijn.',
    heroIntro: 'In zorgomgevingen telt hygiëne, rust en betrouwbaarheid. HM werkt met duidelijke routines en aandacht voor contactpunten, zonder de dagelijkse gang van zaken te verstoren.',
    sectionTitle: 'Hygiëne met aandacht voor de mensen.',
    paragraphs: [
      'Sanitair, wastafels en veel aangeraakte oppervlakken vragen om een vaste, zorgvuldige aanpak. We werken met afspraken die passen bij uw locatie en stemmen af met de mensen op de werkvloer.',
      'Onze medewerkers werken discreet en houden rekening met rustmomenten, bezoek en dagritmes. Zo blijft de omgeving schoon zonder dat dit ten koste gaat van de sfeer.'
    ],
    included: [
      'Sanitair en wastafels',
      'Deurklinken en contactpunten',
      'Vloeren en leefruimtes',
      'Keuken en pantry',
      'Afval en hygiënische voorzieningen',
      'Extra rondes in overleg',
      'Afstemming met het zorgteam'
    ],
    relevant: ['sanitair-hygiene', 'schoonmaakonderhoud', 'vloeronderhoud'],
    faqs: [
      ['Hoe gaan jullie om met hygiëne?', 'We werken met vaste routines en extra aandacht voor sanitair en contactpunten. De werkwijze stemmen we af op uw locatie en de afspraken die daar gelden.'],
      ['Werken jullie met vaste gezichten?', 'We zetten waar mogelijk dezelfde medewerkers in. Zo ontstaat vertrouwen en weten zij hoe uw locatie werkt en welke momenten belangrijk zijn.'],
      ['Kunnen jullie buiten bezoekuren schoonmaken?', 'Ja, in overleg. We plannen het werk rond bezoek, maaltijden en andere vaste momenten, zodat de dag zo rustig mogelijk blijft.'],
      ['Wat als er extra hygiëne nodig is?', 'Laat het ons weten. We bespreken extra rondes of een aanvullende reiniging en passen de planning aan waar dat kan.']
    ]
  },
  {
    slug: 'onderwijs-kinderopvang',
    name: 'Onderwijs & kinderopvang',
    formSector: 'Onderwijs',
    image: 'hm-vloeronderhoud.jpg',
    imageWidth: 720,
    imageHeight: 540,
    imageAlt: 'Medewerkster van HM Schoonmaakdiensten dweilt een kantoervloer',
    metaTitle: 'Schoonmaak voor onderwijs en kinderopvang',
    metaDescription: 'Schoonmaak voor scholen en kinderopvang in Roermond en Midden-Limburg. Aandacht voor klaslokalen, sanitair en contactpunten. Vraag een offerte aan.',
    heroTitle: 'Schoonmaak voor onderwijs en kinderopvang.',
    heroIntro: 'Kinderen brengen veel tijd door in klaslokalen en opvangruimtes. HM zorgt voor een schone, veilige omgeving met oog voor contactpunten en drukbezochte ruimtes.',
    sectionTitle: 'Een frisse plek om te leren en te spelen.',
    paragraphs: [
      'Veel handen, veel beweging en weinig tijd tussen de lessen: schoonmaak in het onderwijs vraagt om een praktische routine. We richten ons op klaslokalen, sanitair, vloeren en de plekken die iedereen aanraakt.',
      'We stemmen de werkzaamheden af op de school- of opvangtijden en plannen grotere klussen in vakanties of na sluitingstijd. Zo verstoren we het dagritme zo min mogelijk.'
    ],
    included: [
      'Klaslokalen en speelruimtes',
      'Sanitair en wastafels',
      'Vloeren en trappen',
      'Deurklinken en contactpunten',
      'Keuken en eetruimtes',
      'Afval en hygiëne',
      'Extra schoonmaak in vakanties'
    ],
    relevant: ['schoonmaakonderhoud', 'vloeronderhoud', 'sanitair-hygiene'],
    faqs: [
      ['Kunnen jullie na schooltijd schoonmaken?', 'Ja. We plannen het werk na de les- of opvangtijd, zodat de kinderen en het team zo min mogelijk worden gestoord.'],
      ['Kunnen jullie in de vakanties extra werk doen?', 'Ja, in overleg. In vakantieperiodes is er vaak ruimte voor extra taken of een grondiger aanpak van vloeren en sanitair.'],
      ['Krijgen we vaste medewerkers?', 'We streven naar vaste gezichten op locatie. Dat is prettig voor de kinderen, het team en de afstemming over bijzonderheden.'],
      ['Wat doen jullie op drukke dagen?', 'We kijken naar de drukste ruimtes en momenten. Waar nodig spreken we extra rondes of een aangepaste planning af.']
    ]
  },
  {
    slug: 'hotels-horeca',
    name: 'Hotels & horeca',
    formSector: 'Horeca',
    image: 'hm-team-onderhoud.jpg',
    imageWidth: 960,
    imageHeight: 600,
    imageAlt: 'Twee medewerkers van HM Schoonmaakdiensten in bedrijfskleding in een representatief kantoor',
    metaTitle: 'Schoonmaak voor hotels en horeca',
    metaDescription: 'Schoonmaak voor hotels, restaurants en horeca in Roermond en Midden-Limburg. Werken rond service en openingstijden, met oog voor sanitair en gastbeleving. Vraag een offerte aan.',
    heroTitle: 'Schoonmaak voor hotels en horeca.',
    heroIntro: 'Gasten merken het meteen als een ruimte niet klopt. HM werkt op tijden die passen bij check-in, service en openingstijden, met aandacht voor sanitair, vloeren en contactpunten.',
    sectionTitle: 'Gastvrijheid begint bij een schone ruimte.',
    paragraphs: [
      'Van entree en sanitair tot horecaruimtes en terrassen: de beleving van uw gasten wordt door meer bepaald dan het menu. We houden de plekken die zij zien en aanraken verzorgd.',
      'We plannen voor opening, na sluiting of tussen services. Zo blijft het werk uit het zicht en is de ruimte klaar wanneer de eerste gast binnenkomt.'
    ],
    included: [
      'Entrees en gastenruimtes',
      'Sanitair en wasruimtes',
      'Vloeren en meubilair',
      'Glas en spiegels',
      'Terrassen en buitenterreinen',
      'Afval en contactpunten',
      'Schoonmaak voor of na service'
    ],
    relevant: ['sanitair-hygiene', 'glasbewassing', 'buitenschoonmaak'],
    faqs: [
      ['Kunnen jullie voor opening of na sluiting schoonmaken?', 'Ja. We stemmen de tijden af op uw service, openingstijden en check-inmomenten, zodat gasten er zo min mogelijk van merken.'],
      ['Is schoonmaak in het weekend mogelijk?', 'Ja, in overleg. Voor horeca en hotels is weekendwerk vaak juist noodzakelijk; we bespreken de planning vooraf.'],
      ['Nemen jullie ook het terras mee?', 'Ja, dat kan in overleg. Denk aan vegen, tafels, afval en de entree. We spreken de taken en frequentie per locatie af.'],
      ['Kunnen jullie extra rondes doen bij drukte?', 'Ja, in overleg. We kijken naar piekmomenten en kunnen tijdelijk extra aandacht inplannen voor sanitair en gastenruimtes.']
    ]
  },
  {
    slug: 'industrie-logistiek',
    name: 'Industrie & logistiek',
    formSector: 'Industrie',
    image: 'hm-buitenschoonmaak.jpg',
    imageWidth: 960,
    imageHeight: 720,
    imageAlt: 'Medewerker van HM Schoonmaakdiensten veegt bladeren op een bestrate buitenruimte bij een bedrijfspand',
    metaTitle: 'Schoonmaak voor industrie en logistiek',
    metaDescription: 'Schoonmaak voor productie, magazijnen en logistiek in Roermond en Midden-Limburg. Praktisch, veilig en afgestemd op uw processen. Vraag een offerte aan.',
    heroTitle: 'Schoonmaak voor industrie en logistiek.',
    heroIntro: 'In productie- en logistieke omgevingen moet schoonmaak veilig en praktisch zijn. HM stemt taken af op de bedrijfsprocessen, looppaden en veiligheidsafspraken.',
    sectionTitle: 'Schoon waar het werk doorgaat.',
    paragraphs: [
      'Stof, zand en intensief gebruik vragen om een aanpak die past bij de hal, het terrein en de mensen die er werken. We stemmen de frequentie af op de processen en de momenten waarop ruimte vrij is.',
      'Veiligheid en overlast zijn onderdeel van de afspraken. We werken binnen de geldende instructies en stemmen bijzonderheden vooraf af met de verantwoordelijke op locatie.'
    ],
    included: [
      'Productie- en magazijnvloeren',
      'Kantoren en balies',
      'Sanitair en kantine',
      'Looppaden en gemeenschappelijke ruimtes',
      'Afval en contactpunten',
      'Buiten terrein en entree',
      'Afstemming over veiligheid en tijden'
    ],
    relevant: ['vloeronderhoud', 'schoonmaakonderhoud', 'buitenschoonmaak'],
    faqs: [
      ['Werken jullie volgens de veiligheidsvoorschriften?', 'Ja. We stemmen onze werkzaamheden af op de instructies en toegangsregels van uw locatie. Bijzonderheden bespreken we vooraf met het verantwoordelijke aanspreekpunt.'],
      ['Kunnen jullie buiten productietijden werken?', 'Ja, in overleg. We kijken wanneer ruimtes vrij zijn en plannen het werk zo dat de bedrijfsvoering zo min mogelijk wordt verstoord.'],
      ['Kunnen jullie zware vervuiling aanpakken?', 'Dat bespreken we per situatie. Na een intake of bezichtiging bepalen we welke aanpak en frequentie nodig zijn en welke extra inzet mogelijk is.'],
      ['Doen jullie ook het buitenterrein?', 'Ja, dat kan in overleg. Denk aan de entree, looppaden en de omgeving van afvalcontainers.']
    ]
  }
];

const steps = [
  ['Kennismaken', 'We bespreken uw locatie, wensen en planning. Vrijblijvend en zonder verplichtingen.'],
  ['Inventariseren', 'We bekijken het pand, meten de ruimtes en stemmen taken en frequentie af.'],
  ['Voorstel op maat', 'U ontvangt een heldere offerte met taken, planning en prijs. Geen verrassingen.'],
  ['Uitvoeren', 'Vaste medewerkers, één aanspreekpunt en korte lijnen. Bijsturen kan altijd.']
];

const serviceBySlug = Object.fromEntries(services.map((service) => [service.slug, service]));

function page(sector) {
  const url = `${baseUrl}/${sector.slug}.html`;
  const otherSectors = sectors
    .filter((other) => other.slug !== sector.slug)
    .map((other) => `<a class="other-link" href="${other.slug}.html"><span>${other.name}</span><svg class="icon" aria-hidden="true"><use href="#i-arrow"/></svg></a>`)
    .join('\n          ');

  const relevantServices = sector.relevant
    .map((slug) => serviceBySlug[slug])
    .filter(Boolean)
    .map((service) => `<a class="other-link" href="${service.slug}.html"><span>${service.name}</span><svg class="icon" aria-hidden="true"><use href="#i-arrow"/></svg></a>`)
    .join('\n          ');

  const included = sector.included
    .map((item) => `<li><svg class="icon" aria-hidden="true"><use href="#i-check"/></svg><span>${item}</span></li>`)
    .join('\n              ');

  const faqs = sector.faqs
    .map(([question, answer], index) => `<details class="faq-item"${index === 0 ? ' open' : ''}>
                <summary>${question}</summary>
                <p>${answer}</p>
              </details>`)
    .join('\n              ');

  const paragraphs = sector.paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join('\n          ');

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: `Schoonmaak voor ${sector.name.toLowerCase()}`,
        serviceType: `Schoonmaak voor ${sector.name.toLowerCase()}`,
        description: sector.metaDescription,
        url,
        areaServed: ['Roermond', 'Venray', 'Weert', 'Venlo', 'Sittard-Geleen', 'Heerlen', 'Maastricht', 'Eindhoven', "'s-Hertogenbosch", 'Tilburg', 'Breda', 'Limburg', 'Noord-Brabant'],
        provider: {
          '@type': 'LocalBusiness',
          '@id': `${baseUrl}/#localbusiness`,
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
          { '@type': 'ListItem', position: 2, name: 'Sectoren', item: `${baseUrl}/#sectoren` },
          { '@type': 'ListItem', position: 3, name: sector.name, item: url }
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
  <title>${sector.metaTitle} | HM Schoonmaakdiensten</title>
  <meta name="description" content="${sector.metaDescription}">
  <meta name="robots" content="index,follow,max-image-preview:large">
  <meta name="theme-color" content="#ffffff">
  <link rel="canonical" href="${url}">

  <meta property="og:type" content="website">
  <meta property="og:locale" content="nl_NL">
  <meta property="og:site_name" content="HM Schoonmaakdiensten">
  <meta property="og:title" content="${sector.metaTitle} | HM Schoonmaakdiensten">
  <meta property="og:description" content="${sector.metaDescription}">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${baseUrl}/assets/img/${sector.image}">
  <meta property="og:image:width" content="${sector.imageWidth}">
  <meta property="og:image:height" content="${sector.imageHeight}">
  <meta property="og:image:alt" content="${sector.imageAlt}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${sector.metaTitle} | HM Schoonmaakdiensten">
  <meta name="twitter:description" content="${sector.metaDescription}">
  <meta name="twitter:image" content="${baseUrl}/assets/img/${sector.image}">

  <link rel="icon" href="assets/img/favicon-purple.png" type="image/png">
  <link rel="preload" as="image" href="assets/img/${sector.image}">
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
          <a href="sectoren.html">Sectoren</a>
          <span class="breadcrumb__sep" aria-hidden="true">/</span>
          <span aria-current="page">${sector.name}</span>
        </nav>

        <div class="service-hero__grid">
          <div class="service-hero__content">
            <p class="kicker kicker--light">Sector</p>
            <h1 class="service-hero__title" id="service-title">${sector.heroTitle}</h1>
            <p class="service-hero__intro">${sector.heroIntro}</p>
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
            <img src="assets/img/${sector.image}" width="${sector.imageWidth}" height="${sector.imageHeight}" alt="${sector.imageAlt}" fetchpriority="high">
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
          <p class="kicker">In deze sector</p>
          <h2 class="service-section__title" id="wat-title">${sector.sectionTitle}</h2>
          ${paragraphs}
        </div>
        <aside class="service-included" aria-labelledby="included-title">
          <p class="kicker">Aandachtspunten</p>
          <h3 id="included-title">Waar we op letten</h3>
          <ul class="check-list">
              ${included}
          </ul>
          <p class="service-note">Elke locatie is anders. Taken, frequentie en materialen stemmen we samen af.</p>
        </aside>
      </div>
    </section>

    <section class="other-services" aria-labelledby="sector-services-title">
      <div class="shell">
        <p class="kicker">Diensten</p>
        <h2 class="service-section__title" id="sector-services-title">Diensten die hierbij passen.</h2>
        <div class="other-grid">
          ${relevantServices}
        </div>
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
          ${steps.map((step, index) => `<article class="process-step">
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

    <section class="other-services" aria-labelledby="other-sectors-title">
      <div class="shell">
        <p class="kicker">Andere sectoren</p>
        <h2 class="service-section__title" id="other-sectors-title">Ook voor andere omgevingen.</h2>
        <div class="other-grid">
          ${otherSectors}
        </div>
      </div>
    </section>

    ${quoteSection({ formValue: null }, {
      selectedSector: sector.formSector,
      serviceHint: 'Kies de dienst die het beste past. Meerdere diensten zijn ook mogelijk.'
    })}
  </main>

  ${footer()}

  <script src="assets/js/site.js" defer></script>
</body>
</html>
`;
}

if (require.main === module) {
  sectors.forEach((sector) => {
    const file = path.join(root, `${sector.slug}.html`);
    fs.writeFileSync(file, page(sector), 'utf8');
    console.log(`geschreven: ${sector.slug}.html`);
  });

  console.log(`\n${sectors.length} sectorpagina's bijgewerkt.`);
}

module.exports = { sectors };
