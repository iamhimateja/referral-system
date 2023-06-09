import md5 from 'md5'
import { ProtectedRoute } from './ProtectedRoute'
import { theme } from './theme'
import API from './api'

export const validateEmail = (email: string) => {
  const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
  return regex.test(email)
}

export const redirectToHome = () => window.location.replace('/')

// © material-ui
export function stringToColor(string: string) {
  let hash = 0
  let i

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash)
  }

  let color = '#'

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff
    color += `00${value.toString(16)}`.slice(-2)
  }

  return color
}

// © material-ui + some modifications
export function stringAvatar(name: string) {
  const nameSplit = String(name).split(' ')
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: (nameSplit.length === 1 ? `${nameSplit[0][0]}` : `${nameSplit[0][0]}${nameSplit[1][0]}`).toUpperCase(),
  }
}

export const getGravatarAvatar = (email, size = 200) => {
  let hash
  if (email) {
    const emailTrimmed = email?.trim()?.toLowerCase()
    hash = md5(emailTrimmed)
  }
  const url = `https://www.gravatar.com/avatar/${hash ?? ''}?s=${size}?d=identicon`
  return url
}

const api = new API()

export { ProtectedRoute, theme, api }
