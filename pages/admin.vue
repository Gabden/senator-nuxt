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
  meta: { requiresAuth: true, requiresAuthAdmin: true },
  fetch() {
    requestsService.getAdminData().then((response) => {
      this.msg = response.data
      console.log(response.data)
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
