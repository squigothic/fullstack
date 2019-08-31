import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: inline-block;
  border-bottom: 1px solid #81d2f7;
  padding-right: 20px;
  padding-bottom: 5px;
`

const Comment = ({ comment }) => {
  return <Wrapper>{comment}</Wrapper>
}

export default Comment
