import { useSelector } from 'react-redux'
import ReactMarkdown from 'react-markdown'

import PostHeader from '../post-header'
import { Article, RootState } from '../../services/store/articles-slice'

import classes from './post.module.scss'

const testArticle: Article = {
  slug: 'title-w2wr0e',
  title: 'title3',
  description: 'description3',
  body: 'sdfsdfsdfsdf3',
  createdAt: '2023-01-19T17:50:07.228Z',
  updatedAt: '2023-01-20T09:05:34.893Z',
  tagList: ['qqq3', 'www3', ''],
  favorited: false,
  favoritesCount: 0,
  author: {
    username: 'banditpro',
    bio: '',
    image: 'https://www.blast.hk/attachments/68493/',
    following: false,
  },
}

export interface PostProps {
  slug: string
}

const useArticle = (slug: string): Article | undefined => {
  const articles = useSelector((state: RootState) => state.articles.articles)
  return articles.find((a) => a.slug === slug)
}

const Post: React.FC<PostProps> = ({ slug }) => {
  const article = useArticle(slug)
  const articleBody = article ? article.body : ''
  return (
    <div className={classes['post']}>
      <PostHeader isCard={false} article={testArticle} />
      <div className={classes['post__description']}>{article?.description}</div>
      <div className={classes['post__text']}>
        <ReactMarkdown>{articleBody}</ReactMarkdown>
      </div>
    </div>
  )
}

export default Post
