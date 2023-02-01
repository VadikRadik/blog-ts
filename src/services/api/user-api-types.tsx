export interface User {
  email: string
  token: string
  username: string
  bio: string
  image: string
  password?: string
}

export type KnownError = {
  body?: {
    username: string
    email: string
  }
  message: string
}

export interface PostUserResponse {
  user: User
}

export interface UserCredentials {
  username: string
  email: string
  password: string
}

export const API_BASE_URL = 'https://blog.kata.academy/api'
