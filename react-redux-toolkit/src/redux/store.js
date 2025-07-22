import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/CounteSlice.jsx'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
})