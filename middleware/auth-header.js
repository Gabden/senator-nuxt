export default function(context) {
  if (context && context.req && context.req.headers) {
    if (process.server && context.req.headers.cookie) {
      const tokenCookie = context.req.headers.cookie
        .split(';')
        .find((cook) => cook.includes('auth._token.local'))

      if (tokenCookie) {
        const token = tokenCookie.split('=')[1]
        context.$axios.defaults.headers.common.Authorization = token
      }
    }
  }
}
