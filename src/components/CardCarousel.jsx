import { useRef, useMemo, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const spotlightVertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  
  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const spotlightFragmentShader = `
  uniform vec3 baseColor;
  uniform vec3 spotlightColor;
  uniform vec2 spotlightPosition;
  uniform float spotlightIntensity;
  uniform float spotlightRadius;
  uniform bool isHovered;
  
  varying vec2 vUv;
  varying vec3 vPosition;
  
  void main() {
    vec3 color = baseColor;
    
    if (isHovered) {
      float dist = distance(vUv, spotlightPosition);
      float spotlight = 1.0 - smoothstep(0.0, spotlightRadius, dist);
      spotlight = pow(spotlight, 2.0);
      
      color = mix(baseColor, spotlightColor, spotlight * spotlightIntensity);
    }
    
    gl_FragColor = vec4(color, 0.95);
  }
`

function InteractiveCurvedCard({ geometry, color, angle, groupRef }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)
  const [spotlightPos, setSpotlightPos] = useState(new THREE.Vector2(0.5, 0.5))

  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        baseColor: { value: new THREE.Color('#1a1a1a') },
        spotlightColor: { value: new THREE.Color(color) },
        spotlightPosition: { value: spotlightPos },
        spotlightIntensity: { value: 0.6 },
        spotlightRadius: { value: 0.8 },
        isHovered: { value: false }
      },
      vertexShader: spotlightVertexShader,
      fragmentShader: spotlightFragmentShader,
      transparent: true,
      side: THREE.DoubleSide
    })
  }, [color])

  const handlePointerMove = (e) => {
    if (!hovered) return

    e.stopPropagation()
    const uv = e.uv
    if (uv) {
      setSpotlightPos(new THREE.Vector2(uv.x, uv.y))
      shaderMaterial.uniforms.spotlightPosition.value = new THREE.Vector2(uv.x, uv.y)
    }
  }

  const handlePointerEnter = (e) => {
    e.stopPropagation()
    setHovered(true)
    shaderMaterial.uniforms.isHovered.value = true
    document.body.style.cursor = 'pointer'
  }

  const handlePointerLeave = (e) => {
    e.stopPropagation()
    setHovered(false)
    shaderMaterial.uniforms.isHovered.value = false
    document.body.style.cursor = 'default'
  }

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      material={shaderMaterial}
      castShadow
      receiveShadow
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    />
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

          <InteractiveCurvedCard
            geometry={cardGeometry}
            color={card.color}
            angle={card.angle}
            groupRef={cardsGroupRef}
          />

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

          <InteractiveCurvedCard
            geometry={cardGeometry}
            color={card.color}
            angle={card.angle}
            groupRef={cardsGroupRef}
          />
        </group>
      ))}
    </group>
  )
}

export default CardCarousel