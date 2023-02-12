import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async (updatedBlog) => {
  const config = {
    headers: { Authorization: token }
  }

  const blogUrl = [baseUrl, updatedBlog.id].join('/')
  const response = await axios.put(blogUrl, updatedBlog, config)
  return response.data
}

const remove = async (blog) => {
  const config = {
    headers: { Authorization: token }
  }
  const { id } = blog
  const blogUrl = [baseUrl, id].join('/')
  const response = await axios.delete(blogUrl, config)
  return response
}

export default { getAll, create, setToken, update, remove }
