import { Button } from 'antd'
import { useForm, FieldErrors } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// eslint-disable-next-line import/named
import { RouteComponentProps, withRouter, Link } from 'react-router-dom'

import { AppDispatch, DispatchType } from '../../services/store/store'
import { RootState } from '../../services/store/user-slice'
import FormTextField from '../form-components/form-text-field'
import FormPasswordField from '../form-components/form-password-field'

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

      <div className={classes['sign-in-form__field']}>
        <FormTextField
          label={'Email address'}
          name={'email'}
          validationRule={validationRules.email}
          error={emailError}
          control={control}
        />
      </div>

      <div className={classes['sign-in-form__field']}>
        <FormPasswordField
          label={'Password'}
          name={'password'}
          validationRule={validationRules.password}
          error={passwordError}
          control={control}
        />
      </div>

      <Button
        type='primary'
        size='large'
        htmlType='submit'
        loading={userState.loading}
        className={classes['sign-in-form__button']}
      >
        Login
      </Button>

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