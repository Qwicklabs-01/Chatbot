const fs = require('fs');
const path = require('path');

// ---- 1. PATCH index.html ----
const indexFile = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexFile, 'utf8');

// Remove the CMO & SEO button entirely
html = html.replace(/\s*<!-- CMO & SEO -->[\s\S]*?<\/button>\s*(?=<!-- Designer -->)/m, '\n');
// If comment not present, remove by id
html = html.replace(/\s*<button[^>]*id="sidebar-cmo-seo-btn"[^>]*>[\s\S]*?<\/button>/m, '');

// Rename SEO & GEO button to SEO
html = html.replace(/id="sidebar-seo-geo-btn" title="SEO &amp; GEO"/, 'id="sidebar-seo-btn" title="SEO"');
html = html.replace(/id="sidebar-seo-geo-btn" title="SEO & GEO"/, 'id="sidebar-seo-btn" title="SEO"');
html = html.replace(/>SEO &amp; GEO<\/span>/, '>SEO</span>');
html = html.replace(/>SEO & GEO<\/span>/, '>SEO</span>');

// Mobile dropdown — remove cmo-seo option, rename seo-geo
html = html.replace(/<option value="sidebar-cmo-seo-btn">CMO &amp; SEO<\/option>\n?/, '');
html = html.replace(/<option value="sidebar-cmo-seo-btn">CMO & SEO<\/option>\n?/, '');
html = html.replace(/value="sidebar-seo-geo-btn">SEO &amp; GEO/, 'value="sidebar-seo-btn">SEO');
html = html.replace(/value="sidebar-seo-geo-btn">SEO & GEO/, 'value="sidebar-seo-btn">SEO');

fs.writeFileSync(indexFile, html);
console.log('index.html patched: merged CMO & SEO + SEO & GEO => SEO');

// ---- 2. PATCH app.js ----
const appFile = path.join(__dirname, 'app.js');
let js = fs.readFileSync(appFile, 'utf8');

// Remove 'cmo-seo' from modes array
js = js.replace(/\s*'cmo-seo',?\n?/, '\n');

// Rename 'seo-geo' to 'seo' in modes array
js = js.replace("'seo-geo'", "'seo'");

// Rename sidebar button id binding
js = js.replace("sidebar-seo-geo-btn", "sidebar-seo-btn");

// Rename case 'seo-geo' to case 'seo' and merge both cases
js = js.replace("case 'cmo-seo':", "// cmo-seo removed — merged into seo");

// Rename the seo-geo case to seo
js = js.replace("case 'seo-geo':", "case 'seo':");

// Update switchWorkspaceMode reference (if any)
js = js.replace(/switchWorkspaceMode\('seo-geo'\)/g, "switchWorkspaceMode('seo')");
js = js.replace(/switchWorkspaceMode\('cmo-seo'\)/g, "switchWorkspaceMode('seo')");

fs.writeFileSync(appFile, js);
console.log('app.js patched: merged cmo-seo + seo-geo => seo');
