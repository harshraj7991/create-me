// src/app/create-post/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import CreatePostForm from '@/components/posts/CreatePostForm';

export default function CreatePostPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  
  // Redirect unauthenticated users to login
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);
  
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
      
      <main className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <CreatePostForm />
          </div>
        </div>
      </main>
    </div>
  );
}