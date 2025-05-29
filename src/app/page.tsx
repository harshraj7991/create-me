// src/app/page.tsx
'use client';

import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();
  
  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);
  
  return (
    <div className="min-h-screen bg-white">
      {/* Hero section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-y-0 h-full w-full" aria-hidden="true">
          <div className="relative h-full">
            <div className="absolute top-0 right-0 -ml-24 overflow-hidden">
              <div className="h-96 w-96 bg-gradient-to-r from-blue-50 to-blue-100 opacity-30 blur-3xl"></div>
            </div>
            <div className="absolute bottom-0 left-0 -ml-24 overflow-hidden">
              <div className="h-96 w-96 bg-gradient-to-r from-blue-50 to-blue-100 opacity-30 blur-3xl"></div>
            </div>
          </div>
        </div>
        
        {/* Navigation */}
        <div className="relative">
          <nav className="mx-auto max-w-7xl px-6 lg:px-8" aria-label="Top">
            <div className="flex w-full items-center justify-between border-b border-blue-500/10 py-6">
              <div className="flex items-center">
                <Link href="/" className="text-2xl font-bold text-blue-600">
                  Create Me
                </Link>
              </div>
              <div className="ml-10 space-x-4">
                <Link
                  href="/login"
                  className="inline-block rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white hover:bg-blue-700"
                >
                  Sign in
                </Link>
                <Link
                  href="/signup"
                  className="inline-block rounded-md border border-transparent bg-white px-4 py-2 text-base font-medium text-blue-600 hover:bg-gray-50"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </nav>
        </div>
        
        {/* Hero content */}
        <div className="relative pt-10 pb-20 sm:pt-16 sm:pb-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              <div className="sm:text-center md:mx-auto md:max-w-2xl lg:col-span-6 lg:text-left">
                <h1>
                  <span className="block text-base font-semibold text-blue-600">
                    Introducing Create Me
                  </span>
                  <span className="mt-1 block text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl">
                    <span className="block text-gray-900">AI-Powered Social Media</span>
                    <span className="block text-blue-600">Content Creation</span>
                  </span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                  Create engaging social media content for multiple platforms in seconds.
                  Powered by AI, tailored to your brand, and ready to publish or schedule.
                </p>
                <div className="mt-8 sm:mx-auto sm:max-w-lg sm:text-center lg:mx-0 lg:text-left">
                  <Link
                    href="/signup"
                    className="block w-full rounded-md border border-transparent bg-blue-600 px-5 py-3 text-base font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:px-10"
                  >
                    Get started for free
                  </Link>
                  <p className="mt-3 text-sm text-gray-500">
                    No credit card required. Start creating content in minutes.
                  </p>
                </div>
              </div>
              <div className="relative mt-12 sm:mx-auto sm:max-w-lg lg:col-span-6 lg:mx-0 lg:mt-0 lg:flex lg:max-w-none lg:items-center">
                <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                  <div className="relative block w-full overflow-hidden rounded-lg bg-white focus:outline-none">
                    <Image
                      className="w-full"
                      src="https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                      alt="Dashboard preview"
                      width={1350}
                      height={800}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg
                        className="h-20 w-20 text-blue-500"
                        fill="currentColor"
                        viewBox="0 0 84 84"
                      >
                        <circle opacity="0.9" cx="42" cy="42" r="42" fill="white" />
                        <path d="M55 42L35 55V29L55 42Z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features section */}
      <div className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base font-semibold uppercase tracking-wide text-blue-600">
              Features
            </h2>
            <p className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to create great content
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Create Me combines AI-powered content generation with powerful scheduling
              and multi-platform publishing tools.
            </p>
          </div>
          
          <div className="mt-10">
            <dl className="space-y-10 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 md:space-y-0">
              <div className="relative">
                <dt>
                  <div className="absolute flex h-12 w-12 items-center justify-center rounded-md bg-blue-500 text-white">
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <p className="ml-16 text-lg font-medium leading-6 text-gray-900">
                    AI-Powered Content Generation
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Generate engaging, platform-specific content with a single click using
                  advanced AI technology.
                </dd>
              </div>
              
              <div className="relative">
                <dt>
                  <div className="absolute flex h-12 w-12 items-center justify-center rounded-md bg-blue-500 text-white">
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                      />
                    </svg>
                  </div>
                  <p className="ml-16 text-lg font-medium leading-6 text-gray-900">
                    Multi-Platform Publishing
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Create and publish content to multiple social media platforms from a
                  single dashboard.
                </dd>
              </div>
              
              <div className="relative">
                <dt>
                  <div className="absolute flex h-12 w-12 items-center justify-center rounded-md bg-blue-500 text-white">
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <p className="ml-16 text-lg font-medium leading-6 text-gray-900">
                    Smart Scheduling
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Schedule posts for optimal times or create custom publishing schedules
                  for consistent content delivery.
                </dd>
              </div>
              
              <div className="relative">
                <dt>
                  <div className="absolute flex h-12 w-12 items-center justify-center rounded-md bg-blue-500 text-white">
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <p className="ml-16 text-lg font-medium leading-6 text-gray-900">
                    Brand-Consistent Content
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Maintain consistent brand voice and messaging across all platforms with
                  customizable tone and style settings.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
      
      {/* CTA section */}
      <div className="bg-blue-600">
        <div className="mx-auto max-w-2xl py-16 px-6 text-center sm:py-20 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to get started?</span>
            <span className="block">Create your account today.</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-blue-100">
            Join thousands of marketers and content creators who are saving time and
            creating better content with Create Me.
          </p>
          <Link
            href="/signup"
            className="mt-8 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-blue-600 hover:bg-blue-50 sm:w-auto"
          >
            Sign up for free
          </Link>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-white">
        <div className="mx-auto max-w-7xl py-12 px-6 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Twitter</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">GitHub</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
          <div className="mt-8 md:order-1 md:mt-0">
            <p className="text-center text-base text-gray-400">
              &copy; 2023 Create Me, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}