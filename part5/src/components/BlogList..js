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
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            clickLike={addLike}
            removeBlog={removeBlog}
            user={user}
          />
        ))}
    </div>
  )
}

export default BlogList
