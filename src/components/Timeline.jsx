import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Heart, Loader2 } from 'lucide-react'
import { supabase } from '../supabaseClient'

const monthNames = {
  'Ocak': 'January',
  'Şubat': 'February',
  'Mart': 'March',
  'Nisan': 'April',
  'Mayıs': 'May',
  'Haziran': 'June',
  'Temmuz': 'July',
  'Ağustos': 'August',
  'Eylül': 'September',
  'Ekim': 'October',
  'Kasım': 'November',
  'Aralık': 'December',
}

const Timeline = () => {
  const [memories, setMemories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchMemories()
  }, [])

  const fetchMemories = async () => {
    try {
      setLoading(true)
      
      if (!supabase) {
        throw new Error('Supabase bağlantısı yok. Lütfen .env dosyasını kontrol edin.')
      }

      const { data, error } = await supabase
        .from('memories')
        .select('*')
        .order('order_id', { ascending: true })

      if (error) throw error
      setMemories(data || [])
    } catch (err) {
      console.error('Error fetching memories:', err)
      setError(err.message)
      // Hata olsa bile boş array set et ki uygulama çalışmaya devam etsin
      setMemories([])
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-20 px-4 z-10 relative">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="inline-block"
          >
            <Heart className="w-16 h-16 text-romantic-rose fill-romantic-rose mx-auto" />
          </motion.div>
          <p className="mt-4 text-xl text-romantic-deepRed">Anılar yükleniyor...</p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-20 px-4 z-10 relative">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="glass-effect rounded-2xl p-8 max-w-md mx-auto"
          >
            <Heart className="w-16 h-16 text-romantic-rose mx-auto mb-4" />
            <p className="text-xl text-romantic-deepRed mb-2">Supabase Bağlantı Hatası</p>
            <p className="text-sm text-romantic-deepRed/70 mb-4">{error}</p>
            <p className="text-sm text-romantic-deepRed/60">
              Lütfen .env dosyasını kontrol edin veya admin panelinden anı ekleyin.
            </p>
          </motion.div>
        </div>
      </section>
    )
  }

  if (memories.length === 0) {
    return (
      <section className="py-20 px-4 z-10 relative">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-effect rounded-2xl p-8 max-w-md mx-auto"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Heart className="w-16 h-16 text-romantic-rose fill-romantic-rose mx-auto mb-4" />
            </motion.div>
            <p className="text-xl text-romantic-deepRed mb-2">Henüz anı eklenmemiş...</p>
            <p className="text-sm text-romantic-deepRed/70">
              İlk anınızı eklemek için /admin sayfasını ziyaret edin.
            </p>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 px-4 z-10 relative">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          className="text-4xl md:text-5xl font-bold text-center text-romantic-deepRed mb-12 text-shadow-romantic"
          animate={{
            textShadow: [
              "2px 2px 4px rgba(0, 0, 0, 0.1)",
              "2px 2px 15px rgba(255, 105, 180, 0.4)",
              "2px 2px 4px rgba(0, 0, 0, 0.1)"
            ]
          }}
          transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
        >
          Bizim Yılımız
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {memories.map((memory, index) => (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, y: 50, scale: 0.9, rotate: -2 }}
              whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                delay: index * 0.15, 
                duration: 0.6,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                scale: 1.05, 
                rotate: 2,
                transition: { duration: 0.3 }
              }}
              className="glass-effect rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >
              {memory.image_url && (
                <div className="relative h-64 overflow-hidden">
                  <motion.img
                    src={memory.image_url}
                    alt={memory.title}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.1 }}
                    whileInView={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <motion.div 
                    className="absolute top-4 left-4 bg-romantic-rose/90 text-white px-4 py-2 rounded-full font-semibold text-sm"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.15 + 0.3 }}
                  >
                    {memory.month}
                  </motion.div>
                </div>
              )}
              
              <motion.div 
                className="p-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.15 + 0.4 }}
              >
                <motion.h3 
                  className="text-2xl font-bold text-romantic-deepRed mb-3"
                  whileHover={{ color: "#FF69B4", transition: { duration: 0.2 } }}
                >
                  {memory.title}
                </motion.h3>
                <p className="text-romantic-deepRed/80 leading-relaxed">
                  {memory.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Timeline

