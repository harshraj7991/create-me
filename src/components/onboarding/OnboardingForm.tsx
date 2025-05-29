// src/components/onboarding/OnboardingForm.tsx
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/firebase';
import { OnboardingFormData } from '@/types';

// Form validation schema
const onboardingSchema = z.object({
  companyName: z.string().min(1, 'Company name is required'),
  industry: z.string().min(1, 'Industry is required'),
  employeeCount: z.number(),
  tone: z.string().min(1, 'Tone is required'),
  targetAudience: z.string().min(1, 'Target audience is required'),
});

type OnboardingFormValues = z.infer<typeof onboardingSchema>;

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

export default function OnboardingForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const router = useRouter();
  
  const { register, handleSubmit, formState: { errors } } = useForm<OnboardingFormValues>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      companyName: '',
      industry: '',
      employeeCount: 1,
      tone: '',
      targetAudience: '',
    },
  });
  
  const onSubmit = async (data: OnboardingFormValues) => {
    if (!user) {
      setError('You must be logged in to complete onboarding');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Save user profile to Firestore
      const userProfile: OnboardingFormData = {
        companyName: data.companyName,
        industry: data.industry,
        employeeCount: data.employeeCount,
        tone: data.tone,
        targetAudience: data.targetAudience,
      };
      
      await setDoc(doc(db, 'userProfiles', user.uid), {
        ...userProfile,
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || '',
        photoURL: user.photoURL || '',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      
      router.push('/dashboard');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to save profile. Please try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="w-full max-w-2xl space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold">Tell us about your business</h2>
        <p className="mt-2 text-gray-600">This information helps us personalize your experience</p>
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {error}
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
            {...register('employeeCount')}
          >
            <option value="1">1-10</option>
            <option value="11">11-50</option>
            <option value="51">51-200</option>
            <option value="201">201-500</option>
            <option value="501">501+</option>
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
          <Button type="submit" fullWidth isLoading={isLoading}>
            Complete Setup
          </Button>
        </div>
      </form>
    </div>
  );
}