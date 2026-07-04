const express = require('express');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Set up Multer for handling memory storage (so we can pass buffers directly to Ollama/Parsers)
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

/**
 * Main API Endpoint for Chat & File Analysis
 * Route: POST /api/chat
 * Form Data: 'message' (string), 'file' (optional file upload)
 */
app.post('/api/chat', upload.single('file'), async (req, res) => {
  try {
    const userMessage = req.body.message || '';
    const file = req.file;
    
    let prompt = userMessage;
    let modelToUse = 'llama3'; // Default text model
    let base64Image = null;

    // Handle File Attachment
    if (file) {
      const mime = file.mimetype;
      
      // Handle PDF Analysis
      if (mime === 'application/pdf') {
        console.log('Parsing PDF...');
        const pdfData = await pdfParse(file.buffer);
        const extractedText = pdfData.text;
        prompt = `Based on the following document context:\n\n---\n${extractedText}\n---\n\nUser query: ${userMessage}`;
      } 
      // Handle Text File Analysis
      else if (mime === 'text/plain' || mime === 'text/csv' || mime === 'application/json') {
        const textData = file.buffer.toString('utf-8');
        prompt = `Based on the following file context:\n\n---\n${textData}\n---\n\nUser query: ${userMessage}`;
      }
      // Handle Image Analysis (Vision)
      else if (mime.startsWith('image/')) {
        console.log('Processing Image...');
        modelToUse = 'llava'; // Switch to vision model
        base64Image = file.buffer.toString('base64');
        prompt = userMessage || 'Describe this image in detail.';
      } else {
        return res.status(400).json({ error: 'Unsupported file type.' });
      }
    }

    console.log(`Sending prompt to Ollama (Model: ${modelToUse})...`);

    // Prepare payload for Ollama API
    const ollamaPayload = {
      model: modelToUse,
      prompt: prompt,
      stream: false
    };

    if (base64Image) {
      ollamaPayload.images = [base64Image];
    }

    // Call Local Ollama Server
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ollamaPayload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Ollama API Error:', errorText);
      return res.status(500).json({ error: 'Failed to communicate with Ollama. Make sure Ollama is running.' });
    }

    const data = await response.json();
    
    res.json({
      reply: data.response
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    res.status(500).json({ error: 'Internal server error while processing request.' });
  }
});

// Fallback to index.html for SPA behavior
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Aura AI Server running at http://localhost:${PORT}/`);
  console.log(`Ready to connect to local Ollama API on port 11434.`);
});
