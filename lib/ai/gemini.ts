import { GoogleGenAI } from "@google/genai";
import { generateMockArabicContent } from "@/lib/ai/mock";

function isMockEnabled() {
  return process.env.AI_MOCK_MODE === "true" || process.env.NODE_ENV !== "production";
}

export async function generateWithGemini(prompt: string, schema?: object) {
  const key = process.env.GEMINI_API_KEY;

  if (!key) {
    if (isMockEnabled()) {
      return generateMockArabicContent();
    }
    throw new Error("GEMINI_API_KEY is missing");
  }

  const ai = new GoogleGenAI({ apiKey: key });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema as never
      }
    });

    const text = response.text || "{}";
    return JSON.parse(text);
  } catch (error) {
    if (isMockEnabled()) {
      return generateMockArabicContent();
    }
    console.error("Gemini generation failed", error);
    throw new Error("AI generation failed");
  }
}
