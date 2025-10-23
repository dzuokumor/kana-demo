import { useState, useEffect, useRef } from 'react'
import { FiMusic, FiPlay, FiPause, FiShuffle, FiHeadphones, FiZap, FiSkipBack, FiSkipForward, FiList } from 'react-icons/fi'
import './DJPlayer.css'

const SONGS = [
  { name: 'On The Low', artist: 'Burna Boy', file: '/music/Burna_Boy_-_On_The_Low.mp3' },
  { name: 'Kante', artist: 'Davido ft Fave', file: '/music/Davido_feat_Fave_-_KANTE_Gidifans.com.mp3' },
  { name: 'Feel', artist: 'Davido', file: '/music/Davido_-_FEEL_Gidifans.com.mp3' },
  { name: 'Unavailable', artist: 'Davido ft Musa Keys', file: '/music/Davido_feat_Musa_Keys_-_UNAVAILABLE_Gidifans.com.mp3' },
  { name: 'Ewo', artist: 'Famous Pluto ft Shallipopi & Zerrydl', file: '/music/Famous_Pluto_ft_Shallipopi_Zerrydl_-_Ewo.mp3' },
  { name: 'Show Me Love', artist: 'WizTheMc & Bees Honey', file: '/music/WizTheMc, bees honey - Show Me Love (Official Music Video) (320 KBps).mp3' },
  { name: 'Tshwala Bam Remix', artist: 'TitoM & Yuppe ft Burna Boy', file: '/music/TitoM_Yuppe_FtBurna_Boy_SNE_EeQue_-_Tshwala_Bam_Remix_.mp3' },
  { name: 'Nack', artist: 'The Therapist', file: '/music/The_Therapist_-_Nack.mp3' },
  { name: 'Bheba Bhebha', artist: 'Shaunmusiq & Ftears ft Myztro', file: '/music/Shaunmusiq_Ftears_Ft_Myztro_-_Bheba_Bhebha.mp3' },
  { name: 'Shake Ah', artist: 'Tyla ft Tony Duardo', file: '/music/Tyla_Ft_Tony_Duardo_Optimist_Maestro_-_Shake_Ah.mp3' },
  { name: 'Fun', artist: 'Rema', file: '/music/Rema-FUN.mp3' },
  { name: 'Isaka II 6am', artist: 'Ciza ft Tems & Omah Lay', file: '/music/Ciza_ft_Tems_Omah_Lay_Thukuthela_Jazzworx_Lekaa_Beats_-_Isaka_II_6am_.mp3' }
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
  const [showSongList, setShowSongList] = useState(false)
  const audioRef = useRef(null)

  // Quirky message animation
  useEffect(() => {
    if (!isOpen) {
      const messageInterval = setInterval(() => {
        setCurrentMessage(QUIRKY_MESSAGES[Math.floor(Math.random() * QUIRKY_MESSAGES.length)])
        setShowMessage(true)

        setTimeout(() => {
          setShowMessage(false)
        }, 4000) // Show for 4 seconds
      }, 4500) // Every 4.5 seconds

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

  const handleNext = () => {
    const nextIndex = (currentSongIndex + 1) % SONGS.length
    setCurrentSongIndex(nextIndex)
    if (isPlaying) {
      setTimeout(() => {
        audioRef.current?.play()
      }, 100)
    }
  }

  const handlePrevious = () => {
    const prevIndex = (currentSongIndex - 1 + SONGS.length) % SONGS.length
    setCurrentSongIndex(prevIndex)
    if (isPlaying) {
      setTimeout(() => {
        audioRef.current?.play()
      }, 100)
    }
  }

  const handleSongSelect = (index) => {
    setCurrentSongIndex(index)
    setIsPlaying(true)
    setShowSongList(false)
    setTimeout(() => {
      audioRef.current?.play()
    }, 100)
  }

  const handleSongEnd = () => {
    // Auto-play next song
    handleNext()
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
              <div className="player-header-controls">
                <button
                  className="list-button"
                  onClick={() => setShowSongList(!showSongList)}
                  aria-label="Song List"
                >
                  <FiList />
                </button>
                <button
                  className="shuffle-button"
                  onClick={handleShuffle}
                  aria-label="Shuffle"
                >
                  <FiShuffle />
                </button>
              </div>
            </div>

            <div className="song-info">
              <div className="song-name">{SONGS[currentSongIndex].name}</div>
              <div className="artist-name">{SONGS[currentSongIndex].artist}</div>
            </div>

            <div className="player-controls">
              <button
                className="control-button"
                onClick={handlePrevious}
                aria-label="Previous"
              >
                <FiSkipBack />
              </button>
              <button
                className="play-pause-button"
                onClick={togglePlayPause}
              >
                {isPlaying ? <FiPause /> : <FiPlay />}
              </button>
              <button
                className="control-button"
                onClick={handleNext}
                aria-label="Next"
              >
                <FiSkipForward />
              </button>
            </div>

            {/* Song List */}
            {showSongList && (
              <div className="song-list">
                <div className="song-list-header">All Songs</div>
                <div className="song-list-items">
                  {SONGS.map((song, index) => (
                    <div
                      key={index}
                      className={`song-list-item ${index === currentSongIndex ? 'active' : ''}`}
                      onClick={() => handleSongSelect(index)}
                    >
                      <div className="song-list-icon">
                        {index === currentSongIndex && isPlaying ? <FiPause /> : <FiPlay />}
                      </div>
                      <div className="song-list-info">
                        <div className="song-list-name">{song.name}</div>
                        <div className="song-list-artist">{song.artist}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

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
