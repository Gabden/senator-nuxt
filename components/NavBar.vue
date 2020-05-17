<template>
  <v-app-bar app dark color="info">
    <v-toolbar-title>Senator</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn text rounded router to="/">Home</v-btn>
    <v-btn text rounded router to="/secured">Secured</v-btn>
    <v-btn text rounded router to="/admin">Only for admin</v-btn>
    <p v-if="$auth.loggedIn">{{ $auth.user }}</p>
    <v-btn v-if="$auth.loggedIn" text rounded router to="/" @click="logout"
      >Logout</v-btn
    >

    <v-btn v-else text rounded to="/login">Login</v-btn>
    <v-btn rounded to="/registration">Регистрация</v-btn>
    <v-btn @click="checkAuth">Check auth</v-btn>
  </v-app-bar>
</template>

<script>
import { authComputed } from '../services/helpers'
export default {
  computed: {
    ...authComputed
  },
  methods: {
    show() {
      console.log(authComputed)
    },
    logout() {
      this.$store.dispatch('logout')
    },
    checkAuth() {
      console.log(this.$auth)
    }
  }
}
</script>

<style></style>
