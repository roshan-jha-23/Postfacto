"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Search, MessageSquare, X, Send } from "lucide-react"
import axios from "axios"
import { useAppSelector, useAppDispatch } from "../redux/store/store"
import { addCuesFeedback } from "../redux/reducers/cuesReducer"

interface FeedbackItem {
  id?: string
  name: string
  feedback: string
  timeStamp?: string | Date
}

interface ModelParams {
  isOpen: boolean
  feedbacks: FeedbackItem[]
  transcript: string
  tabType: string
  pid: string
}

interface FeedbackModalProps {
  modelParams: ModelParams
  onClose: () => void
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ modelParams, onClose }) => {
  const dispatch = useAppDispatch()
  const [feedbackText, setFeedbackText] = useState("")
  const [isSending, setIsSending] = useState(false)

  useEffect(() => {
    document.body.style.overflowY = modelParams.isOpen ? "hidden" : "scroll"
    return () => {
      document.body.style.overflowY = "scroll"
    }
  }, [modelParams.isOpen])

  if (!modelParams.isOpen) return null

  const handleSubmit = async () => {
    const url = window.location.href
    const match = url.match(/cid_\d{4}/)
    const customerId = match ? match[0] : ""

    const comment = feedbackText.trim()
    if (!comment) return

    try {
      setIsSending(true)
      const payload = {
        name: "Testers",
        feedback: comment,
        pid: modelParams?.pid || "unknown_pid",
        type: "transcript",
        topic: modelParams.tabType,
        session_id: customerId,
      }

      await axios.post(
        "https://wpv7kxos9g.execute-api.ap-south-1.amazonaws.com/test/recruito-upload-apis/main_router",
        {
          trigger_func: "insurance_feedback_form",
          params: payload,
        },
      )

      dispatch(
        addCuesFeedback({
          name: payload.name,
          feedback: payload.feedback,
          timeStamp: new Date().toISOString(),
          pid: payload.pid,
          type: payload.type,
          section: "transcript",
        }),
      )

      setFeedbackText("")
      onClose()
    } catch (err) {
      console.error("❌ Error submitting feedback:", err)
    } finally {
      setIsSending(false)
    }
  }

  const formatDate = (d: string | Date) => {
    const date = typeof d === "string" ? new Date(d) : d
    return (
      date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true }) +
      " - " +
      date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
    )
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-4 z-50"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col">
        <div className="p-5 border-b flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-800">Developer Feedback</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-5 bg-purple-50 border-b">
          <p className="text-xs font-semibold uppercase text-purple-700 mb-1">{modelParams.tabType}</p>
          <p className="text-base font-medium italic text-gray-700 leading-snug">"{modelParams.transcript}"</p>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          <h4 className="text-sm font-semibold text-gray-600 sticky top-0 bg-white pb-2 border-b">
            Existing Feedback ({modelParams.feedbacks.length})
          </h4>

          {modelParams.feedbacks.length === 0 ? (
            <p className="text-sm text-gray-500 italic">No feedback submitted yet for this line.</p>
          ) : (
            modelParams.feedbacks.map((feedback, i) => (
              <div key={feedback?.id || i} className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                <div className="flex justify-between items-center text-xs text-gray-500 mb-1">
                  <span className="font-medium text-gray-700">{feedback?.name || "-"}</span>
                  <span>{formatDate(feedback?.timeStamp || new Date())}</span>
                </div>
                <p className="text-sm text-gray-800">{feedback?.feedback}</p>
              </div>
            ))
          )}
        </div>

        <div className="p-5 border-t bg-gray-50">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Submit New Feedback</h4>
          <div className="flex items-end space-x-2">
            <textarea
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              rows={3}
              placeholder="Type your feedback here..."
              className="flex-1 p-3 border border-gray-300 rounded-lg text-sm resize-none focus:ring-purple-500 focus:border-purple-500"
            />
            <button
              onClick={handleSubmit}
              disabled={isSending}
              className={`p-3 rounded-full shadow-lg transition text-white ${
                isSending ? "bg-purple-300" : "bg-purple-600 hover:bg-purple-700"
              }`}
            >
              {isSending ? "..." : <Send className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function TranscriptPanel() {
  const [query, setQuery] = useState("")
  const [modelParams, setModelParams] = useState<ModelParams>({
    isOpen: false,
    feedbacks: [],
    transcript: "",
    tabType: "",
    pid: "",
  })

  const transcription = useAppSelector((state) => state.transcription.transcription)

  // Normalize data flexibly
  const normalizedData = (() => {
    if (!transcription) return {}

    // Case 1: Already object
    if (typeof transcription === "object" && !Array.isArray(transcription)) return transcription

    // Case 2: Array of groups
    if (Array.isArray(transcription)) {
      const map: Record<string, any[]> = {}
      transcription.forEach((group: any) => {
        const items = Array.isArray(group?.transcripts)
          ? group.transcripts
          : Array.isArray(group?.transcript)
            ? group.transcript
            : null

        if (group?.type && items) {
          map[group.type] = (map[group.type] || []).concat(items)
        } else if (group?.type && group?.data) {
          map[group.type] = [...(map[group.type] || []), group]
        }
      })
      return map
    }

    return {}
  })()

  const filteredData = Object.entries(normalizedData).reduce(
    (acc, [type, items]: [string, any[]]) => {
      acc[type] = items.filter(
        (line) => !query || (line?.data && line.data.toLowerCase().includes(query.toLowerCase())),
      )
      return acc
    },
    {} as Record<string, any[]>,
  )

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col font-sans h-full">
      <div className="flex justify-between items-center mb-5 border-b pb-4">
        <h2 className="text-xl font-bold text-gray-800">Interview Transcript</h2>
        <div className="relative w-60">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search transcript..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <style>{`
          .custom-scrollbar::-webkit-scrollbar { width: 8px; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #d1d5db; border-radius: 10px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        `}</style>

        <div className="flex flex-col gap-6">
          {Object.entries(filteredData).map(([type, items]: [string, any[]]) => (
            <div key={type} className="space-y-3">
              <h3 className="font-bold text-lg text-purple-700 pb-1">{type}</h3>
              <div className="flex flex-col gap-3">
                {items.map((t: any, idx: number) => (
                  <div
                    key={t?.id || idx}
                    className={`flex justify-between items-center p-3 rounded-xl shadow-sm text-sm leading-relaxed transition ${
                      type === "Basic Info"
                        ? "bg-blue-50 border-l-4 border-blue-400"
                        : "bg-green-50 border-l-4 border-green-400"
                    }`}
                  >
                    <span className="text-gray-800 flex-1 pr-4">{t?.data || t}</span>
                    <button
                      onClick={() =>
                        setModelParams({
                          isOpen: true,
                          transcript: t?.data || t,
                          feedbacks: t?.feedbacks || [],
                          tabType: type,
                          pid: t?.pid || `${type}_${idx}`,
                        })
                      }
                      className="flex items-center space-x-1 text-gray-500 hover:text-purple-600 transition duration-150 p-1 rounded-full hover:bg-white"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span className="text-xs font-medium min-w-[10px]">({t?.feedbacks?.length || 0})</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {Object.keys(filteredData).length === 0 && (
            <p className="text-gray-500 text-sm italic mt-4 p-4 text-center">
              No transcript lines match your search query: "{query}"
            </p>
          )}
        </div>
      </div>

      {modelParams.isOpen && (
        <FeedbackModal modelParams={modelParams} onClose={() => setModelParams({ ...modelParams, isOpen: false })} />
      )}
    </div>
  )
}

export default TranscriptPanel
