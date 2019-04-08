import React from 'react'
import Notification from '../components/Notification'
import '../index.css'

const Login = ({
  doLogin,
  username,
  password,
  notificationMessage }) => {

  console.log('username: ', username)
  console.log('password: ', password)

  return (
    <div>
      <Notification message={notificationMessage} />
      <h2>Log in to application</h2>
      <form onSubmit={doLogin}>
        <div>
          username
          <input {...username} />
        </div>
        <div>
          password
          <input {...password} />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default Login
