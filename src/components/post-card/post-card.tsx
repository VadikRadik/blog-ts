import PostHeader from '../post-header'

import classes from './post-card.module.scss'

const PostCard = () => {
  return (
    <div className={`${classes['post-card']} ${classes['posts-list__card']}`}>
      <PostHeader />
      <div className={classes['post-card__description']}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat.
      </div>
    </div>
  )
}

export default PostCard
