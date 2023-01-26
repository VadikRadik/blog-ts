import { Button } from 'antd'
// eslint-disable-next-line import/named
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getUser, RootState } from '../../services/store/user-slice'
import { AppDispatch } from '../../services/store/store'

import classes from './login-top-block.module.scss'

const LoginTopBlock = (props: RouteComponentProps) => {
  const userState = useSelector((state: RootState) => state.users)
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    console.log('header useeffect')
    if (!userState.isLoggedIn && window.localStorage.getItem('auth_token')) {
      console.log('gettting user')
      dispatch(getUser())
    }
  }, [])

  return (
    <div className={classes['login-top-block']}>
      <Button
        type='text'
        className={classes['login-top-block__sign-in']}
        onClick={() => props.history.push('/sign-in')}
      >
        Sign In
      </Button>
      <button className={classes['login-top-block__sign-up']} onClick={() => props.history.push('/sign-up')}>
        Sign Up
      </button>
    </div>
  )
}

export default withRouter(LoginTopBlock)
