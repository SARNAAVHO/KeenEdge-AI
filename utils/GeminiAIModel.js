// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

import {
  GoogleGenAI,
} from '@google/genai';

export async function generateContent(InputPrompt) {
  const ai = new GoogleGenAI({
    apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
  });
  const config = {
    responseMimeType: 'text/plain',
  };
  const model = 'gemma-3n-e4b-it';
  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: InputPrompt,
        },
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });
  let generatedText = '';
  for await (const chunk of response) {
    generatedText += chunk.text; 
  }
  return generatedText;
}
