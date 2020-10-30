import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateVote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteList = (props) => {
  const dispatch = useDispatch()
  const anecdotes = useSelector((state) => state.anecdotes)
  const filterValue = useSelector((state) => state.filter)

  const vote = (anecdote) => {
    dispatch(updateVote(anecdote))
    dispatch(setNotification(anecdote.content, 5))
  }

  const anecdoteConfig = (listItem) => {
    return listItem.map((anecdote) => (
      <div key={anecdote.id}>
        <div>{anecdote.content}</div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote)}>vote</button>
        </div>
      </div>
    ))
  }

  const listDisplay = () => {
    const sortedList = anecdotes.sort((a, b) => b.votes - a.votes)
    const anecdoteList =
      filterValue === ""
        ? anecdoteConfig(anecdotes)
        : anecdoteConfig(
            sortedList.filter((anecdote) =>
              anecdote.content.includes(filterValue)
            )
          )
    return anecdoteList
  }

  return <div>{listDisplay()}</div>
}

export default AnecdoteList
