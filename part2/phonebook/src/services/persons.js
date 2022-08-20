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

const remove = (id) => {
    return axios.delete(`${BASE_URL}/${id}`)
}

const update = (id, person) => {
    const request = axios.put(`${BASE_URL}/${id}`, person)
    return request.then(response => response.data)
}

export default { getAll, create, remove, update }
