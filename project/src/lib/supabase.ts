import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    'Missing Supabase environment variables. Please connect to Supabase by clicking the "Connect to Supabase" button in the top right.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);