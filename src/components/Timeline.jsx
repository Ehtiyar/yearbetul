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
      const { data, error } = await supabase
        .from('memories')
        .select('*')
        .order('order_id', { ascending: true })

      if (error) throw error
      setMemories(data || [])
    } catch (err) {
      console.error('Error fetching memories:', err)
      setError(err.message)
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
          <p className="text-xl text-romantic-deepRed">Bir hata oluştu: {error}</p>
        </div>
      </section>
    )
  }

  if (memories.length === 0) {
    return (
      <section className="py-20 px-4 z-10 relative">
        <div className="max-w-7xl mx-auto text-center">
          <Heart className="w-16 h-16 text-romantic-rose mx-auto mb-4" />
          <p className="text-xl text-romantic-deepRed">Henüz anı eklenmemiş...</p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 px-4 z-10 relative">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center text-romantic-deepRed mb-12 text-shadow-romantic"
        >
          Bizim Yılımız
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {memories.map((memory, index) => (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="glass-effect rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300"
            >
              {memory.image_url && (
                <div className="relative h-64 overflow-hidden">
                  <motion.img
                    src={memory.image_url}
                    alt={memory.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="absolute top-4 left-4 bg-romantic-rose/90 text-white px-4 py-2 rounded-full font-semibold text-sm">
                    {memory.month}
                  </div>
                </div>
              )}
              
              <div className="p-6">
                <h3 className="text-2xl font-bold text-romantic-deepRed mb-3">
                  {memory.title}
                </h3>
                <p className="text-romantic-deepRed/80 leading-relaxed">
                  {memory.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Timeline

