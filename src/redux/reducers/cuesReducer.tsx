import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export type CueFeedback = {
  id?: string
  name: string
  feedback: string
  timeStamp?: string
  pid: string
  type: string // "Basic Info" | "Health Profile" | "Recommendations" | etc.
  section: "transcript" | "cues"
}

export type CueData =
  | {
      id: string
      data: any[]
      type?: string
      color?: string
      header?: string
      card_type?: string
    }
  | any[]

export type CueItem = {
  pid: string
  data: CueData
  timeStamp?: string
  feedbacks: CueFeedback[]
  header?: string // optional convenience
  id?: string
}

export type CueGroup = {
  type: string
  cues: CueItem[]
}

interface CuesState {
  cues: CueGroup[]
}

const initialState: CuesState = {
  cues: [],
}

const cuesSlice = createSlice({
  name: "cues",
  initialState,
  reducers: {
    setCues(state, action: PayloadAction<CueGroup[]>) {
      state.cues = action.payload || []
    },
    clearCues(state) {
      state.cues = []
    },
    addCuesFeedback(state, action: PayloadAction<CueFeedback>) {
      const f = action.payload
      if (f.section !== "cues") return

      return {
        ...state,
        cues: state.cues.map((group) => {
          if (group.type !== f.type) return group
          return {
            ...group,
            cues: group.cues.map((cue) => {
              if (cue.pid !== f.pid) return cue
              return {
                ...cue,
                feedbacks: [...cue.feedbacks, { ...f, id: f.id ?? `${Date.now()}` }],
              }
            }),
          }
        }),
      }
    },
    updateCuesFeedback(state, action: PayloadAction<{ pid: string; type: string; patch: Partial<CueFeedback> }>) {
      console.log("updateCuesFeedback action.payload", state, action.payload)
      const { pid, type, patch } = action.payload
      const group = state.cues.find((g) => g.type === type)
      if (!group) return
      const cue = group.cues.find((c) => c.pid === pid)
      if (!cue) return
      const i = cue.feedbacks.findIndex((fb) => fb.pid === pid)
      if (i >= 0) cue.feedbacks[i] = { ...cue.feedbacks[i], ...patch }
      console.log("updated cue.feedbacks", state)
    },
    removeCuesFeedback(state, action: PayloadAction<{ pid: string; type: string }>) {
      const { pid, type } = action.payload
      const group = state.cues.find((g) => g.type === type)
      if (!group) return
      const cue = group.cues.find((c) => c.pid === pid)
      if (!cue) return
      cue.feedbacks = cue.feedbacks.filter((fb) => fb.pid !== pid)
    },
  },
})

export const { setCues, clearCues, addCuesFeedback, updateCuesFeedback, removeCuesFeedback } = cuesSlice.actions
export default cuesSlice.reducer
