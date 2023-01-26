import { Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import Avatar from '../avatar'
import { logOut, RootState } from '../../services/store/user-slice'
import { AppDispatch } from '../../services/store/store'

import classes from './user-top-block.module.scss'

const UserTopBlock = () => {
  const userState = useSelector((state: RootState) => state.users)
  const dispatch = useDispatch<AppDispatch>()

  return (
    <div className={classes['user-top-block']}>
      <button className={classes['user-top-block__create-article']}>Create article</button>
      <div className={classes['user-top-block__username']}>{userState.username}</div>
      <div className={classes['user-top-block__avatar']}>
        <Avatar imageUrl='' />
      </div>
      <Button size='large' className={classes['user-top-block__log-out']} onClick={() => dispatch(logOut())}>
        Log Out
      </Button>
    </div>
  )
}

export default UserTopBlock
