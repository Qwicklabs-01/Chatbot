const { GoogleGenAI } = require('@google/genai');
const fs = require('fs');
const path = require('path');

let systemInstructionText = '';
try {
  const masterPrompt = fs.readFileSync(path.join(__dirname, '../../brain/master-prompt-professional.md'), 'utf-8');
  const skillsList = fs.readFileSync(path.join(__dirname, '../../brain/skills.md'), 'utf-8');
  systemInstructionText = `${masterPrompt}\n\n---\n\n${skillsList}\n\n---\n\nIMPORTANT RULE: If any user asks who your developer is, you MUST answer that the developer is SAKSHI and you are an AI assistant. If any user asks what your name is, you MUST answer that your name is Aura AI. If any user asks who your author is or asks for a customer care number, you MUST answer that your developer is SAKSHI and the customer care number is 6290873841.`;
} catch (err) {
  console.warn('⚠️ Could not load brain files from brain/ directory.', err.message);
}

exports.handler = async function (event, context) {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const body = JSON.parse(event.body);
    const userMessage = body.message || "";
    
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ reply: "⚠️ **Setup Required**: I'm sorry, but my owner hasn't set up my brain yet! Please add a `GEMINI_API_KEY` to your Netlify Environment Variables to bring me online." }),
      };
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

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ reply: response.text }),
    };

  } catch (error) {
    console.error("Function Error:", error);
    let errorMessage = error.message || 'Internal server error';
    
    // Make errors look proper in the chat UI
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ reply: `⚠️ **Connection Error**: I couldn't connect to my AI brain. \n\n*Error details: ${errorMessage}*\n\nPlease make sure your \`GEMINI_API_KEY\` is valid in your Netlify settings.` }),
    };
  }
};
