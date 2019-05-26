import React from 'react'
import Notification from './Notification'
import Filter from './Filter'
import { addVote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'
import { hideNotification } from '../reducers/notificationReducer'


const AnecdoteList = ({ store }) => {
    const anecdotes = store.getState().anecdotes

    const vote = (anecdote) => {
        store.dispatch(addVote(anecdote))
        store.dispatch(showNotification(anecdote))
        setTimeout(() => store.dispatch(hideNotification()), 5000)
    }


    let anecdotesToDisplay = {}
    if (store.getState().filter.length > 0) {
        const filter = store.getState().filter.toLowerCase()
        anecdotesToDisplay = anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter))
    } else {
        anecdotesToDisplay = anecdotes
    }


    return (
        <div>
            <h2>Anecdotes</h2>
            {store.getState().notification.status && <Notification content={store.getState().notification.content} />}
            <Filter store={store} />
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

export default AnecdoteList
