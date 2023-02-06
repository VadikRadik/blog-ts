import { API_BASE_URL, ARTICLES_PER_PAGE, FetchArticlesParams, FetchArticleParams, Article } from './articles-api-types'
import { fetchApi } from './api'

export const fetchArticles = async (params: FetchArticlesParams) => {
  const offset = (params.page - 1) * ARTICLES_PER_PAGE
  return await fetchApi(`${API_BASE_URL}/articles?limit=${ARTICLES_PER_PAGE}&offset=${offset}`, 'GET')
}

export const fetchArticleBySlug = async ({ slug }: FetchArticleParams) => {
  return await fetchApi(`${API_BASE_URL}/articles/${slug}`, 'GET')
}

export const createArticle = async (article: Partial<Article>) => {
  return await fetchApi(
    `${API_BASE_URL}/articles`,
    'POST',
    JSON.stringify({
      article: {
        title: article.title,
        description: article.description,
        body: article.body,
        tagList: article.tagList,
      },
    }),
  )
}

export const editArticle = async (article: Partial<Article>) => {
  return await fetchApi(
    `${API_BASE_URL}/articles/${article.slug}`,
    'PUT',
    JSON.stringify({
      article: {
        title: article.title,
        description: article.description,
        body: article.body,
        tagList: article.tagList,
      },
    }),
  )
}

export const deleteArticle = async (slug: string) => {
  return await fetchApi(`${API_BASE_URL}/articles/${slug}`, 'DELETE')
}

export const deleteLike = async (slug: string) => {
  return await fetchApi(`${API_BASE_URL}/articles/${slug}/favorite`, 'DELETE')
}

export const like = async (slug: string) => {
  return await fetchApi(`${API_BASE_URL}/articles/${slug}/favorite`, 'POST')
}

export * as articlesApi from './articles-api'
