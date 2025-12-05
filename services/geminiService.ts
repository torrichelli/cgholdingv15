import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const SYSTEM_INSTRUCTION = `
You are the AI Assistant for 'CreativeGroup', a futuristic technology holding company.
You are professional, concise, and enthusiastic about technology.

The company has 5 divisions:
1. CreativeStudio: Marketing, branding, websites.
2. CreativeTech: Automation, ERP, CRM, custom dev.
3. CreativeMarket: Marketplace for ready-made sites/assets.
4. LogiFlex: AI logistics, route optimization.
5. Nexium: Smart POS terminals with AI analytics.

Mission: "Creating the future of business today."
Style: Innovative, Premium, Trustworthy.

Answer user questions about the company, its services, or tech trends.
If asked about contact, direct them to the contact section or email hello@creativegroup.com.
Keep answers under 80 words.
`;

export const streamChatResponse = async (
  history: { role: 'user' | 'model'; text: string }[],
  newMessage: string
) => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const result = await chat.sendMessageStream({ message: newMessage });
    return result;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};