import React from 'react'
import styled from 'styled-components'
import Comment from './Comment'
import AddComments from './AddComment'

const Wrapper = styled.div`
  margin-top: 25px;
  border: 1px solid black;
  width: 40%;
  padding: 0 10px;
`
const Header = styled.div`
  font-size: 18px;
`

const Title = styled.h3`
  color: #81d2f7;
  margin-top: 10px;
`

const CommentsSection = ({ comments, addComment, id }) => {
  return (
    <Wrapper>
      <Header>
        <Title>Comments</Title>
      </Header>
      <AddComments addComment={addComment} id={id} />
      {comments.length > 0
        ? comments.map(comment => (
            <Comment key={comment.id} comment={comment.content} />
          ))
        : 'No comments to display'}
    </Wrapper>
  )
}
export default CommentsSection
