"use client"

import { useState } from "react"
import { Play, Pause, SkipBack, SkipForward, Rewind, FastForward, Volume2 } from "lucide-react"

export function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime] = useState("00:00")
  const [totalTime] = useState("01:04")
  const [progress] = useState(20)

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-white shadow-lg flex items-center justify-between px-8 z-20">
      <div className="flex items-center space-x-2 w-1/4">
        <span className="text-gray-500 text-sm">{currentTime}</span>
        <div className="bg-gray-200 h-1 flex-1 rounded-full">
          <div
            className="bg-purple-600 h-1 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-gray-500 text-sm">{totalTime}</span>
      </div>

      <div className="flex items-center space-x-6">
        <button className="text-gray-500 hover:text-gray-700 transition-colors">
          <SkipBack className="w-5 h-5" />
        </button>
        <button className="text-gray-500 hover:text-gray-700 transition-colors">
          <Rewind className="w-5 h-5" />
        </button>
        <button
          onClick={togglePlayPause}
          className="text-purple-600 hover:text-purple-700 transition-all transform hover:scale-110"
        >
          {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
        </button>
        <button className="text-gray-500 hover:text-gray-700 transition-colors">
          <FastForward className="w-5 h-5" />
        </button>
        <button className="text-gray-500 hover:text-gray-700 transition-colors">
          <SkipForward className="w-5 h-5" />
        </button>
      </div>

      <div className="w-1/4 flex justify-end">
        <button className="text-gray-500 hover:text-gray-700 transition-colors">
          <Volume2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
