import { Button, Input } from 'antd'
import { useForm, FieldErrors, Controller, DefaultValues } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// eslint-disable-next-line import/named
import { RouteComponentProps, withRouter } from 'react-router-dom'
import TextArea from 'antd/es/input/TextArea'

import { AppDispatch, DispatchType } from '../../services/store/store'
import { RootState } from '../../services/store/articles-slice'
import FormTextField from '../form-components/form-text-field'

import classes from './edit-article-form.module.scss'

interface IFormInput {
  title: string
  description: string
  text: string
  tags: string[]
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
  tag: {
    //pattern: /^+$/,
    required: 'Tag cannot be empty',
  },
}

type ErrorSetter = React.Dispatch<React.SetStateAction<string | undefined>>

interface IStateErrorsSetters {
  title: ErrorSetter
  description: ErrorSetter
  text: ErrorSetter
  tags: ErrorSetter
}

type HistoryType = RouteComponentProps['history']

const onSubmit = (stateSetters: IStateErrorsSetters, dispatch: DispatchType, history: HistoryType) => {
  return (data: IFormInput) => {
    //dispatch(loginUser({ email: data.email.toLowerCase(), password: data.password })).then((res) => {
    //  if (res.type === 'user/loginUser/fulfilled') {
    //    routeProps.history.push('/')
    //  }
    //})

    stateSetters.title('')
    stateSetters.description('')
    stateSetters.text('')
    stateSetters.tags('')
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

    if (errors?.tags) {
      stateSetters.tags(errors.tags.message)
    } else {
      stateSetters.tags('')
    }
  }
}

type AsyncDefaultValues<TFieldValues> = (payload?: unknown) => Promise<TFieldValues>

const fetchArticle = async (slug: string | undefined): Promise<IFormInput> => {
  const res = await fetch(`https://blog.kata.academy/api/articles/${slug}`)
    .then((r) => r.json())
    .then((res) => {
      const r = res.article
      return { title: r.title, description: r.description, text: r.body, tags: r.tagList }
    })

  return res
}

interface EditArticleFormProps extends RouteComponentProps {
  slug?: string
}

const EditArticleForm: React.FC<EditArticleFormProps> = ({ history, slug }) => {
  const defaultValuesEmpty = { title: '', description: '', text: '', tags: [] }
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
  const [tagsError, setTagsError] = useState<string | undefined>('')

  const stateErrorsSetters = {
    title: setTitleError,
    description: setDescriptionError,
    text: setTextError,
    tags: setTagsError,
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

      <label htmlFor='tags' className={classes['edit-article__label']}>
        Tags
      </label>
      <div className={classes['edit-article__tags-wrapper']}>
        <div className={classes['edit-article__tags-fields-wrapper']}>
          <div className={classes['edit-article__tags-field']}>
            <Input placeholder='Tag' className={classes['edit-article__tag-input']} />
            <Button type='primary' danger ghost className={classes['edit-article__tag-delete']}>
              Delete
            </Button>
          </div>
          <div className={classes['edit-article__tags-field']}>
            <Input placeholder='Tag' className={classes['edit-article__tag-input']} />
            <Button type='primary' danger ghost className={classes['edit-article__tag-delete']}>
              Delete
            </Button>
          </div>
        </div>
        <Button type='primary' ghost className={classes['edit-article__tag-add']}>
          Add Tag
        </Button>
      </div>

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
