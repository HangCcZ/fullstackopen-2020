import React, { useState } from "react"
const Blog = ({ blog, clickLike, removeBlog, user }) => {
  const [showingDetail, setshowingDetail] = useState(false)

  const toggleView = () => {
    setshowingDetail(!showingDetail)
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
        <div className='detailedView'>
          {blog.title}{" "}
          <button onClick={toggleView} className='hideButton'>
            hide
          </button>
        </div>

        <div>{blog.url}</div>

        <div>
          {blog.likes} likes
          <button onClick={onLikesClick} className='likeButton'>
            like
          </button>
        </div>
        <div>{blog.author}</div>
        {showRemove()}
      </>
    )
  }

  const blogBrief = () => {
    return (
      <div className='briefView'>
        {blog.title}{" "}
        <button onClick={toggleView} className='showButton'>
          view
        </button>
      </div>
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
      {showingDetail ? blogDetail() : blogBrief()}
    </div>
  )
}

export default Blog
