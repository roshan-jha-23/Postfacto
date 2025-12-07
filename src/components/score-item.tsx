

interface ScoreItemProps {
  label: string
  score: number
  maxScore: number
  color?: "green" | "amber"
}

export function ScoreItem({ label, score, maxScore, color = "green" }: ScoreItemProps) {
  const percentage = (score / maxScore) * 100
  const colorClass = color === "green" ? "bg-green-500" : "bg-amber-500"
  const textColorClass = color === "green" ? "text-green-600" : "text-amber-600"

  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="font-medium text-slate-700">{label}</span>
        <span className={`font-bold ${textColorClass}`}>
          {score}/{maxScore}
        </span>
      </div>
      <div className="w-full bg-slate-100 rounded-full h-2">
        <div className={`${colorClass} h-2 rounded-full transition-all`} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  )
}
