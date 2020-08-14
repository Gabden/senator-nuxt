export default function(context) {
  if (context) {
    const isAdmin =
      context.$auth.user && context.$auth.user.roleList.includes('ADMIN')
    if (!isAdmin) {
      context.redirect('/login')
      return context.$auth.logout()
    }
  }
}
