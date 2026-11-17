const fs = require('fs');
const path = require('path');

const root = __dirname;
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(root, 'assets', 'css', 'style.css'), 'utf8');
const landingCss = fs.readFileSync(path.join(root, 'assets', 'css', 'diensten.css'), 'utf8');
const js = fs.readFileSync(path.join(root, 'assets', 'js', 'site.js'), 'utf8');

const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/);
if (!bodyMatch) throw new Error('Geen body gevonden');

let body = bodyMatch[1];
body = body
  .replace(/<script src="assets\/js\/site\.js" defer><\/script>/, '')
  .replace(/<script src="assets\/js\/diensten\.js" defer><\/script>/, '')
  .trim();

const jsonld = (html.match(/<script type="application\/ld\+json">[\s\S]*?<\/script>/) || [''])[0];
const fontLink = (html.match(/<link rel="stylesheet" href="https:\/\/fonts\.googleapis\.com[^>]*>/) || [''])[0];

const artifact = `<title>HM Schoonmaakdiensten</title>
<meta name="claude:viewport-fit-sides" content="cover">
<meta name="description" content="Moderne website voor HM Schoonmaakdiensten in Roermond met diensten, sectoren, werkwijze en een offerteaanvraag in vier stappen.">
${fontLink}
<style>
${css}
${landingCss}
</style>
${jsonld}
<div lang="nl" class="page-diensten">
${body}
</div>
<script>
${js}
</script>
`;

fs.writeFileSync(path.join(root, 'artifact.html'), artifact);
console.log('artifact.html geschreven:', artifact.length, 'bytes');
