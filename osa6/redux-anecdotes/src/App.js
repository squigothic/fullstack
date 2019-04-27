import React from 'react'
import { addVote } from './reducers/anecdoteReducer'
import AddAnecdote from './components/AddAnecdote'

const App = (props) => {
  const store = props.store
  const anecdotes = store.getState()

  const vote = (anecdote) => {
    store.dispatch(addVote(anecdote))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
      <AddAnecdote store={store}/>
    </div>
  )
}

export default App
