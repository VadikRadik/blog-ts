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

interface UserState {
  email: string
  username: string
  bio: string
  image: string
  loading: boolean
  error: KnownError | null
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
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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
  },
})

export default usersSlice.reducer
