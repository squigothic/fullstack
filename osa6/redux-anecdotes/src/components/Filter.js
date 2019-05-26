import React from 'react'
import { changeFilter } from '../reducers/filterReducer'

const Filter = ({ store }) => {
    const handleChange = (event) => {
        const filter = event.target.value
        store.dispatch(changeFilter(filter))
    }
    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input onChange={handleChange} />
        </div>
    )
}

export default Filter