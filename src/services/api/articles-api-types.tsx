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

export interface FetchArticlesParams {
  page: number
  isLoggedIn: boolean
}

export interface FetchArticleParams {
  slug: string
  isLoggedIn?: boolean
}

export const API_BASE_URL = 'https://blog.kata.academy/api'
