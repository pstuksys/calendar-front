import { configureStore } from '@reduxjs/toolkit'
import counterReducer from "../features/counterSlice";
import modalReducer from "../features/modalSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    modal:modalReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['modal/openModal'], // non-serializable data : since i pass jsx element in state its not happy.
        ignoredPaths: ['modal.content','modal.extraProps.Date'], 
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store