import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bmtbohuzvkdifffdwayv.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
if (!supabaseKey) throw new Error("Missing SUPABASE_KEY env var");
export const supabase = createClient(supabaseUrl, supabaseKey);
