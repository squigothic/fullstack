import React from 'react'

const NotificationContent = ({ content }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return (
    <div style={style}>
      You voted for "{content}"
    </div>
  )
}

export default NotificationContent
