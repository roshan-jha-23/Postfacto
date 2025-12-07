

import { useState, useEffect, useRef } from "react"
import { Search, Zap, ChevronUp, ChevronDown, X } from "lucide-react"
import { useData } from "../context/DataWrapper"

interface TranscriptMessage {
  id: string
  speaker: "Agent" | "Client"
  name: string
  time: string
  content: string
  isHighlighted?: boolean
  isAICue?: boolean
  aiPrompt?: any
}

export function Transcript() {
  const { transcriptionData } = useData()
  const [searchQuery, setSearchQuery] = useState("")
  const [currentResultIndex, setCurrentResultIndex] = useState(-1)
  const [matchingMessageIds, setMatchingMessageIds] = useState<string[]>([])
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const safeMessages = Array.isArray(transcriptionData?.messages) ? transcriptionData.messages : []

  useEffect(() => {
    if (!searchQuery.trim()) {
      setMatchingMessageIds([])
      setCurrentResultIndex(-1)
      return
    }

    const query = searchQuery.toLowerCase()
    const matchIds = safeMessages
      .filter((msg: any) => msg.content?.toLowerCase().includes(query) || msg.isAICue)
      .map((msg: any) => msg.id)

    setMatchingMessageIds(matchIds)
    setCurrentResultIndex(matchIds.length > 0 ? 0 : -1)
  }, [searchQuery, safeMessages])

  useEffect(() => {
    if (currentResultIndex >= 0 && matchingMessageIds.length > 0) {
      const currentId = matchingMessageIds[currentResultIndex]
      const element = document.getElementById(`msg-${currentId}`)
      if (element && scrollContainerRef.current) {
        element.scrollIntoView({ behavior: "smooth", block: "center" })
      }
    }
  }, [currentResultIndex, matchingMessageIds])

  const handlePrevious = () => {
    setCurrentResultIndex((prev) => (prev <= 0 ? matchingMessageIds.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentResultIndex((prev) => (prev >= matchingMessageIds.length - 1 ? 0 : prev + 1))
  }

  const handleClearSearch = () => {
    setSearchQuery("")
    setCurrentResultIndex(-1)
    setMatchingMessageIds([])
  }

  const filteredMessages = safeMessages.filter(
    (msg: any) => msg.content?.toLowerCase().includes(searchQuery.toLowerCase()) || msg.isAICue,
  )

  // ----------- AI PROMPT RENDERER -----------
  const renderAiPrompt = (aiPrompt: any) => {
    if (!aiPrompt) return null

    if (typeof aiPrompt === "string") {
      return <p className="text-xs text-blue-800 leading-relaxed">{aiPrompt}</p>
    }

    if (Array.isArray(aiPrompt)) {
      return aiPrompt.map((line, idx) => (
        <p key={idx} className="text-xs text-blue-800 leading-relaxed">
          {typeof line === "string" ? line : JSON.stringify(line)}
        </p>
      ))
    }

    return <p className="text-xs text-blue-800 leading-relaxed">{JSON.stringify(aiPrompt)}</p>
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="border-b border-slate-200 px-6 py-4 bg-slate-50 flex-shrink-0">
        <h3 className="text-sm font-semibold text-slate-900">Call Transcript</h3>
        <p className="text-xs text-slate-500 mt-1">Real-time conversation analysis with AI insights</p>
      </div>

      <div className="px-6 py-3 border-b border-slate-200 bg-white flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search transcript..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-9 py-2 border border-slate-300 rounded-lg text-sm bg-white
              focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {searchQuery && matchingMessageIds.length > 0 && (
            <div className="flex items-center gap-1 whitespace-nowrap">
              <span className="text-xs text-slate-600 font-medium px-2">
                {currentResultIndex + 1} of {matchingMessageIds.length}
              </span>
              <button
                onClick={handlePrevious}
                className="p-1.5 rounded border border-slate-300 hover:bg-slate-100 transition-colors text-slate-600"
                aria-label="Previous result"
              >
                <ChevronUp className="h-4 w-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-1.5 rounded border border-slate-300 hover:bg-slate-100 transition-colors text-slate-600"
                aria-label="Next result"
              >
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          )}
          {searchQuery && matchingMessageIds.length === 0 && (
            <span className="text-xs text-slate-500 px-2">No results</span>
          )}
        </div>
      </div>

      {/* MAIN SCROLL AREA */}
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-6 space-y-5 min-h-0">
        {filteredMessages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-8">
            <Search className="h-8 w-8 text-slate-300 mb-2" />
            <p className="text-sm text-slate-500">{searchQuery ? "No messages found" : "Search for messages..."}</p>
          </div>
        ) : (
          filteredMessages.map((msg: TranscriptMessage) => {
            const isCurrentResult = matchingMessageIds[currentResultIndex] === msg.id
            return (
              <div
                key={msg.id}
                id={`msg-${msg.id}`}
                className={`space-y-3 transition-all duration-200 ${
                  isCurrentResult ? "ring-2 ring-amber-400 rounded-lg p-3 bg-amber-50" : ""
                }`}
              >
                {/* AI CUE */}
                {msg.isAICue && (
                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex-shrink-0 pt-0.5">
                      <Zap className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-blue-900 mb-1">AI Insight</p>
                      {renderAiPrompt(msg.aiPrompt)}
                    </div>
                  </div>
                )}

                {/* REGULAR MESSAGE */}
                <div className="flex gap-3">
                  <div
                    className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold text-white ${
                      msg.speaker === "Agent" ? "bg-indigo-600" : "bg-emerald-600"
                    }`}
                  >
                    {msg.speaker === "Agent" ? "A" : "C"}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 mb-1">
                      <p className="text-xs font-semibold text-slate-900">{msg.speaker}</p>
                      <p className="text-xs text-slate-400">{msg.time}</p>
                    </div>

                    <p
                      className={`text-sm leading-relaxed ${
                        msg.isHighlighted
                          ? "bg-amber-50 p-2.5 rounded border border-amber-200 text-slate-800"
                          : "text-slate-700"
                      }`}
                    >
                      {msg.content}
                    </p>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
