import LoginTopBlock from '../login-top-block'

import classes from './header.module.scss'

const Header: React.FC = () => {
  return (
    <div className={classes['header']}>
      <span className={classes['header__label']}>Realworld Blog</span>
      <div className={classes['header__login-top-block']}>
        <LoginTopBlock />
      </div>
    </div>
  )
}

export default Header
