import axios from "axios"

const BASE_URL = "http://localhost:3001/persons"

const getAll = () => {
  const request = axios.get(BASE_URL)
  return request.then(response => response.data)
}

const create = (newPerson) => {
  const request = axios.post(BASE_URL, newPerson)
  return request.then(response => response.data)
}

export default { getAll, create }
