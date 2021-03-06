import requestsService from '../services/requestsService'

export const state = () => ({
  user: null,
  isScrolled: false,
  drawer: false
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
    if (process.client) {
      localStorage.removeItem('user')
      location.reload()
    }
  },
  SET_SCROLLED(state, scrolled) {
    state.isScrolled = scrolled
  },
  SWITCH_DRAWER(state, drawer) {
    state.drawer = drawer
  }
}
export const actions = {
  switchDrawer({ commit }, drawer) {
    commit('SWITCH_DRAWER', drawer)
  },
  isScrolled({ commit }, scrolled) {
    commit('SET_SCROLLED', scrolled)
  },
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
  logout(vuexContext) {
    console.log(vuexContext)
    vuexContext.commit('CLEAR_USER_DATA')
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
