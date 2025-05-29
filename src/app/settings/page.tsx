// src/app/settings/page.tsx
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
// import { doc, getDoc, updateDoc } from 'firebase/firestore';

import { useAuth } from '@/context/AuthContext';
// import { db } from '@/lib/firebase';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { OnboardingFormData } from '@/types';

// Form validation schema
const settingsSchema = z.object({
  companyName: z.string().min(1, 'Company name is required'),
  industry: z.string().min(1, 'Industry is required'),
  employeeCount: z.number(),
  tone: z.string().min(1, 'Tone is required'),
  targetAudience: z.string().min(1, 'Target audience is required'),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

const industryOptions = [
  'Technology',
  'Healthcare',
  'Finance',
  'Education',
  'Retail',
  'Manufacturing',
  'Entertainment',
  'Food & Beverage',
  'Travel',
  'Other',
];

const toneOptions = [
  'Professional',
  'Casual',
  'Friendly',
  'Humorous',
  'Formal',
  'Inspirational',
  'Educational',
];

const audienceOptions = [
  'General',
  'Professionals',
  'Students',
  'Parents',
  'Businesses',
  'Millennials',
  'Gen Z',
  'Seniors',
];

// Dummy user profile data for demonstration
const DUMMY_PROFILE: OnboardingFormData = {
  companyName: 'Acme Inc.',
  industry: 'Technology',
  employeeCount: 51,
  tone: 'Professional',
  targetAudience: 'Businesses',
};

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { user, loading } = useAuth();
  const router = useRouter();
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      companyName: '',
      industry: '',
      employeeCount: 1,
      tone: '',
      targetAudience: '',
    },
  });
  
  // Redirect unauthenticated users to login
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);
  
  // Fetch user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) return;
      
      setIsFetching(true);
      
      try {
        // In a real app, this would fetch from Firestore
        // For now, we'll use dummy data
        // const docRef = doc(db, 'userProfiles', user.uid);
        // const docSnap = await getDoc(docRef);
        
        // if (docSnap.exists()) {
        //   const data = docSnap.data() as OnboardingFormData;
        //   reset({
        //     companyName: data.companyName,
        //     industry: data.industry,
        //     employeeCount: data.employeeCount.toString(),
        //     tone: data.tone,
        //     targetAudience: data.targetAudience,
        //   });
        // }
        
        // Using dummy data instead
        reset({
          companyName: DUMMY_PROFILE.companyName,
          industry: DUMMY_PROFILE.industry,
          employeeCount: DUMMY_PROFILE.employeeCount,
          tone: DUMMY_PROFILE.tone,
          targetAudience: DUMMY_PROFILE.targetAudience,
        });
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setIsFetching(false);
      }
    };
    
    if (user) {
      fetchUserProfile();
    }
  }, [user, reset]);
  
  const onSubmit = async (data: SettingsFormValues) => {
    if (!user) {
      setError('You must be logged in to update settings');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      // In a real app, this would update Firestore
      // For now, we'll just simulate it
      console.log('Updating user profile:', {
        uid: user,
        ...data,
      });
      
      // Simulate successful update
      setSuccess('Settings updated successfully');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update settings. Please try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  
  if (loading || isFetching) {
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
          <div className="md:flex md:items-center md:justify-between mb-6">
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
            </div>
          </div>
          
          <div className="bg-white shadow rounded-lg text-black">
            <div className="px-4 py-5 sm:p-6">
              {error && (
                <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                  {error}
                </div>
              )}
              
              {success && (
                <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
                  {success}
                </div>
              )}
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <Input
                  label="Company Name"
                  fullWidth
                  error={errors.companyName?.message}
                  {...register('companyName')}
                />
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Industry
                  </label>
                  <select
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    {...register('industry')}
                  >
                    <option value="">Select an industry</option>
                    {industryOptions.map((industry) => (
                      <option key={industry} value={industry}>
                        {industry}
                      </option>
                    ))}
                  </select>
                  {errors.industry?.message && (
                    <p className="mt-1 text-sm text-red-600">{errors.industry.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Employees
                  </label>
                  <select
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    {...register('employeeCount', { valueAsNumber: true })}
                  >
                    <option value={1}>1-10</option>
                    <option value={11}>11-50</option>
                    <option value={51}>51-200</option>
                    <option value={201}>201-500</option>
                    <option value={501}>501+</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Tone
                  </label>
                  <select
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    {...register('tone')}
                  >
                    <option value="">Select a tone</option>
                    {toneOptions.map((tone) => (
                      <option key={tone} value={tone}>
                        {tone}
                      </option>
                    ))}
                  </select>
                  {errors.tone?.message && (
                    <p className="mt-1 text-sm text-red-600">{errors.tone.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Target Audience
                  </label>
                  <select
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    {...register('targetAudience')}
                  >
                    <option value="">Select a target audience</option>
                    {audienceOptions.map((audience) => (
                      <option key={audience} value={audience}>
                        {audience}
                      </option>
                    ))}
                  </select>
                  {errors.targetAudience?.message && (
                    <p className="mt-1 text-sm text-red-600">{errors.targetAudience.message}</p>
                  )}
                </div>
                
                <div className="pt-4">
                  <Button type="submit" isLoading={isLoading}>
                    Save Settings
                  </Button>
                </div>
              </form>
            </div>
          </div>
          
          <div className="mt-10 bg-white shadow rounded-lg text-black">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900">Social Media Accounts</h3>
              <div className="mt-2 max-w-xl text-sm text-gray-500">
                <p>Connect your social media accounts to enable direct posting.</p>
              </div>
              
              <div className="mt-5 space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
                  <div className="flex items-center">
                    <div className="text-blue-600 text-xl mr-3">FB</div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Facebook</h4>
                      <p className="text-xs text-gray-500">Not connected</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Connect
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
                  <div className="flex items-center">
                    <div className="text-pink-600 text-xl mr-3">IG</div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Instagram</h4>
                      <p className="text-xs text-gray-500">Not connected</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Connect
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
                  <div className="flex items-center">
                    <div className="text-blue-400 text-xl mr-3">TW</div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Twitter</h4>
                      <p className="text-xs text-gray-500">Not connected</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Connect
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
                  <div className="flex items-center">
                    <div className="text-blue-800 text-xl mr-3">LI</div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">LinkedIn</h4>
                      <p className="text-xs text-gray-500">Not connected</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Connect
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-10 bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900">API Keys</h3>
              <div className="mt-2 max-w-xl text-sm text-gray-500">
                <p>Configure your API keys for third-party services.</p>
              </div>
              
              <div className="mt-5 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    OpenAI API Key
                  </label>
                  <Input
                    type="password"
                    fullWidth
                    placeholder="sk-..."
                    defaultValue="sk-dummy-api-key-for-openai-replace-with-real-key"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Get your API key from the OpenAI dashboard.
                  </p>
                </div>
                
                <div className="pt-4">
                  <Button>
                    Save API Keys
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}