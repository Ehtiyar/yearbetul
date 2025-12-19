import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="py-12 px-4 z-10 relative">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: "spring" }}
          className="flex items-center justify-center gap-2 mb-4"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.3, 1],
              rotate: [0, 15, -15, 0]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Heart className="w-6 h-6 text-romantic-rose fill-romantic-rose" />
          </motion.div>
          <motion.p 
            className="text-2xl md:text-3xl font-bold text-romantic-deepRed"
            animate={{ 
              textShadow: [
                "2px 2px 4px rgba(0, 0, 0, 0.1)",
                "2px 2px 15px rgba(255, 105, 180, 0.6)",
                "2px 2px 4px rgba(0, 0, 0, 0.1)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
          >
            Seni Seviyorum
          </motion.p>
          <motion.div
            animate={{ 
              scale: [1, 1.3, 1],
              rotate: [0, -15, 15, 0]
            }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          >
            <Heart className="w-6 h-6 text-romantic-rose fill-romantic-rose" />
          </motion.div>
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

