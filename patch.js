const fs = require('fs');
const path = require('path');

const indexFile = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexFile, 'utf8');

const newModes = [
  { id: 'auto', name: 'Auto', icon: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>' },
  { id: 'engineer', name: 'Engineer', icon: '<polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline>' },
  { id: 'creative', name: 'Creative', icon: '<path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>' },
  { id: 'cmo-seo', name: 'CMO & SEO', icon: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>' },
  { id: 'designer', name: 'Designer', icon: '<path d="M12 20h9"></path><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>' },
  { id: 'link-expert', name: 'Link Expert', icon: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>' },
  { id: 'strategist', name: 'Strategist', icon: '<circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>' },
  { id: 'superpowers', name: 'Superpowers', icon: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>' },
  { id: 'nextjs-api', name: 'Next.js API', icon: '<rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line>' },
  { id: 'seo-geo', name: 'SEO & GEO', icon: '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>' },
  { id: 'ai-art-prompt', name: 'AI Art Prompt', icon: '<circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="3"></circle>' },
  { id: 'roll-d20', name: 'Roll D20', icon: '<polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"></polygon><line x1="12" y1="22" x2="12" y2="15.5"></line><polyline points="22 8.5 12 15.5 2 8.5"></polyline><polyline points="2 15.5 12 8.5 22 15.5"></polyline><line x1="12" y1="2" x2="12" y2="8.5"></line>' },
  { id: 'help-menu', name: 'Help Menu', icon: '<circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line>' }
];

let buttonsHtml = '';
let mobileDropdownHtml = '';
let writingDropdownHtml = '';

for (const m of newModes) {
  buttonsHtml += `
        <!-- ${m.name} -->
        <button class="sidebar-btn" id="sidebar-${m.id}-btn" title="${m.name}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${m.icon}</svg>
          <span>${m.name}</span>
        </button>\n`;
  mobileDropdownHtml += `            <option value="sidebar-${m.id}-btn">${m.name}</option>\n`;
  writingDropdownHtml += `                      <option value="${m.id}">${m.name}</option>\n`;
}

// 1. Inject sidebar buttons
html = html.replace('<!-- PDF Tools -->', buttonsHtml + '\n        <!-- PDF Tools -->');
// 2. Inject mobile dropdown
html = html.replace('<option value="sidebar-pdf-btn">📄 PDF Tools</option>', mobileDropdownHtml + '            <option value="sidebar-pdf-btn">📄 PDF Tools</option>');
// 3. Inject writing mode selector
html = html.replace('</select>\n                  </div>', writingDropdownHtml + '                    </select>\n                  </div>');

fs.writeFileSync(indexFile, html);
console.log('Patched index.html');

// Patch app.js
const appFile = path.join(__dirname, 'app.js');
let appJs = fs.readFileSync(appFile, 'utf8');

const modesStr = newModes.map(m => `'${m.id}'`).join(',\n    ');
appJs = appJs.replace("'ui-styling'", "'ui-styling',\n    " + modesStr);

fs.writeFileSync(appFile, appJs);
console.log('Patched app.js');
