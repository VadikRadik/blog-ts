import { API_BASE_URL, ARTICLES_PER_PAGE, FetchArticlesParams, FetchArticleParams, Article } from './articles-api-types'

export const fetchArticles = async (params: FetchArticlesParams) => {
  const offset = (params.page - 1) * ARTICLES_PER_PAGE
  const loggedInHeader = {
    'Content-Type': 'application/json;charset=utf-8',
    Authorization: `Bearer ${window.localStorage.getItem('auth_token')}`,
  }
  const header = { 'Content-Type': 'application/json;charset=utf-8' }

  return await fetch(`${API_BASE_URL}/articles?limit=${ARTICLES_PER_PAGE}&offset=${offset}`, {
    method: 'GET',
    headers: params.isLoggedIn ? { ...loggedInHeader } : { ...header },
  })
}

export const fetchArticleBySlug = async ({ slug, isLoggedIn }: FetchArticleParams) => {
  const loggedInHeader = {
    'Content-Type': 'application/json;charset=utf-8',
    Authorization: `Bearer ${window.localStorage.getItem('auth_token')}`,
  }
  const header = { 'Content-Type': 'application/json;charset=utf-8' }

  return await fetch(`${API_BASE_URL}/articles/${slug}`, {
    method: 'GET',
    headers: isLoggedIn ? { ...loggedInHeader } : { ...header },
  })
}

export const createArticle = async (article: Partial<Article>) => {
  return await fetch(`${API_BASE_URL}/articles`, {
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
}

export const editArticle = async (article: Partial<Article>) => {
  return await fetch(`${API_BASE_URL}/articles/${article.slug}`, {
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
}

export const deleteArticle = async (slug: string) => {
  return await fetch(`${API_BASE_URL}/articles/${slug}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${window.localStorage.getItem('auth_token')}`,
    },
  })
}

export const deleteLike = async (slug: string) => {
  return await fetch(`${API_BASE_URL}/articles/${slug}/favorite`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${window.localStorage.getItem('auth_token')}`,
    },
  })
}

export const like = async (slug: string) => {
  return await fetch(`${API_BASE_URL}/articles/${slug}/favorite`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${window.localStorage.getItem('auth_token')}`,
    },
  })
}

export * as articlesApi from './articles-api'
