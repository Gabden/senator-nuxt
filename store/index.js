export const actions = {
  nuxtServerInit(vuexContext, context) {
    if (context && context.req && context.req.headers) {
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
  }
}
