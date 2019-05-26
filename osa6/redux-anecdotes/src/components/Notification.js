import React from 'react';

const Notification = ({ content }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  console.log('KONTETT: ', content)
  return (
    <div style={style}>
      You voted for "{content.content}"
    </div>
  )
}

export default Notification
