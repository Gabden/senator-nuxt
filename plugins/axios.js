import axios from 'axios'

function tokenHandler(config, store) {
  console.log(store.state.auth.user.token)
  if (store.state.auth && store.state.auth.user.token) {
    config.headers.common.Authorization = store.state.auth.user.token
  }
  return config
}

export default (context) => {
  // store is the current store, both server and client side. and unique for nuxtServerInit
  const { store } = context
  axios.interceptors.request.use(
    (config) => tokenHandler(config, store),
    function(error) {
      return Promise.reject(error)
    }
  )
}
