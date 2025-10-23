import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function CardCarousel({ sphereRadius = 3.5 }) {
  const cardsGroupRef = useRef()

  const cardData = useMemo(() => {
    const cards = [
      { label: 'MUSIC', color: '#ff006e' },
      { label: 'VIP', color: '#00ffff' },
      { label: 'EVENTS', color: '#bf00ff' },
      { label: 'DRINKS', color: '#00ff88' },
      { label: 'GALLERY', color: '#ff8800' },
    ]

    const ringRadius = sphereRadius * 1.25
    const ringHeight = 0

    return cards.map((card, index) => {
      const angle = (index / cards.length) * Math.PI * 2

      const x = Math.cos(angle) * ringRadius
      const z = Math.sin(angle) * ringRadius
      const y = ringHeight

      return {
        ...card,
        position: [x, y, z],
        angle: angle
      }
    })
  }, [sphereRadius])

  const createCurvedCardGeometry = (ringRadius, cardWidth, cardHeight) => {
    const geometry = new THREE.CylinderGeometry(
      ringRadius,
      ringRadius,
      cardHeight,
      32,
      1,
      true,
      0,
      (cardWidth / ringRadius)
    )

    geometry.rotateY(-(cardWidth / ringRadius) / 2)

    return geometry
  }

  const cardGeometry = useMemo(() => {
    const ringRadius = sphereRadius * 1.25
    return createCurvedCardGeometry(ringRadius, 1.25, 1.625)
  }, [sphereRadius])

  const borderGeometry = useMemo(() => {
    const ringRadius = sphereRadius * 1.25
    return createCurvedCardGeometry(ringRadius + 0.01, 1.275, 1.65)
  }, [sphereRadius])

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime()

    if (cardsGroupRef.current) {
      cardsGroupRef.current.rotation.y = time * 0.15
    }
  })

  return (
    <group ref={cardsGroupRef}>
      {cardData.map((card, index) => (
        <group
          key={index}
          position={[0, 0, 0]}
          rotation={[0, card.angle, 0]}
        >
          {/* Front side */}
          <mesh
            geometry={borderGeometry}
            castShadow
            receiveShadow
          >
            <meshPhysicalMaterial
              color={card.color}
              transparent
              opacity={0.2}
              side={THREE.FrontSide}
              metalness={0}
              roughness={0.8}
              transmission={0.7}
              thickness={1.0}
              emissive={card.color}
              emissiveIntensity={0.15}
            />
          </mesh>

          <mesh
            geometry={cardGeometry}
            castShadow
            receiveShadow
          >
            <meshPhysicalMaterial
              color="#000000"
              metalness={0}
              roughness={0.7}
              transparent
              opacity={0.4}
              side={THREE.FrontSide}
              transmission={0.8}
              thickness={1.5}
              clearcoat={0.8}
              clearcoatRoughness={0.3}
              ior={1.5}
            />
          </mesh>

          {/* Back side */}
          <mesh
            geometry={borderGeometry}
            castShadow
            receiveShadow
            rotation={[0, Math.PI, 0]}
          >
            <meshPhysicalMaterial
              color={card.color}
              transparent
              opacity={0.2}
              side={THREE.FrontSide}
              metalness={0}
              roughness={0.8}
              transmission={0.7}
              thickness={1.0}
              emissive={card.color}
              emissiveIntensity={0.15}
            />
          </mesh>

          <mesh
            geometry={cardGeometry}
            castShadow
            receiveShadow
            rotation={[0, Math.PI, 0]}
          >
            <meshPhysicalMaterial
              color="#000000"
              metalness={0}
              roughness={0.7}
              transparent
              opacity={0.4}
              side={THREE.FrontSide}
              transmission={0.8}
              thickness={1.5}
              clearcoat={0.8}
              clearcoatRoughness={0.3}
              ior={1.5}
            />
          </mesh>
        </group>
      ))}
    </group>
  )
}

export default CardCarousel