import { Pagination } from 'antd'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import PostCard from '../post-card'
import { Article, RootState, getArticles } from '../../services/store/articles-slice'

import classes from './posts-list.module.scss'

const PostsList: React.FC = () => {
  const articles = useSelector((state: RootState) => state.articles.articles)
  const dispatch = useDispatch()

  const posts = articles?.map((article: Article) => <PostCard key={article.title} article={article} />)
  return (
    <div className={classes['post-list']}>
      {posts}
      <Pagination
        className={classes['post-list__pagination']}
        defaultCurrent={1}
        total={50}
        onChange={(page) => dispatch(getArticles(page))}
      />
    </div>
  )
}

export default PostsList
