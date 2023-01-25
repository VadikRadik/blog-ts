import { Button, Checkbox, Divider, Input } from 'antd'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Link } from 'react-router-dom'

import classes from './sign-up-form.module.scss'

interface IFormInput {
  userName: string
  email: string
  password: string
  repeatPassword: string
}

const SignUpForm: React.FC = () => {
  //const { register, handleSubmit } = useForm<IFormInput>()
  //const onSubmit: SubmitHandler<IFormInput> = (data: IFormInput) => console.log(data)
  //const onError = (error: any) => console.log(error)

  return (
    <form className={classes['sign-up-form']}>
      <div className={classes['sign-up-form__header']}>Create new account</div>
      <label htmlFor='username' className={classes['sidn-up-form__label']}>
        Username
      </label>
      <Input id='username' placeholder='Username' />
      <div className={classes['sidn-up-form__validation-error']}>Username is required</div>

      <label htmlFor='email' className={classes['sidn-up-form__label']}>
        Email address
      </label>
      <Input id='email' placeholder='Email address' />
      <div className={classes['sidn-up-form__validation-error']}></div>

      <label htmlFor='password' className={classes['sidn-up-form__label']}>
        Password
      </label>
      <Input id='password' placeholder='Password' />
      <div className={classes['sidn-up-form__validation-error']}></div>

      <label htmlFor='repeat-password' className={classes['sidn-up-form__label']}>
        Repeat Password
      </label>
      <Input id='repeat-password' placeholder='Password' />
      <div className={classes['sidn-up-form__validation-error']}></div>

      <Divider />

      <Checkbox>I agree to the processing of my personal information</Checkbox>
      <Button type='primary' size='large' className={classes['sidn-up-form__button']}>
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
