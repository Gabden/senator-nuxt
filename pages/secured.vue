<template>
  <div>
    <h1>This is secured admin section</h1>
    <p>{{ msg }}</p>
  </div>
</template>

<script>
import requestsService from '../services/requestsService'
export default {
  middleware: 'auth',
  meta: { requiresAuth: true },
  fetch() {
    requestsService
      .getOpenData()
      .then((response) => {
        this.msg = response.data
      })
      .catch((err) => {
        this.msg = 'error' + err
      })
  },
  data() {
    return {
      msg: ''
    }
  }
}
</script>

<style></style>
