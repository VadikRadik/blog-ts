import { useSelector, useDispatch } from 'react-redux'
import ReactMarkdown from 'react-markdown'
import { useEffect } from 'react'
import { Alert, Spin } from 'antd'

import PostHeader from '../post-header'
import { fetchArticleBySlug } from '../../services/store/articles-slice'
import { Article, RootState } from '../../services/api/articles-api-types'
import { AppDispatch } from '../../services/store/store'
import { RootState as UserRootState } from '../../services/store/user-slice'

import classes from './post.module.scss'

export interface PostProps {
  slug: string
}

const useArticle = (slug: string): Article | undefined | string => {
  const userLoggedIn = useSelector((state: UserRootState) => state.users.isLoggedIn)
  const fetchedArticleResult = useSelector((state: RootState) => state.articles)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchArticleBySlug({ slug, isLoggedIn: userLoggedIn }))
  }, [slug, userLoggedIn])

  if (fetchedArticleResult.error !== null) {
    return fetchedArticleResult.error
  }

  return fetchedArticleResult.currentArticle ?? undefined
}

const Post: React.FC<PostProps> = ({ slug }) => {
  const article = useArticle(slug)

  if (typeof article === 'string') {
    return <Alert message={article} type='error' showIcon />
  }

  return article ? (
    <div className={classes['post']}>
      <PostHeader isCard={false} article={article} />
      <div className={classes['post__description']}>{article?.description}</div>
      <div className={classes['post__text']}>
        <ReactMarkdown>{article.body}</ReactMarkdown>
      </div>
    </div>
  ) : (
    <Spin size='large' />
  )
}

export default Post
