import { configureStore } from '@reduxjs/toolkit'

import articleReducer from './articles-slice'

export const store = configureStore({
  reducer: {
    articles: articleReducer,
  },
})