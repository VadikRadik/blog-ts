import React, { useState } from 'react'

import classes from './avatar.module.scss'

export interface AvatarProps {
  imageUrl: string
}

const Avatar: React.FC<AvatarProps> = ({ imageUrl }) => {
  const [isAvatarLoaded, setAvatarLoaded] = useState(false)

  const userAvatar = isAvatarLoaded ? (
    <img className={classes['avatar__pickture']} src={imageUrl} alt={'user avatar'} />
  ) : (
    <React.Fragment>
      <div className={classes['avatar__placeholder']}></div>
      <img
        className={classes['avatar__pickture--hidden']}
        src={imageUrl}
        alt={'user avatar'}
        onLoad={() => setAvatarLoaded(true)}
      />
    </React.Fragment>
  )

  return <div className={classes['avatar']}>{userAvatar}</div>
}

export default Avatar
