import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  Heart,
  Clock,
  Music2,
  Shuffle,
  Repeat
} from 'lucide-react';
import './Music.css';

const Music = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const audioRef = useRef(null);

  const playlists = [
    {
      id: 1,
      name: "Calming Waters",
      description: "Gentle melodies to soothe your mind and reduce anxiety",
      color: "#3b82f6",
      tracks: [
        {
          id: 1,
          title: "Ocean Waves",
          artist: "Nature Sounds",
          duration: "3:45",
          url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
          id: 2,
          title: "Gentle Rain",
          artist: "Healing Sounds",
          duration: "4:20",
          url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
          id: 3,
          title: "Morning Birds",
          artist: "Nature Sounds",
          duration: "3:15",
          url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        }
      ]
    },
    {
      id: 2,
      name: "Uplifting Spirit",
      description: "Inspiring music to boost your mood and energy",
      color: "#f59e0b",
      tracks: [
        {
          id: 4,
          title: "Sunrise",
          artist: "Healing Melodies",
          duration: "4:10",
          url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
          id: 5,
          title: "Hope",
          artist: "Inspirational Sounds",
          duration: "3:55",
          url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
          id: 6,
          title: "Strength",
          artist: "Empowerment Music",
          duration: "4:30",
          url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        }
      ]
    },
    {
      id: 3,
      name: "Healing Journey",
      description: "Songs that accompany you through your recovery process",
      color: "#10b981",
      tracks: [
        {
          id: 7,
          title: "Recovery",
          artist: "Healing Journey",
          duration: "5:15",
          url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
          id: 8,
          title: "Inner Peace",
          artist: "Meditation Music",
          duration: "4:45",
          url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
          id: 9,
          title: "New Beginnings",
          artist: "Transformation Sounds",
          duration: "3:50",
          url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        }
      ]
    },
    {
      id: 4,
      name: "Sleep & Rest",
      description: "Soothing sounds to help you get quality rest",
      color: "#8b5cf6",
      tracks: [
        {
          id: 10,
          title: "Lullaby",
          artist: "Sleep Sounds",
          duration: "6:20",
          url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
          id: 11,
          title: "Deep Sleep",
          artist: "Restful Melodies",
          duration: "8:15",
          url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
          id: 12,
          title: "Dreaming",
          artist: "Peaceful Sounds",
          duration: "5:30",
          url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        }
      ]
    }
  ];

  const [selectedPlaylist, setSelectedPlaylist] = useState(playlists[0]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    const nextIndex = (currentTrackIndex + 1) % selectedPlaylist.tracks.length;
    setCurrentTrackIndex(nextIndex);
    setCurrentTime(0);
    if (isPlaying) {
      setTimeout(() => {
        audioRef.current?.play();
      }, 100);
    }
  };

  const handlePrevious = () => {
    const prevIndex = currentTrackIndex === 0 ? selectedPlaylist.tracks.length - 1 : currentTrackIndex - 1;
    setCurrentTrackIndex(prevIndex);
    setCurrentTime(0);
    if (isPlaying) {
      setTimeout(() => {
        audioRef.current?.play();
      }, 100);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const currentTrack = selectedPlaylist.tracks[currentTrackIndex];

  return (
    <div className="music-container">
      <div className="music-header">
        <h1 className="music-title">
          <Music2 size={32} />
          Music Therapy
        </h1>
        <p className="music-description">
          Curated healing playlists designed to soothe your mind and uplift your spirit
        </p>
      </div>

      <div className="music-content">
        {/* Playlists */}
        <div className="playlists-section">
          <h2 className="section-title">Healing Playlists</h2>
          <div className="playlists-grid">
            {playlists.map((playlist) => (
              <motion.div
                key={playlist.id}
                className={`playlist-card ${selectedPlaylist.id === playlist.id ? 'active' : ''}`}
                onClick={() => setSelectedPlaylist(playlist)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{ '--playlist-color': playlist.color }}
              >
                <div className="playlist-icon">
                  <Music2 size={24} />
                </div>
                <h3 className="playlist-name">{playlist.name}</h3>
                <p className="playlist-description">{playlist.description}</p>
                <div className="playlist-tracks-count">
                  {playlist.tracks.length} tracks
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Player */}
        <div className="player-section">
          <div className="player-card">
            <div className="player-header">
              <h3 className="player-title">Now Playing</h3>
              <div className="player-controls">
                <motion.button
                  className={`control-btn ${shuffle ? 'active' : ''}`}
                  onClick={() => setShuffle(!shuffle)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Shuffle size={18} />
                </motion.button>
                <motion.button
                  className={`control-btn ${repeat ? 'active' : ''}`}
                  onClick={() => setRepeat(!repeat)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Repeat size={18} />
                </motion.button>
              </div>
            </div>

            <div className="track-info">
              <div className="track-artwork">
                <Music2 size={40} />
              </div>
              <div className="track-details">
                <h4 className="track-title">{currentTrack.title}</h4>
                <p className="track-artist">{currentTrack.artist}</p>
                <p className="track-playlist">{selectedPlaylist.name}</p>
              </div>
            </div>

            <div className="progress-container">
              <div className="progress-bar" onClick={handleSeek}>
                <div 
                  className="progress-fill"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                />
              </div>
              <div className="time-display">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            <div className="player-controls-main">
              <motion.button
                className="control-btn large"
                onClick={handlePrevious}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <SkipBack size={24} />
              </motion.button>
              
              <motion.button
                className="play-btn"
                onClick={handlePlayPause}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isPlaying ? <Pause size={32} /> : <Play size={32} />}
              </motion.button>
              
              <motion.button
                className="control-btn large"
                onClick={handleNext}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <SkipForward size={24} />
              </motion.button>
            </div>

            <div className="volume-control">
              <Volume2 size={18} />
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="volume-slider"
              />
            </div>
          </div>
        </div>

        {/* Track List */}
        <div className="tracks-section">
          <h3 className="tracks-title">Tracks in {selectedPlaylist.name}</h3>
          <div className="tracks-list">
            {selectedPlaylist.tracks.map((track, index) => (
              <motion.div
                key={track.id}
                className={`track-item ${currentTrackIndex === index ? 'active' : ''}`}
                onClick={() => {
                  setCurrentTrackIndex(index);
                  setCurrentTime(0);
                  if (isPlaying) {
                    setTimeout(() => {
                      audioRef.current?.play();
                    }, 100);
                  }
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="track-number">{index + 1}</div>
                <div className="track-info-mini">
                  <div className="track-title-mini">{track.title}</div>
                  <div className="track-artist-mini">{track.artist}</div>
                </div>
                <div className="track-duration">
                  <Clock size={14} />
                  {track.duration}
                </div>
                {currentTrackIndex === index && isPlaying && (
                  <div className="playing-indicator">
                    <div className="sound-wave">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleNext}
      />
    </div>
  );
};

export default Music;
