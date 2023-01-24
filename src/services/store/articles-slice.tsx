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
  singleArticle: Article | null
}

export type RootState = {
  articles: ArticlesState
}

export interface ArticlesResponse {
  articlesCount: number
  articles: Article[]
  error: string | null
}

export interface ArticleBySlugResponse {
  article: Article | null
  error: string | null
}

export interface KnownError {
  message: string | null
}

export const fetchArticlesAsync = createAsyncThunk<ArticlesResponse, number, { rejectValue: KnownError }>(
  'articles/fetchArticlesAsync',
  async (page: number, { rejectWithValue }) => {
    const offset = (page - 1) * ARTICLES_PER_PAGE
    const response = await fetch(`https://blog.kata.academy/api/articles?limit=${ARTICLES_PER_PAGE}&offset=${offset}`)
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

export const fetchArticleBySlug = createAsyncThunk<ArticleBySlugResponse, string, { rejectValue: KnownError }>(
  'articles/fetchArticleBySlug',
  async (slug: string, { rejectWithValue }) => {
    const response = await fetch(`https://blog.kata.academy/api/articles/${slug}`)
      .then((res) => {
        if (res.ok) {
          return res.json()
        } else {
          return rejectWithValue({ message: `Unable to fetch article, responce status: ${res.status}` })
        }
      })
      .catch((error) => {
        return rejectWithValue({ message: `Unable to fetch article, error: ${error.message}` })
      })
    return response
  },
)

const initialState: ArticlesState = {
  page: 1,
  articlesCount: 5,
  loading: false,
  error: null,
  articles: [],
  singleArticle: null,
}

export const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setPage(state, action) {
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
      .addCase(fetchArticleBySlug.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchArticleBySlug.fulfilled, (state, action) => {
        state.loading = false
        state.singleArticle = action.payload.article
        state.error = null
      })
      .addCase(fetchArticleBySlug.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload ? action.payload.message : null
      })
  },
})

export const { setPage } = articlesSlice.actions

export default articlesSlice.reducer
