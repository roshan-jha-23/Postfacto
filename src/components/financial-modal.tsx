import { getFinancialContent } from "../lib/financial-data"
import { useData } from "../context/DataWrapper"

interface FinancialContentDisplayProps {
  selectedSection: string
  selectedLabel: string
}

export function FinancialContentDisplay({ selectedSection, selectedLabel }: FinancialContentDisplayProps) {
  const { financials }:any = useData()

  const content = getFinancialContent(selectedSection, financials)

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 h-[550px] overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">{selectedLabel}</h2>
      <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  )
}