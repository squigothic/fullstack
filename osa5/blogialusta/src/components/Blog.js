import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const BlogWrapper = styled.div`
  margin-bottom: 10px;
  padding: 7px 5px;
  border: 1px solid;
  background: #93bbd3;
  flex: 1;
  width: 32%;
`
const TextWrapper = styled.div`
  width: 50%;
`
const BlogLink = styled(Link)`
  text-decoration: none;
`

const ImageWrapper = styled.div`
  width: 50%;
`

const Blog = ({ blog }) => {
  return (
    <BlogWrapper>
      <ImageWrapper>
        <img src="https://picsum.photos/300/300" alt="random content Picsum" />
      </ImageWrapper>
      <BlogLink to={`/blogs/${blog.id}`}>
        <TextWrapper data-cy="link-to-blog">
          {blog.title} {blog.author}
        </TextWrapper>
      </BlogLink>
    </BlogWrapper>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
