import anecdoteService from "../services/anecdotes"

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case "VOTE_ANECDOTE":
      const updatedAnecdote = action.data.anecdote
      const id = updatedAnecdote.id
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : updatedAnecdote
      )
    case "NEW_ANECDOTE":
      return [...state, action.data.anecdote]

    case "INIT_ANECDOTE":
      return action.data.anecdotes
    default:
      return state
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.createNew(content)

    dispatch({
      type: "NEW_ANECDOTE",
      data: { anecdote },
    })
  }
}

export const updateVote = (anecdote) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.updateVote(anecdote)
    dispatch({ type: "VOTE_ANECDOTE", data: { anecdote: newAnecdote } })
  }
}

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()

    dispatch({
      type: "INIT_ANECDOTE",
      data: { anecdotes },
    })
  }
}

export default anecdoteReducer
