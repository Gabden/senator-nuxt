import axios from 'axios'

export const apiClient = axios.create({
  baseURL: '/api',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  setAuthToken(token) {
    axios.defaults.headers.common.Authorization = token
  },
  login(credentials) {
    return axios.post(`/login`, credentials)
  },
  getOpenData() {
    return axios.get('/api/api/public/manager/hello')
  },
  getAdminData() {
    return axios.get('/api/api/public/admin/hello')
  }
}
