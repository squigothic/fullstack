import React from 'react'
import { addVote } from '../reducers/anecdoteReducer'

const AnecdoteList = ({ store }) => {
    const anecdotes = store.getState()

    const vote = (anecdote) => {
        store.dispatch(addVote(anecdote))
    }

    return (
        <div>
            <h2>Anecdotes</h2>
            {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
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

export default AnecdoteList


