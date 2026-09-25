const fs = require('fs');

// ============================================================
// AURA AI — MASTER FIX SCRIPT v3.8
// Fixes: mobile dropdown labels, mobile sidebar toggle, 
//        option emojis, mobile UX improvements
// ============================================================

// ---- 1. FIX index.html ----
let html = fs.readFileSync('index.html', 'utf8');

// Fix mobile dropdown - add proper emojis to all options that are missing them
html = html.replace(
  '<option value="sidebar-auto-btn">Auto</option>',
  '<option value="sidebar-auto-btn">⚡ Auto Mode</option>'
);
html = html.replace(
  '<option value="sidebar-engineer-btn">Engineer</option>',
  '<option value="sidebar-engineer-btn">💻 Engineer</option>'
);
html = html.replace(
  '<option value="sidebar-designer-btn">Designer</option>',
  '<option value="sidebar-designer-btn">🎨 Designer Studio</option>'
);
html = html.replace(
  '<option value="sidebar-link-expert-btn">Link Expert</option>',
  '<option value="sidebar-link-expert-btn">🔗 Link Expert</option>'
);
html = html.replace(
  '<option value="sidebar-strategist-btn">Strategist</option>',
  '<option value="sidebar-strategist-btn">🔬 Strategist</option>'
);
html = html.replace(
  '<option value="sidebar-superpowers-btn">Superpowers</option>',
  '<option value="sidebar-superpowers-btn">⭐ Superpowers</option>'
);
html = html.replace(
  '<option value="sidebar-nextjs-api-btn">Next.js API</option>',
  '<option value="sidebar-nextjs-api-btn">▲ Next.js API</option>'
);
html = html.replace(
  '<option value="sidebar-seo-btn">SEO</option>',
  '<option value="sidebar-seo-btn">🌍 SEO</option>'
);
html = html.replace(
  '<option value="sidebar-roll-d20-btn">Roll D20</option>',
  '<option value="sidebar-roll-d20-btn">🎲 Roll D20</option>'
);
html = html.replace(
  '<option value="sidebar-help-menu-btn">Help Menu</option>',
  '<option value="sidebar-help-menu-btn">❓ Help & Support</option>'
);

// Fix developer credit
html = html.replace('Developed by sakshi', 'Aura AI — Powered by Qwicklabs');

// Bump versions
html = html.replace('style.css?v=3.7', 'style.css?v=3.8');
html = html.replace('aura-pro-ui.css?v=1.0', 'aura-pro-ui.css?v=1.1');
html = html.replace('app.js?v=3.7', 'app.js?v=3.8');

fs.writeFileSync('index.html', html);
console.log('✅ index.html fixed');

// ---- 2. FIX app.js ----
let js = fs.readFileSync('app.js', 'utf8');

// Fix mobile dropdown to also sync the dropdown selection when switching via sidebar click
const mobileSyncCode = `
  // Sync mobile dropdown to current mode
  const mobileDropdown = document.getElementById('mobile-tool-dropdown');
  if (mobileDropdown) {
    const targetBtnId = 'sidebar-' + mode + '-btn';
    for (let opt of mobileDropdown.options) {
      if (opt.value === targetBtnId) {
        mobileDropdown.value = targetBtnId;
        break;
      }
    }
  }
`;

// Insert sync code at end of switchWorkspaceMode, before closing brace
// Find the renderWritingHubInputs call area
if (!js.includes('Sync mobile dropdown to current mode')) {
  // Add after the active btn highlight line in switchWorkspaceMode
  js = js.replace(
    `  // Update mobile nav buttons active highlights
  const mobileNavButtons = document.querySelectorAll('.mobile-nav-btn');
  mobileNavButtons.forEach(btn => btn.classList.remove('active'));`,
    `  // Update mobile nav buttons active highlights
  const mobileNavButtons = document.querySelectorAll('.mobile-nav-btn');
  mobileNavButtons.forEach(btn => btn.classList.remove('active'));
${mobileSyncCode}`
  );
  console.log('✅ Mobile dropdown sync added to switchWorkspaceMode');
}

// Fix the 'proj' mode - sidebar-proj-btn opens history drawer
if (!js.includes("case 'proj':") && !js.includes("mode === 'proj'")) {
  // Add proj handler in modes loop
  js = js.replace(
    `  const calcBtn = document.getElementById('sidebar-calculator-btn');`,
    `  // Special: proj button opens history drawer
  const projBtn = document.getElementById('sidebar-proj-btn');
  if (projBtn) {
    projBtn.addEventListener('click', () => {
      if (DOM.historySidebar) DOM.historySidebar.classList.add('open');
    });
  }

  const calcBtn = document.getElementById('sidebar-calculator-btn');`
  );
  console.log('✅ proj button handler fixed');
}

// Add 'pdf' and 'voice' to modes array if missing
if (!js.includes("'pdf'") && js.includes("const modes = [")) {
  js = js.replace("'help-menu'\n  ];", "'help-menu',\n    'pdf',\n    'voice'\n  ];");
  console.log('✅ pdf and voice added to modes array');
}

// Fix pdf mode case if missing
if (!js.includes("case 'pdf':")) {
  js = js.replace(
    "case 'roll-d20':",
    `case 'pdf':
      {
        // PDF tool is handled by switchTab('pdf-tools') in switchWorkspaceMode
        // This case intentionally falls through to the tool view
      }
      break;
    case 'voice':
      {
        // Voice tool handled by switchTab('voice') in switchWorkspaceMode
      }
      break;
    case 'roll-d20':`
  );
  console.log('✅ pdf and voice cases added');
}

fs.writeFileSync('app.js', js);
console.log('✅ app.js fixed');

// ---- 3. FIX aura-pro-ui.css ----
let css = fs.readFileSync('aura-pro-ui.css', 'utf8');

// Add missing mobile sidebar button for vertical skills sidebar on mobile
// When user swipes or taps a hamburger for TOOLS (not history)
const additionalCSS = `

/* ===== SIDEBAR MOBILE BOTTOM TOGGLE (Tools access on mobile) ===== */
@media (max-width: 768px) {
  /* Make mobile dropdown bigger and more accessible */
  .mobile-tool-selector {
    padding: 10px 12px 8px !important;
    gap: 8px !important;
  }

  #mobile-tool-dropdown {
    font-size: 0.9rem !important;
    font-weight: 600 !important;
    padding: 12px 36px 12px 14px !important;
  }

  /* Welcome screen improvements on mobile */
  .welcome-header h1 {
    font-size: 1.6rem !important;
  }

  .welcome-header p {
    font-size: 0.85rem !important;
  }

  /* Chat messages padding on mobile */
  .chat-messages {
    padding: 12px 10px !important;
  }

  /* Message bubble max width on mobile */
  .message {
    max-width: 95% !important;
  }

  /* Fix header on mobile */
  .app-header {
    padding: 8px 10px !important;
    min-height: 52px !important;
  }

  #bot-name {
    font-size: 1rem !important;
    font-weight: 800 !important;
  }

  #bot-status {
    font-size: 0.65rem !important;
  }

  /* Footer input area */
  .chat-footer {
    padding: 8px 10px !important;
  }

  .input-container {
    border-radius: 12px !important;
  }

  /* Tool panel on mobile */
  .writing-hub-panel {
    padding: 12px 10px !important;
  }

  /* Solver inputs on mobile */
  .solver-select, .solver-input, .prompt-textarea {
    font-size: 16px !important;
    padding: 12px !important;
  }
}

/* ===== WELCOME SCREEN ===== */
.welcome-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 20px;
  text-align: center;
}

.welcome-aura-logo {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, #8B5CF6, #06B6D4);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 900;
  color: white;
  margin-bottom: 16px;
  box-shadow: 0 0 40px rgba(139,92,246,0.4);
  animation: pulse-glow 3s ease-in-out infinite;
}

@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 30px rgba(139,92,246,0.3); }
  50% { box-shadow: 0 0 60px rgba(139,92,246,0.6); }
}

/* ===== RESULT OUTPUT AREA ===== */
.writing-output-area {
  background: rgba(20,26,40,0.8);
  border: 1px solid rgba(139,92,246,0.2);
  border-radius: 12px;
  padding: 16px;
  min-height: 80px;
  font-size: 0.875rem;
  line-height: 1.7;
  color: var(--text-main);
  white-space: pre-wrap;
  word-break: break-word;
}

/* ===== TOOL PANEL CONTAINER ===== */
#tool-view-container {
  overflow-y: auto !important;
  flex: 1 !important;
}

/* ===== WRITING HUB ===== */
#writing-hub-inputs {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-bottom: 80px;
}

/* Ensure execute button stays visible */
#writing-execute-btn {
  position: sticky !important;
  bottom: 0 !important;
  z-index: 10 !important;
  box-shadow: 0 -4px 20px rgba(0,0,0,0.5) !important;
}
`;

css += additionalCSS;
fs.writeFileSync('aura-pro-ui.css', css);
console.log('✅ aura-pro-ui.css enhanced with mobile improvements');

console.log('\n🎉 All fixes applied! Run: git add -A && git commit && git push');
