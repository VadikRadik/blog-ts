import { Pagination } from 'antd'
import React from 'react'

import PostCard from '../post-card'

import classes from './posts-list.module.scss'

const PostsList: React.FC = () => {
  return (
    <div className={classes['post-list']}>
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <Pagination className={classes['post-list__pagination']} defaultCurrent={1} total={50} />
    </div>
  )
}

export default PostsList
