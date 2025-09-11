import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import axios from "axios";

const Context = createContext("")

export function useData() {
  const ctx = useContext(Context)
  if (!ctx) {
    throw new Error("useData must be used inside DataWrapper")
  }
  return ctx
}

export default function DataWrapper({ children }: { children: React.ReactNode }) {
  const url = window.location.href; 
  const match = url.match(/cid_\d{4}/);
  let customerId = ""
  if (match) {
    customerId = match[0];
    console.log(customerId); 
  } else {
    console.log("cid_xxxx not found");
  }
  console.log("DataWrapper rendered")
  const [transcription, setTranscription] = useState<any[]>([])
  const [aiCues, setAICues] = useState<any[]>([])
  const [financials, setFinancials] = useState<any[]>([])

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

    // // Set the mock data directly instead of making API calls
    // setFinancials(mockData.customer_info)
    // setTranscription(mockData.transcript || [])
    // setAICues(mockData.cues || [])

    // console.log("Mock data loaded successfully")

    const fetchFinancials = async () => {
  try {
    const res = await axios.post(
      "https://wpv7kxos9g.execute-api.ap-south-1.amazonaws.com/test/recruito-upload-apis/main_router",
      {
        trigger_func: "req_postfacto_data",
        params: { session_id: customerId },
      }
    );
    console.log("Financials data:", res.data);
    setFinancials(res.data.customer_info);
    setTranscription(res.data.transcript || []);
    setAICues(res.data.cues || []);
  } catch (err) {
    console.error("Failed to fetch Financials", err);
  }
};
    fetchFinancials();
  }, [])

  const values = {
    transcription,
    setTranscription,
    aiCues,
    setAICues,
    financials,
    setFinancials,
  }
  //@ts-ignore
  return <Context.Provider value={values}>{children}</Context.Provider>
}