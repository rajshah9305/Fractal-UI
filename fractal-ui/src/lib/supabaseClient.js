// src/lib/supabaseClient.js
// Supabase client for Fractal UI frontend
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Create a single supabase client for the app
export const supabase = createClient(supabaseUrl, supabaseAnonKey); 