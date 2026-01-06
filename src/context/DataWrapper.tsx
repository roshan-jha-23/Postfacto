import { useState, useEffect, useRef, createContext, useContext } from "react"
import type React from "react"
import axios from "axios"
import { useAppDispatch, useAppSelector } from "../redux/store/store"
import { setTranscription } from "../redux/reducers/transcriptionReducer"
import { setCues } from "../redux/reducers/cuesReducer"
import { setCustomerInfo } from "../redux/reducers/customerInfoReducer"
// import { setFlag } from "../redux/reducers/flagReducer"

const Context = createContext<any>(null)

export function useData() {
  const ctx = useContext(Context)
  if (!ctx) throw new Error("useData must be used inside DataWrapper")
  return ctx
}



const FinalReviewData ={
  audio_url: "./audio/ICICI-BANK-VITT-AI_2025-12-16.mp3",

  callMeta: {
    language: "en-IN",
    meetTitle: "ICICI Bank Discovery Call",
    duration: "12:34",
    agentScore: 7.7,
    leadStatus: "Warm - Hot",
    clientName: "Rameezuddin Chaudhary",
    callType: "Product Demo",
    date: "2025-12-17",
    session_id: "session_12345",
  },

   transcript: [
    {
      time: "00:24",
      speaker: "Bibhuti Anand",
      role: "Agent",
      text: "Hi Rameez, good afternoon.",
      speaker_id: "agent_001",
      session_id: "session_12345",
      unique_id: "tx_001",
    },
    {
      time: "00:32",
      speaker: "Rameezuddin Chaudhary",
      role: "Client",
      text: "Good afternoon Bibhuti, thanks for joining.",
      speaker_id: "client_001",
      session_id: "session_12345",
      unique_id: "tx_002",
    },
    {
      time: "01:05",
      speaker: "Bibhuti Anand",
      role: "Agent",
      text:
        "We work with BFSI teams to provide real-time insights during customer conversations using AI.",
      speaker_id: "agent_001",
      session_id: "session_12345",
      unique_id: "tx_003",
    },
    {
      time: "01:42",
      speaker: "Rameezuddin Chaudhary",
      role: "Client",
      text:
        "Is this usable during live telecalling or only after the call?",
      speaker_id: "client_001",
      session_id: "session_12345",
      unique_id: "tx_004",
    },
    {
      time: "02:10",
      speaker: "Bibhuti Anand",
      role: "Agent",
      text:
        "Currently it’s post-call, but real-time assist is on our near-term roadmap.",
      speaker_id: "agent_001",
      session_id: "session_12345",
      unique_id: "tx_005",
    },
    {
      time: "04:55",
      speaker: "Rameezuddin Chaudhary",
      role: "Client",
      text:
        "Accuracy and latency are critical for us, especially in lending.",
      speaker_id: "client_001",
      session_id: "session_12345",
      unique_id: "tx_006",
    },
  ],

 QualityAssessmentData: [
  {
    id: 0,
    topic: "Need Analysis",
    score: 7.5,
    grade: "Average",
    color: "yellow",
    icon: "target",
    session_id: "session_12345",
    tags: [
      {
        tag_id: "tag_na_001",
        name: "BFSI Context Identification",
        linked_transcript_id: "tx_003",
        session_id: "session_12345",
        sentiment: "positive",
        analysis:
          "Agent correctly positioned the solution for BFSI workflows and lending use-cases early in the call.",
      },
      {
        tag_id: "tag_na_002",
        name: "Live Telecalling Expectation",
        linked_transcript_id: "tx_004",
        session_id: "session_12345",
        sentiment: "negative",
        analysis:
          "Client’s expectation for real-time telecalling assist was acknowledged but not deeply probed.",
      },
      {
        tag_id: "tag_na_003",
        name: "Client Priority Mapping",
        linked_transcript_id: "tx_006",
        session_id: "session_12345",
        sentiment: "neutral",
        analysis:
          "Accuracy and latency were identified as priorities, but no follow-up quantification was done.",
      },
    ],
  },

  {
    id: 1,
    topic: "Product Knowledge",
    score: 8.5,
    grade: "Strong",
    color: "green",
    icon: "book",
    session_id: "session_12345",
    tags: [
      {
        tag_id: "tag_pk_001",
        name: "Architecture Explanation",
        linked_transcript_id: "tx_003",
        session_id: "session_12345",
        sentiment: "positive",
        analysis:
          "Agent confidently explained AI-driven post-call analysis tailored for BFSI teams.",
      },
      {
        tag_id: "tag_pk_002",
        name: "Latency Awareness",
        linked_transcript_id: "tx_006",
        session_id: "session_12345",
        sentiment: "positive",
        analysis:
          "Demonstrated awareness of latency sensitivity in lending operations.",
      },
      {
        tag_id: "tag_pk_003",
        name: "Roadmap Clarity",
        linked_transcript_id: "tx_005",
        session_id: "session_12345",
        sentiment: "neutral",
        analysis:
          "Roadmap was mentioned but lacked concrete timelines or milestones.",
      },
    ],
  },

  {
    id: 2,
    topic: "Communication Clarity",
    score: 8.0,
    grade: "Good",
    color: "green",
    icon: "message-circle",
    session_id: "session_12345",
    tags: [
      {
        tag_id: "tag_cc_001",
        name: "Clear Value Proposition",
        linked_transcript_id: "tx_003",
        session_id: "session_12345",
        sentiment: "positive",
        analysis:
          "Value proposition was explained in simple, business-aligned language.",
      },
      {
        tag_id: "tag_cc_002",
        name: "Jargon Control",
        linked_transcript_id: "tx_005",
        session_id: "session_12345",
        sentiment: "positive",
        analysis:
          "Avoided excessive technical jargon while speaking to a business stakeholder.",
      },
    ],
  },

  {
    id: 3,
    topic: "Objection Handling",
    score: 7.0,
    grade: "Needs Polish",
    color: "yellow",
    icon: "shield",
    session_id: "session_12345",
    tags: [
      {
        tag_id: "tag_oh_001",
        name: "Real-time Gap Objection",
        linked_transcript_id: "tx_004",
        session_id: "session_12345",
        sentiment: "negative",
        analysis:
          "Agent acknowledged the objection but did not counter with interim solutions or beta access.",
      },
      {
        tag_id: "tag_oh_002",
        name: "Confidence Under Pushback",
        linked_transcript_id: "tx_006",
        session_id: "session_12345",
        sentiment: "neutral",
        analysis:
          "Handled concerns calmly but lacked assertive reassurance using data points.",
      },
    ],
  },

  {
    id: 4,
    topic: "Rapport & Empathy",
    score: 6.5,
    grade: "Weak",
    color: "orange",
    icon: "heart",
    session_id: "session_12345",
    tags: [
      {
        tag_id: "tag_re_001",
        name: "Transactional Tone",
        linked_transcript_id: "tx_001",
        session_id: "session_12345",
        sentiment: "negative",
        analysis:
          "Conversation remained mostly transactional with limited personal engagement.",
      },
      {
        tag_id: "tag_re_002",
        name: "Client Acknowledgement",
        linked_transcript_id: "tx_006",
        session_id: "session_12345",
        sentiment: "neutral",
        analysis:
          "Client concerns were acknowledged but not emotionally reinforced.",
      },
    ],
  },

  {
    id: 5,
    topic: "Process Adherence",
    score: 8.5,
    grade: "Strong",
    color: "green",
    icon: "check-circle",
    session_id: "session_12345",
    tags: [
      {
        tag_id: "tag_pa_001",
        name: "Agenda Flow",
        linked_transcript_id: "tx_003",
        session_id: "session_12345",
        sentiment: "positive",
        analysis:
          "Call followed a structured discovery → demo → discussion flow.",
      },
      {
        tag_id: "tag_pa_002",
        name: "Next Steps Closure",
        linked_transcript_id: "tx_005",
        session_id: "session_12345",
        sentiment: "positive",
        analysis:
          "Next steps were discussed clearly, avoiding ambiguity.",
      },
    ],
  },

  {
    id: 6,
    topic: "Overall Sales Effectiveness",
    score: 7.8,
    grade: "Good",
    color: "green",
    icon: "trending-up",
    session_id: "session_12345",
    tags: [
      {
        tag_id: "tag_se_001",
        name: "Solution Fit",
        linked_transcript_id: "tx_003",
        session_id: "session_12345",
        sentiment: "positive",
        analysis:
          "Solution broadly aligned with ICICI’s operational needs.",
      },
      {
        tag_id: "tag_se_002",
        name: "Deal Momentum",
        linked_transcript_id: "tx_005",
        session_id: "session_12345",
        sentiment: "neutral",
        analysis:
          "Deal progressed but lacked urgency-driving hooks.",
      },
    ],
  },
],


  dataIntelligence: {
    session_id: "session_12345",

    coreRequirements:
      "Real-time telecalling assist, text-based input, BFSI accuracy",

    blockers: [
      {
        label: "Product Gap",
        severity: "high",
        description: "Real-time telecalling assistance not live.",
      },
      {
        label: "Dependency",
        severity: "medium",
        description: "Reliance on Sarvam AI for TTS.",
      },
    ],

    tech_due_diligence: [
      "Is the tech built in-house or outsourced?",
      "What is the accuracy rate benchmark?",
      "Can text-input be used instead of voice?",
      "Which LLM version is used?",
      "Can we train on website links?",
    ],
  },

  actionItems: {
    session_id: "session_12345",
    completedCount: 1,
    totalCount: 4,

    tasks: [
      {
        id: 1,
        title: "Product Brochure Sent",
        owner: "Sales",
        completed: true,
        blocked: false,
      },
      {
        id: 2,
        title: "Wait for Training Data",
        owner: "Client",
        completed: false,
        blocked: true,
      },
    ],

    collateralGaps: [
      {
        title: "Missing Asset Demo",
        impact: "Medium",
        description: "Insurance demo used instead of Loans.",
      },
    ],
  },
};



export default function DataWrapper({ children }: { children: React.ReactNode }) {

   // Extract customer ID from URL
    const url = window.location.href;
    const match = url.match(/cid_\d{4}/);
    const customerId = match ? match[0] : "test_cid_0000";
    console.log(customerId,"the id of customer");
 

  //STATES FOR DATA FURTHER WILL CHNAGE TO REDUCERS

  const  [clientProfileData,setClientProfileData]=useState<any>();

  const [actionItems,setActionItems]=useState<any>(FinalReviewData.actionItems);

  const [dataIntelligence,setDataIntelligence]=useState<any>(FinalReviewData.dataIntelligence);

  const [assessmentData,setAssessmentData]=useState<any>(FinalReviewData.QualityAssessmentData);

  const [transcriptionData,setTranscriptionData]=useState<any>(FinalReviewData.transcript);
  
  const [meetingMetadata,setMeetingMetadata]=useState<any>(FinalReviewData.callMeta);  

  const [selectedTranscriptId,setSelectedTranscriptId]=useState<string>("");

  const [audioTimeStamp,setAudioTimeStamp]=useState<string>("");

  if (!customerId) console.log("cid_xxxx not found")
        // const flags=useAppSelector((s)=>s.flags.Flag);


  const dispatch = useAppDispatch()


  const transcription = useAppSelector((s) => s.transcription.transcription || [])
  const aiCues = useAppSelector((s) => s.cues?.cues || [])
  const financials = useAppSelector((s) => s.customerInfo?.customer_info || [])

  const [audioUrl, setAudioUrl] = useState<string>(FinalReviewData.audio_url || "" )
  const topContainerRef = useRef(null)



  useEffect(()=>{
    const getDetalsFxn=async()=>{
      const resp=await axios.post('http://localhost:5000/get-performance',
      {session_id:"session_id_1234"}
      );
      console.log("Performance Data:", resp.data);
      setAssessmentData(resp.data.QualityAssessmentData);
      setTranscriptionData(resp.data.transcript);
      setMeetingMetadata(resp.data.callMeta);
      setAudioUrl(resp.data.audio_url);
      setDataIntelligence(resp.data.dataIntelligence);
      setActionItems(resp.data.actionItems);
    }
    getDetalsFxn();
  },[customerId])

//   useEffect(() => {
//     const getInfo=async()=>{
//       try{
// const res =  await axios.post(
//         "https://recruito.vitti.insure/lms_router",
//        { route_name:"main_router",
//         json_data:
//           { 
//             trigger_func: "req_postfacto_data", 
//             params: { session_id: customerId } 
//           }
//      }
//       )
// console.log("Client Profile Data:", res.data);
// setClientProfileData(res.data.clientDetails);
// setPerformanceData(res.data.performance);
// setBreakdownData(res.data.detailedBreakdown);
// setTranscriptionData(res.data.transcription);
// setMeetingMetadata(res.data.meetingMetadata);
// setAudioUrl(res.data.audio_url);
//       }catch(err){
//         console.error("Error fetching data:", err);
//       }
//     }
//     getInfo();
//   }, [])

useEffect(() => {
  

  // fetchFinancials()
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
    setSelectedTranscriptId,
  selectedTranscriptId,
    
    clientProfileData,
  setClientProfileData,
  dataIntelligence,
  setDataIntelligence,
  assessmentData,
  setAssessmentData,
  transcriptionData,
  setTranscriptionData,
  meetingMetadata,
  setMeetingMetadata,
  actionItems,
  setActionItems,
  setAudioTimeStamp,
  audioTimeStamp
  }

  return <Context.Provider value={values}>{children}</Context.Provider>
}
