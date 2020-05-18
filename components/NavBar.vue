<template>
  <v-app-bar app dark color="info">
    <v-toolbar-title>Senator</v-toolbar-title>
    <v-btn text rounded router to="/">Home</v-btn>
    <v-btn text rounded router to="/secured">Secured</v-btn>
    <v-btn text rounded router to="/admin">Only for admin</v-btn>
    <v-btn v-if="isAdmin" rounded to="/registration">Администрирование</v-btn>

    <v-spacer></v-spacer>
    <v-btn v-if="$auth.loggedIn">{{ $auth.user.username }}</v-btn>
    <v-btn v-if="$auth.loggedIn" text rounded router to="/" @click="logout"
      >Logout</v-btn
    >
    <v-btn v-if="!$auth.loggedIn" text rounded to="/login">Login</v-btn>
    <v-btn v-if="!$auth.loggedIn" rounded to="/registration">Регистрация</v-btn>
  </v-app-bar>
</template>

<script>
import requestsService from '../services/requestsService'
export default {
  computed: {
    isAdmin() {
      return this.$auth.user ? this.$auth.user.roles.includes('ADMIN') : false
    }
  },
  methods: {
    logout() {
      this.$auth
        .logout()
        .then((result) => {
          requestsService.setAuthToken('empty')
        })
        // eslint-disable-next-line handle-callback-err
        .catch((err) => {
          requestsService.setAuthToken('empty')
        })
    },
    checkAuth() {
      console.log(this.$auth)
    }
  }
}
</script>

<style></style>
