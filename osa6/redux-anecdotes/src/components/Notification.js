import React from 'react'
import { connect } from 'react-redux'
import NotificationContent from './NotificationContent'


const Notification = ({ notification }) => {

  return (
    <div>
      {notification.status &&
        <NotificationContent content={notification.content.content} />}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

export default connect(
  mapStateToProps,
  null
)(Notification)
