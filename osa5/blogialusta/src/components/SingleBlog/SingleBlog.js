import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  updateBlogLikes,
  deleteBlog,
  addComment,
} from '../../reducers/blogReducer'
import CommentsSection from './CommentsSection'

const SingleBlog = ({
  blog,
  updateBlogLikes,
  user,
  deleteBlog,
  addComment,
}) => {
  const [redirect, setRedirect] = useState(false)
  const deleteBlogPost = id => {
    if (window.confirm('Are you sure about that?')) {
      deleteBlog(id)
      setRedirect(true)
    }
  }

  if (blog === undefined) {
    return null
  }

  if (redirect) {
    return <Redirect to="/" />
  }

  return (
    <div>
      <h3>{blog.title}</h3>
      <p>{blog.url}</p>
      <p>
        This blog has {blog.likes} likes{' '}
        <button onClick={() => updateBlogLikes(blog.id)}>like</button>
      </p>
      <p>Added by {blog.author}</p>
      {blog.user.id === user.id && (
        <button data-cy="delete-blog" onClick={() => deleteBlogPost(blog.id)}>
          Delete
        </button>
      )}
      <CommentsSection
        comments={blog.comments}
        addComment={addComment}
        id={blog.id}
      />
    </div>
  )
}

const mapStateToProps = (state, { id }) => {
  return {
    blog: state.blogs.find(blog => blog.id === id),
    user: state.user,
  }
}

const mapDispatchToProps = {
  updateBlogLikes,
  deleteBlog,
  addComment,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleBlog)
