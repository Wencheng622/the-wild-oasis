import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://ownrrjguvkzqbtmltlyn.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93bnJyamd1dmt6cWJ0bWx0bHluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgxNTMzNzIsImV4cCI6MjA4MzcyOTM3Mn0.toPPp1yJCPYj2TyacNZ9gjNQ24mU8dZzDBdRWKfHdcU";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
