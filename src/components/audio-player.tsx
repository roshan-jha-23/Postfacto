"use client"

import type React from "react"

import { useState, useRef, useEffect, useCallback, useMemo } from "react"
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react"
import { useData } from "../context/DataWrapper"

export function AudioPlayer() {
  const { audioUrl, title = "Audio Transcript" }: any = useData()
  console.log(audioUrl,"the audio url in audio player");

  const audioRef = useRef<HTMLAudioElement | null>(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(80)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [isLooping, setIsLooping] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const formatTime = useCallback((seconds: number) => {
    if (!isFinite(seconds)) return "0:00"
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleLoadStart = () => setIsLoading(true)
    const handleCanPlay = () => {
      setIsLoading(false)
      setError(null)
    }
    const handleLoadedMetadata = () => setDuration(audio.duration || 0)
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime)
    const handleEnded = () => setIsPlaying(false)
    const handleError = () => {
      setError("Failed to load audio file")
      setIsPlaying(false)
      setIsLoading(false)
    }

    audio.addEventListener("loadstart", handleLoadStart)
    audio.addEventListener("canplay", handleCanPlay)
    audio.addEventListener("loadedmetadata", handleLoadedMetadata)
    audio.addEventListener("timeupdate", handleTimeUpdate)
    audio.addEventListener("ended", handleEnded)
    audio.addEventListener("error", handleError)

    return () => {
      audio.removeEventListener("loadstart", handleLoadStart)
      audio.removeEventListener("canplay", handleCanPlay)
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata)
      audio.removeEventListener("timeupdate", handleTimeUpdate)
      audio.removeEventListener("ended", handleEnded)
      audio.removeEventListener("error", handleError)
    }
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100
    }
  }, [volume])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackSpeed
    }
  }, [playbackSpeed])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = isLooping
    }
  }, [isLooping])

  const handlePlayPause = useCallback(() => {
    const audio = audioRef.current
    if (!audio || error) return

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio.play().catch(() => {
        setError("Failed to play audio")
      })
      setIsPlaying(true)
    }
  }, [isPlaying, error])

  const handleRewind = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = Math.max(0, audio.currentTime - 10)
  }, [])

  const handleForward = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = Math.min(duration, audio.currentTime + 10)
  }, [duration])

  const handleSeek = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current
    if (!audio) return

    const value = Number(e.target.value)
    audio.currentTime = value
    setCurrentTime(value)
  }, [])

  const handleSpeedChange = useCallback(() => {
    setPlaybackSpeed((prev) => (prev === 1 ? 1.5 : 1))
  }, [])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!audioRef.current || e.target !== document.body) return

      switch (e.code) {
        case "Space":
          e.preventDefault()
          handlePlayPause()
          break
        case "ArrowLeft":
          e.preventDefault()
          handleRewind()
          break
        case "ArrowRight":
          e.preventDefault()
          handleForward()
          break
      }
    }

    document.addEventListener("keydown", handleKeyPress)
    return () => document.removeEventListener("keydown", handleKeyPress)
  }, [handlePlayPause, handleRewind, handleForward])

  const speedButtonContent = useMemo(() => `${playbackSpeed}x`, [playbackSpeed])

  return (
    <div className="border-b border-slate-200 bg-white p-4">
      <audio ref={audioRef} src={audioUrl} crossOrigin="anonymous" />

      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-slate-800 text-sm px-2">{title}</h3>
        {isLoading && <span className="text-xs text-slate-500 animate-pulse">Loading...</span>}
      </div>

      {error && (
        <div className="mb-3 px-2 py-2 bg-red-50 border border-red-200 rounded text-xs text-red-600">{error}</div>
      )}

      <div className="bg-white px-2">
        {/* Progress Row */}
        <div className="flex items-center gap-3 mb-4">
          <span
            className="text-xs font-mono text-slate-500 w-10"
            aria-label={`Current time: ${formatTime(currentTime)}`}
          >
            {formatTime(currentTime)}
          </span>

          <input
            type="range"
            className="flex-1 h-1 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            disabled={error !== null}
            aria-label="Seek audio"
            aria-valuemin={0}
            aria-valuemax={Math.ceil(duration)}
            aria-valuenow={Math.ceil(currentTime)}
          />

          <span
            className="text-xs font-mono text-slate-500 w-10 text-right"
            aria-label={`Duration: ${formatTime(duration)}`}
          >
            {formatTime(duration)}
          </span>
        </div>

        {/* Controls Row */}
        <div className="flex items-center justify-between">
          {/* Speed + Loop */}
          <div className="flex items-center gap-3 w-20">
            <button
              onClick={handleSpeedChange}
              disabled={error !== null}
              className="text-xs font-bold text-slate-600 hover:text-purple-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label={`Playback speed: ${speedButtonContent}`}
            >
              {speedButtonContent}
            </button>

            <button
              onClick={() => setIsLooping(!isLooping)}
              disabled={error !== null}
              className={`transition disabled:opacity-50 disabled:cursor-not-allowed ${
                isLooping ? "text-purple-600" : "text-slate-400 hover:text-purple-600"
              }`}
              aria-label={`Loop: ${isLooping ? "On" : "Off"}`}
              aria-pressed={isLooping}
            >
              🔁
            </button>
          </div>

          {/* Play Controls */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleRewind}
              disabled={error !== null}
              className="text-slate-400 hover:text-purple-600 transition p-1 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Rewind 10 seconds"
            >
              <SkipBack className="w-5 h-5" />
            </button>

            <button
              onClick={handlePlayPause}
              disabled={error !== null}
              className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 hover:bg-purple-200 transition shadow-sm border border-purple-200 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label={isPlaying ? "Pause" : "Play"}
              aria-pressed={isPlaying}
            >
              {isPlaying ? <Pause className="w-5 h-5 ml-0.5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </button>

            <button
              onClick={handleForward}
              disabled={error !== null}
              className="text-slate-400 hover:text-purple-600 transition p-1 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Skip forward 10 seconds"
            >
              <SkipForward className="w-5 h-5" />
            </button>
          </div>

          {/* Volume */}
          <div className="flex items-center gap-2 w-20 justify-end">
            <Volume2 className="w-4 h-4 text-slate-400" />
            <input
              type="range"
              className="w-12 h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              disabled={error !== null}
              aria-label={`Volume: ${volume}%`}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={volume}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
