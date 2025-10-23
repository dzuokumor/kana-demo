import { useState, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import { FiMusic, FiStar, FiMapPin, FiMail, FiPhone } from 'react-icons/fi'
import ScrollPositionedScene from './components/ScrollPositionedScene'
import DanceTileCard from './components/DanceTileCard'
import Carousel from './components/Carousel'
import DJPlayer from './components/DJPlayer'
import './App.css'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const scrollHelperRef = useRef(null)

  // Scroll helper functionality
  useEffect(() => {
    const scrollHelper = scrollHelperRef.current
    if (!scrollHelper) return

    let startY = 0
    let startScrollY = 0

    const handleStart = (e) => {
      startY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY
      startScrollY = window.scrollY
    }

    const handleMove = (e) => {
      e.preventDefault()
      const currentY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY
      const deltaY = (currentY - startY) * 2 // Multiply for more sensitive scrolling
      window.scrollTo(0, startScrollY - deltaY)
    }

    const handleEnd = () => {
      // Smooth scroll behavior after drag
      document.documentElement.style.scrollBehavior = 'smooth'
      setTimeout(() => {
        document.documentElement.style.scrollBehavior = 'auto'
      }, 300)
    }

    // Mouse events
    scrollHelper.addEventListener('mousedown', handleStart)
    window.addEventListener('mousemove', (e) => {
      if (e.buttons === 1) handleMove(e)
    })
    window.addEventListener('mouseup', handleEnd)

    // Touch events
    scrollHelper.addEventListener('touchstart', handleStart, { passive: false })
    scrollHelper.addEventListener('touchmove', handleMove, { passive: false })
    scrollHelper.addEventListener('touchend', handleEnd)

    return () => {
      scrollHelper.removeEventListener('mousedown', handleStart)
      scrollHelper.removeEventListener('touchstart', handleStart)
      scrollHelper.removeEventListener('touchmove', handleMove)
      scrollHelper.removeEventListener('touchend', handleEnd)
    }
  }, [])

  return (
    <div className="app">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">KANA</div>

          {/* Hamburger Menu Button */}
          <button
            className={`hamburger ${menuOpen ? 'active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
            <li><a href="#home" onClick={() => setMenuOpen(false)}>Home</a></li>
            <li><a href="#about" onClick={() => setMenuOpen(false)}>About</a></li>
            <li><a href="#events" onClick={() => setMenuOpen(false)}>Events</a></li>
            <li><a href="#testimonials" onClick={() => setMenuOpen(false)}>Testimonials</a></li>
            <li><a href="#gallery" onClick={() => setMenuOpen(false)}>Gallery</a></li>
            <li><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a></li>
          </ul>
        </div>
      </nav>

      {/* Full-Page 3D Canvas - Atmospheric + Disco Ball */}
      <div className="canvas-background">
        <Canvas
          shadows
          style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'auto' }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
            toneMapping: 2
          }}
          camera={{
            position: [0, 4, 8],
            fov: window.innerWidth <= 768 ? 85 : 75
          }}
        >
          <color attach="background" args={['#0a0514']} />
          <fog attach="fog" args={['#0a0514', 15, 45]} />

          <OrbitControls
            enableZoom={false}
            enablePan={true}
            enableRotate={true}
            autoRotate={false}
            minDistance={window.innerWidth <= 768 ? 10 : 8}
            maxDistance={window.innerWidth <= 768 ? 10 : 8}
            rotateSpeed={window.innerWidth <= 768 ? 0.8 : 1}
            enableDamping={true}
            dampingFactor={0.05}
          />

          {/* Scroll-positioned scene with everything */}
          <ScrollPositionedScene />

          {/* Post-Processing Effects */}
          <EffectComposer multisampling={0}>
            <Bloom
              intensity={1.5}
              luminanceThreshold={0.15}
              luminanceSmoothing={0.9}
            />
            <Vignette
              darkness={0.5}
              offset={0.3}
            />
          </EffectComposer>
        </Canvas>
      </div>

      {/* Content Layer */}
      <div className="content-layer">
        {/* Hero Section */}
        <section className="hero-section" id="home">
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="glow-text">KANA</span>
            </h1>
            <p className="hero-subtitle">Where The Night Comes Alive</p>
            <p className="hero-description">
              Experience the ultimate nightlife destination. Premium music, exclusive events, and unforgettable moments.
            </p>
          </div>
        </section>

        {/* Disco Ball Showcase Section - Spacer */}
        <section className="disco-ball-section">
          <div className="disco-ball-spacer">
            {/* Empty - disco ball is in the fixed background canvas */}
          </div>

          {/* Scroll Helper */}
          <div className="scroll-helper" ref={scrollHelperRef}>
            <div className="scroll-helper-line"></div>
            <div className="scroll-helper-indicator">
              <span className="scroll-dot"></span>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="section about-section" id="about">
          <div className="section-container">
            <h2 className="section-title">About KANA</h2>
            <div className="about-content">
              <div className="about-card">
                <div className="about-card-icon">
                  <FiMusic />
                </div>
                <h3 className="about-card-title">Our Story</h3>
                <p className="about-card-text">
                  KANA was born from a passion for bringing people together through music and unforgettable experiences. We've created a space where energy, creativity, and community thrive.
                </p>
              </div>
              <div className="about-card">
                <div className="about-card-icon">
                  <FiStar />
                </div>
                <h3 className="about-card-title">The Experience</h3>
                <p className="about-card-text">
                  From world-class DJs to state-of-the-art sound systems, every detail is crafted to deliver an immersive nightlife experience that goes beyond the ordinary.
                </p>
              </div>
              <div className="about-card">
                <div className="about-card-icon">
                  <FiMapPin />
                </div>
                <h3 className="about-card-title">The Venue</h3>
                <p className="about-card-text">
                  Located in the heart of the city, our premium venue combines cutting-edge technology with luxurious design to create the ultimate entertainment destination.
                </p>
              </div>
            </div>
          </div>
        </section>

      {/* Features Section with Dance Tiles */}
      <section className="section features-section" id="events">
        <div className="section-container">
          <h2 className="section-title">What We Offer</h2>
          <div className="tiles-grid">
            <DanceTileCard
              title="Live Events"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Experience world-class DJs and performers every weekend."
              delay={0}
              spotlightColor="rgba(255, 0, 110, 0.3)"
            />
            <DanceTileCard
              title="VIP Experience"
              description="Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Exclusive access to premium lounges and bottle service."
              delay={0.1}
              spotlightColor="rgba(0, 255, 255, 0.3)"
            />
            <DanceTileCard
              title="Private Parties"
              description="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. Host your special events in our luxurious venue."
              delay={0.2}
              spotlightColor="rgba(191, 0, 255, 0.3)"
            />
            <DanceTileCard
              title="Premium Sound"
              description="Duis aute irure dolor in reprehenderit in voluptate velit esse. State-of-the-art audio and lighting systems."
              delay={0.3}
              spotlightColor="rgba(0, 255, 136, 0.3)"
            />
            <DanceTileCard
              title="Exclusive Bar"
              description="Excepteur sint occaecat cupidatat non proident, sunt in culpa. Craft cocktails and premium spirits selection."
              delay={0.4}
              spotlightColor="rgba(255, 136, 0, 0.3)"
            />
            <DanceTileCard
              title="Late Night"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dancing until dawn in the heart of the city."
              delay={0.5}
              spotlightColor="rgba(255, 0, 220, 0.3)"
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section testimonials-section" id="testimonials">
        <div className="section-container">
          <h2 className="section-title">What People Say</h2>
          <p className="section-text">
            Hear from our amazing community about their experiences at KANA.
          </p>
          <div className="carousel-wrapper">
            <Carousel
              baseWidth={350}
              autoplay={true}
              autoplayDelay={4000}
              pauseOnHover={true}
              loop={true}
              round={false}
            />
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="section gallery-section" id="gallery">
        <div className="section-container">
          <h2 className="section-title">Gallery</h2>
          <p className="section-text">Experience the energy and vibes from our unforgettable nights</p>
          <div className="gallery-grid">
            <div className="gallery-item">
              <img src="/images/gallery/party1.jpg" alt="Club night 1" />
              <div className="gallery-overlay">
                <span className="gallery-label">Electric Nights</span>
              </div>
            </div>
            <div className="gallery-item">
              <img src="/images/gallery/party2.jpg" alt="Club night 2" />
              <div className="gallery-overlay">
                <span className="gallery-label">VIP Experience</span>
              </div>
            </div>
            <div className="gallery-item">
              <img src="/images/gallery/party3.jpg" alt="Club night 3" />
              <div className="gallery-overlay">
                <span className="gallery-label">Live Performances</span>
              </div>
            </div>
            <div className="gallery-item">
              <img src="/images/gallery/party4.jpg" alt="Club night 4" />
              <div className="gallery-overlay">
                <span className="gallery-label">Dance Floor</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section contact-section" id="contact">
        <div className="section-container">
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-text">
            Ready to experience the ultimate nightlife? Reach out for VIP reservations, event bookings, or general inquiries.
          </p>
          <div className="contact-grid">
            <div className="contact-card">
              <div className="contact-icon">
                <FiMail />
              </div>
              <h3 className="contact-label">Email</h3>
              <p className="contact-info">info@kanaclub.com</p>
            </div>
            <div className="contact-card">
              <div className="contact-icon">
                <FiPhone />
              </div>
              <h3 className="contact-label">Phone</h3>
              <p className="contact-info">+1 (555) 123-4567</p>
            </div>
            <div className="contact-card">
              <div className="contact-icon">
                <FiMapPin />
              </div>
              <h3 className="contact-label">Location</h3>
              <p className="contact-info">Downtown District</p>
            </div>
          </div>
          <button className="contact-button">Book VIP Table</button>
        </div>
      </section>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-container">
            <p>&copy; 2025 KANA Club. All rights reserved. <span className="developer-divider">|</span> <a href="https://zuokumor-david-portfolio.vercel.app" target="_blank" rel="noopener noreferrer" className="developer-link">Developer</a></p>
            <div className="social-links">
              <a href="#" className="social-link">Instagram</a>
              <a href="#" className="social-link">Facebook</a>
              <a href="#" className="social-link">Twitter</a>
            </div>
          </div>
        </footer>
      </div>

      {/* DJ Music Player */}
      <DJPlayer />
    </div>
  )
}

export default App
