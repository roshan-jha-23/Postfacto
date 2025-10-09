import { useState } from "react"
import type React from "react"
import { createContext, useContext, useEffect, useRef } from "react"
import axios from "axios"
import { useAppDispatch } from "../redux/store/store"
import { setTranscription ,addTranscriptionFeedback} from "../redux/reducers/transcriptionReducer"
import { setCues, addCuesFeedback } from "../redux/reducers/cuesReducer"
import {  setCustomerInfo} from "../redux/reducers/customerInfoReducer"

const Context = createContext<any>(null)

export function useData() {
  const ctx = useContext(Context)
  if (!ctx) {
    throw new Error("useData must be used inside DataWrapper")
  }
  return ctx
}

export default function DataWrapper({ children }: { children: React.ReactNode }) {
  const url = window.location.href
  const match = url.match(/cid_\d{4}/)
  let customerId = ""
  if (match) {
    customerId = match[0]
    console.log(customerId)
  } else {
    console.log("cid_xxxx not found")
  }
  console.log("DataWrapper rendered")
  const dispatch = useAppDispatch()
  // const transcription = useAppSelector((s) => s.transcription?.sections)
  // const aiCues = useAppSelector((s) => s.cues?.categories)
  // const financials = useAppSelector((s) => s.customerInfo?.sections)
  const [audioUrl, setAudioUrl] = useState<string>("")
  const topContainerRef = useRef(null)

  useEffect(() => {
//     const val =  
// {
//   'transcript': {
//     'Health Profile': {
//       '0': {
//         'data': 'OK.',
//         'timeStamp': '2025-10-08 12:09:49',
//         'feedbacks': []
//       },
//       '1': {
//         'data': 'I never consume alcohol.',
//         'timeStamp': '2025-10-08 11:44:33',
//         'feedbacks': []
//       },
//       '2': {
//         'data': 'There are no existing medical conditions. I have done medical tests frequently. Every month I do it.',
//         'timeStamp': '2025-10-08 11:44:44',
//         'feedbacks': []
//       },
//       '3': {
//         'data': 'I have insurance from HDFC life.',
//         'timeStamp': '2025-10-08 11:44:50',
//         'feedbacks': []
//       },
//       '4': {
//         'data': 'Some measured is 20 lakhs. There are no previous claims.',
//         'timeStamp': '2025-10-08 11:44:56',
//         'feedbacks': []
//       },
//       '5': {
//         'data': "Okay, let's check this",
//         'timeStamp': '2025-10-08 11:46:07',
//         'feedbacks': []
//       }
//     },
//     'Basic Info': {
//       '0': {
//         'data': 'Hello.',
//         'timeStamp': '2025-10-08 12:09:37',
//         'feedbacks': []
//       },
//       '1': {
//         'data': 'Hi, my name is Varun. I currently live in Hyderabad.',
//         'timeStamp': '2025-10-08 11:43:39',
//         'feedbacks': []
//       },
//       '2': {
//         'data': 'My age is 35.',
//         'timeStamp': '2025-10-08 11:44:09',
//         'feedbacks': []
//       },
//       '3': {
//         'data': 'My average monthly income is 20 lakhs.',
//         'timeStamp': '2025-10-08 11:44:15',
//         'feedbacks': []
//       },
//       '4': {
//         'data': 'Oh',
//         'timeStamp': '2025-10-08 11:45:41',
//         'feedbacks': []
//       },
//       '5': {
//         'data': 'Hi, my name is Varun. I currently live in Hyderabad. My age is 35.',
//         'timeStamp': '2025-10-08 11:45:46',
//         'feedbacks': []
//       },
//       '6': {
//         'data': 'I need coverage for myself.',
//         'timeStamp': '2025-10-08 11:45:50',
//         'feedbacks': []
//       }
//     }
//   },
//   'customer_info': [
//     {
//       'type': 'Basic Info',
//       'customer_info': {
//         'type': 'basic-info',
//         'basicInfo': {
//           'boxA': {
//             'data': {
//               'age': 35,
//               'city': 'Hyderabad - Tier2',
//               'name': 'Varun',
//               'coverageFor': '1 adult'
//             },
//             'header': 'Client Info'
//           },
//           'boxB': {
//             'data': {
//               'AverageMonthlyEmi': '',
//               'AverageMonthlyIncome': 2000000
//             },
//             'header': 'Financial Profile'
//           },
//           'boxC': {
//             'data': {
//               'ProductPreference': '',
//               'ExpectedSumInsured': ''
//             },
//             'header': 'Client Requirements'
//           },
//           'table': {
//             'header': 'Family Structure',
//             'table_data': [
//               [
//                 'Varun',
//                 '35',
//                 'Self'
//               ]
//             ],
//             'table_header': [
//               'Name',
//               'Age',
//               'Relationship'
//             ]
//           }
//         }
//       }
//     },
//     {
//       'type': 'Health Profile',
//       'customer_info': {
//         'type': 'health-profile',
//         'HealthProfile': {
//           'boxA': {
//             'data': {
//               'consumeAlcohol': 'No',
//               'FamilyMedicalHistory': 'No Medical History'
//             },
//             'header': 'LifeStyle & Habits'
//           },
//           'boxB': {
//             'data': {
//               'AnyMedicalTests': 'Every month I do it.',
//               'PreexistingMedicalConditions': 'No Preexisting Medical Conditions'
//             },
//             'header': 'Medical History'
//           },
//           'table': {
//             'header': 'Insurance & Claim History',
//             'table_data': [
//               [
//                 'HDFC life',
//                 2000000,
//                 '',
//                 'No'
//               ]
//             ],
//             'table_header': [
//               'Company_Name',
//               'Sum_Assured',
//               'Previous_Claims'
//             ]
//           }
//         }
//       }
//     },
//     {
//       'type': 'Recommendations',
//       'customer_info': {
//         'type': 'recommendations',
//         'Recommendations': {
//           'reason': '- At age 35, securing a higher sum insured is beneficial as it allows you to lock in lower premiums while providing extensive coverage.\n- With no pre-existing medical conditions, you can easily ride out the waiting period for higher coverage.\n- As you age, the chances of lifestyle diseases increase, making higher coverage essential for future health security.\n- Even as a single adult, having a higher sum insured ensures financial safety in case of unexpected medical emergencies.\n- Health-related issues can impact anyone, and a family floater policy with higher coverage provides security for potential future family members.\n- With an income of 2,000,000, investing in higher coverage ensures access to quality healthcare without financial strain.\n- Living in a Tier 2 city like Hyderabad, healthcare costs can still be significant, making higher coverage a prudent choice.\n- Not consuming alcohol or tobacco reduces health risks, but higher coverage is still necessary to safeguard against unforeseen medical expenses.\n- A lack of family medical history is a positive factor, yet it’s wise to prepare for any unexpected health issues with adequate coverage.',
//           'riders': [
//             {
//               'desc': 'Provides unlimited coverage for hospitalization expenses.',
//               'name': 'Infinite Care',
//               'include': "True"
//             },
//             {
//               'desc': 'Covers hospitalization costs for up to 2 hours.',
//               'name': '2-hr Hospitalization',
//               'include': "True"
//             },
//             {
//               'desc': 'Ensures claims are processed smoothly without delays.',
//               'name': 'Claim Protector',
//               'include': "True"
//             },
//             {
//               'desc': 'Increases the sum insured automatically every year.',
//               'name': 'Power Booster',
//               'include': "True"
//             },
//             {
//               'desc': 'Covers accommodation costs for dependents during hospitalization.',
//               'name': 'Dependent Accommodation Benefit',
//               'include': "True"
//             },
//             {
//               'desc': 'Provides annual health checkups at no additional cost.',
//               'name': 'Annual Health Checkups',
//               'include': "True"
//             },
//             {
//               'desc': 'Adjusts coverage to keep up with inflation.',
//               'name': 'Inflation Protector',
//               'include': "True"
//             },
//             {
//               'desc': 'Covers costs for necessary medical equipment.',
//               'name': 'Durable Medical Equipment',
//               'include': "True"
//             },
//             {
//               'desc': 'Covers air ambulance costs within the country.',
//               'name': 'Domestic Air Ambulance Cover',
//               'include': "True"
//             },
//             {
//               'desc': 'Covers nursing services at home post-hospitalization.',
//               'name': 'Nursing At Home',
//               'include': "True"
//             },
//             {
//               'desc': 'Covers travel expenses for family visits during hospitalization.',
//               'name': 'Compassionate Visit',
//               'include': "True"
//             },
//             {
//               'desc': 'Provides coverage in case of accidental injuries.',
//               'name': 'Personal Accident',
//               'include': "True"
//             },
//             {
//               'desc': 'Covers major critical illnesses as defined in the policy.',
//               'name': 'Critical Illness',
//               'include': "True"
//             },
//             {
//               'desc': 'Allows upgrading to a better room category during hospitalization.',
//               'name': 'Room Modifier',
//               'include': "True"
//             }
//           ],
//           'premium': 21780,
//           'planName': 'elevate',
//           'sumInsured': 1000000
//         }
//       }
//     }
//   ],
//   'cues': {
//     'Health Profile': {
//       '0': {
//         'data': {
//           'id': '2025-10-08 12:09:53',
//           'data': [],
//           'type': 'add-cues',
//           'color': 'blue',
//           'header': 'Follow-up Question',
//           'card_type': 'regular_card'
//         },
//         'timeStamp': '2025-10-08 06:39:53.933036',
//         'feedbacks': []
//       },
//       '1': {
//         'data': {
//           'id': '2025-10-08 11:46:15',
//           'data': [],
//           'type': 'add-cues',
//           'color': 'blue',
//           'header': 'Follow-up Question',
//           'card_type': 'regular_card'
//         },
//         'timeStamp': '2025-10-08 06:16:15.634598',
//         'feedbacks': []
//       },
//       '2': {
//         'data': {
//           'id': '2025-10-08 11:44:59',
//           'data': [
//             {
//               'id': '0',
//               'text': 'What is the sum assured for your insurance policy with HDFC life?'
//             }
//           ],
//           'type': 'add-cues',
//           'color': 'blue',
//           'header': 'Follow-up Question',
//           'card_type': 'regular_card'
//         },
//         'timeStamp': '2025-10-08 06:14:59.534462',
//         'feedbacks': []
//       },
//       '3': {
//         'data': {
//           'id': '2025-10-08 11:44:38',
//           'data': [
//             {
//               'id': '0',
//               'text': 'Do you use tobacco in any form?'
//             },
//             {
//               'id': '1',
//               'text': 'Can you provide details about your family medical history?'
//             }
//           ],
//           'type': 'add-cues',
//           'color': 'blue',
//           'header': 'Follow-up Question',
//           'card_type': 'regular_card'
//         },
//         'timeStamp': '2025-10-08 06:14:39.349221',
//         'feedbacks': []
//       }
//     },
//     'Basic Info': {
//       '0': {
//         'data': {
//           'id': '2025-10-08 12:09:43',
//           'data': [
//             {
//               'id': '0',
//               'text': 'What is your average monthly EMI?'
//             },
//             {
//               'id': '1',
//               'text': 'What type of insurance product are you interested in?'
//             }
//           ],
//           'type': 'add-cues',
//           'color': 'blue',
//           'header': 'Follow-up Question',
//           'card_type': 'regular_card'
//         },
//         'timeStamp': '2025-10-08 06:39:44.032889',
//         'feedbacks': []
//       },
//       '1': {
//         'data': {
//           'id': '2025-10-08 11:45:56',
//           'data': [
//             {
//               'id': '0',
//               'text': 'What is your average monthly EMI?'
//             },
//             {
//               'id': '1',
//               'text': 'What type of insurance products are you interested in?'
//             }
//           ],
//           'type': 'add-cues',
//           'color': 'blue',
//           'header': 'Follow-up Question',
//           'card_type': 'regular_card'
//         },
//         'timeStamp': '2025-10-08 06:15:57.359096',
//         'feedbacks': []
//       },
//       '2': {
//         'data': {
//           'id': '2025-10-08 11:45:49',
//           'data': [
//             {
//               'id': '0',
//               'text': 'What is your average monthly EMI?'
//             },
//             {
//               'id': '1',
//               'text': 'What type of insurance products are you interested in?'
//             }
//           ],
//           'type': 'add-cues',
//           'color': 'blue',
//           'header': 'Follow-up Question',
//           'card_type': 'regular_card'
//         },
//         'timeStamp': '2025-10-08 06:15:49.829053',
//         'feedbacks': []
//       },
//       '3': {
//         'data': {
//           'id': '2025-10-08 11:44:15',
//           'data': [
//             {
//               'id': '0',
//               'text': 'What type of insurance products are you interested in?'
//             },
//             {
//               'id': '1',
//               'text': 'Do you have any family members you would like to include in the insurance coverage?'
//             }
//           ],
//           'type': 'add-cues',
//           'color': 'blue',
//           'header': 'Follow-up Question',
//           'card_type': 'regular_card'
//         },
//         'timeStamp': '2025-10-08 06:14:15.794553',
//         'feedbacks': []
//       },
//       '4': {
//         'data': {
//           'id': '2025-10-08 11:43:44',
//           'data': [
//             {
//               'id': '0',
//               'text': 'What is your age?'
//             },
//             {
//               'id': '1',
//               'text': 'What is your average monthly income?'
//             }
//           ],
//           'type': 'add-cues',
//           'color': 'blue',
//           'header': 'Follow-up Question',
//           'card_type': 'regular_card'
//         },
//         'timeStamp': '2025-10-08 06:13:44.729626',
//         'feedbacks': []
//       }
//     }
//   },
//   'audio_url': [
//     'https://postfacto-audio-storage.s3.ap-south-1.amazonaws.com/cid_1616/recording_1616.wav'
//   ]
// }
 
 
 

    // Normalize mock cues to new shape { type, cues: [{ pid, data: { ... }, timeStamp, feedbacks }] }
    // const normalizedCues = (val.cues || []).map((cat: any) => {
    //   const cues = (cat.cues || []).map((card: any) => {
    //     const pid = card?.data?.[0]?.id ?? card?.id ?? ""
    //     const data = {
    //       id: card.id,
    //       data: card.data,
    //       type: card.type,
    //       color: card.color,
    //       header: card.header,
    //       card_type: card.card_type,
    //     }
    //     return {
    //       pid,
    //       data,
    //       timeStamp: card.timeStamp,
    //       feedbacks: (card.feedbacks || []).map((f: any) => ({
    //         name: f.name,
    //         feedback: f.feedback,
    //         timeStamp: f.timeStamp,
    //         pid,
    //       })),
    //     }
    //   })
    //   return { type: cat.type, cues }
    // })

    // dispatch(setTranscription(val.transcript || []))
    // dispatch(setCues(val.cues || []))
    // dispatch(setCustomerInfo(val.customer_info || []))

    const fetchFinancials = async () => {
      try {
        const res = await axios.post(
          "https://wpv7kxos9g.execute-api.ap-south-1.amazonaws.com/test/recruito-upload-apis/main_router",
          { trigger_func: "req_postfacto_data", params: { session_id:customerId} },
        )
        console.log("Financials data:", res.data)
        setAudioUrl(res.data.audio_url || "")
        dispatch(setCustomerInfo(res.data.customer_info || []))
        dispatch(setTranscription(res.data.transcript || []))
        dispatch(setCues(res.data.cues || []))
      } catch (err) {
        console.error("Failed to fetch Financials", err)
      }
    }
    fetchFinancials()
  }, [dispatch])

  function updateCuesFeedback(feedbackObj: {
    type: string
    pid: string
    name: string
    feedback: string
    timeStamp?: string
  }) {
    dispatch(
      addCuesFeedback({
        type: feedbackObj.type,
        pid: feedbackObj.pid,
        name: feedbackObj.name,
        feedback: feedbackObj.feedback,
        timeStamp: feedbackObj.timeStamp,
        section: "cues",
      }),
    )
  }

  function updateTranscriptionFeedback(feedbackObj: {
    type: string
    pid: string // transcript_id
    name: string
    feedback: string
    timeStamp?: string
  }) {
    dispatch(
      addTranscriptionFeedback({
        type: feedbackObj.type,
        pid: feedbackObj.pid,
        name: feedbackObj.name,
        feedback: feedbackObj.feedback,
        timeStamp: feedbackObj.timeStamp,
        section: "transcript",
      }),
    )
  }

  const values = {
    // transcription,
    setTranscription: (sections: any[]) => dispatch(setTranscription(sections)),
    // aiCues,
    setAICues: (categories: any[]) => dispatch(setCues(categories)),
    // financials,
    setFinancials: (sections: any[]) => dispatch(setCustomerInfo(sections)),
    audioUrl,
    setAudioUrl,
    topContainerRef,
    updateTranscriptionFeedback,
    updateCuesFeedback,
  }

  return <Context.Provider value={values}>{children}</Context.Provider>
}
