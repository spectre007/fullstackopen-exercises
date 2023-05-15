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

const voteAnecdote = async (id) => {
  const url = `${baseUrl}/${id}`
  const { data: anecdote } = await axios.get(url)
  anecdote.votes++
  const response = await axios.put(url, anecdote)
  return response.data
}

const service = { getAll, createNew, voteAnecdote } 
export default service
