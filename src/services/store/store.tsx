import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import articleReducer from './articles-slice'
import usersRducer from './user-slice'

export const store = configureStore({
  reducer: {
    articles: articleReducer,
    users: usersRducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type DispatchType = ReturnType<typeof useDispatch<AppDispatch>>
