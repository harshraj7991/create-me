// src/lib/openai.ts
import OpenAI from 'openai';

// Function to generate content using GPT-4 via our secure API route
export async function generateContent(
  productInfo: {
    companyName: string;
    industry: string;
    productName: string;
    productDescription: string;
    objective: string;
  },
  platform: string,
  tone: string,
  audience: string
): Promise<string> {
  try {
    // Call our secure API route instead of OpenAI directly
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productInfo,
        platform,
        tone,
        audience
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to generate content: ${response.status}`);
    }

    const data = await response.json();
    return data.content || `No content was generated for ${platform}.`;
  } catch (error) {
    console.error('Error generating content:', error);
    return `Error generating content for ${platform}. Please try again.`;
  }
}

// Function to get platform-specific prompt
function getPlatformPrompt(
  platform: string, 
  info: { companyName: string; industry: string; productName: string; productDescription: string; objective: string; },
  tone: string,
  audience: string
): string {
  const { companyName, industry, productName, productDescription, objective } = info;
  
  switch (platform.toLowerCase()) {
    case 'linkedin':
      return `Write a professional LinkedIn post for a company called ${companyName} in the ${industry} industry. The post is about a product called ${productName}, which is described as: ${productDescription}. The purpose of the post is to ${objective} and target an audience of ${audience}. Maintain a confident and industry-relevant tone suitable for a professional audience.`;
      
    case 'instagram':
      return `Create a friendly and engaging Instagram post for a company called ${companyName} that operates in the ${industry} sector. The post should be about a product named ${productName}. Here's the product description: ${productDescription}. The goal of this post is to ${objective}. Make it fun, conversational, and suitable for a visually-driven, younger audience. Include relevant hashtags and emojis.`;
      
    case 'twitter':
      return `Write a concise and witty tweet for a company called ${companyName} about their product ${productName}. The product is described as: ${productDescription}. The objective is to ${objective}. Keep it under 280 characters, catchy, and ideally end with a hashtag relevant to the ${industry}. Use informal, clever language.`;
      
    case 'facebook':
      return `Generate a friendly and informative Facebook post for a company called ${companyName} operating in the ${industry} space. The post is about a product called ${productName}, with the following description: ${productDescription}. The post aims to ${objective} and target ${audience}. Make it approachable, clear, and use a personal tone that encourages sharing.`;
      
    default:
      return `Write a social media post for ${platform} about ${productName} with a ${tone} tone for ${audience} audience. Product description: ${productDescription}. Company: ${companyName} in the ${industry} industry. Objective: ${objective}.`;
  }
}

export { getPlatformPrompt, OpenAI };