import axios from 'axios'
export default ({ $auth }) => {
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401 || error.response.status === 403) {
        $auth.logout()
      }
      return Promise.reject(error)
    }
  )
}
