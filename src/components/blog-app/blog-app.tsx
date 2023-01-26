import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Result } from 'antd'

import Header from '../header'
import PostsList from '../posts-list'
import Post from '../post'
import SignUpForm from '../sign-up-form'
import SignInForm from '../sign-in-form'
import ProfileForm from '../profile-form'
import RegisterForm from '../test-form/test-form'

import classes from './blog-app.module.scss'

const BlogApp: React.FC = () => {
  return (
    <Router>
      <div className={classes['blog-app']}>
        <Header />
        <div className={classes['blog-app__content-wrapper']}>
          <Switch>
            <Route path='/' exact>
              <PostsList />
            </Route>
            <Route path='/articles/' exact>
              <PostsList />
            </Route>
            <Route path='/articles/:slug' render={({ match }) => <Post slug={match.params.slug} />} />
            <Route path='/sign-up' exact>
              <SignUpForm />
            </Route>
            <Route path='/sign-in' exact>
              <SignInForm />
            </Route>
            <Route path='/profile' exact>
              <ProfileForm />
            </Route>
            <Route path='/test-form'>
              <RegisterForm />
            </Route>
            <Route path='*' exact>
              <Result status='404' title='404' subTitle='Sorry, the page you visited does not exist.' />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  )
}

export default BlogApp
