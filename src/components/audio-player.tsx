"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause,  Rewind, FastForward, Volume2, VolumeX } from "lucide-react"
import { useData } from "../context/DataWrapper"

export function AudioPlayer() {
  const { audio }:any = useData()
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)

  // Format time (mm:ss)
  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00"
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  // Toggle play/pause
  const togglePlayPause = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  // Handle time updates
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateProgress = () => {
      setCurrentTime(audio.currentTime)
      setDuration(audio.duration)
    }

    audio.addEventListener("timeupdate", updateProgress)
    audio.addEventListener("loadedmetadata", updateProgress)
    audio.addEventListener("ended", () => setIsPlaying(false))

    return () => {
      audio.removeEventListener("timeupdate", updateProgress)
      audio.removeEventListener("loadedmetadata", updateProgress)
      audio.removeEventListener("ended", () => setIsPlaying(false))
    }
  }, [])

  // Seek
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return
    const newTime = Number(e.target.value)
    audioRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }

  // Volume control
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

  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 bg-white shadow-lg flex items-center justify-between px-8 z-20">
      {/* Hidden audio element */}
      <audio ref={audioRef} src={audio} preload="metadata" />

      {/* Progress Bar + Time */}
      <div className="flex items-center space-x-2 w-1/3">
        <span className="text-gray-500 text-sm">{formatTime(currentTime)}</span>
        <input
          type="range"
          min={0}
          max={duration || 0}
          value={currentTime}
          onChange={handleSeek}
          className="flex-1 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
        />
        <span className="text-gray-500 text-sm">{formatTime(duration)}</span>
      </div>

      {/* Controls */}
      <div className="flex items-center space-x-6">
        <button
          className="text-gray-500 hover:text-gray-700 transition-colors"
          onClick={() => (audioRef.current!.currentTime -= 10)}
        >
          <Rewind className="w-5 h-5" />
        </button>

        <button
          onClick={togglePlayPause}
          className="text-purple-600 hover:text-purple-700 transition-all transform hover:scale-110"
        >
          {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
        </button>

        <button
          className="text-gray-500 hover:text-gray-700 transition-colors"
          onClick={() => (audioRef.current!.currentTime += 10)}
        >
          <FastForward className="w-5 h-5" />
        </button>
      </div>

      {/* Volume Control */}
      <div className="w-1/4 flex items-center justify-end space-x-2">
        <button onClick={toggleMute} className="text-gray-500 hover:text-gray-700 transition-colors">
          {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={handleVolumeChange}
          className="w-24 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
        />
      </div>
    </div>
  )
}
