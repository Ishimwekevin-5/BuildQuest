
import { GoogleGenAI, Type } from "@google/genai";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async getProjectAdvice(projectDescription: string) {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `I am starting a construction project: "${projectDescription}". Provide detailed advice in JSON format.`,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              neededEngineers: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: 'Roles of engineers needed for this project.'
              },
              suggestedEquipment: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: 'Key construction equipment needed.'
              },
              landAdvice: {
                type: Type.STRING,
                description: 'Specific advice about the type of land plot required.'
              },
              estimatedTimeline: {
                type: Type.STRING,
                description: 'Rough estimate of the project phases.'
              }
            },
            required: ['neededEngineers', 'suggestedEquipment', 'landAdvice', 'estimatedTimeline']
          }
        }
      });
      return JSON.parse(response.text);
    } catch (error) {
      console.error("Gemini Error:", error);
      throw error;
    }
  }

  async searchEngineers(query: string) {
    // Intelligent search logic could go here
    const response = await this.ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Find engineers matching this request: "${query}". Return a short summary of what to look for.`
    });
    return response.text;
  }
}

export const geminiService = new GeminiService();
