import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlogLikes, deleteBlog, user }) => {
  const [expanded, setExpansion] = useState(false)

  const blogStyle = {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,

  }

  const titleStyle = {
    backgroundColor: '#93BBD3'
  }

  if (expanded === false) {
    return (
      <div style={blogStyle}>
        <div className="clickableDiv" onClick={() => setExpansion(!expanded)}>
          {blog.title} {blog.author}
        </div>
      </div>
    )
  }

  return (
    <div style={blogStyle}>
      <div className="extendedDiv">
        <div style={titleStyle} onClick={() => setExpansion(!expanded)}>
          <p>{blog.title} {blog.author}</p>
        </div>
        <p>{blog.url}</p>
        <p>{blog.likes} <button onClick={() => updateBlogLikes(blog.id)}>like</button></p>
        <p>{blog.user.name}</p>
        {blog.user.id === user.id &&
          <button onClick={() => deleteBlog(blog.id)}>Delete</button>
        }
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  updateBlogLikes: PropTypes.func,
  deleteBlog: PropTypes.func
}

export default Blog
