import { HeartOutlined } from '@ant-design/icons'
import { Tag } from 'antd'
import classnames from 'classnames'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'

import { Article } from '../../services/store/articles-slice'

import classes from './post-header.module.scss'

export interface PostHeaderProps {
  isCard: boolean
  article: Article
}

const PostHeader: React.FC<PostHeaderProps> = ({ isCard, article }) => {
  const tagsListStyleClass = classnames(
    [classes['post-header__tags']],
    { [classes['post-header__tags--card']]: isCard },
    { [classes['post-header__tags--post']]: !isCard },
  )
  const titleText = <span className={classes['post-header__title']}>{article.title}</span>
  const title = isCard ? (
    <Link to={`articles/${article.slug}`} className={classes['post-header__title-link']}>
      {titleText}
    </Link>
  ) : (
    titleText
  )
  const tagsList = article.tagList
    .filter((tag) => tag.replaceAll(' ', '').length > 0)
    .map((tag) => {
      return (
        <div key={tag} className={classes['post-header__tag']}>
          <Tag>{tag}</Tag>
        </div>
      )
    })

  const userAvatar = article.author.image.length ? (
    <img className={classes['post-header__user-avatar']} src={article.author.image} alt={'user avatar'} />
  ) : (
    <div className={classes['post-header__user-avatar-placeholder']}></div>
  )

  return (
    <div className={classes['post-header']}>
      <div className={classes['post-header__title-layout']}>
        <div className={classes['post-header__title-line']}>
          {title}
          <div className={classes['post-header__like-icon']}>
            <HeartOutlined />
          </div>
          <div className={classes['post-header__likes-counter']}>{article.favoritesCount}</div>
        </div>
        <div className={tagsListStyleClass}>{tagsList}</div>
      </div>
      <div className={classes['post-header__user-layout']}>
        <div className={classes['post-header__user-name-and-date']}>
          <div className={classes['post-header__user-name']}>{article.author.username}</div>
          <div className={classes['post-header__date']}>{format(new Date(article.createdAt), 'MMMM d, Y')}</div>
        </div>
        {userAvatar}
      </div>
    </div>
  )
}

export default PostHeader
