import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const ARTICLES_PER_PAGE = 20

export interface Author {
  username: string
  bio?: string
  image: string
  following: boolean
}

export interface Article {
  slug: string
  title: string
  description: string
  body: string
  createdAt: string
  updatedAt: string
  tagList: string[]
  favorited: boolean
  favoritesCount: number
  author: Author
}

export interface ArticlesState {
  page: number
  articlesCount: number
  loading: boolean
  error: string | null
  articles: Article[]
}

export type RootState = {
  articles: ArticlesState
}

export interface ArticlesResponse {
  articlesCount: number
  articles: Article[]
  error: string | null
}

export interface KnownError {
  message: string | null
}

export const fetchArticlesAsync = createAsyncThunk<ArticlesResponse, void, { rejectValue: KnownError }>(
  'articles/fetchArticlesAsync',
  async (_, { rejectWithValue }) => {
    const response = await fetch('https://blog.kata.academy/api/articles')
      .then((res) => {
        if (res.ok) {
          return res.json()
        } else {
          return rejectWithValue({ message: `Unable to fetch articles, responce status: ${res.status}` })
        }
      })
      .catch((error) => {
        return rejectWithValue({ message: `Unable to fetch articles, error: ${error.message}` })
      })
    return response
  },
)

const initialState: ArticlesState = {
  page: 0,
  articlesCount: 5,
  loading: false,
  error: null,
  articles: [],
}

export const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    getArticles(state, action) {
      console.log(action)
      state.page = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticlesAsync.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchArticlesAsync.fulfilled, (state, action) => {
        state.loading = false
        state.articles = action.payload.articles
        state.articlesCount = action.payload.articlesCount
        state.error = null
      })
      .addCase(fetchArticlesAsync.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload ? action.payload.message : null
      })
  },
})

export const { getArticles } = articlesSlice.actions

export default articlesSlice.reducer
