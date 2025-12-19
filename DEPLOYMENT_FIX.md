# Netlify 404 Hatası Düzeltmesi

## Sorun
`/admin` gibi route'lara gidildiğinde "Page not found" (404) hatası alınıyor.

## Çözüm
İki dosya eklendi:

1. **`public/_redirects`** - Netlify'ın tüm route'ları index.html'e yönlendirmesi için
2. **`netlify.toml`** - Build ayarları ve redirect kuralları

## Yapılacaklar

### 1. Dosyaları GitHub'a Push Edin
```bash
git add public/_redirects netlify.toml
git commit -m "Add Netlify redirects for SPA routing"
git push
```

### 2. Netlify'da Yeniden Deploy
- Netlify otomatik olarak yeni commit'i algılayıp deploy edecek
- Veya manuel olarak **Deploys** > **Trigger deploy** > **Clear cache and deploy site**

### 3. Test Edin
- Ana sayfa: `yeniyilbetul.netlify.app/`
- Admin sayfa: `yeniyilbetul.netlify.app/admin`

## Not
Eğer hala 404 hatası alıyorsanız:
1. Netlify dashboard'da **Site settings** > **Build & deploy** > **Build settings** kontrol edin
2. **Publish directory:** `dist` olmalı
3. **Build command:** `npm run build` olmalı

