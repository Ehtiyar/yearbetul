import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

const LoveNote = () => {
  return (
    <section className="py-20 px-4 z-10 relative">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-effect rounded-3xl p-8 md:p-12 shadow-2xl"
        >
          <div className="flex items-center justify-center mb-6">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Heart className="w-12 h-12 text-romantic-rose fill-romantic-rose" />
            </motion.div>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-center text-romantic-deepRed mb-8 text-shadow-romantic">
            Sevgili Betül'e
          </h2>

          <div className="space-y-6 text-lg md:text-xl text-romantic-deepRed/90 leading-relaxed">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Bu yıl seninle geçirdiğimiz her an, bana hayatın en güzel hediyelerinden biri olduğunu hatırlattı.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              Her gülüşün, her anı, her birlikte geçirdiğimiz an, kalbimde özel bir yer edindi.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              Yeni yılda da birlikte daha fazla güzel anı biriktirmeyi, birlikte büyümeyi ve birbirimizi daha çok sevmeyi diliyorum.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="text-center text-2xl md:text-3xl font-bold text-romantic-rose mt-8"
            >
              Seni çok seviyorum ❤️
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default LoveNote

