import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import showNotification from './services/notification'
import Blog from './components/Blog'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Login from './components/Login'
import './index.css'
import Togglable from './components/Togglable'
import { useField } from './hooks/index'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const username = useField('text')
  const password = useField('password')
  const [notificationMessage, setNotificationMessage] = useState(null)

  const blogFormRef = React.createRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((a, b) => b.likes - a.likes))
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username: username.value, password: password.value })

      showNotification(setNotificationMessage, `logged in as ${user.username}`)
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      username.setValue('')
      password.setValue('')
    } catch (exception) {
      console.log('virhe: ', exception)

      showNotification(setNotificationMessage, 'wrong username or password')
    }
  }

  const clearLocalStorage = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }

  const updateBlogLikes = async (id) => {
    const response = await blogService.update(id)
    const modifiedBlogs = blogs.filter(blog => blog.id !== id)
    modifiedBlogs.push(response)
    setBlogs(modifiedBlogs.sort((a, b) => b.likes - a.likes))
  }

  const deleteBlog = (id) => {
    console.log('ollaan poistamassa blogia ', id)
    if (window.confirm('Are you sure about that?')) {
      blogService.setToken(user.token)
      blogService.deleteBlog(id)
      setBlogs(blogs.filter(blog => blog.id !== id))
    }
  }

  if (user === null) {
    return (
      <Login
        doLogin={login}
        username={username}
        password={password}
        notificationMessage={notificationMessage}
      />
    )
  }

  return (
    <div>
      <Notification message={notificationMessage} />
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
            blogs={blogs}
            updateBlogs={setBlogs}
            user={user}
            setNotificationMessage={setNotificationMessage}
            toggleVisibility={() => blogFormRef.current.toggleVisibility()}
          />
        </Togglable>
      </div>
      <div>
        {blogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            updateBlogLikes={updateBlogLikes}
            deleteBlog={deleteBlog}
            user={user}
          />
        )}
      </div>
    </div>
  )
}

export default App
