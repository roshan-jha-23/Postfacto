import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Search, MessageSquare, ChevronLeft, ChevronRight } from "lucide-react"
import { X, Send } from "lucide-react"
import axios from "axios"
import { useAppSelector, useAppDispatch } from "../redux/store/store"
import { useToast } from "../hooks/use-toast"
import {
  addTranscriptionFeedback,
  removeTranscriptionFeedbackById,
  confirmTranscriptionFeedback,
} from "../redux/reducers/transcriptionReducer"

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

const FeedbackModal: React.FC<FeedbackModalProps> = ({ modelParams, onClose }) => 
  {
  const dispatch = useAppDispatch()
  const { toast } = useToast()    //  toast feedback  hook   
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

    const tempId = `temp-${Date.now()}` as const
    const pid = modelParams?.pid || "unknown_pid"
    const type = modelParams.tabType
    const name = localStorage.getItem("postfacto_details")
      ? JSON.parse(localStorage.getItem("postfacto_details") || "").username
      : "Testers"
    console.log(name, "name of the tester")
    const optimisticFeedback = {
      id: tempId,
      name: "Testers",
      feedback: comment,
      timeStamp: new Date().toISOString(),
      pid,
      type,
      section: "transcript" as const,
    }

    const payload = {
      name: name,
      feedback: comment,
      pid,
      type: "transcript",
      topic: type,
      session_id: customerId || "cid_5815",
    }

    try {
      setIsSending(true)

      dispatch(addTranscriptionFeedback(optimisticFeedback))
      onClose()

      const res = await axios.post(
        "https://wpv7kxos9g.execute-api.ap-south-1.amazonaws.com/test/recruito-upload-apis/main_router",
        {
          trigger_func: "insurance_feedback_form",
          params: payload,
        },
      )

      const serverId: string | undefined = res?.data?.id || res?.data?.payload?.id || res?.data?.feedback_id
      const serverTime: string | undefined = res?.data?.timestamp || new Date().toISOString()

      dispatch(
        confirmTranscriptionFeedback({
          pid,
          type,
          tempId,
          patch: {
            id: serverId || tempId,
            timeStamp: serverTime,
          },
        }),
      )
      toast({ title: "Feedback submitted", description: "Your feedback has been saved." })
      setFeedbackText("")
    } catch (err) {
      console.error("❌ Error submitting feedback:", err)
      dispatch(removeTranscriptionFeedbackById({ pid, type, id: tempId }))
      toast({
        title: "Submission failed",
        description: "We rolled back your change. Please try again.",
        variant: "destructive",
      })
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

        <div className="p-5 bg-gray-50 border-b">
          <p className="text-xs font-semibold uppercase text-gray-600 mb-1">{modelParams.tabType}</p>
          <p className="text-base font-medium italic text-gray-700 leading-snug">"{modelParams.transcript}"</p>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto p-5 space-y-4">
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
              className="flex-1 p-3 border border-gray-200 rounded-lg text-sm resize-none focus:ring-gray-400 focus:border-gray-400"
            />
            <button
              onClick={handleSubmit}
              disabled={isSending}
              className={`px-3 py-2 rounded-md transition text-white ${
                isSending ? "bg-purple-400/80" : "bg-purple-600 hover:bg-purple-700/90"
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
  const [matchIndex, setMatchIndex] = useState(0)
  const [matchCount, setMatchCount] = useState(0)
  const [modelParams, setModelParams] = useState({
    isOpen: false,
    feedbacks: [],
    transcript: "",
    tabType: "",
    pid: "",
  })

  const transcription = useAppSelector((state) => state.transcription.transcription)
  const transcriptContainer = useRef<HTMLDivElement>(null)

  // Normalize transcription same as before
  const normalizedData = (() => {
    if (!transcription) return {}
    if (typeof transcription === "object" && !Array.isArray(transcription)) return transcription
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

  // Highlight search term like PDF
  const highlightText = (text: string, term: string) => {
    if (!term) return text
    const regex = new RegExp(`(${term})`, "gi")
    return text.replace(
      regex,
      `<mark class="bg-red-400 text-white font-semibold rounded px-1" data-search-match="true">$1</mark>`,
    )
  }

  useEffect(() => {
    if (!query || !transcriptContainer.current) {
      setMatchCount(0)
      setMatchIndex(0)
      // Clear all highlights
      const allMarks = transcriptContainer.current?.querySelectorAll("mark[data-search-match]")
      allMarks?.forEach((m) => {
        m.setAttribute("data-search-match", "inactive")
      })
      return
    }

    // Find all marks and update count
    const timer = setTimeout(() => {
      const marks = transcriptContainer.current?.querySelectorAll("mark[data-search-match]") || []
      setMatchCount(marks.length)
      setMatchIndex(0)

      // Highlight all marks as inactive initially
      marks.forEach((m) => {
        m.setAttribute("data-search-match", "inactive")
      })
    }, 50)

    return () => clearTimeout(timer)
  }, [query])

  useEffect(() => {
    if (matchCount === 0 || !transcriptContainer.current) return

    const marks = transcriptContainer.current.querySelectorAll("mark[data-search-match]")

    if (marks.length > 0 && marks[matchIndex]) {
      const currentMatch = marks[matchIndex] as HTMLElement

      // Update all marks: current is active, others are inactive
      marks.forEach((m, i) => {
        if (i === matchIndex) {
          m.setAttribute("data-search-match", "active")
        } else {
          m.setAttribute("data-search-match", "inactive")
        }
      })

      // Scroll to current match with a small delay to ensure DOM is ready
      setTimeout(() => {
        currentMatch.scrollIntoView({ behavior: "smooth", block: "center" })
      }, 0)
    }
  }, [matchIndex, matchCount])

  const handleNext = () => {
    if (matchCount > 0) {
      setMatchIndex((prev) => (prev + 1) % matchCount)
    }
  }

  const handlePrev = () => {
    if (matchCount > 0) {
      setMatchIndex((prev) => (prev - 1 + matchCount) % matchCount)
    }
  }

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
    <div className="bg-white rounded-2xl shadow-xl p-6 flex min-h-0 flex-col font-sans h-full">
      <div className="flex justify-between items-center mb-5 border-b pb-4 shrink-0 sticky top-0 bg-white z-10">
        <h2 className="text-xl font-bold text-gray-800">Transcript</h2>
        <div className="flex items-center gap-2">
          <div className="relative w-60">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search transcript..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2 text-sm rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          {query && (
            <div className="flex items-center text-sm text-gray-600 gap-1 ml-2">
              <button
                onClick={handlePrev}
                disabled={matchCount === 0}
                className="p-1 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                title="Previous match"
              >
                <ChevronLeft className="w-4 h-4 cursor-pointer hover:text-purple-500 transition" />
              </button>
              <span className="min-w-[40px] text-center">
                {matchCount ? matchIndex + 1 : 0}/{matchCount}
              </span>
              <button
                onClick={handleNext}
                disabled={matchCount === 0}
                className="p-1 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                title="Next match"
              >
                <ChevronRight className="w-4 h-4 cursor-pointer hover:text-purple-500 transition" />
              </button>
            </div>
          )}
        </div>
      </div>

      <div ref={transcriptContainer} className="flex-1 min-h-0 overflow-y-auto pr-2 custom-scrollbar">
        <style>{`
          .custom-scrollbar::-webkit-scrollbar { width: 8px; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #d1d5db; border-radius: 10px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }

          mark { border-radius: 4px; padding: 0 2px; }
        `}</style>

        <div className="flex flex-col gap-6">
          {Object.entries(filteredData).map(([type, items]: [string, any[]]) => (
            <div key={type} className="space-y-3">
              <h3 className="font-bold text-lg text-purple-700 pb-1">{type}</h3>
              <div className="flex flex-col gap-3">
                {items.map((t: any, idx: number) => (
                  <div
                    key={t?.id || idx}
                    className={`grid grid-cols-[1fr_auto] items-start gap-3 p-4 rounded-xl text-sm leading-relaxed transition ${
                      type === "Basic Info"
                        ? "bg-blue-50 border border-blue-100 border-l-2"
                        : "bg-green-50 border border-green-100 border-l-2"
                    } hover:shadow-sm`}
                  >
                    <div
                      className="text-gray-800 whitespace-pre-wrap break-words text-pretty min-w-0"
                      dangerouslySetInnerHTML={{
                        __html: highlightText(t?.data || t, query),
                      }}
                    />

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
                      className="row-start-1 col-start-2 self-start shrink-0 flex items-center justify-center p-2 rounded-full text-gray-600 bg-white border border-gray-200 hover:bg-gray-100 hover:text-gray-800 shadow-none transition-colors"
                      title="Add/View feedback"
                    >
                      <MessageSquare className="w-5 h-5" />
                      <span className="ml-1 text-[10px] font-medium text-gray-600">({t?.feedbacks?.length || 0})</span>
                    </button>

                    <span className="col-span-2 justify-self-end text-[11px] text-gray-500/80 px-2 py-0.5 rounded-full bg-gray-100 border border-gray-200 font-mono tabular-nums select-none pointer-events-none mt-2">
                      {t.timeStamp}
                    </span>
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
