export default function(context) {
  context.$axios.onError((error) => {
    if (error.response.status === 401 || error.response.status === 403) {
      context.$auth.logout()
    }
  })
}
