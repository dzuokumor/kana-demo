import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

function SuspensionString() {
  const stringRef = useRef()

  // Subtle swaying animation (optional enhancement)
  useFrame(({ clock }) => {
    if (stringRef.current) {
      stringRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.5) * 0.02
    }
  })

  return (
    <group ref={stringRef} position={[0, 3, 0]}>
      {/* Main suspension string - Cylinder: radius 0.02, height 6.0 */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 6.0, 8]} />
        <meshStandardMaterial
          color="#333333"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Ceiling attachment point (optional visual enhancement) */}
      <mesh position={[0, 3, 0]}>
        <cylinderGeometry args={[0.08, 0.05, 0.1, 16]} />
        <meshStandardMaterial
          color="#1a1a1a"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Ball attachment point (optional visual enhancement) */}
      <mesh position={[0, -3, 0]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial
          color="#1a1a1a"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
    </group>
  )
}

export default SuspensionString
