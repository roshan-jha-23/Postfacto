

import { ArrowLeft, Download, Share2, User, Briefcase, Calendar } from "lucide-react"

import { useData } from "../context/DataWrapper"


export function Header() {
  const downloadBtn=()=>{
    alert("Download PDF clicked!")
  }
  const shareReportBtn=()=>{
    alert("Share Report clicked!")
  }

  const {meetingMetadata}=useData();
  return (
    <header className="bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between flex-shrink-0 z-10">
      <div className="flex items-center gap-6">
        <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="border-l border-gray-200 pl-6">
          <h1 className="text-2xl font-semibold text-gray-900">Meeting Analysis</h1>
          <div className="flex items-center gap-6 text-sm mt-2">
            <div className="flex items-center gap-2 text-gray-600">
              <User className="h-4 w-4 text-gray-400" />
              <span className="font-medium">{meetingMetadata.clientName}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Briefcase className="h-4 w-4 text-gray-400" />
              <span className="font-medium">{meetingMetadata.agentName}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span>{meetingMetadata.date}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2 shadow-sm" onClick={downloadBtn}>
          <Download className="h-4 w-4" />
          Download PDF
        </button>
        <button 
        onClick={shareReportBtn}
        className="px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm">
          <Share2 className="h-4 w-4" />
          Share Report
        </button>
      </div>
    </header>
  )
}
