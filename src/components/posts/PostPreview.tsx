// src/components/posts/PostPreview.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { RiCalendarLine, RiSendPlaneLine } from 'react-icons/ri';

import Button from '@/components/ui/Button';
import { SocialPlatform } from '@/types';
import { generateContent } from '@/lib/openai';

interface PostPreviewProps {
  postId: string;
  title: string;
  description: string;
  platforms: SocialPlatform[];
  tone?: string;
  audience?: string;
}

interface PlatformPreview {
  platform: SocialPlatform;
  content: string;
  isLoading: boolean;
}

export default function PostPreview({
  postId,
  title,
  description,
  platforms,
  tone = 'Professional',
  audience = 'General',
}: PostPreviewProps) {
  const [previews, setPreviews] = useState<PlatformPreview[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showSchedule, setShowSchedule] = useState(false);
  const router = useRouter();
  
  // Initialize previews and automatically generate content for all platforms
  useEffect(() => {
    // Filter out any unexpected platforms
    const validPlatforms = platforms.filter(p => 
      ['facebook', 'twitter', 'linkedin', 'instagram'].includes(p)
    );
    
    if (validPlatforms && validPlatforms.length > 0) {
      // Initialize all platforms in loading state
      const initialPreviews = validPlatforms.map((platform) => ({
        platform,
        content: '',
        isLoading: true, // Start in loading state
      }));
      
      // Set initial state
      setPreviews(initialPreviews);
      
      // Automatically generate content for all platforms
      generateAllContent(initialPreviews);
    }
  }, [platforms, title, description, tone, audience]);
  
  // Generate content for all platforms
  const generateAllContent = async (initialPlatforms: PlatformPreview[]) => {
    if (initialPlatforms.length === 0) return;
    
    setIsGenerating(true);
    
    // Sample product info for content generation
    const productInfo = {
      companyName: "Your Company",
      industry: "Technology",
      productName: title,
      productDescription: description,
      objective: "promote the product and increase awareness",
    };
    
    // Process each platform one by one
    for (let i = 0; i < initialPlatforms.length; i++) {
      const platform = initialPlatforms[i].platform;
      
      try {
        // Generate content for this platform
        const content = await generateContent(
          productInfo,
          platform,
          tone,
          audience
        );
        
        // Update this specific platform with the content
        initialPlatforms[i] = {
          ...initialPlatforms[i],
          content,
          isLoading: false,
        };
        
        // Update the state after each platform is processed
        setPreviews([...initialPlatforms]);
      } catch (error) {
        // Handle error for this platform
        initialPlatforms[i] = {
          ...initialPlatforms[i],
          content: `Error generating content. Please try again.`,
          isLoading: false,
        };
        setPreviews([...initialPlatforms]);
      }
    }
    
    setIsGenerating(false);
  };
  
  // Regenerate content for a single platform
  const handleRegenerateContent = async (platform: SocialPlatform) => {
    const index = previews.findIndex(p => p.platform === platform);
    if (index === -1) return;
    
    // Create a new copy of previews
    const updatedPreviews = [...previews];
    
    // Set this platform to loading state
    updatedPreviews[index] = {
      ...updatedPreviews[index],
      isLoading: true
    };
    
    // Update state to show loading
    setPreviews([...updatedPreviews]);
    
    try {
      // Sample product info
      const productInfo = {
        companyName: "Your Company",
        industry: "Technology",
        productName: title,
        productDescription: description,
        objective: "promote the product and increase awareness",
      };
      
      // Generate content for this platform
      const content = await generateContent(
        productInfo,
        platform,
        tone,
        audience
      );
      
      // Create a new copy of the latest previews state
      const latestPreviews = [...previews];
      
      // Update with the new content
      latestPreviews[index] = {
        ...latestPreviews[index],
        content,
        isLoading: false
      };
      
      // Update state with the new content
      setPreviews(latestPreviews);
    } catch (error) {
      // Create a new copy of the latest previews state
      const latestPreviews = [...previews];
      
      // Update with the error message
      latestPreviews[index] = {
        ...latestPreviews[index],
        content: `Error generating content. Please try again.`,
        isLoading: false
      };
      
      // Update state with the error
      setPreviews(latestPreviews);
    }
  };
  
  const handlePostNow = () => {
    // In a real app, this would post to social media platforms
    console.log('Posting now:', {
      postId,
      platforms,
      contents: previews.map((p) => ({ platform: p.platform, content: p.content })),
    });
    
    // Redirect to dashboard
    router.push('/dashboard');
  };
  
  const handleSchedule = () => {
    if (!selectedDate) return;
    
    // In a real app, this would schedule the post
    console.log('Scheduling post:', {
      postId,
      platforms,
      contents: previews.map((p) => ({ platform: p.platform, content: p.content })),
      scheduledFor: selectedDate,
    });
    
    // Redirect to dashboard
    router.push('/dashboard');
  };
  
  return (
    <div className="w-full max-w-4xl space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Preview Your Content</h2>
        <p className="mt-2 text-gray-600">
          Review the generated content for each platform
        </p>
      </div>
      
      <div className="space-y-6">
        {previews.map((preview) => (
          <div
            key={preview.platform}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
              <h3 className="text-lg font-medium capitalize">{preview.platform}</h3>
            </div>
            <div className="p-4">
              {preview.isLoading ? (
                <div className="flex justify-center items-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : (
                <div className="prose max-w-none">
                  <pre className="whitespace-pre-wrap font-sans text-sm">
                    {preview.content}
                  </pre>
                </div>
              )}
            </div>
            {!preview.isLoading && (
              <div className="bg-gray-50 px-4 py-2 border-t border-gray-200 flex justify-end">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleRegenerateContent(preview.platform)}
                  disabled={isGenerating}
                >
                  Regenerate
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="pt-6 border-t border-gray-200">
        {showSchedule ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Schedule Date and Time
              </label>
              <input
                type="datetime-local"
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onChange={(e) => setSelectedDate(e.target.value ? new Date(e.target.value) : null)}
                min={format(new Date(), "yyyy-MM-dd'T'HH:mm")}
              />
            </div>
            <div className="flex space-x-4">
              <Button
                fullWidth
                onClick={handleSchedule}
                disabled={!selectedDate}
                leftIcon={<RiCalendarLine />}
              >
                Schedule Post
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowSchedule(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex space-x-4">
            <Button
              fullWidth
              onClick={handlePostNow}
              leftIcon={<RiSendPlaneLine />}
            >
              Post Now
            </Button>
            <Button
              variant="outline"
              fullWidth
              leftIcon={<RiCalendarLine />}
              onClick={() => setShowSchedule(true)}
            >
              Schedule Later
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}