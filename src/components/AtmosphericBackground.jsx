import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function AtmosphericBackground() {
  const lightsRef = useRef([])
  const particlesRef = useRef()

  // Create atmospheric particles
  const particlesGeometry = new THREE.BufferGeometry()
  const particleCount = 1000
  const positions = new Float32Array(particleCount * 3)

  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 50
    positions[i + 1] = (Math.random() - 0.5) * 50
    positions[i + 2] = (Math.random() - 0.5) * 50
  }

  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime()

    // Animate colored lights orbiting
    if (lightsRef.current) {
      lightsRef.current.forEach((light, index) => {
        if (light) {
          const angle = (time * 0.3) + (index * Math.PI * 2) / 5
          const radius = 15
          light.position.x = Math.cos(angle) * radius
          light.position.z = Math.sin(angle) * radius
          light.position.y = Math.sin(time * 0.5 + index) * 3
        }
      })
    }

    // Slowly drift particles
    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * 0.02
    }
  })

  return (
    <>
      {/* Ambient lighting */}
      <ambientLight intensity={0.05} color="#1a1a2e" />
      <hemisphereLight
        skyColor="#4a0e4e"
        groundColor="#0a0514"
        intensity={0.1}
      />

      {/* Orbiting colored point lights */}
      <pointLight
        ref={(el) => (lightsRef.current[0] = el)}
        color="#ff006e"
        intensity={1.5}
        distance={30}
        decay={2}
      />
      <pointLight
        ref={(el) => (lightsRef.current[1] = el)}
        color="#00ffff"
        intensity={1.5}
        distance={30}
        decay={2}
      />
      <pointLight
        ref={(el) => (lightsRef.current[2] = el)}
        color="#bf00ff"
        intensity={1.5}
        distance={30}
        decay={2}
      />
      <pointLight
        ref={(el) => (lightsRef.current[3] = el)}
        color="#00ff88"
        intensity={1.5}
        distance={30}
        decay={2}
      />
      <pointLight
        ref={(el) => (lightsRef.current[4] = el)}
        color="#ff8800"
        intensity={1.5}
        distance={30}
        decay={2}
      />

      {/* Atmospheric particles */}
      <points ref={particlesRef} geometry={particlesGeometry}>
        <pointsMaterial
          size={0.05}
          color="#ffffff"
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </>
  )
}

export default AtmosphericBackground
