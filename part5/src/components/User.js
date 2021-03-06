import React from "react"

const User = ({ user }) => {
  if (!user) {
    return null
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      {user.blogs.map((blog) => {
        return <li key={blog.id}>{blog.title}</li>
      })}
    </div>
  )
}

export default User
