require('dotenv').config();
const express = require('express');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const path = require('path');
const cors = require('cors');
const { GoogleGenAI } = require('@google/genai');

const app = express();
const PORT = 3000;

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
    const userMessage = req.body.message || '';
    const file = req.file;
    
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(503).json({ 
        error: '⚠️ Gemini API Key is missing. Please create a .env file based on .env.example and add your GEMINI_API_KEY to give the chatbot internet access and a brain.' 
      });
    }

    const ai = new GoogleGenAI({ apiKey });
    
    let prompt = userMessage;
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
        prompt = `Based on the following document context:\n\n---\n${extractedText}\n---\n\nUser query: ${userMessage}`;
      } else if (mime === 'text/plain' || mime === 'text/csv' || mime === 'application/json') {
        const textData = file.buffer.toString('utf-8');
        prompt = `Based on the following file context:\n\n---\n${textData}\n---\n\nUser query: ${userMessage}`;
      } else if (mime.startsWith('image/')) {
        console.log('Processing Image...');
        base64Image = file.buffer.toString('base64');
        mimeType = mime;
        prompt = userMessage || 'Describe this image in detail.';
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
      model: 'gemini-3-flash-preview',
      contents: contents,
      // config: { tools: [{ googleSearch: {} }] } // Requires billing
    });

    res.json({
      reply: response.text
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    res.status(500).json({ error: `Backend Error: ${error.message || 'Internal server error'}` });
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
