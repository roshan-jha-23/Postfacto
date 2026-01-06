import { FileText } from "lucide-react"
import { useData } from "../context/DataWrapper"
import { useEffect, useRef } from "react"

export function Transcript() {
  const { transcriptionData, selectedTranscriptId,setAudioTimeStamp } = useData()
  const transcriptRefs = useRef<Record<string, HTMLDivElement | null>>({})
  
const timeToSeconds = (time: string) => {
  const [mm, ss] = time.split(":").map(Number)
  return mm * 60 + ss
}
 useEffect(() => {
  if (!selectedTranscriptId) return

  const activeItem = transcriptionData.find(
    (item: any) => item.unique_id === selectedTranscriptId
  )

  if (activeItem) {
    const seconds = timeToSeconds(activeItem.time)
    setAudioTimeStamp(seconds)

    transcriptRefs.current[selectedTranscriptId]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    })
  }
}, [selectedTranscriptId, transcriptionData])




  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col h-[calc(100vh-320px)] sticky top-[280px]">
      
      {/* Header */}
      <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-xl">
        <h3 className="font-bold text-gray-800 text-sm flex items-center">
          <FileText className="w-4 h-4 mr-2 text-gray-400" />
          Transcript
        </h3>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {transcriptionData.map((item: any) => {
          const isActive = item.unique_id === selectedTranscriptId

          return (
            <div
              key={item.unique_id}
              ref={(el) => (transcriptRefs.current[item.unique_id] = el)}
              className={`flex gap-3 group p-3 rounded-lg transition-all
                ${isActive ? "bg-yellow-100 ring-2 ring-yellow-400" : "hover:bg-gray-50"}
              `}
            >
              {/* Avatar */}
              <div className="flex-shrink-0 mt-1">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shadow-sm ${
                    item.speaker.includes("Bibhuti")
                      ? "bg-blue-100 text-blue-700"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {item.speaker.charAt(0)}
                </div>
              </div>

              {/* Content */}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-gray-900">
                    {item.speaker}
                  </span>
                  <span className="text-[10px] text-gray-400 font-mono">
                    {item.time}
                  </span>
                </div>

                <p className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-900">
                  {item.text}
                </p>
              </div>
            </div>
          )
        })}

        <div className="text-center py-4">
          <span className="text-xs text-gray-400 uppercase tracking-widest">
            End of Call
          </span>
        </div>
      </div>
    </div>
  )
}
