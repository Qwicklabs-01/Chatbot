/**
 * Aura AI - Mobile Chatbot Client Application
 * Pure Client-Side JavaScript Chat Engine & Skills (Universal Edition)
 */

// --- Sitemap Calculator Database ---
const financeList = ["Mortgage Calculator", "Loan Calculator", "Auto Loan Calculator", "Interest Calculator", "Payment Calculator", "Retirement Calculator", "Amortization Calculator", "Investment Calculator", "Currency Calculator", "Inflation Calculator", "Finance Calculator", "Mortgage Payoff Calculator", "Income Tax Calculator", "Compound Interest Calculator", "Salary Calculator", "401K Calculator", "Interest Rate Calculator", "Sales Tax Calculator", "House Affordability Calculator", "Savings Calculator", "Rent Calculator", "Marriage Tax Calculator", "Estate Tax Calculator", "Pension Calculator", "Social Security Calculator", "Annuity Calculator", "Annuity Payout Calculator", "Credit Card Calculator", "Credit Cards Payoff Calculator", "Debt Payoff Calculator", "Debt Consolidation Calculator", "Repayment Calculator", "Student Loan Calculator", "College Cost Calculator", "Simple Interest Calculator", "CD Calculator", "Bond Calculator", "Mutual Fund Calculator", "Roth IRA Calculator", "IRA Calculator", "RMD Calculator", "VAT Calculator", "Cash Back or Low Interest Calculator", "Auto Lease Calculator", "Depreciation Calculator", "Average Return Calculator", "Margin Calculator", "Discount Calculator", "Business Loan Calculator", "Debt-to-Income Ratio Calculator", "Real Estate Calculator", "Take-Home-Paycheck Calculator", "Personal Loan Calculator", "Boat Loan Calculator", "Lease Calculator", "Refinance Calculator", "Budget Calculator", "Rental Property Calculator", "IRR Calculator", "ROI Calculator", "APR Calculator", "FHA Loan Calculator", "VA Mortgage Calculator", "Home Equity Loan Calculator", "HELOC Calculator", "Down Payment Calculator", "Rent vs. Buy Calculator", "Payback Period Calculator", "Present Value Calculator", "Future Value Calculator", "Commission Calculator", "Mortgage Calculator UK", "Canadian Mortgage Calculator", "Mortgage Amortization Calculator", "Percent Off Calculator"];

const healthList = ["BMI Calculator", "Calorie Calculator", "Body Fat Calculator", "BMR Calculator", "Macro Calculator", "Ideal Weight Calculator", "Pregnancy Calculator", "Pregnancy Weight Gain Calculator", "Pregnancy Conception Calculator", "Due Date Calculator", "Pace Calculator", "Army Body Fat Calculator", "Carbohydrate Calculator", "Lean Body Mass Calculator", "Healthy Weight Calculator", "Calories Burned Calculator", "One Rep Max Calculator", "Target Heart Rate Calculator", "Protein Calculator", "Fat Intake Calculator", "TDEE Calculator", "Ovulation Calculator", "Conception Calculator", "Period Calculator", "GFR Calculator", "Body Type Calculator", "Body Surface Area Calculator", "BAC Calculator", "Anorexic BMI Calculator", "Weight Watcher Points Calculator", "Overweight Calculator"];

const mathList = ["Scientific Calculator", "Fraction Calculator", "Percentage Calculator", "Triangle Calculator", "Volume Calculator", "Standard Deviation Calculator", "Random Number Generator", "Number Sequence Calculator", "Percent Error Calculator", "Exponent Calculator", "Binary Calculator", "Hex Calculator", "Half-Life Calculator", "Quadratic Formula Calculator", "Slope Calculator", "Log Calculator", "Area Calculator", "Sample Size Calculator", "Probability Calculator", "Statistics Calculator", "Mean, Median, Mode, Range Calculator", "Permutation and Combination Calculator", "Z-score Calculator", "Confidence Interval Calculator", "Ratio Calculator", "Distance Calculator", "Circle Calculator", "Surface Area Calculator", "Pythagorean Theorem Calculator", "Right Triangle Calculator", "Root Calculator", "Least Common Multiple Calculator", "Greatest Common Factor Calculator", "Factor Calculator", "Rounding Calculator", "Matrix Calculator", "Scientific Notation Calculator", "Big Number Calculator", "Prime Factorization Calculator", "Common Factor Calculator", "Basic Calculator", "Long Division Calculator", "Average Calculator", "P-value Calculator"];

const otherList = ["Age Calculator", "Date Calculator", "Time Calculator", "Hours Calculator", "GPA Calculator", "Grade Calculator", "Height Calculator", "Concrete Calculator", "IP Subnet Calculator", "Bra Size Calculator", "Password Generator", "Dice Roller", "Conversion Calculator", "Fuel Cost Calculator", "Voltage Drop Calculator", "BTU Calculator", "Square Footage Calculator", "Time Card Calculator", "Time Zone Calculator", "Love Calculator", "GDP Calculator", "Gas Mileage Calculator", "Horsepower Calculator", "Engine Horsepower Calculator", "Stair Calculator", "Resistor Calculator", "Ohms Law Calculator", "Electricity Calculator", "Shoe Size Conversion", "Tip Calculator", "Mileage Calculator", "Density Calculator", "Mass Calculator", "Weight Calculator", "Speed Calculator", "Molarity Calculator", "Molecular Weight Calculator", "Roman Numeral Converter", "Golf Handicap Calculator", "Sleep Calculator", "Tire Size Calculator", "Roofing Calculator", "Tile Calculator", "Mulch Calculator", "Gravel Calculator", "Wind Chill Calculator", "Heat Index Calculator", "Dew Point Calculator", "Bandwidth Calculator", "Base64 Encode / Decode", "URL Encode / Decode", "Time Duration Calculator", "Day Counter", "Day of the Week Calculator"];

const calculatorsDB = [];

function getCalculatorDesc(id, name) {
  if (id.includes('mortgage') || id.includes('loan')) return 'Calculate monthly repayments, interest fees, and amortization rates.';
  if (id.includes('interest')) return 'Determine interest accrual and future value payouts.';
  if (id.includes('bmi')) return 'Assess Body Mass Index based on height and weight.';
  if (id.includes('calorie') || id.includes('bmr')) return 'Calculate caloric intakes and maintenance targets.';
  if (id.includes('quadratic')) return 'Resolve real and complex quadratic roots.';
  if (id.includes('stats')) return 'Compute mean, standard deviations, and variances.';
  if (id.includes('age') || id.includes('date')) return 'Determine exact days or age years between dates.';
  if (id.includes('gpa') || id.includes('grade')) return 'Calculate academic GPA scores.';
  if (id.includes('tip') || id.includes('discount')) return 'Calculate final discounts, tips, or splitting bills.';
  if (id.includes('encode') || id.includes('decode')) return 'Convert strings using Base64 or URL schemas.';
  return `Local calculator for solving ${name.toLowerCase()} queries.`;
}

function getCalculatorTemplate(id, name) {
  if (id === 'mortgage-calculator') return `Calculate Mortgage: Amount=300000, Rate=4.5%, Years=30`;
  if (id === 'loan-calculator') return `Calculate Loan: Amount=10000, Rate=6%, Months=24`;
  if (id === 'compound-interest-calculator') return `Calculate Compound Interest: Principal=5000, Rate=5%, Years=10`;
  if (id === 'bmi-calculator') return `Calculate BMI: Weight=70kg, Height=175cm`;
  if (id === 'calorie-calculator' || id === 'bmr-calculator') return `Calculate BMR: Age=25, Gender=Male, Weight=75kg, Height=180cm`;
  if (id === 'age-calculator') return `Calculate Age: Birthdate=1998-05-15`;
  if (id === 'gpa-calculator') return `Calculate GPA: Grades=A,B,A,C Credits=3,3,4,3`;
  if (id === 'tip-calculator') return `Calculate Tip: Bill=85, Tip=15%, People=2`;
  return `Calculate ${name}: Input variables here`;
}

function registerCalculators(list, category, icon) {
  list.forEach(name => {
    const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const coreUIs = [
      'mortgage-calculator', 'loan-calculator', 'compound-interest-calculator', 'discount-calculator',
      'bmi-calculator', 'calorie-calculator', 'bmr-calculator',
      'scientific-calculator', 'quadratic-formula-calculator', 'statistics-calculator',
      'age-calculator', 'date-calculator', 'gpa-calculator', 'tip-calculator',
      'base64-encode-decode', 'url-encode-decode', 'conversion-calculator'
    ];
    const hasUI = coreUIs.includes(id);

    calculatorsDB.push({
      id,
      name,
      category,
      icon,
      hasUI,
      desc: getCalculatorDesc(id, name),
      template: getCalculatorTemplate(id, name)
    });
  });
}

registerCalculators(financeList, 'finance', '💵');
registerCalculators(healthList, 'health', '💪');
registerCalculators(mathList, 'math', '🧮');
registerCalculators(otherList, 'other', '⚙️');

// --- Application State ---
let state = {
  chatHistory: [],
  ttsEnabled: false,
  selectedVoiceName: '',
  isRecording: false,
  loadedFile: { name: '', type: '', size: 0, content: '' },
  pdfFiles: {
    file1: { name: '', buffer: null },
    file2: { name: '', buffer: null }
  },
  voices: [],
  activeTab: 'voice',
  
  // Universal Calculator State
  calcMode: 'scientific-calculator',
  latestResultText: '',
  latestResultChatText: '',

  // Writing Hub State
  writingMode: 'paraphraser',
  latestWritingResult: '',
  latestWritingChatText: '',

  // Image analysis cache
  analysedImagePalette: [],

  // Voice parameters
  ttsRate: 1.0,
  ttsPitch: 1.0,

  // Multi-session history variables
  sessions: [],
  activeSessionId: ''
};

// --- Local FAQ Database for chatbot responses ---
const faqDatabase = [
  {
    keywords: ["javascript", "js", "what is javascript"],
    response: "💡 **JavaScript (JS)** is a lightweight, interpreted, or just-in-time compiled programming language with first-class functions. It is best known as the scripting language for Web pages, but it's also used in environments like Node.js."
  },
  {
    keywords: ["joke", "laugh", "funny"],
    response: "😆 Why did the client-side developer go broke?\nBecause he kept losing his cache! 🪙\n\nHere's another:\nThere are `10` types of people in the world: those who understand binary, and those who don't!"
  },
  {
    keywords: ["help", "menu", "skills", "capabilities", "what can you do"],
    response: "❓ **Aura AI Capabilities Menu**:\n\n" +
              "• **Conversational Chat**: Talk to me offline. I will check my local FAQ database, parsed files, or Wikipedia!\n" +
              "• **Math Sandbox**: Type `=` followed by any JS Math expression (e.g., `= Math.sin(Math.PI/2) * 10`) to evaluate it live!\n" +
              "• **Local Tools**: Use the sidebar options or tab settings to access:\n" +
              "  1. *Writing Hub / Prompting*: Paraphraser, Grammar Checker, AI Humanizer, Image Generator, Summarizer, and Citation tools.\n" +
              "  2. *PDF Toolkit*: Merge PDFs, extract text, or add opacity-controlled watermarks.\n" +
              "  3. *Calculators*: Financial, Health, Math, and Utility calculators."
  },
  {
    keywords: ["aura", "who are you", "your name"],
    response: "✨ I am **Aura AI**, your intelligent mobile assistant running entirely client-side in your browser window. I process all data locally, meaning no cloud APIs, high speed, and absolute privacy! (Note: I may fetch Wikipedia definitions if you ask general questions)."
  },
  {
    keywords: ["pdf", "watermark", "merge", "extract", "document"],
    response: "📕 **PDF Toolkit Knowledge**:\nSelect the **PDF & Files** tab under Settings or click on the Sidebar to upload PDFs.\n\n" +
              "**1. Extract Text**: Select a PDF in Slot 1 and click 'Extract Text' to parse the document contents into the chat so you can query it.\n" +
              "**2. Watermark PDF**: Select a PDF in Slot 1, enter text in the watermark field, adjust the opacity slider, and click 'Watermark PDF 1'. It will generate a downloadable watermarked file.\n" +
              "**3. Merge PDFs**: Select PDFs in Slot 1 and Slot 2, then click 'Merge PDFs' to combine them into a single downloadable document."
  },
  {
    keywords: ["prompt", "prompting", "paraphrase", "grammar", "plagiarism", "humanizer", "summarizer", "citation", "translate", "writing"],
    response: "📝 **Prompting & Writing Hub Knowledge**:\nSwitch to the **Writing Hub** from the Sidebar to access these tools:\n\n" +
              "• **Paraphraser**: Rephrase your sentences in standard, professional, creative, or simple styles.\n" +
              "• **Grammar Checker**: Identifies and corrects typos, punctuation errors, and structural issues.\n" +
              "• **AI Detector & Humanizer**: Analyzes text for AI probability and rewrites it to sound more natural and human.\n" +
              "• **Plagiarism Checker**: Scans your text against loaded documents to find overlapping phrasing.\n" +
              "• **Summarizer**: Condenses long articles or text into key bullet points.\n" +
              "• **Translator**: Translates input text into various target languages.\n" +
              "• **Citation Generator**: Creates APA/MLA citations from raw source data.\n" +
              "• **Prompt Builder & Image-to-Prompt**: Helps you construct the perfect prompts for AI models (or reverse engineer prompts from images)."
  },
  {
    keywords: ["image", "generator", "cyberpunk", "watercolor", "retro"],
    response: "🎨 **AI Image Generator**:\nInside the **Writing Hub**, select the *AI Image Generator* mode. Type a visual prompt, and the app will generate client-side canvas artwork using procedural patterns matching styles like Cyberpunk, Watercolor, or Retro."
  },
  {
    keywords: ["calculator", "math", "quadratic", "mortgage", "loan", "bmi", "gpa", "tip", "finance", "health"],
    response: "🧮 **Calculators & Math Knowledge**:\nI have built-in solvers organized by category in the **Calculators** tab:\n\n" +
              "• **Financial**: Mortgage repayment, loan amortization, compound interest, and discount tools.\n" +
              "• **Health**: BMI, BMR, calorie intake, and ideal weight estimators.\n" +
              "• **Math**: Scientific keypad, quadratic formula solver, statistics, and unit converters.\n" +
              "• **Utilities**: Age, date differences, GPA, tips, and Base64/URL encoding."
  },
  {
    keywords: ["voice", "tts", "speech", "speak"],
    response: "🔊 **Voice & Speech (TTS)**:\nNavigate to the **Voice** tab in Settings to select a narrator voice. You can adjust the **Speed (Rate)** and **Pitch** sliders to customize how I sound. Toggle speech on or off using the speaker icon in the top header!"
  },
  {
    keywords: ["work", "parts of work", "modules", "features", "how to use"],
    response: "⚙️ **Every Part of My Work**:\nI operate in three primary workspaces:\n\n" +
              "1. **Chat Workspace**: The main conversational area where you can ask me questions, execute math (via `=`), or search through uploaded files.\n" +
              "2. **Skills & Settings Drawer**: Contains the configuration for Voice Synthesis, PDF operations, file uploads, and Universal Calculators.\n" +
              "3. **Left Sidebar Navigation**: Gives you instant access to specific Writing Hub capabilities (like Grammar, Paraphraser, Plagiarism Check) and your Chat Sessions history."
  }
];

// --- Simple client-side Markdown parser ---
function formatMarkdown(text) {
  if (!text) return '';
  let html = text;
  
  // Escape HTML entities to prevent rendering issues, except for our specific tags
  html = html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
    
  // Headers (### title, ## title, # title)
  html = html.replace(/^(?:###|##|#)\s+(.+)$/gm, '<h4>$1</h4>');
  
  // Bold (**text**)
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  
  // Italic (*text*)
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  
  // Inline Code (`code`)
  html = html.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');
  
  // Lists (lines starting with • or * followed by text)
  html = html.replace(/^[•*]\s+(.+)$/gm, '<li class="list-item">$1</li>');
  
  // Wrap lists in <ul> tags
  html = html.replace(/((?:<li class="list-item">.*?<\/li>\s*)+)/gs, '<ul>$1</ul>');
  
  // Convert newlines to line breaks
  html = html.replace(/\n/g, '<br>');
  
  // Clean up breaks inside list tags
  html = html.replace(/<ul><br>/g, '<ul>').replace(/<\/li><br>/g, '</li>').replace(/<\/ul><br>/g, '</ul>');
  
  return html;
}

// --- DOM Elements ---
const DOM = {
  statusTime: document.getElementById('status-time'),
  statusAlert: document.getElementById('status-alert'),
  chatMessages: document.getElementById('chat-messages-container'),
  chatForm: document.getElementById('chat-input-form'),
  chatInput: document.getElementById('chat-input-field'),
  voiceInputBtn: document.getElementById('voice-input-btn'),
  toggleVoiceBtn: document.getElementById('toggle-voice-btn'),
  clearChatBtn: document.getElementById('clear-chat-btn'),
  toggleDrawerBtn: document.getElementById('toggle-drawer-btn'),
  closeDrawerBtn: document.getElementById('close-drawer-btn'),
  skillsDrawer: document.getElementById('skills-drawer'),
  
  // Tab buttons / Panels
  tabVoice: document.getElementById('tab-btn-voice'),
  tabPdf: document.getElementById('tab-btn-pdf'),
  tabMath: document.getElementById('tab-btn-math'),
  tabPrompt: document.getElementById('tab-btn-prompt'), // Points to Writing Hub Tab
  panelVoice: document.getElementById('tab-content-voice'),
  panelPdf: document.getElementById('tab-content-pdf'),
  panelMath: document.getElementById('tab-content-math'),
  panelPrompt: document.getElementById('tab-content-prompt'),

  // Speech
  ttsStatus: document.getElementById('tts-status'),
  voiceSelect: document.getElementById('voice-select-dropdown'),
  
  // Text Parser
  fileStatus: document.getElementById('file-status'),
  dragDropZone: document.getElementById('drag-drop-zone'),
  fileUploader: document.getElementById('file-uploader'),
  fileInfoContainer: document.getElementById('file-info-container'),
  loadedFileName: document.getElementById('loaded-file-name'),
  removeFileBtn: document.getElementById('remove-file-btn'),
  
  // PDF Toolkit
  pdfStatus: document.getElementById('pdf-status'),
  pdfUploader1: document.getElementById('pdf-uploader-1'),
  pdfUploader2: document.getElementById('pdf-uploader-2'),
  pdfLabel1: document.getElementById('pdf-label-1'),
  pdfLabel2: document.getElementById('pdf-label-2'),
  pdfZone1: document.getElementById('pdf-zone-1'),
  pdfZone2: document.getElementById('pdf-zone-2'),
  pdfWatermarkText: document.getElementById('pdf-watermark-text'),
  pdfExtractBtn: document.getElementById('pdf-extract-btn'),
  pdfWatermarkBtn: document.getElementById('pdf-watermark-btn'),
  pdfMergeBtn: document.getElementById('pdf-merge-btn'),

  // Universal Calculator Elements
  calcModeSelect: document.getElementById('universal-mode-select'),
  calcInputsArea: document.getElementById('universal-inputs-area'),
  calcCalculateBtn: document.getElementById('universal-calculate-btn'),
  calcResultCard: document.getElementById('universal-result-card'),
  calcResultContent: document.getElementById('universal-result-content'),
  calcSendChatBtn: document.getElementById('universal-send-chat-btn'),

  // Writing Hub Elements
  writingModeSelect: document.getElementById('writing-mode-select'),
  writingInputsArea: document.getElementById('writing-inputs-area'),
  writingExecuteBtn: document.getElementById('writing-execute-btn'),
  writingResultCard: document.getElementById('writing-result-card'),
  writingResultTitle: document.getElementById('writing-result-title'),
  writingResultContent: document.getElementById('writing-result-content'),
  writingResultMedia: document.getElementById('writing-result-media'),
  genImageCanvas: document.getElementById('gen-image-canvas'),
  writingCopyBtn: document.getElementById('writing-copy-btn'),
  writingSendChatBtn: document.getElementById('writing-send-chat-btn'),
  
  // Sliders and highlights
  tabIndicator: document.getElementById('drawer-tab-indicator'),
  voiceRateSlider: document.getElementById('voice-rate-slider'),
  voiceRateLabel: document.getElementById('voice-rate-label'),
  voicePitchSlider: document.getElementById('voice-pitch-slider'),
  voicePitchLabel: document.getElementById('voice-pitch-label'),
  pdfOpacitySlider: document.getElementById('pdf-opacity-slider'),
  pdfOpacityLabel: document.getElementById('pdf-opacity-label'),

  // Left Sidebar Chat History
  historySidebar: document.getElementById('history-sidebar'),
  toggleHistoryBtn: document.getElementById('toggle-history-btn'),
  closeHistoryBtn: document.getElementById('close-history-btn'),
  newChatBtn: document.getElementById('new-chat-btn'),
  historySessionsList: document.getElementById('history-sessions-list'),
  exportJsonBtn: document.getElementById('export-json-btn'),
  exportTxtBtn: document.getElementById('export-txt-btn'),
  
  suggestions: document.getElementById('suggestions-container'),
  
  // Workspace views
  chatViewContainer: document.getElementById('chat-view-container'),
  toolViewContainer: document.getElementById('tool-view-container'),
  toolPanelTabs: document.getElementById('tool-panel-tabs')
};

// --- Workspace Mode Switching Router ---
function switchWorkspaceMode(mode) {
  // Update sidebar active highlights
  const sidebarButtons = document.querySelectorAll('.vertical-skills-sidebar button');
  sidebarButtons.forEach(btn => btn.classList.remove('active'));
  
  // Update mobile nav buttons active highlights
  const mobileNavButtons = document.querySelectorAll('.mobile-nav-btn');
  mobileNavButtons.forEach(btn => btn.classList.remove('active'));
  
  const appContainer = document.querySelector('.app-container');
  
  if (mode === 'chat') {
    DOM.chatViewContainer.style.display = 'flex';
    DOM.toolViewContainer.style.display = 'none';
    if (appContainer) appContainer.classList.add('chat-only-mode');
    
    const activeBtn = document.getElementById('sidebar-chat-btn');
    if (activeBtn) activeBtn.classList.add('active');
    
    const activeMobileBtn = document.querySelector('.mobile-nav-btn[data-target="chat"]');
    if (activeMobileBtn) activeMobileBtn.classList.add('active');
  } 
  else if (mode === 'calculator') {
    DOM.chatViewContainer.style.display = 'none';
    DOM.toolViewContainer.style.display = 'flex';
    DOM.toolPanelTabs.style.display = 'flex'; // show sub-tabs
    if (appContainer) appContainer.classList.remove('chat-only-mode');
    
    switchTab('math');
    
    const activeBtn = document.getElementById('sidebar-calculator-btn');
    if (activeBtn) activeBtn.classList.add('active');
    
    const activeMobileBtn = document.querySelector('.mobile-nav-btn[data-target="calculator"]');
    if (activeMobileBtn) activeMobileBtn.classList.add('active');
    
    showAlert('Opened Settings & Calculators');
  }
  else if (mode === 'pdf') {
    DOM.chatViewContainer.style.display = 'none';
    DOM.toolViewContainer.style.display = 'flex';
    DOM.toolPanelTabs.style.display = 'flex'; // show sub-tabs
    if (appContainer) appContainer.classList.remove('chat-only-mode');
    
    switchTab('pdf');
    
    const activeBtn = document.getElementById('sidebar-pdf-btn');
    if (activeBtn) activeBtn.classList.add('active');
    
    const activeMobileBtn = document.querySelector('.mobile-nav-btn[data-target="pdf"]');
    if (activeMobileBtn) activeMobileBtn.classList.add('active');
    
    showAlert('Opened PDF Toolkit');
  }
  else if (mode === 'voice') {
    DOM.chatViewContainer.style.display = 'none';
    DOM.toolViewContainer.style.display = 'flex';
    DOM.toolPanelTabs.style.display = 'flex'; // show sub-tabs
    if (appContainer) appContainer.classList.remove('chat-only-mode');
    
    switchTab('voice');
    
    const activeBtn = document.getElementById('sidebar-voice-btn');
    if (activeBtn) activeBtn.classList.add('active');
    
    showAlert('Opened Voice Settings');
  }
  else {
    DOM.chatViewContainer.style.display = 'none';
    DOM.toolViewContainer.style.display = 'flex';
    DOM.toolPanelTabs.style.display = 'none'; // hide sub-tabs since sidebar controls this
    if (appContainer) appContainer.classList.remove('chat-only-mode');
    
    switchTab('prompt');
    
    // Set Writing Mode Select dropdown value
    if (DOM.writingModeSelect) {
      DOM.writingModeSelect.value = mode;
      renderWritingHubInputs(mode);
    }
    
    const activeBtn = document.getElementById(`sidebar-${mode}-btn`);
    if (activeBtn) activeBtn.classList.add('active');
    
    const activeMobileBtn = document.querySelector('.mobile-nav-btn[data-target="writing"]');
    if (activeMobileBtn) activeMobileBtn.classList.add('active');
    
    showAlert(`Opened ${mode.replace(/-/g, ' ')} tool`);
  }
}

// Bind Sidebar button events on load
document.addEventListener('DOMContentLoaded', () => {
  const newBtn = document.getElementById('sidebar-new-btn');
  if (newBtn) {
    newBtn.addEventListener('click', () => {
      startNewChat(true);
    });
  }

  const projBtn = document.getElementById('sidebar-proj-btn');
  if (projBtn) {
    projBtn.addEventListener('click', () => {
      DOM.historySidebar.classList.add('open');
    });
  }

  const chatBtn = document.getElementById('sidebar-chat-btn');
  if (chatBtn) {
    chatBtn.addEventListener('click', () => switchWorkspaceMode('chat'));
  }

  const modes = [
    'paraphraser',
    'grammar-checker',
    'ai-detector',
    'plagiarism-checker',
    'ai-humanizer',
    'ai-image-generator',
    'translator',
    'summarizer',
    'citation-generator'
  ];

  modes.forEach(mode => {
    const btn = document.getElementById(`sidebar-${mode}-btn`);
    if (btn) {
      btn.addEventListener('click', () => switchWorkspaceMode(mode));
    }
  });

  const calcBtn = document.getElementById('sidebar-calculator-btn');
  if (calcBtn) {
    calcBtn.addEventListener('click', () => switchWorkspaceMode('calculator'));
  }

  const pdfBtn = document.getElementById('sidebar-pdf-btn');
  if (pdfBtn) {
    pdfBtn.addEventListener('click', () => switchWorkspaceMode('pdf'));
  }

  const voiceBtn = document.getElementById('sidebar-voice-btn');
  if (voiceBtn) {
    voiceBtn.addEventListener('click', () => switchWorkspaceMode('voice'));
  }

  // Mobile Bottom Navigation Bar buttons Click handler
  document.querySelectorAll('.mobile-bottom-nav .mobile-nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-target');
      if (target === 'chat') {
        switchWorkspaceMode('chat');
      } else if (target === 'writing') {
        switchWorkspaceMode(state.writingMode || 'paraphraser');
      } else if (target === 'calculator') {
        switchWorkspaceMode('calculator');
      } else if (target === 'pdf') {
        switchWorkspaceMode('pdf');
      } else if (btn.id === 'mobile-nav-history-btn') {
        DOM.historySidebar.classList.toggle('open');
      }
    });
  });
});

// --- Tab Switching Logic ---
function switchTab(tabId) {
  state.activeTab = tabId;
  DOM.tabVoice.classList.toggle('active', tabId === 'voice');
  DOM.tabPdf.classList.toggle('active', tabId === 'pdf');
  DOM.tabMath.classList.toggle('active', tabId === 'math');
  DOM.tabPrompt.classList.toggle('active', tabId === 'prompt');
  
  DOM.panelVoice.classList.toggle('active', tabId === 'voice');
  DOM.panelPdf.classList.toggle('active', tabId === 'pdf');
  DOM.panelMath.classList.toggle('active', tabId === 'math');
  DOM.panelPrompt.classList.toggle('active', tabId === 'prompt');

  // Slide Tab Indicator Behind Active Btn
  let activeBtn = null;
  if (tabId === 'voice') activeBtn = DOM.tabVoice;
  else if (tabId === 'pdf') activeBtn = DOM.tabPdf;
  else if (tabId === 'math') activeBtn = DOM.tabMath;
  else if (tabId === 'prompt') activeBtn = DOM.tabPrompt;

  if (activeBtn && DOM.tabIndicator) {
    DOM.tabIndicator.style.width = `${activeBtn.offsetWidth}px`;
    DOM.tabIndicator.style.transform = `translateX(${activeBtn.offsetLeft}px)`;
  }
  
  showAlert(`Switched to ${tabId}`);
}

DOM.tabVoice.addEventListener('click', () => switchTab('voice'));
DOM.tabPdf.addEventListener('click', () => switchTab('pdf'));
DOM.tabMath.addEventListener('click', () => switchTab('math'));
DOM.tabPrompt.addEventListener('click', () => switchTab('prompt'));

// --- Speech Recognition Setup (STT) ---
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = null;

if (SpeechRecognition) {
  recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.lang = 'en-US';
  
  recognition.onstart = () => {
    state.isRecording = true;
    DOM.voiceInputBtn.classList.add('recording');
    showAlert('Listening...');
  };
  recognition.onerror = () => {
    showAlert('Voice Error.');
    stopSpeechRecognition();
  };
  recognition.onend = () => stopSpeechRecognition();
  recognition.onresult = (event) => {
    const text = event.results[0][0].transcript;
    DOM.chatInput.value = text;
    handleUserMessageSubmit(text);
  };
} else {
  DOM.voiceInputBtn.style.display = 'none';
}

function stopSpeechRecognition() {
  state.isRecording = false;
  DOM.voiceInputBtn.classList.remove('recording');
}

// --- Speech Synthesis Setup (TTS) ---
function loadVoices() {
  if (typeof speechSynthesis === 'undefined') return;
  state.voices = speechSynthesis.getVoices();
  DOM.voiceSelect.innerHTML = '';
  state.voices.forEach(voice => {
    const option = document.createElement('option');
    option.value = voice.name;
    option.textContent = `${voice.name} (${voice.lang})`;
    DOM.voiceSelect.appendChild(option);
  });
  if (DOM.voiceSelect.value) state.selectedVoiceName = DOM.voiceSelect.value;
}

if (typeof speechSynthesis !== 'undefined') {
  speechSynthesis.onvoiceschanged = loadVoices;
  loadVoices();
}

function speakText(text) {
  if (!state.ttsEnabled || typeof speechSynthesis === 'undefined') return;
  speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text.replace(/[*#_`[\]]/g, ''));
  const voice = state.voices.find(v => v.name === state.selectedVoiceName);
  if (voice) utterance.voice = voice;
  
  // Set speed and pitch from sliders state
  utterance.rate = state.ttsRate;
  utterance.pitch = state.ttsPitch;
  
  speechSynthesis.speak(utterance);
}

// --- Clock and UI Alert ---
function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; 
  minutes = minutes < 10 ? '0' + minutes : minutes;
  if (DOM.statusTime) {
    DOM.statusTime.textContent = `${hours}:${minutes} ${ampm}`;
  }
}

function showAlert(text) {
  if (DOM.statusAlert) {
    DOM.statusAlert.textContent = text;
    DOM.statusAlert.classList.add('show');
    setTimeout(() => {
      DOM.statusAlert.classList.remove('show');
    }, 3500);
  } else {
    console.log("ALERT:", text);
  }
}

function scrollToBottom() {
  DOM.chatMessages.scrollTop = DOM.chatMessages.scrollHeight;
}

function loadHistory() {
  const sessionsCached = localStorage.getItem('aura_chat_sessions');
  const activeCachedId = localStorage.getItem('aura_active_session_id');
  
  if (sessionsCached) {
    state.sessions = JSON.parse(sessionsCached);
  } else {
    state.sessions = [];
  }
  
  if (activeCachedId && state.sessions.some(s => s.id === activeCachedId)) {
    state.activeSessionId = activeCachedId;
  } else if (state.sessions.length > 0) {
    state.activeSessionId = state.sessions[0].id;
  } else {
    // Generate first default session
    startNewChat(false);
  }

  // Load active session messages
  const activeSession = state.sessions.find(s => s.id === state.activeSessionId);
  if (activeSession) {
    state.chatHistory = activeSession.messages;
    DOM.chatMessages.innerHTML = '';
    state.chatHistory.forEach(msg => appendMessageMarkup(msg.sender, msg.text, msg.timestamp, false));
    scrollToBottom();
  }
  
  renderSessionsList();

  const voiceConfig = localStorage.getItem('aura_tts_enabled');
  if (voiceConfig === 'true') {
    state.ttsEnabled = true;
    DOM.ttsStatus.textContent = 'Active';
    DOM.ttsStatus.classList.add('active');
    DOM.toggleVoiceBtn.classList.add('recording');
  } else {
    state.ttsEnabled = false;
    DOM.ttsStatus.textContent = 'Disabled';
    DOM.ttsStatus.classList.remove('active');
    DOM.toggleVoiceBtn.classList.remove('recording');
  }
}

function saveHistory() {
  // Sync chatHistory with active session
  const activeSession = state.sessions.find(s => s.id === state.activeSessionId);
  if (activeSession) {
    activeSession.messages = state.chatHistory;
    
    // Auto-update title from first user message if still default
    if (activeSession.title === 'New Conversation' && state.chatHistory.length > 1) {
      const firstUserMsg = state.chatHistory.find(m => m.sender === 'user');
      if (firstUserMsg) {
        const textClean = firstUserMsg.text.replace(/[*#_`[\]]/g, '').trim();
        activeSession.title = textClean.substring(0, 22) + (textClean.length > 22 ? '...' : '');
      }
    }
    activeSession.timestamp = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  }
  
  localStorage.setItem('aura_chat_sessions', JSON.stringify(state.sessions));
  localStorage.setItem('aura_active_session_id', state.activeSessionId);
  renderSessionsList();
}

function startNewChat(userTriggered = true) {
  const newId = 'session_' + Date.now();
  const welcomeMsg = "Hi! I'm Aura. Tap **Manage Skills** below to access Voice settings, PDF tools, Scientific Calculators, or Prompt templates!";
  const ts = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  
  const newSession = {
    id: newId,
    title: 'New Conversation',
    messages: [{ sender: 'bot', text: welcomeMsg, timestamp: ts }],
    timestamp: ts
  };
  
  state.sessions.unshift(newSession);
  state.activeSessionId = newId;
  state.chatHistory = newSession.messages;
  
  DOM.chatMessages.innerHTML = '';
  appendMessageMarkup('bot', welcomeMsg, ts, false);
  
  localStorage.setItem('aura_chat_sessions', JSON.stringify(state.sessions));
  localStorage.setItem('aura_active_session_id', state.activeSessionId);
  
  renderSessionsList();
  
  if (userTriggered) {
    DOM.historySidebar.classList.remove('open');
    switchWorkspaceMode('chat');
    showAlert('New Chat started!');
  }
}

function selectSession(id) {
  const activeSession = state.sessions.find(s => s.id === id);
  if (!activeSession) return;
  
  state.activeSessionId = id;
  state.chatHistory = activeSession.messages;
  
  DOM.chatMessages.innerHTML = '';
  state.chatHistory.forEach(msg => appendMessageMarkup(msg.sender, msg.text, msg.timestamp, false));
  scrollToBottom();
  
  localStorage.setItem('aura_active_session_id', state.activeSessionId);
  renderSessionsList();
  
  DOM.historySidebar.classList.remove('open');
  switchWorkspaceMode('chat');
  showAlert('Switched session.');
}

function deleteSession(id) {
  const idx = state.sessions.findIndex(s => s.id === id);
  if (idx === -1) return;
  
  state.sessions.splice(idx, 1);
  
  if (state.activeSessionId === id) {
    if (state.sessions.length > 0) {
      selectSession(state.sessions[0].id);
    } else {
      startNewChat(false);
    }
  } else {
    localStorage.setItem('aura_chat_sessions', JSON.stringify(state.sessions));
    renderSessionsList();
  }
  showAlert('Session deleted.');
}

function renderSessionsList() {
  const list = DOM.historySessionsList;
  if (!list) return;
  list.innerHTML = '';
  
  state.sessions.forEach(s => {
    const wrapper = document.createElement('div');
    wrapper.className = 'session-item-wrapper';
    const activeClass = s.id === state.activeSessionId ? ' active' : '';
    
    wrapper.innerHTML = `
      <button class="session-item-btn${activeClass}" onclick="selectSession('${s.id}')">
        <div class="session-info">
          <span class="session-title">${s.title}</span>
          <span class="session-meta">${s.timestamp}</span>
        </div>
      </button>
      <button class="session-delete-btn" title="Delete conversation" onclick="event.stopPropagation(); deleteSession('${s.id}')">
        🗑️
      </button>
    `;
    list.appendChild(wrapper);
  });
}

// Expose click helper functions globally for inline HTML onclick handlers
window.selectSession = selectSession;
window.deleteSession = deleteSession;

function appendMessageMarkup(sender, text, timestamp, speak = false) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message', sender);

  const contentDiv = document.createElement('div');
  contentDiv.classList.add('message-content');
  
  const formattedText = formatMarkdown(text);
  contentDiv.innerHTML = formattedText;
  
  messageDiv.appendChild(contentDiv);

  const metaDiv = document.createElement('div');
  metaDiv.classList.add('message-meta');
  metaDiv.textContent = timestamp;

  if (sender === 'bot') {
    const speakBtn = document.createElement('button');
    speakBtn.classList.add('read-aloud-btn');
    speakBtn.title = "Read aloud";
    speakBtn.innerHTML = `
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
      </svg>
    `;
    speakBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const oldState = state.ttsEnabled;
      state.ttsEnabled = true;
      speakText(text);
      state.ttsEnabled = oldState;
    });
    metaDiv.appendChild(speakBtn);
  }

  messageDiv.appendChild(metaDiv);
  DOM.chatMessages.appendChild(messageDiv);
  scrollToBottom();

  if (speak && sender === 'bot') {
    speakText(text);
  }
}

function showTypingIndicator() {
  const indicator = document.createElement('div');
  indicator.id = 'bot-typing-indicator';
  indicator.classList.add('message', 'bot');
  indicator.innerHTML = `
    <div class="message-content">
      <div class="typing-indicator">
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
      </div>
    </div>
  `;
  DOM.chatMessages.appendChild(indicator);
  scrollToBottom();
}

function removeTypingIndicator() {
  const indicator = document.getElementById('bot-typing-indicator');
  if (indicator) {
    indicator.remove();
  }
}

// --- Chat Answering Logic ---
function handleUserMessageSubmit(inputText) {
  const trimmed = inputText.trim();
  if (!trimmed) return;

  DOM.chatInput.value = '';
  const timestamp = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  
  appendMessageMarkup('user', trimmed, timestamp);
  state.chatHistory.push({ sender: 'user', text: trimmed, timestamp });
  saveHistory();

  showTypingIndicator();

  setTimeout(async () => {
    removeTypingIndicator();
    const botResponse = await generateBotResponse(trimmed);
    const botTimestamp = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    
    appendMessageMarkup('bot', botResponse, botTimestamp, true);
    state.chatHistory.push({ sender: 'bot', text: botResponse, timestamp: botTimestamp });
    saveHistory();
  }, 800);
}

// Bot Response Brain Engine
async function generateBotResponse(input) {
  const lowercaseInput = input.toLowerCase();

  // Command Check 1: Scientific Calculator execution
  if (lowercaseInput.startsWith('=')) {
    let expression = input.substring(1).trim();
    return executeCodeExpression(expression);
  }

  // Command Check 2: Quadratic solver trigger in chat
  if (lowercaseInput.includes('quadratic') && (lowercaseInput.includes('solve') || lowercaseInput.includes('a='))) {
    const aMatch = lowercaseInput.match(/a\s*=\s*(-?\d+\.?\d*)/);
    const bMatch = lowercaseInput.match(/b\s*=\s*(-?\d+\.?\d*)/);
    const cMatch = lowercaseInput.match(/c\s*=\s*(-?\d+\.?\d*)/);
    if (aMatch && bMatch && cMatch) {
      const a = parseFloat(aMatch[1]);
      const b = parseFloat(bMatch[1]);
      const c = parseFloat(cMatch[1]);
      return solveQuadraticFormula(a, b, c);
    }
  }

  // Construct context for the AI
  let systemPrompt = "You are Aura AI, a helpful, intelligent assistant. Be concise and friendly.";
  
  if (state.loadedFile && state.loadedFile.content) {
    systemPrompt += `\n\nI have attached a document named '${state.loadedFile.name}'. Please answer my questions based on this document content if relevant. \n\nDocument Content:\n${state.loadedFile.content.substring(0, 15000)}`;
  }
  
  if (state.analysedImagePalette && state.analysedImagePalette.length > 0) {
    systemPrompt += `\n\nI have uploaded an image. Its dominant colors are: ${state.analysedImagePalette.join(', ')}. Keep this in mind if I ask about an image.`;
  }

  // Determine API endpoint dynamically based on hosting environment
  const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  const apiEndpoint = isLocal ? '/api/chat' : '/.netlify/functions/chat';

  try {
    const combinedPrompt = systemPrompt + "\n\nUser Question: " + input;
    
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: combinedPrompt })
    });
    
    if (response.ok) {
      const data = await response.json();
      return data.reply || "No valid response from model.";
    } else {
      try {
        const errorData = await response.json();
        return errorData.error || "⚠️ Server returned an error.";
      } catch (e) {
        return "⚠️ Could not connect to local AI backend. Please ensure the Node server is running.";
      }
    }
  } catch (err) {
    console.error("AI API Error:", err);
    return "⚠️ Error generating response. Check server connection.";
  }
}

// File Search/Summary
function queryLoadedFile(userQuery) {
  const lowercaseQuery = userQuery.toLowerCase();
  const fileText = state.loadedFile.content;
  
  if (lowercaseQuery.includes('summarize') || lowercaseQuery.includes('summary') || lowercaseQuery.includes('describe')) {
    const wordCount = fileText.split(/\s+/).filter(Boolean).length;
    const lines = fileText.split('\n');
    const firstLines = lines.slice(0, 5).join('\n');
    return `📁 **File Summary: ${state.loadedFile.name}**\n` +
           `• Size: ${(state.loadedFile.size / 1024).toFixed(2)} KB\n` +
           `• Words: ${wordCount}\n` +
           `• Preview:\n"""\n${firstLines}\n"""`;
  }

  const searchTerms = userQuery.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g,"").split(/\s+/).filter(w => w.length > 2);
  if (searchTerms.length === 0) return `No search keywords extracted.`;

  const lines = fileText.split('\n');
  const matchingLines = [];
  for (const line of lines) {
    for (const term of searchTerms) {
      if (line.toLowerCase().includes(term.toLowerCase())) {
        matchingLines.push(line.trim());
        break;
      }
    }
    if (matchingLines.length >= 5) break;
  }

  if (matchingLines.length > 0) {
    return `🔍 Found matches in **${state.loadedFile.name}**:\n\n` + 
           matchingLines.map(line => `• "... ${line} ..."`).join('\n');
  }
  return `No matches found.`;
}

// Sandbox math runner
function executeCodeExpression(expression) {
  try {
    const sanitiationPattern = /window|document|localStorage|fetch|XMLHttpRequest|eval|alert|cookie/gi;
    if (sanitiationPattern.test(expression)) return "⚠️ Security Error.";
    const runner = new Function(`return (${expression});`);
    const result = runner();
    return `🧮 **Evaluation Result**:\n` +
           `• Expression: \`${expression}\`\n` +
           `• Output: **${result}**`;
  } catch (error) {
    return `⚠️ Error: ${error.message}`;
  }
}

// --- Universal Calculator Panel Logic ---

function renderUniversalCalculatorInputs(mode) {
  state.calcMode = mode;
  const container = DOM.calcInputsArea;
  container.innerHTML = '';
  DOM.calcResultCard.style.display = 'none';
  
  const createInput = (lbl, inputId, type = 'number', placeholder = '', def = '') => {
    const box = document.createElement('div');
    box.style.display = 'flex';
    box.style.flexDirection = 'column';
    box.style.gap = '2px';
    box.innerHTML = `
      <label class="prompt-label">${lbl}</label>
      <input type="${type}" id="${inputId}" class="solver-input" placeholder="${placeholder}" value="${def}">
    `;
    container.appendChild(box);
  };

  const createSelect = (lbl, selectId, options) => {
    const box = document.createElement('div');
    box.style.display = 'flex';
    box.style.flexDirection = 'column';
    box.style.gap = '2px';
    let optHTML = options.map(o => `<option value="${o.val}">${o.name}</option>`).join('');
    box.innerHTML = `
      <label class="prompt-label">${lbl}</label>
      <select id="${selectId}" class="solver-select">${optHTML}</select>
    `;
    container.appendChild(box);
  };

  if (mode === 'scientific-calculator') {
    DOM.calcCalculateBtn.style.display = 'none';
    const keyBox = document.createElement('div');
    keyBox.innerHTML = `
      <input type="text" id="calc-display" class="calc-display-screen" placeholder="0" readonly>
      <div class="calculator-grid" id="scientific-grid-box">
        <button class="calc-btn op-btn" data-val="(">(</button>
        <button class="calc-btn op-btn" data-val=")">)</button>
        <button class="calc-btn clear-btn" id="calc-clear">C</button>
        <button class="calc-btn clear-btn" id="calc-back">⌫</button>
        <button class="calc-btn math-func" data-val="Math.sin(">sin</button>
        <button class="calc-btn math-func" data-val="Math.cos(">cos</button>
        <button class="calc-btn math-func" data-val="Math.tan(">tan</button>
        <button class="calc-btn op-btn" data-val="/">/</button>
        <button class="calc-btn num-btn" data-val="7">7</button>
        <button class="calc-btn num-btn" data-val="8">8</button>
        <button class="calc-btn num-btn" data-val="9">9</button>
        <button class="calc-btn op-btn" data-val="*">*</button>
        <button class="calc-btn num-btn" data-val="4">4</button>
        <button class="calc-btn num-btn" data-val="5">5</button>
        <button class="calc-btn num-btn" data-val="6">6</button>
        <button class="calc-btn op-btn" data-val="-">-</button>
        <button class="calc-btn num-btn" data-val="1">1</button>
        <button class="calc-btn num-btn" data-val="2">2</button>
        <button class="calc-btn num-btn" data-val="3">3</button>
        <button class="calc-btn op-btn" data-val="+">+</button>
        <button class="calc-btn math-func" data-val="Math.sqrt(">√</button>
        <button class="calc-btn math-func" data-val="Math.pow(">xʸ</button>
        <button class="calc-btn num-btn" data-val="0">0</button>
        <button class="calc-btn num-btn" data-val=".">.</button>
        <button class="calc-btn math-func" data-val="Math.log(">ln</button>
        <button class="calc-btn math-func" data-val="Math.PI">π</button>
        <button class="calc-btn math-func" data-val="Math.E">e</button>
        <button class="calc-btn equal-btn" id="calc-evaluate">=</button>
      </div>
    `;
    container.appendChild(keyBox);
    setupScientificKeypadListeners();
  } else {
    DOM.calcCalculateBtn.style.display = 'block';
    switch (mode) {
      case 'mortgage-calculator':
        createInput('Loan Amount ($)', 'm-amt', 'number', '', '300000');
        createInput('Interest Rate (%)', 'm-rate', 'number', '', '4.5');
        createInput('Term (Years)', 'm-term', 'number', '', '30');
        break;
      case 'loan-calculator':
        createInput('Loan Amount ($)', 'l-amt', 'number', '', '10000');
        createInput('Interest Rate (%)', 'l-rate', 'number', '', '6');
        createInput('Term (Months)', 'l-term', 'number', '', '24');
        break;
      case 'compound-interest-calculator':
        createInput('Principal ($)', 'c-principal', 'number', '', '5000');
        createInput('Interest (%)', 'c-rate', 'number', '', '5');
        createInput('Term (Years)', 'c-term', 'number', '', '10');
        createSelect('Compounding', 'c-freq', [{ val: '12', name: 'Monthly' }, { val: '1', name: 'Annually' }]);
        break;
      case 'discount-calculator':
        createInput('Original Price ($)', 'd-price', 'number', '', '80');
        createInput('Discount (%)', 'd-percent', 'number', '', '20');
        break;
      case 'bmi-calculator':
        createInput('Weight (kg)', 'bmi-weight', 'number', '', '70');
        createInput('Height (cm)', 'bmi-height', 'number', '', '175');
        break;
      case 'bmr-calculator':
        createInput('Age', 'bmr-age', 'number', '', '25');
        createSelect('Gender', 'bmr-gender', [{ val: 'm', name: 'Male' }, { val: 'f', name: 'Female' }]);
        createInput('Weight (kg)', 'bmr-weight', 'number', '', '70');
        createInput('Height (cm)', 'bmr-height', 'number', '', '180');
        createSelect('Activity', 'bmr-activity', [{ val: '1.2', name: 'Sedentary' }, { val: '1.55', name: 'Active' }]);
        break;
      case 'quadratic-formula-calculator':
        createInput('a', 'q-a', 'number', '', '1');
        createInput('b', 'q-b', 'number', '', '-5');
        createInput('c', 'q-c', 'number', '', '6');
        break;
      case 'statistics-calculator':
        createInput('Numbers (comma separated)', 's-list', 'text', '', '10,12,15,8,22');
        break;
      case 'age-calculator':
        createInput('Date of Birth', 'a-dob', 'date', '', '1998-05-15');
        createInput('Target Date', 'a-target', 'date', '', new Date().toISOString().split('T')[0]);
        break;
      case 'date-calculator':
        createInput('Start Date', 'd-start', 'date', '', new Date().toISOString().split('T')[0]);
        createInput('End Date', 'd-end', 'date', '', new Date(Date.now() + 86400000 * 10).toISOString().split('T')[0]);
        break;
      case 'gpa-calculator':
        createInput('Grades (comma separated)', 'g-grades', 'text', '', 'A,B,A,C');
        createInput('Credits (comma separated)', 'g-credits', 'text', '', '3,3,4,3');
        break;
      case 'tip-calculator':
        createInput('Bill ($)', 't-bill', 'number', '', '100');
        
        // Custom Tip Slider HTML
        const tipBox = document.createElement('div');
        tipBox.innerHTML = `
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <label class="prompt-label" style="margin-bottom: 0;">Tip Percentage</label>
            <span id="tip-pct-label" style="font-size: 11px; color: var(--color-secondary); font-weight: 600;">15%</span>
          </div>
          <input type="range" id="t-percent-slider" min="5" max="35" step="1" value="15" class="premium-slider">
        `;
        container.appendChild(tipBox);
        
        // Bind slider label update listener
        document.getElementById('t-percent-slider').addEventListener('input', (e) => {
          document.getElementById('tip-pct-label').textContent = e.target.value + '%';
        });

        createInput('People', 't-people', 'number', '', '2');
        break;
      case 'base64-encode-decode':
        createInput('Text', 'b64-content', 'text', '', 'Hello World');
        createSelect('Action', 'b64-action', [{ val: 'encode', name: 'Encode' }, { val: 'decode', name: 'Decode' }]);
        break;
      case 'url-encode-decode':
        createInput('URL Text', 'url-content', 'text', '', 'Hello World');
        createSelect('Action', 'url-action', [{ val: 'encode', name: 'Encode' }, { val: 'decode', name: 'Decode' }]);
        break;
      case 'conversion-calculator':
        createInput('Value', 'conv-val', 'number', '', '100');
        createSelect('Type', 'conv-type', [
          { val: 'c_to_f', name: '°C to °F' }, { val: 'f_to_c', name: '°F to °C' },
          { val: 'm_to_ft', name: 'Meters to Feet' }, { val: 'ft_to_m', name: 'Feet to Meters' }
        ]);
        break;
    }
  }
}

DOM.calcCalculateBtn.addEventListener('click', () => {
  const mode = state.calcMode;
  let chatText = '';
  let result = '';
  const getVal = (id) => document.getElementById(id).value;

  if (mode === 'mortgage-calculator') {
    const P = parseFloat(getVal('m-amt')), r = parseFloat(getVal('m-rate'))/1200, n = parseFloat(getVal('m-term'))*12;
    const payment = (P * r * Math.pow(1+r, n)) / (Math.pow(1+r, n) - 1);
    chatText = `Calculate Mortgage: Principal=$${P}`;
    result = `🏠 **Mortgage Output**:\n• Monthly: **$${payment.toFixed(2)}**\n• Total Payback: **$${(payment*n).toFixed(2)}**`;
  }
  else if (mode === 'loan-calculator') {
    const P = parseFloat(getVal('l-amt')), r = parseFloat(getVal('l-rate'))/1200, n = parseFloat(getVal('l-term'));
    const payment = (P * r * Math.pow(1+r, n)) / (Math.pow(1+r, n) - 1);
    chatText = `Calculate Loan: Principal=$${P}`;
    result = `💵 **Loan Output**:\n• Monthly: **$${payment.toFixed(2)}**\n• Total Pay: **$${(payment*n).toFixed(2)}**`;
  }
  else if (mode === 'compound-interest-calculator') {
    const P = parseFloat(getVal('c-principal')), r = parseFloat(getVal('c-rate'))/100, t = parseFloat(getVal('c-term')), n = parseFloat(getVal('c-freq'));
    const A = P * Math.pow(1 + r/n, n * t);
    chatText = `Compound Interest: Principal=$${P}`;
    result = `📈 **Compound Interest**:\n• Future Value: **$${A.toFixed(2)}**`;
  }
  else if (mode === 'discount-calculator') {
    const price = parseFloat(getVal('d-price')), pct = parseFloat(getVal('d-percent'));
    const savings = price * (pct/100);
    chatText = `Discount calculation: Price=${price}`;
    result = `🏷️ **Discount**:\n• Final Price: **$${(price-savings).toFixed(2)}**\n• Savings: **$${savings.toFixed(2)}**`;
  }
  else if (mode === 'bmi-calculator') {
    const w = parseFloat(getVal('bmi-weight')), h = parseFloat(getVal('bmi-height'))/100;
    const bmi = w / (h*h);
    chatText = `BMI check: weight=${w}`;
    result = `💪 **BMI Output**:\n• Score: **${bmi.toFixed(2)}**`;
  }
  else if (mode === 'bmr-calculator') {
    const age = parseFloat(getVal('bmr-age')), gen = getVal('bmr-gender'), w = parseFloat(getVal('bmr-weight')), h = parseFloat(getVal('bmr-height')), act = parseFloat(getVal('bmr-activity'));
    let bmr = gen === 'm' ? 88.362 + 13.397*w + 4.799*h - 5.677*age : 447.593 + 9.247*w + 3.098*h - 4.330*age;
    chatText = `Calorie calculations: Weight=${w}`;
    result = `🔥 **Calorie Output**:\n• BMR: **${bmr.toFixed(0)} kcal**\n• TDEE: **${(bmr*act).toFixed(0)} kcal**`;
  }
  else if (mode === 'quadratic-formula-calculator') {
    const a = parseFloat(getVal('q-a')), b = parseFloat(getVal('q-b')), c = parseFloat(getVal('q-c'));
    chatText = `Solve quadratic roots.`;
    result = solveQuadraticFormula(a, b, c);
  }
  else if (mode === 'statistics-calculator') {
    const list = getVal('s-list');
    chatText = `Statistics calculations.`;
    result = solveStats(list);
  }
  else if (mode === 'age-calculator') {
    const dob = new Date(getVal('a-dob')), target = new Date(getVal('a-target'));
    const diff = Math.abs(target - dob), days = Math.ceil(diff / (86400000)), years = Math.floor(days/365.25);
    chatText = `Calculate Age.`;
    result = `📅 **Age**: **${years} Years** (${days.toLocaleString()} Days)`;
  }
  else if (mode === 'date-calculator') {
    const s = new Date(getVal('d-start')), e = new Date(getVal('d-end'));
    const days = Math.round((e-s)/86400000);
    chatText = `Date duration check.`;
    result = `📅 **Duration**: **${days} Days**`;
  }
  else if (mode === 'gpa-calculator') {
    const grades = getVal('g-grades').split(','), credits = getVal('g-credits').split(',').map(Number);
    chatText = `Calculate GPA score.`;
    result = solveGPA(grades, credits);
  }
  else if (mode === 'tip-calculator') {
    const bill = parseFloat(getVal('t-bill')), pct = parseFloat(document.getElementById('t-percent-slider').value)/100, ppl = parseFloat(getVal('t-people')) || 1;
    const tip = bill*pct, total = bill + tip;
    chatText = `Calculate Tip: Bill=$${bill}`;
    result = `🧾 **Tip**:\n• Tip Amount: **$${tip.toFixed(2)}**\n• Total: **$${total.toFixed(2)}**\n• Per Person: **$${(total/ppl).toFixed(2)}**`;
  }
  else if (mode === 'base64-encode-decode') {
    const txt = getVal('b64-content'), act = getVal('b64-action');
    chatText = `Base64 converter.`;
    try {
      const out = act === 'encode' ? btoa(txt) : atob(txt);
      result = `💻 **Base64 Result**:\n${out}`;
    } catch { result = `⚠️ Base64 decode failed.`; }
  }
  else if (mode === 'url-encode-decode') {
    const txt = getVal('url-content'), act = getVal('url-action');
    chatText = `URL converter.`;
    const out = act === 'encode' ? encodeURIComponent(txt) : decodeURIComponent(txt);
    result = `🔗 **URL Result**:\n${out}`;
  }
  else if (mode === 'conversion-calculator') {
    const val = parseFloat(getVal('conv-val')), type = getVal('conv-type');
    chatText = `Unit converter.`;
    result = runConversion(val, type);
  }

  state.latestResultText = result;
  state.latestResultChatText = chatText;
  DOM.calcResultContent.innerHTML = formatMarkdown(result);
  DOM.calcResultCard.style.display = 'block';
  showAlert('Calculated!');
});

DOM.calcSendChatBtn.addEventListener('click', () => {
  if (!state.latestResultText) return;
  switchWorkspaceMode('chat');
  const ts = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  appendMessageMarkup('user', state.latestResultChatText, ts);
  state.chatHistory.push({ sender: 'user', text: state.latestResultChatText, timestamp: ts });
  saveHistory();
  showTypingIndicator();
  setTimeout(() => {
    removeTypingIndicator();
    appendMessageMarkup('bot', state.latestResultText, ts, true);
    state.chatHistory.push({ sender: 'bot', text: state.latestResultText, timestamp: ts });
    saveHistory();
    state.latestResultText = '';
  }, 400);
});

function setupScientificKeypadListeners() {
  const display = document.getElementById('calc-display');
  let currentString = '';
  const updateDisp = () => { display.value = currentString || '0'; };

  document.querySelectorAll('#scientific-grid-box .calc-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const val = btn.getAttribute('data-val');
      if (btn.classList.contains('num-btn') || btn.classList.contains('op-btn') || btn.classList.contains('math-func')) {
        currentString += val;
        updateDisp();
      }
    });
  });

  document.getElementById('calc-clear').addEventListener('click', () => { currentString = ''; updateDisp(); });
  document.getElementById('calc-back').addEventListener('click', () => { currentString = currentString.slice(0, -1); updateDisp(); });
  document.getElementById('calc-evaluate').addEventListener('click', () => {
    if (!currentString) return;
    let open = (currentString.match(/\(/g) || []).length;
    let close = (currentString.match(/\)/g) || []).length;
    while (open > close) { currentString += ')'; open--; }
    const expr = currentString;
    currentString = '';
    updateDisp();
    switchWorkspaceMode('chat');
    handleUserMessageSubmit(`= ${expr}`);
  });
}

function solveQuadraticFormula(a, b, c) {
  if (a === 0) return 'a cannot be 0.';
  const disc = b*b - 4*a*c;
  let out = `📐 **Quadratic Solver**:\n`;
  if (disc > 0) out += `Roots: x₁ = **${((-b + Math.sqrt(disc))/(2*a)).toFixed(4)}**, x₂ = **${((-b - Math.sqrt(disc))/(2*a)).toFixed(4)}**`;
  else if (disc === 0) out += `Root: x = **${(-b/(2*a)).toFixed(4)}**`;
  else out += `Complex: **${(-b/(2*a)).toFixed(4)} ± ${(Math.sqrt(-disc)/(2*a)).toFixed(4)}i**`;
  return out;
}

function solveStats(raw) {
  const nums = raw.split(',').map(Number).filter(n => !isNaN(n));
  if (nums.length === 0) return 'No numbers.';
  const mean = nums.reduce((s,v)=>s+v, 0)/nums.length;
  const sorted = [...nums].sort((a,b)=>a-b);
  const mid = Math.floor(sorted.length/2);
  const median = sorted.length%2!==0 ? sorted[mid] : (sorted[mid-1]+sorted[mid])/2;
  const variance = nums.reduce((s,v)=>s+Math.pow(v-mean,2), 0)/nums.length;
  return `📊 **Stats**:\n• Mean: **${mean.toFixed(4)}**\n• Median: **${median.toFixed(4)}**\n• StdDev: **${Math.sqrt(variance).toFixed(4)}**`;
}

function solveGPA(grades, credits) {
  const map = { 'A': 4, 'B': 3, 'C': 2, 'D': 1, 'F': 0 };
  let pts = 0, creds = 0;
  for (let i=0; i<grades.length; i++) {
    const g = map[grades[i].trim().toUpperCase()] ?? 0, c = credits[i] || 0;
    pts += g*c; creds += c;
  }
  return `🏫 **GPA**: **${creds > 0 ? (pts/creds).toFixed(2) : '0.00'}**`;
}

function runConversion(val, type) {
  let r = 0, f = '', t = '';
  if (type === 'c_to_f') { r = val*1.8 + 32; f = '°C'; t = '°F'; }
  else if (type === 'f_to_c') { r = (val-32)/1.8; f = '°F'; t = '°C'; }
  else if (type === 'm_to_ft') { r = val*3.28084; f = 'm'; t = 'ft'; }
  else if (type === 'ft_to_m') { r = val/3.28084; f = 'ft'; t = 'm'; }
  return `⚖️ **Conversion**: **${val} ${f}** = **${r.toFixed(4)} ${t}**`;
}

// --- Universal Writing Hub Panel Logic ---

function renderWritingHubInputs(mode) {
  state.writingMode = mode;
  const container = DOM.writingInputsArea;
  container.innerHTML = '';
  DOM.writingResultCard.style.display = 'none';
  DOM.writingResultMedia.style.display = 'none';

  const createTextarea = (lbl, textId, placeholder = '', def = '') => {
    const box = document.createElement('div');
    box.style.display = 'flex';
    box.style.flexDirection = 'column';
    box.style.gap = '2px';
    box.innerHTML = `
      <label class="prompt-label">${lbl}</label>
      <textarea id="${textId}" class="code-eval-input prompt-textarea" placeholder="${placeholder}">${def}</textarea>
    `;
    container.appendChild(box);
  };

  const createSelect = (lbl, selectId, options) => {
    const box = document.createElement('div');
    box.style.display = 'flex';
    box.style.flexDirection = 'column';
    box.style.gap = '2px';
    let optHTML = options.map(o => `<option value="${o.val}">${o.name}</option>`).join('');
    box.innerHTML = `
      <label class="prompt-label">${lbl}</label>
      <select id="${selectId}" class="solver-select">${optHTML}</select>
    `;
    container.appendChild(box);
  };

  const createInput = (lbl, inputId, type = 'text', placeholder = '', def = '') => {
    const box = document.createElement('div');
    box.style.display = 'flex';
    box.style.flexDirection = 'column';
    box.style.gap = '2px';
    box.innerHTML = `
      <label class="prompt-label">${lbl}</label>
      <input type="${type}" id="${inputId}" class="solver-input" placeholder="${placeholder}" value="${def}">
    `;
    container.appendChild(box);
  };

  switch (mode) {
    case 'paraphraser':
      createTextarea('Enter Text to Paraphrase', 'p-text', 'Type or paste content here...', 'The chatbot runs locally in the web browser and uses advanced skills.');
      createSelect('Choose Writing Style', 'p-style', [
        { val: 'standard', name: 'Standard / Neutral' },
        { val: 'professional', name: '💼 Professional' },
        { val: 'creative', name: '✨ Creative' },
        { val: 'simple', name: '👶 Simple' }
      ]);
      break;
    case 'grammar-checker':
      createTextarea('Enter Text to Grammar Check', 'g-text', 'Check grammar...', 'I recieve the files and teh chatbot dont work.');
      break;
    case 'ai-detector':
      createTextarea('Enter Text to Detect AI Probability', 'ai-text', 'Paste text here...', 'In conclusion, it is a testament to the fact that we must delve into this tapestry.');
      break;
    case 'plagiarism-checker':
      createTextarea('Enter Text to Check for Plagiarism', 'pl-text', 'Scan text...', 'This chatbot operates entirely client-side without cloud APIs.');
      break;
    case 'ai-humanizer':
      createTextarea('Enter AI Text to Humanize', 'h-text', 'Paste AI output...', 'Furthermore, it is crucial to recognize that we must delve into this aspect.');
      break;
    case 'ai-image-generator':
      createTextarea('Describe the Image (Prompt)', 'img-text', 'e.g. sunset beach, retro cyberpunk grid...', 'retro cyberpunk neon city grid');
      createSelect('Art Style', 'img-style', [
        { val: 'cyberpunk', name: '🌆 Cyberpunk Grid' },
        { val: 'watercolor', name: '🎨 Pastel Watercolor' },
        { val: 'retro', name: '🌅 Retro Neon Sunset' },
        { val: 'abstract', name: '🌀 Dynamic Abstract' }
      ]);
      break;
    case 'translator':
      createTextarea('Enter Text to Translate', 't-text', 'Enter text...', 'Hello, welcome to our smart chatbot!');
      createSelect('Target Language', 't-lang', [
        { val: 'es', name: 'Spanish (Español)' },
        { val: 'fr', name: 'French (Français)' },
        { val: 'de', name: 'German (Deutsch)' },
        { val: 'hi', name: 'Hindi (हिंदी)' }
      ]);
      break;
    case 'summarizer':
      createTextarea('Enter Text to Summarize', 's-text', 'Paste long paragraphs here...', 'HTML defines structure. CSS defines styling. Javascript defines code execution and active skills. Combined, they create a responsive mobile chatbot emulator that runs entirely locally inside browser viewports. This makes offline testing fast and highly reliable.');
      
      // Custom Summarizer Slider HTML
      const sumBox = document.createElement('div');
      sumBox.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
          <label class="prompt-label" style="margin-bottom: 0;">Summary Length (Sentences)</label>
          <span id="sum-len-label" style="font-size: 11px; color: var(--color-primary); font-weight: 600;">2</span>
        </div>
        <input type="range" id="s-length-slider" min="1" max="5" step="1" value="2" class="premium-slider">
      `;
      container.appendChild(sumBox);
      
      // Bind slider label update listener
      document.getElementById('s-length-slider').addEventListener('input', (e) => {
        document.getElementById('sum-len-label').textContent = e.target.value;
      });
      break;
    case 'citation-generator':
      createInput('Author (Last, First)', 'c-author', 'text', 'e.g. Smith, John', 'Smith, John');
      createInput('Source / Book Title', 'c-title', 'text', 'e.g. Artificial Intelligence', 'Aura Assistant Guide');
      createInput('Publication Year', 'c-year', 'number', 'e.g. 2026', '2026');
      createInput('Publisher / URL', 'c-pub', 'text', 'e.g. MIT Press', 'http://aura-bot.local');
      createSelect('Citation Style', 'c-style', [
        { val: 'apa', name: 'APA Style' },
        { val: 'mla', name: 'MLA Style' },
        { val: 'chi', name: 'Chicago Style' }
      ]);
      break;
    case 'prompt-builder':
      // Hide the global execute button since this card has its own integrated generate button
      DOM.writingExecuteBtn.style.display = 'none';
      
      const promptHeader = document.createElement('div');
      promptHeader.style.textAlign = 'center';
      promptHeader.style.marginBottom = '12px';
      promptHeader.innerHTML = `
        <h2 style="font-size: 20px; font-weight: 700; color: #fff; margin-bottom: 6px;">Free AI Prompt Generator</h2>
        <p style="font-size: 11px; color: var(--text-muted); line-height: 1.4; padding: 0 10px;">
          Create powerful AI prompts from simple ideas and spark creative, academic, and professional breakthroughs.
        </p>
      `;
      container.appendChild(promptHeader);

      const cardBox = document.createElement('div');
      cardBox.className = 'prompt-generator-card';
      cardBox.innerHTML = `
        <div class="prompt-generator-inner">
          <textarea id="pr-idea" class="prompt-generator-textarea" placeholder="Generate a prompt for...">python photo downloader</textarea>
          <div class="prompt-generator-bottom">
            <select id="pr-type" class="prompt-pill-select">
              <option value="text">Text</option>
              <option value="image">Image</option>
              <option value="code">Code</option>
            </select>
            <button id="prompt-generate-pill-btn" class="prompt-pill-btn">
              Generate &rarr;
            </button>
          </div>
        </div>
      `;
      container.appendChild(cardBox);

      // Bind custom button to invoke the same executor click router
      document.getElementById('prompt-generate-pill-btn').addEventListener('click', () => {
        DOM.writingExecuteBtn.click();
      });
      break;
    case 'image-to-prompt':
      // HTML Uploader & Preview Swatches area
      const uploadArea = document.createElement('div');
      uploadArea.innerHTML = `
        <div class="file-upload-zone" id="analyzer-upload-zone" style="margin-bottom: 8px;">
          <span>📸 Drop Image or Click to Upload</span>
          <input type="file" id="analyzer-file-input" class="file-input" accept="image/*">
        </div>
        <div id="analyzer-preview-box" style="display: none; flex-direction: column; gap: 8px; margin-bottom: 8px; background: rgba(0,0,0,0.2); padding: 8px; border-radius: 12px; border: 1px solid var(--border-glass);">
          <div style="display: flex; gap: 10px; align-items: center;">
            <img id="analyzer-preview-img" class="analyzer-img-preview" src="">
            <div style="display: flex; flex-direction: column; gap: 2px; flex: 1;">
              <span class="prompt-label" style="margin-bottom: 0;">Extracted Palette</span>
              <div id="analyzer-color-palette" class="analyzer-swatches-container"></div>
            </div>
            <button id="analyzer-remove-btn" class="file-remove-btn" style="font-size: 16px;">&times;</button>
          </div>
        </div>
      `;
      container.appendChild(uploadArea);
      
      createInput('Subject Keywords (Optional)', 'an-keywords', 'text', 'e.g. sunset mountains, cybernetic car...', 'sunset mountains');
      createSelect('Art Genre', 'an-genre', [
        { val: 'landscape', name: '🏔️ Landscape' },
        { val: 'portrait', name: '👤 Portrait' },
        { val: 'cyberpunk', name: '🌆 Cyberpunk Art' },
        { val: 'architecture', name: '🏛️ Architecture' },
        { val: 'abstract', name: '🌀 Abstract' }
      ]);

      // Bind drag and drop events
      const fileInp = document.getElementById('analyzer-file-input');
      const dropZone = document.getElementById('analyzer-upload-zone');
      
      dropZone.addEventListener('click', () => fileInp.click());
      fileInp.addEventListener('change', (e) => {
        if (e.target.files.length > 0) processAnalyzerImage(e.target.files[0]);
      });
      
      dropZone.addEventListener('dragover', (e) => {
        e.preventDefault(); dropZone.style.borderColor = 'var(--color-secondary)';
      });
      dropZone.addEventListener('dragleave', () => {
        dropZone.style.borderColor = 'rgba(6, 182, 212, 0.3)';
      });
      dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        if (e.dataTransfer.files.length > 0) processAnalyzerImage(e.dataTransfer.files[0]);
      });

      document.getElementById('analyzer-remove-btn').addEventListener('click', () => {
        state.analysedImagePalette = [];
        fileInp.value = '';
        document.getElementById('analyzer-preview-box').style.display = 'none';
        dropZone.style.display = 'block';
        showAlert('Image removed.');
      });
      break;
  }
  
  // Show default execute button for all other tools
  if (mode !== 'prompt-builder') {
    DOM.writingExecuteBtn.style.display = 'block';
  }
}

// Client-Side Canvas Image Dominant Colors Extraction
function processAnalyzerImage(file) {
  if (!file.type.startsWith('image/')) {
    showAlert('Please upload an image file.');
    return;
  }
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = document.getElementById('analyzer-preview-img');
    img.src = e.target.result;
    
    document.getElementById('analyzer-preview-box').style.display = 'block';
    document.getElementById('analyzer-upload-zone').style.display = 'none';
    
    // Canvas analysis
    const imageObj = new Image();
    imageObj.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      // Downsize to extract core colors efficiently
      canvas.width = 15;
      canvas.height = 15;
      ctx.drawImage(imageObj, 0, 0, 15, 15);
      
      const imgData = ctx.getImageData(0, 0, 15, 15).data;
      const counts = {};
      
      for (let i = 0; i < imgData.length; i += 4) {
        const r = imgData[i], g = imgData[i+1], b = imgData[i+2], a = imgData[i+3];
        if (a < 120) continue; // ignore transparency
        
        // Downsample colors to find cluster centers
        const factor = 24;
        const qr = Math.round(r / factor) * factor;
        const qg = Math.round(g / factor) * factor;
        const qb = Math.round(b / factor) * factor;
        const key = `${qr},${qg},${qb}`;
        counts[key] = (counts[key] || 0) + 1;
      }
      
      const sorted = Object.keys(counts).sort((a,b) => counts[b] - counts[a]);
      const palette = document.getElementById('analyzer-color-palette');
      palette.innerHTML = '';
      state.analysedImagePalette = [];
      
      const toHex = (r, g, b) => '#' + [r, g, b].map(v => {
        const hex = v.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      }).join('');
      
      const maxCount = Math.min(4, sorted.length);
      for (let k = 0; k < maxCount; k++) {
        const [r, g, b] = sorted[k].split(',').map(Number);
        const hex = toHex(r, g, b);
        state.analysedImagePalette.push(hex);
        
        const swatch = document.createElement('div');
        swatch.className = 'analyzer-color-swatch';
        swatch.style.backgroundColor = hex;
        swatch.title = hex;
        swatch.textContent = k + 1;
        palette.appendChild(swatch);
      }
      showAlert('Dominant colors extracted!');
    };
    imageObj.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

// Executes Selected Writing Tool
DOM.writingExecuteBtn.addEventListener('click', async () => {
  const mode = state.writingMode;
  let chatText = '';
  let solutionResult = '';
  let isMedia = false;

  const getVal = (id) => document.getElementById(id).value;
  
  DOM.writingResultTitle.textContent = "Processing...";
  DOM.writingResultContent.innerHTML = "Generating AI response, please wait...";
  DOM.writingResultMedia.style.display = 'none';
  DOM.writingResultCard.style.display = 'block';

  try {
    if (mode === 'paraphraser') {
      const text = getVal('p-text'), style = getVal('p-style');
      chatText = `Paraphrase (${style}): "${text.substring(0, 20)}..."`;
      solutionResult = await runParaphrase(text, style);
    }
    else if (mode === 'grammar-checker') {
      const text = getVal('g-text');
      chatText = `Grammar Check: "${text.substring(0, 20)}..."`;
      solutionResult = await runGrammarCheck(text);
    }
    else if (mode === 'ai-detector') {
      const text = getVal('ai-text');
      chatText = `Detect AI Probability.`;
      solutionResult = await runAIDetector(text);
    }
    else if (mode === 'plagiarism-checker') {
      const text = getVal('pl-text');
      chatText = `Plagiarism Scan.`;
      solutionResult = await runPlagiarismChecker(text);
    }
    else if (mode === 'ai-humanizer') {
      const text = getVal('h-text');
      chatText = `Humanize AI Text.`;
      solutionResult = await runHumanizer(text);
    }
    else if (mode === 'ai-image-generator') {
      const prompt = getVal('img-text'), style = getVal('img-style');
      chatText = `Generate AI Image: "${prompt}" (${style})`;
      solutionResult = `🎨 **AI Generated Art**: "${prompt}" in style **${style}**.\n(Rendered via Pollinations AI)`;
      isMedia = true;
      await runImageGenerator(prompt, style);
    }
    else if (mode === 'translator') {
      const text = getVal('t-text'), target = getVal('t-lang');
      chatText = `Translate to ${target}: "${text.substring(0, 20)}..."`;
      solutionResult = await runTranslation(text, target);
    }
    else if (mode === 'summarizer') {
      const text = getVal('s-text'), len = parseInt(document.getElementById('s-length-slider').value);
      chatText = `Summarize paragraphs.`;
      solutionResult = await runTFIDFSummarize(text, len);
    }
    else if (mode === 'citation-generator') {
      const auth = getVal('c-author'), title = getVal('c-title'), yr = getVal('c-year'), pub = getVal('c-pub'), style = getVal('c-style');
      chatText = `Generate ${style.toUpperCase()} Citation.`;
      solutionResult = await runCitation(auth, title, yr, pub, style);
    }
    else if (mode === 'prompt-builder') {
      const idea = getVal('pr-idea'), type = getVal('pr-type');
      chatText = `Prompt Generator: "${idea}"`;
      solutionResult = await runPromptBuilder(idea, type);
    }
    else if (mode === 'image-to-prompt') {
      const keywords = getVal('an-keywords'), genre = getVal('an-genre');
      chatText = `Image Analysis and Prompt Generation.`;
      solutionResult = await runImageToPrompt(keywords, genre);
    }
  } catch (err) {
    solutionResult = "⚠️ An error occurred while contacting the AI API: " + err.message;
  }

  // Update State & UI Results Panel
  state.latestWritingResult = solutionResult;
  state.latestWritingChatText = chatText;
  
  DOM.writingResultTitle.textContent = `${mode.charAt(0).toUpperCase() + mode.slice(1)} Output`;
  DOM.writingResultContent.innerHTML = formatMarkdown(solutionResult);
  
  DOM.writingResultMedia.style.display = isMedia ? 'flex' : 'none';
  showAlert('Tool executed!');
});

// Copy Output Helper
DOM.writingCopyBtn.addEventListener('click', () => {
  // Strip HTML tags for clean copy
  const temp = document.createElement('div');
  temp.innerHTML = state.latestWritingResult;
  const clean = temp.textContent || temp.innerText || '';
  
  navigator.clipboard.writeText(clean)
    .then(() => showAlert('Copied!'))
    .catch(() => showAlert('Copy failed.'));
});

// Send results to main Chat list
DOM.writingSendChatBtn.addEventListener('click', () => {
  if (!state.latestWritingResult) return;
  switchWorkspaceMode('chat');
  
  const ts = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  appendMessageMarkup('user', state.latestWritingChatText, ts);
  state.chatHistory.push({ sender: 'user', text: state.latestWritingChatText, timestamp: ts });
  saveHistory();

  showTypingIndicator();
  setTimeout(() => {
    removeTypingIndicator();
    appendMessageMarkup('bot', state.latestWritingResult, ts, true);
    state.chatHistory.push({ sender: 'bot', text: state.latestWritingResult, timestamp: ts });
    saveHistory();
    state.latestWritingResult = '';
  }, 400);
});

// --- AI Writing Hub Math & NLP Algorithms ---

async function fetchAI(prompt) {
  const res = await fetch(`https://text.pollinations.ai/${encodeURIComponent(prompt)}`);
  if (!res.ok) throw new Error('API failed');
  return await res.text();
}

async function runParaphrase(text, style) {
  const prompt = `Paraphrase the following text in a ${style} style. Only return the paraphrased text, nothing else.\nText: ${text}`;
  const result = await fetchAI(prompt);
  return `🔄 **Paraphrase (${style})**:\n"${result.trim()}"`;
}

async function runGrammarCheck(text) {
  const prompt = `Fix all grammar, spelling, and punctuation errors in the following text. If there are no errors, explicitly say "Text is grammatically correct! No errors found." Otherwise, provide the corrected text clearly.\nText: ${text}`;
  const result = await fetchAI(prompt);
  return `✍️ **Grammar Checker**:\n\n${result.trim()}`;
}

async function runAIDetector(text) {
  const prompt = `Analyze the following text and determine the probability (0-100%) that it was written by an AI. Output the exact percentage on the first line, then a brief explanation why on the second line.\nText: ${text}`;
  const result = await fetchAI(prompt);
  const lines = result.split('\n');
  let score = 50;
  const match = lines[0].match(/(\d+)/);
  if (match) score = parseInt(match[1]);
  
  return `🔍 **AI Content Detector Output**:\n` +
         `• AI Probability: **${score}%**\n` +
         `<div class="ai-detector-bar-container"><div class="ai-detector-bar" style="width: ${score}%;"></div></div>\n` +
         `• Assessment: ${lines.slice(1).join('\n')}`;
}

async function runPlagiarismChecker(text) {
  let context = "";
  if (state.loadedFile && state.loadedFile.content) {
    context = `\nCompare it against this document: ${state.loadedFile.content.substring(0, 5000)}`;
  }
  const prompt = `Act as a plagiarism checker. Analyze this text for generic or plagiarized content.${context}\n\nProvide a similarity index percentage on the first line, and a brief report. Text: ${text}`;
  const result = await fetchAI(prompt);
  return `🕵️ **Plagiarism Scan**:\n${result}`;
}

async function runHumanizer(text) {
  const prompt = `Rewrite the following AI-generated text to sound completely human, natural, and conversational. Remove any cliché AI transition words (like 'furthermore', 'delve', 'testament').\nText: ${text}`;
  const result = await fetchAI(prompt);
  return `🙋 **Humanized Output**:\n"${result.trim()}"`;
}

async function runImageToPrompt(keywords, genre) {
  const palette = state.analysedImagePalette && state.analysedImagePalette.length > 0 
    ? state.analysedImagePalette.join(', ') 
    : '#4ade80, #06b6d4, #ec4899';
    
  const prompt = `Write a highly detailed, professional text-to-image prompt (like for Midjourney or DALL-E) based on these details: Genre is ${genre}, Keywords are ${keywords || 'scenic atmosphere'}, and dominant colors are ${palette}. Output just the prompt string.`;
  const result = await fetchAI(prompt);
  
  return `📸 **Image-to-Prompt Analysis**:\n` +
         `• Extracted Palette: \`${palette}\`\n` +
         `• Identified Genre: **${genre.charAt(0).toUpperCase() + genre.slice(1)}**\n` +
         `• Subject Context: **${keywords || 'unspecified'}**\n\n` +
         `🎨 **Synthesized AI Prompt**:\n` +
         `"${result.trim()}"`;
}

async function runImageGenerator(prompt, style) {
  const canvas = DOM.genImageCanvas;
  const ctx = canvas.getContext('2d');
  
  // Clear canvas while loading
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#111';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#fff';
  ctx.font = '14px Arial';
  ctx.fillText('Loading AI Image...', 20, canvas.height/2);

  return new Promise((resolve) => {
    const imgObj = new Image();
    imgObj.crossOrigin = "Anonymous";
    imgObj.onload = () => {
      // Resize canvas to match image ratio
      canvas.width = imgObj.width;
      canvas.height = imgObj.height;
      ctx.drawImage(imgObj, 0, 0);
      resolve();
    };
    imgObj.onerror = () => {
      ctx.fillText('Error loading image', 20, canvas.height/2 + 20);
      resolve();
    };
    // Fetch from Pollinations Image API
    const finalPrompt = `${prompt} in the style of ${style}`;
    imgObj.src = `https://image.pollinations.ai/prompt/${encodeURIComponent(finalPrompt)}?width=512&height=512&nologo=true`;
  });
}

async function runTranslation(text, lang) {
  try {
    const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${lang}`);
    const data = await res.json();
    if (data && data.responseData && data.responseData.translatedText) {
      return `🔤 **Offline Translate (${lang.toUpperCase()})**:\n"${data.responseData.translatedText}"`;
    }
  } catch(e) {}
  
  // Fallback to LLM if MyMemory fails
  const prompt = `Translate the following text to language code '${lang}':\n${text}`;
  const result = await fetchAI(prompt);
  return `🔤 **Translate (${lang.toUpperCase()})**:\n"${result.trim()}"`;
}

async function runTFIDFSummarize(text, numSentences) {
  const prompt = `Summarize the following text into exactly ${numSentences} bullet points. Only output the bullet points.\nText: ${text}`;
  const result = await fetchAI(prompt);
  return `📄 **Summary (${numSentences} sentences)**:\n${result.trim()}`;
}

async function runCitation(author, title, year, publisher, style) {
  const prompt = `Generate a perfectly formatted academic citation in ${style.toUpperCase()} format using these details: Author: ${author}, Title: ${title}, Year: ${year}, Publisher: ${publisher}. Only output the citation text.`;
  const result = await fetchAI(prompt);
  return `🗂️ **${style.toUpperCase()} Citation**:\n${result.trim()}`;
}

async function runPromptBuilder(idea, type) {
  const prompt = `I need an AI prompt for a ${type} generation model (e.g. Midjourney for images, ChatGPT for text, GitHub Copilot for code). The core idea is: "${idea}". Please generate an extremely detailed, high-quality, professional prompt that I can copy and paste into the AI tool.`;
  const result = await fetchAI(prompt);
  return `📝 **AI Prompt Builder**:\n\n${result.trim()}`;
}

// --- PDF Toolkit Logic ---
function handlePdfUpload(fileIndex, file) {
  if (file.type !== 'application/pdf') {
    showAlert('Invalid PDF.');
    return;
  }
  const reader = new FileReader();
  reader.onload = (e) => {
    if (fileIndex === 1) {
      state.pdfFiles.file1 = { name: file.name, buffer: e.target.result };
      DOM.pdfLabel1.textContent = file.name.substring(0, 10) + '...';
      DOM.pdfZone1.style.borderColor = 'var(--color-primary)';
    } else {
      state.pdfFiles.file2 = { name: file.name, buffer: e.target.result };
      DOM.pdfLabel2.textContent = file.name.substring(0, 10) + '...';
      DOM.pdfZone2.style.borderColor = 'var(--color-secondary)';
    }
    DOM.pdfStatus.textContent = 'PDF Active';
    DOM.pdfStatus.classList.add('active');
    showAlert('PDF Loaded.');
  };
  reader.readAsArrayBuffer(file);
}

DOM.pdfUploader1.addEventListener('change', (e) => handlePdfUpload(1, e.target.files[0]));
DOM.pdfUploader2.addEventListener('change', (e) => handlePdfUpload(2, e.target.files[0]));
DOM.pdfZone1.addEventListener('click', () => DOM.pdfUploader1.click());
DOM.pdfZone2.addEventListener('click', () => DOM.pdfUploader2.click());

DOM.pdfExtractBtn.addEventListener('click', async () => {
  const buf = state.pdfFiles.file1.buffer;
  if (!buf) { showAlert('Upload PDF 1 first.'); return; }
  showAlert('Extracting...');
  try {
    const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(buf) }).promise;
    let txt = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      txt += `--- Page ${i} ---\n` + textContent.items.map(item => item.str).join(' ') + '\n\n';
    }
    state.loadedFile = { name: state.pdfFiles.file1.name, type: 'PDF', size: buf.byteLength, content: txt };
    DOM.fileStatus.textContent = state.loadedFile.name.substring(0,10) + '...';
    DOM.fileStatus.classList.add('active');
    DOM.loadedFileName.textContent = state.loadedFile.name;
    DOM.fileInfoContainer.style.display = 'flex';
    DOM.dragDropZone.style.display = 'none';
    switchWorkspaceMode('chat');

    const msg = `📕 **System**: Extracted text from PDF **${state.loadedFile.name}** (${pdf.numPages} pages).`;
    const ts = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    appendMessageMarkup('system', msg, ts);
    state.chatHistory.push({ sender: 'system', text: msg, timestamp: ts });
    saveHistory();
    showAlert('Extracted!');
  } catch(err) {
    showAlert('Error: ' + err.message);
  }
});

DOM.pdfWatermarkBtn.addEventListener('click', async () => {
  const buf = state.pdfFiles.file1.buffer;
  if (!buf) { showAlert('Upload PDF 1.'); return; }
  const text = DOM.pdfWatermarkText.value.trim() || 'AURA SECURE';
  showAlert('Watermarking...');
  try {
    const doc = await PDFLib.PDFDocument.load(buf);
    doc.getPages().forEach(page => {
      const { width, height } = page.getSize();
      const userOpacity = parseFloat(DOM.pdfOpacitySlider.value) || 0.25;
      page.drawText(text, {
        x: width/2 - 120, y: height/2, size: 36,
        color: PDFLib.rgb(0.8, 0.1, 0.2), opacity: userOpacity,
        rotate: PDFLib.degrees(45)
      });
    });
    const bytes = await doc.save();
    triggerDownload(bytes, 'watermarked_document.pdf', 'application/pdf');
    showAlert('Downloaded!');
  } catch(err) {
    showAlert('Error: ' + err.message);
  }
});

DOM.pdfMergeBtn.addEventListener('click', async () => {
  const b1 = state.pdfFiles.file1.buffer;
  const b2 = state.pdfFiles.file2.buffer;
  if (!b1 || !b2) { showAlert('Upload both PDFs.'); return; }
  showAlert('Merging...');
  try {
    const merged = await PDFLib.PDFDocument.create();
    const d1 = await PDFLib.PDFDocument.load(b1);
    const d2 = await PDFLib.PDFDocument.load(b2);
    const p1 = await merged.copyPages(d1, d1.getPageIndices());
    p1.forEach(p => merged.addPage(p));
    const p2 = await merged.copyPages(d2, d2.getPageIndices());
    p2.forEach(p => merged.addPage(p));
    const bytes = await merged.save();
    triggerDownload(bytes, 'merged_document.pdf', 'application/pdf');
    showAlert('Merged!');
  } catch(err) {
    showAlert('Error: ' + err.message);
  }
});

function triggerDownload(bytes, filename, type) {
  const blob = new Blob([bytes], { type });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
}

// --- General Chat Actions ---
DOM.chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  handleUserMessageSubmit(DOM.chatInput.value);
});

DOM.voiceInputBtn.addEventListener('click', () => {
  if (!recognition) return;
  if (state.isRecording) { recognition.stop(); stopSpeechRecognition(); }
  else { try { recognition.start(); } catch { stopSpeechRecognition(); } }
});

DOM.toggleVoiceBtn.addEventListener('click', () => {
  state.ttsEnabled = !state.ttsEnabled;
  localStorage.setItem('aura_tts_enabled', state.ttsEnabled);
  DOM.ttsStatus.textContent = state.ttsEnabled ? 'Active' : 'Disabled';
  DOM.ttsStatus.classList.toggle('active', state.ttsEnabled);
  DOM.toggleVoiceBtn.classList.toggle('recording', state.ttsEnabled);
  showAlert(state.ttsEnabled ? 'Speech on' : 'Muted');
});

DOM.clearChatBtn.addEventListener('click', () => {
  if (confirm("Clear history?")) {
    state.chatHistory = [];
    localStorage.removeItem('aura_chat_history');
    DOM.chatMessages.innerHTML = '';
    appendMessageMarkup('bot', 'Chat cleared. Open Manage Skills to use tools.', new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));
  }
});

window.handleChipClick = function(text) {
  DOM.chatInput.value = text;
  handleUserMessageSubmit(text);
};

if (DOM.toggleDrawerBtn) {
  DOM.toggleDrawerBtn.addEventListener('click', () => {
    DOM.skillsDrawer.classList.add('open');
    setTimeout(() => {
      switchTab(state.activeTab);
    }, 180);
  });
}
if (DOM.closeDrawerBtn) {
  DOM.closeDrawerBtn.addEventListener('click', () => {
    switchWorkspaceMode('chat');
  });
}

// --- Left History Sidebar Controls ---
DOM.toggleHistoryBtn.addEventListener('click', () => {
  DOM.historySidebar.classList.add('open');
});

DOM.closeHistoryBtn.addEventListener('click', () => {
  DOM.historySidebar.classList.remove('open');
});

DOM.newChatBtn.addEventListener('click', () => {
  startNewChat(true);
});

DOM.exportJsonBtn.addEventListener('click', () => {
  if (state.sessions.length === 0) { showAlert('No history to export.'); return; }
  try {
    const dataStr = JSON.stringify(state.sessions, null, 2);
    const bytes = new TextEncoder().encode(dataStr);
    triggerDownload(bytes, 'aura_chat_sessions_backup.json', 'application/json');
    showAlert('Backup downloaded!');
  } catch(err) {
    showAlert('Export failed: ' + err.message);
  }
});

DOM.exportTxtBtn.addEventListener('click', () => {
  if (state.sessions.length === 0) { showAlert('No history to export.'); return; }
  try {
    let textOut = `# Aura AI Chat History Transcript Backup\n`;
    textOut += `Generated on: ${new Date().toLocaleString()}\n\n`;
    
    state.sessions.forEach((s, sIdx) => {
      textOut += `========================================\n`;
      textOut += `SESSION #${sIdx + 1}: ${s.title}\n`;
      textOut += `Last Active: ${s.timestamp}\n`;
      textOut += `========================================\n\n`;
      
      s.messages.forEach(m => {
        const sender = m.sender === 'user' ? 'USER' : 'AURA AI';
        textOut += `[${m.timestamp}] ${sender}:\n${m.text}\n\n`;
      });
      
      textOut += `\n\n`;
    });
    
    const bytes = new TextEncoder().encode(textOut);
    triggerDownload(bytes, 'aura_chat_transcript.txt', 'text/plain');
    showAlert('Transcript downloaded!');
  } catch(err) {
    showAlert('Export failed: ' + err.message);
  }
});

// --- Sliders Value Listeners ---
DOM.voiceRateSlider.addEventListener('input', (e) => {
  state.ttsRate = parseFloat(e.target.value);
  DOM.voiceRateLabel.textContent = e.target.value + 'x';
});

DOM.voicePitchSlider.addEventListener('input', (e) => {
  state.ttsPitch = parseFloat(e.target.value);
  DOM.voicePitchLabel.textContent = e.target.value;
});

DOM.pdfOpacitySlider.addEventListener('input', (e) => {
  DOM.pdfOpacityLabel.textContent = e.target.value;
});

// --- Dynamic Writing Hub Triggers ---
DOM.writingModeSelect.addEventListener('change', (e) => {
  renderWritingHubInputs(e.target.value);
});

// --- Universal Calculator Triggers ---
DOM.calcModeSelect.addEventListener('change', (e) => {
  renderUniversalCalculatorInputs(e.target.value);
});

// Initialize forms
renderUniversalCalculatorInputs('scientific-calculator');
renderWritingHubInputs('paraphraser');

// --- Universal File Parser (Multi-modal) ---
async function processUniversalFile(file) {
  if (!file) return;
  DOM.fileStatus.textContent = "Parsing...";
  
  try {
    let contentText = "";
    
    // 1. Plain Text / JSON / CSV
    if (file.type.match(/text.*/) || file.type.match(/application\/json/)) {
      contentText = await file.text();
    }
    // 2. Word Documents (.docx)
    else if (file.name.endsWith('.docx')) {
      const arrayBuffer = await file.arrayBuffer();
      if (typeof mammoth !== 'undefined') {
        const result = await mammoth.extractRawText({ arrayBuffer });
        contentText = result.value;
      } else {
        throw new Error('Mammoth.js not loaded. Cannot parse DOCX.');
      }
    }
    // 3. PDFs
    else if (file.type === 'application/pdf') {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) }).promise;
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        contentText += textContent.items.map(item => item.str).join(' ') + '\\n';
      }
    }
    // 4. Images
    else if (file.type.startsWith('image/')) {
      // Analyze colors for context
      processAnalyzerImage(file);
      showAlert('Image added to context.');
      
      // Update UI for image
      state.loadedFile = { name: file.name, type: 'IMAGE', size: file.size, content: "Image file uploaded." };
      DOM.fileStatus.textContent = file.name.substring(0, 10) + '...';
      DOM.fileStatus.classList.add('active');
      DOM.loadedFileName.textContent = file.name;
      DOM.fileInfoContainer.style.display = 'flex';
      DOM.dragDropZone.style.display = 'none';
      return;
    }
    else {
      throw new Error('Unsupported file format.');
    }
    
    // Update State & UI for Text files
    state.loadedFile = { name: file.name, type: file.type, size: file.size, content: contentText };
    DOM.fileStatus.textContent = state.loadedFile.name.substring(0, 10) + '...';
    DOM.fileStatus.classList.add('active');
    DOM.loadedFileName.textContent = state.loadedFile.name;
    DOM.fileInfoContainer.style.display = 'flex';
    DOM.dragDropZone.style.display = 'none';
    showAlert('File parsed to memory.');
    
  } catch (err) {
    showAlert('Error parsing: ' + err.message);
    DOM.fileStatus.textContent = "Error";
  }
}

if (DOM.fileUploader) {
  DOM.fileUploader.addEventListener('change', (e) => {
    if (e.target.files.length > 0) processUniversalFile(e.target.files[0]);
  });
}
if (DOM.dragDropZone) {
  DOM.dragDropZone.addEventListener('click', () => {
    if (DOM.fileUploader) DOM.fileUploader.click();
  });
  DOM.dragDropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    DOM.dragDropZone.style.borderColor = 'var(--color-secondary)';
  });
  DOM.dragDropZone.addEventListener('dragleave', () => {
    DOM.dragDropZone.style.borderColor = 'rgba(6, 182, 212, 0.3)';
  });
  DOM.dragDropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    DOM.dragDropZone.style.borderColor = 'rgba(6, 182, 212, 0.3)';
    if (e.dataTransfer.files.length > 0) processUniversalFile(e.dataTransfer.files[0]);
  });
}
if (DOM.removeFileBtn) {
  DOM.removeFileBtn.addEventListener('click', () => {
    state.loadedFile = { name: '', type: '', size: 0, content: '' };
    state.analysedImagePalette = [];
    if (DOM.fileUploader) DOM.fileUploader.value = '';
    DOM.fileInfoContainer.style.display = 'none';
    DOM.dragDropZone.style.display = 'flex';
    DOM.fileStatus.textContent = 'No File Loaded';
    DOM.fileStatus.classList.remove('active');
    showAlert('Context cleared.');
  });
}

// --- Initialize App ---
updateClock();
setInterval(updateClock, 1000);
loadHistory();
setTimeout(() => switchTab(state.activeTab), 220); // Align sliding indicator background on startup
showAlert('Aura Ready.');

// --- About Modal, Reviews and Contact Form Logic ---
const aboutModal = document.getElementById('about-modal');
const aboutBtn = document.getElementById('about-btn');
const closeAboutBtn = document.getElementById('close-about-btn');

// Open Modal
if (aboutBtn && aboutModal) {
  aboutBtn.addEventListener('click', () => {
    aboutModal.style.display = 'flex';
    renderReviews();
  });
}

// Close Modal
if (closeAboutBtn && aboutModal) {
  closeAboutBtn.addEventListener('click', () => {
    aboutModal.style.display = 'none';
  });
}

// Close Modal when clicking outside the content area
if (aboutModal) {
  aboutModal.addEventListener('click', (e) => {
    if (e.target === aboutModal) {
      aboutModal.style.display = 'none';
    }
  });
}

// Star Rating Selection
let selectedRating = 5;
const stars = document.querySelectorAll('#rating-stars .star');
stars.forEach(star => {
  // Highlight stars on load
  star.classList.toggle('selected', parseInt(star.getAttribute('data-value')) <= selectedRating);

  star.addEventListener('click', () => {
    selectedRating = parseInt(star.getAttribute('data-value'));
    stars.forEach(s => {
      s.classList.toggle('selected', parseInt(s.getAttribute('data-value')) <= selectedRating);
    });
  });
});

// Reviews Database
function getReviews() {
  let reviews = localStorage.getItem('aura_reviews');
  if (!reviews) {
    // Pre-populate with mock reviews
    const mockReviews = [
      { author: "Alex Mercer", rating: 5, text: "The offline BMR and GPA calculators are incredibly fast! Perfect interface design." },
      { author: "Taylor Reed", rating: 5, text: "I love the local privacy. It merges and watermarks my PDFs locally in under 3 seconds." },
      { author: "Dev Kabir", rating: 4, text: "Amazing client-side web utility! The paraphrasing tool helps me rewrite emails easily." }
    ];
    localStorage.setItem('aura_reviews', JSON.stringify(mockReviews));
    return mockReviews;
  }
  return JSON.parse(reviews);
}

function renderReviews() {
  const container = document.getElementById('reviews-container');
  if (!container) return;
  
  const reviews = getReviews();
  container.innerHTML = '';
  
  reviews.forEach(rev => {
    const item = document.createElement('div');
    item.classList.add('review-item');
    
    let starsHtml = '★'.repeat(rev.rating) + '☆'.repeat(5 - rev.rating);
    
    item.innerHTML = `
      <div class="review-item-header">
        <span class="review-author">${rev.author}</span>
        <span class="review-stars">${starsHtml}</span>
      </div>
      <div class="review-text">${rev.text}</div>
    `;
    container.appendChild(item);
  });
  container.scrollTop = container.scrollHeight;
}

// Handle Review Submission
const reviewForm = document.getElementById('review-form');
if (reviewForm) {
  reviewForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const author = document.getElementById('review-author').value.trim();
    const text = document.getElementById('review-text').value.trim();
    if (!author || !text) return;
    
    const reviews = getReviews();
    reviews.push({ author, rating: selectedRating, text });
    localStorage.setItem('aura_reviews', JSON.stringify(reviews));
    
    // Reset form
    reviewForm.reset();
    selectedRating = 5;
    stars.forEach(s => s.classList.add('selected'));
    
    renderReviews();
    showAlert('Thank you for your review!');
  });
}

// Handle Contact Form Submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const message = document.getElementById('contact-message').value.trim();
    if (!name || !email || !message) return;
    
    // Simulate successful message send locally
    console.log("Feedback Message Submitted:", { name, email, message });
    showAlert('Message sent successfully!');
    contactForm.reset();
  });
}

// --- Network Connectivity Status ---
window.addEventListener('online', () => {
  showAlert('You are back online.');
  const botStatus = document.getElementById('bot-status');
  if (botStatus) botStatus.innerHTML = '<span>●</span> Online • Local Workspace';
});

window.addEventListener('offline', () => {
  showAlert('You are offline. Local features still work.');
  const botStatus = document.getElementById('bot-status');
  if (botStatus) botStatus.innerHTML = '<span style="color: #F43F5E;">●</span> Offline • Local Workspace';
});
