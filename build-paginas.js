/* =========================================================
   Bouwt de algemene pagina's en de eerste lokale SEO-pagina's.
   Uitvoeren vanuit de projectmap: node build-paginas.js
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
const { sectors } = require('./build-sectoren.js');

const root = __dirname;
const serviceBySlug = Object.fromEntries(services.map((service) => [service.slug, service]));

const steps = [
  ['Kennismaken', 'We bespreken uw locatie, wensen en planning. Vrijblijvend en zonder verplichtingen.'],
  ['Inventariseren', 'We bekijken het pand, meten de ruimtes en stemmen taken en frequentie af.'],
  ['Voorstel op maat', 'U ontvangt een heldere offerte met taken, planning en prijs. Geen verrassingen.'],
  ['Uitvoeren', 'Vaste medewerkers, één aanspreekpunt en korte lijnen. Bijsturen kan altijd.']
];

function breadcrumb(items) {
  return `<nav class="breadcrumb breadcrumb--light" aria-label="Kruimelpad">
          ${items.map((item, index) => {
            const isLast = index === items.length - 1;
            const sep = index > 0 ? '<span class="breadcrumb__sep" aria-hidden="true">/</span>' : '';
            return isLast
              ? `${sep}<span aria-current="page">${item.label}</span>`
              : `${sep}<a href="${item.href}">${item.label}</a>`;
          }).join('\n          ')}
        </nav>`;
}

function serviceLinks(slugs) {
  return slugs.map((slug) => {
    const service = serviceBySlug[slug];
    return `<a class="other-link" href="${service.slug}.html"><span>${service.name}</span><svg class="icon" aria-hidden="true"><use href="#i-arrow"/></svg></a>`;
  }).join('\n          ');
}

function sectorLinks(slugs) {
  return slugs.map((slug) => {
    const sector = sectors.find((item) => item.slug === slug);
    return `<a class="other-link" href="${sector.slug}.html"><span>${sector.name}</span><svg class="icon" aria-hidden="true"><use href="#i-arrow"/></svg></a>`;
  }).join('\n          ');
}

function hero({
  crumbs,
  kicker,
  title,
  intro,
  image,
  imageWidth,
  imageHeight,
  imageAlt,
  primaryHref,
  primaryLabel,
  secondaryHref = phoneHref,
  secondaryLabel = `Bel ${phone}`,
  preload = true
}) {
  return `<section class="service-hero" id="top" aria-labelledby="service-title">
      <div class="shell">
        ${breadcrumb(crumbs)}
        <div class="service-hero__grid">
          <div class="service-hero__content">
            <p class="kicker kicker--light">${kicker}</p>
            <h1 class="service-hero__title" id="service-title">${title}</h1>
            <p class="service-hero__intro">${intro}</p>
            <div class="service-hero__actions">
              <a class="btn btn--primary" href="${primaryHref}">
                ${primaryLabel}
                <svg class="icon icon--sm" aria-hidden="true"><use href="#i-arrow"/></svg>
              </a>
              <a class="btn btn--light" href="${secondaryHref}">
                <svg class="icon icon--sm" aria-hidden="true"><use href="${secondaryHref === phoneHref ? '#i-phone' : '#i-chat'}"/></svg>
                ${secondaryLabel}
              </a>
            </div>
            <div class="service-hero__trust">
              <span><svg class="icon" aria-hidden="true"><use href="#i-check"/></svg>Vrijblijvende intake</span>
              <span><svg class="icon" aria-hidden="true"><use href="#i-check"/></svg>Vast aanspreekpunt</span>
              <span><svg class="icon" aria-hidden="true"><use href="#i-check"/></svg>Afspraken die kloppen</span>
            </div>
          </div>
          <figure class="service-hero__media">
            <img src="assets/img/${image}" width="${imageWidth}" height="${imageHeight}" alt="${imageAlt}"${preload ? ' fetchpriority="high"' : ' loading="lazy"'}>
            <figcaption class="service-hero__badge">
              <svg class="icon" aria-hidden="true"><use href="#i-check"/></svg>
              Vaste gezichten op locatie
            </figcaption>
          </figure>
        </div>
      </div>
    </section>`;
}

function splitSection({
  kicker = 'In de praktijk',
  title,
  paragraphs,
  includedKicker = 'Inbegrepen',
  includedTitle,
  included,
  note = 'Elke locatie is anders. Taken, frequentie en materialen stemmen we samen af.',
  tinted = false
}) {
  const list = included.map((item) => `<li><svg class="icon" aria-hidden="true"><use href="#i-check"/></svg><span>${item}</span></li>`).join('\n              ');
  return `<section class="service-section ${tinted ? 'service-section--tint' : 'service-section--white'}">
      <div class="shell service-split">
        <div class="service-copy">
          <p class="kicker">${kicker}</p>
          <h2 class="service-section__title">${title}</h2>
          ${paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join('\n          ')}
        </div>
        <aside class="service-included">
          <p class="kicker">${includedKicker}</p>
          <h3>${includedTitle}</h3>
          <ul class="check-list">
              ${list}
          </ul>
          <p class="service-note">${note}</p>
        </aside>
      </div>
    </section>`;
}

function valueSection({ kicker, title, lead, cards }) {
  return `<section class="service-section service-section--tint">
      <div class="shell">
        <div class="service-section__head">
          <p class="kicker">${kicker}</p>
          <h2 class="service-section__title">${title}</h2>
          <p class="service-section__lead">${lead}</p>
        </div>
        <div class="value-grid">
          ${cards.map((card) => `<article class="value-card">
            ${card.value ? `<span class="value-card__num">${card.value}</span>` : ''}
            <h3>${card.title}</h3>
            <p>${card.text}</p>
          </article>`).join('\n          ')}
        </div>
      </div>
    </section>`;
}

function processSection() {
  return `<section class="service-section service-section--white">
      <div class="shell">
        <div class="service-section__head">
          <p class="kicker">Werkwijze</p>
          <h2 class="service-section__title">Van kennismaking tot vaste uitvoering.</h2>
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
    </section>`;
}

function faqSection({ title, lead, faqs, tinted = false }) {
  return `<section class="service-section ${tinted ? 'service-section--tint' : 'service-section--white'}">
      <div class="shell faq-grid">
        <div class="faq-intro">
          <p class="kicker">Veelgestelde vragen</p>
          <h2 class="service-section__title">${title}</h2>
          <p class="service-section__lead">${lead}</p>
          <p class="faq-help">Liever direct contact? Bel <a href="${phoneHref}">${phone}</a> of mail <a href="mailto:${email}">${email}</a>.</p>
        </div>
        <div class="faq-list">
          ${faqs.map(([question, answer], index) => `<details class="faq-item"${index === 0 ? ' open' : ''}>
            <summary>${question}</summary>
            <p>${answer}</p>
          </details>`).join('\n          ')}
        </div>
      </div>
    </section>`;
}

function ctaSection({ kicker = 'Kennismaken', title, text, primaryHref = 'contact.html#offerte', primaryLabel = 'Neem contact op', secondaryHref = 'werken-bij.html', secondaryLabel = 'Werken bij HM' }) {
  return `<section class="service-section service-section--white">
      <div class="shell">
        <div class="info-cta">
          <div>
            <p class="kicker">${kicker}</p>
            <h2>${title}</h2>
            <p>${text}</p>
          </div>
          <div class="info-cta__actions">
            <a class="btn btn--primary" href="${primaryHref}">${primaryLabel} <svg class="icon icon--sm" aria-hidden="true"><use href="#i-arrow"/></svg></a>
            <a class="btn btn--line" href="${secondaryHref}">${secondaryLabel}</a>
          </div>
        </div>
      </div>
    </section>`;
}

function infoCtaSection({ kicker = 'Kennismaken', title, text, primaryHref = 'contact.html#offerte', primaryLabel = 'Neem contact op', secondaryHref = 'werken-bij.html', secondaryLabel = 'Werken bij HM' }) {
  return ctaSection({ kicker, title, text, primaryHref, primaryLabel, secondaryHref, secondaryLabel });
}

function pageShell({ slug, title, description, image, imageWidth, imageHeight, imageAlt, body, structuredType = 'WebPage', structuredName, extraCtas = '', ctaHref = 'contact.html#offerte', ctaLabel = 'Offerte aanvragen' }) {
  const url = `${baseUrl}/${slug}.html`;
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': structuredType,
        '@id': `${url}#page`,
        name: structuredName || title,
        description,
        url,
        inLanguage: 'nl-NL',
        isPartOf: { '@type': 'WebSite', name: 'HM Schoonmaakdiensten', url: `${baseUrl}/` },
        publisher: {
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
          { '@type': 'ListItem', position: 2, name: structuredName || title, item: url }
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
  <title>${title} | HM Schoonmaakdiensten</title>
  <meta name="description" content="${description}">
  <meta name="robots" content="index,follow,max-image-preview:large">
  <meta name="theme-color" content="#ffffff">
  <link rel="canonical" href="${url}">

  <meta property="og:type" content="website">
  <meta property="og:locale" content="nl_NL">
  <meta property="og:site_name" content="HM Schoonmaakdiensten">
  <meta property="og:title" content="${title} | HM Schoonmaakdiensten">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${baseUrl}/assets/img/${image}">
  <meta property="og:image:width" content="${imageWidth}">
  <meta property="og:image:height" content="${imageHeight}">
  <meta property="og:image:alt" content="${imageAlt}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title} | HM Schoonmaakdiensten">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image" content="${baseUrl}/assets/img/${image}">

  <link rel="icon" href="assets/img/favicon-purple.png" type="image/png">
  <link rel="preload" as="image" href="assets/img/${image}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800&display=swap">
  <link rel="stylesheet" href="assets/css/style.css">
  <link rel="stylesheet" href="assets/css/dienstpagina.css">
  <link rel="stylesheet" href="assets/css/infopagina.css">

  <script type="application/ld+json">
${JSON.stringify(structuredData, null, 2)}
  </script>
</head>
<body class="page-dienst">

  <a class="skip-link" href="#main">Direct naar de inhoud</a>
  ${sprite()}
  ${header({ ctaHref, ctaLabel })}

  <main id="main">
    ${body}
  </main>

  ${footer()}

  <script src="assets/js/site.js" defer></script>
</body>
</html>
`;
}

/* ---------- Over ons ---------- */
const overOnsBody = `
    ${hero({
      crumbs: [
        { label: 'Home', href: 'index.html' },
        { label: 'Over ons' }
      ],
      kicker: 'Over ons',
      title: 'Een lokaal schoonmaakbedrijf met korte lijnen.',
      intro: 'HM Schoonmaakdiensten is een klein, betrokken schoonmaakbedrijf uit Swalmen. We werken voor bedrijven, winkels en organisaties in Limburg en Noord-Brabant.',
      image: 'hm-team-onderhoud.jpg',
      imageWidth: 960,
      imageHeight: 600,
      imageAlt: 'Twee medewerkers van HM Schoonmaakdiensten in bedrijfskleding in een representatief kantoor',
      primaryHref: 'contact.html#offerte',
      primaryLabel: 'Kennismaken'
    })}

    ${splitSection({
      kicker: 'Ons verhaal',
      title: 'Gewoon goed werk, met mensen die het kennen.',
      paragraphs: [
        'HM Schoonmaakdiensten is opgericht vanuit een eenvoudige overtuiging: schoonmaak is mensenwerk. Wie uw locatie kent, weet waar het op aankomt. Daarom werken we met vaste gezichten en korte lijnen.',
        'We zijn geen grote anonieme organisatie. U krijgt één aanspreekpunt, duidelijke afspraken en medewerkers die weten hoe uw pand werkt. Van een dagelijkse routine tot een eenmalige oplevering: we stemmen het samen af.'
      ],
      includedKicker: 'In het kort',
      includedTitle: 'HM Schoonmaakdiensten',
      included: [
        'Lokaal gevestigd in Swalmen',
        'Vaste gezichten op locatie',
        'Eén aanspreekpunt en korte lijnen',
        'Werkzaam in Limburg en Noord-Brabant',
        'Duidelijke afspraken vooraf',
        'Oog voor de mensen op de werkvloer'
      ],
      note: 'Geen poespas. Wel een schone omgeving waar u op kunt bouwen.'
    })}

    ${valueSection({
      kicker: 'Onze waarden',
      title: 'Waar we elke dag aan werken.',
      lead: 'Onze aanpak is eenvoudig: goed luisteren, duidelijke afspraken maken en het werk netjes afronden.',
      cards: [
        { title: 'Betrokken', text: 'We denken mee over de beste aanpak en signaleren wat opvalt, voordat het een probleem wordt.' },
        { title: 'Duidelijk', text: 'Taken, frequentie en planning staan vooraf vast. Bijzonderheden bespreken we gewoon op tijd.' },
        { title: 'Lokaal', text: 'We werken vanuit Swalmen in Limburg en Noord-Brabant. Korte lijnen en snel schakelen.' }
      ]
    })}

    ${infoCtaSection({
      title: 'Kennismaken met HM?',
      text: 'Vertel ons kort over uw locatie en wensen. We denken graag vrijblijvend mee.',
      primaryHref: 'contact.html#offerte',
      primaryLabel: 'Neem contact op'
    })}
`;

/* ---------- Werkgebied ---------- */
const cities = [
  ['Roermond', 'roermond.html'],
  ['Swalmen', null],
  ['Weert', null],
  ['Venray', null],
  ['Venlo', null],
  ['Sittard-Geleen', null],
  ['Heerlen', null],
  ['Maastricht', null],
  ['Eindhoven', null],
  ["'s-Hertogenbosch", null],
  ['Tilburg', null],
  ['Breda', null]
];
const cityChips = cities.map(([name, href]) => href
  ? `<a class="city-chip city-chip--link" href="${href}"><span>${name}</span><svg class="icon" aria-hidden="true"><use href="#i-arrow"/></svg></a>`
  : `<span class="city-chip">${name}</span>`).join('\n          ');

const werkgebiedBody = `
    ${hero({
      crumbs: [
        { label: 'Home', href: 'index.html' },
        { label: 'Werkgebied' }
      ],
      kicker: 'Werkgebied',
      title: 'Schoonmaak in Limburg en Noord-Brabant.',
      intro: 'Vanuit Swalmen werken we voor bedrijven, winkels en organisaties in Limburg en Noord-Brabant. Lokaal en met korte lijnen, zonder dat de reisafstand een drempel wordt.',
      image: 'hm-buitenschoonmaak.jpg',
      imageWidth: 960,
      imageHeight: 720,
      imageAlt: 'Medewerker van HM Schoonmaakdiensten veegt bladeren op een bestrate buitenruimte bij een bedrijfspand',
      primaryHref: 'contact.html#offerte',
      primaryLabel: 'Vraag een offerte aan'
    })}

    <section class="service-section service-section--white">
      <div class="shell">
        <div class="service-section__head">
          <p class="kicker">Waar we werken</p>
          <h2 class="service-section__title">Lokaal in en rond Roermond, actief in twee provincies.</h2>
          <p class="service-section__lead">We komen onder andere in de volgende plaatsen. Staat uw locatie er niet bij? Neem contact op; we kijken graag of het past.</p>
        </div>
        <div class="city-grid" aria-label="Plaatsen in ons werkgebied">
          ${cityChips}
        </div>
        <p class="service-note">Van kantoor tot winkel, zorglocatie of bedrijfspand. We stemmen de planning af op uw openingstijden en bereikbaarheid.</p>
      </div>
    </section>

    ${splitSection({
      kicker: 'Roermond',
      title: 'Ook dichtbij in Roermond.',
      paragraphs: [
        'Onze uitvalsbasis in Swalmen ligt op korte afstand van Roermond. Daardoor zijn we snel op locatie en houden we lijnen kort. Van de binnenstad tot bedrijventerreinen in de omgeving.',
        'Voor bedrijven in Roermond kijken we niet alleen naar de schoonmaaktaken, maar ook naar het moment waarop het werk past. Voor opening, na sluiting of op een rustig moment.'
      ],
      includedKicker: 'In Roermond',
      includedTitle: 'Veelgevraagd in de regio',
      included: [
        'Kantoren en bedrijfspanden',
        'Winkels en retailruimtes',
        'Zorg- en welzijnslocaties',
        'Onderwijs en kinderopvang',
        'Hotels en horeca',
        'Glasbewassing en vloeronderhoud'
      ],
      note: 'Meer weten over de lokale aanpak? Bekijk de pagina voor Roermond.'
    })}

    <section class="other-services" aria-labelledby="city-services-title">
      <div class="shell">
        <p class="kicker">Roermond</p>
        <h2 class="service-section__title" id="city-services-title">Schoonmaak in Roermond.</h2>
        <div class="other-grid">
          <a class="other-link" href="roermond.html"><span>Schoonmaakbedrijf Roermond</span><svg class="icon" aria-hidden="true"><use href="#i-arrow"/></svg></a>
          <a class="other-link" href="kantoorschoonmaak-roermond.html"><span>Kantoorschoonmaak Roermond</span><svg class="icon" aria-hidden="true"><use href="#i-arrow"/></svg></a>
          <a class="other-link" href="glasbewassing-roermond.html"><span>Glasbewassing Roermond</span><svg class="icon" aria-hidden="true"><use href="#i-arrow"/></svg></a>
        </div>
      </div>
    </section>

    ${faqSection({
      title: 'Goed om te weten.',
      lead: 'Staat uw vraag er niet bij? Neem gerust contact op.',
      tinted: true,
      faqs: [
        ['Werken jullie ook in mijn plaats?', 'We werken in Limburg en Noord-Brabant. Stuur uw postcode of plaats mee, dan laten we weten of we kunnen komen.'],
        ['Rekenen jullie reiskosten?', 'Dat hangt af van de locatie en de afspraken. We bespreken dit helder in de offerte.'],
        ['Kunnen jullie meerdere locaties onderhouden?', 'Ja, dat is mogelijk. We maken per locatie duidelijke afspraken en zorgen voor één aanspreekpunt.'],
        ['Hoe snel kunnen jullie starten?', 'Dat verschilt per planning en omvang. Neem contact op; we bekijken de mogelijkheden en koppelen snel terug.']
      ]
    })}

    ${infoCtaSection({
      title: 'Past uw locatie in ons werkgebied?',
      text: 'Stuur uw plaats en wensen door. We laten u weten wat we voor u kunnen doen.',
      primaryHref: 'contact.html#offerte',
      primaryLabel: 'Check uw locatie'
    })}
`;

/* ---------- Onze belofte ---------- */
const belofteBody = `
    ${hero({
      crumbs: [
        { label: 'Home', href: 'index.html' },
        { label: 'Onze belofte' }
      ],
      kicker: 'Onze belofte',
      title: 'Waar u op kunt rekenen.',
      intro: 'Geen verzonnen reviews. Wel drie afspraken die we bij iedere opdracht nakomen. Zo weet u vooraf waar u aan toe bent.',
      image: 'hm-schoonmaakonderhoud.jpg',
      imageWidth: 960,
      imageHeight: 720,
      imageAlt: 'Medewerker van HM Schoonmaakdiensten maakt een bureau schoon met een microvezeldoek',
      primaryHref: 'contact.html#offerte',
      primaryLabel: 'Vraag een offerte aan'
    })}

    <section class="service-section service-section--white">
      <div class="shell">
        <div class="service-section__head">
          <p class="kicker">Onze drie beloftes</p>
          <h2 class="service-section__title">Duidelijk, betrokken en lokaal.</h2>
          <p class="service-section__lead">We beloven niet dat we alles weten. We beloven wel dat we eerlijk zijn over wat we doen en hoe we het doen.</p>
        </div>
        <div class="value-grid">
          <article class="value-card">
            <span class="value-card__num">100%</span>
            <h3>Maatwerk per locatie</h3>
            <p>Geen standaardpakket. We kijken naar uw pand, gebruik en wensen en stellen daar de taken en frequentie op af.</p>
          </article>
          <article class="value-card">
            <span class="value-card__num">100%</span>
            <h3>Vaste gezichten en korte lijnen</h3>
            <p>We zetten waar mogelijk dezelfde medewerkers in. U heeft één aanspreekpunt voor vragen, wijzigingen en bijzonderheden.</p>
          </article>
          <article class="value-card">
            <span class="value-card__num">100%</span>
            <h3>Heldere afspraken vooraf</h3>
            <p>U ontvangt een duidelijke offerte met taken, planning en prijs. Geen verrassingen achteraf.</p>
          </article>
        </div>
      </div>
    </section>

    ${processSection()}

    ${infoCtaSection({
      title: 'Ervaar het zelf.',
      text: 'Vertel ons over uw locatie en ontdek hoe we samenwerken.',
      primaryHref: 'contact.html#offerte',
      primaryLabel: 'Kennismaken'
    })}
`;

/* ---------- Werken bij HM ---------- */
const werkenBijBody = `
    ${hero({
      crumbs: [
        { label: 'Home', href: 'index.html' },
        { label: 'Werken bij HM' }
      ],
      kicker: 'Werken bij HM',
      title: 'Kleine teams, vaste locaties en korte lijnen.',
      intro: 'Wil je ons team versterken? Bij HM werk je op vaste locaties, met duidelijke afspraken en een eigen aanspreekpunt.',
      image: 'hm-werken-bij.jpg',
      imageWidth: 960,
      imageHeight: 720,
      imageAlt: 'Lachende medewerkster van HM Schoonmaakdiensten in bedrijfskleding geeft een duim omhoog',
      primaryHref: `mailto:${email}?subject=Open%20sollicitatie`,
      primaryLabel: 'Stuur een open sollicitatie',
      secondaryHref: 'https://wa.me/31639140047?text=Hallo%20HM%20Schoonmaakdiensten%2C%20ik%20wil%20graag%20reageren%20op%20een%20vacature.',
      secondaryLabel: 'Via WhatsApp'
    })}

    ${splitSection({
      kicker: 'Werken bij HM',
      title: 'Werk in de buurt, met ruimte voor jouw leven.',
      paragraphs: [
        'HM is een klein, betrokken schoonmaakbedrijf. Je werkt op vaste locaties in Limburg en Noord-Brabant, met duidelijke afspraken en een eigen aanspreekpunt.',
        'We zoeken mensen die betrouwbaar zijn, oog hebben voor detail en graag een verzorgd resultaat achterlaten. Ervaring is mooi meegenomen, maar niet belangrijker dan een goede houding en betrokkenheid.'
      ],
      includedKicker: 'Wat je van ons kunt verwachten',
      includedTitle: 'Duidelijk en betrokken',
      included: [
        'Vaste locaties en vaste gezichten',
        'Een eigen aanspreekpunt',
        'Werk in de buurt van je woonplaats',
        'Duidelijke afspraken over tijden en taken',
        'Ruimte voor overleg',
        'Oog voor een gezonde werkdruk'
      ],
      note: 'Iets voor jou? Stuur een open sollicitatie; we nemen snel contact op.'
    })}

    ${valueSection({
      kicker: 'Wat we zoeken',
      title: 'Mensen die het verschil maken.',
      lead: 'Je hoeft geen ervaren schoonmaker te zijn om te beginnen. Wel belangrijk: betrouwbaarheid en aandacht voor het werk.',
      cards: [
        { title: 'Betrouwbaar', text: 'Je komt op tijd, houdt je aan afspraken en zorgt dat de locatie klaar is zoals afgesproken.' },
        { title: 'Nauwkeurig', text: 'Je ziet wat aandacht nodig heeft en neemt daar de tijd voor, zonder de planning uit het oog te verliezen.' },
        { title: 'Betrokken', text: 'Je werkt met respect voor de mensen en spullen op locatie. Dat merken klanten en collega’s.' }
      ]
    })}

    ${infoCtaSection({
      kicker: 'Solliciteren',
      title: 'Kom je ons team versterken?',
      text: 'Stuur een bericht met je naam, woonplaats en beschikbaarheid. We nemen snel contact met je op.',
      primaryHref: `mailto:${email}?subject=Open%20sollicitatie`,
      primaryLabel: 'Open sollicitatie',
      secondaryHref: 'https://wa.me/31639140047?text=Hallo%20HM%20Schoonmaakdiensten%2C%20ik%20wil%20graag%20reageren%20op%20een%20vacature.',
      secondaryLabel: 'Via WhatsApp'
    })}
`;

/* ---------- Contact ---------- */
const contactCards = `
        <div class="contact-cards">
          <a class="contact-card" href="${phoneHref}">
            <span class="contact-card__icon"><svg class="icon" aria-hidden="true"><use href="#i-phone"/></svg></span>
            <span class="contact-card__text"><strong>${phone}</strong><span>Bel direct</span></span>
          </a>
          <a class="contact-card" href="https://wa.me/31639140047?text=Hallo%20HM%20Schoonmaakdiensten%2C%20ik%20heb%20een%20vraag." target="_blank" rel="noopener">
            <span class="contact-card__icon"><svg class="icon" aria-hidden="true"><use href="#i-chat"/></svg></span>
            <span class="contact-card__text"><strong>WhatsApp</strong><span>Stuur een bericht</span></span>
          </a>
          <a class="contact-card" href="mailto:${email}">
            <span class="contact-card__icon"><svg class="icon" aria-hidden="true"><use href="#i-mail"/></svg></span>
            <span class="contact-card__text"><strong>${email}</strong><span>Mail ons</span></span>
          </a>
          <div class="contact-card">
            <span class="contact-card__icon"><svg class="icon" aria-hidden="true"><use href="#i-pin"/></svg></span>
            <span class="contact-card__text"><strong>Pastoor Zandersstraat 42</strong><span>6071 VC Swalmen</span></span>
          </div>
        </div>`;

const contactBody = `
    ${hero({
      crumbs: [
        { label: 'Home', href: 'index.html' },
        { label: 'Contact' }
      ],
      kicker: 'Contact',
      title: 'Laten we kennismaken.',
      intro: 'Vragen over een locatie, dienst of offerte? Bel, mail of stuur een WhatsApp-bericht. We denken graag met u mee.',
      image: 'hm-team-onderhoud.jpg',
      imageWidth: 960,
      imageHeight: 600,
      imageAlt: 'Twee medewerkers van HM Schoonmaakdiensten in bedrijfskleding in een representatief kantoor',
      primaryHref: '#offerte',
      primaryLabel: 'Vraag een offerte aan'
    })}

    <section class="service-section service-section--white">
      <div class="shell service-split">
        <div class="service-copy">
          <p class="kicker">Direct contact</p>
          <h2 class="service-section__title">Liever even bellen of mailen?</h2>
          <p>Dat kan natuurlijk. We zijn bereikbaar voor vragen, een korte intake of een afspraak op locatie.</p>
          ${contactCards}
        </div>
        <aside class="service-included">
          <p class="kicker">Bedrijfsgegevens</p>
          <h3>HM Schoonmaakdiensten</h3>
          <ul class="check-list">
            <li><svg class="icon" aria-hidden="true"><use href="#i-pin"/></svg><span>Pastoor Zandersstraat 42<br>6071 VC Swalmen</span></li>
            <li><svg class="icon" aria-hidden="true"><use href="#i-phone"/></svg><span>${phone}</span></li>
            <li><svg class="icon" aria-hidden="true"><use href="#i-mail"/></svg><span>${email}</span></li>
            <li><svg class="icon" aria-hidden="true"><use href="#i-check"/></svg><span>KvK 91847370</span></li>
            <li><svg class="icon" aria-hidden="true"><use href="#i-check"/></svg><span>BTW NL004919702B54</span></li>
          </ul>
          <p class="service-note">Werkgebied: Limburg en Noord-Brabant.<br>Liever direct een aanvraag? Gebruik het formulier hieronder.</p>
        </aside>
      </div>
    </section>

    ${quoteSection({ formValue: null }, {
      serviceHint: 'Kies de dienst die het beste past. Meerdere diensten zijn ook mogelijk.'
    })}
`;

/* ---------- Roermond ---------- */
const roermondBody = `
    ${hero({
      crumbs: [
        { label: 'Home', href: 'index.html' },
        { label: 'Werkgebied', href: 'werkgebied.html' },
        { label: 'Roermond' }
      ],
      kicker: 'Roermond',
      title: 'Schoonmaakbedrijf in Roermond.',
      intro: 'Vanuit Swalmen zijn we snel in Roermond. Voor kantoren, winkels, zorglocaties en andere bedrijfspanden in en rond de stad.',
      image: 'hm-schoonmaakonderhoud.jpg',
      imageWidth: 960,
      imageHeight: 720,
      imageAlt: 'Medewerker van HM Schoonmaakdiensten maakt een bureau schoon met een microvezeldoek',
      primaryHref: '#offerte',
      primaryLabel: 'Vraag een offerte aan'
    })}

    ${splitSection({
      kicker: 'Lokaal in Roermond',
      title: 'Korte lijnen, ook in de stad.',
      paragraphs: [
        'Een schoonmaakbedrijf in Roermond kiezen betekent vooral: iemand die snel kan schakelen. Onze basis in Swalmen ligt dichtbij, waardoor we praktisch en bereikbaar blijven.',
        'We werken voor bedrijven in de binnenstad en op de omliggende bedrijventerreinen. Of het nu gaat om dagelijks onderhoud, glasbewassing of een eenmalige schoonmaak: we stemmen het af op uw locatie en openingstijden.'
      ],
      includedKicker: 'In Roermond',
      includedTitle: 'Waar we op letten',
      included: [
        'Representatieve entrees en werkplekken',
        'Sanitair en gemeenschappelijke ruimtes',
        'Vloeren en drukke looproutes',
        'Glas en etalages',
        'Afstemming met uw openingstijden',
        'Vaste gezichten en één aanspreekpunt'
      ],
      note: 'Werkzaam in Roermond en de directe omgeving, waaronder Swalmen, Herkenbosch, Melick en Vlodrop.'
    })}

    <section class="other-services" aria-labelledby="roermond-services-title">
      <div class="shell">
        <p class="kicker">Diensten</p>
        <h2 class="service-section__title" id="roermond-services-title">Schoonmaakdiensten in Roermond.</h2>
        <div class="other-grid">
          ${serviceLinks(['schoonmaakonderhoud', 'glasbewassing', 'vloeronderhoud', 'sanitair-hygiene', 'eenmalige-schoonmaak', 'buitenschoonmaak'])}
        </div>
      </div>
    </section>

    <section class="other-services" aria-labelledby="roermond-sectors-title">
      <div class="shell">
        <p class="kicker">Sectoren</p>
        <h2 class="service-section__title" id="roermond-sectors-title">Ook voor uw sector.</h2>
        <div class="other-grid">
          ${sectorLinks(['kantoren-bedrijfspanden', 'retail-winkels', 'zorg-welzijn', 'onderwijs-kinderopvang', 'hotels-horeca', 'industrie-logistiek'])}
        </div>
      </div>
    </section>

    ${faqSection({
      title: 'Veelgestelde vragen in Roermond.',
      lead: 'Staat uw vraag er niet bij? Neem contact op; we helpen u graag verder.',
      tinted: true,
      faqs: [
        ['Kunnen jullie in heel Roermond schoonmaken?', 'We werken in Roermond en de directe omgeving, waaronder Swalmen, Herkenbosch, Melick en Vlodrop. Laat uw postcode of plaats achter, dan bevestigen we het.'],
        ['Kunnen jullie buiten openingstijden werken?', 'Ja, in overleg. We plannen voor opening, na sluiting of op rustige momenten, zodat uw bedrijf zo min mogelijk wordt gestoord.'],
        ['Hoe snel kunnen jullie starten?', 'Dat hangt af van de planning en de omvang. Vaak kunnen we binnen enkele dagen schakelen; neem contact op voor de actuele mogelijkheden.'],
        ['Werken jullie ook voor winkels in de binnenstad?', 'Ja. We stemmen de werkzaamheden af op openingstijden, loopstromen en de bereikbaarheid van de locatie.']
      ]
    })}

    ${infoCtaSection({
      title: 'Schoonmaak in Roermond nodig?',
      text: 'Vertel ons kort over uw locatie. We komen graag langs voor een vrijblijvende intake.',
      primaryHref: '#offerte',
      primaryLabel: 'Offerte aanvragen',
      secondaryHref: 'werkgebied.html',
      secondaryLabel: 'Bekijk werkgebied'
    })}

    ${quoteSection({ formValue: null }, {
      serviceHint: 'Kies de dienst die het beste past. Meerdere diensten zijn ook mogelijk.'
    })}
`;

/* ---------- Kantoorschoonmaak Roermond ---------- */
const kantoorschoonmaakBody = `
    ${hero({
      crumbs: [
        { label: 'Home', href: 'index.html' },
        { label: 'Diensten', href: 'index.html#diensten' },
        { label: 'Kantoorschoonmaak Roermond' }
      ],
      kicker: 'Kantoorschoonmaak Roermond',
      title: 'Kantoorschoonmaak in Roermond.',
      intro: 'Een schone werkplek zegt iets over uw organisatie. HM zorgt voor structureel kantoorschoonmaak in Roermond, afgestemd op uw pand en werktijden.',
      image: 'hm-schoonmaakonderhoud.jpg',
      imageWidth: 960,
      imageHeight: 720,
      imageAlt: 'Medewerker van HM Schoonmaakdiensten maakt een bureau schoon met een microvezeldoek',
      primaryHref: '#offerte',
      primaryLabel: 'Vraag een offerte aan'
    })}

    ${splitSection({
      kicker: 'Kantoorschoonmaak',
      title: 'Een verzorgd kantoor, elke dag opnieuw.',
      paragraphs: [
        'Van de entree tot de vergaderruimte: uw kantoor is het visitekaartje van uw organisatie. We houden werkplekken, sanitair, keuken en gemeenschappelijke ruimtes structureel schoon.',
        'We werken in Roermond en de directe omgeving met vaste gezichten en een eigen aanspreekpunt. De frequentie en werktijden stemmen we af op uw team en bezoekers.'
      ],
      includedKicker: 'Inbegrepen',
      includedTitle: 'Wat we voor u doen',
      included: [
        'Werkplekken en vergaderruimtes',
        'Keuken, pantry en koffiehoeken',
        'Sanitair en wastafels',
        'Vloeren en entrees',
        'Afval en contactpunten',
        'Glas aan de binnenzijde',
        'Flexibele schoonmaaktijden'
      ],
      note: 'Ook geschikt voor meerdere verdiepingen of een mix van kantoor en bedrijfsruimte.'
    })}

    ${valueSection({
      kicker: 'Waarom lokaal',
      title: 'Korte lijnen in Roermond.',
      lead: 'Een lokaal team betekent sneller schakelen en minder uitleggen.',
      cards: [
        { title: 'Snel op locatie', text: 'Vanuit Swalmen zijn we snel in Roermond voor een intake, extra werk of overleg.' },
        { title: 'Vaste gezichten', text: 'We zetten waar mogelijk dezelfde medewerkers in, zodat uw pand en afspraken bekend zijn.' },
        { title: 'Maatwerk', text: 'Geen standaardtarief zonder context. We stellen taken en frequentie af op uw kantoor.' }
      ]
    })}

    ${faqSection({
      title: 'Veelgestelde vragen.',
      lead: 'Staat uw vraag er niet bij? Stel hem via het formulier of bel ons.',
      faqs: [
        ['Kunnen jullie na kantoortijd schoonmaken?', 'Ja, in overleg. We werken vroeg in de ochtend, na kantoortijd of in het weekend, afhankelijk van uw wensen.'],
        ['Hoe vaak is kantoorschoonmaak nodig?', 'Dat hangt af van het aantal werkplekken, bezoekers en het gebruik. Na een intake adviseren we een passende frequentie.'],
        ['Nemen jullie ook sanitair en de keuken mee?', 'Ja, dat kan onderdeel zijn van het pakket. We spreken de taken en frequentie vooraf duidelijk af.'],
        ['Werken jullie ook buiten Roermond?', 'Ja, we zijn actief in Limburg en Noord-Brabant. Bekijk het werkgebied of vraag het na voor uw locatie.']
      ]
    })}

    ${infoCtaSection({
      title: 'Kantoorschoonmaak in Roermond nodig?',
      text: 'Vraag een vrijblijvende offerte aan of plan een korte intake op locatie.',
      primaryHref: '#offerte',
      primaryLabel: 'Offerte aanvragen',
      secondaryHref: 'roermond.html',
      secondaryLabel: 'Meer over Roermond'
    })}

    ${quoteSection({ formValue: 'Schoonmaakonderhoud' }, {
      serviceHint: 'De dienst Schoonmaakonderhoud staat alvast voor u klaar.'
    })}
`;

/* ---------- Glasbewassing Roermond ---------- */
const glasbewassingRoermondBody = `
    ${hero({
      crumbs: [
        { label: 'Home', href: 'index.html' },
        { label: 'Diensten', href: 'index.html#diensten' },
        { label: 'Glasbewassing Roermond' }
      ],
      kicker: 'Glasbewassing Roermond',
      title: 'Glasbewassing in Roermond.',
      intro: 'Helder glas valt direct op. HM verzorgt glasbewassing voor bedrijven en winkels in Roermond, veilig en op een moment dat past.',
      image: 'hm-glasbewassing.jpg',
      imageWidth: 720,
      imageHeight: 540,
      imageAlt: 'Medewerkster van HM Schoonmaakdiensten wast een glaswand met een ruitentrekker',
      primaryHref: '#offerte',
      primaryLabel: 'Vraag een offerte aan'
    })}

    ${splitSection({
      kicker: 'Glasbewassing',
      title: 'Helder zicht in de binnenstad en op bedrijventerreinen.',
      paragraphs: [
        'Ramen, glaswanden, etalages en glazen deuren bepalen de eerste indruk. We maken ze grondig schoon en werken veilig, ook bij lastig bereikbare plekken.',
        'We stemmen de frequentie af op de ligging van uw pand en de uitstraling die u wilt. Voor winkels en horeca plannen we waar mogelijk voor openingstijd, zodat klanten niets merken.'
      ],
      includedKicker: 'Inbegrepen',
      includedTitle: 'Wat we voor u doen',
      included: [
        'Ramen en glaswanden',
        'Kozijnen en dorpels',
        'Etalages en glazen deuren',
        'Verwijderen van waterstrepen en aanslag',
        'Veilig werken op hoogte',
        'Afstemming over planning',
        'Gevelreiniging in overleg'
      ],
      note: 'Ook voor winkels in de binnenstad en bedrijfspanden aan de rand van Roermond.'
    })}

    ${valueSection({
      kicker: 'Waarom lokaal',
      title: 'Snel en zorgvuldig in Roermond.',
      lead: 'Lokaal werken betekent korte lijnen en een planning die past bij uw bedrijf.',
      cards: [
        { title: 'Veilig werken', text: 'We beoordelen vooraf de bereikbaarheid en kiezen een veilige werkwijze voor glas op hoogte.' },
        { title: 'Flexibele planning', text: 'Voor opening, na sluiting of op een rustig moment. We stemmen het vooraf met u af.' },
        { title: 'Verzorgd resultaat', text: 'Geen strepen of achtergebleven aanslag. We werken nauwkeurig en ruimte netjes af.' }
      ]
    })}

    ${faqSection({
      title: 'Veelgestelde vragen.',
      lead: 'Staat uw vraag er niet bij? Stel hem via het formulier of bel ons.',
      faqs: [
        ['Hoe vaak is glasbewassing in Roermond nodig?', 'Dat hangt af van de ligging en het weer. Voor veel bedrijfspanden is vier tot twaalf keer per jaar gebruikelijk; we adviseren een passende frequentie.'],
        ['Kunnen jullie ook etalages schoonmaken?', 'Ja, etalages en glaspuien kunnen worden meegenomen. We stemmen de planning af op uw openingstijden.'],
        ['Werken jullie op hoogte?', 'Voor glas op hoogte bekijken we vooraf de veilige methode. Bijzondere hoogtes of bereikbaarheid bespreken we tijdens de intake.'],
        ['Kunnen jullie in heel Roermond werken?', 'We werken in Roermond en de directe omgeving. Laat uw locatie of postcode achter, dan bevestigen we het.']
      ]
    })}

    ${infoCtaSection({
      title: 'Glasbewassing in Roermond nodig?',
      text: 'Vraag een offerte aan of plan een korte intake. We bekijken de glaspartijen en bereikbaarheid.',
      primaryHref: '#offerte',
      primaryLabel: 'Offerte aanvragen',
      secondaryHref: 'roermond.html',
      secondaryLabel: 'Meer over Roermond'
    })}

    ${quoteSection({ formValue: 'Glasbewassing' }, {
      serviceHint: 'De dienst Glasbewassing staat alvast voor u klaar.'
    })}
`;

const pages = [
  {
    slug: 'over-ons',
    title: 'Over ons',
    description: 'Maak kennis met HM Schoonmaakdiensten uit Swalmen: een klein, betrokken schoonmaakbedrijf voor bedrijven in Limburg en Noord-Brabant.',
    image: 'hm-team-onderhoud.jpg',
    imageWidth: 960,
    imageHeight: 600,
    imageAlt: 'Twee medewerkers van HM Schoonmaakdiensten in bedrijfskleding in een representatief kantoor',
    body: overOnsBody,
    structuredType: 'AboutPage',
    structuredName: 'Over HM Schoonmaakdiensten'
  },
  {
    slug: 'werkgebied',
    title: 'Werkgebied Limburg en Noord-Brabant',
    description: 'HM Schoonmaakdiensten werkt vanuit Swalmen in Limburg en Noord-Brabant, onder andere in Roermond, Weert, Venray, Venlo en Eindhoven.',
    image: 'hm-buitenschoonmaak.jpg',
    imageWidth: 960,
    imageHeight: 720,
    imageAlt: 'Medewerker van HM Schoonmaakdiensten veegt bladeren op een bestrate buitenruimte bij een bedrijfspand',
    body: werkgebiedBody,
    structuredType: 'WebPage',
    structuredName: 'Werkgebied'
  },
  {
    slug: 'onze-belofte',
    title: 'Onze belofte',
    description: 'Geen verzonnen reviews, wel drie duidelijke afspraken: maatwerk, vaste gezichten en heldere afspraken. Lees de belofte van HM Schoonmaakdiensten.',
    image: 'hm-schoonmaakonderhoud.jpg',
    imageWidth: 960,
    imageHeight: 720,
    imageAlt: 'Medewerker van HM Schoonmaakdiensten maakt een bureau schoon met een microvezeldoek',
    body: belofteBody,
    structuredType: 'WebPage',
    structuredName: 'Onze belofte'
  },
  {
    slug: 'werken-bij',
    title: 'Werken bij HM Schoonmaakdiensten',
    description: 'Werken bij HM Schoonmaakdiensten: kleine teams, vaste locaties en korte lijnen in Limburg en Noord-Brabant. Stuur een open sollicitatie.',
    image: 'hm-werken-bij.jpg',
    imageWidth: 960,
    imageHeight: 720,
    imageAlt: 'Lachende medewerkster van HM Schoonmaakdiensten in bedrijfskleding geeft een duim omhoog',
    body: werkenBijBody,
    structuredType: 'WebPage',
    structuredName: 'Werken bij HM',
    ctaHref: 'contact.html#offerte'
  },
  {
    slug: 'contact',
    title: 'Contact',
    description: 'Neem contact op met HM Schoonmaakdiensten in Swalmen. Bel, mail of stuur een WhatsApp-bericht, of vraag direct een offerte aan.',
    image: 'hm-team-onderhoud.jpg',
    imageWidth: 960,
    imageHeight: 600,
    imageAlt: 'Twee medewerkers van HM Schoonmaakdiensten in bedrijfskleding in een representatief kantoor',
    body: contactBody,
    structuredType: 'ContactPage',
    structuredName: 'Contact',
    ctaHref: '#offerte'
  },
  {
    slug: 'roermond',
    title: 'Schoonmaakbedrijf Roermond',
    description: 'Schoonmaakbedrijf in Roermond voor kantoren, winkels, zorg en bedrijfspanden. HM werkt vanuit Swalmen met vaste gezichten en korte lijnen.',
    image: 'hm-schoonmaakonderhoud.jpg',
    imageWidth: 960,
    imageHeight: 720,
    imageAlt: 'Medewerker van HM Schoonmaakdiensten maakt een bureau schoon met een microvezeldoek',
    body: roermondBody,
    structuredType: 'WebPage',
    structuredName: 'Schoonmaakbedrijf Roermond',
    ctaHref: '#offerte'
  },
  {
    slug: 'kantoorschoonmaak-roermond',
    title: 'Kantoorschoonmaak Roermond',
    description: 'Kantoorschoonmaak in Roermond voor een verzorgde werkplek. HM stemt taken, frequentie en werktijden af op uw kantoor. Vraag een offerte aan.',
    image: 'hm-schoonmaakonderhoud.jpg',
    imageWidth: 960,
    imageHeight: 720,
    imageAlt: 'Medewerker van HM Schoonmaakdiensten maakt een bureau schoon met een microvezeldoek',
    body: kantoorschoonmaakBody,
    structuredType: 'WebPage',
    structuredName: 'Kantoorschoonmaak Roermond',
    ctaHref: '#offerte'
  },
  {
    slug: 'glasbewassing-roermond',
    title: 'Glasbewassing Roermond',
    description: 'Glasbewassing in Roermond voor ramen, glaswanden en etalages. HM werkt veilig en stemt de planning af op uw bedrijf. Vraag een offerte aan.',
    image: 'hm-glasbewassing.jpg',
    imageWidth: 720,
    imageHeight: 540,
    imageAlt: 'Medewerkster van HM Schoonmaakdiensten wast een glaswand met een ruitentrekker',
    body: glasbewassingRoermondBody,
    structuredType: 'WebPage',
    structuredName: 'Glasbewassing Roermond',
    ctaHref: '#offerte'
  }
];

if (require.main === module) {
  pages.forEach((page) => {
    const html = pageShell(page);
    fs.writeFileSync(path.join(root, `${page.slug}.html`), html, 'utf8');
    console.log(`geschreven: ${page.slug}.html`);
  });
  console.log(`\n${pages.length} pagina's bijgewerkt.`);
}

module.exports = { pages };
