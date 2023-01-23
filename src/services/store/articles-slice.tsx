import { createSlice } from '@reduxjs/toolkit'
//const ARTICLES_PER_PAGE = 5

export interface Author {
  username: string
  bio?: string
  image: string
  following: boolean
}

export interface Article {
  slug: string
  title: string
  description: string
  body: string
  createdAt: string
  updatedAt: string
  tagList: string[]
  favorited: boolean
  favoritesCount: number
  author: Author
}

export interface ArticlesState {
  page: number
  articles: Article[]
}

export type RootState = {
  articles: ArticlesState
}

const initialState: ArticlesState = {
  page: 0,
  articles: [
    {
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
    },
    {
      slug: 'sdfgdsfg-cc38vi',
      title: 'sdfgdsfg',
      description: 'sdfgsdf',
      body: `# Hello, *world*! \nsdfgsdfg\n
      $$\\sqrt{3x-1}+(1+x)^2$$`,
      createdAt: '2023-01-19T17:09:15.715Z',
      updatedAt: '2023-01-19T17:28:03.815Z',
      tagList: [],
      favorited: false,
      favoritesCount: 1,
      author: {
        username: 'aaaaa',
        image: 'https://static.productionready.io/images/smiley-cyrus.jpg',
        following: false,
      },
    },
    {
      slug: 'asdfsdf-xr8awr',
      title: 'asdfsdf',
      description: 'asdfsdf',
      body: 'adsfsdf',
      createdAt: '2023-01-19T17:08:31.137Z',
      updatedAt: '2023-01-19T17:08:31.137Z',
      tagList: [],
      favorited: false,
      favoritesCount: 0,
      author: {
        username: 'aaaaa',
        image: 'https://static.productionready.io/images/smiley-cyrus.jpg',
        following: false,
      },
    },
    {
      slug: 'dth-5vo6cj',
      title: 'dth',
      description: 'dr',
      body: 'dhr',
      createdAt: '2023-01-19T15:10:21.032Z',
      updatedAt: '2023-01-19T15:10:21.032Z',
      tagList: [],
      favorited: false,
      favoritesCount: 0,
      author: {
        username: 'zxcv56',
        image: 'https://avatarzo.ru/wp-content/uploads/squid-game-anime.jpg',
        following: false,
      },
    },
    {
      slug: 'gweg-765ui9',
      title: 'gweg',
      description: 'wseg',
      body: 'egs',
      createdAt: '2023-01-19T15:06:26.826Z',
      updatedAt: '2023-01-19T15:06:26.826Z',
      tagList: [],
      favorited: false,
      favoritesCount: 0,
      author: {
        username: 'zxcv56',
        image: 'https://avatarzo.ru/wp-content/uploads/squid-game-anime.jpg',
        following: false,
      },
    },
  ],
}

export const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    getArticles(state, action) {
      //console.log(state)
      console.log(action)
      state.page = action.payload
    },
  },
})

export const { getArticles } = articlesSlice.actions

export default articlesSlice.reducer
