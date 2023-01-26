import { Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
// eslint-disable-next-line import/named
import { RouteComponentProps, withRouter } from 'react-router-dom'

import Avatar from '../avatar'
import { logOut, RootState } from '../../services/store/user-slice'
import { AppDispatch } from '../../services/store/store'

import classes from './user-top-block.module.scss'

const UserTopBlock = (props: RouteComponentProps) => {
  const userState = useSelector((state: RootState) => state.users)
  const dispatch = useDispatch<AppDispatch>()

  return (
    <div className={classes['user-top-block']}>
      <button className={classes['user-top-block__create-article']}>Create article</button>
      <div className={classes['user-top-block__username']} onClick={() => props.history.push('/profile')}>
        {userState.username}
      </div>
      <div className={classes['user-top-block__avatar']} onClick={() => props.history.push('/profile')}>
        <Avatar imageUrl={userState.image} />
      </div>
      <Button size='large' className={classes['user-top-block__log-out']} onClick={() => dispatch(logOut())}>
        Log Out
      </Button>
    </div>
  )
}

export default withRouter(UserTopBlock)
