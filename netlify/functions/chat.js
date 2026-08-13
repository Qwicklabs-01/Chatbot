const { GoogleGenAI } = require('@google/genai');

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
        statusCode: 500,
        body: JSON.stringify({ error: "⚠️ Gemini API Key is missing on the Netlify environment variables." }),
      };
    }

    const ai = new GoogleGenAI({ apiKey });
    
    // Call Gemini API
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash-lite',
      contents: [{ text: userMessage }],
      // config: { tools: [{ googleSearch: {} }] }
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
    return {
      statusCode: 500,
      body: JSON.stringify({ error: `Backend Error: ${error.message || 'Internal server error'}` }),
    };
  }
};
