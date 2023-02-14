import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
return axios.get(baseUrl)
}

const create = personObject => {
  return axios.post(baseUrl, personObject)
}

const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`, id)
  }

const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject)
    //return request.then(response => response.data)
}

export default {getAll, create, remove, update}