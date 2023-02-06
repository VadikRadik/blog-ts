import { Button, Checkbox, Divider } from 'antd'
import { useForm, Controller, RegisterOptions } from 'react-hook-form'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// eslint-disable-next-line import/named
import { RouteComponentProps, withRouter, Link } from 'react-router-dom'

import { AppDispatch, DispatchType } from '../../services/store/store'
import { postUser, RootState, resetError } from '../../services/store/user-slice'
import FormTextField from '../form-components/form-text-field'
import FormPasswordField from '../form-components/form-password-field'
import { ROOT_PATH, SIGN_IN_PATH } from '../../services/routes/routes'

import classes from './sign-up-form.module.scss'

interface IFormInput {
  userName: string
  email: string
  password: string
  repeatPassword: string
  agreeTerms: boolean
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
  repeatPassword: {
    validate: (repeatPassword: string, formValues: IFormInput) => {
      return repeatPassword === formValues.password ? true : 'Passwords do not match'
    },
  },
  agreeTerms: {
    validate: (agreeTerms: boolean) => {
      return agreeTerms ? true : 'Please accept the agreement of the processing of the personal information'
    },
  },
}

const onSubmit = (dispatch: DispatchType, routeProps: RouteComponentProps) => {
  return (data: IFormInput) => {
    dispatch(postUser({ username: data.userName, email: data.email.toLowerCase(), password: data.password })).then(
      (res) => {
        if (res.type === 'user/postUser/fulfilled') {
          routeProps.history.push(ROOT_PATH)
        }
      },
    )
  }
}

const SignUpForm = (routeProps: RouteComponentProps) => {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userName: '',
      email: '',
      password: '',
      repeatPassword: '',
      agreeTerms: false,
    },
  })

  const dispatch = useDispatch<AppDispatch>()
  const userState = useSelector((state: RootState) => state.users)

  useEffect(() => {
    setError('userName', { message: userState.error?.body?.username ?? '' })
    setError('email', { message: userState.error?.body?.email ?? '' })
  }, [userState.error])

  useEffect(() => {
    dispatch(resetError())
  }, [])

  return (
    <form className={classes['sign-up-form']} onSubmit={handleSubmit(onSubmit(dispatch, routeProps))}>
      <div className={classes['sign-up-form__header']}>Create new account</div>

      <div className={classes['sign-up-form__field']}>
        <FormTextField
          label={'Username'}
          name={'userName'}
          validationRule={validationRules.userName}
          error={errors.userName?.message}
          control={control}
        />
      </div>

      <div className={classes['sign-up-form__field']}>
        <FormTextField
          label={'Email address'}
          name={'email'}
          validationRule={validationRules.email}
          error={errors.email?.message}
          control={control}
        />
      </div>

      <div className={classes['sign-up-form__field']}>
        <FormPasswordField
          label={'Password'}
          name={'password'}
          validationRule={validationRules.password}
          error={errors.password?.message}
          control={control}
        />
      </div>

      <div className={classes['sign-up-form__field']}>
        <FormPasswordField
          label={'Repeat Password'}
          name={'repeatPassword'}
          validationRule={validationRules.repeatPassword as RegisterOptions}
          error={errors.repeatPassword?.message}
          control={control}
        />
      </div>

      <Divider />

      <Controller
        name='agreeTerms'
        control={control}
        rules={validationRules.agreeTerms}
        defaultValue={false}
        render={({ field }) => {
          return (
            <Checkbox checked={field.value} {...field}>
              I agree to the processing of my personal information
            </Checkbox>
          )
        }}
      />
      <div className={classes['sign-up-form__validation-error']}>{errors.agreeTerms?.message ?? ''}</div>

      <Button
        type='primary'
        size='large'
        htmlType='submit'
        loading={userState.loading}
        className={classes['sign-up-form__button']}
      >
        Create
      </Button>

      <div className={classes['sign-up-form__sign-in-redirection']}>
        Already have an account?{' '}
        <Link to={SIGN_IN_PATH} className={classes['sign-up-form__sign-in-redirection-link']}>
          Sign In.
        </Link>
      </div>
    </form>
  )
}

export default withRouter(SignUpForm)
