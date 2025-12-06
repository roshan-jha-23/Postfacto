import { useState, useEffect, useRef, createContext, useContext } from "react"
import type React from "react"
import axios from "axios"
import { useAppDispatch, useAppSelector } from "../redux/store/store"
import { setTranscription } from "../redux/reducers/transcriptionReducer"
import { setCues } from "../redux/reducers/cuesReducer"
import { setCustomerInfo } from "../redux/reducers/customerInfoReducer"
import { setFlag } from "../redux/reducers/flagReducer"

const Context = createContext<any>(null)

export function useData() {
  const ctx = useContext(Context)
  if (!ctx) throw new Error("useData must be used inside DataWrapper")
  return ctx
}

export default function DataWrapper({ children }: { children: React.ReactNode }) {
  const[selectedReco,setSelectedReco]=useState<string>("");
  const [reco,setReco]=useState<[]>([]);
  const url = window.location.href;
  const match = url.match(/cid_\d{4}/);
  const customerId = match ? match[0] : "";
  console.log(customerId,"the id of customer");
  
  if (!customerId) console.log("cid_xxxx not found")
        // const flags=useAppSelector((s)=>s.flags.Flag);


  const dispatch = useAppDispatch()

  // ✅ Active Redux state
  const transcription = useAppSelector((s) => s.transcription.transcription || [])
  const aiCues = useAppSelector((s) => s.cues?.cues || [])
  const financials = useAppSelector((s) => s.customerInfo?.customer_info || [])

  const [audioUrl, setAudioUrl] = useState<string>("")
  const topContainerRef = useRef(null)

useEffect(() => {
  const fetchFinancials = async () => {
    try {
      const res = await axios.post(
        "https://recruito.vitti.insure/lms_router",
       { route_name:"main_router",
        json_data:
          { 
            trigger_func: "req_postfacto_data", 
            params: { session_id: customerId } 
          }}
      )

      console.log("Financials data:", res.data)

      // 🔥 STEP 1: full customer_info array
      const fullInfo = res.data.customer_info || []

      // 🔥 STEP 2: find Recommendations section
      const recoSection = fullInfo.find((x: any) => x.type === "Recommendations")

      // 🔥 STEP 3: safely extract plan names
      const allPlanNames =
        recoSection?.customer_info?.Recommendations?.map(
          (item: any) => item.planName?.value
        ) || []

      console.log("Extracted plan names:", allPlanNames)

      // 🔥 STEP 4: Set to state
      setReco(allPlanNames)

      // Existing redux dispatches
      setAudioUrl(res.data.audio_url || "")
      dispatch(setCustomerInfo(fullInfo))
      dispatch(setTranscription(res.data.transcript || []))
      dispatch(setCues(res.data.cues || []))
      dispatch(setFlag(res.data.flag_data || []))
    
    } catch (err) {
      console.error("Failed to fetch Financials", err)
    }
  }

  fetchFinancials()
}, [dispatch, customerId])


  function updateCuesFeedback(feedbackObj: any) {
    const group = aiCues.find((e: any) => e.type === feedbackObj.type)
    if (!group) return
    const cue = group.cues.find((e: any) => e.id === feedbackObj.cue_id)
    if (!cue) return

    cue.feedbacks.push({
      id: feedbackObj.feedback_id ?? `${Date.now()}`,
      feedback: feedbackObj.feedback,
      name: feedbackObj.name,
      timeStamp: feedbackObj.timeStamp,
      pid: cue.pid, 
      type: cue.pid,
      section: "cues",
    })


    console.log("updateCuesFeedback", cue, group, feedbackObj)
    dispatch(setCues([...aiCues])) // ✅ update redux state
  }

  // ✅ Update transcription feedback
  async function updateTranscriptionFeedback(feedbackObj: any) {
    const group = transcription.find((e: any) => e.type === feedbackObj.type)
    if (!group) return
    const transcript = group.transcripts.find(
      (e: any) => e.transcript_id === feedbackObj.transcript_id
    )
    if (!transcript) return

  transcript.feedbacks.push({
  id: feedbackObj.feedback_id ?? `${Date.now()}`,
  feedback: feedbackObj.feedback,
  name: feedbackObj.name,
  timeStamp: feedbackObj.timeStamp,
  pid: transcript.pid, // ya jis variable se mil raha hai.
  type: transcript.pid,
  section: "transcript",
})



    console.log("updateTranscriptionFeedback", transcript, feedbackObj)

    const reqJson = { ...feedbackObj, session_id: customerId }

    try {
      const res = await axios.post(
        "https://4d5edced2af8.ngrok-free.app/add-feedback",
        reqJson
      )
      console.log("Feedback saved:", res.data)
      dispatch(setTranscription([...transcription]))
    } catch (err) {
      console.error("Failed to save feedback", err)
    }
  }

  const values = {
    transcription,
    aiCues,
    financials,
    setTranscription: (sections: any[]) => dispatch(setTranscription(sections)),
    setAICues: (categories: any[]) => dispatch(setCues(categories)),
    setFinancials: (sections: any[]) => dispatch(setCustomerInfo(sections)),
    audioUrl,
    setAudioUrl,
    topContainerRef,
    updateTranscriptionFeedback,
    updateCuesFeedback,
    selectedReco,
    setSelectedReco,
    reco,
    setReco
  }

  return <Context.Provider value={values}>{children}</Context.Provider>
}
