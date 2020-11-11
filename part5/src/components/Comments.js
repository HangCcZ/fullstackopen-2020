import React from "react"
const Comments = ({ blog }) => {
  if (!blog.comments) {
    return null
  }
  return (
    <div>
      <h2>comments</h2>

      {blog.comments.map((comment) => (
        <li key={comment}>{comment}</li>
      ))}
    </div>
  )
}

export default Comments
