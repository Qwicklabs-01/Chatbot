const fs = require('fs');

// Clean console.logs from app.js (keep only the analytics one which is intentional)
let js = fs.readFileSync('app.js', 'utf8');

// Remove debug console.logs but keep the Aura Analytics tracker
js = js.replace(/\s*console\.log\("ALERT:", text\);/g, '');
js = js.replace(/console\.log\('✅ Aura AI initialized and ready\.'\);/g, '');
js = js.replace(/console\.log\("Feedback Message Submitted:", \{ name, email, message \}\);/g, '');

fs.writeFileSync('app.js', js);
console.log('Cleaned debug console.logs from app.js');

// Clean from index.html
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/\s*console\.log\('✅ Service Worker registered successfully:', reg\.scope\);/g, '');
fs.writeFileSync('index.html', html);
console.log('Cleaned console.log from index.html');
