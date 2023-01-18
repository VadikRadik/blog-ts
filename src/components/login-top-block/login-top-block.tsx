import { Button } from 'antd'

import classes from './login-top-block.module.scss'

const LoginTopBlock: React.FC = () => {
  return (
    <div className={classes['login-top-block']}>
      <Button type='text' className={classes['login-top-block__sign-in']}>
        Sign In
      </Button>
      <button className={classes['login-top-block__sign-up']}>Sign Up</button>
    </div>
  )
}

export default LoginTopBlock
