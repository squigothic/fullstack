import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const BlogWrapper = styled.div`
  margin-bottom: 10px;
  padding: 7px 5px;
  border: 1px solid;
  background: #93bbd3;
  text-decoration: none;
`

const BlogLink = styled(Link)`
  text-decoration: none;
`

const Blog = ({ blog }) => {
  return (
    <BlogWrapper>
      <BlogLink to={`/blogs/${blog.id}`}>
        {blog.title} {blog.author}
      </BlogLink>
    </BlogWrapper>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
