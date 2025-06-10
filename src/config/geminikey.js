const apiKey = `AIzaSyAjqaOMpR4xTthEW1vc9pzIAz0NM2GkoyM`;

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

// const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("GEMINI_API_KEY environment variable is required");
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash-8b",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

// Add safety settings to prevent harmful content
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

// Add delay function for rate limiting
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const run = async (query) => {
  try {
    const chatSession = model.startChat({
      generationConfig,
      safetySettings,
      history: [],
    });

    const result = await chatSession.sendMessage(query);
    console.log(result.response.text());
    return result.response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);

    // Handle quota exceeded error specifically
    if (error.message.includes("429") || error.message.includes("quota")) {
      console.log("Rate limit exceeded. Waiting before retry...");
      await delay(60000); // Wait 1 minute

      // Optional: Retry once after delay
      try {
        const chatSession = model.startChat({
          generationConfig,
          safetySettings,
          history: [],
        });

        const result = await chatSession.sendMessage(query);
        return result.response.text();
      } catch (retryError) {
        throw new Error(
          `Rate limit exceeded. Please try again later. Original error: ${retryError.message}`
        );
      }
    }

    // Re-throw other errors
    throw error;
  }
};

export default run;
