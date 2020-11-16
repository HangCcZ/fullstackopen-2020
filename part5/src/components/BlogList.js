import React from "react"
import { useDispatch, useSelector } from "react-redux"
import Blog from "./Blog"
import blogForm from "./BlogForm"
const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  return (
    <div>
      {blogForm()}
      <Table>
        <tbody>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <tr key={blog.id}>
                <td>
                  <Blog
                    key={blog.id}
                    blog={blog}
                    clickLike={addLike}
                    removeBlog={removeBlog}
                    user={user}
                  />
                </td>
                <td>{blog.user.name}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  )
}

export default BlogList
