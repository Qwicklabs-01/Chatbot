require('dotenv').config();
const express = require('express');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { Ollama } = require('ollama');
const fs = require('fs');

// Connect directly to local Ollama on the same machine
const OLLAMA_URL = process.env.OLLAMA_HOST || 'http://127.0.0.1:11434';
const ollama = new Ollama({ host: OLLAMA_URL });
const app = express();
const PORT = 3000;

// Load OmniBrain-Pro-Master Brain (Created by Developer Sakshi)
let systemInstructionText = '';
try {
  let brainDir = path.join(__dirname, '..', 'brain');
  if (!fs.existsSync(path.join(brainDir, 'master-prompt-professional.md'))) {
    brainDir = path.join(__dirname, '..', 'OmniBrain-Pro-Master', 'OmniBrain-Pro-master');
  }
  const masterPrompt = fs.readFileSync(path.join(brainDir, 'master-prompt-professional.md'), 'utf-8');
  let skillsList = '';
  if (fs.existsSync(path.join(brainDir, 'brain.md'))) {
    skillsList = fs.readFileSync(path.join(brainDir, 'brain.md'), 'utf-8');
  }
  
  // Load all agent skills automatically
  try {
    const skillsDir = path.join(__dirname, '..', '.agents', 'skills');
    if (fs.existsSync(skillsDir)) {
      const folders = fs.readdirSync(skillsDir);
      for (const folder of folders) {
        if (folder.startsWith('.')) continue;
        const skillPath = path.join(skillsDir, folder, 'SKILL.md');
        if (fs.existsSync(skillPath)) {
          const content = fs.readFileSync(skillPath, 'utf-8');
          // Add first 500 chars of each skill to avoid overloading context limits
          skillsList += `\n\n### SKILL LIBRARY: ${folder}\n${content.slice(0, 500)}\n`;
        }
      }
      console.log('✅ Integrated all Agent Skills libraries into the model context.');
    }
  } catch (err) {
    console.warn('⚠️ Could not load skills libraries:', err.message);
  }
  
  systemInstructionText = `# OMNIBRAIN PRO MASTER MODEL — The Ultimate Professional Multi-Discipline Creator, Engineer, and Strategist\n\n` +
    `ROLE & IDENTITY:\n` +
    `You are "OmniBrain Pro Master Model" (Aura AI), an elite AI assistant proudly created by Developer Sakshi (Customer Care: +91 6290873841, Email: qwicklabs2@gmail.com). ` +
    `You operate across the 6 OmniBrain modes: The Engineer, The Creative Director, The Link Expert, The Designer & Artist, The Strategist & Scientist, and The Chief Marketing Officer (Growth & SEO Master).\n\n` +
    `---\n\n${masterPrompt}\n\n---\n\n${skillsList}\n\n` +
    `DIRECTIVE: Deliver deep, authoritative, and production-grade answers adhering strictly to OmniBrain-Pro standards. Only mention your creator or customer care when relevant or asked.`;
  console.log('✅ OmniBrain-Pro-Master Brain successfully loaded into Chatbot engine.');
} catch (err) {
  console.warn('⚠️ Using fallback OmniBrain prompt:', err.message);
  systemInstructionText = "You are OmniBrain Pro Master Model (Aura AI), an elite AI assistant created by Developer Sakshi (Customer Care: 6290873841). Provide authoritative, expert answers across engineering, SEO, content, and strategy.";
}

// Set up Multer for handling memory storage
const upload = multer({ storage: multer.memoryStorage() });

// Enterprise-Grade Security & CORS
app.use(cors({
  origin: '*', // Allows Localtunnel/Vercel dynamic domains
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Payload limits to prevent DoS attacks
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(express.static(path.join(__dirname, '..')));

// Local development stubs for Vercel analytics & favicon
app.get(['/_vercel/insights/script.js', '/_vercel/speed-insights/script.js'], (req, res) => {
  res.type('application/javascript').send('// Local development analytics stub');
});
app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'aura-icon-192.png'));
});

// Security & Professional Hardening via Helmet
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://cdn.vercel-insights.com", "https://www.googletagmanager.com"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "https:", "http://localhost:3000", "http://localhost:3001", "http://127.0.0.1:11434"]
    }
  },
  crossOriginEmbedderPolicy: false,
  xXssProtection: true,
  xFrameOptions: { action: 'deny' }
}));

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // Limit each IP to 200 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: { reply: "You are sending requests too quickly. Please wait a moment." }
});

// Apply rate limiter to all API routes
app.use('/api/', apiLimiter);

/**
 * Main API Endpoint for Chat & File Analysis
 * Route: POST /api/chat
 */
app.get(['/api/ping', '/'], (req, res) => res.json({ status: 'alive' }));

app.post(['/api/chat', '/'], upload.single('file'), async (req, res) => {
  try {
    const rawMessage = req.body.message || '';
    const file = req.file;
    
    let cleanMessage = rawMessage;
    if (rawMessage.includes("User Question: ")) {
      cleanMessage = rawMessage.split("User Question: ")[1].trim();
    }
    
    let prompt = rawMessage;
    let base64Image = null;
    let mimeType = null;

    // Handle File Attachment
    if (file) {
      const mime = file.mimetype;
      
      // Handle PDF & Text Analysis
      if (mime === 'application/pdf') {
        console.log('Parsing PDF...');
        const pdfData = await pdfParse(file.buffer);
        const extractedText = pdfData.text;
        prompt = `Based on the following document context:\n\n---\n${extractedText}\n---\n\nUser query: ${rawMessage}`;
      } else if (mime === 'text/plain' || mime === 'text/csv' || mime === 'application/json') {
        const textData = file.buffer.toString('utf-8');
        prompt = `Based on the following file context:\n\n---\n${textData}\n---\n\nUser query: ${rawMessage}`;
      } else if (mime.startsWith('image/')) {
        console.log('Processing Image...');
        base64Image = file.buffer.toString('base64');
        mimeType = mime;
        prompt = rawMessage || 'Describe this image in detail.';
      } else {
        return res.status(400).json({ error: 'Unsupported file type.' });
      }
    }

    console.log(`Sending prompt to Ollama...`);

    let messages = [];
    if (systemInstructionText) {
      messages.push({ role: 'system', content: systemInstructionText });
    }
    
    if (base64Image) {
      messages.push({
        role: 'user',
        content: prompt,
        images: [base64Image]
      });
    } else {
      messages.push({ role: 'user', content: prompt });
    }

    let botReply = "";

    // 1. If running locally, check if local Ollama is active with a fast ping
    if (!process.env.VERCEL) {
      let ollamaActive = false;
      try {
        const pingController = new AbortController();
        const pingTimeout = setTimeout(() => pingController.abort(), 1200);
        const pingRes = await fetch(`${OLLAMA_URL}/api/version`, { signal: pingController.signal });
        clearTimeout(pingTimeout);
        if (pingRes.ok) ollamaActive = true;
      } catch (pingErr) {
        ollamaActive = false;
      }

      if (ollamaActive) {
        try {
          const ollamaPromise = ollama.chat({
            model: 'brainomnipro',
            messages: messages,
            options: {
              num_predict: 1024,
              num_ctx: 2048
            }
          });
          const response = await Promise.race([
            ollamaPromise,
            new Promise((_, reject) => setTimeout(() => reject(new Error('Local Ollama timeout')), 3000))
          ]);

          if (response && response.message && response.message.content) {
            botReply = response.message.content;
          }
        } catch (ollamaErr) {
          console.warn('Local Ollama chat failed or timed out:', ollamaErr.message);
        }
      } else {
        console.log(`ℹ️ Local Ollama not active at ${OLLAMA_URL}. Seamlessly routing to AI gateway...`);
      }
    }

    // 2. If Gemini API Key is configured, use official Google GenAI
    if (!botReply && process.env.GEMINI_API_KEY) {
      try {
        const { GoogleGenAI } = require('@google/genai');
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const geminiRes = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt
        });
        if (geminiRes && geminiRes.text) {
          botReply = geminiRes.text;
        }
      } catch (geminiErr) {
        console.warn('Gemini API call failed:', geminiErr.message);
      }
    }

    // 3. FreeLLMAPI Local Router Integration
    if (!botReply) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000);
        req.on('close', () => { controller.abort(); clearTimeout(timeout); });
        
        const freeLLMMessages = [
          { role: 'system', content: (systemInstructionText || '') + '\nYou are OmniBrain Pro Master Model (Aura AI), an elite AI assistant created by Developer Sakshi. Provide helpful, accurate responses.' },
          { role: 'user', content: prompt || cleanMessage }
        ];

        const freeLLMRes = await fetch('http://localhost:3001/v1/chat/completions', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.FREELLM_API_KEY || 'freellmapi-default'}` 
          },
          body: JSON.stringify({
            model: 'auto',
            messages: freeLLMMessages
          }),
          signal: controller.signal
        });
        clearTimeout(timeout);
        
        if (freeLLMRes.ok) {
          const json = await freeLLMRes.json();
          if (json.choices && json.choices.length > 0) {
             botReply = json.choices[0].message.content.trim();
          }
        }
      } catch (err) {
         console.log('FreeLLMAPI unavailable or not running:', err.message);
      }
    }

    // 4. Robust Free Cloud LLM Gateway (Pollinations)
    if (!botReply) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 15000);
        req.on('close', () => {
          controller.abort();
          clearTimeout(timeout);
        });
        const cloudMessages = [
          { 
            role: 'system', 
            content: (systemInstructionText ? systemInstructionText : '') + '\nYou are OmniBrain Pro Master Model (Aura AI), an elite AI assistant created by Developer Sakshi. Provide helpful, accurate responses.'
          },
          { 
            role: 'user', 
            content: prompt || cleanMessage 
          }
        ];

        const cloudRes = await fetch('https://text.pollinations.ai/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: cloudMessages }),
          signal: controller.signal
        });
        clearTimeout(timeout);
        if (cloudRes.ok) {
          const text = await cloudRes.text();
          if (text && !text.includes('"error":') && text.trim().length > 5) {
            botReply = text.trim();
          }
        }
      } catch (cloudErr) {
        console.warn('Cloud gateway unavailable:', cloudErr.message);
      }
    }

    // 4. Master OmniBrain Knowledge Synthesis fallback if networks are completely offline
    if (!botReply) {
      botReply = generateOmniBrainMasterAnswer(cleanMessage);
    }

    return res.json({ reply: botReply });

  } catch (error) {
    console.error('Chat API Error:', error);
    return res.json({ 
      reply: generateOmniBrainMasterAnswer(req.body.message || '')
    });
  }
});

// OmniBrain-Pro-Master Knowledge Synthesizer (Created by Developer Sakshi)
function generateOmniBrainMasterAnswer(input) {
  const lower = (input || '').toLowerCase();

  // Mode: Chief Marketing Officer & GEO Optimization
  if (lower.includes('seo') || lower.includes('geo') || lower.includes('search engine') || lower.includes('ranking')) {
    return `📈 **OmniBrain-Pro Master Model — SEO & GEO Optimization Blueprint**\n\n` +
           `### 1. Generative Engine Optimization (GEO)\n` +
           `Optimized for AI answer engines (ChatGPT Search, Perplexity, Claude, Gemini):\n` +
           `• **Authoritative Citations**: Boost visibility by **+40%** by citing primary source documentation.\n` +
           `• **Concrete Metrics & Statistics**: Boost visibility by **+37%** with verified benchmark figures.\n` +
           `• **Expert Quotations**: Boost authority by **+30%** with named practitioner references.\n` +
           `• **Answer-First Structure**: Deliver conclusion in sentence 1, followed by structured tables and bullet lists.\n\n` +
           `### 2. Technical & Semantic SEO Architecture\n` +
           `• **Core Web Vitals**: Target LCP ≤ 2.5s, INP ≤ 200ms, and CLS ≤ 0.1.\n` +
           `• **Topic Clusters**: Pillar content linked to targeted sub-topic spokes via descriptive anchor texts.\n` +
           `• **JSON-LD Schema**: Structured schema integration for instant rich snippets:\n\n` +
           `\`\`\`json\n` +
           `{\n` +
           `  "@context": "https://schema.org",\n` +
           `  "@type": "TechArticle",\n` +
           `  "headline": "OmniBrain-Pro SEO & GEO Master Standards",\n` +
           `  "author": { "@type": "Person", "name": "Sakshi" },\n` +
           `  "publisher": { "@type": "Organization", "name": "Aura AI" }\n` +
           `}\n` +
           `\`\`\`\n\n` +
           `*Operated under OmniBrain-Pro CMO Mode — Developed by Sakshi.*`;
  }

  // Mode: The Engineer (API & Architecture)
  if (lower.includes('api') || lower.includes('next.js') || lower.includes('backend') || lower.includes('code') || lower.includes('zod')) {
    return `⚡ **OmniBrain-Pro Master Model — Engineering Standards**\n\n` +
           `### 1. Next.js App Router API Standard\n` +
           `In modern backend handlers, ALWAYS enforce standardized schema response envelopes:\n\n` +
           `\`\`\`typescript\n` +
           `// Standard Envelope: { success, data, message, error, code }\n` +
           `import { NextResponse } from "next/server";\n` +
           `import { z } from "zod";\n\n` +
           `const RequestSchema = z.object({\n` +
           `  query: z.string().min(1),\n` +
           `  limit: z.number().default(10)\n` +
           `});\n\n` +
           `export async function POST(req: Request) {\n` +
           `  try {\n` +
           `    const body = await req.json();\n` +
           `    const validated = RequestSchema.parse(body);\n` +
           `    return NextResponse.json({\n` +
           `      success: true,\n` +
           `      data: validated,\n` +
           `      code: "SUCCESS_200"\n` +
           `    });\n` +
           `  } catch (err: any) {\n` +
           `    return NextResponse.json({\n` +
           `      success: false,\n` +
           `      error: err.message,\n` +
           `      code: "VALIDATION_ERROR_400"\n` +
           `    }, { status: 400 });\n` +
           `  }\n` +
           `}\n` +
           `\`\`\`\n\n` +
           `*Adhering to TestMu AI & OmniBrain-Pro Production Engineering Standards.*`;
  }

  // Mode: Superpowers Software Development
  if (lower.includes('superpowers') || lower.includes('brainstorm') || lower.includes('tdd') || lower.includes('test-driven')) {
    return `🚀 **OmniBrain-Pro Superpowers Agent**\n\n` +
           `I am equipped with the **Superpowers methodology** for subagent-driven development.\n\n` +
           `Here is my workflow:\n` +
           `1. **Brainstorming:** I will clarify your requirements before writing code.\n` +
           `2. **Planning:** I will break down the design into bite-sized implementation tasks.\n` +
           `3. **Execution (TDD):** I follow a strict Red-Green-Refactor test-driven development loop.\n` +
           `4. **Code Review:** I review all code for DRY and YAGNI principles before finalizing.\n\n` +
           `Let's start brainstorming! What are we building today?`;
  }

  // Mode: Content Engineering (LinkedIn, YouTube, Viral)
  if (lower.includes('linkedin') || lower.includes('hook') || lower.includes('viral') || lower.includes('content') || lower.includes('youtube')) {
    return `🔥 **OmniBrain-Pro Creator Studio — Content Engineering**\n\n` +
           `### 1. LinkedIn 21 Hook Formulas & Feed Truncation\n` +
           `• **Feed Truncation Rule**: Line 1 (Hook) ≤ 210 characters (desktop) and ≤ 3 lines (mobile).\n` +
           `• **Line 2 = Payoff**: Immediately deliver on the Hook before the "see more" cutoff.\n` +
           `• **The Top Hook Frameworks**:\n` +
           `  1. *The Contrarian Frame*: "95% of creators do X. Here is why the top 1% do the opposite."\n` +
           `  2. *The Hard Metric*: "How we scaled from 0 to 100k users in 45 days (exact breakdown)." \n` +
           `  3. *The Paradox*: "The best way to write fast is to stop typing."\n\n` +
           `### 2. YouTube 0-15s Critical Retention Window\n` +
           `• Sentence 1 must confirm the title/thumbnail click within the first 6 words.\n` +
           `• Open a high-stakes curiosity loop without prematurely revealing the solution.\n\n` +
           `*Operated under OmniBrain-Pro Creator Mode — Developed by Sakshi.*`;
  }

  // Mode: AI Job Search & Career Strategy (from ai-job-search)
  if (lower.includes('job') || lower.includes('career') || lower.includes('resume') || lower.includes('cv') || lower.includes('cover letter') || lower.includes('interview')) {
    return `💼 **OmniBrain-Pro Career Studio — AI Job Search Assistant**\n\n` +
           `### 1. Application Strategy\n` +
           `• **Targeted Profiles**: I can evaluate your profile against job descriptions to provide a fit score.\n` +
           `• **Resume & Cover Letter Drafting**: I structure professional, LaTeX-ready, tailored CVs (max 2 pages) and 1-page cover letters prioritizing exact keyword relevance and ATS parseability.\n` +
           `• **Drafter-Reviewer Loop**: I don't just write; I critique my own drafts against company research before finalizing.\n\n` +
           `### 2. Interview Preparation\n` +
           `• **STAR Method**: We will map your experience to Behavioral Questions (Situation, Task, Action, Result).\n` +
           `• **Company Research**: I verify facts about the company and interviewers.\n` +
           `• **Mock Interviews**: I can simulate technical or HR interview rounds.\n\n` +
           `*Operated under OmniBrain-Pro Career Strategist Mode — Inspired by MadsLorentzen's AI Job Search.*`;
  }

  // Identity
  if (lower.includes('who are you') || lower.includes('sakshi') || lower.includes('creator') || lower.includes('developer')) {
    return `✨ **I am OmniBrain Pro Master Model (Aura AI)**, an elite technical engineering, creative direction, and strategy model proudly developed by **Sakshi**.\n\n` +
           `• **Developer**: Sakshi\n` +
           `• **Customer Care / Support**: [+91 6290873841](tel:6290873841)\n` +
           `• **Email**: [qwicklabs2@gmail.com](mailto:qwicklabs2@gmail.com)\n` +
           `• **Active Modes**: The Engineer, The Creative Director, The Link Expert, The Designer & Artist, The Strategist & Scientist, and The Chief Marketing Officer.`;
  }

  return `🧠 **OmniBrain-Pro Master Model**:\n\nRegarding "${input}":\n\n` +
         `Processed under OmniBrain Pro studio standards. How would you like to develop this further? We can analyze technical architecture, draft production code, engineer viral content hooks, or execute comprehensive SEO strategies.`;
}

// Removed res.sendFile fallback as Vercel static routing handles index.html

if (!process.env.VERCEL) {
  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Aura AI Server running at http://localhost:${PORT}/`);
    console.log(`Ready to connect to local Ollama API.`);
  });

  // Prevent Node.js from timing out on massive, long-running generations
  server.keepAliveTimeout = 0; 
  server.headersTimeout = 0;
  server.timeout = 0;
}

// Export for Vercel Serverless
module.exports = app;
