// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = 'https://your-supabase-url.supabase.co'; // Replace with your Supabase URL
const supabaseKey = 'your-supabase-anon-key'; // Replace with your Supabase anon key

export const supabase = createClient(supabaseUrl, supabaseKey);