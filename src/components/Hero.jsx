import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

const Hero = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const newYear = new Date('2026-01-01T00:00:00').getTime()
      const now = new Date().getTime()
      const difference = newYear - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      }
    }

    calculateTimeLeft()
    const interval = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(interval)
  }, [])

  const countdownItems = [
    { label: 'Gün', value: timeLeft.days },
    { label: 'Saat', value: timeLeft.hours },
    { label: 'Dakika', value: timeLeft.minutes },
    { label: 'Saniye', value: timeLeft.seconds },
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20 z-10">
      <div className="text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block mb-6"
          >
            <Heart className="w-16 h-16 text-romantic-rose mx-auto fill-romantic-rose" />
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-romantic-deepRed mb-4 text-shadow-romantic"
            animate={{ 
              textShadow: [
                "2px 2px 4px rgba(0, 0, 0, 0.1)",
                "2px 2px 20px rgba(255, 105, 180, 0.5)",
                "2px 2px 4px rgba(0, 0, 0, 0.1)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
          >
            Hoş Geldin Betül
          </motion.h1>
          
          <motion.p 
            className="text-2xl md:text-3xl text-romantic-deepRed/80 mb-12 font-light"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Seninle geçen harika bir yılın hikayesi...
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="glass-effect rounded-2xl p-8 md:p-12 shadow-2xl"
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-romantic-deepRed mb-6">
            Yeni Yıla Kalan Süre
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {countdownItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 0.7 + index * 0.1, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.1, rotate: 5, transition: { duration: 0.2 } }}
                className="bg-gradient-to-br from-romantic-pink to-romantic-rose rounded-xl p-4 md:p-6 shadow-lg cursor-pointer"
              >
                <motion.div 
                  key={item.value}
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-3xl md:text-5xl font-bold text-white mb-2"
                >
                  {String(item.value).padStart(2, '0')}
                </motion.div>
                <div className="text-sm md:text-base text-white/90 font-medium">
                  {item.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero

