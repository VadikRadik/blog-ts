import { BrowserRouter as Router, Route } from 'react-router-dom'

import Header from '../header'
import PostsList from '../posts-list'
import Post from '../post'
import SignUpForm from '../sign-up-form'

import classes from './blog-app.module.scss'

const BlogApp: React.FC = () => {
  return (
    <Router>
      <div className={classes['blog-app']}>
        <Header />
        <div className={classes['blog-app__content-wrapper']}>
          <Route path='/' exact>
            <PostsList />
          </Route>
          <Route path='/articles/' exact>
            <PostsList />
          </Route>
          <Route path='/articles/:slug' render={({ match }) => <Post slug={match.params.slug} />} />
          <Route path='/sign-up'>
            <SignUpForm />
          </Route>
        </div>
      </div>
    </Router>
  )
}

export default BlogApp
