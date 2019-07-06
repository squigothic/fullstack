import React from 'react'
import { connect } from 'react-redux'

import Filter from './Filter'
import { addVote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'
import { hideNotification } from '../reducers/notificationReducer'

const AnecdoteList = props => {
  const vote = anecdote => {
    props.addVote(anecdote)
    props.showNotification(anecdote)
    setTimeout(() => props.hideNotification(), 3000)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      {props.visibleAnecdotes
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  )
}

const anecdotesToDisplay = ({ anecdotes, filter }) => {
  if (filter.length > 0) {
    return anecdotes.filter(anecdote =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
    )
  } else {
    return anecdotes
  }
}

const mapStateToProps = state => {
  return {
    visibleAnecdotes: anecdotesToDisplay(state),
  }
}

const mapDispatchToProps = {
  addVote,
  showNotification,
  hideNotification,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)
