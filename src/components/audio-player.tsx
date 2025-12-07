

import type React from "react"

import { useState, useRef, useEffect, useCallback, useMemo } from "react"
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Loader } from "lucide-react"
import { useData } from "../context/DataWrapper"

export function AudioPlayer() {
  const { audioUrl, title = "Audio Transcript" }: any = useData()
  console.log(audioUrl, "the audio url in audio player")

  const audioRef = useRef<HTMLAudioElement | null>(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(100)
  const [isMuted, setIsMuted] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [loopMode, setLoopMode] = useState<"off" | "all" | "one">("off")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [silentSections, setSilentSections] = useState<Array<{ start: number; end: number }>>([])
  const [skipFeedback, setSkipFeedback] = useState<"rewind" | "forward" | null>(null)
  const [hoverTime, setHoverTime] = useState<number | null>(null)
  const [showSpeedMenu, setShowSpeedMenu] = useState(false)
  const [isBuffering, setIsBuffering] = useState(false)

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
    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0)
      analyzeAudioForSilence()
    }
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime)
    const handleEnded = () => {
      if (loopMode === "one") {
        audio.currentTime = 0
        audio.play()
      } else if (loopMode === "all") {
        audio.currentTime = 0
        audio.play()
      } else {
        setIsPlaying(false)
      }
    }
    const handleError = () => {
      setError("Failed to load audio file")
      setIsPlaying(false)
      setIsLoading(false)
    }
    const handlePlaying = () => setIsBuffering(false)
    const handleWaiting = () => setIsBuffering(true)

    audio.addEventListener("loadstart", handleLoadStart)
    audio.addEventListener("canplay", handleCanPlay)
    audio.addEventListener("loadedmetadata", handleLoadedMetadata)
    audio.addEventListener("timeupdate", handleTimeUpdate)
    audio.addEventListener("ended", handleEnded)
    audio.addEventListener("error", handleError)
    audio.addEventListener("playing", handlePlaying)
    audio.addEventListener("waiting", handleWaiting)

    return () => {
      audio.removeEventListener("loadstart", handleLoadStart)
      audio.removeEventListener("canplay", handleCanPlay)
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata)
      audio.removeEventListener("timeupdate", handleTimeUpdate)
      audio.removeEventListener("ended", handleEnded)
      audio.removeEventListener("error", handleError)
      audio.removeEventListener("playing", handlePlaying)
      audio.removeEventListener("waiting", handleWaiting)
    }
  }, [loopMode])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100
    }
  }, [volume, isMuted])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackSpeed
    }
  }, [playbackSpeed])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
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
        case "ArrowUp":
          e.preventDefault()
          setVolume((prev) => Math.min(100, prev + 10))
          break
        case "ArrowDown":
          e.preventDefault()
          setVolume((prev) => Math.max(0, prev - 10))
          break
        case "KeyL":
          e.preventDefault()
          setLoopMode((prev) => (prev === "off" ? "all" : prev === "all" ? "one" : "off"))
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

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
    setSkipFeedback("rewind")
    setTimeout(() => setSkipFeedback(null), 600)
  }, [])

  const handleForward = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = Math.min(duration, audio.currentTime + 10)
    setSkipFeedback("forward")
    setTimeout(() => setSkipFeedback(null), 600)
  }, [duration])

  const handleSeek = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current
    if (!audio) return

    const value = Number(e.target.value)
    audio.currentTime = value
    setCurrentTime(value)
  }, [])

  const handleSpeedChange = useCallback((speed: number) => {
    setPlaybackSpeed(speed)
    setShowSpeedMenu(false)
  }, [])

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100
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

  const speedButtonContent = useMemo(() => `${playbackSpeed}x`, [playbackSpeed])

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
      const maxChecks = Math.floor(audio.duration * 10)

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
        audio
          .play()
          .then(() => {
            checkSilence()
            audio.pause()
            audio.currentTime = 0
          })
          .catch(() => {
            console.log("[v0] Silence detection skipped due to autoplay restrictions")
          })
      }
    } catch (error) {
      console.log("[v0] Error analyzing audio:", error)
      setSilentSections([])
    }
  }

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

          {/* Silent sections overlay */}
          <div
            className="flex-1 relative h-1 bg-slate-200 rounded-lg overflow-hidden group"
            onMouseMove={handleProgressHover}
            onMouseLeave={handleProgressLeave}
          >
            {/* Silent sections overlay */}
            {silentSections.map((section, idx) => {
              const startPercent = (section.start / duration) * 100
              const endPercent = (section.end / duration) * 100
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
              className="absolute w-full h-1 top-0 left-0 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
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
          </div>

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
          <div className="flex items-center gap-3 w-24 relative">
            <div className="relative">
              <button
                onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                disabled={error !== null}
                className="text-xs font-bold text-slate-600 hover:text-purple-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label={`Playback speed: ${speedButtonContent}`}
              >
                {speedButtonContent}
              </button>

              {showSpeedMenu && (
                <div className="absolute bottom-full left-0 mb-2 bg-white border border-slate-200 rounded shadow-lg py-1 z-50">
                  {[0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map((speed) => (
                    <button
                      key={speed}
                      onClick={() => handleSpeedChange(speed)}
                      className={`block w-full text-left px-4 py-2 text-xs hover:bg-purple-100 transition-colors ${
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
              onClick={() => setLoopMode((prev) => (prev === "off" ? "all" : prev === "all" ? "one" : "off"))}
              disabled={error !== null}
              className={`transition disabled:opacity-50 disabled:cursor-not-allowed text-xs font-bold ${
                loopMode === "off" ? "text-slate-400 hover:text-purple-600" : "text-purple-600"
              }`}
              aria-label={`Loop: ${loopMode}`}
              aria-pressed={loopMode !== "off"}
            >
              {loopMode === "off" ? "∞" : loopMode === "all" ? "∞" : "1"}
            </button>
          </div>

          {/* Play Controls */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleRewind}
              disabled={error !== null}
              className={`text-slate-400 hover:text-purple-600 transition p-1 disabled:opacity-50 disabled:cursor-not-allowed ${
                skipFeedback === "rewind" ? "scale-125 text-purple-600" : ""
              }`}
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
              {isBuffering ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : isPlaying ? (
                <Pause className="w-5 h-5 ml-0.5" />
              ) : (
                <Play className="w-5 h-5 ml-0.5" />
              )}
            </button>

            <button
              onClick={handleForward}
              disabled={error !== null}
              className={`text-slate-400 hover:text-purple-600 transition p-1 disabled:opacity-50 disabled:cursor-not-allowed ${
                skipFeedback === "forward" ? "scale-125 text-purple-600" : ""
              }`}
              aria-label="Skip forward 10 seconds"
            >
              <SkipForward className="w-5 h-5" />
            </button>
          </div>

          {/* Volume */}
          <div className="flex items-center gap-2 w-24 justify-end">
            <button
              onClick={toggleMute}
              className="text-slate-400 hover:text-slate-600 transition"
              aria-label="Mute/Unmute"
            >
              {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <input
              type="range"
              className="w-12 h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
              min="0"
              max="100"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              disabled={error !== null}
              aria-label={`Volume: ${volume}%`}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={isMuted ? 0 : volume}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
