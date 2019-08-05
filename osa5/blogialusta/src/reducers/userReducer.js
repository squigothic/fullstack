const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.data
    case 'LOGOUT':
      return null
    default:
      return state
  }
}

export const getUser = user => {
  return {
    type: 'LOGIN',
    data: user,
  }
}

export const logoutUser = () => ({
    type: 'LOGOUT',
    data: null
})

export default userReducer
