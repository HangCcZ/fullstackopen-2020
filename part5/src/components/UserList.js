import React from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { Table } from "react-bootstrap"

const UserList = ({ user }) => {
  const users = useSelector((state) => state.users)
  const renderUsers = () => {
    return users.map((user) => (
      <tr key={user.name}>
        <td>
          <Link to={`/users/${user.id}`}>{user.name}</Link>
        </td>

        <td>{user.blogs.length}</td>
      </tr>
    ))
  }

  return (
    <div>
      <h2>Users</h2>
      <Table striped>
        <thead>
          <tr>
            <th>User</th>
            <th>Number of blogs posted</th>
          </tr>
        </thead>
        <tbody>{renderUsers()}</tbody>
      </Table>
    </div>
  )
}

export default UserList
