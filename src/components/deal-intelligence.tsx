import { Briefcase, ShieldAlert, HelpCircle } from "lucide-react"
import { useData } from "../context/DataWrapper"

export function DealIntelligence() {
  const { dataIntelligence } = useData()
  console.log("dataIntelligence", dataIntelligence)

  if (!dataIntelligence) return null

  const {
    coreRequirements,
    blockers = [],
    tech_due_diligence = [],
  } = dataIntelligence

  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 h-full">
      <div className="flex items-center justify-between mb-5 pb-3 border-b border-gray-100">
        <h2 className="text-lg font-bold text-gray-800 flex items-center">
          <Briefcase className="w-5 h-5 mr-2 text-blue-600" /> Deal Intelligence
        </h2>
      </div>

      <div className="space-y-6">
        {/* Core Requirement */}
        <div>
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">
            Core Requirement
          </span>
          <p className="text-sm font-medium text-gray-900 leading-snug">
            <span className="font-bold text-blue-700">Real-Time Insights</span>{" "}
            {coreRequirements}
          </p>
        </div>

        {/* Risks & Blockers */}
        {blockers.length > 0 && (
          <div className="bg-red-50 p-3 rounded-lg border border-red-100">
            <h4 className="text-xs font-bold text-red-800 uppercase mb-2 flex items-center">
              <ShieldAlert className="w-3 h-3 mr-1" /> Risks & Blockers
            </h4>
            <ul className="space-y-2">
              {blockers.map((blocker: any, i: number) => (
                <li key={i} className="flex items-start text-xs text-red-900">
                  <span className="text-red-400 mr-2 mt-0.5">•</span>
                  <div>
                    <span className="font-semibold">{blocker.label}:</span>{" "}
                    {blocker.description}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Technical Due Diligence */}
        {tech_due_diligence.length > 0 && (
          <div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">
              Technical Due Diligence
            </span>
            <div className="space-y-1.5">
              {tech_due_diligence.map((query: string, i: number) => (
                <div
                  key={i}
                  className="flex items-start gap-2 text-xs text-gray-600 bg-gray-50 p-1.5 rounded border border-gray-100"
                >
                  <HelpCircle className="w-3 h-3 text-purple-500 mt-0.5" />
                  {query}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
