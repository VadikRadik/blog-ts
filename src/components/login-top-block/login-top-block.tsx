import { Button } from 'antd'
// eslint-disable-next-line import/named
import { RouteComponentProps, withRouter } from 'react-router-dom'

import classes from './login-top-block.module.scss'

const LoginTopBlock = (props: RouteComponentProps) => {
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
