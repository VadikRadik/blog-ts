import { Pagination } from 'antd'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import PostCard from '../post-card'
import { Article, ArticlesState, getArticles } from '../../services/store/articles-slice'

import classes from './posts-list.module.scss'

type RootState = {
  articles: ArticlesState
}

const PostsList: React.FC = () => {
  const articles = useSelector((state: RootState) => state.articles.articles)
  const dispatch = useDispatch()

  articles.forEach((a) => console.log(a.title))
  const posts = articles?.map((article: Article) => <PostCard key={article.title} title={article.title} />)
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
