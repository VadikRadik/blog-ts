import { Pagination, Alert, Spin } from 'antd'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import PostCard from '../post-card'
import { Article, RootState, setPage, fetchArticlesAsync, ARTICLES_PER_PAGE } from '../../services/store/articles-slice'
import { AppDispatch, DispatchType } from '../../services/store/store'

const useAritcles = (dispatch: DispatchType) => {
  const articlesResponse = useSelector((state: RootState) => state.articles)
  const page = articlesResponse.page
  useEffect(() => {
    dispatch(fetchArticlesAsync(page))
  }, [page])

  return articlesResponse
}

import classes from './posts-list.module.scss'

const PostsList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const articlesResponse = useAritcles(dispatch)

  const noPostCardsClass = classes['post-list__no-post-cards-element']

  const posts = articlesResponse.articles.map((article: Article) => <PostCard key={article.slug} article={article} />)
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
        current={articlesResponse.page}
        onChange={(page) => {
          dispatch(setPage(page))
        }}
      />
    </div>
  )
}

export default PostsList
