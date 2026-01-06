
import { BarChart2, ThumbsUp, ThumbsDown, Lightbulb } from "lucide-react"
import type { AssessmentItem } from "./types"


interface QualityAssessmentProps {
  assessmentData: AssessmentItem[]
  selectedTags: { [key: number]: number }
  onTagClick: (cardId: number, tagIndex: number) => void
}

export function QualityAssessment({ assessmentData, selectedTags, onTagClick }: QualityAssessmentProps) {

  console.log("assessmentData", assessmentData,"selectedTags", selectedTags, onTagClick)
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-800 flex items-center">
          <BarChart2 className="w-5 h-5 mr-2 text-green-600" /> Quality Assessment
        </h2>
        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1 text-gray-500">
            <span className="w-2 h-2 rounded-full bg-green-500"></span> Strength
          </span>
          <span className="flex items-center gap-1 text-gray-500">
            <span className="w-2 h-2 rounded-full bg-red-500"></span> Area for Improvement
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {assessmentData.map((item) => {
          const activeTagIndex = selectedTags[item.id]
          const activeTag = item.topics[activeTagIndex]
          const isPositive = activeTag?.sentiment === "positive"

          return (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col md:flex-row"
            >
              {/* Left: Score & Header (25%) */}
              <div className="p-5 md:w-1/4 bg-gray-50 border-r border-gray-100 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`p-1.5 rounded-lg text-white ${item.color.replace("bg-", "bg-opacity-90 bg-")}`}>
                      {item.icon}
                    </div>
                    <h3 className="font-bold text-gray-900 leading-tight">{item.label}</h3>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-3xl font-bold text-gray-900">{item.score}</span>
                  <span className="text-sm text-gray-400 font-medium">/10</span>
                </div>
              </div>

              {/* Right: Interactive Analysis (75%) */}
              <div className="p-5 md:w-3/4 flex flex-col">
                {/* Topic Tags - Interactive & Color Coded */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.topics.map((topic, idx) => {
                    const isActive = idx === activeTagIndex
                    const tagIsPositive = topic?.sentiment === "positive"

                    let buttonClass = `flex items-center px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border `

                    if (isActive) {
                      buttonClass += tagIsPositive
                        ? "bg-green-600 text-white border-green-600 shadow-md transform scale-105"
                        : "bg-red-500 text-white border-red-500 shadow-md transform scale-105"
                    } else {
                      buttonClass += tagIsPositive
                        ? "bg-white text-green-700 border-green-200 hover:border-green-400 hover:bg-green-50"
                        : "bg-white text-red-600 border-red-200 hover:border-red-400 hover:bg-red-50"
                    }

                    return (
                      <button key={idx} onClick={() => onTagClick(item.id, idx)} className={buttonClass}>
                        {tagIsPositive ? (
                          <ThumbsUp className="w-3 h-3 mr-1.5" />
                        ) : (
                          <ThumbsDown className="w-3 h-3 mr-1.5" />
                        )}
                        {topic?.name}
                      </button>
                    )
                  })}
                </div>

                {/* Dynamic Analysis Content - Color Coded */}
                <div
                  className={`rounded-lg p-4 border flex-1 animate-in fade-in duration-300 transition-colors ${
                    isPositive ? "bg-green-50/50 border-green-100" : "bg-red-50/50 border-red-100"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-1.5 rounded-full mt-0.5 ${
                        isPositive ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                      }`}
                    >
                      <Lightbulb className="w-4 h-4" />
                    </div>
                    <div>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider mb-1 block ${
                          isPositive ? "text-green-600" : "text-red-500"
                        }`}
                      >
                        AI Analysis: {activeTag?.name}
                      </span>
                      <p className="text-sm text-gray-800 leading-relaxed">{activeTag?.analysis}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
