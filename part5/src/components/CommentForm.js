import React, { useState } from "react"
import { Form, Button } from "react-bootstrap"
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

  const margins = {
    margin: 5,
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Control
            id='comment'
            type='text'
            value={comment}
            name='comment'
            onChange={handleChange}
            placeholder='Add your comment here'
          />
          <Form.Text className='text-muted'>
            Please follow the community's rule!
          </Form.Text>
        </Form.Group>
        <Button type='submit' id='create-comment'>
          add comment
        </Button>
      </Form>
    </div>
  )
}

export default CommentForm
