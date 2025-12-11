

import { useState, useEffect, useRef } from "react"
import { Search, Zap, ChevronUp, ChevronDown, X, Flag } from "lucide-react"
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
  flags: {
    color: "red" | "blue" | "gray"
    data: { text: string; time: string }[]
  }
}

export function Transcript() {
  const { transcriptionData } = useData()
  const [searchQuery, setSearchQuery] = useState("")
  const [currentResultIndex, setCurrentResultIndex] = useState(-1)
  const [matchingMessageIds, setMatchingMessageIds] = useState<string[]>([])
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const [showFlagPopup, setShowFlagPopup] = useState(false)
  const [showFlagDataPopup, setShowFlagDataPopup] = useState(false)

  const [activeMsgId, setActiveMsgId] = useState<string | null>(null)
  const [activeFlagData, setActiveFlagData] = useState<{ text: string; time: string }[]>([])

  const safeMessages = Array.isArray(transcriptionData?.messages) ? transcriptionData.messages : []

  // --------------------------------------------------
  // SEARCH LOGIC
  // --------------------------------------------------
  useEffect(() => {
    
    if (!searchQuery.trim()) {
      setMatchingMessageIds([])
      setCurrentResultIndex(-1)
      return
    }

    const q = searchQuery.toLowerCase()
    const matchIds = safeMessages
      .filter((msg: any) => msg.content?.toLowerCase().includes(q) || msg.isAICue)
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

  const handleNext = () => setCurrentResultIndex((prev) => (prev >= matchingMessageIds.length - 1 ? 0 : prev + 1))

  const handleClearSearch = () => {
    setSearchQuery("")
    setMatchingMessageIds([])
    setCurrentResultIndex(-1)
  }

  const filteredMessages = safeMessages.filter(
    (msg: any) => msg.content?.toLowerCase().includes(searchQuery.toLowerCase()) || msg.isAICue,
  )

  // --------------------------------------------------
  // AI PROMPT RENDERER
  // --------------------------------------------------
  const renderAiPrompt = (aiPrompt: any) => {
    if (!aiPrompt) return null

    if (typeof aiPrompt === "object" && !Array.isArray(aiPrompt)) {
      if (aiPrompt.aiPrompt) {
        aiPrompt = aiPrompt.aiPrompt
      } else {
        return <p className="text-xs text-blue-800 leading-relaxed">{JSON.stringify(aiPrompt)}</p>
      }
    }

    if (typeof aiPrompt === "string") {
      return <p className="text-xs text-blue-800 leading-relaxed">{aiPrompt}</p>
    }

    if (Array.isArray(aiPrompt)) {
      return aiPrompt.map((line, i) => (
        <p key={i} className="text-xs text-blue-800 leading-relaxed">
          {typeof line === "string" ? line : JSON.stringify(line)}
        </p>
      ))
    }

    return <p className="text-xs text-blue-800 leading-relaxed">{JSON.stringify(aiPrompt)}</p>
  }

  // --------------------------------------------------
  // POPUPS
  // --------------------------------------------------
  const openFlagPopup = (id: string) => {
    setActiveMsgId(id)
    setShowFlagPopup(true)
  }

  const closeFlagPopup = () => {
    setShowFlagPopup(false)
    setActiveMsgId(null)
  }

  const openFlagDataPopup = (data: any[]) => {
    setActiveFlagData(data)
    setShowFlagDataPopup(true)
  }

  const closeFlagDataPopup = () => {
    setShowFlagDataPopup(false)
    setActiveFlagData([])
  }

  // --------------------------------------------------
  // UI
  // --------------------------------------------------
  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* ADD FLAG POPUP */}
      {showFlagPopup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-xl w-80 shadow-xl">
            <h3 className="text-sm font-semibold mb-3">Add Flag</h3>

            <input
              id="flagText"
              type="text"
              placeholder="Enter flag..."
              className="w-full border border-slate-300 rounded-lg px-3 py-2 mb-3 text-sm"
            />

            <div className="flex justify-end gap-2">
              <button onClick={closeFlagPopup} className="text-sm px-3 py-1.5 rounded-lg border border-slate-300">
                Cancel
              </button>

              <button
                onClick={() => {
                  const text = (document.getElementById("flagText") as HTMLInputElement).value.trim()

                  if (!text) return

                  console.log("ADD FLAG:", activeMsgId, text)

                  closeFlagPopup()
                }}
                className="text-sm px-3 py-1.5 rounded-lg bg-blue-600 text-white"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FLAG DATA POPUP (RED/BLUE) */}
      {showFlagDataPopup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-xl w-96 shadow-xl max-h-96 overflow-y-auto">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-sm font-semibold">Flag Details</h3>
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-200 text-xs font-semibold">
                {activeFlagData.length}
              </span>
            </div>

            {activeFlagData.length === 0 ? (
              <p className="text-sm text-slate-600">No flags available</p>
            ) : (
              <ul className="space-y-2">
                {activeFlagData.map((d, i) => (
                  <li
                    key={i}
                    className="border border-slate-200 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
                  >
                    <p className="font-medium text-sm">{d.text}</p>
                    <p className="text-xs text-slate-500 mt-1">{d.time}</p>
                  </li>
                ))}
              </ul>
            )}

            <button
              onClick={closeFlagDataPopup}
              className="mt-4 px-4 py-2 bg-black text-white rounded-md w-full text-sm font-medium"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div className="border-b border-slate-200 px-6 py-4 bg-slate-50 flex-shrink-0">
        <h3 className="text-sm font-semibold text-slate-900">Call Transcript</h3>
        <p className="text-xs text-slate-500 mt-1">Real-time conversation analysis with AI insights</p>
      </div>

      {/* SEARCH BAR */}
      <div className="px-6 py-3 border-b border-slate-200 bg-white flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search transcript..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-9 py-2 border border-slate-300 rounded-lg text-sm"
            />

            {searchQuery && (
              <button onClick={handleClearSearch} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {searchQuery && matchingMessageIds.length > 0 && (
            <div className="flex items-center gap-1 whitespace-nowrap">
              <span className="text-xs text-slate-600 font-medium px-2">
                {currentResultIndex + 1} of {matchingMessageIds.length}
              </span>

              <button onClick={handlePrevious} className="p-1.5 rounded border border-slate-300">
                <ChevronUp className="h-4 w-4" />
              </button>

              <button onClick={handleNext} className="p-1.5 rounded border border-slate-300">
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-6 space-y-5 min-h-0">
        {filteredMessages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-8">
            <Search className="h-8 w-8 text-slate-300 mb-2" />
            <p className="text-sm text-slate-500">{searchQuery ? "No messages found" : "Search for messages..."}</p>
          </div>
        ) : (
          filteredMessages.map((msg: TranscriptMessage) => {
            const isCurrent = matchingMessageIds[currentResultIndex] === msg.id

            return (
              <div
                key={msg.id}
                id={`msg-${msg.id}`}
                className={`space-y-3 transition-all duration-200 ${
                  isCurrent ? "ring-2 ring-amber-400 rounded-lg p-3 bg-amber-50" : ""
                }`}
              >
                {/* AI CUE */}
                {msg.isAICue && (
                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <Zap className="h-4 w-4 text-blue-600 mt-1" />
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-blue-900 mb-1">AI Insight</p>
                      {renderAiPrompt(msg.aiPrompt)}
                    </div>
                  </div>
                )}

                {/* REGULAR MESSAGE */}
                <div className="flex gap-3">
                  <div className="flex flex-col items-center gap-1">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold text-white ${
                        msg.speaker === "Agent" ? "bg-indigo-600" : "bg-emerald-600"
                      }`}
                    >
                      {msg.speaker === "Agent" ? "A" : "C"}
                    </div>

                    {/* FLAG INDICATOR */}
                    {msg.flags && (
                      <button
                        onClick={() => {
                          if (msg?.flags?.color === "gray") {
                            openFlagPopup(msg.id)
                          } else {
                            openFlagDataPopup(msg?.flags?.data)
                          }
                        }}
                        className={`mt-1 px-2 py-1 rounded-full flex items-center gap-1 text-xs font-medium transition-all duration-200 hover:scale-105 ${
                          msg.flags.color === "red"
                            ? "bg-red-100 text-red-700 hover:bg-red-200 border border-red-300"
                            : msg.flags.color === "blue"
                              ? "bg-blue-100 text-blue-700 hover:bg-blue-200 border border-blue-300"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
                        }`}
                        title={msg.flags.color !== "gray" ? `${msg.flags.data?.length || 0} flags` : "Add flag"}
                      >
                        <Flag className="h-3 w-3" />
                        {msg.flags.color !== "gray" && <span>{msg.flags.data?.length || 0}</span>}
                      </button>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-baseline gap-2 mb-1">
                      <p className="text-xs font-semibold">{msg.speaker}</p>
                      <p className="text-xs text-slate-400">{msg.time}</p>
                    </div>

                    <p
                      className={`text-sm leading-relaxed ${
                        msg.isHighlighted ? "bg-amber-50 p-2 rounded border border-amber-200" : ""
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
