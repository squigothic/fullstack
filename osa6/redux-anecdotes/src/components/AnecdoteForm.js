import React from 'react'
import { connect } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
  const handleSubmit = (event) => {
    event.preventDefault()
    props.newAnecdote(event.target.anecdote.value)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <input name="anecdote" />
        <button type="submit">lisää</button>
      </form>
    </div>
  )
}

export default connect(
  null,
  { newAnecdote }
)(AnecdoteForm)
