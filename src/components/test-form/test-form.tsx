import { Checkbox, Input } from 'antd'
import { useForm, Controller, FieldErrors } from 'react-hook-form'
import { useState } from 'react'

interface Fields {
  name: string
  email: string
  password: string
  check: boolean
}

const validationRules = {
  name: {
    required: 'Name is required',
    validate: (name: string, formVals: Fields) => {
      console.log('ddd')
      return name === formVals.password
    },
  },
}

const handleRegistration = (cb: React.Dispatch<React.SetStateAction<'' | 'error' | 'warning' | undefined>>) => {
  return (data: unknown) => {
    console.log(data)
    cb('')
  }
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
      check: false,
    },
  })
  /*
  const rule = {
    required: 'Name is required',
    validate: (name: string, formVals: Fields) => {
      console.log('ddd')
      return name === formVals.password
    },
  }*/

  const [nameFieldStatus, setNameFieldStatus] = useState<'' | 'error' | 'warning' | undefined>('')

  const handleError = (errors: FieldErrors<Fields>) => {
    console.log(errors)
    if (errors?.name) {
      setNameFieldStatus('error')
    } else {
      setNameFieldStatus('')
    }
  }

  return (
    <form onSubmit={handleSubmit(handleRegistration(setNameFieldStatus), handleError)}>
      <label>Name</label>
      <Controller
        name='name'
        control={control}
        //rules={{ required: 'Name is required' }}
        rules={validationRules.name}
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
      <Controller
        name='check'
        control={control}
        rules={{
          validate: (val: boolean) => {
            console.log(val)
            return val
          },
        }}
        render={({ field }) => <Checkbox {...field}>check</Checkbox>}
      />
      <button>Submit</button>
    </form>
  )
}

export default RegisterForm
