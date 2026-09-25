const fs = require('fs');
const path = require('path');

const appFile = path.join(__dirname, 'app.js');
let appJs = fs.readFileSync(appFile, 'utf8');

const helpCode = `
    case 'help-menu':
      const helpDiv = document.createElement('div');
      helpDiv.style.padding = '20px';
      helpDiv.style.background = 'rgba(255,255,255,0.05)';
      helpDiv.style.borderRadius = '12px';
      helpDiv.style.border = '1px solid var(--border-glass)';
      helpDiv.style.marginTop = '15px';
      helpDiv.innerHTML = \`
        <h3 style="color: var(--color-primary); margin-bottom: 10px;">Contact Customer Care</h3>
        <p style="font-size: 15px; line-height: 1.6; color: var(--text-color);">
          If you have any problems, please call customer care at <strong style="color: var(--color-secondary);">6290873841</strong>.<br>
          Our team will get back to you.<br><br>
          Email ID: <strong style="color: var(--color-secondary);">qwicklabs2@gmail.com</strong>
        </p>
      \`;
      container.appendChild(helpDiv);
      DOM.writingExecuteBtn.style.display = 'none';
      break;
    default:`;

// Inject before default
appJs = appJs.replace(/default:\s*createTextarea/, helpCode + '\n      createTextarea');

fs.writeFileSync(appFile, appJs);
console.log('Added help menu mode to app.js');
