// src/app/dashboard/page.tsx
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { RiAddLine } from 'react-icons/ri';

import DashboardHeader from '@/components/dashboard/DashboardHeader';
import PostList from '@/components/dashboard/PostList';
import Button from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';

export default function DashboardPage() {
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
          <div className="flex justify-between items-center mb-6 text-black">
            <h1 className="text-2xl font-bold text-black">Your Posts</h1>
            <Link href="/create-post">
              <Button leftIcon={<RiAddLine />}>Create New Post</Button>
            </Link>
          </div>
          
          <PostList />
        </div>
      </main>
    </div>
  );
}