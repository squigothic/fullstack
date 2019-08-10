import React from 'react'
import { connect } from 'react-redux'

import Blog from './Blog'
import NewBlog from './NewBlog'
import Notification from './Notification'
import { newBlog, updateBlogLikes, deleteBlog } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'
import { logoutUser } from '../reducers/userReducer'
import { useField } from '../hooks/index'
import '../index.css'
import Togglable from './Togglable'

const Frontpage = ({
  newBlog,
  updateBlogLikes,
  deleteBlog,
  logoutUser,
  user,
  blogs,
  notification,
}) => {
  const title = useField('text')
  const url = useField('text')
  const author = useField('text')

  const blogFormRef = React.createRef()

  const clearLocalStorage = () => {
    window.localStorage.removeItem('loggedBlogUser')
    logoutUser()
  }

  const updateLikes = async id => {
    updateBlogLikes(id)
  }

  const deleteBlogPost = id => {
    console.log('ollaan poistamassa blogia ', id)
    if (window.confirm('Are you sure about that?')) {
      deleteBlog(id, user)
    }
  }

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
      <div id="top">
        <div className="title">
          <h2>Blogs</h2>
        </div>
        <div id="userinfo">
          <p>{user.username} logged in</p>
          <button onClick={clearLocalStorage}>log out</button>
        </div>
      </div>

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
      <div>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map(blog => (
            <Blog
              key={blog.id}
              blog={blog}
              updateBlogLikes={updateLikes}
              deleteBlog={deleteBlogPost}
              user={user}
            />
          ))}
      </div>
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
  updateBlogLikes,
  deleteBlog,
  showNotification,
  logoutUser,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Frontpage)
