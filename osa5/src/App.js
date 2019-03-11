import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import showNotification from './services/notification'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      showNotification(setNotificationMessage, `logged in as ${user.username}`)
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      showNotification(setNotificationMessage, `wrong username or password`)
    }
  }

  const clearLocalStorage = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }



  if (user === null) {
    return (
      <div>
        <Notification message={ notificationMessage } />
        <h2>Log in to application</h2>
        <form onSubmit={ login }>
          <div>
            username
          <input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
        </div>
        <div>
            password 
          <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
        </div>
        <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <Notification message={ notificationMessage } />
      <h2>Blogs</h2>

      <p>{user.username} logged in</p>
      <button onClick={ clearLocalStorage }>log out</button>
      <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      </div>
      <div>
        <NewBlog 
          blogs={ blogs } 
          updateBlogs={ setBlogs } 
          user={ user }
          setNotificationMessage={ setNotificationMessage }
          />
      </div>
    </div>
  )
}

export default App