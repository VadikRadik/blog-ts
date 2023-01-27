import { Input } from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { Controller, RegisterOptions, Control, FieldValues, Path } from 'react-hook-form'

import classes from './form-password-field.module.scss'

interface FormFieldProps<TFormFields extends FieldValues> {
  label: string
  name: Path<TFormFields>
  validationRule: RegisterOptions
  error: string | undefined
  control: Control<TFormFields>
}

const FormPasswordField = <T extends FieldValues>(props: FormFieldProps<T>) => {
  return (
    <div>
      <label htmlFor={props.name} className={classes['password-field__label']}>
        {props.label}
      </label>
      <Controller
        name={props.name}
        control={props.control}
        rules={props.validationRule}
        render={({ field }) => (
          <Input.Password
            id={props.name}
            type='password'
            placeholder={props.label}
            iconRender={(visible: boolean) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            status={props.error ? 'error' : ''}
            {...field}
          />
        )}
      />
      <div className={classes['password-field__validation-error']}>{props.error ?? ''}</div>
    </div>
  )
}

export default FormPasswordField
