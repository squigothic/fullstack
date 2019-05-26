import React from 'react'
import Notification from './Notification'
import { addVote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'
import { hideNotification } from '../reducers/notificationReducer'


const AnecdoteList = ({ store }) => {
    const anecdotes = store.getState().anecdotes
    console.log('anekdootit: ', anecdotes)

    const vote = (anecdote) => {
        //console.log('votetaan...')
        store.dispatch(addVote(anecdote))
        store.dispatch(showNotification(anecdote))
        setTimeout(() => store.dispatch(hideNotification()), 5000)
    }

    return (
        <div>
            <h2>Anecdotes</h2>
            {console.log('notifikaation tila ', store.getState().notification.content)}
            {store.getState().notification.status && <Notification content={store.getState().notification.content} />}
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
