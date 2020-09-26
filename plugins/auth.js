export default function(context) {
  context.$axios.onError((error) => {
    let isExpired = false
    if (error.response.data && error.response.data.message) {
      isExpired = error.response.data.message.includes('expired')
    }
    console.log(isExpired)
    if (
      error.response.status === 401 ||
      error.response.status === 403 ||
      isExpired
    ) {
      context.$auth.logout()
    }
  })
}
