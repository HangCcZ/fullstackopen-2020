import React from "react"
import { useSelector } from "react-redux"
import { Button, Alert, Navbar, Nav } from "react-bootstrap"

import { Link } from "react-router-dom"

const padding = {
  padding: 5,
}

const margins = {
  margin: 5,
}

const Header = ({ handleLogOut }) => {
  const user = useSelector((state) => {
    return state.user
  })

  if (!user) {
    return null
  }

  const renderLoginMessage = () => {
    return (
      <>
        {user.name} logged in
        <Button variant='secondary' style={margins} onClick={handleLogOut}>
          Logout
        </Button>
      </>
    )
  }

  return (
    <Navbar collapseOnSelect expand='lg' bg='light'>
      <Navbar.Brand href='/'>
        <Link style={padding} to='/'>
          Hang's Blog App
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav fill className='mr-auto'>
          <Nav.Link href='#home' as='span'>
            <Link style={padding} to='/'>
              home
            </Link>
          </Nav.Link>
          <Nav.Link href='#' as='span'>
            <Link style={padding} to='/users'>
              users
            </Link>
          </Nav.Link>
          <Nav.Link href='#' as='span'></Nav.Link>
        </Nav>
        <Alert variant='info' style={margins}>
          {user ? renderLoginMessage() : <Link to='/login'>login</Link>}
        </Alert>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Header
