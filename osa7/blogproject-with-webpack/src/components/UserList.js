import React, { useEffect } from 'react'
import { fetchUserList } from '../reducers/userListReducer'
import User from './User'
import { connect } from 'react-redux'

const UserList = ({ fetchUserList, users }) => {
  useEffect(() => {
    fetchUserList()
  }, [])

  if (users == null) {
    return null
  }

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th align="left">Name</th>
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

const mapStateToProp = state => {
  return {
    users: state.userList,
  }
}

const mapDispatchToProps = {
  fetchUserList,
}

export default connect(
  mapStateToProp,
  mapDispatchToProps
)(UserList)
