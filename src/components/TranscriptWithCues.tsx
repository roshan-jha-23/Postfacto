"use client"

import { useState } from "react"
import { Search, Zap } from "lucide-react"
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

  const safeMessages = Array.isArray(transcriptionData?.messages)
    ? transcriptionData.messages
    : []

  const filteredMessages = safeMessages.filter(
    (msg:any) =>
      msg.content?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.isAICue
  )

  // ------ SAFE RENDER FUNCTION --------
  const renderAiPrompt = (aiPrompt: any) => {
    if (!aiPrompt) return null

    // if it's string
    if (typeof aiPrompt === "string") {
      return <p className="text-xs text-blue-800 leading-relaxed">{aiPrompt}</p>
    }

    // if it's array
    if (Array.isArray(aiPrompt)) {
      return aiPrompt.map((line, idx) => (
        <p key={idx} className="text-xs text-blue-800 leading-relaxed">
          {typeof line === "string" ? line : JSON.stringify(line)}
        </p>
      ))
    }

    // if it's object
    return (
      <p className="text-xs text-blue-800 leading-relaxed">
        {JSON.stringify(aiPrompt)}
      </p>
    )
  }

  return (
    <div className="flex flex-col h-full bg-white border-l border-slate-200 w-full">

      <div className="border-b border-slate-200 px-6 py-4 bg-slate-50">
        <h3 className="text-sm font-semibold text-slate-900">Call Transcript</h3>
        <p className="text-xs text-slate-500 mt-1">Real-time conversation analysis with AI insights</p>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-5">
        {filteredMessages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-8">
            <Search className="h-8 w-8 text-slate-300 mb-2" />
            <p className="text-sm text-slate-500">No messages found</p>
          </div>
        ) : (
          filteredMessages.map((msg: TranscriptMessage) => (
            <div key={msg.id} className="space-y-3">

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
                    <p className="text-xs font-semibold text-slate-900">
                      {msg.speaker}
                    </p>
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
          ))
        )}
      </div>

      <div className="p-4 border-t border-slate-200 bg-slate-50">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search transcript..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
        </div>
      </div>
    </div>
  )
}
