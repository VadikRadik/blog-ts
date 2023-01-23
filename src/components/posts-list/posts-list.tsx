import { Pagination, Alert, Spin } from 'antd'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import PostCard from '../post-card'
import {
  Article,
  RootState,
  getArticles,
  fetchArticlesAsync,
  ARTICLES_PER_PAGE,
} from '../../services/store/articles-slice'
import { AppDispatch } from '../../services/store/store'

type DispatchType = ReturnType<typeof useDispatch<AppDispatch>>

const useAritcles = (dispatch: DispatchType) => {
  const articlesResponse = useSelector((state: RootState) => state.articles)
  useEffect(() => {
    dispatch(fetchArticlesAsync())
    //dispatch(getArticles(1))
  }, [])

  return articlesResponse
}

import classes from './posts-list.module.scss'

const PostsList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const articlesResponse = useAritcles(dispatch)

  const noPostCardsClass = classes['post-list__no-post-cards-element']

  const posts = articlesResponse.articles.map((article: Article) => <PostCard key={article.title} article={article} />)
  const alert = articlesResponse.error ? (
    <Alert className={noPostCardsClass} message={articlesResponse.error} type='error' showIcon />
  ) : null
  const spin = articlesResponse.loading ? <Spin className={noPostCardsClass} size='large' /> : null

  return (
    <div className={classes['post-list']}>
      {alert}
      {spin}
      {posts}
      <Pagination
        className={classes['post-list__pagination']}
        defaultCurrent={1}
        total={articlesResponse.articlesCount}
        defaultPageSize={ARTICLES_PER_PAGE}
        showSizeChanger={false}
        onChange={(page) => {
          dispatch(getArticles(page))
          dispatch(fetchArticlesAsync())
        }}
      />
    </div>
  )
}

export default PostsList
