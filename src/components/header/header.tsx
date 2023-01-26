import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import LoginTopBlock from '../login-top-block'
import { getUser, RootState } from '../../services/store/user-slice'
import { AppDispatch } from '../../services/store/store'
import UserTopBlock from '../user-top-block'

import classes from './header.module.scss'

const Header: React.FC = () => {
  const userState = useSelector((state: RootState) => state.users)
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    console.log('header useeffect')
    if (!userState.isLoggedIn && window.localStorage.getItem('auth_token')) {
      console.log('gettting user')
      dispatch(getUser())
    }
  }, [])

  const topBlock = userState.isLoggedIn ? <UserTopBlock /> : <LoginTopBlock />

  return (
    <div className={classes['header']}>
      <span className={classes['header__label']}>Realworld Blog</span>
      <div className={classes['header__login-top-block']}>{topBlock}</div>
    </div>
  )
}

export default Header
