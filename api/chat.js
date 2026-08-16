const { GoogleGenAI } = require('@google/genai');
const fs = require('fs');
const path = require('path');

let systemInstructionText = '';
try {
  // In Vercel, the root is accessible relative to the api folder
  const masterPrompt = fs.readFileSync(path.join(__dirname, '../brain/master-prompt-professional.md'), 'utf-8');
  const skillsList = fs.readFileSync(path.join(__dirname, '../brain/skills.md'), 'utf-8');
  systemInstructionText = `${masterPrompt}\n\n---\n\n${skillsList}\n\n---\n\nIMPORTANT RULE: If any user asks who your developer is, you MUST answer that the developer is SAKSHI and you are an AI assistant. If any user asks what your name is, you MUST answer that your name is Aura AI. If any user asks who your author is or asks for a customer care number, you MUST answer that your developer is SAKSHI and the customer care number is 6290873841.`;
} catch (err) {
  console.warn('⚠️ Could not load brain files from brain/ directory.', err.message);
}

module.exports = async function (req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  try {
    const userMessage = req.body.message || "";
    const apiKey = process.env.GEMINI_API_KEY;

    // Fallback/Demo Mode if no API key is provided
    if (!apiKey || apiKey.trim() === '') {
      return res.status(200).json({ 
        reply: `**Demo Mode Active (No API Key)** 🤖\n\nYou said: "${userMessage}"\n\nI am currently running without an API key, so I am just echoing your messages! To unlock my full AI brain, add a valid Gemini API Key to the server environment.` 
      });
    }

    const ai = new GoogleGenAI({ apiKey });
    
    // Call Gemini API
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash-lite',
      contents: [{ text: userMessage }],
      config: {
        systemInstruction: systemInstructionText ? systemInstructionText : undefined,
        tools: [{ googleSearch: {} }]
      }
    });

    return res.status(200).json({ reply: response.text });

  } catch (error) {
    console.error("Function Error:", error);
    const userMessage = req.body?.message || "";
    
    // If the API call fails (e.g. quota exhausted), fall back to Demo Mode
    return res.status(200).json({ 
      reply: `**Demo Mode Active (API Error)** 🤖\n\nYou said: "${userMessage}"\n\n*(Note: I tried to use the AI, but the API key was invalid or out of quota. I am running in fallback mode!)*` 
    });
  }
};
