import { Button, message } from 'antd'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// eslint-disable-next-line import/named
import { RouteComponentProps, withRouter, Link } from 'react-router-dom'

import { AppDispatch, DispatchType } from '../../services/store/store'
import { loginUser, RootState, resetError } from '../../services/store/user-slice'
import FormTextField from '../form-components/form-text-field'
import FormPasswordField from '../form-components/form-password-field'
import { ROOT_PATH, SIGN_UP_PATH } from '../../services/routes/routes'

import classes from './sign-in-form.module.scss'

interface IFormInput {
  email: string
  password: string
}

const validationRules = {
  email: {
    required: 'Email addres is required',
    pattern: {
      value: /^.+@.+$/,
      message: 'invalid email addres',
    },
  },
  password: {
    required: 'Password is required',
  },
}

const onSubmit = (dispatch: DispatchType, routeProps: RouteComponentProps) => {
  return (data: IFormInput) => {
    dispatch(loginUser({ email: data.email.toLowerCase(), password: data.password })).then((res) => {
      if (res.type === 'user/loginUser/fulfilled') {
        routeProps.history.push(ROOT_PATH)
      }
    })
  }
}

const SignInForm = (routeProps: RouteComponentProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const dispatch = useDispatch<AppDispatch>()
  const userState = useSelector((state: RootState) => state.users)

  const [messageApi, contextHolder] = message.useMessage()
  useEffect(() => {
    if (userState.error?.body) {
      const message = Object.entries(userState.error.body).reduce((acc, entry) => {
        return acc + `${JSON.stringify(entry[0])}: ${JSON.stringify(entry[1])}\n`
      }, '')
      messageApi.open({ type: 'error', content: message.replaceAll('"', '') })
    } else if (userState.error?.message) {
      messageApi.open({ type: 'error', content: userState.error?.message })
    }
  }, [userState.error])

  useEffect(() => {
    dispatch(resetError())
  }, [])

  return (
    <>
      {contextHolder}
      <form className={classes['sign-in-form']} onSubmit={handleSubmit(onSubmit(dispatch, routeProps))}>
        <div className={classes['sign-in-form__header']}>Sign In</div>

        <div className={classes['sign-in-form__field']}>
          <FormTextField
            label={'Email address'}
            name={'email'}
            validationRule={validationRules.email}
            error={errors.email?.message}
            control={control}
          />
        </div>

        <div className={classes['sign-in-form__field']}>
          <FormPasswordField
            label={'Password'}
            name={'password'}
            validationRule={validationRules.password}
            error={errors.password?.message}
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
          <Link to={SIGN_UP_PATH} className={classes['sign-in-form__sign-up-redirection-link']}>
            Sign Up.
          </Link>
        </div>
      </form>
    </>
  )
}

export default withRouter(SignInForm)
