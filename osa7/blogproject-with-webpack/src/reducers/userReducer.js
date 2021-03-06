import { loginService } from '../services/users'
import blogService from '../services/blogs'
import { showNotification } from './notificationReducer'

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
      const user = await loginService(credentials)
      dispatch({
        type: 'LOGIN',
        data: user,
      })
      dispatch(showNotification(`logged in with username ${user.username}`, 4))
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)
    } catch (exception) {
      dispatch({
        type: 'LOGIN_FAILURE',
        data: null,
      })
      if (exception.message.includes('401')) {
        dispatch(showNotification('wrong username or password', 4))
      }

      if (exception.message.includes('500')) {
        dispatch(
          showNotification('something might be wrong with the server', 4)
        )
      }
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
