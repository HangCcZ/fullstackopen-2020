import axios from 'axios'
const baseUrl = '/api/blogs'
const userUrl = '/api/users'

let token = null
const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

// send request to api/user/id
// get all blogs corresponding to current user
const getAllFromUser = async (userId) => {
  const response = await axios.get(`${userUrl}/${userId}`)
  console.log(response.data.blogs)
  return response.data.blogs
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const updateLikes = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(
    `${baseUrl}/${newObject.id}`,
    newObject,
    config
  )
  return response.data
}

export default { getAll, getAllFromUser, setToken, create, updateLikes }
