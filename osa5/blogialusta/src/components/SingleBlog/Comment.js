import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  border-top: 1px solid #81d2f7;
  padding: 15px 0;
`

const CommentText = styled.div`
  padding-left: 10px;
`

const Comment = ({ comment }) => {
  return (
    <Wrapper>
      <CommentText>{comment}</CommentText>
    </Wrapper>
  )
}

export default Comment
