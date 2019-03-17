import React, { useState } from 'react'

const Blog = ({ blog, updateBlogLikes, deleteBlog }) => {
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
        <div onClick={() => setExpansion(!expanded)}>
          {blog.title} {blog.author}
        </div>
      </div>
    )
  }

  return (
    <div style={blogStyle}>
      <div>
        <div style={titleStyle} onClick={() => setExpansion(!expanded)}>
          <p>{blog.title} {blog.author}</p>
        </div>
        <p>{blog.url}</p>
        <p>{blog.likes} <button onClick={() => updateBlogLikes(blog.id)}>like</button></p>
        <p>{blog.user.name}</p>
        <button onClick={() => deleteBlog(blog.id)}>Delete</button>
      </div>
    </div>
  )
}

export default Blog