import React, { useEffect, useState } from 'react'
import { getAllUsers } from '../services/users'
import User from './User'
//import { connect } from 'react-redux'

const UserList = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    getAllUsers()
      .then(users => setUsers(users))
      .catch(error => console.log('virhe: ', error))
  }, [])

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th />
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <User key={user.id} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserList
