import React, { useState, useImperativeHandle } from "react"
import { Button } from "react-bootstrap"
const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)
  // visible = true: then show the form
  const hideWhenVisible = { display: visible ? "none" : "" }
  const showWhenVisible = { display: visible ? "" : "none" }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility} id='showForm'>
          {props.buttonLabel}
        </Button>
      </div>

      <div style={showWhenVisible}>
        {props.children}
        <Button variant='secondary' onClick={toggleVisibility} id='hideForm'>
          cancel
        </Button>
      </div>
    </div>
  )
})

export default Togglable
