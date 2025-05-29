// src/app/api/generate/route.ts
import { getPlatformPrompt } from '@/lib/openai';
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client with server-side API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { productInfo, platform, tone, audience } = await request.json();
    
    console.log(`Generating content for platform: ${platform}`);
    
    // Get the appropriate prompt template using the imported function
    const promptTemplate = getPlatformPrompt(platform, productInfo, tone, audience);
    
    // Make the actual API call to OpenAI
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // Changed to a standard model that's definitely available
      messages: [
        {
          role: 'system',
          content: "You are a professional startup marketing expert who crafts platform-specific, tone-adjusted content for business branding and outreach."
        },
        {
          role: 'user',
          content: promptTemplate
        }
      ],
      max_tokens: 500,
    });
    
    const content = response.choices[0].message.content || '';
    console.log(`Content generated for ${platform}:`, content.substring(0, 50) + '...');
    
    return NextResponse.json({ content });
  } catch (error) {
    console.error('Error generating content:', error);
    return NextResponse.json(
      { error: 'Failed to generate content' },
      { status: 500 }
    );
  }
}

