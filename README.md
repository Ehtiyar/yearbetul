# Betül'ün Yılı - Year in Review 2025

A romantic, responsive "Year in Review" website built with React, Tailwind CSS, Framer Motion, and Supabase.

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Supabase

1. Create a new project on [Supabase](https://supabase.com)
2. Go to **Settings** > **API** and copy your:
   - Project URL
   - Anon/public key

3. **For Local Development:** Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**⚠️ Important:** `.env` dosyası `.gitignore`'da olduğu için GitHub'a yüklenmez (güvenlik için doğru).

**For Netlify Deployment:** See `NETLIFY_SETUP.md` for instructions on setting environment variables in Netlify dashboard.

### 3. Set Up Database

1. Go to **SQL Editor** in your Supabase dashboard
2. Run the SQL script from `supabase-setup.sql` to create the `memories` table

### 4. Set Up Storage

1. Go to **Storage** in your Supabase dashboard
2. Create a new bucket named `memories`
3. Make it **Public** (so images can be accessed)
4. Set up the following policy:
   - Policy name: "Allow public uploads"
   - Allowed operation: INSERT
   - Policy definition: `true` (or restrict as needed)

### 5. Run the Development Server

```bash
npm run dev
```

## Features

- ✨ Romantic, festive design with snowfall effect
- ⏰ Hero section with New Year countdown (Jan 1, 2026)
- 📸 Timeline of memories from January to December
- 💌 Love note section with heartfelt message
- 🔐 Admin panel for uploading memories (password protected)
- 📱 Fully responsive, mobile-first design

## Admin Access

Visit `/admin` to upload photos and add memories.

**Default Password:** `betul2025`

To change the password, edit the `ADMIN_PASSWORD` constant in `src/pages/Admin.jsx`.

## Project Structure

```
betul-year-in-review/
├── src/
│   ├── components/
│   │   ├── Hero.jsx          # Hero section with countdown
│   │   ├── Timeline.jsx      # Memory cards grid
│   │   ├── LoveNote.jsx      # Heartfelt message section
│   │   ├── Footer.jsx        # Footer with love message
│   │   └── Snowfall.jsx      # Animated snow effect
│   ├── pages/
│   │   ├── Home.jsx          # Main page
│   │   └── Admin.jsx         # Admin upload page
│   ├── App.jsx               # Router setup
│   ├── main.jsx              # Entry point
│   ├── supabaseClient.js    # Supabase configuration
│   └── index.css             # Global styles
├── supabase-setup.sql        # Database setup script
└── package.json
```

## Netlify Deployment

Bu proje Netlify'da deploy edilmeye hazırdır. İki dosya otomatik olarak route'ları yönetir:
- `public/_redirects` - Tüm route'ları index.html'e yönlendirir
- `netlify.toml` - Build ayarları ve redirect kuralları

**Önemli:** Deploy sonrası environment variables'ı Netlify dashboard'dan eklemeyi unutmayın! (Bkz: `NETLIFY_SETUP.md`)

## Customization

- **Love Note:** Edit the text in `src/components/LoveNote.jsx`
- **Colors:** Modify the color palette in `tailwind.config.js`
- **Admin Password:** Change `ADMIN_PASSWORD` in `src/pages/Admin.jsx`

