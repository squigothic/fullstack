
import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

// const getAll = async () => {
//   const request = await axios.get(baseUrl)
//   return request.data
// }

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id) => {
  const response = await axios.put(`${baseUrl}/update/${id}`)
  return response.data
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/delete/${id}`, config)
  return response.data
}



export default { getAll, create, setToken, update, deleteBlog }
