import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export type FeedbackItem = {
  id?: string
  name: string
  feedback: string
  timeStamp?: string
  pid: string
  type: string // "Basic Info" | "Health Profile" | "Recommendations" | etc.
  section: "transcript" | "cues"
}

export type TranscriptItem = {
  id?: string
  pid: string
  text: string
  timeStamp?: string
  feedbacks: FeedbackItem[]
}

export type TranscriptGroup = {
  type: string
  transcripts: TranscriptItem[]
}

interface TranscriptionState {
  transcription: TranscriptGroup[]
}

const initialState: TranscriptionState = {
  transcription: [],
}

const transcriptionSlice = createSlice({
  name: "transcription",
  initialState,
  reducers: {
    setTranscription(state, action: PayloadAction<TranscriptGroup[]>) {
      state.transcription = action.payload || []
    },
    clearTranscription(state) {
      state.transcription = []
    },
    addTranscriptionFeedback(state, action: PayloadAction<FeedbackItem>) {
      const f = action.payload
      if (f.section !== "transcript") return
      const group = state.transcription.find((g) => g.type === f.type)
      if (!group) return
      const line = group.transcripts.find((t) => t.pid === f.pid)
      if (!line) return
      line.feedbacks.push({ ...f, id: f.id ?? `${Date.now()}` })
    },
    updateTranscriptionFeedback(
      state,
      action: PayloadAction<{ pid: string; type: string; patch: Partial<FeedbackItem> }>,
    ) {
      const { pid, type, patch } = action.payload
      const group = state.transcription.find((g) => g.type === type)
      if (!group) return
      const line = group.transcripts.find((t) => t.pid === pid)
      if (!line) return
      const i = line.feedbacks.findIndex((fb) => fb.pid === pid)
      if (i >= 0) line.feedbacks[i] = { ...line.feedbacks[i], ...patch }
    },
    removeTranscriptionFeedback(state, action: PayloadAction<{ pid: string; type: string }>) {
      const { pid, type } = action.payload
      const group = state.transcription.find((g) => g.type === type)
      if (!group) return
      const line = group.transcripts.find((t) => t.pid === pid)
      if (!line) return
      line.feedbacks = line.feedbacks.filter((fb) => fb.pid !== pid)
    },
  },
})

export const {
  setTranscription,
  clearTranscription,
  addTranscriptionFeedback,
  updateTranscriptionFeedback,
  removeTranscriptionFeedback,
} = transcriptionSlice.actions

export default transcriptionSlice.reducer
