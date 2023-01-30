import { Button } from 'antd'
import { useForm, FieldErrors, Controller, Control, DefaultValues, useFieldArray } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// eslint-disable-next-line import/named
import { RouteComponentProps, withRouter } from 'react-router-dom'
import TextArea from 'antd/es/input/TextArea'

import { AppDispatch, DispatchType } from '../../services/store/store'
import { RootState } from '../../services/store/articles-slice'
import FormTextField from '../form-components/form-text-field'
import TagsBlock from '../form-components/tags-block'
import { ITag, ITagable } from '../form-components/tags-block/tags-block'

import classes from './edit-article-form.module.scss'

interface IFormInput {
  title: string
  description: string
  text: string
  tags: ITag[]
}

const validationRules = {
  title: {
    required: 'Title is required',
  },
  description: {
    required: 'Title is required',
  },
  text: {
    required: 'Text is required',
  },
}

type ErrorSetter = React.Dispatch<React.SetStateAction<string | undefined>>

interface IStateErrorsSetters {
  title: ErrorSetter
  description: ErrorSetter
  text: ErrorSetter
}

type HistoryType = RouteComponentProps['history']

const onSubmit = (stateSetters: IStateErrorsSetters, dispatch: DispatchType, history: HistoryType) => {
  return (data: IFormInput) => {
    //dispatch(loginUser({ email: data.email.toLowerCase(), password: data.password })).then((res) => {
    //  if (res.type === 'user/loginUser/fulfilled') {
    //    routeProps.history.push('/')
    //  }
    //})
    console.log(data)

    stateSetters.title('')
    stateSetters.description('')
    stateSetters.text('')
  }
}

const onError = (stateSetters: IStateErrorsSetters) => {
  return (errors: FieldErrors<IFormInput>) => {
    console.log(errors)

    if (errors?.title) {
      stateSetters.title(errors.title.message)
    } else {
      stateSetters.title('')
    }

    if (errors?.description) {
      stateSetters.description(errors.description.message)
    } else {
      stateSetters.description('')
    }

    if (errors?.text) {
      stateSetters.text(errors.text.message)
    } else {
      stateSetters.text('')
    }
  }
}

type AsyncDefaultValues<TFieldValues> = (payload?: unknown) => Promise<TFieldValues>

const fetchArticle = async (slug: string | undefined): Promise<IFormInput> => {
  const res = await fetch(`https://blog.kata.academy/api/articles/${slug}`)
    .then((r) => r.json())
    .then((res) => {
      const r = res.article
      const tags = r.tagList.map((t: string) => ({ tag: t }))
      return { title: r.title, description: r.description, text: r.body, tags: tags }
    })

  return res
}

interface EditArticleFormProps extends RouteComponentProps {
  slug?: string
}

const EditArticleForm: React.FC<EditArticleFormProps> = ({ history, slug }) => {
  const defaultTagsValue: ITag[] = [{ tag: '' }]
  const defaultValuesEmpty = { title: '', description: '', text: '', tags: defaultTagsValue }
  const defaultValues: DefaultValues<IFormInput> | AsyncDefaultValues<IFormInput> = slug
    ? async () => fetchArticle(slug)
    : defaultValuesEmpty

  const { control, handleSubmit, reset } = useForm<IFormInput>({
    defaultValues: defaultValues,
  })

  useEffect(() => {
    if (!slug) {
      reset(defaultValuesEmpty)
    }
  }, [slug])

  const [titleError, setTitleError] = useState<string | undefined>('')
  const [descriptionError, setDescriptionError] = useState<string | undefined>('')
  const [textError, setTextError] = useState<string | undefined>('')

  const stateErrorsSetters = {
    title: setTitleError,
    description: setDescriptionError,
    text: setTextError,
  }
  const dispatch = useDispatch<AppDispatch>()

  return (
    <form
      className={classes['edit-article-form']}
      onSubmit={handleSubmit(onSubmit(stateErrorsSetters, dispatch, history), onError(stateErrorsSetters))}
    >
      <div className={classes['edit-article-form__header']}>Create new article</div>

      <div className={classes['edit-article__field']}>
        <FormTextField
          label={'Title'}
          name={'title'}
          validationRule={validationRules.title}
          error={titleError}
          control={control}
        />
      </div>

      <div className={classes['edit-article__field']}>
        <FormTextField
          label={'Short description'}
          name={'description'}
          validationRule={validationRules.description}
          error={descriptionError}
          control={control}
        />
      </div>

      <label htmlFor='text' className={classes['edit-article__label']}>
        Text
      </label>
      <Controller
        name='text'
        control={control}
        rules={validationRules.text}
        render={({ field }) => (
          <TextArea rows={6} style={{ resize: 'none' }} status={textError ? 'error' : ''} {...field} />
        )}
      />
      <div className={classes['edit-article__validation-error']}>{textError ?? ''}</div>

      <TagsBlock control={control as unknown as Control<ITagable>} />

      <Button
        type='primary'
        size='large'
        htmlType='submit'
        //loading={userState.loading}
        className={classes['edit-article__button']}
      >
        Send
      </Button>
    </form>
  )
}

export default withRouter(EditArticleForm)
