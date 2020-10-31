import React from "react"
//import { useDispatch, useSelector } from "react-redux"
import { updateVote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"
import { connect } from "react-redux"

const AnecdoteList = (props) => {
  //const dispatch = useDispatch()
  //const anecdotes = useSelector((state) => state.anecdotes)
  //const filterValue = useSelector((state) => state.filter)

  const vote = (anecdote) => {
    // dispatch(updateVote(anecdote))
    // dispatch(setNotification(anecdote.content, 5))
    props.updateVote(anecdote)
    props.setNotification(anecdote.content, 5)
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
    const sortedList = props.anecdotes.sort((a, b) => b.votes - a.votes)
    const anecdoteList =
      props.filter === ""
        ? anecdoteConfig(props.anecdotes)
        : anecdoteConfig(
            sortedList.filter((anecdote) =>
              anecdote.content.includes(props.filter)
            )
          )
    return anecdoteList
  }

  return <div>{listDisplay()}</div>
}

const mapDispatchToProps = {
  updateVote,
  setNotification,
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
