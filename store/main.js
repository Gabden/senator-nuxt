import requestsService from '../services/requestsService'

export const state = () => ({
  user: null
})
export const mutations = {
  SET_USER_DATA(state, userData) {
    state.user = userData
    localStorage.setItem('user', JSON.stringify(userData))
    requestsService.setAuthToken(userData.token)
  },
  SET_USER_TOKEN(token) {
    requestsService.setAuthToken(token)
  },
  CLEAR_USER_DATA() {
    localStorage.removeItem('user')
    location.reload()
  }
}
export const actions = {
  register({ commit }, credentials) {
    return requestsService.post('/register', credentials).then(({ data }) => {
      commit('SET_USER_DATA', data)
    })
  },
  login({ commit }, credentials) {
    return requestsService.login(credentials).then((response) => {
      commit('SET_USER_DATA', response.data)
    })
  },
  logout({ commit }) {
    commit('CLEAR_USER_DATA')
  }
}
export const getters = {
  loggedIn(state) {
    return !!state.user
  },
  isAdmin(state, getters) {
    let isAdmin = false
    if (getters.loggedIn) {
      isAdmin = state.user.rolesList.includes('ADMIN')
    }
    return isAdmin
  }
}
