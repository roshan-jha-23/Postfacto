import type { ReactNode } from "react"

export interface Topic {
  name: string
  sentiment: "positive" | "negative"
  analysis: string
}

export interface AssessmentItem {
  id: number
  label: string
  score: number
  color: string
  icon: ReactNode
  topics: Topic[]
}

export interface TranscriptEntry {
  time: string
  speaker: string
  text: string
}
