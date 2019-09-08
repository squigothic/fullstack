import React from 'react'
import '../index.css'
import Notification from './Notification'

const Login = ({ notification, doLogin, username, password }) => {
  return (
    <div>
      {notification.status === true && (
        <Notification message={notification.content} />
      )}
      <h2>Log in to application</h2>
      <form onSubmit={doLogin}>
        <div>
          username
          <input {...username.input} data-cy="username" />
        </div>
        <div>
          password
          <input {...password.input} data-cy="password" />
        </div>
        <button type="submit" data-cy="submit">
          login
        </button>
      </form>
    </div>
  )
}

export default Login
