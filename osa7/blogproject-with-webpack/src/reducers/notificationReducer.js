const initialState = {
  content: '',
  status: false,
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return { content: action.data.content, status: action.data.status }
    case 'HIDE_NOTIFICATION':
      return { content: null, status: false }
    default:
      return state
  }
}

export const showNotification = (messageToShow, timeout) => {
  return async dispatch => {
    setTimeout(
      () =>
        dispatch({
          type: 'HIDE_NOTIFICATION',
        }),
      timeout * 1000
    )
    dispatch({
      type: 'SHOW_NOTIFICATION',
      data: {
        content: messageToShow,
        status: true,
      },
    })
  }
}

export default notificationReducer
