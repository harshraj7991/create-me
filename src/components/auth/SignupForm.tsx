// src/components/auth/SignupForm.tsx
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import { z } from 'zod';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useAuth } from '@/context/AuthContext';

// Form validation schema
const signupSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signUpWithEmail, signInWithGoogle } = useAuth();
  const router = useRouter();
  
  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  
  const onSubmit = async (data: SignupFormValues) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await signUpWithEmail(data.email, data.password);
      router.push('/onboarding');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to sign up. Please try again.';
      setError(errorMessage);
      } finally {
      setIsLoading(false);
    }
  };
  
  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      await signInWithGoogle();
      router.push('/onboarding');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to sign in with Google. Please try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="w-full max-w-md space-y-8">
      <div className="flex items-center justify-between mb-4">
        <Link href="/" className="flex items-center text-blue-600 hover:text-blue-800">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back
        </Link>
      </div>
      <div className="text-center">
        <h2 className="text-3xl font-bold text-black">Create an account</h2>
        <p className="mt-2 text-gray-600">Sign up to get started with Create Me</p>
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-black">
        <Input
          label="Email"
          type="email"
          fullWidth
          leftIcon={<MdEmail className="text-gray-400" />}
          error={errors.email?.message}
          {...register('email')}
        />
        
        <Input
          label="Password"
          type="password"
          fullWidth
          leftIcon={<RiLockPasswordLine className="text-gray-400" />}
          error={errors.password?.message}
          {...register('password')}
        />
        
        <Input
          label="Confirm Password"
          type="password"
          fullWidth
          leftIcon={<RiLockPasswordLine className="text-gray-400" />}
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />
        
        <div className="space-y-4">
          <Button type="submit" fullWidth isLoading={isLoading}>
            Sign up
          </Button>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>
          
          <Button
            type="button"
            variant="outline"
            fullWidth
            leftIcon={<FcGoogle size={20} />}
            onClick={handleGoogleSignIn}
            disabled={isLoading}
          >
            Sign up with Google
          </Button>
        </div>
      </form>
      
      <div className="text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-600 hover:text-blue-500">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}