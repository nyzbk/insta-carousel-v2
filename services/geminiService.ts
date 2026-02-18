
import { GoogleGenAI, Type } from "@google/genai";
import type { CarouselContent } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export async function generateCarouselTopic(activity: string): Promise<string> {
  const prompt = `
    Act as a world-class viral content strategist. 
    Your goal is to create ONE explosive, high-converting "Hook Title" for an Instagram carousel based on this niche/activity: "${activity}".

    The title must:
    1. STOP the scroll immediately.
    2. Create a "Curiosity Gap" (The user feels they MUST know the answer).
    3. Challenge common beliefs or promise a specific result.

    Use these proven viral structures:
    - "Stop doing [Common Habit]. Do [This] instead."
    - "[Authority Figure]'s secret to [Desirable Outcome]."
    - "Why your [Activity] isn't working (and how to fix it)."
    - "I tried [X] for 30 days and THIS happened."
    - "The [Adjective] Truth about [Topic] nobody tells you."

    Strict Rules:
    - Language: Russian.
    - Max length: 75 characters.
    - Use CAPS for 1-2 power words (e.g., МИФ, ОШИБКА, СЕКРЕТ, БЕСПЛАТНО).
    - Be concise and punchy.
    - No quotes around the output.
    
    Example output:
    - "Врачи ВРУТ: Почему кардио не сжигает жир"
    - "SMM умер? Стратегия 2025, которая приносит миллионы"
    - "Секрет Цукерберга: Как работать 4 часа и все успевать"
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: { temperature: 0.95 },
    });

    return response.text.trim().replace(/^"|"$/g, '');
  } catch (error) {
    console.error("Error generating topic:", error);
    throw new Error("Failed to generate topic.");
  }
}

export async function generateCarouselContent(topic: string, numSlides: number, ctaKeyword: string): Promise<CarouselContent> {
  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      first_page_title: {
        type: Type.STRING,
        description: "The Ultimate Clickbait Hook. Must create a massive 'Curiosity Gap'. Use strong emotional triggers (Fear, Mystery, 'Lies you were told'). Use CAPS for emphasis. Length: 12-20 words. E.g., '81% of millennials grew up with THIS hidden trauma - and now cannot build relationships (Sociologists cry):'",
      },
      content_pages: {
        type: Type.ARRAY,
        description: `Generate exactly ${numSlides} slides. Very concise, paragraph-based style.`,
        items: {
          type: Type.OBJECT,
          properties: {
            title: {
              type: Type.STRING,
              description: "Numbered Header. E.g., '1. Trauma is emotional invisibility'. Max 7 words.",
            },
            intro_paragraph: {
              type: Type.STRING,
              description: "First short paragraph. E.g., 'Mom is cooking but in her thoughts. Dad is home but watching TV.' Max 15 words.",
            },
            points: {
              type: Type.ARRAY,
              description: "2 short paragraphs expanding the thought. NO BULLET POINTS. E.g., ['You tell them about school - they nod but don't hear.', 'They fed you, clothed you, but never asked: How do you FEEL?']",
              items: { type: Type.STRING },
              maxItems: 2, 
            },
            blockquote_text: {
                type: Type.STRING,
                description: "The result/consequence box. E.g., 'In 30 years, this turns into an inability to discuss feelings.' Max 15 words."
            }
          },
          required: ["title", "intro_paragraph", "points", "blockquote_text"],
        },
      },
      call_to_action_page: {
          type: Type.OBJECT,
          properties: {
              title: {
                  type: Type.STRING,
                  description: `Must be exactly: '!! Напиши "${ctaKeyword}" в комменты'`
              },
              description: {
                  type: Type.STRING,
                  description: "Value proposition. Max 10 words."
              }
          },
          required: ["title", "description"]
      }
    },
    required: ["first_page_title", "content_pages", "call_to_action_page"],
  };

  const prompt = `
    Create content for an Instagram carousel about "${topic}".
    CTA Keyword: "${ctaKeyword}".
    
    STYLE GUIDE (CRITICAL):
    1. FIRST SLIDE (THE HOOK): 
       - This must be PURE CLICKBAIT.
       - Do NOT summarize the topic. TEASE the secret.
       - Use a structure like: "Statement + Shocking Consequence + (Hint at solution)".
       - Make the user feel they MUST swipe to find out the truth.
       - Use provocative language: "Destroyed", "Banned", "Secret", "Trauma", "Lies".
    
    2. CONTENT SLIDES:
       - Format: Mimic text-heavy screenshots or tweets. No academic lists.
       - Density: VERY LOW. Large font aesthetic. Max 15 words per block.
       - Structure: Numbered Rule -> Concrete Situation -> Explanation -> Dark/Hard Conclusion.
    
    Language: Russian.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.8, // Slightly higher temperature for creativity in hooks
      },
    });

    return JSON.parse(response.text.trim());
  } catch (error) {
    console.error("Error generating content:", error);
    throw new Error("Failed to generate content.");
  }
}
