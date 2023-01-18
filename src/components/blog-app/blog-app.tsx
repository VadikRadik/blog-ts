import Header from '../header'
import PostsList from '../posts-list'

import classes from './blog-app.module.scss'

const BlogApp: React.FC = () => {
  return (
    <div className={classes['blog-app']}>
      <Header />
      <div className={classes['blog-app__posts-list']}>
        <PostsList />
      </div>
    </div>
  )
}

export default BlogApp
