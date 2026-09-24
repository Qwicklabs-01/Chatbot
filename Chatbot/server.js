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

// Configure Ollama to connect to a remote URL if hosted on Vercel
const OLLAMA_URL = process.env.OLLAMA_HOST || 'http://127.0.0.1:11434';
const ollama = new Ollama({ host: OLLAMA_URL });
const app = express();
const PORT = 3000;

// Load System Prompts (The Brain)
let systemInstructionText = '';
try {
  const masterPrompt = fs.readFileSync(path.join(__dirname, 'brain', 'master-prompt-professional.md'), 'utf-8');
  const skillsList = fs.readFileSync(path.join(__dirname, 'brain', 'brain.md'), 'utf-8');
  systemInstructionText = `${masterPrompt}\n\n---\n\n${skillsList}\n\n---\n\nIMPORTANT RULE: Your name is Aura AI and your developer is SAKSHI. The customer care number is 6290873841. However, DO NOT append this information or signature to your answers unless the user explicitly asks for your name, your developer, or customer care. For general questions like 'What is Javascript?', simply answer the question directly.`;
  console.log('✅ OmniBrain and Skills loaded successfully.');
} catch (err) {
  console.warn('⚠️ Could not load brain files from brain/ directory. Operating without custom system instructions.', err.message);
}

// Set up Multer for handling memory storage
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Security & Professional Hardening
app.use(helmet({
  contentSecurityPolicy: false, // Prevent breaking local inline scripts
  crossOriginEmbedderPolicy: false
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
app.post('/api/chat', upload.single('file'), async (req, res) => {
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

    // Call Ollama API with unlimited tokens and high context
    const response = await ollama.chat({
      model: 'OmniBrain-Pro-Master',
      messages: messages,
      options: {
        num_predict: -1, // Unlimited tokens for response
        num_ctx: 16384   // Large context window
      }
    });

    res.json({
      reply: response.message.content
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    let errorMessage = "An unknown error occurred.";
    if (error && error.message) {
      errorMessage = "API Error: " + error.message;
    }
    return res.json({ 
      reply: errorMessage 
    });
  }
});

// Fallback to index.html for SPA behavior
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Aura AI Server running at http://localhost:${PORT}/`);
  console.log(`Ready to connect to local Ollama API.`);
});

// Prevent Node.js from timing out on massive, long-running generations
server.keepAliveTimeout = 0; 
server.headersTimeout = 0;
server.timeout = 0;
