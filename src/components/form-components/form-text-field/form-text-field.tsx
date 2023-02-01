import { Input } from 'antd'
import { Controller, RegisterOptions, Control, FieldValues, Path } from 'react-hook-form'

import classes from './form-text-field.module.scss'

interface FormFieldProps<TFormFields extends FieldValues> {
  label: string
  name: Path<TFormFields>
  validationRule: RegisterOptions
  error: string | undefined
  control: Control<TFormFields>
}

const FormTextField = <T extends FieldValues>(props: FormFieldProps<T>) => {
  return (
    <div>
      <label htmlFor={props.name} className={classes['text-field__label']}>
        {props.label}
      </label>
      <Controller
        name={props.name}
        control={props.control}
        rules={props.validationRule}
        render={({ field }) => (
          <Input id={props.name} placeholder={props.label} type='text' status={props.error ? 'error' : ''} {...field} />
        )}
      />
      <div className={classes['text-field__validation-error']}>{props.error ?? ''}</div>
    </div>
  )
}

export default FormTextField
