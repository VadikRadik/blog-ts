import PostHeader from '../post-header'
import { Article } from '../../services/store/articles-slice'

import classes from './post-card.module.scss'

export interface PostCardProps {
  key: string
  article: Article
}

const PostCard: React.FC<PostCardProps> = ({ key, article }) => {
  return (
    <div key={key} className={`${classes['post-card']} ${classes['posts-list__card']}`}>
      <PostHeader isCard={true} article={article} />
      <div className={classes['post-card__description']}>
        {article.description}
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
        et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
        et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
        et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        consequat.
      </div>
    </div>
  )
}

export default PostCard
