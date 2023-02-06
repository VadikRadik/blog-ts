import { API_BASE_URL, UserCredentials, User } from './user-api-types'
import { fetchApi } from './api'

export const createUser = async (user: UserCredentials) => {
  return await fetchApi(`${API_BASE_URL}/users`, 'POST', JSON.stringify({ user: user }))
}

export const getUser = async () => {
  return await fetchApi(`${API_BASE_URL}/user`, 'GET')
}

export const login = async (user: Partial<UserCredentials>) => {
  return await fetchApi(`${API_BASE_URL}/users/login`, 'POST', JSON.stringify({ user: user }))
}

export const editUser = async (user: Partial<User>) => {
  return await fetchApi(`${API_BASE_URL}/user`, 'PUT', JSON.stringify({ user: user }))
}

export * as userApi from './user-api'
