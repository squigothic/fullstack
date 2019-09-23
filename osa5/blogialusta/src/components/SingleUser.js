import React from 'react'
import { connect } from 'react-redux'

const SingleUser = props => {
  if (!props.user) {
    return null
  }

  return (
    <div>
      <h3>{props.user.name}</h3>
      <h4>added blogs: </h4>
      <ul>
        {props.user.blogs.map(blog => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

const mapStateToProp = (state, ownProps) => ({
  user: state.userList.find(user => user.id === ownProps.id),
})

export default connect(mapStateToProp)(SingleUser)
