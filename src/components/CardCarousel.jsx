import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import './CardCarousel.css'

function HtmlCard({ color, label, position, angle }) {
  const cardRef = useRef()

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    e.currentTarget.style.setProperty('--mouse-x', `${x}px`)
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`)
  }

  return (
    <Html
      position={position}
      transform
      occlude={false}
      zIndexRange={[0, 0]}
      style={{
        transition: 'none',
        pointerEvents: 'auto'
      }}
    >
      <div
        ref={cardRef}
        className="card-3d-spotlight"
        onMouseMove={handleMouseMove}
      >
        <div className="card-content">
          <h3>{label}</h3>
        </div>
      </div>
    </Html>
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

    return cards.map((card, index) => {
      const angle = (index / cards.length) * Math.PI * 2

      return {
        ...card,
        angle: angle
      }
    })
  }, [sphereRadius])

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime()

    if (cardsGroupRef.current) {
      cardsGroupRef.current.rotation.y = time * 0.15
    }
  })

  const ringRadius = sphereRadius * 1.25

  return (
    <group ref={cardsGroupRef}>
      {cardData.map((card, index) => (
        <group
          key={index}
          position={[0, 0, 0]}
          rotation={[0, card.angle, 0]}
        >
          <HtmlCard
            color={card.color}
            label={card.label}
            position={[0, 0, ringRadius]}
            angle={card.angle}
          />
        </group>
      ))}
    </group>
  )
}

export default CardCarousel