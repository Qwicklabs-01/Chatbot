require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function test(modelName, useSearch) {
  try {
    console.log(`Testing ${modelName} (Search: ${useSearch})`);
    const config = useSearch ? { tools: [{ googleSearch: {} }] } : {};
    const res = await ai.models.generateContent({
      model: modelName,
      contents: [{ text: "Hello" }],
      config
    });
    console.log(`SUCCESS: ${modelName} with search ${useSearch}`);
  } catch (err) {
    console.log(`FAILED: ${modelName} with search ${useSearch}: ${err.message}`);
  }
}

async function runTests() {
  await test('gemini-3-flash-preview', true);
}

runTests();
