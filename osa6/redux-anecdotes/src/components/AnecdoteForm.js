import React from 'react'
import { connect } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = (props) => {
  const handleSubmit = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const returnedAnecdote = await anecdoteService.createAnecdote(content)
    props.newAnecdote(returnedAnecdote)
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
