import { motion } from 'framer-motion'
import Hero from '../components/Hero'
import Timeline from '../components/Timeline'
import LoveNote from '../components/LoveNote'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <motion.div 
      className="relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <Timeline />
      <LoveNote />
      <Footer />
    </motion.div>
  )
}

export default Home

