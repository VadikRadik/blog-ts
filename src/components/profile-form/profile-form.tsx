import { Button } from 'antd'
import { useForm, FieldErrors } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, DispatchType } from '../../services/store/store'
import { RootState } from '../../services/store/user-slice'
import FormTextField from '../form-components/form-text-field'
import FormPasswordField from '../form-components/form-password-field'

import classes from './profile-form.module.scss'

interface IFormInput {
  userName: string
  email: string
  password: string
  avatar: string
}

const validationRules = {
  userName: {
    required: 'Username is required',
    minLength: {
      value: 3,
      message: 'Username must have at least 3 characters',
    },
    maxLength: {
      value: 20,
      message: 'Username must have a maximum of 20 characters',
    },
  },
  email: {
    required: 'Email addres is required',
    pattern: /^.+@.+$/,
  },
  password: {
    required: 'Password is required',
    minLength: {
      value: 6,
      message: 'Password must have at least 6 characters',
    },
    maxLength: {
      value: 40,
      message: 'Password must have a maximum of 40 characters',
    },
  },
  avatar: {
    pattern: /^https?:\/\/.+$/,
  },
}

type ErrorSetter = React.Dispatch<React.SetStateAction<string | undefined>>

interface IStateErrorsSetters {
  userName: ErrorSetter
  email: ErrorSetter
  password: ErrorSetter
  avatar: ErrorSetter
}

const onSubmit = (stateSetters: IStateErrorsSetters, dispatch: DispatchType) => {
  return (data: IFormInput) => {
    //dispatch(postUser({ username: data.userName, email: data.email.toLowerCase(), password: data.password }))

    console.log(dispatch)
    console.log(data)
    stateSetters.userName('')
    stateSetters.email('')
    stateSetters.password('')
    stateSetters.avatar('')
  }
}

const onError = (stateSetters: IStateErrorsSetters) => {
  return (errors: FieldErrors<IFormInput>) => {
    console.log(errors)

    if (errors?.userName) {
      stateSetters.userName(errors.userName.message)
    } else {
      stateSetters.userName('')
    }

    if (errors?.email) {
      if (errors.email.type === 'pattern') {
        stateSetters.email('invalid email addres')
      } else {
        stateSetters.email(errors.email.message)
      }
    } else {
      stateSetters.email('')
    }

    if (errors?.password) {
      stateSetters.password(errors.password.message)
    } else {
      stateSetters.password('')
    }

    if (errors?.avatar) {
      if (errors.avatar.type === 'pattern') {
        stateSetters.avatar('invalid avatar url')
      } else {
        stateSetters.avatar(errors.avatar.message)
      }
    } else {
      stateSetters.avatar('')
    }
  }
}

const ProfileForm = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      userName: '',
      email: '',
      password: '',
      avatar: '',
    },
  })

  const [userNameError, setUserNameError] = useState<string | undefined>('')
  const [emailError, setEmailError] = useState<string | undefined>('')
  const [passwordError, setPasswordError] = useState<string | undefined>('')
  const [avatarError, setAvatarError] = useState<string | undefined>('')

  const stateErrorsSetters = {
    userName: setUserNameError,
    email: setEmailError,
    password: setPasswordError,
    avatar: setAvatarError,
  }
  const dispatch = useDispatch<AppDispatch>()
  const userState = useSelector((state: RootState) => state.users)

  useEffect(() => {
    setUserNameError(userState.error?.body?.username ?? '')
    setEmailError(userState.error?.body?.email ?? '')
  }, [userState.error])

  return (
    <form
      className={classes['profile-form']}
      onSubmit={handleSubmit(onSubmit(stateErrorsSetters, dispatch), onError(stateErrorsSetters))}
    >
      <div className={classes['profile-form__header']}>Edit Profile</div>

      <div className={classes['profile-form__field']}>
        <FormTextField
          label={'Username'}
          name={'userName'}
          validationRule={validationRules.userName}
          error={userNameError}
          control={control}
        />
      </div>

      <div className={classes['profile-form__field']}>
        <FormTextField
          label={'Email address'}
          name={'email'}
          validationRule={validationRules.email}
          error={emailError}
          control={control}
        />
      </div>

      <div className={classes['profile-form__field']}>
        <FormPasswordField
          label={'New password'}
          name={'password'}
          validationRule={validationRules.password}
          error={passwordError}
          control={control}
        />
      </div>

      <div className={classes['profile-form__field']}>
        <FormTextField
          label={'Avatar image (url)'}
          name={'avatar'}
          validationRule={validationRules.avatar}
          error={avatarError}
          control={control}
        />
      </div>

      <Button
        type='primary'
        size='large'
        htmlType='submit'
        loading={userState.loading}
        className={classes['profile-form__button']}
      >
        Save
      </Button>
    </form>
  )
}

export default ProfileForm
