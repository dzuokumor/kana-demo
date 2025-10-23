import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera, OrbitControls, Environment } from '@react-three/drei'
import { EffectComposer, Bloom, DepthOfField, Vignette } from '@react-three/postprocessing'
import DiscoBall from './components/DiscoBall'
import CardCarousel from './components/CardCarousel'
import SuspensionString from './components/SuspensionString'
import BackgroundEffects from './components/BackgroundEffects'
import DanceTileCard from './components/DanceTileCard'
import Carousel from './components/Carousel'
import './App.css'

function App() {
  return (
    <div className="app">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">KANA</div>
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#events">Events</a></li>
            <li><a href="#testimonials">Testimonials</a></li>
            <li><a href="#gallery">Gallery</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <button className="nav-cta">Join Now</button>
        </div>
      </nav>

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

      {/* Disco Ball Showcase Section */}
      <section className="disco-ball-section">
        <div className="disco-ball-container">
          <Canvas
            shadows
            style={{ touchAction: 'none', background: '#0a0514' }}
            gl={{
              antialias: true,
              alpha: false,
              powerPreference: 'high-performance',
              toneMapping: 2
            }}
            camera={{ position: [0, 2, 8], fov: 75 }}
          >
            <color attach="background" args={['#0a0514']} />
            <fog attach="fog" args={['#0a0514', 15, 45]} />

            <OrbitControls
              enableZoom={false}
              enablePan={true}
              enableRotate={true}
              autoRotate={false}
              minDistance={8}
              maxDistance={8}
            />

            {/* Enhanced Lighting */}
            <ambientLight intensity={0.05} color="#1a1a2e" />
            <hemisphereLight
              skyColor="#4a0e4e"
              groundColor="#0a0514"
              intensity={0.1}
            />

            {/* Environment map for chrome reflections */}
            {/* <Environment preset="night" /> */}

            {/* Background atmosphere - REMOVED due to 2D appearance */}
            {/* <BackgroundEffects /> */}

            {/* 3D Scene Elements */}
            <SuspensionString />
            <DiscoBall position={[0, 0, 0]} />
            <CardCarousel />

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
      </section>

      {/* About Section */}
      <section className="section about-section" id="about">
        <div className="section-container">
          <h2 className="section-title">About KANA</h2>
          <p className="section-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p className="section-text">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
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
            />
            <DanceTileCard
              title="VIP Experience"
              description="Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Exclusive access to premium lounges and bottle service."
              delay={0.1}
            />
            <DanceTileCard
              title="Private Parties"
              description="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. Host your special events in our luxurious venue."
              delay={0.2}
            />
            <DanceTileCard
              title="Premium Sound"
              description="Duis aute irure dolor in reprehenderit in voluptate velit esse. State-of-the-art audio and lighting systems."
              delay={0.3}
            />
            <DanceTileCard
              title="Exclusive Bar"
              description="Excepteur sint occaecat cupidatat non proident, sunt in culpa. Craft cocktails and premium spirits selection."
              delay={0.4}
            />
            <DanceTileCard
              title="Late Night"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dancing until dawn in the heart of the city."
              delay={0.5}
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
          <div className="gallery-grid">
            <div className="gallery-placeholder">Image 1</div>
            <div className="gallery-placeholder">Image 2</div>
            <div className="gallery-placeholder">Image 3</div>
            <div className="gallery-placeholder">Image 4</div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section contact-section" id="contact">
        <div className="section-container">
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <button className="contact-button">Contact Us</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <p>&copy; 2024 KANA Club. All rights reserved.</p>
          <div className="social-links">
            <a href="#" className="social-link">Instagram</a>
            <a href="#" className="social-link">Facebook</a>
            <a href="#" className="social-link">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
