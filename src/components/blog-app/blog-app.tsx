import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { Result, Spin } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Header from '../header'
import PostsList from '../posts-list'
import Post from '../post'
import SignUpForm from '../sign-up-form'
import SignInForm from '../sign-in-form'
import ProfileForm from '../profile-form'
import RegisterForm from '../test-form/test-form'
import { getUser, RootState } from '../../services/store/user-slice'
import { AppDispatch } from '../../services/store/store'

import classes from './blog-app.module.scss'

const useLogin = () => {
  const userState = useSelector((state: RootState) => state.users)
  const dispatch = useDispatch<AppDispatch>()
  const isTokenExist = Boolean(window.localStorage.getItem('auth_token'))
  const [isLoginDefined, setLoginDefined] = useState(userState.isLoggedIn === isTokenExist)
  //useEffect(() => {
  //if (!userState.isLoggedIn && isTokenExist) {

  useEffect(() => {
    if (!isLoginDefined) {
      dispatch(getUser()).finally(() => setLoginDefined(true))
    }
  }, [])

  //}, [userState.isLoggedIn])
  console.log(isLoginDefined)
  console.log(userState.isLoggedIn)
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
              {!isLoggedIn ? <Redirect to='/sign-in' /> : <ProfileForm />}
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
