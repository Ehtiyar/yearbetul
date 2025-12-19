# Netlify Deployment ve Environment Variables Kurulumu

## Önemli Not
`.env` dosyası **asla** GitHub'a yüklenmemelidir! Bu güvenlik riski oluşturur.

## Netlify'da Environment Variables Ayarlama

### 1. Netlify Dashboard'a Giriş
1. [Netlify](https://app.netlify.com) hesabınıza giriş yapın
2. Projenizi seçin veya yeni bir site oluşturun

### 2. Environment Variables Ekleme
1. Netlify dashboard'da projenize gidin
2. **Site settings** (Site ayarları) tıklayın
3. Sol menüden **Environment variables** (Ortam değişkenleri) seçin
4. **Add a variable** (Değişken ekle) butonuna tıklayın

### 3. Supabase Değişkenlerini Ekleyin

İki değişken eklemeniz gerekiyor:

**Değişken 1:**
- **Key:** `VITE_SUPABASE_URL`
- **Value:** Supabase projenizin URL'si (örn: `https://xxxxx.supabase.co`)

**Değişken 2:**
- **Key:** `VITE_SUPABASE_ANON_KEY`
- **Value:** Supabase anon/public key'iniz

### 4. Değişiklikleri Kaydedin
- Her değişkeni ekledikten sonra **Save** (Kaydet) butonuna tıklayın

### 5. Siteyi Yeniden Deploy Edin
1. **Deploys** (Dağıtımlar) sekmesine gidin
2. **Trigger deploy** > **Clear cache and deploy site** seçin
3. Veya yeni bir commit yapın ve otomatik deploy olsun

## Supabase Bilgilerini Bulma

1. [Supabase Dashboard](https://app.supabase.com) hesabınıza giriş yapın
2. Projenizi seçin
3. Sol menüden **Settings** (Ayarlar) > **API** seçin
4. **Project URL** ve **anon public** key'i kopyalayın

## Test Etme

Deploy sonrası:
1. Site URL'nizi ziyaret edin
2. Console'u açın (F12) ve hata olup olmadığını kontrol edin
3. `/admin` sayfasına gidip anı eklemeyi deneyin

## Yerel Geliştirme İçin

Yerel geliştirme için proje klasöründe `.env` dosyası oluşturun:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Bu dosya `.gitignore`'da olduğu için GitHub'a yüklenmeyecek (güvenlik için doğru).

