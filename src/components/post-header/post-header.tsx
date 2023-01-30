import { HeartOutlined } from '@ant-design/icons'
import { Tag, Button, Popconfirm, message } from 'antd'
import classnames from 'classnames'
import { format } from 'date-fns'
import React from 'react'
// eslint-disable-next-line import/named
import { RouteComponentProps, withRouter, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch } from '../../services/store/store'
import { Article, deleteArticle, KnownError } from '../../services/store/articles-slice'
import Avatar from '../avatar/avatar'
import { RootState } from '../../services/store/user-slice'

import classes from './post-header.module.scss'

export interface PostHeaderProps extends RouteComponentProps {
  isCard: boolean
  article: Article
}

const PostHeader: React.FC<PostHeaderProps> = ({ isCard, article, history }) => {
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

  const [messageApi, contextHolder] = message.useMessage()

  const showToast = (type: 'success' | 'error', content: string) => {
    messageApi.open({
      type: type,
      content: content,
    })
  }

  const dispatch = useDispatch<AppDispatch>()
  const confirm = () => {
    dispatch(deleteArticle(article.slug))
      .then((res) => {
        console.log(res)
        if (res.type === 'articles/deleteArticle/fulfilled') {
          showToast('success', 'Article successfully deleted')
          history.push('/')
        } else {
          throw Error(`${(res.payload as unknown as KnownError).message}`)
        }
      })
      .catch((error) => {
        showToast('error', error.message)
      })
  }

  const userState = useSelector((state: RootState) => state.users)
  const editBlock =
    !isCard && userState.isLoggedIn && userState.username === article.author.username ? (
      <>
        {contextHolder}
        <div className={classes['post-header__edit-buttons']}>
          <Popconfirm
            title='Are you sure to delete this article?'
            description='Delete the article'
            onConfirm={confirm}
            placement='rightTop'
          >
            <Button className={classes['post-header__button-delete']} type='primary' danger ghost size='middle'>
              Delete
            </Button>
          </Popconfirm>
          <button
            className={classes['post-header__button-edit']}
            onClick={() => history.push(`/articles/${article.slug}/edit`)}
          >
            Edit
          </button>
        </div>
      </>
    ) : null

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
      <div className={classes['post-header__user-and-edit']}>
        <div className={classes['post-header__user-layout']}>
          <div className={classes['post-header__user-name-and-date']}>
            <div className={classes['post-header__user-name']}>{article.author.username}</div>
            <div className={classes['post-header__date']}>{format(new Date(article.createdAt), 'MMMM d, Y')}</div>
          </div>
          <div className={classes['post-header__user-avatar']}>
            <Avatar imageUrl={article.author.image} />
          </div>
        </div>
        {editBlock}
      </div>
    </div>
  )
}

export default withRouter(PostHeader)
