// eslint-disable-next-line import/named
import { createSlice, createAsyncThunk, Draft } from '@reduxjs/toolkit'

interface User {
  email: string
  token: string
  username: string
  bio: string
  image: string
  password?: string
}

type KnownError = {
  body?: {
    username: string
    email: string
  }
  message: string
}

interface PostUserResponse {
  user: User
}

export interface UserCredentials {
  username: string
  email: string
  password: string
}

const API_BASE_URL = 'https://blog.kata.academy/api'

export const postUser = createAsyncThunk<PostUserResponse, UserCredentials, { rejectValue: KnownError }>(
  'user/postUser',
  async (user: UserCredentials, { rejectWithValue }) => {
    const response = await fetch(`${API_BASE_URL}/users`, {
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
    const response = await fetch(`${API_BASE_URL}/user`, {
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

export const loginUser = createAsyncThunk<PostUserResponse, Partial<UserCredentials>, { rejectValue: KnownError }>(
  'user/loginUser',
  async (user: Partial<UserCredentials>, { rejectWithValue }) => {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
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
            message: `Unable to login user, responce status: ${data.status}`,
            body: data.body.errors,
          })
        }
      })
      .catch((error) => {
        console.log(error)
        return rejectWithValue({ message: `Unable to login user, error: ${error.message}` })
      })

    return response
  },
)

export const editUser = createAsyncThunk<PostUserResponse, Partial<User>, { rejectValue: KnownError }>(
  'user/editUser',
  async (user: Partial<User>, { rejectWithValue }) => {
    const response = await fetch(`${API_BASE_URL}/user`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${window.localStorage.getItem('auth_token')}`,
      },
      body: JSON.stringify({ user: user }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        } else {
          console.log(res)
          return rejectWithValue({ message: `Unable to edit user, responce status: ${res.status}` })
        }
      })
      .catch((error) => {
        return rejectWithValue({ message: `Unable to edit user, error: ${error.message}` })
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

const updateUserState = (state: Draft<UserState>, user: User) => {
  state.email = user.email
  state.username = user.username
  state.bio = user.bio
  state.image = user.image
}

const successUserState = (state: Draft<UserState>) => {
  state.loading = false
  state.error = null
  state.isLoggedIn = true
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
        window.localStorage.setItem('auth_token', action.payload.user.token)
        successUserState(state)
        updateUserState(state, action.payload.user)
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
        successUserState(state)
        updateUserState(state, action.payload.user)
      })
      .addCase(getUser.rejected, (state, action) => {
        console.log(action)
        state.loading = false
        state.error = action.payload ?? null
        state.isLoggedIn = false
        window.localStorage.setItem('auth_token', '')
      })
      // login
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log(action)
        window.localStorage.setItem('auth_token', action.payload.user.token)
        successUserState(state)
        updateUserState(state, action.payload.user)
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log(action)
        state.loading = false
        state.error = action.payload ?? null
      })
      // edit
      .addCase(editUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(editUser.fulfilled, (state, action) => {
        console.log(action)
        successUserState(state)
        updateUserState(state, action.payload.user)
      })
      .addCase(editUser.rejected, (state, action) => {
        console.log(action)
        state.loading = false
        state.error = action.payload ?? null
      })
  },
})

export const { logOut } = usersSlice.actions

export default usersSlice.reducer
