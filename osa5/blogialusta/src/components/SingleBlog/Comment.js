import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  border-bottom: 1px solid #81d2f7;
  padding: 15px 0;
`

const Comment = ({ comment }) => {
  return <Wrapper>{comment}</Wrapper>
}

export default Comment
