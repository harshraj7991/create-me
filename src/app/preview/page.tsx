// src/app/preview/page.tsx
'use client';

import DashboardHeader from '@/components/dashboard/DashboardHeader';
import PostPreview from '@/components/posts/PostPreview';
import { useAuth } from '@/context/AuthContext';
import { SocialPlatform } from '@/types';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

// Default values for post data
const DEFAULT_POST_DATA = {
  id: 'post123',
  title: 'New Product Launch',
  description: 'Announcing our latest product innovation',
  platforms: [] as SocialPlatform[], // Empty by default - only use what's selected
  tone: 'Professional',
  audience: 'Business Professionals',
};

export default function PreviewPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [postData, setPostData] = useState(DEFAULT_POST_DATA);
  
  // Get post ID from URL query parameters
  const postId = searchParams.get('postId') || 'post123';
  
  // Redirect unauthenticated users to login
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);
  
  // In a real app, fetch post data from Firestore
  useEffect(() => {
    // This would fetch the actual post data from Firestore
    // For now, we'll simulate getting data from the form submission
    
    // Try to get platforms from URL parameters
    const platformsParam = searchParams.get('platforms');
    console.log('Platforms from URL:', platformsParam);
    
    const selectedPlatforms = platformsParam ? 
      platformsParam.split(',').filter(p => ['facebook', 'twitter', 'linkedin', 'instagram'].includes(p)) as SocialPlatform[] : 
      [];
    
    console.log('Selected platforms:', selectedPlatforms);
    
    // Get title and description if available
    const title = searchParams.get('title') || DEFAULT_POST_DATA.title;
    const description = searchParams.get('description') || DEFAULT_POST_DATA.description;
    
    // IMPORTANT: Only use the explicitly selected platforms, never fall back to dummy data
    setPostData({
      id: postId,
      title,
      description,
      platforms: selectedPlatforms,
      tone: DEFAULT_POST_DATA.tone,
      audience: DEFAULT_POST_DATA.audience,
    });
  }, [postId, searchParams]);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      
      <main className="py-10 text-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            {/* Log the platforms right before passing to PostPreview */}
            {console.log('Passing platforms to PostPreview:', postData.platforms)}
            <PostPreview
              postId={postData.id}
              title={postData.title}
              description={postData.description}
              platforms={postData.platforms}
              tone={postData.tone}
              audience={postData.audience}
            />
          </div>
        </div>
      </main>
    </div>
  );
}