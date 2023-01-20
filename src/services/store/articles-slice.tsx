import { createSlice } from '@reduxjs/toolkit'
//const ARTICLES_PER_PAGE = 5

export interface Article {
  title: string
}

export interface ArticlesState {
  page: number
  articles: Article[]
}

const initialState: ArticlesState = {
  page: 0,
  articles: [{ title: 'title3' }, { title: 'test2' }, { title: 'gggggg' }],
}

export const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    getArticles(state, action) {
      //console.log(state)
      console.log(action)
      state.page = action.payload
      state.articles = [{ title: 'title3' }, { title: 'test2' }, { title: 'gggggg' }]
    },
  },
})

export const { getArticles } = articlesSlice.actions

export default articlesSlice.reducer
