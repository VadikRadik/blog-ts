import { HeartOutlined } from '@ant-design/icons'
import { Tag } from 'antd'
import classnames from 'classnames'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import React from 'react'

import { Article } from '../../services/store/articles-slice'
import Avatar from '../avatar/avatar'

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
  const titleClass = classnames([classes['post-header__title']], { [classes['post-header__title--card']]: isCard })
  const titleText = <div className={titleClass}>{article.title}</div>
  const title = isCard ? (
    <Link to={`articles/${article.slug}`} className={classes['post-header__title-link']}>
      {titleText}
    </Link>
  ) : (
    titleText
  )
  const tagsList = article.tagList
    .filter((tag) => tag?.replaceAll(' ', '').length > 0)
    .map((tag, index) => {
      return (
        <div key={`${tag}-${index}`} className={classes['post-header__tag']}>
          <Tag>{tag}</Tag>
        </div>
      )
    })

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
        <div className={classes['post-header__user-avatar']}>
          <Avatar imageUrl={article.author.image} />
        </div>
      </div>
    </div>
  )
}

export default PostHeader
