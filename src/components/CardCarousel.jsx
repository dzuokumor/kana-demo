import { useRef, useMemo, useState, Suspense } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text3D, Center } from '@react-three/drei'
import * as THREE from 'three'

function Text3DCard({ label, color }) {
  const groupRef = useRef()
  const [hovered, setHovered] = useState(false)

  return (
    <group ref={groupRef}>
      <Suspense fallback={null}>
        <Center>
          <Text3D
            font="/fonts/helvetiker_regular.typeface.json"
            size={0.25}
            height={0.05}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.01}
            bevelSize={0.01}
            bevelOffset={0}
            bevelSegments={5}
            onClick={() => console.log(`Clicked ${label}`)}
            onPointerEnter={() => {
              setHovered(true)
              document.body.style.cursor = 'pointer'
            }}
            onPointerLeave={() => {
              setHovered(false)
              document.body.style.cursor = 'default'
            }}
          >
            {label}
            <meshStandardMaterial
              color={hovered ? '#ffffff' : '#dddddd'}
              emissive={hovered ? color : '#000000'}
              emissiveIntensity={hovered ? 0.6 : 0}
              toneMapped={false}
            />
          </Text3D>
        </Center>
      </Suspense>

      <mesh position={[0, 0, -0.15]}>
        <planeGeometry args={[1.5, 0.7]} />
        <meshPhysicalMaterial
          color="#1a1a2e"
          transparent
          opacity={0.95}
          side={THREE.DoubleSide}
          transmission={0.05}
          thickness={0.5}
          roughness={0.3}
          clearcoat={0.6}
          clearcoatRoughness={0.3}
          metalness={0.15}
          ior={1.45}
        />
      </mesh>
    </group>
  )
}

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

    return cards.map((card, index) => {
      const angle = (index / cards.length) * Math.PI * 2

      return {
        ...card,
        angle: angle
      }
    })
  }, [])

  useFrame(({ clock, camera }) => {
    const time = clock.getElapsedTime()

    if (cardsGroupRef.current) {
      cardsGroupRef.current.rotation.y = time * 0.15

      cardsGroupRef.current.children.forEach((cardGroup) => {
        const worldPos = new THREE.Vector3()
        cardGroup.getWorldPosition(worldPos)

        const cameraPos = camera.position.clone()
        const ballPos = new THREE.Vector3(0, 0, 0)

        const cardToBall = ballPos.sub(worldPos).normalize()
        const cameraToBall = ballPos.clone().sub(cameraPos).normalize()

        const angle = cameraToBall.angleTo(cardToBall)

        cardGroup.visible = angle > Math.PI / 2.5
      })
    }
  })

  const ringRadius = sphereRadius * 1.1

  return (
    <group ref={cardsGroupRef}>
      {cardData.map((card, index) => (
        <group
          key={index}
          position={[0, 0, 0]}
          rotation={[0, card.angle, 0]}
        >
          <group position={[0, 0, ringRadius]}>
            <Text3DCard
              label={card.label}
              color={card.color}
            />
          </group>
        </group>
      ))}
    </group>
  )
}

export default CardCarousel