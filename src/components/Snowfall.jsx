import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const Snowfall = () => {
  const [snowflakes, setSnowflakes] = useState([])

  useEffect(() => {
    const createSnowflake = () => ({
      id: Math.random(),
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 10,
      size: 4 + Math.random() * 4,
    })

    const flakes = Array.from({ length: 50 }, createSnowflake)
    setSnowflakes(flakes)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {snowflakes.map((flake) => (
        <motion.div
          key={flake.id}
          className="absolute rounded-full bg-white opacity-60"
          style={{
            left: `${flake.left}%`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            top: '-10px',
          }}
          animate={{
            y: window.innerHeight + 20,
            x: [0, Math.random() * 50 - 25, 0],
          }}
          transition={{
            duration: flake.duration,
            delay: flake.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  )
}

export default Snowfall

