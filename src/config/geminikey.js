// const gemini_key = "AIzaSyBABqDfvDaa4EEZM-FiipAZVd4gxaLD-IQ";

// /*
//  * Install the Generative AI SDK
//  *
//  * $ npm install @google/generative-ai
//  */

// import {
//   GoogleGenerativeAI,
//   HarmCategory,
//   HarmBlockThreshold,
// } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI(gemini_key);

// const model = genAI.getGenerativeModel({
//   model: "gemini-1.5-flash",
// });

// const generationConfig = {
//   temperature: 1,
//   topP: 0.95,
//   topK: 64,
//   maxOutputTokens: 8192,
//   responseMimeType: "text/plain",
// };

// async function run(prompt) {
//   const chatSession = model.startChat({
//     generationConfig,
//     // safetySettings: Adjust safety settings
//     // See https://ai.google.dev/gemini-api/docs/safety-settings
//     history: [],
//   });

//   const result = (await chatSession.sendMessage(prompt)).response;
//   // const response = result.response;

//   console.log(result.text());
//   // return this response variable data to where its called,
//   //  this response data to store in context jsx file in onSent function
//   return result.text();
// }

// // exporting run function default to proccesing users prompt
// export default run;

// new api keys and scripts

/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

const apikey = `AIzaSyDEItWxs_fKG7Gfc3Qim7Y87RDeYH_g2fM`;

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

// const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apikey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro-002",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

let run = async (query) => {
  const chatSession = model.startChat({
    generationConfig,
    // safetySettings: Adjust safety settings
    // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [],
  });

  const result = await chatSession.sendMessage(query);
  console.log(result.response.text());
  return result.response.text();
};
// run();

export default run;
