"use client"

import {  useState } from "react"
import { Sidebar } from "./sidebar"
import { Header } from "./header"
import { FinancialOverview } from "./financial-overview"
import { FinancialContentDisplay } from "./financial-modal"
import { AICues } from "./ai-cues"
import  TranscriptPanel from "./transcript-panel-new"
import { AudioPlayer } from "./audio-player"
import { useData } from "../context/DataWrapper"
// import TranscriptCues from '../components/transcript-cues'
import AiCuesNew from '../components/ai-cues-new'
// import axios from "axios"

export function InterviewDashboard() {
  const [selectedSection, setSelectedSection] = useState<string | null>(null)
  const [selectedLabel, setSelectedLabel] = useState<string>("")

  //@ts-ignore
  const {topContainerRef} = useData()

  // const [data, setData] = useState(null)

  // const getData = async () => {
  //   try {
  //     const res = await axios.get("/some-endpoint")
  //     setData(res.data)
  //   } catch (error) {
  //     console.error("Error fetching data:", error)
  //   }
  // }

  // useEffect(() => {
  //   getData()
  // }, [])

  const handleSelectSection = (key: string, label: string) => {
    setSelectedSection(key)
    setSelectedLabel(label)
  }

  return (
    <div className="flex flex-col md:flex-row ml-0 bg-gray-50 font-sans min-h-screen" ref={topContainerRef} style={{width:'75vw',margin:'0 auto',marginBottom:'20vh'}} >
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-0 w-full pb-5">
        {/* Header Box */}
        <div className="px-12 md:px-20 py-8 w-full bg-white rounded-xl shadow-md">
          <Header />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-10 w-full px-6 md:px-12">
          {/* Left Panel - Financial Overview */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-md h-full">
              <FinancialOverview onSelectSection={handleSelectSection} selectedSection={selectedSection || undefined} />
            </div>
          </div>

          {/* Middle and Right Panels - Conditional Layout */}
          {selectedSection ? (
            /* When section selected, content spans 2 columns */
            <div className="lg:col-span-2">
              <div className="bg-white p-6 rounded-xl shadow-md h-full">
                <FinancialContentDisplay selectedSection={selectedSection} selectedLabel={selectedLabel} />
              </div>
            </div>
          ) : (
            /* When no section selected, show AI Cues and Transcript side by side */
            <>
              {/* Middle Panel - AI Cues */}
              <div className="lg:col-span-2">
                <div className="bg-white p-6 rounded-xl shadow-md h-full">
                  <AICues type="" />
                </div>
              </div>

              {/* Right Panel - Transcript */}
              {/* <div className="lg:col-span-1">
                <div className="bg-white p-6 rounded-xl shadow-md h-full">
                  <TranscriptPanel />
                </div>
              </div> */}
            </>
          )}
        </div>

        {/* <AiCuesNew type={selectedLabel}/>   */}
        {/* <TranscriptCues/> */}
        {/* {selectedSection && ( */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10 w-full px-6 md:px-12" >
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-xl shadow-md" style={{height:'80vh'}}>
                {/* <AICues type={selectedLabel} />*/}
                <AiCuesNew type={selectedLabel}/>
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-xl shadow-md " style={{height:'80vh'}} >
                <TranscriptPanel/>
              </div>
            </div>
          </div>
        {/* )} */}
      </div>

      {/* Sticky Bottom Audio Player */}
      <div className="fixed bottom-0 left-0 right-0 z-20">
        <AudioPlayer />
      </div>
    </div>
  )
}
