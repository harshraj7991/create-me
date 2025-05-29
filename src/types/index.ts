// src/types/index.ts

// User profile type
export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  companyName: string;
  industry: string;
  employeeCount: number;
  tone: string;
  targetAudience: string;
  createdAt: Date;
  updatedAt: Date;
}

// Social media platform type
export type SocialPlatform = 'facebook' | 'instagram' | 'twitter' | 'linkedin';

// Post type
export interface Post {
  id: string;
  userId: string;
  title: string;
  description: string;
  content: {
    [key in SocialPlatform]?: string;
  };
  platforms: SocialPlatform[];
  status: 'draft' | 'scheduled' | 'published';
  scheduledFor?: Date;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Onboarding form data type
export interface OnboardingFormData {
  companyName: string;
  industry: string;
  employeeCount: number;
  tone: string;
  targetAudience: string;
}

// Create post form data type
export interface CreatePostFormData {
  title: string;
  description: string;
  platforms: SocialPlatform[];
  productImage?: File;
}

// Schedule post form data type
export interface SchedulePostFormData {
  postId: string;
  scheduledFor: Date;
  platforms: SocialPlatform[];
}

// Auth context type
export interface AuthContextType {
  user: {
    uid?: string;
    email?: string | null;
    displayName?: string | null;
    photoURL?: string | null;
  } | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

// Content generation request type
export interface ContentGenerationRequest {
  productName: string;
  description: string;
  platform: SocialPlatform;
  tone: string;
  audience: string;
}