import PostHeader from '../post-header'
import { Article } from '../../services/store/articles-slice'

import classes from './post-card.module.scss'

export interface PostCardProps {
  //key: string
  article: Article
}

const PostCard: React.FC<PostCardProps> = ({ article }) => {
  return (
    <div className={`${classes['post-card']} ${classes['posts-list__card']}`}>
      <PostHeader isCard={true} article={article} />
      <div className={classes['post-card__description']}>{article.description}</div>
    </div>
  )
}

export default PostCard
