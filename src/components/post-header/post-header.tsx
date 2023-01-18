import { HeartOutlined } from '@ant-design/icons'
import { Tag } from 'antd'

import classes from './post-header.module.scss'

const PostHeader = () => {
  return (
    <div className={classes['post-header']}>
      <div className={classes['post-header__title-layout']}>
        <div className={classes['post-header__title-line']}>
          <div className={classes['post-header__title']}>Some article title</div>
          <div className={classes['post-header__like-icon']}>
            <HeartOutlined />
          </div>
          <div className={classes['post-header__likes-counter']}>12</div>
        </div>
        <div className={classes['post-header__tags']}>
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
