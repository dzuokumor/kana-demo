import { useState } from 'react'
import SpotlightCard from './SpotlightCard'
import './DanceTileCard.css'

function DanceTileCard({ title, description, delay = 0 }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="dance-tile-wrapper"
      style={{ animationDelay: `${delay}s` }}
    >
      <SpotlightCard
        className={`dance-tile-card ${isHovered ? 'hovered' : ''}`}
        spotlightColor="rgba(255, 0, 110, 0.3)"
      >
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="tile-content">
            <h3 className="tile-title">{title}</h3>
            <p className="tile-description">{description}</p>
          </div>
        </div>
      </SpotlightCard>
    </div>
  )
}

export default DanceTileCard
