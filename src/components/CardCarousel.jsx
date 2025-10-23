import { useRef, useMemo, useState, Suspense } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text3D, Center } from '@react-three/drei'
import * as THREE from 'three'

// Shared curve settings for text and background
const CURVE_AMOUNT_X = 0.08  // Horizontal curve (affects left/right ends)
const CURVE_AMOUNT_Y = 0.12  // Vertical curve

function CurvedText3D({ label, color, hovered, onPointerEnter, onPointerLeave, onClick }) {
  const textRef = useRef()

  // Apply curvature to text geometry after it's loaded
  useFrame(() => {
    if (textRef.current && textRef.current.geometry) {
      const geometry = textRef.current.geometry

      if (!geometry.userData.curved) {
        const positions = geometry.attributes.position

        // Apply curvature to match the background
        for (let i = 0; i < positions.count; i++) {
          const x = positions.getX(i)
          const y = positions.getY(i)
          const currentZ = positions.getZ(i)

          // Calculate curve amount - same formula as background
          const curveZ = -(x * x * CURVE_AMOUNT_X + y * y * CURVE_AMOUNT_Y)

          positions.setZ(i, currentZ + curveZ)
        }

        positions.needsUpdate = true
        geometry.computeVertexNormals()
        geometry.userData.curved = true
      }
    }
  })

  return (
    <Text3D
      ref={textRef}
      font="/fonts/helvetiker_regular.typeface.json"
      size={0.25}
      height={0.05}
      curveSegments={12}
      bevelEnabled
      bevelThickness={0.01}
      bevelSize={0.01}
      bevelOffset={0}
      bevelSegments={5}
      onClick={onClick}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
    >
      {label}
      <meshStandardMaterial
        color={hovered ? '#ffffff' : '#dddddd'}
        emissive={hovered ? color : '#000000'}
        emissiveIntensity={hovered ? 0.6 : 0}
        toneMapped={false}
      />
    </Text3D>
  )
}

function Text3DCard({ label, color }) {
  const groupRef = useRef()
  const bgMeshRef = useRef()
  const [hovered, setHovered] = useState(false)

  // Create curved background geometry
  const curvedGeometry = useMemo(() => {
    const geometry = new THREE.PlaneGeometry(1.5, 0.7, 32, 32)
    const positions = geometry.attributes.position

    // Apply curvature to make it wrap around the disco ball
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i)
      const y = positions.getY(i)

      // Calculate curve amount - same formula as text
      const z = -(x * x * CURVE_AMOUNT_X + y * y * CURVE_AMOUNT_Y)

      positions.setZ(i, z)
    }

    geometry.computeVertexNormals()
    return geometry
  }, [])

  return (
    <group ref={groupRef}>
      <mesh ref={bgMeshRef} position={[0, 0, 0]} geometry={curvedGeometry}>
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

      <Suspense fallback={null}>
        <Center position={[0, 0, 0.2]}>
          <CurvedText3D
            label={label}
            color={color}
            hovered={hovered}
            onClick={() => console.log(`Clicked ${label}`)}
            onPointerEnter={() => {
              setHovered(true)
              document.body.style.cursor = 'pointer'
            }}
            onPointerLeave={() => {
              setHovered(false)
              document.body.style.cursor = 'default'
            }}
          />
        </Center>
      </Suspense>
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