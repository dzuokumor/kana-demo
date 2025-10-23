import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function BackgroundEffects() {
  const closeLayerRef = useRef()
  const midLayerRef = useRef()
  const farLayerRef = useRef()

  // Create 3D volumetric light spheres in multiple depth layers
  const volumetricLights = useMemo(() => {
    const layers = {
      close: [],
      mid: [],
      far: []
    }
    const colors = ['#ff006e', '#00ff88', '#00ffff', '#bf00ff', '#ff8800']

    // Close layer - largest, brightest
    for (let i = 0; i < 15; i++) {
      layers.close.push({
        position: [
          (Math.random() - 0.5) * 35,
          (Math.random() - 0.5) * 22,
          -12 - Math.random() * 8
        ],
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 1.2 + Math.random() * 2.5,
        opacity: 0.4 + Math.random() * 0.4,
        pulseSpeed: 0.5 + Math.random() * 1.5,
        pulseOffset: Math.random() * Math.PI * 2
      })
    }

    // Mid layer - medium
    for (let i = 0; i < 20; i++) {
      layers.mid.push({
        position: [
          (Math.random() - 0.5) * 40,
          (Math.random() - 0.5) * 25,
          -20 - Math.random() * 10
        ],
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 0.8 + Math.random() * 1.8,
        opacity: 0.3 + Math.random() * 0.35,
        pulseSpeed: 0.4 + Math.random() * 1.2,
        pulseOffset: Math.random() * Math.PI * 2
      })
    }

    // Far layer - smallest, dimmest
    for (let i = 0; i < 25; i++) {
      layers.far.push({
        position: [
          (Math.random() - 0.5) * 50,
          (Math.random() - 0.5) * 30,
          -30 - Math.random() * 15
        ],
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 0.5 + Math.random() * 1.2,
        opacity: 0.2 + Math.random() * 0.25,
        pulseSpeed: 0.3 + Math.random() * 1.0,
        pulseOffset: Math.random() * Math.PI * 2
      })
    }

    return layers
  }, [])

  // Subtle pulsing animation
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime()

    ;[closeLayerRef, midLayerRef, farLayerRef].forEach((ref, layerIndex) => {
      if (ref.current) {
        const layer = layerIndex === 0 ? volumetricLights.close :
                       layerIndex === 1 ? volumetricLights.mid :
                       volumetricLights.far

        ref.current.children.forEach((child, i) => {
          if (layer[i]) {
            const light = layer[i]
            const pulse = Math.sin(time * light.pulseSpeed + light.pulseOffset) * 0.5 + 0.5
            child.material.opacity = light.opacity * (0.7 + pulse * 0.3)
          }
        })
      }
    })
  })

  return (
    <group>
      {/* Close layer - largest bokeh lights */}
      <group ref={closeLayerRef}>
        {volumetricLights.close.map((light, i) => (
          <mesh key={`close-${i}`} position={light.position}>
            <sphereGeometry args={[light.size, 20, 20]} />
            <meshBasicMaterial
              color={light.color}
              transparent
              opacity={light.opacity}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        ))}
      </group>

      {/* Mid layer - medium bokeh lights */}
      <group ref={midLayerRef}>
        {volumetricLights.mid.map((light, i) => (
          <mesh key={`mid-${i}`} position={light.position}>
            <sphereGeometry args={[light.size, 16, 16]} />
            <meshBasicMaterial
              color={light.color}
              transparent
              opacity={light.opacity}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        ))}
      </group>

      {/* Far layer - smallest, most distant bokeh lights */}
      <group ref={farLayerRef}>
        {volumetricLights.far.map((light, i) => (
          <mesh key={`far-${i}`} position={light.position}>
            <sphereGeometry args={[light.size, 12, 12]} />
            <meshBasicMaterial
              color={light.color}
              transparent
              opacity={light.opacity}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        ))}
      </group>

      {/* Floating atmospheric particles - close */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={120}
            array={new Float32Array(
              Array.from({ length: 360 }, (_, i) => {
                if (i % 3 === 0) return (Math.random() - 0.5) * 35 // x
                if (i % 3 === 1) return (Math.random() - 0.5) * 25 // y
                return -8 - Math.random() * 12 // z - close layer
              })
            )}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.2}
          color="#bf00ff"
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Distant particle field */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={150}
            array={new Float32Array(
              Array.from({ length: 450 }, (_, i) => {
                if (i % 3 === 0) return (Math.random() - 0.5) * 55 // x
                if (i % 3 === 1) return (Math.random() - 0.5) * 38 // y
                return -25 - Math.random() * 20 // z - far background
              })
            )}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.1}
          color="#00ffff"
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  )
}

export default BackgroundEffects
