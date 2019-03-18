import React from 'react'
import Notification from '../components/Notification'
import '../index.css'

const Login = ({
  doLogin,
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
  notificationMessage }) => {

  return (
    <div>
      <Notification message={ notificationMessage } />
      <h2>Log in to application</h2>
      <form onSubmit={ doLogin }>
        <div>
        username
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
        password
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default Login