import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './components/Login'
import Frontpage from './components/Frontpage'
import UserList from './components/UserList'
import Header from './components/Header/Header'
import SingleUser from './components/SingleUser'
import SingleBlog from './components/SingleBlog'

import {
  initializeBlogs,
  newBlog,
  updateBlogLikes,
  deleteBlog,
} from './reducers/blogReducer'
import { loginUser, setUser } from './reducers/userReducer'
import { fetchUserList } from './reducers/userListReducer'
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
    if (props.users.length === 0) {
      props.fetchUserList()
    }
  }, [])

  const login = async event => {
    event.preventDefault()
    await props.loginUser({
      username: username.input.value,
      password: password.input.value,
    })
  }

  if (!props.user) {
    return (
      <Login
        notification={props.notification}
        doLogin={login}
        username={username}
        password={password}
      />
    )
  }

  return (
    <Router>
      <div>
        <Header />
        <Route
          exact
          path="/"
          render={() => <Frontpage user={props.user} blogs={props.blogs} />}
        />
        <Route exact path="/users" render={() => <UserList />} />
        <Route
          exact
          path="/users/:id"
          render={({ match }) => <SingleUser id={match.params.id} />}
        />
        <Route
          exact
          path="/blogs/:id"
          render={({ match }) => <SingleBlog id={match.params.id} />}
        />
      </div>
    </Router>
  )
}

const mapStateToProps = state => {
  return {
    notification: state.notification,
    blogs: state.blogs,
    user: state.user,
    users: state.userList,
  }
}

const mapDispatchToProps = {
  initializeBlogs,
  newBlog,
  updateBlogLikes,
  deleteBlog,
  loginUser,
  setUser,
  fetchUserList,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
