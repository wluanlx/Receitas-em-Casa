import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function generateRecipesFromIngredients(ingredients: string[]) {
  const prompt = `Crie 5 receitas simples e brasileiras usando principalmente estes ingredientes: ${ingredients.join(", ")}. 
  As receitas devem ser fáceis, rápidas (5-40 min) e usar no máximo 6 ingredientes principais.
  Priorize receitas que usem a maior quantidade possível dos ingredientes informados.
  Você pode sugerir até 2 ingredientes extras simples que o usuário talvez não tenha mencionado.
  IMPORTANTE: O modo de preparo deve ser BEM DETALHADO, incluindo tempos específicos de forno, geladeira, descanso ou cozimento quando aplicável.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              name: { type: Type.STRING },
              ingredients: { type: Type.ARRAY, items: { type: Type.STRING } },
              instructions: { type: Type.ARRAY, items: { type: Type.STRING } },
              prepTime: { type: Type.NUMBER },
              difficulty: { type: Type.STRING, enum: ["Fácil", "Médio", "Difícil"] },
              category: { type: Type.STRING },
              servings: { type: Type.STRING },
              image: { type: Type.STRING, description: "URL de imagem fictícia ou placeholder" }
            },
            required: ["id", "name", "ingredients", "instructions", "prepTime", "difficulty", "category", "servings"]
          }
        }
      }
    });

    const recipes = JSON.parse(response.text || "[]");
    return recipes.map((r: any) => ({
      ...r,
      image: `https://picsum.photos/seed/${encodeURIComponent(r.name)}/400/300`
    }));
  } catch (error) {
    console.error("Erro ao gerar receitas:", error);
    return [];
  }
}
