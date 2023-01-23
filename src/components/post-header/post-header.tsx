import { HeartOutlined } from '@ant-design/icons'
import { Tag } from 'antd'
import classnames from 'classnames'
import { Link } from 'react-router-dom'

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
  return (
    <div className={classes['post-header']}>
      <div className={classes['post-header__title-layout']}>
        <div className={classes['post-header__title-line']}>
          {title}
          <div className={classes['post-header__like-icon']}>
            <HeartOutlined />
          </div>
          <div className={classes['post-header__likes-counter']}>12</div>
        </div>
        <div className={tagsListStyleClass}>
          <div className={classes['post-header__tag']}>
            <Tag>Tag</Tag>
          </div>
          <div className={classes['post-header__tag']}>
            <Tag>Tag</Tag>
          </div>
          <div className={classes['post-header__tag']}>
            <Tag>Tag</Tag>
          </div>
          <div className={classes['post-header__tag']}>
            <Tag>Tag</Tag>
          </div>
          <div className={classes['post-header__tag']}>
            <Tag>Tag</Tag>
          </div>
          <div className={classes['post-header__tag']}>
            <Tag>Tag</Tag>
          </div>
          <div className={classes['post-header__tag']}>
            <Tag>Tag</Tag>
          </div>
          <div className={classes['post-header__tag']}>
            <Tag>Tag</Tag>
          </div>
          <div className={classes['post-header__tag']}>
            <Tag>Tag</Tag>
          </div>
          <div className={classes['post-header__tag']}>
            <Tag>Tag</Tag>
          </div>
          <div className={classes['post-header__tag']}>
            <Tag>Tag</Tag>
          </div>
          <div className={classes['post-header__tag']}>
            <Tag>Tag</Tag>
          </div>
          <div className={classes['post-header__tag']}>
            <Tag>Tag</Tag>
          </div>
          <div className={classes['post-header__tag']}>
            <Tag>Tag</Tag>
          </div>
          <div className={classes['post-header__tag']}>
            <Tag>Tag</Tag>
          </div>
          <div className={classes['post-header__tag']}>
            <Tag>Tag</Tag>
          </div>
          <div className={classes['post-header__tag']}>
            <Tag>Tag</Tag>
          </div>
          <div className={classes['post-header__tag']}>
            <Tag>Tag</Tag>
          </div>
          <div className={classes['post-header__tag']}>
            <Tag>Tag</Tag>
          </div>
          <div className={classes['post-header__tag']}>
            <Tag>Tag</Tag>
          </div>
          <div className={classes['post-header__tag']}>
            <Tag>Tag</Tag>
          </div>
          <div className={classes['post-header__tag']}>
            <Tag>Tag</Tag>
          </div>
        </div>
      </div>
      <div className={classes['post-header__user-layout']}>
        <div className={classes['post-header__user-name-and-date']}>
          <div className={classes['post-header__user-name']}>John Doe</div>
          <div className={classes['post-header__date']}>March 5, 2020 </div>
        </div>
        <div className={classes['post-header__user-avatar']}></div>
      </div>
    </div>
  )
}

export default PostHeader
