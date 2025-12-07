import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export type FeedbackItem = {
  id?: string
  name: string
  feedback: string
  timeStamp?: string
  pid: string
  type: string // "Basic Info" | "Health Profile" | etc.
  section: "transcript" | "cues"
}
// {
//   id: string
//   speaker: "Agent" | "Client"
//   name: string
//   time: string
//   content: string
//   isHighlighted?: boolean
//   isAICue?: boolean
//   aiPrompt?: []
// }

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

      // find or create group
      let group = state.transcription.find((g) => g.type === f.type)
      if (!group) {
        group = { type: f.type, transcripts: [] }
        state.transcription.push(group)
      }

      // normalize transcripts array on the group (handles 'transcript' vs 'transcripts')
      const gAny = group as any
      if (!Array.isArray(gAny.transcripts)) {
        if (Array.isArray(gAny.transcript)) {
          gAny.transcripts = gAny.transcript
        } else {
          gAny.transcripts = []
        }
      }

      // find the line by pid within normalized transcripts
      const transcriptsArr: any[] = gAny.transcripts
      const line = transcriptsArr.find((t) => t?.pid === f.pid)
      if (!line) {
        // no matching line; safely bail to avoid corrupting list visuals
        return
      }

      if (!Array.isArray(line.feedbacks)) line.feedbacks = []
      line.feedbacks.push({ ...f, id: f.id ?? `${Date.now()}` })
    },
    updateTranscriptionFeedback(
      state,
      action: PayloadAction<{ pid: string; type: string; patch: Partial<FeedbackItem> }>,
    ) {
      const { pid, type, patch } = action.payload
      const group = state.transcription.find((g) => g.type === type)
      if (!group) return
      const gAny = group as any
      const transcriptsArr: any[] = Array.isArray(gAny.transcripts)
        ? gAny.transcripts
        : Array.isArray(gAny.transcript)
          ? gAny.transcript
          : []
      const line = transcriptsArr.find((t) => t?.pid === pid)
      if (!line || !Array.isArray(line.feedbacks)) return
      const i = line.feedbacks.findIndex((fb: any) => fb.pid === pid)
      if (i >= 0) line.feedbacks[i] = { ...line.feedbacks[i], ...patch }
    },
    removeTranscriptionFeedback(state, action: PayloadAction<{ pid: string; type: string }>) {
      const { pid, type } = action.payload
      const group = state.transcription.find((g) => g.type === type)
      if (!group) return
      const gAny = group as any
      const transcriptsArr: any[] = Array.isArray(gAny.transcripts)
        ? gAny.transcripts
        : Array.isArray(gAny.transcript)
          ? gAny.transcript
          : []
      const line = transcriptsArr.find((t) => t?.pid === pid)
      if (!line || !Array.isArray(line.feedbacks)) return
      line.feedbacks = line.feedbacks.filter((fb: any) => fb.pid !== pid)
    },
    removeTranscriptionFeedbackById(state, action: PayloadAction<{ pid: string; type: string; id: string }>) {
      const { pid, type, id } = action.payload
      const group = state.transcription.find((g) => g.type === type)
      if (!group) return
      const gAny = group as any
      const transcriptsArr: any[] = Array.isArray(gAny.transcripts)
        ? gAny.transcripts
        : Array.isArray(gAny.transcript)
          ? gAny.transcript
          : []
      const line = transcriptsArr.find((t) => t?.pid === pid)
      if (!line || !Array.isArray(line.feedbacks)) return
      line.feedbacks = line.feedbacks.filter((fb: any) => fb.id !== id)
    },
    confirmTranscriptionFeedback(
      state,
      action: PayloadAction<{ pid: string; type: string; tempId: string; patch: Partial<FeedbackItem> }>,
    ) {
      const { pid, type, tempId, patch } = action.payload
      const group = state.transcription.find((g) => g.type === type)
      if (!group) return
      const gAny = group as any
      const transcriptsArr: any[] = Array.isArray(gAny.transcripts)
        ? gAny.transcripts
        : Array.isArray(gAny.transcript)
          ? gAny.transcript
          : []
      const line = transcriptsArr.find((t) => t?.pid === pid)
      if (!line || !Array.isArray(line.feedbacks)) return
      const i = line.feedbacks.findIndex((fb: any) => fb.id === tempId)
      if (i >= 0) {
        line.feedbacks[i] = { ...line.feedbacks[i], ...patch }
      }
    },
  },
})

export const {

  setTranscription,
  
  clearTranscription,
  
  addTranscriptionFeedback,
  
  updateTranscriptionFeedback,
  
  removeTranscriptionFeedback,
  
  removeTranscriptionFeedbackById,
  
  confirmTranscriptionFeedback,
} = transcriptionSlice.actions

export default transcriptionSlice.reducer
