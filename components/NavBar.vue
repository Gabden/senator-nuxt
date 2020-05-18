<template>
  <v-app-bar app color="grey lighten-5" height="80">
    <div v-if="$auth.loggedIn">
      <v-btn text="">{{ $auth.user.username }}</v-btn> |
      <v-btn v-if="isAdmin" text to="/registration">Администрирование</v-btn>
      <span v-if="isAdmin">|</span>
      <v-btn text @click="logout">Выйти</v-btn>
    </div>
    <div v-if="!$auth.loggedIn">
      <v-btn text rounded to="/login">Вход</v-btn> |
      <v-btn text to="/registration">Регистрация</v-btn>
    </div>
    <v-spacer></v-spacer>
    <senator-logo />
    <v-spacer></v-spacer>
    <v-btn text rounded router to="/"><v-icon>mdi-magnify</v-icon>Поиск</v-btn>
    <v-btn text rounded router to="/secured"
      ><v-icon>mdi-heart-outline</v-icon>Избранное</v-btn
    >
    <v-btn text rounded router to="/admin">
      <v-icon>mdi-cart-outline</v-icon> Корзина
    </v-btn>
  </v-app-bar>
</template>

<script>
import requestsService from '../services/requestsService'
import SenatorLogo from './SenatorLogo.vue'
export default {
  components: {
    'senator-logo': SenatorLogo
  },
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
