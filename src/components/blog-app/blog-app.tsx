import Header from '../header'
import PostsList from '../posts-list'
import Post from '../post'

import classes from './blog-app.module.scss'

const BlogApp: React.FC = () => {
  return (
    <div className={classes['blog-app']}>
      <Header />
      <div className={classes['blog-app__content-wrapper']}>
        <PostsList />
        <Post />
      </div>
    </div>
  )
}

export default BlogApp
