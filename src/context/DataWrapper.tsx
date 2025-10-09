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

    // const mockData = {
    //   audio_url: [["https://storage.googleapis.com/postfacto-audiofiles/recruito_audio/audio_recording_issue.mp3"]],
    //   cues: [
    //     {
    //       cues: [
    //         {
    //           card_type: "regular_card",
    //           color: "blue",
    //           data: [],
    //           header: "Follow-up Question",
    //           id: "2025-09-09 17:49:23",
    //           type: "add-cues",
    //         },
    //         {
    //           card_type: "regular_card",
    //           color: "blue",
    //           data: [],
    //           header: "Follow-up Question",
    //           id: "2025-09-09 17:49:11",
    //           type: "add-cues",
    //         },
    //       ],
    //       type: "Financial Goals",
    //     },
    //     {
    //       cues: [
    //         {
    //           card_type: "regular_card",
    //           color: "green",
    //           data: [
    //             {
    //               id: "unique_0",
    //               text: "On death of the life assured during the policy term, provided all due premiums are paid, death benefit equal to the following shall be payable as lump sum to the nominee...",
    //             },
    //           ],
    //           header: "what is the death benefits in deffered income option ?",
    //           id: "2025-09-09 17:48:30",
    //           type: "add-cues",
    //         },
    //         {
    //           card_type: "regular_card",
    //           color: "blue",
    //           data: [
    //             {
    //               id: "0",
    //               text: "Do you have any credit card dues?",
    //             },
    //           ],
    //           header: "Follow-up Question",
    //           id: "2025-09-09 17:48:07",
    //           type: "add-cues",
    //         },
    //       ],
    //       type: "Liabilities",
    //     },
    //     {
    //       cues: [
    //         {
    //           card_type: "regular_card",
    //           color: "green",
    //           data: [
    //             {
    //               id: "unique_{0}",
    //               text: "The minimum sum assured on maturity for the HDFC Life Sanchay Par Advantage plan is INR 300,000, and there is no maximum limit, subject to the Board Approved Underwriting Policy (BAUP).",
    //             },
    //           ],
    //           header: "What is the sum measured for this HDFC plan?",
    //           id: "2025-09-09 17:47:27",
    //           type: "add-cues",
    //         },
    //         {
    //           card_type: "regular_card",
    //           color: "blue",
    //           data: [
    //             {
    //               id: "0",
    //               text: "Clarify if there are any other life insurance policies.",
    //             },
    //             {
    //               id: "1",
    //               text: "Ask about any investments in equity or digital gold.",
    //             },
    //           ],
    //           header: "Follow-up Question",
    //           id: "2025-09-09 17:47:32",
    //           type: "add-cues",
    //         },
    //       ],
    //       type: "Assets",
    //     },
    //     {
    //       cues: [
    //         {
    //           card_type: "regular_card",
    //           color: "blue",
    //           data: [
    //             {
    //               id: "0",
    //               text: "What is your family structure?",
    //             },
    //             {
    //               id: "1",
    //               text: "How many dependents do you have?",
    //             },
    //           ],
    //           header: "Follow-up Question",
    //           id: "2025-09-09 17:46:26",
    //           type: "add-cues",
    //         },
    //         {
    //           card_type: "regular_card",
    //           color: "blue",
    //           data: [
    //             {
    //               id: "0",
    //               text: "What is your age?",
    //             },
    //             {
    //               id: "1",
    //               text: "What is your occupation?",
    //             },
    //           ],
    //           header: "Follow-up Question",
    //           id: "2025-09-09 17:46:10",
    //           type: "add-cues",
    //         },
    //       ],
    //       type: "Basic Info",
    //     },
    //   ],
    //   customer_info: [
    //     {
    //       customer_info: {
    //         boxA: {
    //           data: {
    //             Age: "28",
    //             City: "Hyderabad",
    //             Dependents: "2",
    //             Name: "Varun",
    //             Occupation: "software developer",
    //           },
    //           header: "Client Info",
    //         },
    //         table: {
    //           header: "Family Structure",
    //           table_header: ["Name", "Relation", "Age"],
    //           table_values: [
    //             ["Wife", "Spouse", "25"],
    //             ["Son", "Child", "12"],
    //           ],
    //         },
    //       },
    //       type: "Basic Info",
    //     },
    //     {
    //       customer_info: {
    //         boxA: {
    //           header: "Income and Savings",
    //           sub_header: "Monthly Income (INR)",
    //           sub_header_data: "2.85 lac",
    //           text_area_header: "Savings (FD, PPF, NSC, etc.)",
    //           text_area_value: "FD: ~12.00 lac\nPPF: 0\nNSC: 0",
    //         },
    //         boxB: {
    //           header: "Investments and Other Assets",
    //           text_area_headerA: "Investments (Mutual Funds, Equity, DigitalGold)",
    //           text_area_headerB: "Other Assets (Gold, Land, Property)",
    //           text_area_valueA: "Mutual Funds: 13.00 lac \nDirect Equity: 0\nDigital Gold: ",
    //           text_area_valueB: "",
    //         },
    //         table: {
    //           header: "Existing Life Insurance",
    //           table_header: ["Insurer Name", "Cover Amount (INR)", "Annual Premium (INR)"],
    //           table_values: [["HDFC Life", "55.00 lac", "20.00k"]],
    //         },
    //       },
    //       type: "Assets",
    //     },
    //     {
    //       customer_info: {
    //         boxA: {
    //           data: {
    //             "Credit Card Dues (if any)": "2.00 lac",
    //             "Monthly Expenses (INR)": "1.20 lac",
    //             "Total Monthly EMI (INR)": "30.00k",
    //           },
    //           header: "Monthly Outflow",
    //         },
    //         boxB: {
    //           data: {
    //             "Monthly EMI (INR)": "30.00k",
    //             "Outstanding Amount (INR)": "40.00 lac",
    //             "Remaining Tenure (Months)": "24",
    //           },
    //           header: "Home Loan Details",
    //         },
    //         table: {
    //           header: "Other Loans",
    //           table_header: ["Loan Type", "Outstanding (INR)", "Monthly EMI (INR)"],
    //           table_values: [["", "", ""]],
    //         },
    //       },
    //       type: "Liabilities",
    //     },
    //     {
    //       customer_info: {
    //         financialGoals: [
    //           {
    //             cols: {
    //               "Required Corpus": "2.00 cr",
    //               TimeFrame: "32",
    //             },
    //             header: "Retirement Savings",
    //             priority: "1",
    //             sub_header: "I want to save 2 crores for my retirement liquid corpus.",
    //             text_area_value: "",
    //           },
    //           {
    //             cols: {
    //               "Required Corpus": "1.00 cr",
    //               TimeFrame: "9",
    //             },
    //             header: "Child Education Savings",
    //             priority: "2",
    //             sub_header: "I also want to save one crore for my child education.",
    //             text_area_value: "",
    //           },
    //         ],
    //         type: "financial-goals",
    //       },
    //       type: "Financial Goals",
    //     },
    //     {
    //       customer_info: {
    //         planSummary: [
    //           {
    //             calculation: {
    //               "Annual Expenses": "14.40 lac",
    //               "Outstanding Liabilities": "42.00 lac",
    //             },
    //             cols: {
    //               "Required Corpus": "1.86 cr",
    //             },
    //             header: "Immediate Life Cover Analysis",
    //             reason: '<h3 style="font-size:3rem">Total Recommended Cover <p style="color:blue">1.86 cr</p></h3>',
    //             sub_header: "",
    //             text_area_value: "",
    //           },
    //         ],
    //         type: "plan-summary",
    //       },
    //       type: "Plan Summary",
    //     },
    //     {
    //       customer_info: {
    //         recommendations: [
    //           {
    //             calculation: "",
    //             cols: {
    //               Cover: "1.86 cr",
    //               "Est. Annual Premium": "27,900",
    //               Term: 32,
    //             },
    //             header: "Recommendation 1: Term Plan",
    //             reason: "Covers liabilities and ensures lifestyle security for family.",
    //             sub_header:
    //               "This term plan will provide financial security to your family in case of any unforeseen events.",
    //             text_area_value:
    //               "Total liabilities (42 lakhs) + (Monthly expenses (1.2 lakhs) × 120) = 42 lakhs + 144 lakhs = 186 lakhs (1.86 cr)",
    //           },
    //         ],
    //         type: "recommendations",
    //       },
    //       type: "Recommendations",
    //     },
    //     {
    //       customer_info: null,
    //       type: "Q&A",
    //     },
    //   ],
    //   transcript: [
    //     {
    //       transcript: [
    //         "Hi, my name is Varun. I currently live in Hyderabad.",
    //         "My age is 28.",
    //         "I work as a software developer.",
    //         "In my family, I have a wife and my son. His age is...",
    //         "Well, my Wi-Fi is at 25.",
    //         "My son is just 12.",
    //       ],
    //       type: "Basic Info",
    //     },
    //     {
    //       transcript: [
    //         "My monthly income is Rs. 2,85,000. I have a fixed deposit of Rs. 12,00,000.",
    //         "I also invest in mutual funds worth 13 lakhs.",
    //         "I have insurance from HDFC life.",
    //         "Cover amount is 55 lakhs. Annual premium is 20,000.",
    //         "What is the sum measured for this HDFC plan?",
    //       ],
    //       type: "Assets",
    //     },
    //     {
    //       transcript: [
    //         "My monthly expenses are...",
    //         "One lakh twenty thousand.",
    //         "I have home loan worth 40 lakhs.",
    //         "Monthly EMI is 30,000 and remaining tenure is two years",
    //         "I also have a credit card due of 2 lakhs.",
    //         "What is this death benefit policy?",
    //       ],
    //       type: "Liabilities",
    //     },
    //     {
    //       transcript: [
    //         "I want to save 2 crores for my retirement liquid corpus.",
    //         "I also want to save one crore for my child education.",
    //       ],
    //       type: "Financial Goals",
    //     },
    //   ],
    // }

    // Set the mock data directly instead of making API calls
    
    //setFinancials(mockData.customer_info)
    //setTranscription(mockData.transcript || [])
    //setAICues(mockData.cues || [])

    // console.log("Mock data loaded successfully")
   const val={
  "cues": [
    {
      "cues": [
        {
          "id": "2025-09-18 12:30:37",
          "data": [
            {
              "id": "0",
              "text": "Which riders do you want to keep or remove?"
            },
            {
              "id": "1",
              "text": "Are there any specific riders you have questions about?"
            }
          ],
          "type": "add-cues",
          "color": "blue",
          "header": "Follow-up Question",
          "card_type": "regular_card",
          "feedbacks": [
            {
              "name": "Alex",
              "feedback": "This cue is good for moving the conversation to the next step."
            }
          ]
        },
        {
          "id": "2025-09-17 18:13:22",
          "data": [
            {
              "id": "0",
              "text": "What specific recommendations are you looking for?"
            },
            {
              "id": "1",
              "text": "Are there any riders you are particularly interested in keeping or removing?"
            }
          ],
          "type": "add-cues",
          "color": "blue",
          "header": "Follow-up Question",
          "card_type": "regular_card",
          "feedbacks": [
            {
              "name": "Ben",
              "feedback": "Could be more direct. 'Which riders do you want to keep?' is shorter."
            }
          ]
        },
        {
          "id": "2025-09-17 18:13:13",
          "data": [
            {
              "id": "0",
              "text": "What specific riders are you interested in keeping or removing?"
            },
            {
              "id": "1",
              "text": "Do you have any concerns about the current riders included?"
            }
          ],
          "type": "add-cues",
          "color": "blue",
          "header": "Follow-up Question",
          "card_type": "regular_card",
          "feedbacks": [
            {
              "name": "Chris",
              "feedback": "Excellent alternative phrasing to check for concerns."
            }
          ]
        }
      ],
      "type": "Recommendations"
    },
    {
      "cues": [
        {
          "id": "2025-09-18 12:30:03",
          "data": [
            {
              "id": "0",
              "text": "What is the sum assured for your insurance policy with HDFC life?"
            }
          ],
          "type": "add-cues",
          "color": "blue",
          "header": "Follow-up Question",
          "card_type": "regular_card",
          "feedbacks": [
            {
              "id":"",
              "name": "varun",
              "feedback": "this is not user spoken might be an issue with whisper",
              "timeStamp":""
            },
            {
              "name": "sonam",
              "feedback": "yes i also confirmed its an issue"
            },
            {
              "name": "Deepa",
              "feedback": "Tagging as ASR error, should be reviewed by QA."
            }
          ]
        },
        {
          "id": "2025-09-18 12:29:45",
          "data": [
            {
              "id": "0",
              "text": "Can you provide details about your family's medical history?"
            },
            {
              "id": "1",
              "text": "Do you have any preexisting medical conditions?"
            }
          ],
          "type": "add-cues",
          "color": "blue",
          "header": "Follow-up Question",
          "card_type": "regular_card",
          "feedbacks": [
            {
              "name": "varun",
              "feedback": "this is not user spoken might be an issue with whisper"
            },
            {
              "name": "sonam",
              "feedback": "yes i also confirmed its an issue"
            }
          ]
        },
        {
          "id": "2025-09-17 18:12:43",
          "data": [
            {
              "id": "0",
              "text": "Do you have any preexisting medical conditions?"
            },
            {
              "id": "1",
              "text": "Have you undergone any recent or ongoing medical tests?"
            }
          ],
          "type": "add-cues",
          "color": "blue",
          "header": "Follow-up Question",
          "card_type": "regular_card",
          "feedbacks": [
            {
              "name": "Ethan",
              "feedback": "Perfectly phrased to cover both current and recent health status."
            }
          ]
        },
        {
          "id": "2025-09-17 18:12:40",
          "data": [
            {
              "id": "0",
              "text": "Can you provide details about your family's medical history?"
            },
            {
              "id": "1",
              "text": "Do you have any preexisting medical conditions?"
            }
          ],
          "type": "add-cues",
          "color": "blue",
          "header": "Follow-up Question",
          "card_type": "regular_card",
          "feedbacks": [
            {
              "name": "Fiona",
              "feedback": "Solid core questions for the health profile stage."
            }
          ]
        }
      ],
      "type": "Health Profile"
    },
    {
      "cues": [
        {
          "id": "2025-09-18 12:29:30",
          "data": [
            {
              "id": "0",
              "text": "Ask about the expected sum insured for health insurance."
            }
          ],
          "type": "add-cues",
          "color": "blue",
          "header": "Follow-up Question",
          "card_type": "regular_card",
          "feedbacks": [
            {
              "name": "Gary",
              "feedback": "Generic, but necessary. Ensure we capture the sum insured before moving on."
            }
          ]
        },
        {
          "id": "2025-09-18 12:29:24",
          "data": [
            {
              "id": "0",
              "text": "Who else would you like to include in the health insurance coverage?"
            },
            {
              "id": "1",
              "text": "What is your average monthly income?"
            }
          ],
          "type": "add-cues",
          "color": "blue",
          "header": "Follow-up Question",
          "card_type": "regular_card",
          "feedbacks": [
            {
              "name": "Hannah",
              "feedback": "Combining coverage and income questions is efficient here."
            }
          ]
        },
        {
          "id": "2025-09-18 12:29:19",
          "data": [
            {
              "id": "0",
              "text": "What is your average monthly income?"
            },
            {
              "id": "1",
              "text": "What is your average monthly EMI?"
            }
          ],
          "type": "add-cues",
          "color": "blue",
          "header": "Follow-up Question",
          "card_type": "regular_card",
          "feedbacks": [
            {
              "name": "Ivy",
              "feedback": "Standard financial discovery questions."
            }
          ]
        },
        {
          "id": "2025-09-17 18:11:30",
          "data": [
            {
              "id": "0",
              "text": "What is your average monthly income?"
            },
            {
              "id": "1",
              "text": "What is your average monthly EMI?"
            }
          ],
          "type": "add-cues",
          "color": "blue",
          "header": "Follow-up Question",
          "card_type": "regular_card",
          "feedbacks": [
            {
              "name": "Jake",
              "feedback": "Duplicate cue from 12:29:19 - review necessity."
            }
          ]
        },
        {
          "id": "2025-09-17 18:11:24",
          "data": [
            {
              "id": "0",
              "text": "What is your average monthly income?"
            },
            {
              "id": "1",
              "text": "What is your average monthly EMI?"
            }
          ],
          "type": "add-cues",
          "color": "blue",
          "header": "Follow-up Question",
          "card_type": "regular_card",
          "feedbacks": [
            {
              "name": "Kelly",
              "feedback": "Removing duplicates like this one would clean up the cue list."
            }
          ]
        },
        {
          "id": "2025-09-17 18:11:09",
          "data": [
            {
              "id": "0",
              "text": "Please provide your full name."
            },
            {
              "id": "1",
              "text": "What is your age?"
            }
          ],
          "type": "add-cues",
          "color": "blue",
          "header": "Follow-up Question",
          "card_type": "regular_card",
          "feedbacks": [
            {
              "name": "Liam",
              "feedback": "Initial data collection cue - essential and clear."
            }
          ]
        },
        {
          "id": "2025-09-17 17:57:08",
          "data": [
            {
              "id": "0",
              "text": "Please provide your full name."
            },
            {
              "id": "1",
              "text": "What is your age?"
            }
          ],
          "type": "add-cues",
          "color": "blue",
          "header": "Follow-up Question",
          "card_type": "regular_card",
          "feedbacks": [
            {
              "name": "Mia",
              "feedback": "Seems redundant, but a good fall-back if info is missed early."
            }
          ]
        },
        {
          "id": "2025-09-17 17:54:21",
          "data": [],
          "type": "add-cues",
          "color": "blue",
          "header": "Follow-up Question",
          "card_type": "regular_card",
          "feedbacks": [
            {
              "name": "Noah",
              "feedback": "Empty data array; this card should probably be removed or populated."
            }
          ]
        },
        {
          "id": "2025-09-17 17:54:18",
          "data": [],
          "type": "add-cues",
          "color": "blue",
          "header": "Follow-up Question",
          "card_type": "regular_card",
          "feedbacks": [
            {
              "name": "Olivia",
              "feedback": "Another empty card. Check the logic that creates these."
            }
          ]
        },
        {
          "id": "2025-09-17 17:53:47",
          "data": [],
          "type": "add-cues",
          "color": "blue",
          "header": "Follow-up Question",
          "card_type": "regular_card",
          "feedbacks": [
            {
              "name": "Peter",
              "feedback": "Three consecutive empty cards. Investigate the trigger for these."
            }
          ]
        },
        {
          "id": "2025-09-17 17:51:22",
          "data": [
            {
              "id": "0",
              "text": "What type of insurance product are you interested in?"
            },
            {
              "id": "1",
              "text": "What is the expected sum insured?"
            }
          ],
          "type": "add-cues",
          "color": "blue",
          "header": "Follow-up Question",
          "card_type": "regular_card",
          "feedbacks": [
            {
              "name": "Quinn",
              "feedback": "Good pairing of product type and amount."
            }
          ]
        },
        {
          "id": "2025-09-17 17:51:21",
          "data": [
            {
              "id": "0",
              "text": "Can you provide the names and ages of your mother and father?"
            },
            {
              "id": "1",
              "text": "What type of insurance product are you interested in?"
            }
          ],
          "type": "add-cues",
          "color": "blue",
          "header": "Follow-up Question",
          "card_type": "regular_card",
          "feedbacks": [
            {
              "name": "Raj",
              "feedback": "The two questions here feel disconnected. Better to separate them."
            }
          ]
        },
        {
          "id": "2025-09-17 17:50:57",
          "data": [
            {
              "id": "0",
              "text": "What is your average monthly income?"
            },
            {
              "id": "1",
              "text": "What is your average monthly EMI?"
            }
          ],
          "type": "add-cues",
          "color": "blue",
          "header": "Follow-up Question",
          "card_type": "regular_card",
          "feedbacks": [
            {
              "name": "Sara",
              "feedback": "Excellent, concise financial check."
            }
          ]
        },
        {
          "id": "2025-09-17 17:50:54",
          "data": [
            {
              "id": "0",
              "text": "What is your age?"
            },
            {
              "id": "1",
              "text": "What is your average monthly income?"
            }
          ],
          "type": "add-cues",
          "color": "blue",
          "header": "Follow-up Question",
          "card_type": "regular_card",
          "feedbacks": [
            {
              "name": "Tom",
              "feedback": "Basic profile data needed. Good initial prompts."
            }
          ]
        }
      ],
      "type": "Basic Info"
    }
  ],
  "audio_url": [
    [
      null
    ]
  ],
  "transcript": [
    {
      "type": "Basic Info",
      "transcripts": [
        {
          transcript_id:'uuidv0',
          text:"Hi, my name is Varun. I currently live in Hyderabad. My age is 45.",
          timeStamp:'',
          feedbacks: [
            {
              "feedback_id":"feedback_001",
              "name": "varun",
              "feedback": "this is not user spoken might be an issue with whisper",
              "timeStamp":""
            },
            {
              "feedback_id":"feedback_002",
              "name": "sonam",
              "feedback": "prob in transcript",
              "timeStamp":""
            },
          ]
        },

        // "I want coverage for health insurance.",
        // "My monthly income is Rs. 3,55,000. Average monthly EMI is Rs. 1,20,000."
      ]

    },
    // {
    //   "type": "Health Profile",
    //   "transcript": [
    //     "I regularly consume alcohol.",
    //     "There is no family medical history basically. I consume alcohol every day.",
    //     "and",
    //     "There are no pre-existing medical conditions. I have recently done medical test.",
    //     "I have insurance from HDFC life.",
    //     "Some measured is 10 lakhs. Previous claims are none.",
    //     "Somebody showed his 10 lakhs for my insurance."
    //   ]
    // },
    // {
    //   "type": "Recommendations",
    //   "transcript": [
    //     "Okay, trigger recommendations."
    //   ]
    // }
  ],
  "customer_info": [
    {
      "type": "Basic Info",
      "customer_info": {
        "type": "basic-info",
        "basicInfo": {
          "boxA": {
            "data": {
              "age": 45,
              "city": "Hyderabad - Tier2 (Tier2)",
              "name": "Varun",
              "coverageFor": ""
            },
            "header": "Client Info"
          },
          "boxB": {
            "data": {
              "AverageMonthlyEmi": 120000,
              "AverageMonthlyIncome": 355000
            },
            "header": "Financial Profile"
          },
          "boxC": {
            "data": {
              "ProductPreference": "Health Insurance",
              "ExpectedSumInsured": ""
            },
            "header": "Client Requirements"
          },
          "table": {
            "header": "Family Structure",
            "table_data": [
              [
                "",
                "",
                ""
              ]
            ],
            "table_header": [
              "Name",
              "Age",
              "Relationship"
            ]
          }
        }
      }
    },
    {
      "type": "Health Profile",
      "customer_info": {
        "type": "healthProfile",
        "HealthProfile": {
          "boxA": {
            "data": {
              "consumeAlcohol": "",
              "FamilyMedicalHistory": "No Medical History"
            },
            "header": "LifeStyle & Habits"
          },
          "boxB": {
            "data": {
              "AnyMedicalTests": "Recent medical test",
              "PreexistingMedicalConditions": "No Preexisting Medical Conditions"
            },
            "header": "Medical History"
          },
          "table": {
            "header": "Insurance & Claim History",
            "table_data": [
              [
                "HDFC life",
                1000000,
                "",
                "No"
              ]
            ],
            "table_header": [
              "Company_Name",
              "Sum_Assured",
              "State",
              "Previous_Claims"
            ]
          }
        }
      }
    },
    {
      "type": "Recommendations",
      "customer_info": {
        "type": "recommendations",
        "Recommendations": {
          "reason": "- **Age Band (45-50)**: At this age, lifestyle changes increase the chances of hypertension, diabetes, and cardiac issues. Securing a higher sum insured now can prevent future financial strain.\n- **Family Members**: With a family structure, the likelihood of medical emergencies increases. A family floater policy ensures comprehensive coverage for all members, safeguarding against unexpected health issues.\n- **Alcohol/Tobacco Use**: Consumption of alcohol and tobacco raises health risks, which can lead to higher medical expenses. A higher coverage can provide financial protection against potential health complications arising from these habits.\n- **Family History**: Although there is no current medical history, having a family history can increase the risk of developing certain conditions. Higher coverage can help manage costs associated with these potential health issues.\n- **Place (Hyderabad - Tier 2)**: Healthcare costs are rising, and treatment in private hospitals can be expensive. Higher coverage ensures access to quality medical services without financial burden.\n- **Income**: With an average monthly income of ₹355,000, investing in a higher sum insured is feasible and provides peace of mind against unexpected medical emergencies.",
          "riders": [
            {
              "desc": "Provides unlimited coverage for hospitalization and medical expenses.",
              "name": "Infinite Care",
              "include": true
            },
            {
              "desc": "Covers hospitalization costs for up to 2 hours.",
              "name": "2-hr Hospitalization",
              "include": true
            },
            {
              "desc": "Ensures claims are processed smoothly without delays.",
              "name": "Claim Protector",
              "include": true
            },
            {
              "desc": "Increases the sum insured automatically every year.",
              "name": "Power Booster",
              "include": true
            },
            {
              "desc": "Covers accommodation costs for dependents during hospitalization.",
              "name": "Dependent Accommodation Benefit",
              "include": true
            },
            {
              "desc": "Provides annual health checkups at no additional cost.",
              "name": "Annual Health Checkups",
              "include": true
            },
            {
              "desc": "Adjusts coverage to keep up with inflation.",
              "name": "Inflation Protector",
              "include": true
            },
            {
              "desc": "Covers costs for medical equipment needed at home.",
              "name": "Durable Medical Equipment",
              "include": true
            },
            {
              "desc": "Covers air ambulance costs within the country.",
              "name": "Domestic Air Ambulance Cover",
              "include": true
            },
            {
              "desc": "Covers nursing services at home post-hospitalization.",
              "name": "Nursing At Home",
              "include": true
            },
            {
              "desc": "Covers travel costs for family visits during hospitalization.",
              "name": "Compassionate Visit",
              "include": true
            },
            {
              "desc": "Provides coverage in case of accidental injuries.",
              "name": "Personal Accident",
              "include": true
            },
            {
              "desc": "Covers major critical illnesses as specified in the policy.",
              "name": "Critical Illness",
              "include": true
            },
            {
              "desc": "Allows upgrading to a better room category during hospitalization.",
              "name": "Room Modifier",
              "include": true
            }
          ],
          "premium": 89100,
          "planName": "elevate",
          "sumInsured": 4500000
        }
      }
    }
  ]
   }

 
 
 

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



  function updateCuesFeedback(feedbackObj){
    let group = aiCues.find(e=>e.type === feedbackObj.type)
    let cue = group.cues.find(e=>e.id===feedbackObj.cue_id)
    cue.feedbacks.push({
      feedback_id:feedbackObj.feedback_id,
      feedback:feedbackObj.feedback,
      name:feedbackObj.name,
      timeStamp:feedbackObj.timeStamp
    }) 

    console.log(aiCues)
    setAICues([...aiCues])

    console.log('updateCuesFeedback',cue,group,feedbackObj)
  
  }

  
  function updateTranscriptionFeedback(feedbackObj){
    //e.preventDefault()
    //console.log('feedback',feedbackObj)

    let group = transcription.find(e=>e.type===feedbackObj.type)
    
    let transcript = group.transcripts.find(e=>e.transcript_id === feedbackObj.transcript_id)

    console.log('group',transcript,feedbackObj )
    transcript.feedbacks.push({
      feedback_id:feedbackObj.feedback_id,
      feedback:feedbackObj.feedback ,
      name:feedbackObj.name,
      timeStamp : feedbackObj.timeStamp
    })

    console.log('transcription',transcription)

    axios.post('https://4d5edced2af8.ngrok-free.app/add-feedback',reqJson)
    .then(res=>{
      console.log('res from axios',res)
      setTranscription([...transcription])
    })
    .catch(err=>console.log('axios err',err))
    

  }

  useEffect(()=>{
    console.log('aiCues modified',aiCues)
  },[aiCues])


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
