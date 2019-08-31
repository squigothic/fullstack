import React, { useState } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div``

const AddComments = ({ addComment, id }) => {
  const [formtext, setFormText] = useState('add a comment...')

  const handleSubmit = event => {
    event.preventDefault()
    addComment(id, formtext)
    setFormText('')
  }

  const handleFormChange = event => {
    setFormText(event.target.value)
  }

  const handleInputClick = () => {
    if (formtext === 'add a comment...') {
      setFormText('')
    }
  }

  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <input
          value={formtext}
          onChange={handleFormChange}
          onClick={handleInputClick}
          type="text"
        />
        <button type="submit">Add</button>
      </form>
    </Wrapper>
  )
}

export default AddComments
