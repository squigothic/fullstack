import axios from 'axios'
const baseUrl = '/api/'

export const loginService = async credentials => {
  const response = await axios.post(`${baseUrl}/login`, credentials)
  return response.data
}

export const getAllUsers = async () => {
  const response = await axios.get(`${baseUrl}/users`)
  return response.data
}
