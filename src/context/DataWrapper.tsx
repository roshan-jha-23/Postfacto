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
  // const transcription = useAppSelector((s) => s.transcription.sections)
  // const aiCues = useAppSelector((s) => s.cues.categories)
  // const financials = useAppSelector((s) => s.customerInfo.sections)
  const [audioUrl, setAudioUrl] = useState<string>("")
  const topContainerRef = useRef(null)

  useEffect(() => {
//     const val ={
//     "audio_url": "https://storage.googleapis.com/postfacto-audiofiles/life_insurance_audio/cid_6737.mp3",
//     "cues": [
//         {
//             "cues": [
//                 {
//                     "data": {
//                         "card_type": "regular_card",
//                         "color": "blue",
//                         "data": [
//                             {
//                                 "id": "0",
//                                 "text": "Can you provide the exact value of your gold?"
//                             },
//                             {
//                                 "id": "1",
//                                 "text": "Do you have any other investments or assets not mentioned?"
//                             }
//                         ],
//                         "header": "Follow-up Question",
//                         "id": "2025-10-08 18:35:12",
//                         "type": "add-cues"
//                     },
//                     "feedbacks": [],
//                     "pid": "0",
//                     "timeStamp": "2025-10-08 13:05:12.875245"
//                 },
//                 {
//                     "data": {
//                         "card_type": "regular_card",
//                         "color": "blue",
//                         "data": [
//                             {
//                                 "id": "0",
//                                 "text": "What is the total value of your gold?"
//                             },
//                             {
//                                 "id": "1",
//                                 "text": "Do you have any other investments or assets not mentioned?"
//                             }
//                         ],
//                         "header": "Follow-up Question",
//                         "id": "2025-10-08 18:35:09",
//                         "type": "add-cues"
//                     },
//                     "feedbacks": [],
//                     "pid": "1",
//                     "timeStamp": "2025-10-08 13:05:09.818967"
//                 },
//                 {
//                     "data": {
//                         "card_type": "regular_card",
//                         "color": "blue",
//                         "data": [
//                             {
//                                 "id": "0",
//                                 "text": "Clarify the total amount in PPF and NSC."
//                             },
//                             {
//                                 "id": "1",
//                                 "text": "Ask for details on any other investments or assets."
//                             }
//                         ],
//                         "header": "Follow-up Question",
//                         "id": "2025-10-08 18:23:16",
//                         "type": "add-cues"
//                     },
//                     "feedbacks": [],
//                     "pid": "2",
//                     "timeStamp": "2025-10-08 12:53:16.824324"
//                 },
//                 {
//                     "data": {
//                         "card_type": "regular_card",
//                         "color": "blue",
//                         "data": [
//                             {
//                                 "id": "0",
//                                 "text": "Can you provide details on any other life insurance policies you may have?"
//                             },
//                             {
//                                 "id": "1",
//                                 "text": "Do you have any investments in SIPs or other forms of mutual funds?"
//                             }
//                         ],
//                         "header": "Follow-up Question",
//                         "id": "2025-10-08 18:22:43",
//                         "type": "add-cues"
//                     },
//                     "feedbacks": [],
//                     "pid": "3",
//                     "timeStamp": "2025-10-08 12:52:43.800947"
//                 },
//                 {
//                     "data": {
//                         "card_type": "regular_card",
//                         "color": "blue",
//                         "data": [
//                             {
//                                 "id": "0",
//                                 "text": "What is the total amount you have invested in mutual funds or equity?"
//                             }
//                         ],
//                         "header": "Follow-up Question",
//                         "id": "2025-10-08 17:58:30",
//                         "type": "add-cues"
//                     },
//                     "feedbacks": [],
//                     "pid": "4",
//                     "timeStamp": "2025-10-08 12:28:30.312651"
//                 },
//                 {
//                     "data": {
//                         "card_type": "regular_card",
//                         "color": "green",
//                         "data": [
//                             {
//                                 "id": "unique_0",
//                                 "text": "On death of the life assured during the policy term, provided all due premiums are paid, death benefit equal to the following shall be payable as lump sum to the nominee:\n• Sum Assured on Death plus\n• Accrued Cash Bonuses, if not paid earlier plus • Interim Survival Benefit (if any) plus • Terminal Bonus (if declared). The minimum Death Benefit shall be 105% of Total Premiums Paid‘ as on date of death.Where, the Sum Assured on Death is the absolute amount of benefit which is guaranteed to become payable on death of the life assured. It shall be the highest of: • 10 times the Annualized Premium\n• Sum Assured on Maturity\n• Death Multiple x Annualized Premium\nWhere, Interim Survival Benefit = Interim Cash Bonus Rate * Annualized Premium * Months elapsed since last Survival Benefit payout date /12. The applicable Death Multiples are specified below:-\nOn payment of Death Benefit during the policy term, the policy will terminate and no future payouts will be payable.For minor lives where risk commences from the first policy anniversary and death of the Life Insured takes place prior to the risk commencement date, only the basic premiums paid to date (excluding taxes and levies, if any ) shall be payable as the Death Benefit.\nThe applicable Death Multiples are specified below:-\nOn death of the life assured during the Payout Period after Premium Payment Term, the Death Benefit payable shall not be reduced by the survival benefits already paid.\nOn payment of Death Benefit during the policy term, the policy will terminate and no future payouts will be payable.\nFor minor lives where risk commences from the first policy anniversary and death of the Life Insured takes place prior to the risk commencement date, only the basic premiums paid to date (excluding taxes and levies, if any) shall be payable as the Death Benefit."
//                             }
//                         ],
//                         "header": "what is the death benefits in deffered income option ?",
//                         "id": "2025-10-08 17:58:10",
//                         "type": "add-cues"
//                     },
//                     "feedbacks": [],
//                     "pid": "5",
//                     "timeStamp": "2025-10-08 12:28:13.438463"
//                 },
//                 {
//                     "data": {
//                         "card_type": "regular_card",
//                         "color": "blue",
//                         "data": [
//                             {
//                                 "id": "0",
//                                 "text": "Please provide details of any existing life insurance policies."
//                             },
//                             {
//                                 "id": "1",
//                                 "text": "Do you have any savings in PPF or NSC?"
//                             }
//                         ],
//                         "header": "Follow-up Question",
//                         "id": "2025-10-08 17:57:46",
//                         "type": "add-cues"
//                     },
//                     "feedbacks": [],
//                     "pid": "6",
//                     "timeStamp": "2025-10-08 12:27:46.791636"
//                 }
//             ],
//             "type": "Assets"
//         },
//         {
//             "cues": [
//                 {
//                     "data": {
//                         "card_type": "regular_card",
//                         "color": "blue",
//                         "data": [
//                             {
//                                 "id": "0",
//                                 "text": "What is your family structure?"
//                             }
//                         ],
//                         "header": "Follow-up Question",
//                         "id": "2025-10-08 18:34:57",
//                         "type": "add-cues"
//                     },
//                     "feedbacks": [],
//                     "pid": "0",
//                     "timeStamp": "2025-10-08 13:04:57.058698"
//                 },
//                 {
//                     "data": {
//                         "card_type": "regular_card",
//                         "color": "blue",
//                         "data": [],
//                         "header": "Follow-up Question",
//                         "id": "2025-10-08 18:23:32",
//                         "type": "add-cues"
//                     },
//                     "feedbacks": [],
//                     "pid": "1",
//                     "timeStamp": "2025-10-08 12:53:32.707013"
//                 },
//                 {
//                     "data": {
//                         "card_type": "regular_card",
//                         "color": "blue",
//                         "data": [],
//                         "header": "Follow-up Question",
//                         "id": "2025-10-08 18:22:32",
//                         "type": "add-cues"
//                     },
//                     "feedbacks": [],
//                     "pid": "2",
//                     "timeStamp": "2025-10-08 12:52:32.886697"
//                 },
//                 {
//                     "data": {
//                         "card_type": "regular_card",
//                         "color": "blue",
//                         "data": [
//                             {
//                                 "id": "0",
//                                 "text": "What is your family structure?"
//                             },
//                             {
//                                 "id": "1",
//                                 "text": "Do you have any dependents?"
//                             }
//                         ],
//                         "header": "Follow-up Question",
//                         "id": "2025-10-08 17:57:28",
//                         "type": "add-cues"
//                     },
//                     "feedbacks": [],
//                     "pid": "3",
//                     "timeStamp": "2025-10-08 12:27:28.181265"
//                 },
//                 {
//                     "data": {
//                         "card_type": "regular_card",
//                         "color": "blue",
//                         "data": [
//                             {
//                                 "id": "0",
//                                 "text": "What is your age?"
//                             },
//                             {
//                                 "id": "1",
//                                 "text": "What is your occupation?"
//                             }
//                         ],
//                         "header": "Follow-up Question",
//                         "id": "2025-10-08 17:57:21",
//                         "type": "add-cues"
//                     },
//                     "feedbacks": [],
//                     "pid": "4",
//                     "timeStamp": "2025-10-08 12:27:21.887907"
//                 }
//             ],
//             "type": "Basic Info"
//         },
//         {
//             "cues": [
//                 {
//                     "data": {
//                         "card_type": "regular_card",
//                         "color": "blue",
//                         "data": [],
//                         "header": "Follow-up Question",
//                         "id": "2025-10-08 18:35:45",
//                         "type": "add-cues"
//                     },
//                     "feedbacks": [],
//                     "pid": "0",
//                     "timeStamp": "2025-10-08 13:05:45.819586"
//                 },
//                 {
//                     "data": {
//                         "card_type": "regular_card",
//                         "color": "blue",
//                         "data": [],
//                         "header": "Follow-up Question",
//                         "id": "2025-10-08 18:35:25",
//                         "type": "add-cues"
//                     },
//                     "feedbacks": [],
//                     "pid": "1",
//                     "timeStamp": "2025-10-08 13:05:25.748563"
//                 },
//                 {
//                     "data": {
//                         "card_type": "regular_card",
//                         "color": "blue",
//                         "data": [],
//                         "header": "Follow-up Question",
//                         "id": "2025-10-08 18:22:54",
//                         "type": "add-cues"
//                     },
//                     "feedbacks": [],
//                     "pid": "2",
//                     "timeStamp": "2025-10-08 12:52:54.491117"
//                 },
//                 {
//                     "data": {
//                         "card_type": "regular_card",
//                         "color": "blue",
//                         "data": [
//                             {
//                                 "id": "0",
//                                 "text": "What is the outstanding amount for the home loan?"
//                             },
//                             {
//                                 "id": "1",
//                                 "text": "What is the monthly EMI for the home loan?"
//                             }
//                         ],
//                         "header": "Follow-up Question",
//                         "id": "2025-10-08 17:59:49",
//                         "type": "add-cues"
//                     },
//                     "feedbacks": [],
//                     "pid": "3",
//                     "timeStamp": "2025-10-08 12:29:49.682940"
//                 },
//                 {
//                     "data": {
//                         "card_type": "regular_card",
//                         "color": "blue",
//                         "data": [
//                             {
//                                 "id": "0",
//                                 "text": "What is the total EMI amount?"
//                             },
//                             {
//                                 "id": "1",
//                                 "text": "Do you have any outstanding home loan details?"
//                             }
//                         ],
//                         "header": "Follow-up Question",
//                         "id": "2025-10-08 17:59:44",
//                         "type": "add-cues"
//                     },
//                     "feedbacks": [],
//                     "pid": "4",
//                     "timeStamp": "2025-10-08 12:29:44.464433"
//                 }
//             ],
//             "type": "Liabilities"
//         },
//         {
//             "cues": [
//                 {
//                     "data": {
//                         "card_type": "regular_card",
//                         "color": "blue",
//                         "data": [],
//                         "header": "Follow-up Question",
//                         "id": "2025-10-08 18:35:50",
//                         "type": "add-cues"
//                     },
//                     "feedbacks": [],
//                     "pid": "0",
//                     "timeStamp": "2025-10-08 13:05:50.410601"
//                 },
//                 {
//                     "data": {
//                         "card_type": "regular_card",
//                         "color": "blue",
//                         "data": [],
//                         "header": "Follow-up Question",
//                         "id": "2025-10-08 18:23:48",
//                         "type": "add-cues"
//                     },
//                     "feedbacks": [],
//                     "pid": "1",
//                     "timeStamp": "2025-10-08 12:53:48.843058"
//                 },
//                 {
//                     "data": {
//                         "card_type": "regular_card",
//                         "color": "blue",
//                         "data": [],
//                         "header": "Follow-up Question",
//                         "id": "2025-10-08 18:01:24",
//                         "type": "add-cues"
//                     },
//                     "feedbacks": [],
//                     "pid": "2",
//                     "timeStamp": "2025-10-08 12:31:24.827483"
//                 }
//             ],
//             "type": "Financial Goals"
//         }
//     ],
//     "customer_info": [
//         {
//             "customer_info": {
//                 "basicInfo": {
//                     "boxA": {
//                         "data": {
//                             "Age": "35",
//                             "City": "Hyderabad",
//                             "Dependents": "0",
//                             "Name": "Varun",
//                             "Occupation": "software developer"
//                         },
//                         "header": "Client Info"
//                     },
//                     "table": {
//                         "header": "Family Structure",
//                         "table_header": [
//                             "Name",
//                             "Relation",
//                             "Age"
//                         ],
//                         "table_values": [
//                             [
//                                 "",
//                                 "",
//                                 ""
//                             ]
//                         ]
//                     }
//                 },
//                 "type": "basic-info"
//             },
//             "type": "Basic Info"
//         },
//         {
//             "customer_info": {
//                 "assets": {
//                     "boxA": {
//                         "header": "Income and Savings",
//                         "sub_header": "Monthly Income (INR)",
//                         "sub_header_data": "2.00 lac",
//                         "text_area_header": "Savings (FD, PPF, NSC, etc.)",
//                         "text_area_value": "FD: ~3.00 lac\nPPF: 0\nNSC: 0"
//                     },
//                     "boxB": {
//                         "header": "Investments and Other Assets",
//                         "text_area_headerA": "Investments (Mutual Funds, Equity, DigitalGold)",
//                         "text_area_headerB": "Other Assets (Gold, Land, Property)",
//                         "text_area_valueA": "Mutual Funds: 0 \nDirect Equity: 0\nDigital Gold: ",
//                         "text_area_valueB": "30 grams worth of gold"
//                     },
//                     "table": {
//                         "header": "Existing Life Insurance",
//                         "table_header": [
//                             "Insurer Name",
//                             "Cover Amount (INR)",
//                             "Annual Premium (INR)"
//                         ],
//                         "table_values": [
//                             [
//                                 "HDFC Life",
//                                 "10.00 lac",
//                                 "3.00k"
//                             ]
//                         ]
//                     }
//                 },
//                 "type": "assets"
//             },
//             "type": "Assets"
//         },
//         {
//             "customer_info": {
//                 "liabilities": {
//                     "boxA": {
//                         "data": {
//                             "Credit Card Dues (if any)": "5.00 lac",
//                             "Monthly Expenses (INR)": "30.00k",
//                             "Total Monthly EMI (INR)": "20.00k"
//                         },
//                         "header": "Monthly Outflow"
//                     },
//                     "boxB": {
//                         "data": {
//                             "Monthly EMI (INR)": "20.00k",
//                             "Outstanding Amount (INR)": "18.00 lac",
//                             "Remaining Tenure (Months)": "12"
//                         },
//                         "header": "Home Loan Details"
//                     },
//                     "table": {
//                         "header": "Other Loans",
//                         "table_header": [
//                             "Loan Type",
//                             "Outstanding (INR)",
//                             "Monthly EMI (INR)"
//                         ],
//                         "table_values": [
//                             [
//                                 "",
//                                 "",
//                                 ""
//                             ]
//                         ]
//                     }
//                 },
//                 "type": "liabilities"
//             },
//             "type": "Liabilities"
//         },
//         {
//             "customer_info": {
//                 "financialGoals": [
//                     {
//                         "cols": {
//                             "Required Corpus": "2.00 cr",
//                             "TimeFrame": "25"
//                         },
//                         "header": "Retirement Savings",
//                         "priority": "1",
//                         "sub_header": "I want to save 2 crores for my retirement as a liquid corpus.",
//                         "text_area_value": ""
//                     }
//                 ],
//                 "type": "financial-goals"
//             },
//             "type": "Financial Goals"
//         },
//         {
//             "customer_info": {
//                 "planSummary": [
//                     {
//                         "calculation": {
//                             "Annual Expenses": "3.60 lac",
//                             "Outstanding Liabilities": "23.00 lac"
//                         },
//                         "cols": {
//                             "Required Corpus": "59.00 lac"
//                         },
//                         "header": "Immediate Life Cover Analysis",
//                         "reason": "<h3 style=\"font-size:3rem\">Total Recommended Cover <p style=\"color:blue\">59.00 lac</p></h3>",
//                         "sub_header": "",
//                         "text_area_value": ""
//                     },
//                     {
//                         "calculation": "",
//                         "cols": {
//                             "Required Corpus": "2.00 cr",
//                             "Target Year": 2050,
//                             "Time Frame": 25
//                         },
//                         "header": "Retirement Savings",
//                         "sub_header": "I want to save 2 crores for my retirement as a liquid corpus.",
//                         "text_area_value": "Inflation rate percent: 6%"
//                     }
//                 ],
//                 "type": "plan-summary"
//             },
//             "type": "Plan Summary"
//         },
//         {
//             "customer_info": {
//                 "recommendations": [
//                     {
//                         "calculation": "",
//                         "cols": {
//                             "Cover": "59 lakhs",
//                             "Est. Annual Premium": "8850",
//                             "Term": 25
//                         },
//                         "header": "Recommendation 1: Term Plan",
//                         "reason": "Covers liabilities and ensures lifestyle security for family, even though there are currently no dependents.",
//                         "sub_header": "This term plan provides financial security to cover liabilities and living expenses for dependents.",
//                         "text_area_value": "Total liabilities (23 lakhs) + (Monthly expenses (30k) × 120) = 23 lakhs + 36 lakhs = 59 lakhs"
//                     },
//                     {
//                         "calculation": "",
//                         "cols": {
//                             "Cover": "2.00 cr",
//                             "Est. Annual Premium": null,
//                             "Term": 25
//                         },
//                         "header": "Recommendation 2: Retirement Savings",
//                         "reason": "Aligns with time frame and risk profile for goal, ensuring adequate savings for retirement.",
//                         "sub_header": "I want to save 2 crores for my retirement as a liquid corpus.",
//                         "text_area_value": "To achieve a corpus of 2 cr in 25 years at 5% return, the annual premium required is approximately 1,00,000."
//                     }
//                 ],
//                 "type": "recommendations"
//             },
//             "type": "Recommendations"
//         },
//         {
//             "customer_info": null,
//             "type": "Q&A"
//         }
//     ],
//     "transcript": [
//         {
//             "transcript": [
//                 {
//                     "data": "My monthly income is 2 lakhs. I have fixed deposit of 3 lakhs.",
//                     "feedbacks": [],
//                     "pid": "0",
//                     "timeStamp": "2025-10-08 17:57:42"
//                 },
//                 {
//                     "data": "I also have an insurance from HDFC life some measured cover amount is 10 lakhs annual premium will be 3000",
//                     "feedbacks": [],
//                     "pid": "1",
//                     "timeStamp": "2025-10-08 17:57:51"
//                 },
//                 {
//                     "data": "What is death benefit payout option?",
//                     "feedbacks": [],
//                     "pid": "2",
//                     "timeStamp": "2025-10-08 17:58:10"
//                 },
//                 {
//                     "data": "Actually correct assets is {'boxA': {'header': 'Income and Savings', 'sub_header': 'Monthly Income (INR)', 'sub_header_data': '2.00 lac', 'text_area_value': 'FD: ~3.00 lac\\nPPF: 0\\nNSC: 0', 'text_area_header': 'Savings (FD, PPF, NSC, etc.)'}, 'boxB': {'header': 'Investments and Other Assets', 'text_area_valueA': 'Mutual Funds: 0 \\nDirect Equity: 0\\nDigital Gold: ', 'text_area_valueB': '', 'text_area_headerA': 'Investments (Mutual Funds, Equity, DigitalGold)', 'text_area_headerB': 'Other Assets (Gold, Land, Property)'}, 'table': {'header': 'Existing Life Insurance', 'table_header': ['Insurer Name', 'Cover Amount (INR)', 'Annual Premium (INR)'], 'table_values': [['HDFC Life', '10.00 lac', '3.00k']]}}",
//                     "feedbacks": [],
//                     "pid": "3",
//                     "timeStamp": "2025-10-08 17:59:01"
//                 },
//                 {
//                     "data": "Hi, what's up?",
//                     "feedbacks": [],
//                     "pid": "4",
//                     "timeStamp": "2025-10-08 18:22:39"
//                 },
//                 {
//                     "data": "I also have 30 grams worth of gold.",
//                     "feedbacks": [],
//                     "pid": "5",
//                     "timeStamp": "2025-10-08 18:23:09"
//                 },
//                 {
//                     "data": "Hello",
//                     "feedbacks": [],
//                     "pid": "6",
//                     "timeStamp": "2025-10-08 18:35:06"
//                 },
//                 {
//                     "data": "Yes, I have gold as well.",
//                     "feedbacks": [],
//                     "pid": "7",
//                     "timeStamp": "2025-10-08 18:35:09"
//                 }
//             ],
//             "type": "Assets"
//         },
//         {
//             "transcript": [
//                 {
//                     "data": "Hi, my name is Varun. I currently live in Hyderabad.",
//                     "feedbacks": [],
//                     "pid": "0",
//                     "timeStamp": "2025-10-08 17:57:16"
//                 },
//                 {
//                     "data": "My age is 35. I work as a software developer.",
//                     "feedbacks": [],
//                     "pid": "1",
//                     "timeStamp": "2025-10-08 17:57:22"
//                 },
//                 {
//                     "data": "There are zero dependents on me.",
//                     "feedbacks": [],
//                     "pid": "2",
//                     "timeStamp": "2025-10-08 17:57:24"
//                 },
//                 {
//                     "data": "Hello.",
//                     "feedbacks": [],
//                     "pid": "3",
//                     "timeStamp": "2025-10-08 18:22:28"
//                 },
//                 {
//                     "data": "There are zero dependents actually.",
//                     "feedbacks": [],
//                     "pid": "4",
//                     "timeStamp": "2025-10-08 18:23:29"
//                 },
//                 {
//                     "data": "Okay.",
//                     "feedbacks": [],
//                     "pid": "5",
//                     "timeStamp": "2025-10-08 18:34:50"
//                 }
//             ],
//             "type": "Basic Info"
//         },
//         {
//             "transcript": [
//                 {
//                     "data": "My monthly expenses are $30,000.",
//                     "feedbacks": [],
//                     "pid": "0",
//                     "timeStamp": "2025-10-08 17:59:38"
//                 },
//                 {
//                     "data": "I have an EMI, a home loan EMI.",
//                     "feedbacks": [],
//                     "pid": "1",
//                     "timeStamp": "2025-10-08 17:59:43"
//                 },
//                 {
//                     "data": "18 lakhs is the outstanding. Monthly EMI will be 20,000. Remaining tenure is 12 months.",
//                     "feedbacks": [],
//                     "pid": "2",
//                     "timeStamp": "2025-10-08 17:59:51"
//                 },
//                 {
//                     "data": "I have 5 lakhs of credit card videos.",
//                     "feedbacks": [],
//                     "pid": "3",
//                     "timeStamp": "2025-10-08 17:59:55"
//                 },
//                 {
//                     "data": "Actually correct liabilities is {'boxA': {'data': {'Monthly Expenses (INR)': '30.00k', 'Total Monthly EMI (INR)': '20.00k', 'Credit Card Dues (if any)': ''}, 'header': 'Monthly Outflow'}, 'boxB': {'data': {'Monthly EMI (INR)': '20.00k', 'Outstanding Amount (INR)': '18.00 lac', 'Remaining Tenure (Months)': '12'}, 'header': 'Home Loan Details'}, 'table': {'header': 'Other Loans', 'table_header': ['Loan Type', 'Outstanding (INR)', 'Monthly EMI (INR)'], 'table_values': [['', '', '']]}}",
//                     "feedbacks": [],
//                     "pid": "4",
//                     "timeStamp": "2025-10-08 18:00:18"
//                 },
//                 {
//                     "data": "What about liabilities?",
//                     "feedbacks": [],
//                     "pid": "5",
//                     "timeStamp": "2025-10-08 18:22:50"
//                 },
//                 {
//                     "data": "Okay",
//                     "feedbacks": [],
//                     "pid": "6",
//                     "timeStamp": "2025-10-08 18:35:20"
//                 },
//                 {
//                     "data": "Only home run I have.",
//                     "feedbacks": [],
//                     "pid": "7",
//                     "timeStamp": "2025-10-08 18:35:34"
//                 }
//             ],
//             "type": "Liabilities"
//         },
//         {
//             "transcript": [
//                 {
//                     "data": "I want to save 2 crores for my retirement as a liquid corpus.",
//                     "feedbacks": [],
//                     "pid": "0",
//                     "timeStamp": "2025-10-08 18:01:21"
//                 },
//                 {
//                     "data": "Yeah.",
//                     "feedbacks": [],
//                     "pid": "1",
//                     "timeStamp": "2025-10-08 18:23:44"
//                 },
//                 {
//                     "data": "Hello",
//                     "feedbacks": [],
//                     "pid": "2",
//                     "timeStamp": "2025-10-08 18:35:47"
//                 },
//                 {
//                     "data": "Actually correct type is liabilities",
//                     "feedbacks": [],
//                     "pid": "3",
//                     "timeStamp": "2025-10-08 18:35:52"
//                 }
//             ],
//             "type": "Financial Goals"
//         }
//     ]
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

    // dispatch(setTranscription(val?.transcript || []))
    // dispatch(setCues(val.cues || []))
    // dispatch(setCustomerInfo(val.customer_info || []))

    const fetchFinancials = async () => {
      try {
        const res = await axios.post(
          "https://wpv7kxos9g.execute-api.ap-south-1.amazonaws.com/test/recruito-upload-apis/main_router",
          { trigger_func: "req_postfacto_data", params: { session_id: customerId } },
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
    pid: string 
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
