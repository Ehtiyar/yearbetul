# Complete Setup Guide

## Step-by-Step Instructions

### 1. Supabase Project Setup

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the project to be fully initialized (takes a few minutes)

### 2. Database Setup

1. In your Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy and paste the contents of `supabase-setup.sql`
4. Click **Run** to execute the SQL

This will create:
- The `memories` table
- Row Level Security policies
- An index for faster queries

### 3. Storage Bucket Setup

1. Go to **Storage** in your Supabase dashboard
2. Click **New bucket**
3. Name it: `memories`
4. Make it **Public** (toggle the switch)
5. Click **Create bucket**

### 4. Storage Policies Setup

1. Click on the `memories` bucket you just created
2. Go to **Policies** tab
3. Click **New Policy**
4. Choose **For full customization**
5. Name: "Allow public uploads"
6. Policy definition:
   ```sql
   (bucket_id = 'memories'::text)
   ```
7. Allowed operation: **INSERT**
8. Click **Review** and **Save policy**

### 5. Environment Variables

1. In your Supabase dashboard, go to **Settings** > **API**
2. Copy your **Project URL** and **anon public** key
3. In your project root, create a `.env` file:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

### 6. Install and Run

```bash
npm install
npm run dev
```

### 7. Test Admin Panel

1. Visit `http://localhost:5173/admin`
2. Enter password: `betul2025`
3. Try uploading a memory with a photo

### 8. Customize

- Edit the love note in `src/components/LoveNote.jsx`
- Change admin password in `src/pages/Admin.jsx` (line 6)
- Adjust colors in `tailwind.config.js`

## Troubleshooting

### Images not uploading?
- Make sure the storage bucket is **Public**
- Check that the storage policy allows INSERT operations
- Verify your Supabase keys are correct in `.env`

### Can't see memories?
- Check that the `memories` table exists in your database
- Verify Row Level Security policies allow SELECT
- Check browser console for errors

### Countdown not working?
- The countdown is set for January 1, 2026
- If it's past that date, you can modify the date in `src/components/Hero.jsx`

