import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

interface ResponseUser {
  email: string
  token: string
  username: string
  bio: string
  image: string
}

type KnownError = {
  body?: {
    username: string
    email: string
  }
  message: string
}

interface PostUserResponse {
  user: ResponseUser
}

export interface UserCredentials {
  username: string
  email: string
  password: string
}

export const postUser = createAsyncThunk<PostUserResponse, UserCredentials, { rejectValue: KnownError }>(
  'user/postUser',
  async (user: UserCredentials, { rejectWithValue }) => {
    const response = await fetch('https://blog.kata.academy/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ user: user }),
    })
      .then((res) => {
        return res.json().then((data) => ({ ok: res.ok, status: res.status, body: data }))
      })
      .then((data) => {
        if (data.ok) {
          return data.body
        } else {
          console.log(data.body)
          return rejectWithValue({
            message: `Unable to post a new user, responce status: ${data.status}`,
            body: data.body.errors,
          })
        }
      })
      .catch((error) => {
        console.log(error)
        return rejectWithValue({ message: `Unable to post a new user, error: ${error.message}` })
      })

    return response
  },
)

export const getUser = createAsyncThunk<PostUserResponse, void, { rejectValue: KnownError }>(
  'user/getUser',
  async (_, { rejectWithValue }) => {
    console.log('request sent')
    const response = await fetch('https://blog.kata.academy/api/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${window.localStorage.getItem('auth_token')}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        } else {
          return rejectWithValue({ message: `Unable to get user, responce status: ${res.status}` })
        }
      })
      .catch((error) => {
        return rejectWithValue({ message: `Unable to get user, error: ${error.message}` })
      })

    return response
  },
)

interface UserState {
  email: string
  username: string
  bio: string
  image: string
  loading: boolean
  error: KnownError | null
  isLoggedIn: boolean
}

export type RootState = {
  users: UserState
}

const initialState: UserState = {
  email: '',
  username: '',
  bio: '',
  image: '',
  loading: false,
  error: null,
  isLoggedIn: false,
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    logOut(state) {
      state.isLoggedIn = false
      window.localStorage.setItem('auth_token', '')
    },
  },
  extraReducers: (builder) => {
    builder
      // postUser
      .addCase(postUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(postUser.fulfilled, (state, action) => {
        console.log(action)
        state.loading = false
        state.email = action.payload.user.email
        state.username = action.payload.user.username
        state.bio = action.payload.user.bio
        state.image = action.payload.user.image
        window.localStorage.setItem('auth_token', action.payload.user.token)
        state.error = null
      })
      .addCase(postUser.rejected, (state, action) => {
        console.log(action)
        state.loading = false
        state.error = action.payload ?? null
      })
      // getUser
      .addCase(getUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getUser.fulfilled, (state, action) => {
        console.log(action)
        state.loading = false
        state.email = action.payload.user.email
        state.username = action.payload.user.username
        state.bio = action.payload.user.bio
        state.image = action.payload.user.image
        state.error = null
        state.isLoggedIn = true
        console.log('logged in')
      })
      .addCase(getUser.rejected, (state, action) => {
        console.log(action)
        state.loading = false
        state.error = action.payload ?? null
        state.isLoggedIn = false
        window.localStorage.setItem('auth_token', '')
        console.log('logged out')
      })
  },
})

export const { logOut } = usersSlice.actions

export default usersSlice.reducer
