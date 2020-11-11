import React, { useState } from "react"

const CommentForm = ({ addComment }) => {
  const [comment, setComment] = useState("")

  const handleChange = (event) => {
    setComment(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setComment("")
    addComment(comment)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            id='comment'
            type='text'
            value={comment}
            name='comment'
            onChange={handleChange}
          ></input>
          <button type='submit' id='create-comment'>
            add comment
          </button>
        </div>
      </form>
    </div>
  )
}

export default CommentForm
