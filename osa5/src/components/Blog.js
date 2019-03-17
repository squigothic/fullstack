import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, updateBlogLikes }) => {
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

  //console.log('User: ', blog.user)
  //console.log('Bloglikes: ', updateBlogLikes)
  
  const updateBlog = async () => {
    const response = await blogService.update(blog.id)
    updateBlogLikes(response.id, response)
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
        <p>{blog.likes} <button onClick={() => updateBlog()}>like</button></p>
        <p>{blog.user.name}</p>
      </div>
    </div>
  )
}

export default Blog