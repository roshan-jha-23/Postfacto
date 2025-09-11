"use client"

import { ChevronRight } from "lucide-react"
// import { useData } from "../context/DataWrapper"

interface FinancialOverviewProps {
  onSelectSection: (key: string, label: string) => void
  selectedSection?: string
}

export function FinancialOverview({ onSelectSection, selectedSection }: FinancialOverviewProps) {
  // const { financials } = useData()

  const items = [
    { key: "basicInfo", label: "Basic Info" },
    { key: "assets", label: "Assets" },
    { key: "liabilities", label: "Liabilities" },
    { key: "financialGoals", label: "Financial Goals" },
    { key: "planSummary", label: "Plan Summary" },
    { key: "recommendation", label: "Recommendation" },
  ]

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 h-[550px] overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Financial Overview</h2>
      <ul className="space-y-4">
        {items.map((item) => (
          <li
            key={item.key}
            className={`flex justify-between items-center py-3 px-4 rounded-lg border cursor-pointer transition-colors duration-200 ${
              selectedSection === item.key
                ? "bg-blue-100 border-blue-300"
                : "bg-gray-50 border-gray-100 hover:bg-gray-100"
            }`}
            onClick={() => onSelectSection(item.key, item.label)}
          >
            <span className="font-medium text-base">{item.label}</span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </li>
        ))}
      </ul>
    </div>
  )
}
