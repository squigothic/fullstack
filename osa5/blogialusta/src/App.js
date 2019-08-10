import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
} from 'react-router-dom'

import Login from './components/Login'
import Frontpage from './components/Frontpage'

import {
  initializeBlogs,
  newBlog,
  updateBlogLikes,
  deleteBlog,
} from './reducers/blogReducer'
import { loginUser, logoutUser, setUser } from './reducers/userReducer'
import { useField } from './hooks/index'

const App = props => {
  const username = useField('text')
  const password = useField('password')


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      props.setUser(user)
    }
    props.initializeBlogs()
  }, [])

  const login = async event => {
    event.preventDefault()
    await props.loginUser({
      username: username.input.value,
      password: password.input.value,
    })
  }

  return (
    <div>
      {props.user === null ? (
        <Login
          notification={props.notification}
          doLogin={login}
          username={username}
          password={password}
        />
      ) : (
        <Frontpage user={props.user} blogs={props.blogs} />
      )}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    notification: state.notification,
    blogs: state.blogs,
    user: state.user,
  }
}

const mapDispatchToProps = {
  initializeBlogs,
  newBlog,
  updateBlogLikes,
  deleteBlog,
  loginUser,
  logoutUser,
  setUser,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
