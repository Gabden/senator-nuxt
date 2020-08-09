export default function(context) {
  if (process.server) {
    const tokenCookie = context.req.headers.cookie
      .split(';')
      .find((cook) => cook.includes('auth._token.local'))

    if (tokenCookie) {
      const token = tokenCookie.split('=')[1]
      context.$axios.defaults.headers.common.Authorization = token
    }
  }
}
