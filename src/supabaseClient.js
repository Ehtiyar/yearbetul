import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Supabase bağlantısı yoksa bile uygulama çalışsın
let supabase = null

if (supabaseUrl && supabaseAnonKey) {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey)
  } catch (error) {
    console.warn('Supabase bağlantısı kurulamadı:', error)
  }
} else {
  console.warn('Supabase environment variables eksik. Admin paneli çalışmayabilir.')
}

export { supabase }

