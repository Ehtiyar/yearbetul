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
  })

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      setMessage('')
    } else {
      setMessage('Yanlış şifre!')
    }
  }

  const handleFileChange = (e) => {
    setFormData({ ...formData, imageFile: e.target.files[0] })
  }

  const uploadImage = async (file) => {
    try {
      if (!supabase) {
        throw new Error('Supabase bağlantısı yok. Lütfen .env dosyasını kontrol edin.')
      }

      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
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
      console.error('Error uploading image:', error)
      throw error
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      let imageUrl = ''

      if (formData.imageFile) {
        imageUrl = await uploadImage(formData.imageFile)
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
            image_url: imageUrl,
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
      })
      
      // Reset file input
      const fileInput = document.querySelector('input[type="file"]')
      if (fileInput) fileInput.value = ''
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
            <Lock className="w-12 h-12 text-romantic-rose mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-romantic-deepRed mb-2">
              Admin Girişi
            </h1>
            <p className="text-romantic-deepRed/80">
              Anı eklemek için şifrenizi girin
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Şifre"
              className="w-full px-4 py-3 rounded-lg border-2 border-romantic-pink focus:border-romantic-rose focus:outline-none text-romantic-deepRed"
              required
            />
            {message && (
              <p className="text-red-600 text-sm">{message}</p>
            )}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-romantic-rose to-romantic-pink text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow"
            >
              Giriş Yap
            </button>
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
                Fotoğraf
              </label>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-romantic-rose to-romantic-pink text-white rounded-lg cursor-pointer hover:shadow-lg transition-shadow">
                  <Upload className="w-5 h-5" />
                  <span>Fotoğraf Seç</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
                {formData.imageFile && (
                  <span className="text-romantic-deepRed">
                    {formData.imageFile.name}
                  </span>
                )}
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

