import classes from './profile-form.module.scss'

const ProfileForm = () => {
  return (
    <form className={classes['profile-form']}>
      <div className={classes['profile-form__header']}>Edit Profile</div>
    </form>
  )
}

export default ProfileForm
