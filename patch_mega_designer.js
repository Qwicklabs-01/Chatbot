const fs = require('fs');
const path = require('path');

// These tools still exist in sidebar and need to be merged into 'designer'
const toolsToRemove = [
  'ai-art-prompt',
  'creative',
  'ai-image-generator',
  // also catch any that may still remain from last patch
  'ui-styling',
  'design-system',
  'design',
  'brand',
  'banner-design',
  'ui-ux-pro-max'
];

// ---- 1. PATCH index.html ----
const indexFile = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexFile, 'utf8');

for (const id of toolsToRemove) {
  // Remove sidebar button
  html = html.replace(new RegExp(`\\s*<button[^>]*id="sidebar-${id}-btn"[^>]*>[\\s\\S]*?<\\/button>`, 'm'), '');
  // Remove mobile dropdown option
  html = html.replace(new RegExp(`\\s*<option[^>]*value="sidebar-${id}-btn"[^>]*>[^<]*<\\/option>`, 'm'), '');
}

fs.writeFileSync(indexFile, html);
console.log('index.html: removed all duplicate designer tools from sidebar');

// ---- 2. PATCH app.js ----
const appFile = path.join(__dirname, 'app.js');
let js = fs.readFileSync(appFile, 'utf8');

// Remove from modes[] array
for (const id of toolsToRemove) {
  js = js.replace(new RegExp(`\\s*'${id}',?\\n?`), '\n');
}

// Redirect any remaining case blocks to 'designer'
for (const id of toolsToRemove) {
  const caseRegex = new RegExp(`case '${id}':[\\s\\S]*?break;`, 'm');
  if (caseRegex.test(js)) {
    js = js.replace(caseRegex, `case '${id}': switchWorkspaceMode('designer'); break;`);
  }
}

// Now replace the 'designer' case with a MEGA unified Designer tool
const megaDesignerCase = `case 'designer':
      {
        const header = document.createElement('div');
        header.innerHTML = \`
          <div style="text-align:center;padding:16px 10px 8px;">
            <div style="font-size:40px;margin-bottom:8px;">🎨</div>
            <h3 style="color:var(--color-primary);font-size:18px;font-weight:800;margin-bottom:4px;">Designer Studio</h3>
            <p style="color:var(--text-muted);font-size:11px;line-height:1.5;">UI/UX · Brand · Banner · Art Prompts · Image Gen · Creative Writing · Design Systems — all in one.</p>
          </div>
        \`;
        container.appendChild(header);

        createSelect('What Do You Want To Create?', 'des-task', [
          { val: 'ui-ux', name: '🖥️ UI/UX Design (Web/App)' },
          { val: 'wireframe', name: '📐 Wireframe & UX Flow' },
          { val: 'design-system', name: '🧩 Design System & Tokens' },
          { val: 'brand-identity', name: '🏷️ Brand Identity & Logo' },
          { val: 'banner', name: '🖼️ Banner & Ad Design' },
          { val: 'social-media', name: '📱 Social Media Graphics' },
          { val: 'slides', name: '📊 Presentation Slides' },
          { val: 'color-palette', name: '🎨 Color Palette & Typography' },
          { val: 'css-styling', name: '💅 CSS & UI Styling Code' },
          { val: '3d-art', name: '🌐 3D Art Direction' },
          { val: 'icon-design', name: '🔷 Icon & Illustration Design' },
          { val: 'mockup', name: '📱 Mockup & Prototype' },
          { val: 'midjourney', name: '🎨 Midjourney v6 Art Prompt' },
          { val: 'flux', name: '⚡ FLUX 1.1 Image Prompt' },
          { val: 'dalle3', name: '🤖 DALL·E 3 Image Prompt' },
          { val: 'ai-image', name: '🖼️ AI Image Generation Prompt' },
          { val: 'story', name: '📖 Creative Story / Fiction' },
          { val: 'blog', name: '✍️ Creative Blog / Article' },
          { val: 'ad-copy', name: '📣 Ad Copy & Taglines' }
        ]);

        createSelect('Platform / Output Format', 'des-platform', [
          { val: 'web', name: '🌐 Web Application' },
          { val: 'mobile', name: '📱 Mobile App (iOS/Android)' },
          { val: 'desktop', name: '🖥️ Desktop App' },
          { val: 'facebook', name: '👍 Facebook (1200×628)' },
          { val: 'instagram', name: '📷 Instagram (1080×1080)' },
          { val: 'linkedin', name: '💼 LinkedIn (1200×627)' },
          { val: 'twitter', name: '🐦 Twitter/X (1600×900)' },
          { val: 'youtube', name: '▶️ YouTube Thumbnail (1280×720)' },
          { val: 'print', name: '🖨️ Print / A4' },
          { val: 'any', name: '✨ Any / General' }
        ]);

        createSelect('Visual Style', 'des-style', [
          { val: 'modern', name: '✨ Modern & Minimal' },
          { val: 'glassmorphism', name: '🔮 Glassmorphism' },
          { val: 'dark', name: '🌑 Dark Mode / Neon' },
          { val: 'gradient', name: '🌈 Bold Gradient' },
          { val: 'photorealistic', name: '📷 Photorealistic' },
          { val: 'cinematic', name: '🎬 Cinematic / Movie Still' },
          { val: 'anime', name: '🎌 Anime / Manga' },
          { val: 'retro', name: '📼 Retro / Vintage' },
          { val: 'cyberpunk', name: '🌆 Cyberpunk / Sci-Fi' },
          { val: 'fantasy', name: '🧙 Fantasy / Epic' },
          { val: 'corporate', name: '👔 Corporate / Professional' },
          { val: 'playful', name: '🎉 Playful / Vibrant' },
          { val: 'brutalist', name: '⬛ Brutalist / Raw' },
          { val: 'oil-painting', name: '🖌️ Oil Painting' },
          { val: 'minimalist', name: '⬜ Minimalist / Clean' }
        ]);

        createTextarea('Describe What You Need', 'des-text', 'e.g. Create a dark glassmorphism UI for a fintech mobile app with purple gradients and modern typography...', '');
      }
      break;`;

js = js.replace(/case 'designer':[\s\S]*?break;/, megaDesignerCase);

fs.writeFileSync(appFile, js);
console.log('app.js: merged ALL designer tools into one mega Designer Studio!');
