import { Button, Input } from 'antd'
import { Controller, Control, useFieldArray } from 'react-hook-form'

import classes from './tags-block.module.scss'

export interface ITag {
  tag: string
}

export interface ITagable {
  tags: ITag[]
}

export interface TagsBlockProps {
  control: Control<ITagable>
}

export const TagsBlock = ({ control }: TagsBlockProps) => {
  const {
    fields: tagFields,
    append: tagAppend,
    remove: tagRemove,
  } = useFieldArray<ITagable, 'tags', 'id'>({ control: control, name: 'tags' })

  return (
    <>
      <label htmlFor='tags' className={classes['edit-article__label']}>
        Tags
      </label>
      <div className={classes['edit-article__tags-wrapper']}>
        <div className={classes['edit-article__tags-fields-wrapper']}>
          {tagFields.map((item, index) => {
            return (
              <div key={`${item.tag}-${index}`} className={classes['edit-article__tags-field']}>
                <Controller
                  name={`tags.${index}.tag`}
                  control={control}
                  render={({ field }) => (
                    <Input placeholder='Tag' {...field} className={classes['edit-article__tag-input']} />
                  )}
                />
                <Button
                  type='primary'
                  danger
                  ghost
                  className={classes['edit-article__tag-delete']}
                  onClick={() => tagRemove(index)}
                >
                  Delete
                </Button>
              </div>
            )
          })}
        </div>
        <Button
          type='primary'
          ghost
          className={classes['edit-article__tag-add']}
          onClick={() => {
            tagAppend({ tag: '' })
          }}
        >
          Add Tag
        </Button>
      </div>
    </>
  )
}
