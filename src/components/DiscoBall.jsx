import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

function DiscoBall({ position = [0, 0, 0] }) {
  const modelRef = useRef()
  const light1Ref = useRef()
  const light2Ref = useRef()
  const light3Ref = useRef()
  const light4Ref = useRef()
  const light5Ref = useRef()

  console.log('DiscoBall component rendering with GLB model')

  // Load the GLB disco ball model
  const { scene } = useGLTF('/models/disco-ball.glb')

  // Reduce brightness of emissive materials in the model
  scene.traverse((child) => {
    if (child.isMesh && child.material) {
      if (child.material.emissive && child.material.emissiveIntensity > 0) {
        child.material.emissiveIntensity = child.material.emissiveIntensity * 0.2
      }
    }
  })


  useFrame(({ clock }) => {
    const time = clock.getElapsedTime()

    // Rotate the disco ball model
    if (modelRef.current) {
      modelRef.current.rotation.y = time * 0.3
    }

    // Orbit colored lights - 5 lights at different speeds
    const orbitRadius = 3.0
    const orbitSpeed = 0.5

    // Pink light
    if (light1Ref.current) {
      const angle1 = time * orbitSpeed
      light1Ref.current.position.x = Math.sin(angle1) * orbitRadius
      light1Ref.current.position.z = Math.cos(angle1) * orbitRadius
      light1Ref.current.position.y = 2
    }

    // Cyan light
    if (light2Ref.current) {
      const angle2 = time * orbitSpeed + (Math.PI * 2 / 5)
      light2Ref.current.position.x = Math.sin(angle2) * orbitRadius
      light2Ref.current.position.z = Math.cos(angle2) * orbitRadius
      light2Ref.current.position.y = 1.5
    }

    // Purple light
    if (light3Ref.current) {
      const angle3 = time * orbitSpeed + (Math.PI * 4 / 5)
      light3Ref.current.position.x = Math.sin(angle3) * orbitRadius
      light3Ref.current.position.z = Math.cos(angle3) * orbitRadius
      light3Ref.current.position.y = 1.8
    }

    // Green light
    if (light4Ref.current) {
      const angle4 = time * orbitSpeed * 0.8 + (Math.PI * 6 / 5)
      light4Ref.current.position.x = Math.sin(angle4) * orbitRadius * 0.9
      light4Ref.current.position.z = Math.cos(angle4) * orbitRadius * 0.9
      light4Ref.current.position.y = 1.2
    }

    // Orange light
    if (light5Ref.current) {
      const angle5 = time * orbitSpeed * 1.2 + (Math.PI * 8 / 5)
      light5Ref.current.position.x = Math.sin(angle5) * orbitRadius * 1.1
      light5Ref.current.position.z = Math.cos(angle5) * orbitRadius * 1.1
      light5Ref.current.position.y = 1.6
    }
  })

  return (
    <group position={position}>
      {/* GLB Disco Ball Model */}
      <primitive
        ref={modelRef}
        object={scene.clone()}
        scale={6.75}
      />

      <pointLight
        ref={light1Ref}
        color="#ff006e"
        intensity={3}
        distance={15}
        decay={2}
        castShadow
      />

      {/* CYAN LIGHT - Orbiting */}
      <pointLight
        ref={light2Ref}
        color="#00ffff"
        intensity={3}
        distance={15}
        decay={2}
        castShadow
      />

      {/* PURPLE LIGHT - Orbiting */}
      <pointLight
        ref={light3Ref}
        color="#bf00ff"
        intensity={3}
        distance={15}
        decay={2}
        castShadow
      />

      {/* GREEN LIGHT - Orbiting */}
      <pointLight
        ref={light4Ref}
        color="#00ff88"
        intensity={3}
        distance={15}
        decay={2}
        castShadow
      />

      {/* ORANGE LIGHT - Orbiting */}
      <pointLight
        ref={light5Ref}
        color="#ff8800"
        intensity={3}
        distance={15}
        decay={2}
        castShadow
      />

      <spotLight
        position={[0, 8, 0]}
        angle={0.5}
        penumbra={0.2}
        intensity={0.1}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      {/* Side spotlights aimed at disco ball */}
      <spotLight
        position={[6, 3, 0]}
        angle={0.4}
        penumbra={0.5}
        intensity={0.45}
        color="#ff00ff"
        target-position={[0, 0, 0]}
      />

      <spotLight
        position={[-6, 3, 0]}
        angle={0.4}
        penumbra={0.5}
        intensity={0.45}
        color="#00ffff"
        target-position={[0, 0, 0]}
      />
    </group>
  )
}

// Preload the GLB model
useGLTF.preload('/models/disco-ball.glb')

export default DiscoBall
