import { createClient, SupabaseClient } from "@supabase/supabase-js";


const SUPABASE_URL = "https://lxoqbcliypgqgroazwzh.supabase.co/";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx4b3FiY2xpeXBncWdyb2F6d3poIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ1MzM5MTIsImV4cCI6MjA1MDEwOTkxMn0.AIWIe7LwC4RMJgQTbtU6MP7p6jG0HLVxO017JfXlExI";

export const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
