const fs = require('fs');
const path = require('path');

// Tools being merged into "Designer"
const toolsToRemove = [
  'ui-ux-pro-max',
  'banner-design',
  'brand',
  'design',
  'design-system',
  'slides',
  'ui-styling'
];
// 'designer' is the surviving tool — kept and renamed cleanly

// ---- 1. PATCH index.html ----
const indexFile = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexFile, 'utf8');

// Remove each button block for tools being merged
for (const id of toolsToRemove) {
  // Remove <button ...id="sidebar-{id}-btn"...>...</button> blocks
  const regex = new RegExp(`\\s*<button[^>]*id="sidebar-${id}-btn"[^>]*>[\\s\\S]*?<\\/button>`, 'm');
  html = html.replace(regex, '');
  // Remove from mobile dropdown
  const dropRegex = new RegExp(`\\s*<option[^>]*value="sidebar-${id}-btn"[^>]*>[^<]*<\\/option>`, 'm');
  html = html.replace(dropRegex, '');
}

// Ensure the surviving "designer" button has clean label and icon
html = html.replace(
  /id="sidebar-designer-btn" title="Designer"/,
  'id="sidebar-designer-btn" title="Designer"'
);

fs.writeFileSync(indexFile, html);
console.log('index.html: removed 7 designer sub-tools, kept "Designer"');

// ---- 2. PATCH app.js ----
const appFile = path.join(__dirname, 'app.js');
let js = fs.readFileSync(appFile, 'utf8');

// Remove merged modes from the modes[] array
for (const id of toolsToRemove) {
  js = js.replace(new RegExp(`\\s*'${id}',?\\n?`), '\n');
}

// Replace all case blocks for merged tools with a redirect to 'designer'
for (const id of toolsToRemove) {
  // Replace case 'tool-id': ... break; with a redirect
  const caseRegex = new RegExp(`case '${id}':[\\s\\S]*?break;`, 'm');
  js = js.replace(caseRegex, `case '${id}': switchWorkspaceMode('designer'); break;`);
}

// Now replace the 'designer' case with a comprehensive merged Designer tool
const richDesignerCase = `case 'designer':
      {
        const d = document.createElement('div');
        d.innerHTML = \`<div style="text-align:center;padding:16px 10px;"><div style="font-size:36px;margin-bottom:8px;">🎨</div><h3 style="color:var(--color-primary);margin-bottom:6px;">Designer Studio</h3><p style="color:var(--text-muted);font-size:12px;line-height:1.5;">UI/UX, Brand Identity, Banners, Design Systems, Slides & More — all in one place.</p></div>\`;
        container.appendChild(d);
        createSelect('Design Task', 'des-task', [
          { val: 'ui-ux', name: '🖥️ UI/UX Design (Web/App)' },
          { val: 'wireframe', name: '📐 Wireframe & UX Flow' },
          { val: 'design-system', name: '🧩 Design System & Tokens' },
          { val: 'brand-identity', name: '🏷️ Brand Identity & Logo' },
          { val: 'banner', name: '🖼️ Banner & Ad Design' },
          { val: 'social-media', name: '📱 Social Media Graphics' },
          { val: 'slides', name: '📊 Presentation Slides' },
          { val: 'color-palette', name: '🎨 Color Palette & Typography' },
          { val: 'css-styling', name: '💅 CSS & UI Styling' },
          { val: '3d-art', name: '🌐 3D Art Direction' },
          { val: 'icon-design', name: '🔷 Icon & Illustration Design' },
          { val: 'mockup', name: '📱 Mockup & Prototype' }
        ]);
        createSelect('Platform / Output', 'des-platform', [
          { val: 'web', name: '🌐 Web Application' },
          { val: 'mobile', name: '📱 Mobile App (iOS/Android)' },
          { val: 'desktop', name: '🖥️ Desktop Application' },
          { val: 'facebook', name: '👍 Facebook (1200×628)' },
          { val: 'instagram', name: '📷 Instagram (1080×1080)' },
          { val: 'linkedin', name: '💼 LinkedIn (1200×627)' },
          { val: 'twitter', name: '🐦 Twitter/X (1600×900)' },
          { val: 'youtube', name: '▶️ YouTube Thumbnail (1280×720)' },
          { val: 'print', name: '🖨️ Print / A4' }
        ]);
        createSelect('Style', 'des-style', [
          { val: 'modern', name: '✨ Modern & Minimal' },
          { val: 'glassmorphism', name: '🔮 Glassmorphism' },
          { val: 'dark', name: '🌑 Dark Mode' },
          { val: 'gradient', name: '🌈 Bold Gradient' },
          { val: 'retro', name: '📼 Retro / Vintage' },
          { val: 'corporate', name: '👔 Corporate / Professional' },
          { val: 'playful', name: '🎉 Playful / Fun' },
          { val: 'brutalist', name: '⬛ Brutalist / Raw' }
        ]);
        createTextarea('Design Brief', 'des-text', 'Describe the design you need — colors, mood, target audience, key elements...', '');
      }
      break;`;

js = js.replace(/case 'designer':[\s\S]*?break;/, richDesignerCase);

fs.writeFileSync(appFile, js);
console.log('app.js: merged all designer tools into one comprehensive "Designer Studio"');
