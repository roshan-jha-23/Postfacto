"use client"

import { useEffect, useMemo, useState } from "react"
import { DashboardHeader } from "./dashboard-header"
import { DealIntelligence } from "./deal-intelligence"
import { ActionPlan } from "./action-plan"
import { QualityAssessment } from "./quality-assessment"
import { AudioPlayer } from "./audio-player"
import { Transcript } from "./transcript"
import { useData } from "../context/DataWrapper"

import {
  Target,
  BookOpen,
  ShieldCheck,
  HeartHandshake,
  Layers,
} from "lucide-react"

/* ---------------- ICON MAP ---------------- */
const ICON_MAP: any = {
  target: <Target className="w-4 h-4" />,
  book: <BookOpen className="w-4 h-4" />,
  process: <ShieldCheck className="w-4 h-4" />,
  rapport: <HeartHandshake className="w-4 h-4" />,
  layers: <Layers className="w-4 h-4" />,
}

const Dashboard = () => {
  const { assessmentData:quality_assessment ,setSelectedTranscriptId} = useData()

  /* ---------- Transform API data → UI data ---------- */
  const assessmentData = useMemo(() => {
    if (!quality_assessment?.length) return []

    return quality_assessment.map((item: any) => ({
      id: item.id,
      label: item.topic,
      score: item.score,
      color:
        item.color === "green"
          ? "bg-green-500"
          : item.color === "yellow"
          ? "bg-yellow-500"
          : "bg-orange-500",

      icon: ICON_MAP[item.icon] || ICON_MAP.layers,

      topics: item.tags.map((tag: any) => ({
        name: tag.name,
        sentiment: tag.sentiment,
        analysis: tag.analysis,
        uniq_id:tag.linked_transcript_id
      })),
    }))
  }, [quality_assessment])

  /* ---------- Selected Tag State (Dynamic Init) ---------- */
  const [selectedTags, setSelectedTags] = useState<{ [key: number]: number }>({})

  useEffect(() => {
    if (assessmentData.length) {
      setSelectedTags(
        Object.fromEntries(assessmentData.map((item:any) => [item.id, 0]))
      )
    }
  }, [assessmentData])

  const handleTagClick = (cardId: number, tagIndex: number) => {
    console.log("handleTagClick", cardId, tagIndex)
    setSelectedTranscriptId(assessmentData.find((item):any=>item.id===cardId)?.topics[tagIndex]?.uniq_id||"");
    setSelectedTags((prev) => ({ ...prev, [cardId]: tagIndex }))
  }

  return (
    <div className="bg-[#f4f6f8] min-h-screen font-sans text-gray-800">
      {/* Header */}
      <DashboardHeader />

      <main className="max-w-[1600px] mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT MAIN AREA */}
        <div className="lg:col-span-8 space-y-8">
          {/* Top Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DealIntelligence />
            <ActionPlan />
          </div>

          {/* Quality Assessment */}
          <QualityAssessment
            assessmentData={assessmentData}
            selectedTags={selectedTags}
            onTagClick={handleTagClick}
          />
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="lg:col-span-4 space-y-6">
          <AudioPlayer />
          <Transcript />
        </div>
      </main>
    </div>
  )
}

export default Dashboard
