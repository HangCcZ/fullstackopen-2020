import React, { useState } from 'react'
const Blog = ({ blog, onClickLike }) => {
  const [showingDetail, setshowingDetail] = useState(false)

  const toggleView = () => {
    setshowingDetail(!showingDetail)
  }

  const onLikesClick = () => {
    onClickLike(blog)
  }

  const blogDetail = () => {
    return (
      <>
        <div>
          {blog.title} <button onClick={toggleView}> hide</button>
        </div>

        <div>{blog.url}</div>

        <div>
          {blog.likes}
          <button onClick={onLikesClick}>like</button>
        </div>
        <div>{blog.author}</div>
      </>
    )
  }

  const blogBrief = () => {
    return (
      <div>
        {blog.title} <button onClick={toggleView}>view</button>
      </div>
    )
  }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle}>{showingDetail ? blogDetail() : blogBrief()}</div>
  )
}

export default Blog
