import { ChevronRight } from "lucide-react"
import { useData } from "../context/DataWrapper"

export function FinancialOverview({ onSelectSection, selectedSection }: any) {
  const { reco, setSelectedReco, selectedReco } = useData();

  const items = [
    { key: "basicInfo", label: "Basic Info" },
    { key: "healthProfile", label: "Health Profile" },
    { key: "recommendation", label: "Recommendation" },
    { key: "planSummary", label: "Plan Summary" },
  ]

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 h-[550px] overflow-y-auto">
      <h2 
      className="text-xl font-semibold mb-4 text-gray-700">Health Overview</h2>

      <ul className="space-y-4">

        {items.map((item) => (
          <div key={item.key}>
            {/* Parent Item */}
            <li
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

            {/* Only for Recommendation → Show sub-items */}
            {item.key === "recommendation" && selectedSection === "recommendation" && (
              <ul className="ml-6 mt-2 space-y-2">
                {reco.map((plan: string, idx: number) => (
                  <li
                    key={idx}
                    className={`py-2 px-3 rounded-md cursor-pointer border text-sm ${
                      selectedReco === plan
                        ? "bg-blue-200 border-blue-400"
                        : "bg-gray-100 border-gray-200 hover:bg-gray-200"
                    }`}
                    onClick={() => setSelectedReco(plan)}
                  >
                    {plan}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}

      </ul>
    </div>
  )
}
