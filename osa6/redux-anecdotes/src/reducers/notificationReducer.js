const initialState = {
    content: 'awdawdawd',
    status: false
}

const notificationReducer = (state = initialState, action) => {
    //console.log('actionin tyyppi: ', action.type)
    switch (action.type) {
        case 'SHOW_NOTIFICATION':
            //console.log('osui paskaan', action.data)
            return { content: action.data.content, status: action.data.status }
        case 'HIDE_NOTIFICATION':
            //console.log('toinen pasksa')
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