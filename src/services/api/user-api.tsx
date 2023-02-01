import { API_BASE_URL, UserCredentials, User } from './user-api-types'

export const createUser = async (user: UserCredentials) => {
  return await fetch(`${API_BASE_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ user: user }),
  })
}

export const getUser = async () => {
  return await fetch(`${API_BASE_URL}/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${window.localStorage.getItem('auth_token')}`,
    },
  })
}

export const login = async (user: Partial<UserCredentials>) => {
  return await fetch(`${API_BASE_URL}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ user: user }),
  })
}

export const editUser = async (user: Partial<User>) => {
  return await fetch(`${API_BASE_URL}/user`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${window.localStorage.getItem('auth_token')}`,
    },
    body: JSON.stringify({ user: user }),
  })
}

export * as userApi from './user-api'
