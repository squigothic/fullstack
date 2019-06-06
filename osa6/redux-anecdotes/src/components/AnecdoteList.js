import React from 'react'
import { connect } from 'react-redux'

import Filter from './Filter'
import { addVote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'
import { hideNotification } from '../reducers/notificationReducer'


const AnecdoteList = (props) => {
  const vote = (anecdote) => {
    props.addVote(anecdote)
    props.showNotification(anecdote)
    setTimeout(() => props.hideNotification(), 3000)
  }


  let anecdotesToDisplay = {}
  if (props.filter.length > 0) {
    const filter = props.filter.toLowerCase()
    anecdotesToDisplay = props.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter))
  } else {
    anecdotesToDisplay = props.anecdotes
  }


  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      {anecdotesToDisplay.sort((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const mapDispatchToProps = {
  addVote,
  showNotification,
  hideNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

