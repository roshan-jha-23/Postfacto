

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Rewind, FastForward, Volume2, VolumeX, Loader } from 'lucide-react'
import { useData } from "../context/DataWrapper"

export function AudioPlayer() {
  const { audioUrl }: any = useData()
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [skipFeedback, setSkipFeedback] = useState<"rewind" | "forward" | null>(null)
  const [silentSections, setSilentSections] = useState<Array<{ start: number; end: number }>>([])
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [loopMode, setLoopMode] = useState<"off" | "all" | "one">("off")
  const [isBuffering, setIsBuffering] = useState(false)
  const [showSpeedMenu, setShowSpeedMenu] = useState(false)
  const [hoverTime, setHoverTime] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (!audioRef.current) return
        
        // Spacebar: play/pause
        if (e.code === "Space" && e.target === document.body) {
          e.preventDefault()
          togglePlayPause()
        }
        // Arrow Left: rewind 10s
        if (e.code === "ArrowLeft") {
          e.preventDefault()
          handleSkip("rewind")
        }
        // Arrow Right: forward 10s
        if (e.code === "ArrowRight") {
          e.preventDefault()
          handleSkip("forward")
        }
        // Arrow Up: volume up
        if (e.code === "ArrowUp") {
          e.preventDefault()
          setVolume(prev => Math.min(1, prev + 0.1))
          if (audioRef.current) audioRef.current.volume = Math.min(1, volume + 0.1)
        }
        // Arrow Down: volume down
        if (e.code === "ArrowDown") {
          e.preventDefault()
          setVolume(prev => Math.max(0, prev - 0.1))
          if (audioRef.current) audioRef.current.volume = Math.max(0, volume - 0.1)
        }
        // L: toggle loop
        if (e.code === "KeyL") {
          e.preventDefault()
          setLoopMode(prev => prev === "off" ? "all" : prev === "all" ? "one" : "off")
        }
      }

      window.addEventListener("keydown", handleKeyDown)
      return () => window.removeEventListener("keydown", handleKeyDown)
    }, [volume])

    useEffect(() => {
      if (!audioRef.current) return

      const handleEnded = () => {
        if (loopMode === "one") {
          audioRef.current!.currentTime = 0
          audioRef.current!.play()
        } else if (loopMode === "all") {
          audioRef.current!.currentTime = 0
          audioRef.current!.play()
        }
      }

      const handlePlaying = () => setIsBuffering(false)
      const handleWaiting = () => setIsBuffering(true)

      audioRef.current.addEventListener("ended", handleEnded)
      audioRef.current.addEventListener("playing", handlePlaying)
      audioRef.current.addEventListener("waiting", handleWaiting)

      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener("ended", handleEnded)
          audioRef.current.removeEventListener("playing", handlePlaying)
          audioRef.current.removeEventListener("waiting", handleWaiting)
        }
      }
    }, [loopMode])

  const analyzeAudioForSilence = async () => {
    if (!audioRef.current) return

    try {
      const audio = audioRef.current
      
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      
      const sourceNode = audioContext.createMediaElementAudioSource(audio)
      const analyser = audioContext.createAnalyser()
      sourceNode.connect(analyser)
      analyser.connect(audioContext.destination)
      
      analyser.fftSize = 2048
      const bufferLength = analyser.frequencyBinCount
      const dataArray = new Uint8Array(bufferLength)
      
      const silenceThreshold = 30
      const silentBlocks: Array<{ start: number; end: number }> = []
      let inSilence = false
      let silenceStart = 0
      let checkCount = 0
      const maxChecks = Math.floor(audio.duration * 10) // Check ~10 times per second
      
      const checkSilence = () => {
        analyser.getByteFrequencyData(dataArray)
        
        let sum = 0
        for (let i = 0; i < bufferLength; i++) {
          sum += dataArray[i]
        }
        const average = sum / bufferLength
        const isSilent = average < silenceThreshold
        const currentTime = audio.currentTime
        
        if (isSilent && !inSilence) {
          silenceStart = currentTime
          inSilence = true
        } else if (!isSilent && inSilence) {
          silentBlocks.push({
            start: silenceStart,
            end: currentTime,
          })
          inSilence = false
        }
        
        checkCount++
        if (checkCount < maxChecks && audio.duration > 0) {
          requestAnimationFrame(checkSilence)
        } else {
          if (inSilence) {
            silentBlocks.push({
              start: silenceStart,
              end: audio.duration,
            })
          }
          setSilentSections(silentBlocks)
        }
      }
      
      if (audio.paused) {
        audio.play().then(() => {
          checkSilence()
          audio.pause()
          audio.currentTime = 0
        }).catch(() => {
          console.log("[v0] Silence detection skipped due to autoplay restrictions")
        })
      }
    } catch (error) {
      console.log("[v0] Error analyzing audio:", error)
      setSilentSections([])
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
      setError(null)
      analyzeAudioForSilence()
    }
  }

  const handleError = () => {
    setError("Failed to load audio")
    setIsPlaying(false)
  }

  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00"
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  const togglePlayPause = () => {
    if (!audioRef.current || error) return
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleSkip = (direction: "rewind" | "forward") => {
    if (!audioRef.current) return
    const skipAmount = direction === "rewind" ? -10 : 10
    audioRef.current.currentTime = Math.max(0, Math.min(duration, audioRef.current.currentTime + skipAmount))
    setCurrentTime(audioRef.current.currentTime)

    setSkipFeedback(direction)
    setTimeout(() => setSkipFeedback(null), 600)
  }

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed)
    if (audioRef.current) {
      audioRef.current.playbackRate = speed
    }
    setShowSpeedMenu(false)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
      setIsMuted(newVolume === 0)
    }
  }

  const toggleMute = () => {
    if (!audioRef.current) return
    audioRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const handleProgressHover = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const percent = (e.clientX - rect.left) / rect.width
    setHoverTime(percent * duration)
  }

  const handleProgressLeave = () => {
    setHoverTime(null)
  }

  return (
 <div
  className="
    absolute
   
    w-full max-w-xl
    bg-gradient-to-t from-purple-50 to-white
    shadow-2xl border-t border-purple-100
    flex flex-col items-center justify-center
    px-8 py-4
    z-20 rounded-t-2xl
  "
>
      <audio 
        ref={audioRef} 
        src={audioUrl} 
        preload="metadata" 
        onLoadedMetadata={handleLoadedMetadata}
        onError={handleError}
        onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
      />

      {/* Progress Bar + Time */}
      <div className="flex items-center space-x-3 w-full mb-4">
        <span className="text-gray-600 text-sm font-medium">{formatTime(currentTime)}</span>

        <div 
          className="flex-1 relative h-2 bg-gradient-to-r from-purple-200 to-purple-100 rounded-full overflow-hidden group"
          onMouseMove={handleProgressHover}
          onMouseLeave={handleProgressLeave}
        >
          {/* Silent sections overlay */}
          {silentSections.map((section, idx) => {
            const startPercent = (section.start / (duration * 1000)) * 100
            const endPercent = (section.end / (duration * 1000)) * 100
            return (
              <div
                key={idx}
                className="absolute h-full bg-yellow-400 opacity-70"
                style={{
                  left: `${startPercent}%`,
                  right: `${100 - endPercent}%`,
                }}
              />
            )
          })}

          {hoverTime !== null && (
            <div 
              className="absolute -top-8 transform -translate-x-1/2 pointer-events-none"
              style={{ left: `${(hoverTime / duration) * 100}%` }}
            >
              <div className="bg-gray-900 text-white text-xs font-bold px-2 py-1 rounded whitespace-nowrap">
                {formatTime(hoverTime)}
              </div>
            </div>
          )}

          <input
            type="range"
            min={0}
            max={duration || 0}
            value={currentTime}
            onChange={(e) => {
              if (!audioRef.current) return
              const newTime = Number(e.target.value)
              audioRef.current.currentTime = newTime
              setCurrentTime(newTime)
            }}
            className="absolute w-full h-2 top-0 left-0 appearance-none cursor-pointer accent-purple-600 hover:accent-purple-700 transition-all bg-transparent"
          />
        </div>

        <span className="text-gray-600 text-sm font-medium">{formatTime(duration)}</span>
      </div>

      {/* Controls */}
      <div className="flex items-center space-x-8">
        <button
          className="relative group transition-all duration-200 hover:scale-110 active:scale-95"
          onClick={() => handleSkip("rewind")}
          title="Rewind 10s (← or press ←)"
        >
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            <div className="bg-gray-900 text-white text-xs font-bold px-2 py-1 rounded whitespace-nowrap">-10s</div>
          </div>
          <div
            className={`relative transition-all duration-300 ${skipFeedback === "rewind" ? "scale-125 text-purple-600" : "text-gray-500 group-hover:text-gray-700"}`}
          >
            <Rewind className="w-6 h-6" />
            <span className="absolute -bottom-2 -right-2 bg-purple-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              10
            </span>
          </div>
        </button>

        {/* Play/Pause button */}
        <button
          onClick={togglePlayPause}
          disabled={error !== null}
          className="text-purple-600 hover:text-purple-700 transition-all transform hover:scale-125 active:scale-95 p-3 bg-purple-100 hover:bg-purple-200 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
          title="Play/Pause (Space)"
        >
          {isBuffering ? (
            <Loader className="w-8 h-8 animate-spin" />
          ) : isPlaying ? (
            <Pause className="w-8 h-8" />
          ) : (
            <Play className="w-8 h-8" />
          )}
        </button>

        <button
          className="relative group transition-all duration-200 hover:scale-110 active:scale-95"
          onClick={() => handleSkip("forward")}
          title="Forward 10s (press →)"
        >
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            <div className="bg-gray-900 text-white text-xs font-bold px-2 py-1 rounded whitespace-nowrap">+10s</div>
          </div>
          <div
            className={`relative transition-all duration-300 ${skipFeedback === "forward" ? "scale-125 text-purple-600" : "text-gray-500 group-hover:text-gray-700"}`}
          >
            <FastForward className="w-6 h-6" />
            <span className="absolute -bottom-2 -left-2 bg-purple-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              10
            </span>
          </div>
        </button>
      </div>

      {/* Volume Control */}
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 flex items-center space-x-3">
        <button
          onClick={toggleMute}
          className="text-gray-500 hover:text-gray-700 transition-all hover:scale-110 active:scale-95"
          title="Mute/Unmute"
        >
          {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={handleVolumeChange}
          className="w-24 h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-purple-600 hover:accent-purple-700 transition-all"
          title="Volume (↑/↓)"
        />
      </div>

      <div className="absolute left-8 top-1/2 transform -translate-y-1/2 flex items-center space-x-3">
        <div className="relative">
          <button
            onClick={() => setShowSpeedMenu(!showSpeedMenu)}
            className="text-sm font-bold text-gray-600 hover:text-gray-800 px-2 py-1 rounded hover:bg-purple-100 transition-all"
            title="Playback speed (Press L for loop)"
          >
            {playbackSpeed}x
          </button>
          
          {showSpeedMenu && (
            <div className="absolute bottom-full left-0 mb-2 bg-white border border-gray-200 rounded shadow-lg py-1 z-50">
              {[0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map((speed) => (
                <button
                  key={speed}
                  onClick={() => handleSpeedChange(speed)}
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-purple-100 transition-colors ${
                    playbackSpeed === speed ? "bg-purple-100 font-bold" : ""
                  }`}
                >
                  {speed}x
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={() => setLoopMode(prev => prev === "off" ? "all" : prev === "all" ? "one" : "off")}
          className={`text-sm font-bold px-2 py-1 rounded transition-all ${
            loopMode === "off"
              ? "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              : "text-purple-600 bg-purple-100 hover:bg-purple-200"
          }`}
          title="Loop mode (Press L)"
        >
          {loopMode === "off" ? "∞" : loopMode === "all" ? "∞" : "1"}
        </button>
      </div>

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/10 rounded-md">
          <div className="bg-red-500 text-white px-4 py-2 rounded text-sm font-medium">
            {error}
          </div>
        </div>
      )}
    </div>
  )
}
