import axios from 'axios'

const api = axios.create({
  baseURL: 'https://vpic.nhtsa.dot.gov/api/vehicles',
})

export { api }
