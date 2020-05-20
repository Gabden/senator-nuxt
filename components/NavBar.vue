<template>
  <nav>
    <v-app-bar app color="grey lighten-5" height="80">
      <v-btn text @click="openNavDrawer"><v-icon>mdi-menu</v-icon></v-btn>
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
      <!-- <v-text-field
      hide-details
      append-icon="mdi-magnify"
      single-line
      label="Поиск"
      class="pa-0"
    > -->
      <!-- </v-text-field> -->
      <v-btn text rounded router to="/"
        ><v-icon>mdi-magnify</v-icon>Поиск</v-btn
      >
      <v-btn text rounded router to="/secured"
        ><v-icon>mdi-heart-outline</v-icon>Избранное</v-btn
      >
      <v-btn text rounded router to="/admin">
        <v-icon>mdi-cart-outline</v-icon> Корзина
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app class="grey lighten-4" temporary>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-center">
            SEN<span class="headline">A</span>TOR
            <v-icon color="#d50000" class="mb-1"
              >mdi-glass-wine</v-icon
            ></v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list>
        <v-list-item class="p-0">
          <v-list-item-content>
            <v-list-item-title
              class="text-center grey--text text--darken-1 caption"
            >
              <span>Личный кабинет</span>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/login">
          <v-list-item-content>
            <v-list-item-title class="text-left ml-5">Войти</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/registration">
          <v-list-item-content>
            <v-list-item-title class="text-left ml-5"
              >Зарегистрироваться</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list>
        <v-list-item class="p-0">
          <v-list-item-content>
            <v-list-item-title
              class="text-center grey--text text--darken-1 caption"
            >
              <span>О нас</span>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/">
          <v-list-item-content>
            <v-list-item-title class="text-left ml-5">Начало</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="text-left ml-5"
              >Все товары</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/events">
          <v-list-item-content>
            <v-list-item-title class="text-left ml-5"
              >События</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/aboutus">
          <v-list-item-content>
            <v-list-item-title class="text-left ml-5">О нас</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/contacts">
          <v-list-item-content>
            <v-list-item-title class="text-left ml-5"
              >Контакты</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list>
        <v-list-item class="p-0">
          <v-list-item-content>
            <v-list-item-title
              class="text-center grey--text text--darken-1 caption"
            >
              <span>Бизнес</span>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/buisness">
          <v-list-item-content>
            <v-list-item-title class="text-left ml-5"
              >Корпоративным клиентам</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/reservation">
          <v-list-item-content>
            <v-list-item-title class="text-left ml-5"
              >Резерв и оплата</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>

      <!-- <v-list dense>
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list> -->
    </v-navigation-drawer>
  </nav>
</template>

<script>
import requestsService from '../services/requestsService'
import SenatorLogo from './SenatorLogo.vue'
export default {
  components: {
    'senator-logo': SenatorLogo
  },
  data() {
    return {
      drawer: false,
      accountItems: [
        { title: 'Home', icon: 'mdi-dashboard' },
        { title: 'About', icon: 'mdi-question-answer' }
      ]
    }
  },
  computed: {
    isAdmin() {
      return this.$auth.user ? this.$auth.user.roles.includes('ADMIN') : false
    },
    isScrolled() {
      return this.$store.state.main.isScrolled
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
    openNavDrawer() {
      this.drawer = !this.drawer
    }
  }
}
</script>

<style></style>
