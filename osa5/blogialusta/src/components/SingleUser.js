import React from 'react'
import { connect } from 'react-redux'

const SingleUser = props => {
  console.log('id: ', props)
  return <h3>{props.user}</h3>
}

const mapStateToProps = (state, ownProps) => {
  return {}
}

export default connect(mapStateToProps)(SingleUser)
