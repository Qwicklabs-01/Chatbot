const { GoogleGenAI } = require('@google/genai');
const fs = require('fs');
const path = require('path');

let systemInstructionText = '';
try {
  // In Vercel, the root is accessible relative to the api folder
  const masterPrompt = fs.readFileSync(path.join(__dirname, '../brain/master-prompt-professional.md'), 'utf-8');
  const skillsList = fs.readFileSync(path.join(__dirname, '../brain/brain.md'), 'utf-8');
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
    const rawMessage = req.body.message || "";
    let cleanMessage = rawMessage;
    if (rawMessage.includes("User Question: ")) {
      cleanMessage = rawMessage.split("User Question: ")[1].trim();
    }
    
    const apiKey = process.env.GEMINI_API_KEY;

    // Fallback/Demo Mode if no API key is provided
    if (!apiKey || apiKey.trim() === '') {
      return res.status(200).json({ 
        reply: cleanMessage 
      });
    }

    const ai = new GoogleGenAI({ apiKey });
    
    // Call Gemini API
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash-lite',
      contents: [{ text: rawMessage }],
      config: {
        systemInstruction: systemInstructionText ? systemInstructionText : undefined
      }
    });

    return res.status(200).json({ reply: response.text });

  } catch (error) {
    console.error("Function Error:", error);
    const rawMessage = req.body?.message || "";
    let cleanMessage = rawMessage;
    if (rawMessage.includes("User Question: ")) {
      cleanMessage = rawMessage.split("User Question: ")[1].trim();
    }
    
    // Extract the specific error message if it exists
    let errorMessage = "An unknown error occurred.";
    if (error && error.message) {
      if (error.message.includes("429") || error.message.includes("quota") || error.message.includes("RESOURCE_EXHAUSTED")) {
        errorMessage = "Error: Your Gemini API Key has exceeded its quota! Please provide a fresh API key in your Vercel settings.";
      } else {
        errorMessage = "API Error: " + error.message;
      }
    }
    
    // Fallback response handling if AI fails (Demo Mode / Echo)
    return res.status(200).json({
      reply: errorMessage
    });
  }
};
