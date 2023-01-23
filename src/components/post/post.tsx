import { useSelector } from 'react-redux'

import PostHeader from '../post-header'
import { Article, RootState } from '../../services/store/articles-slice'

import classes from './post.module.scss'

const testArticle: Article = {
  slug: 'title-w2wr0e',
  title: 'title3',
  description: 'description3',
  body: 'sdfsdfsdfsdf3',
  createdAt: '2023-01-19T17:50:07.228Z',
  updatedAt: '2023-01-20T09:05:34.893Z',
  tagList: ['qqq3', 'www3', ''],
  favorited: false,
  favoritesCount: 0,
  author: {
    username: 'banditpro',
    bio: '',
    image: 'https://www.blast.hk/attachments/68493/',
    following: false,
  },
}

export interface PostProps {
  slug: string
}

const useArticle = (slug: string): Article | undefined => {
  const articles = useSelector((state: RootState) => state.articles.articles)
  return articles.find((a) => a.slug === slug)
}

const Post: React.FC<PostProps> = ({ slug }) => {
  const article = useArticle(slug)
  return (
    <div className={classes['post']}>
      <PostHeader isCard={false} article={testArticle} />
      <div className={classes['post__description']}>
        {article?.description}
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
      <div className={classes['post__text']}>
        Est Ampyciden pater patent Amor saxa inpiger Lorem markdownum Stygias neque is referam fudi, breve per. Et
        Achaica tamen: nescia ista occupat, illum se ad potest humum et. Qua deos has fontibus Recens nec ferro
        responsaque dedere armenti opes momorderat pisce, vitataque et fugisse. Et iamque incipiens, qua huius suo omnes
        ne pendentia citus pedum. Quamvis pronuba Ulli labore facta. Io cervis non nosterque nullae, vides: aethere
        Delphice subit, tamen Romane ob cubilia Rhodopen calentes librata! Nihil populorum flava, inrita? Sit hic nunc,
        hoc formae Esse illo? Umeris eram similis, crudelem de est relicto ingemuit finiat Pelia uno cernunt Venus
        draconem, hic, Methymnaeae. 1. Clamoribus haesit tenentem iube Haec munera 2. Vincla venae 3. Paris includere
        etiam tamen 4. Superi te putria imagine Deianira 5. Tremore hoste Esse sed perstat capillis siqua
      </div>
    </div>
  )
}

export default Post
