import { Button, message } from 'antd'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, DispatchType } from '../../services/store/store'
import { editUser, RootState } from '../../services/store/user-slice'
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
    pattern: {
      value: /^.+@.+$/,
      message: 'invalid email addres',
    },
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
    pattern: {
      value: /^https?:\/\/.+$/,
      message: 'invalid avatar url',
    },
  },
}

const onSubmit = (dispatch: DispatchType, showToast: (type: 'success' | 'error', content: string) => void) => {
  return (data: IFormInput) => {
    dispatch(
      editUser({
        email: data.email.toLowerCase(),
        password: data.password,
        username: data.userName,
        bio: '',
        image: data.avatar ?? '',
      }),
    )
      .then((res) => {
        if (res.type === 'user/editUser/fulfilled') {
          showToast('success', 'User successfully updated')
        }
      })
      .catch((error) => {
        showToast('error', error.message)
      })
  }
}

const ProfileForm = () => {
  const userState = useSelector((state: RootState) => state.users)
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userName: userState.username,
      email: userState.email,
      password: '',
      avatar: userState.image,
    },
  })

  const dispatch = useDispatch<AppDispatch>()

  const [messageApi, contextHolder] = message.useMessage()

  const showToast = (type: 'success' | 'error', content: string) => {
    messageApi.open({
      type: type,
      content: content,
    })
  }

  useEffect(() => {
    setError('userName', { message: userState.error?.body?.username ?? '' })
    setError('email', { message: userState.error?.body?.email ?? '' })
    if (userState.error?.body) {
      const message = Object.entries(userState.error.body).reduce((acc, entry) => {
        return acc + `${JSON.stringify(entry[0])}: ${JSON.stringify(entry[1])}\n`
      }, '')
      showToast('error', message.replaceAll('"', ''))
    } else if (userState.error?.message) {
      showToast('error', userState.error?.message)
    }
  }, [userState.error])

  return (
    <>
      {contextHolder}
      <form className={classes['profile-form']} onSubmit={handleSubmit(onSubmit(dispatch, showToast))}>
        <div className={classes['profile-form__header']}>Edit Profile</div>

        <div className={classes['profile-form__field']}>
          <FormTextField
            label={'Username'}
            name={'userName'}
            validationRule={validationRules.userName}
            error={errors.userName?.message}
            control={control}
          />
        </div>

        <div className={classes['profile-form__field']}>
          <FormTextField
            label={'Email address'}
            name={'email'}
            validationRule={validationRules.email}
            error={errors.email?.message}
            control={control}
          />
        </div>

        <div className={classes['profile-form__field']}>
          <FormPasswordField
            label={'New password'}
            name={'password'}
            validationRule={validationRules.password}
            error={errors.password?.message}
            control={control}
          />
        </div>

        <div className={classes['profile-form__field']}>
          <FormTextField
            label={'Avatar image (url)'}
            name={'avatar'}
            validationRule={validationRules.avatar}
            error={errors.avatar?.message}
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
    </>
  )
}

export default ProfileForm
