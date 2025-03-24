import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, updatedBlog) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, updatedBlog)
    console.log('Updated Blog:', response)
    return response
  } catch (error) {
    console.error('Error updating blog:', error)
    throw error
  }
}

const deleteBlog = async (id, auth) => {
  setToken(auth)
  const config = {
    headers: { Authorization: token },
  }

  try {
    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return response.data
  } catch (error) {
    console.error('Error deleting blog:', error)
    throw error
  }
}

export default { getAll, create, update, setToken, deleteBlog }