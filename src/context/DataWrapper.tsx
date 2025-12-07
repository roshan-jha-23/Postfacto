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



const FinalReviewData = 
{
  audio_url:"https://storage.googleapis.com/postfacto-audiofiles/life_insurance_audio/cid_1783.mp3",
  clientDetails: {
    productPitch: "SBI Life Insurance",
    sumAssured: 5000000,
    Location: "Mumbai",
    Family: "2 Adults, 2 Children",
    incomeEmi: "Income: 12 LPA, EMI: 45000",
    lifestyle: "Active Lifestyle"
  },

  performance: {
    overallScore: 66,
    breakdown: [
      { label: "Product Knowledge", score: 9, maxScore: 10 },
      { label: "Rapport Building", score: 9, maxScore: 10 },
      { label: "Needs Analysis", score: 8, maxScore: 10 },
      { label: "Objection Handling", score: 8, maxScore: 10 },
      { label: "Cross-Selling", score: 5, maxScore: 10, color: "amber" },
      { label: "Process Adherence", score: 10, maxScore: 10 }
    ],
    strengths: [
      "Excellent Rapport Building in the first 5 minutes.",
      "Accurate explanation of \"Infinite Care\" add-on.",
      "Successfully handled the \"Price\" objection."
    ],
    improvements: [
      "Missed cross-selling \"Personal Accident\" cover.",
      "Did not explicitly ask for a reference at closing.",
      "Talk-to-Listen ratio (65:35) is slightly high."
    ]
  },

  
  transcription: {
    messages: [
      {
        id: "1",
        speaker: "Agent",
        name: "Agent",
        time: "02:30",
        content:
          "So, regarding the coverage, this plan covers all hospitalization expenses, including room rent without any capping.",
        isHighlighted: false,
        isAICue: false,
        aiPrompt: null
      },
      {
        id: "2",
        speaker: "Client",
        name: "Client",
        time: "02:32",
        content:
          "But I heard some plans have a waiting period for pre-existing diseases. My father has hypertension.",
        isHighlighted: false,
        isAICue: false,
        aiPrompt: null
      },
      {
        id: "3",
        speaker: "Agent",
        name: "Agent",
        time: "02:34",
        content:
          "Yes, correct. Since you mentioned the history of hypertension, there is a standard waiting period of 2 years for that specific condition. However, accidents and other illnesses are covered from day one.",
        isHighlighted: true,
        isAICue: true,
        aiPrompt: {
          aiPrompt: ["Explain waiting period (2 years)", "Mention day-one coverage"]
        }
      },
      {
        id: "4",
        speaker: "Client",
        name: "Client",
        time: "02:38",
        content: "Okay, 2 years is reasonable. What about the premium?",
        isHighlighted: false,
        isAICue: false,
        aiPrompt: null
      },
      {
        id: "5",
        speaker: "Agent",
        name: "Agent",
        time: "02:40",
        content:
          "The premium for the Health Assure+ plan starts at ₹3,500 per month for your age group and health profile. Since you mentioned your daily commute, we could also add a Personal Accident cover for just ₹375 more.",
        isHighlighted: false,
        isAICue: false,
        aiPrompt: null
      },
      {
        id: "6",
        speaker: "Client",
        name: "Client",
        time: "02:45",
        content: "That sounds good. Let me think about it and get back to you.",
        isHighlighted: false,
        isAICue: true,
        aiPrompt: {
          aiPrompt: ["data", "data"]
        }
      }
    ]
  },

  detailedBreakdown: {
    sections: [
      {
        title: "Product Knowledge",
        subtitle: "Feature Explanation & Value Prop",
        score: 9,
        icon: "BookOpen",
        tags: ["Room Rent Limits", "No-Claim Bonus", "Restoration Benefit"],
        description:
          "Demonstrated strong command over the 'Health Assure+' plan. You correctly explained the tiered room rent limits and the No-Claim Bonus structure."
      },
      {
        title: "Rapport Building",
        subtitle: "Relationship & Empathy",
        score: 9,
        icon: "Heart",
        description:
          "Strong opening. You effectively used the client's family context (daughter Aisha) to build a connection.",
        clip: {
          quote:
            "I hope your father is managing his hypertension well. It requires careful attention...",
          label: "Play Clip 02:04"
        }
      },
      {
        title: "Need Analysis",
        subtitle: "Understanding Requirements",
        score: 8,
        icon: "Search",
        description:
          "You covered all mandatory health questions. Good job probing about the recent medical tests.",
        checks: {
          done: [
            "Asked Family History",
            "Checked Pre-existing Diseases",
            "Verified Income/EMI"
          ],
          missed: ["Asked about existing Life Insurance"]
        }
      },
      {
        title: "Objection Handling",
        subtitle: "Resolving Customer Concerns",
        score: 8,
        icon: "AlertCircle",
        description:
          "Handled the 'Waiting Period' concern effectively by acknowledging the pain point and explaining the industry standard.",
        quote:
          "I understand 2 years seems long, but this ensures comprehensive coverage for a chronic condition..."
      },
      {
        title: "Cross-Selling & Up-Selling",
        subtitle: "Basket Value Optimization",
        score: 5,
        icon: "Layers",
        description:
          "You missed an opportunity. The client mentioned 'daily commute', which is a strong trigger for a Personal Accident cover pitch.",
        aiTip:
          "Since you travel daily for work, a Personal Accident cover of ₹1Cr costs only ₹4500. Should I add that?"
      },
      {
        title: "Process Adherence",
        subtitle: "Compliance & Guidelines",
        score: 10,
        icon: "ClipboardCheck",
        description:
          "Perfect adherence. You correctly explained the exclusions and the claim process.",
        tags: [
          "Explained Exclusions",
          "Explained Waiting Period",
          "Disclosed Commission",
          "Free-look period"
        ]
      }
    ]
  }
};


export default function DataWrapper({ children }: { children: React.ReactNode }) {
  const[selectedReco,setSelectedReco]=useState<string>("");
  const [reco,setReco]=useState<[]>([]);
  const url = window.location.href;
  const match = url.match(/cid_\d{4}/);
  const customerId = match ? match[0] : "";
  console.log(customerId,"the id of customer");

  const  [clientProfileData,setClientProfileData]=useState<any>(FinalReviewData.clientDetails);
  
  const [performanceData,setPerformanceData]=useState<any>(FinalReviewData.performance);

  const [breakdownData,setBreakdownData]=useState<any>(FinalReviewData.detailedBreakdown);

  const [transcriptionData,setTranscriptionData]=useState<any>(FinalReviewData.transcription);

  if (!customerId) console.log("cid_xxxx not found")
        // const flags=useAppSelector((s)=>s.flags.Flag);


  const dispatch = useAppDispatch()

  // ✅ Active Redux state
  const transcription = useAppSelector((s) => s.transcription.transcription || [])
  const aiCues = useAppSelector((s) => s.cues?.cues || [])
  const financials = useAppSelector((s) => s.customerInfo?.customer_info || [])

  const [audioUrl, setAudioUrl] = useState<string>(FinalReviewData.audio_url || "" )
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
    setReco,
    clientProfileData,
  setClientProfileData,
  performanceData,
  setPerformanceData,
  breakdownData,
  setBreakdownData,
  transcriptionData,
  setTranscriptionData
  }

  return <Context.Provider value={values}>{children}</Context.Provider>
}
