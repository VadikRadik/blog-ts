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
  currentArticle: Article | null
}

export type RootState = {
  articles: ArticlesState
}

export interface ArticlesResponse {
  articlesCount: number
  articles: Article[]
  error: string | null
}

export interface ArticleResponse {
  article: Article | null
  error: string | null
}

export interface KnownError {
  message: string | null
}

const API_BASE_URL = 'https://blog.kata.academy/api'

export const fetchArticlesAsync = createAsyncThunk<ArticlesResponse, number, { rejectValue: KnownError }>(
  'articles/fetchArticlesAsync',
  async (page: number, { rejectWithValue }) => {
    const offset = (page - 1) * ARTICLES_PER_PAGE
    const response = await fetch(`${API_BASE_URL}/articles?limit=${ARTICLES_PER_PAGE}&offset=${offset}`)
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

export const fetchArticleBySlug = createAsyncThunk<ArticleResponse, string, { rejectValue: KnownError }>(
  'articles/fetchArticleBySlug',
  async (slug: string, { rejectWithValue }) => {
    const response = await fetch(`${API_BASE_URL}/articles/${slug}`)
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

export const createArticle = createAsyncThunk<ArticleResponse, Partial<Article>, { rejectValue: KnownError }>(
  'articles/createArticle',
  async (article: Partial<Article>, { rejectWithValue }) => {
    const response = await fetch(`${API_BASE_URL}/articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${window.localStorage.getItem('auth_token')}`,
      },
      body: JSON.stringify({
        article: {
          title: article.title,
          description: article.description,
          body: article.body,
          tagList: article.tagList,
        },
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        } else {
          return rejectWithValue({ message: `Unable to post article, responce status: ${res.status}` })
        }
      })
      .catch((error) => {
        return rejectWithValue({ message: `Unable to post article, error: ${error.message}` })
      })
    return response
  },
)

export const editArticle = createAsyncThunk<ArticleResponse, Partial<Article>, { rejectValue: KnownError }>(
  'articles/editArticle',
  async (article: Partial<Article>, { rejectWithValue }) => {
    const response = await fetch(`${API_BASE_URL}/articles/${article.slug}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${window.localStorage.getItem('auth_token')}`,
      },
      body: JSON.stringify({
        article: {
          title: article.title,
          description: article.description,
          body: article.body,
          tagList: article.tagList,
        },
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        } else {
          return rejectWithValue({ message: `Unable to edit article, responce status: ${res.status}` })
        }
      })
      .catch((error) => {
        return rejectWithValue({ message: `Unable to edit article, error: ${error.message}` })
      })
    return response
  },
)

export const deleteArticle = createAsyncThunk<ArticleResponse, string, { rejectValue: KnownError }>(
  'articles/deleteArticle',
  async (slug: string, { rejectWithValue }) => {
    const response = await fetch(`${API_BASE_URL}/articles/${slug}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${window.localStorage.getItem('auth_token')}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          const res: ArticleResponse = { article: null, error: null }
          return res
        } else {
          return rejectWithValue({ message: `Unable to delete article, responce status: ${res.status}` })
        }
      })
      .catch((error) => {
        return rejectWithValue({ message: `Unable to delete article, error: ${error.message}` })
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
  currentArticle: null,
}

export const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setPage(state, action) {
      state.page = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      // get articles list
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
      // get article
      .addCase(fetchArticleBySlug.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchArticleBySlug.fulfilled, (state, action) => {
        state.loading = false
        state.currentArticle = action.payload.article
        state.error = null
        console.log(action.payload.article)
      })
      .addCase(fetchArticleBySlug.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload ? action.payload.message : null
      })
      // post new article
      .addCase(createArticle.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createArticle.fulfilled, (state, action) => {
        state.loading = false
        state.currentArticle = action.payload.article
        state.error = null
        console.log(action.payload.article)
      })
      .addCase(createArticle.rejected, (state, action) => {
        console.log(action.payload)
        state.loading = false
        state.error = action.payload ? action.payload.message : null
      })
      // edit article
      .addCase(editArticle.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(editArticle.fulfilled, (state, action) => {
        state.loading = false
        state.currentArticle = action.payload.article
        state.error = null
        console.log(action.payload.article)
      })
      .addCase(editArticle.rejected, (state, action) => {
        console.log(action.payload)
        state.loading = false
        state.error = action.payload ? action.payload.message : null
      })
      // delete article
      .addCase(deleteArticle.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteArticle.fulfilled, (state) => {
        state.loading = false
        state.currentArticle = null
        state.error = null
        console.log('article deleted')
      })
      .addCase(deleteArticle.rejected, (state, action) => {
        console.log(action.payload)
        state.loading = false
        state.error = action.payload ? action.payload.message : null
      })
  },
})

export const { setPage } = articlesSlice.actions

export default articlesSlice.reducer
