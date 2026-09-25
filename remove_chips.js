const fs = require('fs');
const path = require('path');

const indexFile = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexFile, 'utf8');

// Use Regex to remove the sections
// Remove OmniBrain Modes Header block
html = html.replace(/<!-- OmniBrain-Pro-Master Active Modes Bar -->[\s\S]*?<\/div>\s*<!-- Main Scrollable Chat Panel -->/, '<!-- Main Scrollable Chat Panel -->');

// Remove Horizontal scrolling Quick Suggestions block
html = html.replace(/<!-- Horizontal scrolling Quick Suggestions -->[\s\S]*?<\/div>\s*<!-- Bottom Chat Form & Input controls -->/, '<!-- Bottom Chat Form & Input controls -->');

fs.writeFileSync(indexFile, html);
console.log('Removed chips and modes header from index.html');
