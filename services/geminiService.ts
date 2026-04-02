import { GoogleGenAI, Type } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

const CACHE_KEY = "nla_news_cache";
const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 1 week in milliseconds

export const geminiService = {
  fetchNlaNews: async (forceRefresh = false) => {
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not set");
    }

    // Check cache first
    if (!forceRefresh) {
      const cachedData = localStorage.getItem(CACHE_KEY);
      if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        const now = Date.now();
        if (now - timestamp < CACHE_DURATION) {
          console.log("Returning cached NLA news");
          return data;
        }
      }
    }

    const ai = new GoogleGenAI({ apiKey });
    
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: "Extract the latest news from https://www.lands.rw/. Return them as a JSON array of objects with 'title', 'date', 'summary', and 'link' properties. Focus on the 'Latest News' section.",
        config: {
          tools: [{ urlContext: {} }],
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                date: { type: Type.STRING },
                summary: { type: Type.STRING },
                link: { type: Type.STRING }
              },
              required: ["title", "summary"]
            }
          }
        },
      });

      const text = response.text;
      if (!text) return [];
      
      const newsData = JSON.parse(text);
      
      // Save to cache
      localStorage.setItem(CACHE_KEY, JSON.stringify({
        data: newsData,
        timestamp: Date.now()
      }));

      return newsData;
    } catch (error) {
      console.error("Error fetching news from Gemini:", error);
      // Fallback to cache if available even if expired
      const cachedData = localStorage.getItem(CACHE_KEY);
      if (cachedData) {
        return JSON.parse(cachedData).data;
      }
      return [];
    }
  },

  getProjectAdvice: async (description: string) => {
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not set");
    }

    const ai = new GoogleGenAI({ apiKey });

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Provide project advice for: ${description}`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              neededEngineers: { type: Type.ARRAY, items: { type: Type.STRING } },
              suggestedEquipment: { type: Type.ARRAY, items: { type: Type.STRING } },
              landAdvice: { type: Type.STRING },
              estimatedTimeline: { type: Type.STRING }
            },
            required: ["neededEngineers", "suggestedEquipment", "landAdvice", "estimatedTimeline"]
          }
        }
      });

      const text = response.text;
      if (!text) throw new Error("No response from Gemini");
      
      return JSON.parse(text);
    } catch (error) {
      console.error("Error getting project advice:", error);
      throw error;
    }
  },

  fetchIremboLandServices: async () => {
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not set");
    }

    const ai = new GoogleGenAI({ apiKey });

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: "Extract all land-related services from https://irembo.gov.rw/. Return them as a JSON array of objects with 'name', 'description', and 'link' properties. Focus on services like 'Land Transfer', 'Land Subdivision', 'Land Merging', 'Land Registration', etc.",
        config: {
          tools: [{ urlContext: {} }],
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                description: { type: Type.STRING },
                link: { type: Type.STRING }
              },
              required: ["name", "description", "link"]
            }
          }
        }
      });

      const text = response.text;
      if (!text) return [];
      
      return JSON.parse(text);
    } catch (error) {
      console.error("Error fetching Irembo services:", error);
      return [
        {
          name: "Land Transfer",
          description: "Transfer of land ownership from one person to another.",
          link: "https://irembo.gov.rw/home/citizen/all_services"
        },
        {
          name: "Land Subdivision",
          description: "Dividing a single plot of land into multiple smaller plots.",
          link: "https://irembo.gov.rw/home/citizen/all_services"
        },
        {
          name: "Land Merging",
          description: "Combining multiple adjacent plots of land into a single plot.",
          link: "https://irembo.gov.rw/home/citizen/all_services"
        },
        {
          name: "Land Registration",
          description: "Official registration of land rights and titles.",
          link: "https://irembo.gov.rw/home/citizen/all_services"
        }
      ];
    }
  }
};
