import React from "react"
import Comments from "./Comments"
import { commentBlog } from "../reducers/blogReducer"
import { useDispatch } from "react-redux"
import CommentForm from "./CommentForm"
import { Button, Card } from "react-bootstrap"
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
        <>
          <Button
            variant='danger'
            onClick={onRemoveClick}
            className='delete-button'
          >
            remove
          </Button>
        </>
      )
    }
    return null
  }

  const blogDetail = () => {
    return (
      <div>
        <Card>
          <Card.Body>
            <Card.Title>{blog.title}</Card.Title>
            <Card.Text>
              {blog.likes} likes{" "}
              <Button
                variant='outline-success'
                onClick={onLikesClick}
                className='likeButton'
              >
                Like
              </Button>
              {showRemove()}
              <Comments blog={blog} />
              <CommentForm blog={blog} addComment={addComment} />
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    )
  }

  return blogDetail()
}

export default Blog
