import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ovkkhovajnvdtnjrxkpm.supabase.co';
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_I473nvNwGpvQJvRJpCIydg_tpfyCZwK';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
