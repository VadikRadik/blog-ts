import { Button, Checkbox, Divider } from 'antd'
import { useForm, FieldErrors, Controller, RegisterOptions } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// eslint-disable-next-line import/named
import { RouteComponentProps, withRouter, Link } from 'react-router-dom'

import { AppDispatch, DispatchType } from '../../services/store/store'
import { postUser, RootState } from '../../services/store/user-slice'
import FormTextField from '../form-components/form-text-field'
import FormPasswordField from '../form-components/form-password-field'

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
  repeatPassword: {
    validate: (repeatPassword: string, formValues: IFormInput) => {
      return repeatPassword === formValues.password
    },
  },
  agreeTerms: {
    validate: (agreeTerms: boolean) => {
      return agreeTerms
    },
  },
}

type ErrorSetter = React.Dispatch<React.SetStateAction<string | undefined>>

interface IStateErrorsSetters {
  userName: ErrorSetter
  email: ErrorSetter
  password: ErrorSetter
  repeatPassword: ErrorSetter
  agreeTerms: ErrorSetter
}

const onSubmit = (stateSetters: IStateErrorsSetters, dispatch: DispatchType, routeProps: RouteComponentProps) => {
  return (data: IFormInput) => {
    dispatch(postUser({ username: data.userName, email: data.email.toLowerCase(), password: data.password })).then(
      (res) => {
        if (res.type === 'user/postUser/fulfilled') {
          routeProps.history.push('/')
        }
      },
    )

    stateSetters.userName('')
    stateSetters.email('')
    stateSetters.password('')
    stateSetters.repeatPassword('')
    stateSetters.agreeTerms('')
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

    if (errors?.repeatPassword) {
      stateSetters.repeatPassword('Passwords do not match')
    } else {
      stateSetters.repeatPassword('')
    }

    if (errors?.agreeTerms) {
      stateSetters.agreeTerms('Please accept the agreement of the processing of the personal information')
    } else {
      stateSetters.agreeTerms('')
    }
  }
}

const SignUpForm = (routeProps: RouteComponentProps) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      userName: '',
      email: '',
      password: '',
      repeatPassword: '',
      agreeTerms: false,
    },
  })

  const [userNameError, setUserNameError] = useState<string | undefined>('')
  const [emailError, setEmailError] = useState<string | undefined>('')
  const [passwordError, setPasswordError] = useState<string | undefined>('')
  const [repeatPasswordError, setRepeatPasswordError] = useState<string | undefined>('')
  const [agreeTerms, setAgreeTermsError] = useState<string | undefined>('')
  const stateErrorsSetters = {
    userName: setUserNameError,
    email: setEmailError,
    password: setPasswordError,
    repeatPassword: setRepeatPasswordError,
    agreeTerms: setAgreeTermsError,
  }
  const dispatch = useDispatch<AppDispatch>()
  const userState = useSelector((state: RootState) => state.users)

  useEffect(() => {
    setUserNameError(userState.error?.body?.username ?? '')
    setEmailError(userState.error?.body?.email ?? '')
  }, [userState.error])

  return (
    <form
      className={classes['sign-up-form']}
      onSubmit={handleSubmit(onSubmit(stateErrorsSetters, dispatch, routeProps), onError(stateErrorsSetters))}
    >
      <div className={classes['sign-up-form__header']}>Create new account</div>

      <div className={classes['sign-up-form__field']}>
        <FormTextField
          label={'Username'}
          name={'userName'}
          validationRule={validationRules.userName}
          error={userNameError}
          control={control}
        />
      </div>

      <div className={classes['sign-up-form__field']}>
        <FormTextField
          label={'Email address'}
          name={'email'}
          validationRule={validationRules.email}
          error={emailError}
          control={control}
        />
      </div>

      <div className={classes['sign-up-form__field']}>
        <FormPasswordField
          label={'Password'}
          name={'password'}
          validationRule={validationRules.password}
          error={passwordError}
          control={control}
        />
      </div>

      <div className={classes['sign-up-form__field']}>
        <FormPasswordField
          label={'Repeat Password'}
          name={'repeatPassword'}
          validationRule={validationRules.repeatPassword as RegisterOptions}
          error={repeatPasswordError}
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
      <div className={classes['sign-up-form__validation-error']}>{agreeTerms ?? ''}</div>

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
        <Link to='/sign-in' className={classes['sign-up-form__sign-in-redirection-link']}>
          Sign In.
        </Link>
      </div>
    </form>
  )
}

export default withRouter(SignUpForm)
