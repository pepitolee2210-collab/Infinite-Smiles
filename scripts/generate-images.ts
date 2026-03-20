import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const prompts = [
  "A modern, luxury dental clinic interior. Clean, bright, with subtle accents of pink, orange, teal, and plum. Editorial photography, highly detailed, 8k resolution.",
  "A close-up of a beautiful, confident smile. The person is happy. Soft, warm lighting with a hint of peach and plum tones in the background. High-end beauty photography.",
  "Abstract, elegant dental tools arranged artistically on a clean white surface with soft shadows. Accents of teal and orange light. Minimalist, modern, premium aesthetic.",
  "A friendly, professional female dentist in a modern clinic, wearing a stylish white coat. Soft, welcoming atmosphere. Subtle brand colors of pink and teal in the background. High quality, photorealistic.",
  "A macro shot of a pristine, white ceramic dental veneer. Artistic lighting with a gradient background of soft plum and orange. Luxury healthcare concept."
];

async function generateImages() {
  const outputDir = path.join(process.cwd(), 'public', 'images');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  for (let i = 0; i < prompts.length; i++) {
    console.log(`Generating image ${i + 1}...`);
    try {
      // Try gemini-3.1-flash-image-preview first
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-image-preview',
        contents: {
          parts: [{ text: prompts[i] }],
        },
        config: {
          imageConfig: {
            aspectRatio: "16:9",
            imageSize: "1K"
          }
        }
      });

      let base64Data = null;
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          base64Data = part.inlineData.data;
          break;
        }
      }

      if (base64Data) {
        const buffer = Buffer.from(base64Data, 'base64');
        fs.writeFileSync(path.join(outputDir, `dental-${i + 1}.png`), buffer);
        console.log(`Saved image ${i + 1}`);
      } else {
        console.log(`No image data found for prompt ${i + 1}`);
      }
    } catch (error) {
      console.error(`Error generating image ${i + 1} with 3.1:`, error.message);
      console.log("Falling back to gemini-2.5-flash-image...");
      try {
        const fallbackResponse = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: {
            parts: [{ text: prompts[i] }],
          },
          config: {
            imageConfig: {
              aspectRatio: "16:9"
            }
          }
        });

        let base64Data = null;
        for (const part of fallbackResponse.candidates[0].content.parts) {
          if (part.inlineData) {
            base64Data = part.inlineData.data;
            break;
          }
        }

        if (base64Data) {
          const buffer = Buffer.from(base64Data, 'base64');
          fs.writeFileSync(path.join(outputDir, `dental-${i + 1}.png`), buffer);
          console.log(`Saved image ${i + 1} (fallback)`);
        }
      } catch (fallbackError) {
        console.error(`Fallback failed for image ${i + 1}:`, fallbackError.message);
      }
    }
  }
}

generateImages();
