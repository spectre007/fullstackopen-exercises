import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (anecdoteText) => {
  const response = await axios.post(baseUrl, { content: anecdoteText, votes: 0 })
  return response.data
}

const service = { getAll, createNew } 
export default service
