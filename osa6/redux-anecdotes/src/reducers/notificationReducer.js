const initialState = {
    content: '',
    status: false
}

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SHOW_NOTIFICATION':
            return { content: action.data.content, status: action.data.status }
        case 'HIDE_NOTIFICATION':
            return { show: action.data.status }
        default:
            return state
    }
}

export const showNotification = messageToShow => {
    return {
        type: 'SHOW_NOTIFICATION',
        data: {
            content: messageToShow,
            status: true
        }
    }
}

export const hideNotification = () => {
    return {
        type: 'HIDE_NOTIFICATION',
        data: {
            content: null,
            status: false
        }
    }
}

export default notificationReducer