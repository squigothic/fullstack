import React from 'react'
import '../index.css'

const Login = ({ doLogin, username, password }) => {
  return (
    <div>
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
