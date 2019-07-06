import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_VOTE':
      const votedAnecdote = action.data
      const newState = state.map(anecdote =>
        anecdote.id === votedAnecdote.id ? votedAnecdote : anecdote
      )
      return newState
    case 'NEW_ANECDOTE':
      const anecdote = action.data
      return [...state, anecdote]
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export const addVote = anecdote => {
  return {
    type: 'NEW_VOTE',
    data: {
      content: anecdote.content,
      id: anecdote.id,
      votes: anecdote.votes + 1,
    },
  }
}

export const newAnecdote = data => {
  return {
    type: 'NEW_ANECDOTE',
    data,
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export default reducer
