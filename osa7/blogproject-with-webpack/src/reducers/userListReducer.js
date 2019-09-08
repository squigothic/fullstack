import { getAllUsers } from '../services/users'

const userListReducer = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_USERLIST':
      return action.data
    default:
      return state
  }
}

export default userListReducer

export const fetchUserList = () => {
  return async dispatch => {
    try {
      const userList = await getAllUsers()
      dispatch({
        type: 'FETCH_USERLIST',
        data: userList,
      })
    } catch (err) {
      console.log('error: ', err)
    }
  }
}
