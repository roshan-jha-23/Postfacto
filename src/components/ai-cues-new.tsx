import React, { useState, useCallback, useMemo } from "react"
import axios from "axios"
import { useAppSelector, useAppDispatch } from "../redux/store/store"
import { addCuesFeedback, type CueItem } from "../redux/reducers/cuesReducer"
import { MessageSquare } from "lucide-react"

const FeedbackModal = React.memo(
  ({
    isModalOpen,
    selectedCue,
    feedbackComment,
    setFeedbackComment,
    isSending,
    handleFeedbackSubmit,
    closeModal,
  }: {
    isModalOpen: boolean
    selectedCue: CueItem | null
    feedbackComment: string
    setFeedbackComment: (value: string) => void
    isSending: boolean
    handleFeedbackSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    closeModal: () => void
  }) => {
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
            <button onClick={closeModal} className="text-gray-400 hover:text-gray-700 text-2xl font-bold">
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
  },
)

const AICuesWithFeedback = ({ type }: { type?: string }) => {
  const dispatch = useAppDispatch()
  const aiCues = useAppSelector((state) => state.cues.cues)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCue, setSelectedCue] = useState<CueItem | null>(null)
  const [feedbackComment, setFeedbackComment] = useState("")
  const [isSending, setIsSending] = useState(false)

  type CueWithGroup = CueItem & { __groupType: string }
  const allCues: CueWithGroup[] = useMemo(() => {
    return (aiCues || []).flatMap((group) => (group?.cues || []).map((c) => ({ ...c, __groupType: group.type })))
  }, [aiCues])

  const openModal = useCallback((cue: CueItem) => {
    setSelectedCue(cue)
    setIsModalOpen(true)
    setFeedbackComment("")
  }, [])

  const closeModal = useCallback(() => setIsModalOpen(false), [])

  const handleFeedbackSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const comment = feedbackComment.trim()
    if (!comment || !selectedCue) return

    const name = localStorage.getItem("postfacto_details")
      ? JSON.parse(localStorage.getItem("postfacto_details") || "").username
      : "Testers"

    const url = window.location.href
    const match = url.match(/cid_\d{4}/)
    let customerId = ""
    if (match) {
      customerId = match[0]
      console.log(customerId)
    } else {
      console.log("cid_xxxx not found")
    }

    const selectedGroupType = (selectedCue as any)?.__groupType ?? type ?? "All"

    const payload = {
      name: name,
      feedback: comment,
      pid: selectedCue.pid,
      type: "cues",
      topic: selectedGroupType,
      session_id: customerId,
    }

    try {
      setIsSending(true)
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
          type: selectedGroupType,
          section: "cues",
        }),
      )

      setSelectedCue((prev: any) =>
        prev
          ? {
              ...prev,
              feedbacks: [
                ...(prev.feedbacks || []),
                {
                  id: Date.now().toString(),
                  name: payload.name,
                  feedback: payload.feedback,
                  timeStamp: new Date().toISOString(),
                },
              ],
            }
          : prev,
      )

      setFeedbackComment("")
      console.log("✅ Feedback submitted successfully")
    } catch (error) {
      console.error("❌ Error submitting feedback:", error)
    } finally {
      setIsSending(false)
    }
  }

  const CueCard = ({ cue }: { cue: CueItem & { __groupType?: string } }) => {
    const feedbackCount = cue?.feedbacks?.length || 0
    const header = (cue?.data as any)?.header || ""
    const lines = Array.isArray((cue?.data as any)?.data) ? (cue?.data as any).data : []
    return (
      <div
        className="relative bg-blue-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
        key={cue.pid}
      >
        <div className="flex justify-between items-start">
          <div>
            <p className="font-medium text-blue-800 mb-2">{header}</p>
            {lines.map((d: any) => (
              <p key={d.id} className="text-gray-800 text-sm mb-1 ml-2">
                • {d.text}
              </p>
            ))}
          </div>

          <div className="flex flex-col items-end">
            <button
              onClick={() => openModal(cue)}
                      className=" relative row-start-1 col-start-2 self-start shrink-0 flex items-center justify-center p-2 rounded-full text-gray-600 bg-white border border-gray-200 hover:bg-gray-100 hover:text-gray-800 shadow-none transition-colors"
              aria-label={`Open feedback for ${header}`}
            >
              <MessageSquare className="w-9 h-5" />
              {feedbackCount > 0 && (
                <span className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4 bg-blue-600 text-white text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full border-2 border-blue-50">
                  {feedbackCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {cue?.timeStamp && (
       
           <div className="text-right">
             <span className="col-span-2 text-right justify-self-end text-[11px] text-gray-500/80 px-2 py-0.5 rounded-full bg-gray-100 border border-gray-200 font-mono tabular-nums select-none pointer-events-none mt-2.5">
            {new Date(cue.timeStamp).toLocaleString()}
           
                    </span>
           </div>
       
        )}
      </div>
    )
  }

  return (
    <div className="mt-9 sm:p-8 font-sans min-h-screen">
      <main className="max-w-5xl mx-auto">
        <div
          id="ai-cues-container"
          className="bg-white rounded-2xl shadow-sm p-3 min-h-[550px] max-h-[600px] overflow-y-auto"
        >
          <h2 className="text-xl font-semibold mb-4 text-gray-700">AI-Cues</h2>

          <div className="space-y-4 max-h-[450px] overflow-y-auto pr-2">
            {allCues.map((cue) => (
              <CueCard key={cue.pid} cue={cue} />
            ))}
          </div>
        </div>
      </main>

      <FeedbackModal
        isModalOpen={isModalOpen}
        selectedCue={selectedCue}
        feedbackComment={feedbackComment}
        setFeedbackComment={setFeedbackComment}
        isSending={isSending}
        handleFeedbackSubmit={handleFeedbackSubmit}
        closeModal={closeModal}
      />
    </div>
  )
}

export default AICuesWithFeedback
