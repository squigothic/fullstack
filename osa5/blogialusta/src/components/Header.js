import React from 'react'
import { connect } from 'react-redux'
import '../index.css'
import { logoutUser } from '../reducers/userReducer'

const Header = ({ user, logoutUser }) => {
  const clearLocalStorage = () => {
    window.localStorage.removeItem('loggedBlogUser')
    logoutUser()
    console.log('yritetään logouttia...')
  }
  return (
    <div id="top">
      <div className="title">
        <h2>Blogs</h2>
      </div>
      <div id="userinfo">
        <p>{user.username} logged in</p>
        <button onClick={clearLocalStorage}>log out</button>
      </div>
    </div>
  )
}

const mapDispatchToProps = {
  logoutUser,
}

export default connect(
  null,
  mapDispatchToProps
)(Header)
