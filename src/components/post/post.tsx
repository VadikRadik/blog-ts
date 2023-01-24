import { useSelector, useDispatch } from 'react-redux'
import ReactMarkdown from 'react-markdown'
import { useEffect } from 'react'
import { Alert, Spin } from 'antd'

import PostHeader from '../post-header'
import { Article, RootState, fetchArticleBySlug } from '../../services/store/articles-slice'
import { AppDispatch } from '../../services/store/store'

import classes from './post.module.scss'

export interface PostProps {
  slug: string
}

const useArticle = (slug: string): Article | undefined | string => {
  const articles = useSelector((state: RootState) => state.articles.articles)
  let foundArticle = articles.find((a) => a.slug === slug)
  if (!foundArticle) {
    const fetchedArticleResult = useSelector((state: RootState) => state.articles)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
      dispatch(fetchArticleBySlug(slug))
    }, [slug])

    if (fetchedArticleResult.error !== null) {
      return fetchedArticleResult.error
    }

    foundArticle = fetchedArticleResult.singleArticle ?? undefined
  }
  return foundArticle
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
