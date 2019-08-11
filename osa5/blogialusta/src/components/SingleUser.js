import React from 'react'

const SingleUser = props => {
  console.log('id: ', props)
  return <h3>{props.user}</h3>
}

export default SingleUser
