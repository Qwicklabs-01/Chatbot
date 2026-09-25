const fs = require('fs');

// FIX 1: Fix JS syntax error in app.js (broken comment on line 158-159)
let js = fs.readFileSync('app.js', 'utf8');
js = js.replace(
  `  // OmniBrain Pro Active Mode State ('auto', 'engineer',\n 'cmo', 'designer', 'link', 'strategist')`,
  `  // OmniBrain Pro Active Mode State ('auto', 'engineer', 'cmo', 'designer', 'link', 'strategist')`
);
fs.writeFileSync('app.js', js);
console.log('✅ Fixed JS syntax error in app.js');

// FIX 2: Link aura-pro-ui.css in index.html
let html = fs.readFileSync('index.html', 'utf8');
if (!html.includes('aura-pro-ui.css')) {
  html = html.replace(
    '<link rel="stylesheet" href="style.css?v=3.6">',
    '<link rel="stylesheet" href="style.css?v=3.7">\n  <link rel="stylesheet" href="aura-pro-ui.css?v=1.0">'
  );
  // Also bump app.js version
  html = html.replace('app.js?v=3.6', 'app.js?v=3.7');
  fs.writeFileSync('index.html', html);
  console.log('✅ Linked aura-pro-ui.css in index.html and bumped cache versions');
} else {
  console.log('ℹ️  aura-pro-ui.css already linked');
}

// Verify JS is now clean
