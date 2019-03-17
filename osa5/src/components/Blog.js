import React, { useState } from 'react'
const Blog = ({ blog }) => {
  const [expanded, setExpansion] = useState(false)

  const blogStyle = {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    
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
        <p onClick={() => setExpansion(!expanded)}>{blog.title} {blog.author}</p>
        <p>{blog.url}</p>
        <p>{blog.likes} <button onClick={() => console.log('kliccked')}>like</button></p>
        <p>{blog.user.name}</p>
      </div>
    </div>
  )
}

export default Blog