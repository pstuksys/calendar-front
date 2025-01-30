import { configureStore } from '@reduxjs/toolkit'
import counterReducer from "../features/counterSlice";
import modalReducer from "../features/modalSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    modal:modalReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store