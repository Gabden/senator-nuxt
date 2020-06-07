<template>
  <nav>
    <v-app-bar app color="grey lighten-5" height="80">
      <v-btn class="hidden-lg-and-up" text @click="openNavDrawer"
        ><v-icon>mdi-menu</v-icon></v-btn
      >
      <div v-if="$auth.loggedIn" class="hidden-md-and-down">
        <v-btn text="">{{ $auth.user.username }}</v-btn> |
        <v-btn v-if="isAdmin" text to="/registration"
          ><v-badge content="2" color="red" inline class="mt-0">
            <span class="hidden-sm-and-down">Администрирование</span>
          </v-badge></v-btn
        >
        <span v-if="isAdmin">|</span>
        <v-btn text @click="logout">Выйти</v-btn>
      </div>
      <div v-if="!$auth.loggedIn" class="hidden-md-and-down">
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
      <div :class="$vuetify.breakpoint.smAndDown ? 'formatIcons' : ''">
        <v-btn text rounded router to="/" class="mr-0"
          ><v-icon>mdi-magnify</v-icon>
          <span class="hidden-sm-and-down">Поиск</span>
        </v-btn>
      </div>
      <div :class="$vuetify.breakpoint.smAndDown ? 'formatIcons' : ''">
        <v-btn text rounded router to="/secured"
          ><v-icon>mdi-heart-outline</v-icon>
          <span class="hidden-sm-and-down">Избранное</span>
        </v-btn>
      </div>
      <div
        :class="$vuetify.breakpoint.smAndDown ? 'formatIcons' : ''"
        class="mr-2"
      >
        <v-btn text rounded router to="/admin">
          <v-icon>mdi-cart-outline</v-icon>
          <v-badge content="2" color="red">
            <span class="hidden-sm-and-down">Корзина</span>
          </v-badge>
        </v-btn>
      </div>
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

      <v-list v-if="!$auth.loggedIn">
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

      <v-list v-else>
        <v-list-item class="p-0">
          <v-list-item-content>
            <v-list-item-title
              class="text-center grey--text text--darken-1 caption"
            >
              <span>Личный кабинет</span>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/account">
          <v-list-item-content>
            <v-list-item-title class="text-left ml-5">{{
              $auth.user.username
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="isAdmin" link to="/admin">
          <v-list-item-content>
            <v-list-item-title class="text-left ml-5"
              ><v-badge content="2" color="red" inline class="mt-0">
                <span>Администрирование</span>
              </v-badge></v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="logout">
          <v-list-item-content>
            <v-list-item-title class="text-left ml-5">Выйти</v-list-item-title>
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

        <v-expansion-panels flat class="grey lighten-4 pl-5">
          <v-expansion-panel color="grey lighten-4">
            <v-expansion-panel-header color="grey lighten-4" class="pl-4"
              >Все товары</v-expansion-panel-header
            >
            <v-expansion-panel-content class="grey lighten-5 px-0">
              <v-divider></v-divider>
              <div
                v-for="item in allGoods"
                :key="`${item.title} + key`"
                class="grey lighten-5 px-0"
              >
                <v-list-item link to="item.url" class="grey lighten-5">
                  <v-list-item-content class="grey lighten-5">
                    <v-list-item-title
                      class="text-left ml-5"
                      color="grey lighten-5"
                    >
                      <v-icon color="red">{{ item.icon }}</v-icon>
                      {{ item.title }}</v-list-item-title
                    >
                  </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>

        <v-list-item link to="/events">
          <v-list-item-content>
            <v-list-item-title class="text-left ml-5"
              >События</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/about-us">
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
      ],
      allGoods: [
        { title: 'Акции', url: '/sales', icon: 'mdi-percent-outline' },
        { title: 'Новинки', url: '/new', icon: 'mdi-glass-cocktail' },
        { title: 'Алкоголь', url: '/alcohol', icon: 'mdi-bottle-wine-outline' },
        { title: 'Напитки', url: '/drinks', icon: 'mdi-water-outline' },
        {
          title: 'Оливковое масло',
          url: '/oil',
          icon: 'mdi-bottle-tonic-plus-outline'
        },
        {
          title: 'Посуда и аксессуары',
          url: '/dishes',
          icon: 'mdi-glass-tulip'
        },
        { title: 'Подарки', url: '/gifts', icon: 'mdi-gift-outline' }
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

<style scoped>
.formatIcons {
  max-width: 45px;
}
</style>
