// eslint-disable-next-line import/named
import { createSlice, createAsyncThunk, Draft } from '@reduxjs/toolkit'

import { articlesApi } from '../api/articles-api'
import {
  FetchArticlesParams,
  FetchArticleParams,
  Article,
  ArticlesResponse,
  ArticleResponse,
  KnownError,
  ArticlesState,
} from '../api/articles-api-types'

export const fetchArticlesAsync = createAsyncThunk<ArticlesResponse, FetchArticlesParams, { rejectValue: KnownError }>(
  'articles/fetchArticlesAsync',
  async (params: FetchArticlesParams, { rejectWithValue }) => {
    const response = await articlesApi
      .fetchArticles(params)
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

export const fetchArticleBySlug = createAsyncThunk<ArticleResponse, FetchArticleParams, { rejectValue: KnownError }>(
  'articles/fetchArticleBySlug',
  async (params: FetchArticleParams, { rejectWithValue }) => {
    const response = await articlesApi
      .fetchArticleBySlug(params)
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
    const response = await articlesApi
      .createArticle(article)
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
    const response = await articlesApi
      .editArticle(article)
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
    const response = await articlesApi
      .deleteArticle(slug)
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

export const deleteLike = createAsyncThunk<ArticleResponse, string, { rejectValue: KnownError }>(
  'articles/deleteLike',
  async (slug: string, { rejectWithValue }) => {
    const response = await articlesApi
      .deleteLike(slug)
      .then((res) => {
        if (res.ok) {
          return res.json()
        } else {
          return rejectWithValue({ message: `Unable to delete like, responce status: ${res.status}` })
        }
      })
      .catch((error) => {
        return rejectWithValue({ message: `Unable to delete like, error: ${error.message}` })
      })
    return response
  },
)

export const like = createAsyncThunk<ArticleResponse, string, { rejectValue: KnownError }>(
  'articles/like',
  async (slug: string, { rejectWithValue }) => {
    const response = await articlesApi
      .like(slug)
      .then((res) => {
        if (res.ok) {
          return res.json()
        } else {
          return rejectWithValue({ message: `Unable to like, responce status: ${res.status}` })
        }
      })
      .catch((error) => {
        return rejectWithValue({ message: `Unable to like, error: ${error.message}` })
      })
    return response
  },
)

const updateLikes = (state: Draft<ArticlesState>, newArticle: Article) => {
  state.articles.forEach((a) => {
    if (a.slug === newArticle.slug) {
      a.favorited = newArticle?.favorited
      a.favoritesCount = newArticle?.favoritesCount
    }
  })
  if (state.currentArticle?.slug === newArticle.slug) {
    state.currentArticle.favorited = newArticle?.favorited
    state.currentArticle.favoritesCount = newArticle?.favoritesCount
  }
}

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
      })
      .addCase(createArticle.rejected, (state, action) => {
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
      })
      .addCase(editArticle.rejected, (state, action) => {
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
      })
      .addCase(deleteArticle.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload ? action.payload.message : null
      })
      // delete like
      .addCase(deleteLike.fulfilled, (state, action) => {
        if (action.payload.article !== null) {
          updateLikes(state, action.payload.article)
        }
      })
      // like
      .addCase(like.fulfilled, (state, action) => {
        if (action.payload.article !== null) {
          updateLikes(state, action.payload.article)
        }
      })
  },
})

export const { setPage } = articlesSlice.actions

export default articlesSlice.reducer
