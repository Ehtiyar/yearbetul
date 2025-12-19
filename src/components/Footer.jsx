import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="py-12 px-4 z-10 relative">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-2 mb-4"
        >
          <Heart className="w-6 h-6 text-romantic-rose fill-romantic-rose" />
          <p className="text-2xl md:text-3xl font-bold text-romantic-deepRed">
            Seni Seviyorum
          </p>
          <Heart className="w-6 h-6 text-romantic-rose fill-romantic-rose" />
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-xl md:text-2xl text-romantic-deepRed/80 font-light"
        >
          2025'ten Sonsuzluğa
        </motion.p>
      </div>
    </footer>
  )
}

export default Footer

