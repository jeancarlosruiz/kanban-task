import Cookies from 'js-cookie'
export const tokenKey = 'auth'

export const getToken = () => {
  //   if (typeof window !== 'undefined') return localStorage.getItem(tokenKey)
  return Cookies.get(tokenKey)
}

export const setToken = (token: string) => {
  //   if (typeof window !== 'undefined') {
  //     return localStorage.setItem(tokenKey, token)
  //   }

  return Cookies.set(tokenKey, token)
}

export const isAuth = () => Boolean(getToken())
