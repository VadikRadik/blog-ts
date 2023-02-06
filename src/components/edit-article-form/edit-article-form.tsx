import { Button, message } from 'antd'
import { useForm, Controller, Control, DefaultValues } from 'react-hook-form'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// eslint-disable-next-line import/named
import { RouteComponentProps, withRouter } from 'react-router-dom'
import TextArea from 'antd/es/input/TextArea'

import { AppDispatch, DispatchType } from '../../services/store/store'
import { editArticle, createArticle } from '../../services/store/articles-slice'
import { Article, RootState, API_BASE_URL } from '../../services/api/articles-api-types'
import FormTextField from '../form-components/form-text-field'
import TagsBlock from '../form-components/tags-block'
import { ITag, ITagable } from '../form-components/tags-block/tags-block'
import { ROOT_PATH, ARTICLES_PATH } from '../../services/routes/routes'

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

type HistoryType = RouteComponentProps['history']

const onSubmit = (dispatch: DispatchType, slug: string | undefined, history: HistoryType) => {
  return (data: IFormInput) => {
    const onlyNotEmptyTags = data.tags.filter((tag) => tag.tag.trim().length > 0)
    const tagsList = onlyNotEmptyTags.map((tag) => tag.tag)
    const article: Partial<Article> = {
      title: data.title,
      description: data.description,
      body: data.text,
      tagList: tagsList,
    }
    if (slug) {
      dispatch(editArticle({ ...article, slug: slug })).then((res) => {
        if (res.type === 'articles/editArticle/fulfilled') {
          history.push(`${ARTICLES_PATH}${slug}`)
        }
      })
    } else {
      dispatch(createArticle(article)).then((res) => {
        if (res.type === 'articles/createArticle/fulfilled') {
          history.push(ROOT_PATH)
        }
      })
    }
  }
}

type AsyncDefaultValues<TFieldValues> = (payload?: unknown) => Promise<TFieldValues>

const fetchArticle = async (slug: string | undefined): Promise<IFormInput> => {
  const res = await fetch(`${API_BASE_URL}/articles/${slug}`)
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
  const isEdit = Boolean(slug)
  const defaultTagsValue: ITag[] = [{ tag: '' }]
  const defaultValuesEmpty = { title: '', description: '', text: '', tags: defaultTagsValue }
  const defaultValues: DefaultValues<IFormInput> | AsyncDefaultValues<IFormInput> = isEdit
    ? async () => fetchArticle(slug)
    : defaultValuesEmpty

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: defaultValues,
  })

  useEffect(() => {
    if (!slug) {
      reset(defaultValuesEmpty)
    }
  }, [slug])

  const articlesState = useSelector((state: RootState) => state.articles)

  const dispatch = useDispatch<AppDispatch>()

  const [messageApi, contextHolder] = message.useMessage()
  useEffect(() => {
    if (articlesState.error) {
      messageApi.open({ type: 'error', content: articlesState.error })
    }
  }, [articlesState.error])

  return (
    <>
      {contextHolder}
      <form className={classes['edit-article-form']} onSubmit={handleSubmit(onSubmit(dispatch, slug, history))}>
        <div className={classes['edit-article-form__header']}>{isEdit ? 'Edit article' : 'Create new article'}</div>

        <div className={classes['edit-article__field']}>
          <FormTextField
            label={'Title'}
            name={'title'}
            validationRule={validationRules.title}
            error={errors.title?.message}
            control={control}
          />
        </div>

        <div className={classes['edit-article__field']}>
          <FormTextField
            label={'Short description'}
            name={'description'}
            validationRule={validationRules.description}
            error={errors.description?.message}
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
            <TextArea rows={6} style={{ resize: 'none' }} status={errors.text?.message ? 'error' : ''} {...field} />
          )}
        />
        <div className={classes['edit-article__validation-error']}>{errors.text?.message ?? ''}</div>

        <TagsBlock control={control as unknown as Control<ITagable>} />

        <Button
          type='primary'
          size='large'
          htmlType='submit'
          loading={articlesState.loading}
          className={classes['edit-article__button']}
        >
          Send
        </Button>
      </form>
    </>
  )
}

export default withRouter(EditArticleForm)
