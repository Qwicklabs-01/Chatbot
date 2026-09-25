const fs = require('fs');
const path = require('path');

const indexFile = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexFile, 'utf8');

// Replace conditional analytics block with direct tags
const targetBlockRegex = /<script>\s*if\s*\(window\.location\.hostname\.includes\('vercel\.app'\)\)\s*\{[\s\S]*?\}\s*<\/script>/;
const newTags = `<script defer src="/_vercel/insights/script.js"></script>\n  <script defer src="/_vercel/speed-insights/script.js"></script>`;

html = html.replace(targetBlockRegex, newTags);

fs.writeFileSync(indexFile, html);
console.log('Vercel Analytics patched.');
