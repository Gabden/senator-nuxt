export const state = () => ({
  loader: false
})
export const mutations = {
  SWITCH_LOADER(state, value) {
    state.loader = value
  }
}
export const actions = {
  nuxtServerInit(vuexContext, context) {
    if (
      context &&
      context.req &&
      context.req.headers &&
      context.req.headers.cookie
    ) {
      const tokenCookie = context.req.headers.cookie
        .split(';')
        .find((cook) => cook.includes('auth._token.local'))

      if (tokenCookie) {
        const token = tokenCookie.split('=')[1]
        context.$axios.defaults.headers.common.Authorization = token
        vuexContext.commit('main/SET_USER_TOKEN', token)
        // TODO create commit to fetch cart
      }
    }
  },
  SWITCH_LOADER({ commit }, value) {
    commit('SWITCH_LOADER', value)
  }
}
