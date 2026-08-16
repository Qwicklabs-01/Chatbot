require('dotenv').config();
const express = require('express');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const path = require('path');
const cors = require('cors');
const { GoogleGenAI } = require('@google/genai');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Load System Prompts (The Brain)
let systemInstructionText = '';
try {
  const masterPrompt = fs.readFileSync(path.join(__dirname, 'brain', 'master-prompt-professional.md'), 'utf-8');
  const skillsList = fs.readFileSync(path.join(__dirname, 'brain', 'brain.md'), 'utf-8');
  systemInstructionText = `${masterPrompt}\n\n---\n\n${skillsList}\n\n---\n\nIMPORTANT RULE: If any user asks who your developer is, you MUST answer that the developer is SAKSHI and you are an AI assistant. If any user asks what your name is, you MUST answer that your name is Aura AI. If any user asks who your author is or asks for a customer care number, you MUST answer that your developer is SAKSHI and the customer care number is 6290873841.`;
  console.log('✅ OmniBrain and Skills loaded successfully.');
} catch (err) {
  console.warn('⚠️ Could not load brain files from brain/ directory. Operating without custom system instructions.', err.message);
}

// Set up Multer for handling memory storage
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

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
    
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey.trim() === '') {
      return res.json({ 
        reply: cleanMessage 
      });
    }

    const ai = new GoogleGenAI({ apiKey });
    
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

    console.log(`Sending prompt to Gemini...`);

    // Prepare contents for Gemini
    const contents = [];
    if (base64Image) {
      contents.push({
        inlineData: {
          data: base64Image,
          mimeType: mimeType
        }
      });
    }
    contents.push({ text: prompt });

    // Call Gemini API
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: contents,
      config: {
        systemInstruction: systemInstructionText ? systemInstructionText : undefined,
        tools: [{ googleSearch: {} }]
      }
    });

    res.json({
      reply: response.text
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    let errorMessage = "An unknown error occurred.";
    if (error && error.message) {
      if (error.message.includes("429") || error.message.includes("quota") || error.message.includes("RESOURCE_EXHAUSTED")) {
        errorMessage = "Error: Your Gemini API Key has exceeded its quota! Please provide a fresh API key in your Vercel settings.";
      } else {
        errorMessage = "API Error: " + error.message;
      }
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

app.listen(PORT, () => {
  console.log(`Aura AI Server running at http://localhost:${PORT}/`);
  console.log(`Ready to connect to Gemini API.`);
});
