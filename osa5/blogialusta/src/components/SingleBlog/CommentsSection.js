import React from 'react'
import styled from 'styled-components'
import Comment from './Comment'

const Wrapper = styled.div`
  margin-top: 25px;
  border-top: 1px solid black;
  width: 30%;
`
const Header = styled.div`
  font-size: 18px;
`

const Title = styled.h3`
  color: #81d2f7;
  margin-top: 10px;
`

const CommentsSection = ({ comments }) => {
  console.log('kommentit: ', comments)
  return (
    <Wrapper>
      <Header>
        <Title>Comments</Title>
      </Header>

      {comments.length > 0
        ? comments.map(comment => (
            <Comment key={comment.id} comment={comment.content} />
          ))
        : 'No comments to display'}
    </Wrapper>
  )
}
export default CommentsSection
