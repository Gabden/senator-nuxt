export default function(context) {
  if (/\/{2,}/.test(context.route.fullPath)) {
    const url = context.route.fullPath.replace(/\/{2,}/g, '/')
    context.redirect(301, url)
  }
}
