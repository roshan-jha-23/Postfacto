
import type { ReactNode } from "react"

interface DetailSectionProps {
  title: string
  subtitle: string
  score: number
  maxScore?: number
  icon: ReactNode
  iconBgColor: string
  children: ReactNode
}

export function DetailSection({
  title,
  subtitle,
  score,
  maxScore = 10,
  icon,
  iconBgColor,
  children,
}: DetailSectionProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
        <div className="flex items-center gap-3">
          <div className={`p-2 ${iconBgColor} rounded-lg`}>{icon}</div>
          <div>
            <h3 className="font-bold text-slate-800">{title}</h3>
            <p className="text-xs text-slate-500">{subtitle}</p>
          </div>
        </div>
        <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-bold rounded-full">
          {score}/{maxScore}
        </span>
      </div>
      <div className="p-4">{children}</div>
    </div>
  )
}
