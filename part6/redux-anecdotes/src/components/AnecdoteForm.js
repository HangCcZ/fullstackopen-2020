import React from "react"
// import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { connect } from "react-redux"

const AnecdoteForm = (props) => {
  // const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.newAnecdote.value
    event.target.newAnecdote.value = ""
    props.createAnecdote(content)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name='newAnecdote' />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  createAnecdote,
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)
