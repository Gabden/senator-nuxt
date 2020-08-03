<template>
  <div>
    <h1>This is secured admin section</h1>
    <p>{{ msg }}</p>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  data() {
    return {
      msg: ''
    }
  },
  async mounted() {
    const response = await this.$axios.get('/api/api/public/manager/hello')
    this.msg = response.data
  }
}
</script>

<style></style>
