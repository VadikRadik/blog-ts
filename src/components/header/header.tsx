import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// eslint-disable-next-line import/named
import { RouteComponentProps, withRouter } from 'react-router-dom'

import LoginTopBlock from '../login-top-block'
import { getUser, RootState } from '../../services/store/user-slice'
import { AppDispatch } from '../../services/store/store'
import UserTopBlock from '../user-top-block'

import classes from './header.module.scss'

const Header: React.FC<RouteComponentProps> = ({ history }) => {
  const userState = useSelector((state: RootState) => state.users)
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    if (!userState.isLoggedIn && window.localStorage.getItem('auth_token')) {
      dispatch(getUser())
    }
  }, [])

  const topBlock = userState.isLoggedIn ? <UserTopBlock /> : <LoginTopBlock />

  return (
    <div className={classes['header']}>
      <span className={classes['header__label']} onClick={() => history.push('/')}>
        Realworld Blog
      </span>
      <div className={classes['header__login-top-block']}>{topBlock}</div>
    </div>
  )
}

export default withRouter(Header)
