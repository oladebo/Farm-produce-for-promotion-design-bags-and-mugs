
import { GoogleGenAI, Modality } from "@google/genai";
import type { AspectRatio, Design, Product } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

/**
 * Generates a design from a text prompt using the 'imagen-4.0-generate-001' model.
 * @param prompt The text prompt describing the design.
 * @param aspectRatio The desired aspect ratio for the generated image.
 * @returns A promise that resolves to a Design object with base64 data and mimeType.
 */
export const generateDesign = async (prompt: string, aspectRatio: AspectRatio): Promise<Design> => {
  try {
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: `A high-resolution, professional logo or graphic design for a brand, centered on a plain white background. The design should be: ${prompt}`,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/png',
        aspectRatio: aspectRatio,
      },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      const image = response.generatedImages[0];
      return {
        base64: image.image.imageBytes,
        mimeType: 'image/png',
      };
    } else {
      throw new Error("Image generation failed, no images returned.");
    }
  } catch (error) {
    console.error("Error generating design:", error);
    throw new Error("Failed to generate design with Gemini API.");
  }
};

/**
 * Creates a product mockup by combining a design image with a product description using the 'gemini-2.5-flash-image' model.
 * @param design The design object containing the base64 image data.
 * @param product The type of product for the mockup (e.g., 'T-Shirt', 'Mug').
 * @returns A promise that resolves to a base64 string of the generated mockup image.
 */
export const createMockup = async (design: Design, product: Product): Promise<string> => {
  try {
    const designPart = {
      inlineData: {
        data: design.base64,
        mimeType: design.mimeType,
      },
    };

    const textPart = {
      text: `Create a photorealistic, high-quality product mockup of a plain white ${product}. The product should be the central focus, shot in a well-lit, minimalist studio setting with a clean, light gray background. Place the provided design onto the product's main surface. The design should appear as a high-quality print, perfectly integrated with the product's texture and contours. Do not add any other objects, text, or branding to the image.`,
    };

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [designPart, textPart],
      },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return part.inlineData.data;
      }
    }
    
    throw new Error("Mockup generation failed, no image data in response.");
  } catch (error) {
    console.error("Error creating mockup:", error);
    throw new Error("Failed to create mockup with Gemini API.");
  }
};
