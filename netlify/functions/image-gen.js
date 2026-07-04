exports.handler = async function (event, context) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const body = JSON.parse(event.body);
    const prompt = body.prompt || "";

    const HUGGINGFACE_TOKEN = process.env.HUGGINGFACE_TOKEN;

    if (!HUGGINGFACE_TOKEN) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Server configuration error: HUGGINGFACE_TOKEN is missing." }),
      };
    }

    // Call Hugging Face API for Stable Diffusion image generation
    const response = await fetch("https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0", {
      headers: {
        Authorization: `Bearer ${HUGGINGFACE_TOKEN}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ inputs: prompt }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Hugging Face API Error:", err);
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: "Error generating image from AI provider." }),
      };
    }

    // The response is raw image bytes (blob)
    const arrayBuffer = await response.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString('base64');
    const mimeType = response.headers.get('content-type') || 'image/jpeg';
    const dataUri = `data:${mimeType};base64,${base64}`;

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageBase64: dataUri }),
    };

  } catch (error) {
    console.error("Image Gen Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error processing request." }),
    };
  }
};
