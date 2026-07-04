exports.handler = async function (event, context) {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const body = JSON.parse(event.body);
    const userMessage = body.message || "";

    const GROQ_API_KEY = process.env.GROQ_API_KEY;

    if (!GROQ_API_KEY) {
      return {
        statusCode: 500,
        body: JSON.stringify({ reply: "⚠️ Server configuration error: GROQ_API_KEY is missing." }),
      };
    }

    // Call Groq Llama-3 API
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama3-70b-8192", // Using Llama 3 70B for maximum intelligence
        messages: [
          { role: "system", content: "You are Aura, an intelligent AI assistant." },
          { role: "user", content: userMessage }
        ],
        temperature: 0.7,
        max_tokens: 1500
      })
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Groq API Error:", err);
      return {
        statusCode: response.status,
        body: JSON.stringify({ reply: "⚠️ Error communicating with AI provider." }),
      };
    }

    const data = await response.json();
    const reply = data.choices[0]?.message?.content || "No response generated.";

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // Allow cross-origin if needed
      },
      body: JSON.stringify({ reply }),
    };

  } catch (error) {
    console.error("Function Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ reply: "⚠️ Internal Server Error processing request." }),
    };
  }
};
