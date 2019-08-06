import loginService from '../services/login'
import blogService from '../services/blogs'
import showNotification from './notificationReducer'

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.data
    case 'LOGOUT':
      return null
    case 'LOGIN_FAILURE':
      return null
    case 'SET_USER':
      return action.data
    default:
      return state
  }
}

export const loginUser = credentials => {
  return async dispatch => {
    try {
      const user = await loginService.login(credentials)
      dispatch({
        type: 'LOGIN',
        data: user,
      })
      console.log('uuuuser: ', user)
      dispatch(showNotification(`logged in with username ${user.username}`, 4))
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)
    } catch (exception) {
      console.log('error: ', exception)
      dispatch({
        type: 'LOGIN_FAILURE',
        data: null,
      })
    }
  }
}

export const setUser = user => ({
  type: 'SET_USER',
  data: user,
})

export const logoutUser = () => ({
  type: 'LOGOUT',
  data: null,
})

export default userReducer
