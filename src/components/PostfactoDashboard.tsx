"use client"

import { Header } from "./header"
import { ClientProfile } from "./client-profile"
import { PerformanceReview } from "./performance-review"
import { DetailedBreakdown } from "./detail-brekdown"
import { AudioPlayer } from "./audio-player"
import { Transcript } from "./TranscriptWithCues"



export default function MeetingAnalysisPage() {
  return (
    <div className="h-screen flex flex-col overflow-hidden bg-slate-50">
      <Header clientName="Anjali Sharma" agentName="Rahul Verma" date="Aug 14, 2025" />

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden gap-0">
        <div className="flex-1 overflow-y-auto bg-slate-50 p-8 border-r border-slate-200">
          <ClientProfile  />
          <PerformanceReview  />
          <DetailedBreakdown />
        </div>

        <div className="w-[500px] flex flex-col bg-white shadow-xl overflow-hidden">
          <AudioPlayer />
          <Transcript />
        </div>
      </div>
    </div>
  )
}
