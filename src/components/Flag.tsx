"use client"

import { useState } from "react"
import { useAppSelector } from "../redux/store/store"

// interface Flag {
//   value: string
//   timestamp: number
//   name?: string
// }

// interface FlagCategory {
//   type: string
//   flags: Flag[]
// }

export default function FlagComponent() {
  const [selectedTab, setSelectedTab] = useState(0)
  // const [selected, setSelected] = useState<Record<string, { timestamp: number; name: string }>>({})
  const flagsFromRedux = useAppSelector((s) => s.flags.Flag)

  const flags:any= flagsFromRedux || []

  if (flags.length === 0) {
    return <div className="text-center text-muted-foreground">No flags available</div>
  }

  const currentCategory = flags[selectedTab]
  // const checkedCount = currentCategory.flags.filter((f:any) => selected[f.value]).length

  const formatTimestamp = (timestamp: number) => {
    if (timestamp === 0) return "0"
    return new Date(timestamp).toLocaleString()
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Card Container */}
      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 px-6 py-4">
          <h2 className="text-2xl font-bold text-white">{currentCategory.type} Flag</h2>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 px-6 pt-4 pb-0">
          <div className="flex gap-2">
            {flags.map((category:any, idx:any) => (
              <button
                key={idx}
                onClick={() => setSelectedTab(idx)}
                className={`pb-3 px-4 font-medium text-sm transition-colors ${
                  selectedTab === idx
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "border-b-2 border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                {category.type}
              </button>
            ))}
          </div>
        </div>

        {/* Content - Simple [timestamp]: value format */}
        <div className="px-6 py-6">
          {currentCategory.flags.length > 0 ? (
            <div className="space-y-3 font-mono text-sm">
              {currentCategory.flags.map((flag:any) => (
                <div key={flag.value} className="text-gray-800 break-all">
                  <span className="text-gray-500">[{formatTimestamp(flag.timestamp)}]</span>
                  <span className="mx-2">:</span>
                  <span className="font-semibold">{flag.value}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-500">No flags in this category</div>
          )}
        </div>
      </div>
    </div>
  )
}
