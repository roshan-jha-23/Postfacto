import type React from "react"
import { useState, useCallback } from "react"
import axios from "axios"
import { useAppSelector, useAppDispatch } from "../redux/store/store"
import { addCuesFeedback, type CueItem } from "../redux/reducers/cuesReducer"

const AICuesWithFeedback = ({ type }: { type: string }) => {
  const dispatch = useAppDispatch()
  const aiCues = useAppSelector((state) => state.cues.cues)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCue, setSelectedCue] = useState<CueItem | null>(null)
  const [feedbackComment, setFeedbackComment] = useState("")
  const [isSending, setIsSending] = useState(false)

  console.log("AI Cues data from context:", aiCues, type)

  // 🧠 Handle both object and array structures
  let selectedType: any = null

  if (Array.isArray(aiCues)) {
    const found = aiCues.find((item: any) => item.type === type)
    selectedType = found?.cues || []
  } else if (typeof aiCues === "object" && aiCues !== null) {
    selectedType = aiCues?.[type] || {}
  }

  console.log("selectedType in new component:", selectedType)

  const openModal = useCallback((cue: CueItem) => {
    setSelectedCue(cue)
    setIsModalOpen(true)
    setFeedbackComment("")
  }, [])

  const closeModal = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  const handleFeedbackSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const url = window.location.href
  const match = url.match(/cid_\d{4}/)
  let customerId = ""
  if (match) {
    customerId = match[0]
    console.log(customerId)
  } else {
    console.log("cid_xxxx not found")
  }
    event.preventDefault()
    const comment = feedbackComment.trim()
    if (!comment || !selectedCue) return
    console.log("Submitting feedback---:", comment, selectedCue)
    const payload = {
      name: "Testers",
      feedback: comment,
      pid: selectedCue.pid,
      type:'cues',
      topic: type,
      session_id: customerId, // ideally from context or redux
    }

    console.log("Sending feedback to backend:", payload)

    try {
      setIsSending(true)
      await axios.post("https://wpv7kxos9g.execute-api.ap-south-1.amazonaws.com/test/recruito-upload-apis/main_router", {
        trigger_func: "insurance_feedback_form",
        params: {
          name: payload.name,
          feedback: payload.feedback,
          pid: payload.pid,
          type: payload.type,
          topic: payload.topic,
          session_id: payload.session_id,
        },
      })

      console.log("✅ Feedback submitted successfully")

      dispatch(
        addCuesFeedback({
          name: payload.name,
          feedback: payload.feedback,
          timeStamp: new Date().toISOString(),
          pid: payload.pid,
          type: payload.type,
          section: "cues",
        })
      )

      setFeedbackComment("")
      setIsModalOpen(false)
    } catch (error) {
      console.error("❌ Error submitting feedback:", error)
    } finally {
      setIsSending(false)
    }
  }

  const CueCard = ({ cue }: { cue: CueItem }) => {
    const feedbackCount = cue?.feedbacks?.length || 0
    const header = (cue?.data as any)?.header || ""
    const lines = Array.isArray((cue?.data as any)?.data) ? (cue?.data as any).data : []
    const keyId = cue?.pid || (cue?.data as any)?.id || header

    return (
      <div className="bg-blue-50 p-4 rounded-lg shadow-sm" key={keyId}>
        <div className="flex justify-between items-start">
          <div>
            <p className="font-medium text-blue-800 mb-2">{header}</p>
            {lines.map((d: any) => (
              <p key={d.id} className="text-gray-800 text-sm mb-1 ml-2">
                • {d.text}
              </p>
            ))}
          </div>
          <button
            onClick={() => openModal(cue)}
            className="relative p-2 rounded-full text-gray-500 hover:bg-blue-100 hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            aria-label={`Open feedback for ${header}`}
          >
            💬
            {feedbackCount > 0 && (
              <span className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4 bg-blue-600 text-white text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full border-2 border-blue-50">
                {feedbackCount}
              </span>
            )}
          </button>
        </div>
      </div>
    )
  }

  const FeedbackModal = () => {
    if (!isModalOpen || !selectedCue) return null

    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"
        onClick={(e) => {
          if (e.target === e.currentTarget) closeModal()
        }}
      >
        <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg">
          <div className="flex justify-between items-center mb-4 border-b pb-3">
            <h3 className="text-lg font-bold text-gray-800">
              Feedback for: "{(selectedCue?.data as any)?.header || ""}"
            </h3>
            <button
              onClick={closeModal}
              className="text-gray-400 hover:text-gray-700 text-2xl font-bold"
              aria-label="Close modal"
            >
              &times;
            </button>
          </div>

          <div className="mb-6 h-48 overflow-y-auto pr-2">
            <h4 className="text-md font-semibold text-gray-600 mb-3">Feedback</h4>
            <div className="space-y-3">
              {(selectedCue?.feedbacks?.length || 0) === 0 ? (
                <p className="text-sm text-gray-500 italic">No feedback yet for this cue.</p>
              ) : (
                selectedCue.feedbacks.map((fb, idx) => (
                  <div key={fb.id ?? idx} className="bg-gray-100 p-3 rounded-md">
                    <p className="font-semibold text-sm text-gray-700">{fb.name}</p>
                    <p className="text-sm text-gray-600 whitespace-pre-wrap">{fb.feedback}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          <form onSubmit={handleFeedbackSubmit}>
            <label htmlFor="feedback-comment" className="block text-md font-semibold text-gray-600 mb-2">
              Share Your Feedback
            </label>
            <textarea
              id="feedback-comment"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              rows={4}
              placeholder="What did you like or what could be improved?"
              required
              value={feedbackComment}
              onChange={(e) => setFeedbackComment(e.target.value)}
            />
            <div className="flex justify-end items-center mt-4">
              <button
                type="button"
                onClick={closeModal}
                className="mr-2 py-2 px-4 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSending}
                className={`py-2 px-4 rounded-md font-semibold text-white transition ${
                  isSending
                    ? "bg-blue-300 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                }`}
              >
                {isSending ? "Sending..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-100 p-4 sm:p-8 font-sans min-h-screen">
      <main className="max-w-4xl mx-auto">
        <div
          id="ai-cues-container"
          className="bg-white rounded-2xl shadow-sm p-6 min-h-[550px] max-h-[600px] overflow-y-auto"
        >
          <h2 className="text-xl font-semibold mb-4 text-gray-700">AI-Cues - {type}</h2>

          {/* scrollable cues list */}
          <div className="space-y-4 max-h-[450px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
            {Array.isArray(selectedType)
              ? selectedType.map((cue: any) => (
                  <CueCard key={cue?.pid || (cue as any)?.data?.id || cue?.timeStamp} cue={cue} />
                ))
              : Object.values(selectedType || {}).map((cue: any) => (
                  <CueCard key={cue?.pid || (cue as any)?.data?.id || cue?.timeStamp} cue={cue} />
                ))}
          </div>
        </div>
      </main>

      <FeedbackModal />
    </div>
  )
}

export default AICuesWithFeedback
