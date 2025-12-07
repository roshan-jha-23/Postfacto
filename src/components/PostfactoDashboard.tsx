import { Header } from "./header"
import { ClientProfile } from "./client-profile"
import { PerformanceReview } from "./performance-review"
import { DetailedBreakdown } from "./detail-brekdown"
import { AudioPlayer } from "./audio-player"
import { Transcript } from "./TranscriptWithCues"


export default function MeetingAnalysisPage() {
  return (
    <div className="h-screen flex flex-col overflow-hidden bg-slate-50">

      <Header />

      <div className="flex-1 flex overflow-hidden gap-0">
        
        {/* LEFT SIDE */}
        <div className="flex-1 overflow-y-auto bg-slate-50 p-8 border-r border-slate-200">
          <ClientProfile />
          <PerformanceReview />
          <DetailedBreakdown />
        </div>

        {/* RIGHT PANEL */}
        <div className="w-[500px] flex flex-col bg-white shadow-xl overflow-hidden">
          <AudioPlayer />
          <Transcript />
        </div>

      </div>
    </div>
  )
}

