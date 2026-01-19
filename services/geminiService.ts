
import { GoogleGenAI, Type } from "@google/genai";

export class GeminiService {
  /**
   * Generates project advice based on a description.
   * Instantiates GoogleGenAI right before the call as per guidelines.
   */
  async getProjectAdvice(projectDescription: string) {
    // Always use new GoogleGenAI({ apiKey: process.env.API_KEY }) right before making an API call.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
      const response = await ai.models.generateContent({
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
      
      // The text property returns the generated string directly (do not call as a method).
      const text = response.text;
      if (!text) {
        throw new Error("AI returned an empty response.");
      }
      return JSON.parse(text);
    } catch (error) {
      console.error("Gemini Error:", error);
      throw error;
    }
  }

  /**
   * Searches for engineers matching a query.
   * Instantiates GoogleGenAI right before the call as per guidelines.
   */
  async searchEngineers(query: string) {
    // Create a new GoogleGenAI instance right before making an API call to ensure current key usage.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Find engineers matching this request: "${query}". Return a short summary of what to look for.`
    });
    // Use the .text property to access the result.
    return response.text;
  }
}

export const geminiService = new GeminiService();
