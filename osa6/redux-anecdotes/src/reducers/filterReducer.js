const initialValue = {
    type: '',
    data: ''
}

const filterReducer = (state = initialValue, action) => {
    switch (action.type) {
        case 'CHANGE_FILTER':
            return action.data
        default:
            return state
    }
}

export const changeFilter = (newValue) => {
    return {
        type: 'CHANGE_FILTER',
        data: newValue
    }
}

export default filterReducer