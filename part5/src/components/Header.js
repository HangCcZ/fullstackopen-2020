import React from "react"
import { useSelector } from "react-redux"

import { Link } from "react-router-dom"
const Header = ({ handleLogOut }) => {
  const user = useSelector((state) => {
    return state.user
  })

  if (!user) {
    return null
  }

  return (
    <div>
      <h2>Blogs</h2>
      <div>
        {user.name} logged in<button onClick={handleLogOut}>Logout</button>
        <div>
          <Link to='/users'>users</Link>
        </div>
        <div>
          <Link to='/'>home</Link>
        </div>
      </div>
    </div>
  )
}

export default Header
