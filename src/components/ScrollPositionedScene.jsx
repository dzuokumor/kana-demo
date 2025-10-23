import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import DiscoBall from './DiscoBall'
import CardCarousel from './CardCarousel'
import SuspensionString from './SuspensionString'
import AtmosphericBackground from './AtmosphericBackground'

function ScrollPositionedScene() {
  const groupRef = useRef()
  const { camera } = useThree()

  useEffect(() => {
    // Initial camera setup - angled more upward
    camera.position.set(0, 4, 8)
    camera.lookAt(0, 0, 0)
  }, [camera])

  useFrame(() => {
    if (groupRef.current) {
      // Calculate scroll position
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight

      // Hero section is roughly 60vh, disco ball section starts after that
      // We want the disco ball to be visible when scrolled to its section
      const heroHeight = windowHeight * 0.6
      const discoBallSectionStart = heroHeight
      const discoBallSectionMiddle = discoBallSectionStart + (windowHeight / 2)

      // Calculate vertical offset based on scroll
      // When at disco ball section, offset should be 0
      const targetY = -(scrollY - discoBallSectionMiddle) * 0.01

      // Smooth lerp for camera movement
      camera.position.y += (targetY + 2 - camera.position.y) * 0.05
    }
  })

  return (
    <>
      {/* Atmospheric background - always visible */}
      <AtmosphericBackground />

      {/* Disco ball scene - positioned in 3D space */}
      <group ref={groupRef}>
        <SuspensionString />
        <DiscoBall position={[0, 0, 0]} />
        <CardCarousel />
      </group>
    </>
  )
}

export default ScrollPositionedScene
