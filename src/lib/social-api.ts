// src/lib/social-api.ts
// This file contains mock implementations for social media API integrations

// Meta Graph API (Facebook/Instagram) mock
export const metaApi = {
  // Mock function to post content to Facebook
  postToFacebook: async (content: string, imageUrl?: string): Promise<{ success: boolean, postId: string }> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    console.log('Mock: Posting to Facebook', { content, imageUrl });
    
    // Return mock response
    return {
      success: true,
      postId: `fb-${Date.now()}`
    };
  },
  
  // Mock function to post content to Instagram
  postToInstagram: async (content: string, imageUrl: string): Promise<{ success: boolean, postId: string }> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    console.log('Mock: Posting to Instagram', { content, imageUrl });
    
    // Return mock response
    return {
      success: true,
      postId: `ig-${Date.now()}`
    };
  }
};

// LinkedIn API mock
export const linkedinApi = {
  // Mock function to post content to LinkedIn
  postToLinkedIn: async (content: string, imageUrl?: string): Promise<{ success: boolean, postId: string }> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    console.log('Mock: Posting to LinkedIn', { content, imageUrl });
    
    // Return mock response
    return {
      success: true,
      postId: `li-${Date.now()}`
    };
  }
};

// Twitter (X) API mock
export const twitterApi = {
  // Mock function to post content to Twitter
  postToTwitter: async (content: string, imageUrl?: string): Promise<{ success: boolean, tweetId: string }> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    console.log('Mock: Posting to Twitter', { content, imageUrl });
    
    // Return mock response
    return {
      success: true,
      tweetId: `tw-${Date.now()}`
    };
  }
};

// Sample tokens (these would normally be securely stored)
export const socialTokens = {
  meta: {
    accessToken: 'mock-meta-access-token-123456',
    expiresAt: Date.now() + 60 * 60 * 1000, // 1 hour from now
  },
  linkedin: {
    accessToken: 'mock-linkedin-access-token-123456',
    expiresAt: Date.now() + 60 * 60 * 1000, // 1 hour from now
  },
  twitter: {
    apiKey: 'mock-twitter-api-key',
    apiSecret: 'mock-twitter-api-secret',
    accessToken: 'mock-twitter-access-token',
    accessTokenSecret: 'mock-twitter-access-token-secret',
  }
};