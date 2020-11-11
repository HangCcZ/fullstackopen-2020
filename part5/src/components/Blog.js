import React from "react"
import Comments from "./Comments"
import { commentBlog } from "../reducers/blogReducer"
import { useDispatch } from "react-redux"
import CommentForm from "./CommentForm"
const Blog = ({ blog, clickLike, removeBlog, user }) => {
  const dispatch = useDispatch()
  if (!blog) {
    return null
  }

  const onLikesClick = () => {
    clickLike(blog)
  }

  const onRemoveClick = () => {
    const result = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (result) {
      removeBlog(blog)
    }
  }

  const addComment = (comment) => {
    dispatch(commentBlog(comment, blog))
  }

  const showRemove = () => {
    if (blog.user.id === user.id) {
      return (
        <div>
          <button onClick={onRemoveClick} className='delete-button'>
            remove
          </button>
        </div>
      )
    }
    return null
  }

  const blogDetail = () => {
    return (
      <>
        <h2>{blog.title} </h2>

        <div>
          <a href={`//${blog.url}`} target='_blank' rel='noopener noreferrer'>
            {blog.url}
          </a>
        </div>

        <div>
          {blog.likes} likes
          <button onClick={onLikesClick} className='likeButton'>
            like
          </button>
        </div>
        <div>added by {blog.author}</div>
        {showRemove()}
        <div>
          <CommentForm blog={blog} addComment={addComment} />
          <Comments blog={blog} />
        </div>
      </>
    )
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div className='blog' style={blogStyle}>
      {blogDetail()}
    </div>
  )
}

export default Blog
