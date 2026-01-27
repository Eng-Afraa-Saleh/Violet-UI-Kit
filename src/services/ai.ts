// import { GoogleGenAI } from "@google/genai";

// let genAI: GoogleGenAI | null = null;

// const getAI = () => {
//   if (!genAI) {
//     const apiKey = process.env.API_KEY || '';
//     if (apiKey) {
//       genAI = new GoogleGenAI({ apiKey });
//     }
//   }
//   return genAI;
// };

// export const improveText = async (text: string, instruction: string = "Improve the grammar and clarity of this text."): Promise<string> => {
//   const ai = getAI();
//   if (!ai) {
//     console.warn("API Key not found. Mocking response.");
//     await new Promise(r => setTimeout(r, 1000));
//     return `[AI Mock] Improved: ${text}`;
//   }

//   try {
//     const response = await ai.models.generateContent({
//       model: 'gemini-2.5-flash',
//       contents: `Instruction: ${instruction}\n\nInput Text: "${text}"`,
//     });
//     return response.text || text;
//   } catch (error) {
//     console.error("AI Error:", error);
//     return text; // Fallback to original
//   }
// };
