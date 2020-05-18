export const actions = {
  nuxtServerInit({ commit }, { req }) {
    const tokenCookie = req.headers.cookie
      .split(';')
      .find((cook) => cook.includes('auth._token.local'))
    const token = tokenCookie.split('=')[1]

    if (token) {
      commit('main/SET_USER_TOKEN', token)
    }
  }
}
