import React from 'react'
import '../index.css'
import Notification from './Notification'

const Login = ({ notification, doLogin, username, password }) => {
  console.log('notification: ', notification)
  return (
    <div>
      {notification.status === true && (
        <Notification message={notification.content} />
      )}
      <h2>Log in to application</h2>
      <form onSubmit={doLogin}>
        <div>
          username
          <input {...username.input} />
        </div>
        <div>
          password
          <input {...password.input} />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default Login
