import { configureStore } from "@reduxjs/toolkit"
import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux"

import customerInfoReducer from "../reducers/customerInfoReducer"
import transcriptionReducer from "../reducers/transcriptionReducer"
import cuesReducer from "../reducers/cuesReducer"
import flagReducer from "../reducers/flagReducer" 

export const store = configureStore({
  reducer: {
    customerInfo: customerInfoReducer,
    transcription: transcriptionReducer,
    cues: cuesReducer,
    flags: flagReducer, 
  },
})

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Export typed versions of useDispatch and useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
