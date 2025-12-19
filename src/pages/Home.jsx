import Hero from '../components/Hero'
import Timeline from '../components/Timeline'
import LoveNote from '../components/LoveNote'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div className="relative">
      <Hero />
      <Timeline />
      <LoveNote />
      <Footer />
    </div>
  )
}

export default Home

