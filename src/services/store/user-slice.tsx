// eslint-disable-next-line import/named
import { createSlice, createAsyncThunk, Draft } from '@reduxjs/toolkit'

import { userApi } from '../api/user-api'
import { PostUserResponse, UserCredentials, User, KnownError } from '../api/user-api-types'

export const postUser = createAsyncThunk<PostUserResponse, UserCredentials, { rejectValue: KnownError }>(
  'user/postUser',
  async (userCredentials: UserCredentials, { rejectWithValue }) => {
    const response = userApi
      .createUser(userCredentials)
      .then((res) => {
        return res.json().then((data) => ({ ok: res.ok, status: res.status, body: data }))
      })
      .then((data) => {
        if (data.ok) {
          return data.body
        } else {
          return rejectWithValue({
            message: `Unable to post a new user, responce status: ${data.status}`,
            body: data.body.errors,
          })
        }
      })
      .catch((error) => {
        return rejectWithValue({ message: `Unable to post a new user, error: ${error.message}` })
      })

    return response
  },
)

export const getUser = createAsyncThunk<PostUserResponse, void, { rejectValue: KnownError }>(
  'user/getUser',
  async (_, { rejectWithValue }) => {
    const response = await userApi
      .getUser()
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
  async (userCredentials: Partial<UserCredentials>, { rejectWithValue }) => {
    const response = await userApi
      .login(userCredentials)
      .then((res) => {
        return res.json().then((data) => ({ ok: res.ok, status: res.status, body: data }))
      })
      .then((data) => {
        if (data.ok) {
          return data.body
        } else {
          return rejectWithValue({
            message: `Unable to login user, responce status: ${data.status}`,
            body: data.body.errors,
          })
        }
      })
      .catch((error) => {
        return rejectWithValue({ message: `Unable to login user, error: ${error.message}` })
      })

    return response
  },
)

export const editUser = createAsyncThunk<PostUserResponse, Partial<User>, { rejectValue: KnownError }>(
  'user/editUser',
  async (user: Partial<User>, { rejectWithValue }) => {
    const response = await userApi
      .editUser(user)
      .then((res) => {
        if (res.ok) {
          return res.json()
        } else {
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
    resetError(state) {
      state.error = null
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
        window.localStorage.setItem('auth_token', action.payload.user.token)
        successUserState(state)
        updateUserState(state, action.payload.user)
      })
      .addCase(postUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload ?? null
      })
      // getUser
      .addCase(getUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getUser.fulfilled, (state, action) => {
        successUserState(state)
        updateUserState(state, action.payload.user)
      })
      .addCase(getUser.rejected, (state, action) => {
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
        window.localStorage.setItem('auth_token', action.payload.user.token)
        successUserState(state)
        updateUserState(state, action.payload.user)
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload ?? null
      })
      // edit
      .addCase(editUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(editUser.fulfilled, (state, action) => {
        successUserState(state)
        updateUserState(state, action.payload.user)
      })
      .addCase(editUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload ?? null
      })
  },
})

export const { logOut, resetError } = usersSlice.actions

export default usersSlice.reducer
