const fs = require('fs');
const appJs = fs.readFileSync('app.js', 'utf8');
const indexHtml = fs.readFileSync('index.html', 'utf8');

const jsRegex = /document\.getElementById\('([^']+)'\)/g;
const idsInJs = [];
let match;
while ((match = jsRegex.exec(appJs)) !== null) {
  idsInJs.push(match[1]);
}

const htmlRegex = /id=["']([^"']+)["']/g;
const idsInHtml = [];
while ((match = htmlRegex.exec(indexHtml)) !== null) {
  idsInHtml.push(match[1]);
}

const missing = idsInJs.filter(id => !idsInHtml.includes(id));
console.log('Missing IDs:', [...new Set(missing)]);
