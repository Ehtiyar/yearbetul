import { useState } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '../supabaseClient'
import { Upload, Lock, Heart } from 'lucide-react'

const ADMIN_PASSWORD = 'betul2025' // Change this to your desired password

const monthOptions = [
  'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
  'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
]

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  
  const [formData, setFormData] = useState({
    month: 'Ocak',
    title: '',
    description: '',
    order_id: 1,
    imageFile: null,
    videoFile: null,
  })

  const handleLogin = (e) => {
    e.preventDefault()
    const trimmedPassword = password.trim()
    if (trimmedPassword === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      setMessage('')
      setPassword('')
    } else {
      setMessage('Yanlış şifre! Lütfen tekrar deneyin.')
      setPassword('')
    }
  }

  const handleImageChange = (e) => {
    setFormData({ ...formData, imageFile: e.target.files[0], videoFile: null })
  }

  const handleVideoChange = (e) => {
    setFormData({ ...formData, videoFile: e.target.files[0], imageFile: null })
  }

  const uploadFile = async (file, type = 'image') => {
    try {
      if (!supabase) {
        throw new Error('Supabase bağlantısı yok. Lütfen .env dosyasını kontrol edin.')
      }

      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
      const filePath = `memories/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('memories')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data } = supabase.storage
        .from('memories')
        .getPublicUrl(filePath)

      return data.publicUrl
    } catch (error) {
      console.error(`Error uploading ${type}:`, error)
      throw error
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      let imageUrl = ''
      let videoUrl = ''

      if (formData.imageFile) {
        imageUrl = await uploadFile(formData.imageFile, 'image')
      }

      if (formData.videoFile) {
        videoUrl = await uploadFile(formData.videoFile, 'video')
      }

      if (!formData.imageFile && !formData.videoFile) {
        throw new Error('Lütfen bir fotoğraf veya video seçin')
      }

      if (!supabase) {
        throw new Error('Supabase bağlantısı yok. Lütfen .env dosyasını kontrol edin.')
      }

      const { error } = await supabase
        .from('memories')
        .insert([
          {
            month: formData.month,
            title: formData.title,
            description: formData.description,
            order_id: formData.order_id,
            image_url: imageUrl || null,
            video_url: videoUrl || null,
          },
        ])

      if (error) throw error

      setMessage('Anı başarıyla eklendi! ❤️')
      setFormData({
        month: 'Ocak',
        title: '',
        description: '',
        order_id: 1,
        imageFile: null,
        videoFile: null,
      })
      
      // Reset file inputs
      const fileInputs = document.querySelectorAll('input[type="file"]')
      fileInputs.forEach(input => input.value = '')
    } catch (error) {
      console.error('Error adding memory:', error)
      setMessage(`Hata: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-effect rounded-2xl p-8 md:p-12 max-w-md w-full shadow-2xl"
        >
          <div className="text-center mb-6">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Lock className="w-12 h-12 text-romantic-rose mx-auto mb-4" />
            </motion.div>
            <h1 className="text-3xl font-bold text-romantic-deepRed mb-2">
              Admin Girişi
            </h1>
            <p className="text-romantic-deepRed/80 mb-2">
              Anı eklemek için şifrenizi girin
            </p>
            <p className="text-xs text-romantic-deepRed/60">
              Şifre: <span className="font-mono bg-romantic-pink/30 px-2 py-1 rounded">betul2025</span>
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setMessage('')
                }}
                placeholder="Şifre girin"
                className="w-full px-4 py-3 rounded-lg border-2 border-romantic-pink focus:border-romantic-rose focus:outline-none text-romantic-deepRed transition-all"
                required
                autoFocus
              />
            </div>
            {message && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-600 text-sm text-center bg-red-50 p-2 rounded"
              >
                {message}
              </motion.p>
            )}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-romantic-rose to-romantic-pink text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow"
            >
              Giriş Yap
            </motion.button>
          </form>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-20 px-4 z-10 relative">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-effect rounded-2xl p-8 md:p-12 shadow-2xl"
        >
          <div className="flex items-center justify-center mb-6">
            <Heart className="w-8 h-8 text-romantic-rose fill-romantic-rose mr-2" />
            <h1 className="text-3xl md:text-4xl font-bold text-romantic-deepRed">
              Anı Ekle
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-romantic-deepRed font-semibold mb-2">
                Ay
              </label>
              <select
                value={formData.month}
                onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border-2 border-romantic-pink focus:border-romantic-rose focus:outline-none text-romantic-deepRed bg-white"
                required
              >
                {monthOptions.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-romantic-deepRed font-semibold mb-2">
                Sıra (1-12)
              </label>
              <input
                type="number"
                min="1"
                max="12"
                value={formData.order_id}
                onChange={(e) => setFormData({ ...formData, order_id: parseInt(e.target.value) })}
                className="w-full px-4 py-3 rounded-lg border-2 border-romantic-pink focus:border-romantic-rose focus:outline-none text-romantic-deepRed"
                required
              />
            </div>

            <div>
              <label className="block text-romantic-deepRed font-semibold mb-2">
                Başlık
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border-2 border-romantic-pink focus:border-romantic-rose focus:outline-none text-romantic-deepRed"
                required
              />
            </div>

            <div>
              <label className="block text-romantic-deepRed font-semibold mb-2">
                Açıklama
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows="4"
                className="w-full px-4 py-3 rounded-lg border-2 border-romantic-pink focus:border-romantic-rose focus:outline-none text-romantic-deepRed resize-none"
                required
              />
            </div>

            <div>
              <label className="block text-romantic-deepRed font-semibold mb-2">
                Fotoğraf veya Video
              </label>
              <div className="space-y-3">
                <div className="flex items-center gap-4 flex-wrap">
                  <label className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-romantic-rose to-romantic-pink text-white rounded-lg cursor-pointer hover:shadow-lg transition-shadow">
                    <Upload className="w-5 h-5" />
                    <span>Fotoğraf Seç</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                  <label className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-romantic-pink to-romantic-rose text-white rounded-lg cursor-pointer hover:shadow-lg transition-shadow">
                    <Upload className="w-5 h-5" />
                    <span>Video Seç</span>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleVideoChange}
                      className="hidden"
                    />
                  </label>
                </div>
                {formData.imageFile && (
                  <div className="flex items-center gap-2 text-romantic-deepRed bg-romantic-pink/20 p-2 rounded">
                    <span className="text-sm">📷 Fotoğraf:</span>
                    <span className="text-sm font-medium">{formData.imageFile.name}</span>
                  </div>
                )}
                {formData.videoFile && (
                  <div className="flex items-center gap-2 text-romantic-deepRed bg-romantic-pink/20 p-2 rounded">
                    <span className="text-sm">🎥 Video:</span>
                    <span className="text-sm font-medium">{formData.videoFile.name}</span>
                    <span className="text-xs text-romantic-deepRed/60">
                      ({(formData.videoFile.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                  </div>
                )}
                <p className="text-xs text-romantic-deepRed/60">
                  💡 Not: Fotoğraf veya video seçebilirsiniz. Video seçildiğinde otomatik olarak sürekli oynatılacak.
                </p>
              </div>
            </div>

            {message && (
              <div className={`p-4 rounded-lg ${message.includes('Hata') ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-romantic-rose to-romantic-pink text-white py-4 rounded-lg font-semibold text-lg hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Ekleniyor...</span>
                </>
              ) : (
                <>
                  <Heart className="w-5 h-5 fill-white" />
                  <span>Anıyı Ekle</span>
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default Admin

