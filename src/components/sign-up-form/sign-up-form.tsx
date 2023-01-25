import { Button, Checkbox, Divider, Input } from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { useForm, FieldErrors, Controller } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useState } from 'react'

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
    //validate: (name: string, formVals: IFormInput) => {
    //  console.log('ddd')
    //  return name === formVals.password
    //},
  },
}

interface IStateSetters {
  userName: React.Dispatch<React.SetStateAction<string | undefined>>
  //email: React.Dispatch<React.SetStateAction<string | null>>
  //password: React.Dispatch<React.SetStateAction<string | null>>
  //repeatPassword: React.Dispatch<React.SetStateAction<string | null>>
  //agreeTerms: React.Dispatch<React.SetStateAction<boolean>>
}

const onSubmit = (stateSetters: IStateSetters) => {
  return (data: IFormInput) => {
    console.log(data)
    stateSetters.userName('')
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
  }
}

const SignUpForm: React.FC = () => {
  //const { register, handleSubmit } = useForm<IFormInput>()
  //const onSubmit: SubmitHandler<IFormInput> = (data: IFormInput) => console.log(data)
  //const onError = (error: any) => console.log(error)
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
  const stateSetters = { userName: setUserNameError }

  return (
    <form className={classes['sign-up-form']} onSubmit={handleSubmit(onSubmit(stateSetters), onError(stateSetters))}>
      <div className={classes['sign-up-form__header']}>Create new account</div>
      <label htmlFor='username' className={classes['sidn-up-form__label']}>
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
      <div className={classes['sidn-up-form__validation-error']}>{userNameError ?? ''}</div>

      <label htmlFor='email' className={classes['sidn-up-form__label']}>
        Email address
      </label>
      <Input id='email' placeholder='Email address' />
      <div className={classes['sidn-up-form__validation-error']}></div>

      <label htmlFor='password' className={classes['sidn-up-form__label']}>
        Password
      </label>
      <Input.Password
        id='password'
        type='password'
        placeholder='Password'
        iconRender={(visible: boolean) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
      />
      <div className={classes['sidn-up-form__validation-error']}></div>

      <label htmlFor='repeat-password' className={classes['sidn-up-form__label']}>
        Repeat Password
      </label>
      <Input.Password
        id='repeat-password'
        type='password'
        placeholder='Password'
        iconRender={(visible: boolean) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
      />
      <div className={classes['sidn-up-form__validation-error']}></div>

      <Divider />

      <Checkbox>I agree to the processing of my personal information</Checkbox>
      <div className={classes['sidn-up-form__validation-error']}></div>

      <Button type='primary' size='large' htmlType='submit' className={classes['sidn-up-form__button']}>
        Create
      </Button>

      <div className={classes['sidn-up-form__sign-in-redirection']}>
        Already have an account?{' '}
        <Link to='/sign-in' className={classes['sidn-up-form__sign-in-redirection-link']}>
          Sign In.
        </Link>
      </div>
    </form>
  )
}

export default SignUpForm
