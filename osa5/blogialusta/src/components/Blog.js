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
  width: 33%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
const TextWrapper = styled.div`
  width: 320px;
  padding-top: 7px;
  color: black;
`
const BlogLink = styled(Link)`
  text-decoration: none;
`

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const BlogTitle = styled.div`
  font-size: 22px;
  font-family: 'Helvetica';
`

const Blog = ({ blog }) => {
  return (
    <BlogWrapper>
      <ImageWrapper>
        <img src="https://picsum.photos/320/250" alt="random content Picsum" />
      </ImageWrapper>
      <BlogLink to={`/blogs/${blog.id}`}>
        <TextWrapper>
          <BlogTitle>{blog.title}</BlogTitle>
          {blog.author}
        </TextWrapper>
      </BlogLink>
    </BlogWrapper>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
