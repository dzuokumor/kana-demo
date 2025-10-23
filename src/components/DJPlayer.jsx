import { useState, useEffect, useRef } from 'react'
import './DJPlayer.css'

const SONGS = [
  { name: 'On The Low', artist: 'Burna Boy', file: '/music/Burna-Boy-On-The-Low-[TrendyBeatz.com].mp3' },
  { name: 'Isaka II 6am', artist: 'Ciza ft Tems & Omah Lay', file: '/music/Ciza_ft_Tems_Omah_Lay_Thukuthela_Jazzworx_Lekaa_Beats_-_Isaka_II_6am_.mp3' },
  { name: 'Kante', artist: 'Davido ft Fave', file: '/music/Davido-Ft-Fave-Kante-(TrendyBeatz.com).mp3' }
]

const QUIRKY_MESSAGES = [
  "Need some vibes? 🎵",
  "Let's groove! 🕺",
  "Hit play, feel the beat! 💃",
  "Music makes it better ✨",
  "Turn up the energy! 🔥",
  "Drop the beat! 🎧"
]

function DJPlayer() {
  const [isOpen, setIsOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const [showMessage, setShowMessage] = useState(false)
  const [currentMessage, setCurrentMessage] = useState(QUIRKY_MESSAGES[0])
  const audioRef = useRef(null)

  // Quirky message animation
  useEffect(() => {
    if (!isOpen) {
      const messageInterval = setInterval(() => {
        setCurrentMessage(QUIRKY_MESSAGES[Math.floor(Math.random() * QUIRKY_MESSAGES.length)])
        setShowMessage(true)

        setTimeout(() => {
          setShowMessage(false)
        }, 2000) // Show for 2 seconds
      }, 6000) // Every 6 seconds

      return () => clearInterval(messageInterval)
    }
  }, [isOpen])

  const togglePlayer = () => {
    setIsOpen(!isOpen)
    if (isOpen && isPlaying) {
      audioRef.current?.pause()
      setIsPlaying(false)
    }
  }

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause()
    } else {
      audioRef.current?.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleShuffle = () => {
    let newIndex
    do {
      newIndex = Math.floor(Math.random() * SONGS.length)
    } while (newIndex === currentSongIndex && SONGS.length > 1)

    setCurrentSongIndex(newIndex)
    setIsPlaying(true)

    setTimeout(() => {
      audioRef.current?.play()
    }, 100)
  }

  const handleSongEnd = () => {
    // Auto-play next song
    const nextIndex = (currentSongIndex + 1) % SONGS.length
    setCurrentSongIndex(nextIndex)
    setTimeout(() => {
      audioRef.current?.play()
    }, 100)
  }

  return (
    <>
      <div className="dj-player-container">
        {/* Quirky Message Popup */}
        {showMessage && !isOpen && (
          <div className="dj-message">
            {currentMessage}
          </div>
        )}

        {/* DJ Icon Button */}
        <button
          className={`dj-button ${isPlaying ? 'playing' : ''}`}
          onClick={togglePlayer}
          aria-label="DJ Music Player"
        >
          <div className="dj-icon">
            <div className="vinyl-record">
              <div className="vinyl-label"></div>
              <div className="vinyl-hole"></div>
            </div>
            <div className="dj-headphones"></div>
          </div>
        </button>

        {/* Player Panel */}
        {isOpen && (
          <div className="dj-player-panel">
            <div className="player-header">
              <span className="player-title">Now Playing</span>
              <button
                className="shuffle-button"
                onClick={handleShuffle}
                aria-label="Shuffle"
              >
                🔀
              </button>
            </div>

            <div className="song-info">
              <div className="song-name">{SONGS[currentSongIndex].name}</div>
              <div className="artist-name">{SONGS[currentSongIndex].artist}</div>
            </div>

            <button
              className="play-pause-button"
              onClick={togglePlayPause}
            >
              {isPlaying ? '⏸' : '▶'}
            </button>

            <audio
              ref={audioRef}
              src={SONGS[currentSongIndex].file}
              onEnded={handleSongEnd}
            />
          </div>
        )}
      </div>
    </>
  )
}

export default DJPlayer
