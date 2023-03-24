import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabaseUrl = 'https://awpstoevhnbopahmzzqe.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF3cHN0b2V2aG5ib3BhaG16enFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzk1NDc5NDksImV4cCI6MTk5NTEyMzk0OX0.KSG93ToGuHLhxw6ocH7iYQYKNiJNPpPRekfyeqey0eg';
export const supabase = createClient(supabaseUrl, supabaseAnonKey)