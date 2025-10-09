import React, { useMemo, useState } from "react"
import { Search } from "lucide-react"
import { useData } from "../context/DataWrapper"

export interface TranscriptGroup {
  type: string
  transcript: string[]
}

interface TranscriptPanelProps {
  // Optional: pass transcription in from caller; falls back to defaults if empty/not provided
  transcription?: TranscriptGroup[]
}

export function TranscriptPanel({ transcription = [] }: TranscriptPanelProps) {
  const { transcription: contextTranscription }: any = useData()

  const transcriptMessages:any =
    transcription?.length > 0
      ? transcription
      : contextTranscription?.length > 0
        ? contextTranscription
        : [
            {
              type: "Basic Info",
              transcript: [
                "Hi, my name is Varun.",
                "I currently live in Hyderabad.",
                "I work as a software developer.",
              ],
            },
            { type: "Assets", transcript: ["text1", "text2", "text3"] },
          ]

  const [query, setQuery] = useState("")

  const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  const highlightText = (text: string, q: string) => {
    if (!q) return text
    const regex = new RegExp(`(${escapeRegExp(q)})`, "gi")
    const parts = text.split(regex)
    return parts.map((part, i) =>
      i % 2 === 1 ? (
        <mark key={i} className="bg-yellow-200 px-0.5 rounded">
          {part}
        </mark>
      ) : (
        <React.Fragment key={i}>{part}</React.Fragment>
      ),
    )
  }

  const totalMatches = useMemo(() => {
    if (!query) return 0
    const rx = new RegExp(escapeRegExp(query), "gi")
    return transcriptMessages.reduce(
      (sum:any, group:any) => sum + group.transcript.reduce((s:any, line:any) => s + (line.match(rx) || []).length, 0),
      0,
    )
  }, [transcriptMessages, query])

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 h-[550px] flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg font-semibold text-gray-800">Transcript Available</h2>
        <div className="flex items-center gap-2">
          <div className="relative w-60">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search transcript..."
              value={query} // bind query
              onChange={(e) => setQuery(e.target.value)} // update query
              className="w-full pl-10 pr-4 py-2 text-sm rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          {query && (
            <span className="text-xs text-gray-500 font-medium">
              {totalMatches} match{totalMatches === 1 ? "" : "es"}
            </span>
          )}
        </div>
      </div>

      {/* Transcript Section */}
      <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        <div className="flex flex-col gap-6">
          {transcriptMessages.map((group:any, index:any) => (
            <div key={index} className="space-y-2">
              {/* Group Title */}
              <h3 className="font-semibold text-gray-700">{group.type}</h3>

              {/* Group Messages */}
              <div className="flex flex-col gap-2">
                {group.transcript.map((line:any, idx:any) => (
                  <div
                    key={idx}
                    className={`px-4 py-2 rounded-lg text-sm leading-relaxed ${
                      group.type === "Basic Info"
                        ? "bg-blue-50 text-gray-800 self-start"
                        : "bg-green-50 text-gray-800 self-start"
                    }`}
                  >
                    <span>{highlightText(line, query)}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
