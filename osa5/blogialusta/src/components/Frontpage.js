import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import Blog from './Blog'
import NewBlog from './NewBlog'
import Notification from './Notification'
import { newBlog } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'
import { logoutUser } from '../reducers/userReducer'
import { useField } from '../hooks/index'

import Togglable from './Togglable'

const BlogWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const Frontpage = ({ newBlog, deleteBlog, user, blogs, notification }) => {
  const title = useField('text')
  const url = useField('text')
  const author = useField('text')

  const blogFormRef = React.createRef()

  const createNewBlog = async event => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    const newBlogObject = {
      title: title.input.value,
      author: author.input.value,
      url: url.input.value,
    }
    showNotification('created a new blog', 4)
    newBlog(newBlogObject, user)
    title.reset()
    author.reset()
    url.reset()
  }

  return (
    <div>
      {notification.status === true && (
        <Notification message={notification.content} />
      )}

      <div>
        <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
          <NewBlog
            title={title}
            url={url}
            author={author}
            handleSubmit={createNewBlog}
          />
        </Togglable>
      </div>
      <BlogWrapper>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map(blog => (
            <Blog key={blog.id} blog={blog} />
          ))}
      </BlogWrapper>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    notification: state.notification,
  }
}

const mapDispatchToProps = {
  newBlog,
  showNotification,
  logoutUser,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Frontpage)
