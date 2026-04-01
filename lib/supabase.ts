import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://tzkdiiezabjitzpzqjop.supabase.co"

const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6a2RpaWV6YWJqaXR6cHpxam9wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0MjQ0NjUsImV4cCI6MjA5MDAwMDQ2NX0.Y5B-ReAUtmYs3N1HFSsQ10E7140pQGQ9Wtgd_1Nzgds" // 🔴 pune cheia ANON din Supabase (nu sb_publishable!)

export const supabase = createClient(supabaseUrl, supabaseAnonKey)