import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateVote } from "../reducers/anecdoteReducer"
import {
  displayNotification,
  removeNotification,
} from "../reducers/notificationReducer"

let timer = null

const AnecdoteList = (props) => {
  const anecdotes = useSelector((state) => state.anecdotes)
  const filterValue = useSelector((state) => state.filter)

  const dispatch = useDispatch()
  const vote = (anecdote) => {
    dispatch(updateVote(anecdote.id))
    dispatch(displayNotification(anecdote))

    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(() => dispatch(removeNotification()), 5000)
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
