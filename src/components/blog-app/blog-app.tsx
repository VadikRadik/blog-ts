import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Result, Spin } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Header from '../header'
import PostsList from '../posts-list'
import Post from '../post'
import SignUpForm from '../sign-up-form'
import SignInForm from '../sign-in-form'
import ProfileForm from '../profile-form'
import EditArticleForm from '../edit-article-form'
import { getUser, RootState } from '../../services/store/user-slice'
import { AppDispatch } from '../../services/store/store'
import PrivateRoute from '../private-route'
import {
  ROOT_PATH,
  ARTICLES_PATH,
  ARTICLE_SLUG_PATH,
  SIGN_UP_PATH,
  SIGN_IN_PATH,
  PROFILE_PATH,
  NEW_ARTICLE_PATH,
  EDIT_ARTICLE_PATH,
} from '../../services/routes/routes'

import classes from './blog-app.module.scss'

const useLogin = () => {
  const userState = useSelector((state: RootState) => state.users)
  const dispatch = useDispatch<AppDispatch>()
  const isTokenExist = Boolean(window.localStorage.getItem('auth_token'))
  const [isLoginDefined, setLoginDefined] = useState(userState.isLoggedIn === isTokenExist)

  useEffect(() => {
    if (!isLoginDefined) {
      dispatch(getUser()).finally(() => setLoginDefined(true))
    }
  }, [])

  return [isLoginDefined, userState.isLoggedIn]
}

const BlogApp: React.FC = () => {
  const [isLoginDefined, isLoggedIn] = useLogin()

  if (!isLoginDefined) {
    return <Spin></Spin>
  }

  return (
    <Router>
      <div className={classes['blog-app']}>
        <Header />
        <div className={classes['blog-app__content-wrapper']}>
          <Switch>
            <Route path={ROOT_PATH} exact>
              <PostsList />
            </Route>
            <Route path={ARTICLES_PATH} exact>
              <PostsList />
            </Route>
            <Route path={ARTICLE_SLUG_PATH} exact render={({ match }) => <Post slug={match.params.slug} />} />
            <Route path={SIGN_UP_PATH} exact>
              <SignUpForm />
            </Route>
            <Route path={SIGN_IN_PATH} exact>
              <SignInForm />
            </Route>
            <Route path={PROFILE_PATH} exact>
              <PrivateRoute isLoggedIn={isLoggedIn} privateElement={<ProfileForm />} />
            </Route>
            <Route path={NEW_ARTICLE_PATH}>
              <PrivateRoute isLoggedIn={isLoggedIn} privateElement={<EditArticleForm />} />
            </Route>
            <Route
              path={EDIT_ARTICLE_PATH}
              render={({ match }) => {
                return (
                  <PrivateRoute isLoggedIn={isLoggedIn} privateElement={<EditArticleForm slug={match.params.slug} />} />
                )
              }}
            />
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
