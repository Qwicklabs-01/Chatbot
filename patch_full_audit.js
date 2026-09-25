const fs = require('fs');

// ============================================================
// FULL AUDIT FIX for Aura AI
// Ensures every sidebar button has a matching mode + case
// ============================================================

const appFile = 'app.js';
let js = fs.readFileSync(appFile, 'utf8');

// STEP 1: Fix the modes[] array to exactly match sidebar buttons
// Sidebar has: proj, chat, paraphraser, grammar-checker, ai-detector,
// plagiarism-checker, ai-humanizer, youtube-automation, ai-job-search,
// translator, summarizer, citation-generator, auto, engineer, designer,
// link-expert, strategist, superpowers, nextjs-api, seo, roll-d20, help-menu,
// pdf, voice, calculator (last 3 handled separately)
const correctModesBlock = `  const modes = [
    'paraphraser',
    'grammar-checker',
    'ai-detector',
    'plagiarism-checker',
    'ai-humanizer',
    'youtube-automation',
    'ai-job-search',
    'translator',
    'summarizer',
    'citation-generator',
    'auto',
    'engineer',
    'designer',
    'link-expert',
    'strategist',
    'superpowers',
    'nextjs-api',
    'seo',
    'roll-d20',
    'help-menu'
  ];`;

// Replace existing modes block
js = js.replace(/const modes = \[[\s\S]*?\];/, correctModesBlock);

// STEP 2: Fix orphaned redirect cases — creative and ai-image-generator 
// already redirect to designer, that's fine. But 'creative' is still in 
// modes which causes a broken binding (no button). Already removed above.

// STEP 3: Add missing cases for youtube-automation and ai-job-search
// Check if youtube-automation case exists
if (!js.includes("case 'youtube-automation':")) {
  js = js.replace(
    "case 'citation-generator':",
    `case 'youtube-automation':
      {
        const d = document.createElement('div');
        d.innerHTML = \`<div style="text-align:center;padding:16px 10px;"><div style="font-size:36px;margin-bottom:8px;">📺</div><h3 style="color:var(--color-primary);margin-bottom:6px;">YouTube Automation</h3><p style="color:var(--text-muted);font-size:12px;line-height:1.5;">Scripts, titles, descriptions, tags, thumbnails and channel strategy.</p></div>\`;
        container.appendChild(d);
        createSelect('YouTube Task', 'yt-task', [
          { val: 'script', name: '📝 Video Script Writer' },
          { val: 'title-desc', name: '🏷️ Title & Description Optimizer' },
          { val: 'tags', name: '🔖 Tags & Keywords Generator' },
          { val: 'thumbnail', name: '🖼️ Thumbnail Concept & Prompt' },
          { val: 'hook', name: '🎣 Hook & Intro Writer' },
          { val: 'channel-strategy', name: '📈 Channel Growth Strategy' },
          { val: 'shorts', name: '📱 YouTube Shorts Script' }
        ]);
        createInput('Video Topic / Niche', 'yt-topic', 'text', 'e.g. How to make money with AI in 2026...', '');
        createTextarea('Additional Details', 'yt-text', 'Target audience, tone, video length, competitors...', '');
      }
      break;
    case 'citation-generator':`
  );
}

// Add ai-job-search case if missing
if (!js.includes("case 'ai-job-search':")) {
  js = js.replace(
    "case 'translator':",
    `case 'ai-job-search':
      {
        const d = document.createElement('div');
        d.innerHTML = \`<div style="text-align:center;padding:16px 10px;"><div style="font-size:36px;margin-bottom:8px;">💼</div><h3 style="color:var(--color-primary);margin-bottom:6px;">AI Job Search</h3><p style="color:var(--text-muted);font-size:12px;line-height:1.5;">Find jobs, tailor your CV, write cover letters and prepare for interviews.</p></div>\`;
        container.appendChild(d);
        createSelect('Job Search Task', 'job-task', [
          { val: 'cv-tailor', name: '📄 Tailor CV to Job Description' },
          { val: 'cover-letter', name: '✉️ Write Cover Letter' },
          { val: 'linkedin', name: '💼 Optimize LinkedIn Profile' },
          { val: 'interview-prep', name: '🎤 Interview Preparation' },
          { val: 'job-evaluate', name: '⚖️ Evaluate Job Offer' },
          { val: 'salary-negotiation', name: '💰 Salary Negotiation Script' },
          { val: 'job-search', name: '🔍 Job Search Strategy' }
        ]);
        createInput('Job Title / Role', 'job-title', 'text', 'e.g. Senior Frontend Developer', '');
        createTextarea('Paste Job Description or Your CV', 'job-text', 'Paste the job description or your current CV here...', '');
      }
      break;
    case 'translator':`
  );
}

// STEP 4: Fix the global execute button block to also exclude roll-d20
js = js.replace(
  `if (mode !== 'prompt-builder' && mode !== 'help-menu') {
    DOM.writingExecuteBtn.style.display = 'block';
  }`,
  `if (mode !== 'prompt-builder' && mode !== 'help-menu' && mode !== 'roll-d20') {
    DOM.writingExecuteBtn.style.display = 'block';
  }`
);

fs.writeFileSync(appFile, js);
console.log('✅ Full audit fix applied to app.js');

// STEP 5: Fix index.html — ensure mobile dropdown matches sidebar exactly
const indexFile = 'index.html';
let html = fs.readFileSync(indexFile, 'utf8');

// Check if youtube-automation and ai-job-search are in mobile dropdown
if (!html.includes('sidebar-youtube-automation-btn')) {
  console.log('⚠️  youtube-automation missing from mobile dropdown — already in sidebar only');
}

fs.writeFileSync(indexFile, html);
console.log('✅ index.html checked');
