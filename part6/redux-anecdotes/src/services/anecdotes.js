import axios from "axios"

const baseUrl = "http://localhost:3001/anecdotes"

const getId = () => (100000 * Math.random()).toFixed(0)

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const anecdote = {
    content,
    id: getId(),
    votes: 0,
  }
  const response = await axios.post(baseUrl, anecdote)
  return response.data
}

const updateVote = async (anecdote) => {
  const newAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
  const response = await axios.put(`${baseUrl}/${newAnecdote.id}`, newAnecdote)
  return response.data
}

export default { getAll, createNew, updateVote }
