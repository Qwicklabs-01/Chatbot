require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function testGeneration() {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash-lite',
      contents: [{ text: "Hello!" }],
      config: {
        tools: [{ googleSearch: {} }]
      }
    });
    console.log("Response:", response.text);
  } catch (err) {
    console.error("Error generating content:", err.message);
  }
}

testGeneration();
