export const fetchApi = async (url: string, method: string, body = '') => {
  const isLoggedIn = Boolean(window.localStorage.getItem('auth_token'))
  const loggedInHeader = {
    'Content-Type': 'application/json;charset=utf-8',
    Authorization: `Bearer ${window.localStorage.getItem('auth_token')}`,
  }
  const header = { 'Content-Type': 'application/json;charset=utf-8' }

  const fetchParams = {
    method: method,
    headers: isLoggedIn ? { ...loggedInHeader } : { ...header },
    ...(body && { body: body }),
  }

  return await fetch(url, fetchParams)
}
