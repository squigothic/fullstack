import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

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

      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )

      setUser(user)
      console.log('kirjauduttiin sisään käyttäjänä: ', user)
      setUsername('')
      setPassword('')
    } catch (exception) {
        console.log('tässä näytetään myöhemmin virheilmoitus, jonka sisältöä on ', exception)
    }
  }

  const clearLocalStorage = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={login}>
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
      <h2>blogs</h2>

      <p>{user.username} logged in</p>
      <button onClick={ clearLocalStorage }>log out</button>
      <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      </div>
    </div>
  )
}

export default App