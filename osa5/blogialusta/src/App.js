import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Login from './components/Login'
import './index.css'
import Togglable from './components/Togglable'
import { useField } from './hooks/index'
import { showNotification } from './reducers/notificationReducer'
import {
  initializeBlogs,
  newBlog,
  updateBlogLikes,
  deleteBlog,
} from './reducers/blogReducer'

const App = props => {
  const [user, setUser] = useState(null)
  const username = useField('text')
  const password = useField('password')
  const title = useField('text')
  const url = useField('text')
  const author = useField('text')

  const blogFormRef = React.createRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
    props.initializeBlogs()
  }, [])

  const login = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.input.value,
        password: password.input.value,
      })

      props.showNotification(`logged in as ${user.username}`, 4)
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      console.log('virhe: ', exception)

      showNotification('wrong username or password', 4)
    }
  }

  const clearLocalStorage = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }

  const updateBlogLikes = async id => {
    props.updateBlogLikes(id)
  }

  const deleteBlog = id => {
    console.log('ollaan poistamassa blogia ', id)
    if (window.confirm('Are you sure about that?')) {
      props.deleteBlog(id, user)
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
    props.showNotification('created a new blog', 4)
    props.newBlog(newBlogObject, user)
    title.reset()
    author.reset()
    url.reset()
  }

  if (user === null) {
    return (
      <Login
        doLogin={login}
        username={username}
        password={password}
        notificationMessage={props.notificationMessage}
      />
    )
  }

  return (
    <div>
      {props.notification.status === true && (
        <Notification message={props.notification.content} />
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
        {props.blogs
          .sort((a, b) => b.likes - a.likes)
          .map(blog => (
            <Blog
              key={blog.id}
              blog={blog}
              updateBlogLikes={updateBlogLikes}
              deleteBlog={deleteBlog}
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
    blogs: state.blogs,
  }
}

const mapDispatchToProps = {
  showNotification,
  initializeBlogs,
  newBlog,
  updateBlogLikes,
  deleteBlog,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
