import React from 'react'
import { newAnecdote } from '../reducers/anecdoteReducer'

const AddAnecdote = ({ store }) => {
    const handleSubmit = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        store.dispatch(newAnecdote(content))
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

export default AddAnecdote