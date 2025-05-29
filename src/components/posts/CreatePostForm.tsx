// src/components/posts/CreatePostForm.tsx
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
// import { doc, setDoc } from 'firebase/firestore';
import { RiUpload2Line } from 'react-icons/ri';

// import { db } from '@/lib/firebase';
// import { supabase } from '@/lib/supabase';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useAuth } from '@/context/AuthContext';
import { SocialPlatform } from '@/types'; //CreatePostFormData

// Form validation schema
const createPostSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  platforms: z.array(z.string()).min(1, 'Select at least one platform'),
});

type CreatePostFormValues = z.infer<typeof createPostSchema>;

const platforms: { id: SocialPlatform; name: string }[] = [
  { id: 'facebook', name: 'Facebook' },
  { id: 'instagram', name: 'Instagram' },
  { id: 'twitter', name: 'Twitter' },
  { id: 'linkedin', name: 'LinkedIn' },
];

export default function CreatePostForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { user } = useAuth();
  const router = useRouter();
  
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<CreatePostFormValues>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: '',
      description: '',
      platforms: [],
    },
  });
  
  const watchPlatforms = watch('platforms');
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };
  
  const handlePlatformToggle = (platformId: string) => {
    const currentPlatforms = watchPlatforms || [];
    if (currentPlatforms.includes(platformId)) {
      setValue(
        'platforms',
        currentPlatforms.filter((id) => id !== platformId)
      );
    } else {
      setValue('platforms', [...currentPlatforms, platformId]);
    }
  };
  
  const onSubmit = async (data: CreatePostFormValues) => {
    if (!user) {
      setError('You must be logged in to create a post');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Generate a unique ID for the post
      const postId = `post_${Date.now()}`;
      
      // Upload image to Supabase Storage if selected
      let imageUrl = '';
      if (selectedFile) {
        // In a real app, this would upload to Supabase
        // For now, we'll just simulate it
        console.log('Uploading file:', selectedFile.name);
        
        // Simulated upload success
        imageUrl = `https://example.com/images/${selectedFile.name}`;
      }
      
      // Save post data to Firestore
      // In a real app, this would actually save to Firestore
      // For now, we'll just simulate it
      console.log('Creating post:', {
        id: postId,
        userId: user.uid,
        title: data.title,
        description: data.description,
        platforms: data.platforms,
        imageUrl,
        status: 'draft',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      
      // Redirect to the content generation page with selected platforms
      router.push(`/preview?postId=${postId}&platforms=${data.platforms.join(',')}&title=${encodeURIComponent(data.title)}&description=${encodeURIComponent(data.description)}`);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create post. Please try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="w-full max-w-2xl space-y-8 text-black">
      <div>
        <h2 className="text-2xl font-bold text-black">Create New Post</h2>
        <p className="mt-2 text-gray-600">
          Fill in the details below to create a new social media post
        </p>
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          label="Product/Campaign Name"
          placeholder="e.g., Summer Collection, New Product Launch"
          fullWidth
          error={errors.title?.message}
          {...register('title')}
        />
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={4}
            placeholder="Describe your product or campaign"
            {...register('description')}
          ></textarea>
          {errors.description?.message && (
            <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Image (Optional)
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <RiUpload2Line className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              {selectedFile && (
                <p className="text-sm text-green-600">Selected: {selectedFile.name}</p>
              )}
            </div>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Platforms
          </label>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {platforms.map((platform) => (
              <div
                key={platform.id}
                className={`flex items-center p-3 rounded-md cursor-pointer border ${
                  watchPlatforms?.includes(platform.id)
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => handlePlatformToggle(platform.id)}
              >
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={watchPlatforms?.includes(platform.id) || false}
                  onChange={() => {}}
                />
                <label className="ml-2 block text-sm text-gray-900">
                  {platform.name}
                </label>
              </div>
            ))}
          </div>
          {errors.platforms?.message && (
            <p className="mt-1 text-sm text-red-600">{errors.platforms.message}</p>
          )}
        </div>
        
        <div className="pt-4">
          <Button type="submit" fullWidth isLoading={isLoading}>
            Generate Content
          </Button>
        </div>
      </form>
    </div>
  );
}