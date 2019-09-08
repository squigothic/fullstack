import React, { useState, useImperativeHandle } from 'react'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : ''}
  const showWhenVisible = { 
    display: visible ? '' : 'none',
    
  }

  const boxStyle = {
    padding: '4px 0px 12px 3px'
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <div style={boxStyle}>
        <button data-cy="toggle-new-blog" onClick={toggleVisibility}>{props.buttonLabel}</button>
        </div>
      </div>
      <div style={showWhenVisible}>
      <div style={boxStyle}>
        {props.children}
        <button onClick={toggleVisibility}>Cancel</button>
        </div>
      </div>
    </div>
  )
})

export default Togglable