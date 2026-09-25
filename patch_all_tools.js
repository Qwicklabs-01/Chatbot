const fs = require('fs');
const path = require('path');

const appFile = path.join(__dirname, 'app.js');
let js = fs.readFileSync(appFile, 'utf8');

// 1. Replace the default case + fix help-menu execute btn issue
// The bug: after help-menu sets display:none, the global block at line 2508 re-shows it.
// Fix: change the condition at line 2508 to also exclude help-menu

js = js.replace(
  `if (mode !== 'prompt-builder') {
    DOM.writingExecuteBtn.style.display = 'block';
  }`,
  `if (mode !== 'prompt-builder' && mode !== 'help-menu') {
    DOM.writingExecuteBtn.style.display = 'block';
  }`
);

// 2. Replace the generic default textarea with rich mode-specific UIs
const richModeCases = `
    case 'auto':
      {
        const d = document.createElement('div');
        d.innerHTML = \`
          <div style="text-align:center; padding: 20px 10px;">
            <div style="font-size:40px; margin-bottom:12px;">⚡</div>
            <h3 style="color:var(--color-primary); margin-bottom:8px;">Auto Mode</h3>
            <p style="color:var(--text-muted); font-size:13px; line-height:1.6; margin-bottom:16px;">
              Aura AI automatically detects the best response style for your query — code, writing, analysis, creative or strategic.
            </p>
          </div>
        \`;
        container.appendChild(d);
        createTextarea('Your Question or Task', 'auto-text', 'Ask anything — Aura will auto-select the best mode...', '');
      }
      break;

    case 'engineer':
      {
        const d = document.createElement('div');
        d.innerHTML = \`<div style="text-align:center;padding:16px 10px;"><div style="font-size:36px;margin-bottom:8px;">💻</div><h3 style="color:var(--color-primary);margin-bottom:6px;">Engineer Mode</h3><p style="color:var(--text-muted);font-size:12px;line-height:1.5;">Code, APIs, architecture, debugging and system design.</p></div>\`;
        container.appendChild(d);
        createSelect('Language / Stack', 'eng-lang', [
          { val: 'javascript', name: '🟨 JavaScript / Node.js' },
          { val: 'python', name: '🐍 Python' },
          { val: 'typescript', name: '🔷 TypeScript' },
          { val: 'nextjs', name: '▲ Next.js / React' },
          { val: 'sql', name: '🗄️ SQL / Database' },
          { val: 'api', name: '🔌 REST API Design' },
          { val: 'other', name: '🛠️ Other' }
        ]);
        createSelect('Task Type', 'eng-task', [
          { val: 'write', name: '✍️ Write Code' },
          { val: 'debug', name: '🐛 Debug Code' },
          { val: 'review', name: '🔍 Code Review' },
          { val: 'architect', name: '🏛️ System Architecture' },
          { val: 'optimize', name: '🚀 Optimize Performance' }
        ]);
        createTextarea('Describe What You Need', 'eng-text', 'e.g. Build a REST API endpoint with JWT auth...', '');
      }
      break;

    case 'creative':
      {
        const d = document.createElement('div');
        d.innerHTML = \`<div style="text-align:center;padding:16px 10px;"><div style="font-size:36px;margin-bottom:8px;">🎨</div><h3 style="color:var(--color-primary);margin-bottom:6px;">Creative Director Mode</h3><p style="color:var(--text-muted);font-size:12px;line-height:1.5;">FLUX/Midjourney prompts, storytelling, creative writing and content.</p></div>\`;
        container.appendChild(d);
        createSelect('Creative Type', 'cr-type', [
          { val: 'story', name: '📖 Short Story / Fiction' },
          { val: 'poem', name: '🎶 Poem / Lyrics' },
          { val: 'script', name: '🎬 Script / Screenplay' },
          { val: 'blog', name: '✍️ Blog Post / Article' },
          { val: 'ad-copy', name: '📣 Ad Copy / Tagline' },
          { val: 'midjourney', name: '🖼️ Midjourney Prompt' },
          { val: 'flux', name: '⚡ FLUX Image Prompt' }
        ]);
        createTextarea('Your Creative Brief', 'cr-text', 'Describe your creative vision or topic...', '');
      }
      break;

    case 'cmo-seo':
      {
        const d = document.createElement('div');
        d.innerHTML = \`<div style="text-align:center;padding:16px 10px;"><div style="font-size:36px;margin-bottom:8px;">📈</div><h3 style="color:var(--color-primary);margin-bottom:6px;">CMO & SEO Mode</h3><p style="color:var(--text-muted);font-size:12px;line-height:1.5;">BeyondSEO 2.0, GEO, growth strategy and marketing campaigns.</p></div>\`;
        container.appendChild(d);
        createSelect('Marketing Task', 'cmo-task', [
          { val: 'seo-audit', name: '🔍 SEO Audit' },
          { val: 'keyword-research', name: '🔑 Keyword Research' },
          { val: 'geo-plan', name: '🌍 GEO Strategy Plan' },
          { val: 'content-strategy', name: '📝 Content Strategy' },
          { val: 'social-campaign', name: '📱 Social Media Campaign' },
          { val: 'email-campaign', name: '📧 Email Campaign' },
          { val: 'growth-plan', name: '🚀 30/60/90 Growth Plan' }
        ]);
        createInput('Website / Brand URL', 'cmo-url', 'text', 'https://yoursite.com', '');
        createTextarea('Describe Your Goals', 'cmo-text', 'e.g. Increase organic traffic by 50% in 3 months...', '');
      }
      break;

    case 'designer':
      {
        const d = document.createElement('div');
        d.innerHTML = \`<div style="text-align:center;padding:16px 10px;"><div style="font-size:36px;margin-bottom:8px;">📐</div><h3 style="color:var(--color-primary);margin-bottom:6px;">Designer Mode</h3><p style="color:var(--text-muted);font-size:12px;line-height:1.5;">UI/UX design, 3D art direction, design systems and brand identity.</p></div>\`;
        container.appendChild(d);
        createSelect('Design Task', 'des-task', [
          { val: 'ui-design', name: '🖥️ UI Design (Web/App)' },
          { val: 'ux-flow', name: '🗺️ UX Flow & Wireframe' },
          { val: 'design-system', name: '🧩 Design System & Tokens' },
          { val: 'brand-identity', name: '🏷️ Brand Identity' },
          { val: 'color-palette', name: '🎨 Color Palette Generation' },
          { val: '3d-art', name: '🌐 3D Art Direction' }
        ]);
        createTextarea('Design Brief', 'des-text', 'Describe the design you need...', '');
      }
      break;

    case 'link-expert':
      {
        const d = document.createElement('div');
        d.innerHTML = \`<div style="text-align:center;padding:16px 10px;"><div style="font-size:36px;margin-bottom:8px;">🔗</div><h3 style="color:var(--color-primary);margin-bottom:6px;">Link Expert Mode</h3><p style="color:var(--text-muted);font-size:12px;line-height:1.5;">Deep URL analysis, backlink strategy, and link building.</p></div>\`;
        container.appendChild(d);
        createInput('Enter URL to Analyze', 'link-url', 'url', 'https://example.com/page', '');
        createSelect('Analysis Type', 'link-type', [
          { val: 'analyze', name: '🔍 Deep URL Analysis' },
          { val: 'backlinks', name: '🔗 Backlink Strategy' },
          { val: 'internal', name: '🕸️ Internal Link Audit' },
          { val: 'competitor', name: '⚔️ Competitor Link Profile' }
        ]);
        createTextarea('Additional Context (Optional)', 'link-text', 'e.g. I want to build links to my product page...', '');
      }
      break;

    case 'strategist':
      {
        const d = document.createElement('div');
        d.innerHTML = \`<div style="text-align:center;padding:16px 10px;"><div style="font-size:36px;margin-bottom:8px;">🔬</div><h3 style="color:var(--color-primary);margin-bottom:6px;">Strategist Mode</h3><p style="color:var(--text-muted);font-size:12px;line-height:1.5;">30/60/90 day roadmaps, business strategy and scientific research.</p></div>\`;
        container.appendChild(d);
        createSelect('Strategy Type', 'str-type', [
          { val: '30-60-90', name: '📅 30/60/90 Day Plan' },
          { val: 'business-plan', name: '💼 Business Plan' },
          { val: 'swot', name: '⚖️ SWOT Analysis' },
          { val: 'competitive', name: '⚔️ Competitive Analysis' },
          { val: 'research', name: '🔬 Research & Analysis' },
          { val: 'product-roadmap', name: '🗺️ Product Roadmap' }
        ]);
        createTextarea('Your Goal or Business Context', 'str-text', 'e.g. Launch a SaaS product in the AI niche by Q1 2027...', '');
      }
      break;

    case 'superpowers':
      {
        const d = document.createElement('div');
        d.innerHTML = \`<div style="text-align:center;padding:16px 10px;"><div style="font-size:36px;margin-bottom:8px;">⭐</div><h3 style="color:var(--color-primary);margin-bottom:6px;">Superpowers Mode</h3><p style="color:var(--text-muted);font-size:12px;line-height:1.5;">Brainstorm, ideate and get creative breakthroughs using combined AI intelligence.</p></div>\`;
        container.appendChild(d);
        createSelect('Superpower', 'sp-type', [
          { val: 'brainstorm', name: '🧠 Brainstorm Ideas' },
          { val: 'problem-solve', name: '🔧 Problem Solve (5 Whys)' },
          { val: 'first-principles', name: '⚗️ First Principles Thinking' },
          { val: 'lateral-thinking', name: '🌀 Lateral Thinking' },
          { val: 'future-cast', name: '🔭 Futurecasting (10 Years)' },
          { val: 'decision-matrix', name: '⚖️ Decision Matrix' }
        ]);
        createTextarea('What Do You Want to Solve or Explore?', 'sp-text', 'e.g. I want to brainstorm a new app idea in the wellness niche...', '');
      }
      break;

    case 'nextjs-api':
      {
        const d = document.createElement('div');
        d.innerHTML = \`<div style="text-align:center;padding:16px 10px;"><div style="font-size:36px;margin-bottom:8px;">▲</div><h3 style="color:var(--color-primary);margin-bottom:6px;">Next.js API Mode</h3><p style="color:var(--text-muted);font-size:12px;line-height:1.5;">Generate production-ready Next.js API routes, middleware, and schemas.</p></div>\`;
        container.appendChild(d);
        createSelect('API Type', 'nxt-type', [
          { val: 'route-handler', name: '📡 Route Handler (App Router)' },
          { val: 'api-route', name: '🔌 API Route (Pages Router)' },
          { val: 'middleware', name: '🔒 Middleware' },
          { val: 'zod-schema', name: '✅ Zod Validation Schema' },
          { val: 'server-action', name: '⚡ Server Action' },
          { val: 'auth-guard', name: '🛡️ Auth Guard / JWT' }
        ]);
        createSelect('HTTP Method', 'nxt-method', [
          { val: 'GET', name: 'GET' },
          { val: 'POST', name: 'POST' },
          { val: 'PUT', name: 'PUT' },
          { val: 'DELETE', name: 'DELETE' },
          { val: 'PATCH', name: 'PATCH' }
        ]);
        createTextarea('Describe the Endpoint', 'nxt-text', 'e.g. A POST endpoint to create a user with email & password, validated with Zod...', '');
      }
      break;

    case 'seo-geo':
      {
        const d = document.createElement('div');
        d.innerHTML = \`<div style="text-align:center;padding:16px 10px;"><div style="font-size:36px;margin-bottom:8px;">🌍</div><h3 style="color:var(--color-primary);margin-bottom:6px;">SEO & GEO Mode</h3><p style="color:var(--text-muted);font-size:12px;line-height:1.5;">BeyondSEO 2.0 strategy with AI-powered Generative Engine Optimization.</p></div>\`;
        container.appendChild(d);
        createSelect('SEO/GEO Task', 'seo-task', [
          { val: 'geo-audit', name: '🤖 GEO Audit (AI Search)' },
          { val: 'schema-markup', name: '📋 Schema Markup (JSON-LD)' },
          { val: 'meta-tags', name: '🏷️ Meta Tags Generator' },
          { val: 'title-desc', name: '✍️ Title & Description Writer' },
          { val: 'content-brief', name: '📝 SEO Content Brief' },
          { val: 'technical-seo', name: '⚙️ Technical SEO Checklist' }
        ]);
        createInput('Website or Page URL', 'seo-url', 'text', 'https://yoursite.com', '');
        createTextarea('Target Keywords / Topic', 'seo-text', 'e.g. AI chatbot software for small businesses...', '');
      }
      break;

    case 'ai-art-prompt':
      {
        const d = document.createElement('div');
        d.innerHTML = \`<div style="text-align:center;padding:16px 10px;"><div style="font-size:36px;margin-bottom:8px;">🖼️</div><h3 style="color:var(--color-primary);margin-bottom:6px;">AI Art Prompt Generator</h3><p style="color:var(--text-muted);font-size:12px;line-height:1.5;">Generate stunning Midjourney v6, FLUX, DALL·E 3, and Stable Diffusion prompts.</p></div>\`;
        container.appendChild(d);
        createSelect('AI Art Platform', 'art-platform', [
          { val: 'midjourney', name: '🎨 Midjourney v6' },
          { val: 'flux', name: '⚡ FLUX 1.1 Pro' },
          { val: 'dalle3', name: '🤖 DALL·E 3' },
          { val: 'stable-diffusion', name: '🌊 Stable Diffusion XL' },
          { val: 'ideogram', name: '🔤 Ideogram v2' }
        ]);
        createSelect('Art Style', 'art-style', [
          { val: 'photorealistic', name: '📷 Photorealistic' },
          { val: 'cinematic', name: '🎬 Cinematic / Movie Still' },
          { val: 'anime', name: '🎌 Anime / Manga' },
          { val: 'oil-painting', name: '🖌️ Oil Painting' },
          { val: 'cyberpunk', name: '🌆 Cyberpunk / Neon' },
          { val: 'fantasy', name: '🧙 Fantasy / Sci-Fi' },
          { val: 'minimalist', name: '⬜ Minimalist / Clean' }
        ]);
        createTextarea('Describe Your Scene or Subject', 'art-text', 'e.g. A lone astronaut exploring a purple alien jungle at golden hour...', '');
      }
      break;

    case 'roll-d20':
      {
        const d = document.createElement('div');
        d.style.textAlign = 'center';
        d.style.padding = '20px 10px';
        const roll = Math.floor(Math.random() * 20) + 1;
        const color = roll === 20 ? '#FFD700' : roll === 1 ? '#FF4136' : 'var(--color-primary)';
        const label = roll === 20 ? '🌟 CRITICAL HIT!' : roll === 1 ? '💀 CRITICAL FAIL!' : '🎲 You rolled...';
        d.innerHTML = \`
          <div style="font-size:80px;margin-bottom:10px;animation:pulse 1s ease;">🎲</div>
          <h2 style="color:\${color};font-size:48px;font-weight:900;margin-bottom:8px;">\${roll}</h2>
          <p style="color:\${color};font-size:18px;font-weight:700;margin-bottom:16px;">\${label}</p>
          <p style="color:var(--text-muted);font-size:12px;margin-bottom:20px;">Rolling a 20-sided dice (D20).</p>
          <button onclick="switchWorkspaceMode('roll-d20')" style="background:var(--color-primary);color:#000;border:none;padding:12px 28px;border-radius:50px;font-weight:700;font-size:14px;cursor:pointer;">🎲 Roll Again</button>
        \`;
        container.appendChild(d);
        DOM.writingExecuteBtn.style.display = 'none';
      }
      break;

    default:
      createTextarea(\`Enter details for \${mode.replace(/-/g, ' ')}\`, 'generic-text', 'Type your requirements here...', '');
      break;`;

// Replace the old default case
js = js.replace(
  /default:\s*\n\s*createTextarea\(`Enter details for \${mode\.replace\(\/-\/g, ' '\)}`, 'generic-text', 'Type your requirements here\.\.\.', ''\);\s*\n\s*break;/,
  richModeCases
);

fs.writeFileSync(appFile, js);
console.log('All tools properly implemented in app.js!');
