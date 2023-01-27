import { Button, Input } from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { useForm, FieldErrors, Controller } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, DispatchType } from '../../services/store/store'
import { RootState } from '../../services/store/user-slice'

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

type StateSetter = React.Dispatch<React.SetStateAction<string | undefined>>

interface IStateSetters {
  userName: StateSetter
  email: StateSetter
  password: StateSetter
  avatar: StateSetter
}

const onSubmit = (stateSetters: IStateSetters, dispatch: DispatchType) => {
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

const onError = (stateSetters: IStateSetters) => {
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

  const stateSetters = {
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
      onSubmit={handleSubmit(onSubmit(stateSetters, dispatch), onError(stateSetters))}
    >
      <div className={classes['profile-form__header']}>Edit Profile</div>

      <label htmlFor='username' className={classes['profile-form__label']}>
        Username
      </label>
      <Controller
        name='userName'
        control={control}
        rules={validationRules.userName}
        render={({ field }) => (
          <Input id='username' placeholder='Username' type='text' status={userNameError ? 'error' : ''} {...field} />
        )}
      />
      <div className={classes['profile-form__validation-error']}>{userNameError ?? ''}</div>

      <label htmlFor='email' className={classes['profile-form__label']}>
        Email address
      </label>
      <Controller
        name='email'
        control={control}
        rules={validationRules.email}
        render={({ field }) => (
          <Input id='email' placeholder='Email address' type='text' status={emailError ? 'error' : ''} {...field} />
        )}
      />
      <div className={classes['profile-form__validation-error']}>{emailError ?? ''}</div>

      <label htmlFor='new-password' className={classes['profile-form__label']}>
        New password
      </label>
      <Controller
        name='password'
        control={control}
        rules={validationRules.password}
        render={({ field }) => (
          <Input.Password
            id='new-password'
            type='password'
            placeholder='New password'
            iconRender={(visible: boolean) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            status={passwordError ? 'error' : ''}
            {...field}
          />
        )}
      />
      <div className={classes['profile-form__validation-error']}>{passwordError ?? ''}</div>

      <label htmlFor='avatar' className={classes['profile-form__label']}>
        Avatar image (url)
      </label>
      <Controller
        name='avatar'
        control={control}
        rules={validationRules.avatar}
        render={({ field }) => (
          <Input id='avatar' type='text' placeholder='Avatar image' status={avatarError ? 'error' : ''} {...field} />
        )}
      />
      <div className={classes['profile-form__validation-error']}>{avatarError ?? ''}</div>

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
