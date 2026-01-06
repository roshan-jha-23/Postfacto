import { CheckCircle2, CheckSquare, Square, AlertTriangle } from "lucide-react"
import { useData } from "../context/DataWrapper"

export function ActionPlan() {
  const { actionItems: data } = useData()
  console.log("actionItems", data)

  if (!data) return null

  const {
    tasks = [],
    collateralGaps = [],
    completedCount = 0,
    totalCount = 0,
  } = data

  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-5 pb-3 border-b border-gray-100">
        <h2 className="text-lg font-bold text-gray-800 flex items-center">
          <CheckCircle2 className="w-5 h-5 mr-2 text-green-600" /> Action Plan
        </h2>
        <div className="flex items-center text-xs text-gray-500">
          <span className="font-bold text-gray-900 mr-1">
            {completedCount}/{totalCount}
          </span>
          Completed
        </div>
      </div>

      {/* Tasks */}
      <div className="flex-1 flex flex-col gap-3">
        {tasks.map((item: any) => {
          const Icon = item.completed ? CheckSquare : Square

          const containerClass = item.completed
            ? "flex items-start gap-3 p-3 rounded-lg border border-gray-200 bg-gray-50 opacity-60"
            : item.blocked
            ? "flex items-start gap-3 p-3 rounded-lg border border-orange-200 bg-orange-50"
            : "flex items-start gap-3 p-3 rounded-lg border border-gray-200 hover:border-blue-200 transition-colors group"

          return (
            <div key={item.id} className={containerClass}>
              <Icon
                className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                  item.completed
                    ? "text-gray-400"
                    : item.blocked
                    ? "text-orange-500"
                    : "text-gray-300 group-hover:text-blue-400"
                }`}
              />

              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <p
                    className={`text-sm ${
                      item.completed
                        ? "text-gray-500 line-through font-medium"
                        : "text-gray-900 font-bold"
                    }`}
                  >
                    {item.title}
                  </p>

                  {item.blocked && (
                    <span className="text-[10px] bg-orange-200 text-orange-800 px-1.5 rounded font-bold uppercase">
                      Blocked
                    </span>
                  )}
                </div>

                <p className="text-xs text-gray-500">
                  Owner: <span className="font-medium">{item.owner}</span>
                </p>
              </div>
            </div>
          )
        })}

        {/* Collateral Gaps */}
        {collateralGaps.length > 0 && (
          <div className="mt-auto pt-4 border-t border-gray-100">
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
              <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                Collateral Gaps Detected
              </h3>

              <div className="space-y-2">
                {collateralGaps.map((gap: any, i: number) => (
                  <div
                    key={i}
                    className={`flex items-start gap-2 ${
                      i > 0 && "pt-2 border-t border-gray-200"
                    }`}
                  >
                    <AlertTriangle className="w-3.5 h-3.5 text-orange-500 mt-0.5" />
                    <div className="text-xs text-gray-600">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-bold text-gray-800">
                          {gap.title}
                        </span>
                        <span className="text-[10px] bg-orange-100 text-orange-700 px-1.5 rounded font-bold">
                          {gap.impact}
                        </span>
                      </div>
                      {gap.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
