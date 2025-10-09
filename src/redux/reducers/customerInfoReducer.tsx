import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface CustomerInfoEntry {
  type: string
  customer_info: any
}

interface CustomerInfoState {
  customer_info: CustomerInfoEntry[]
}

const initialState: CustomerInfoState = {
  customer_info: [],
}

const customerInfoSlice = createSlice({
  name: "customerInfo",
  initialState,
  reducers: {
    setCustomerInfo(state, action: PayloadAction<CustomerInfoEntry[]>) {
      state.customer_info = action.payload || []
    },
    clearCustomerInfo(state) {
      state.customer_info = []
    },
    upsertCustomerInfoByType(state, action: PayloadAction<CustomerInfoEntry>) {
      const idx = state.customer_info.findIndex((x) => x.type === action.payload.type)
      if (idx >= 0) state.customer_info[idx] = action.payload
      else state.customer_info.push(action.payload)
    },
  },
})

export const { setCustomerInfo, clearCustomerInfo, upsertCustomerInfoByType } = customerInfoSlice.actions
export default customerInfoSlice.reducer
