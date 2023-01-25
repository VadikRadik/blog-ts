import { Input } from 'antd'
import { useForm, Controller, MultipleFieldErrors } from 'react-hook-form'
import { useState } from 'react'

interface Error {
  type: string
  message?: string
  types: MultipleFieldErrors
}

interface Errors {
  name?: Error
  email?: Error
  password?: Error
}

interface Fields {
  name: string
  email: string
  password: string
}

const RegisterForm = () => {
  /*const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const handleRegistration = (data: any) => console.log(data)
  const handleError = (errors: any) => console.log(errors)
  
  const registerOptions = {
    name: { required: 'Name is required' },
    email: { required: 'Email is required' },
    password: {
      required: 'Password is required',
      minLength: {
        value: 8,
        message: 'Password must have at least 8 characters',
      },
    },
  }*/

  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const [nameFieldStatus, setNameFieldStatus] = useState<'' | 'error' | 'warning' | undefined>('')

  const handleRegistration = (data: unknown) => {
    console.log(data)
    setNameFieldStatus('')
  }
  const handleError = (errors: unknown) => {
    console.log(errors)
    if ((errors as Errors)?.name) {
      setNameFieldStatus('error')
    } else {
      setNameFieldStatus('')
    }
  }

  return (
    <form onSubmit={handleSubmit(handleRegistration, handleError)}>
      <label>Name</label>
      <Controller
        name='name'
        control={control}
        rules={{ required: 'Name is required' }}
        render={({ field }) => <Input type='text' status={nameFieldStatus} {...field} />}
      />
      <label>Email</label>
      <Controller
        name='email'
        control={control}
        rules={{ required: 'email is required' }}
        render={({ field }) => <Input type='email' {...field} />}
      />
      <label>Password</label>
      <Controller
        name='password'
        control={control}
        rules={{
          required: 'Password is required',
          minLength: {
            value: 8,
            message: 'Password must have at least 8 characters',
          },
        }}
        render={({ field }) => <Input type='password' {...field} />}
      />
      <button>Submit</button>
    </form>
  )
}

export default RegisterForm
