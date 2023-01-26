import { Button, Input } from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { useForm, FieldErrors, Controller } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// eslint-disable-next-line import/named
import { RouteComponentProps, withRouter, Link } from 'react-router-dom'

import { AppDispatch, DispatchType } from '../../services/store/store'
import { RootState } from '../../services/store/user-slice'

import classes from './sign-in-form.module.scss'

interface IFormInput {
  email: string
  password: string
}

const validationRules = {
  email: {
    required: 'Email addres is required',
    pattern: /^.+@.+$/,
  },
  password: {
    required: 'Password is required',
  },
}

type StateSetter = React.Dispatch<React.SetStateAction<string | undefined>>

interface IStateSetters {
  email: StateSetter
  password: StateSetter
}

const onSubmit = (stateSetters: IStateSetters, dispatch: DispatchType, routeProps: RouteComponentProps) => {
  return (data: IFormInput) => {
    //dispatch(postUser({ username: data.userName, email: data.email.toLowerCase(), password: data.password })).then(
    //  (res) => {
    //    if (res.type === 'user/postUser/fulfilled') {
    //      console.log('redirecting')
    //      routeProps.history.push('/')
    //    }
    //  },
    //)

    console.log(data)
    console.log(routeProps)
    stateSetters.email('')
    stateSetters.password('')
  }
}

const onError = (stateSetters: IStateSetters) => {
  return (errors: FieldErrors<IFormInput>) => {
    console.log(errors)

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
  }
}

const SignInForm = (routeProps: RouteComponentProps) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const [emailError, setEmailError] = useState<string | undefined>('')
  const [passwordError, setPasswordError] = useState<string | undefined>('')
  const stateSetters = {
    email: setEmailError,
    password: setPasswordError,
  }
  const dispatch = useDispatch<AppDispatch>()
  const userState = useSelector((state: RootState) => state.users)

  useEffect(() => {
    setEmailError(userState.error?.body?.email ?? '')
  }, [userState.error])

  return (
    <form
      className={classes['sign-in-form']}
      onSubmit={handleSubmit(onSubmit(stateSetters, dispatch, routeProps), onError(stateSetters))}
    >
      <div className={classes['sign-in-form__header']}>Sign In</div>

      <label htmlFor='email' className={classes['sign-in-form__label']}>
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
      <div className={classes['sign-in-form__validation-error']}>{emailError ?? ''}</div>

      <label htmlFor='password' className={classes['sign-in-form__label']}>
        Password
      </label>
      <Controller
        name='password'
        control={control}
        rules={validationRules.password}
        render={({ field }) => (
          <Input.Password
            id='password'
            type='password'
            placeholder='Password'
            iconRender={(visible: boolean) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            status={passwordError ? 'error' : ''}
            {...field}
          />
        )}
      />

      <Button
        type='primary'
        size='large'
        htmlType='submit'
        loading={userState.loading}
        className={classes['sign-in-form__button']}
      >
        Login
      </Button>
      <div className={classes['sign-in-form__validation-error']}>{passwordError ?? ''}</div>

      <div className={classes['sign-in-form__sign-up-redirection']}>
        Don’t have an account?{' '}
        <Link to='/sign-up' className={classes['sign-in-form__sign-up-redirection-link']}>
          Sign Up.
        </Link>
      </div>
    </form>
  )
}

export default withRouter(SignInForm)
