import { Users, Clock, Thermometer, Calendar } from "lucide-react"
import { useData } from "../context/DataWrapper"

export function DashboardHeader() {
  const { meetingMetadata } = useData()
  console.log(meetingMetadata, "the meta data are")

  if (!meetingMetadata) return <h1>Loading...</h1>

  const {
    meetTitle,
    clientName,
    duration,
    date,
    agentScore,
    leadStatus,
  } = meetingMetadata

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10 px-6 py-4 shadow-sm">
      <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Left Section */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-blue-200 shadow-lg">
            {meetTitle?.charAt(0) || "M"}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-gray-900">
                {meetTitle}
              </h1>
              <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase border border-green-200">
                Completed
              </span>
            </div>

            <div className="flex items-center text-xs text-gray-500 gap-3 mt-0.5">
              <span className="flex items-center">
                <Users className="w-3 h-3 mr-1" />
                {clientName}
              </span>

              <span className="w-1 h-1 bg-gray-300 rounded-full" />

              <span className="flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {duration}
              </span>

              <span className="flex items-center">
              <Calendar className="w-3 h-3 mr-1" />
              {date}
            </span>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-end border-r border-gray-100 pr-6">
            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
              Agent Score
            </span>
            <span className="text-xl font-bold text-gray-900">
              {agentScore}
              <span className="text-sm text-gray-400 font-normal">/10</span>
            </span>
          </div>

          <div className="flex items-center bg-orange-50 text-orange-700 px-4 py-2 rounded-full border border-orange-100 shadow-sm">
            <Thermometer className="w-4 h-4 mr-2 text-orange-500" />
            <div className="flex flex-col leading-none">
              <span className="text-[10px] font-bold text-orange-400 uppercase">
                Lead Status
              </span>
              <span className="font-bold text-sm">
                {leadStatus}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
