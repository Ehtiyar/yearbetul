-- Create the memories table
CREATE TABLE IF NOT EXISTS memories (
  id BIGSERIAL PRIMARY KEY,
  month TEXT NOT NULL,
  image_url TEXT,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  order_id INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create a storage bucket for images (run this in Supabase Storage section)
-- Bucket name: memories
-- Public: true

-- Enable Row Level Security (optional, but recommended)
ALTER TABLE memories ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow public read access
CREATE POLICY "Allow public read access" ON memories
  FOR SELECT USING (true);

-- Create a policy to allow authenticated users to insert (adjust based on your needs)
-- For now, we'll allow public insert (you can restrict this later)
CREATE POLICY "Allow public insert" ON memories
  FOR INSERT WITH CHECK (true);

-- Create an index on order_id for faster sorting
CREATE INDEX IF NOT EXISTS idx_memories_order_id ON memories(order_id);

