import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export type FlagItem = {
  value: string
  name: string
  timeStamp?: string
}

export type FlagGroup = {
  type: string
  flags: FlagItem[]
}

interface FlagState {
  Flag: FlagGroup[]
}

const initialState: FlagState = {
  Flag: [],
}

const flagSlice = createSlice({
  name: "flag",
  initialState,
  reducers: {
    setFlag(state, action: PayloadAction<FlagGroup[]>) {
      state.Flag = action.payload || []
    },

    addFlagGroup(state, action: PayloadAction<FlagGroup>) {
      state.Flag.push(action.payload)
    },

    addFlagToGroup(
      state,
      action: PayloadAction<{ type: string; flag: FlagItem }>
    ) {
      const group = state.Flag.find((g) => g.type === action.payload.type)
      if (group) {
        group.flags.push(action.payload.flag)
      }
    },

    removeFlagFromGroup(
      state,
      action: PayloadAction<{ type: string; value: string }>
    ) {
      const group = state.Flag.find((g) => g.type === action.payload.type)
      if (group) {
        group.flags = group.flags.filter(
          (f) => f.value !== action.payload.value
        )
      }
    },

    clearFlags(state) {
      state.Flag = []
    },
  },
})

export const {
  setFlag,
  addFlagGroup,
  addFlagToGroup,
  removeFlagFromGroup,
  clearFlags,
} = flagSlice.actions

export default flagSlice.reducer
