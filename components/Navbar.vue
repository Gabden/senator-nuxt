<template>
  <nav>
    <v-app-bar app color="grey lighten-5" height="80">
      <v-btn class="hidden-lg-and-up" text @click="openNavDrawer"
        ><v-icon>mdi-menu</v-icon></v-btn
      >
      <div v-if="$auth.loggedIn" class="hidden-md-and-down">
        <v-btn text nuxt to="/account">{{ $auth.user.username }}</v-btn> |
        <v-btn v-if="isAdmin" text to="/admin"
          ><v-badge :content="quantityOrders" color="red" inline class="mt-0">
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
      <div :class="$vuetify.breakpoint.smAndDown ? 'formatIcons' : ''">
        <v-btn text rounded class="mr-0" @click="searchEvent"
          ><v-icon>mdi-magnify</v-icon>
          <span class="hidden-sm-and-down">Поиск</span>
        </v-btn>
      </div>
      <div
        :class="$vuetify.breakpoint.smAndDown ? 'formatIcons' : ''"
        class="mr-2"
      >
        <v-btn text rounded router to="/cart">
          <v-icon>mdi-cart-outline</v-icon>
          <v-badge :content="quantity" color="red">
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
              ><v-badge
                :content="quantityOrders"
                color="red"
                inline
                class="mt-0"
              >
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

        <v-expansion-panels flat class="grey lighten-4 px-0">
          <v-expansion-panel color="grey lighten-4">
            <v-expansion-panel-header color="grey lighten-4" class="pl-4"
              ><span class="pl-5">Все товары</span></v-expansion-panel-header
            >
            <v-expansion-panel-content class="grey lighten-5 px-0">
              <v-divider></v-divider>
              <div
                v-for="{ title, url, icon } in categories"
                :key="`${title} + key`"
                class="grey lighten-5 px-0"
              >
                <v-list-item link :to="url" class="grey lighten-5">
                  <v-list-item-content class="grey lighten-5">
                    <v-list-item-title
                      class="text-left ml-5"
                      color="grey lighten-5"
                    >
                      <v-icon color="red">{{ icon }}</v-icon>
                      {{ title }}</v-list-item-title
                    >
                  </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
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
        <v-list-item link to="/application">
          <v-list-item-content>
            <v-list-item-title class="text-left ml-5"
              >Моб. приложение</v-list-item-title
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
        <v-list-item link to="/business">
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
    <v-dialog v-model="searchDialog">
      <v-card>
        <v-card-title class="text-center text-justify">
          <v-row v-if="searchDialog" justify="center" class="mt-0 mb-0">
            <v-text-field
              v-model="searchText"
              hide-details
              rounded
              outlined
              dense
              color="orange"
              single-line
              append-icon="mdi-magnify"
              label="Поиск"
              class="pa-0"
              style="max-width: 75%"
              @click:append="findProducts"
              @keyup.enter="findProducts"
            >
            </v-text-field>
            <v-btn icon @click="searchDialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-row>
        </v-card-title>
      </v-card>
    </v-dialog>
  </nav>
</template>

<script>
import requestsService from '../services/requestsService'
import SenatorLogo from './SenatorLogo.vue'
import { CATEGORIES } from '@/constants/categories'

export default {
  components: {
    'senator-logo': SenatorLogo
  },
  data() {
    return {
      searchDialog: false,
      searchText: '',
      drawer: false
    }
  },
  computed: {
    isAdmin() {
      return this.$auth.user ? this.$auth.user.roles.includes('ADMIN') : false
    },
    isScrolled() {
      return this.$store.state.main.isScrolled
    },
    quantity() {
      if (this.$store.getters['localStorage/cartQuantity'] < 1) {
        return '0'
      }
      return this.$store.getters['localStorage/cartQuantity']
    },
    quantityOrders() {
      if (this.$store.state.localStorage.newOrders < 1) {
        return '0'
      }
      return this.$store.state.localStorage.newOrders
    }
  },
  created() {
    this.categories = CATEGORIES
    this.accountItems = [
      { title: 'Home', icon: 'mdi-dashboard' },
      { title: 'About', icon: 'mdi-question-answer' }
    ]
  },
  async mounted() {
    await this.pollOrdersQuantity()
  },
  methods: {
    logout() {
      this.$auth
        .logout()
        .then((result) => {
          requestsService.setAuthToken('empty')
          this.$axios.defaults.headers.common.Authorization = null
        })
        // eslint-disable-next-line handle-callback-err
        .catch((err) => {
          requestsService.setAuthToken('empty')
          this.$axios.defaults.headers.common.Authorization = null
        })
    },
    openNavDrawer() {
      this.drawer = !this.drawer
    },
    searchEvent() {
      this.searchDialog = !this.searchDialog
      this.$emit('search', true)
    },
    findProducts() {
      this.searchDialog = false
      this.$router.push({ name: 'search', query: { text: this.searchText } })
    },
    async pollOrdersQuantity() {
      if (this.$auth.loggedIn && this.$auth.user.roles.includes('ADMIN')) {
        await this.$axios
          .get(`/api/admin/orders/new`)
          .then((response) => {
            this.$store.commit(
              'localStorage/SET_ORDERS_QUANTITY',
              response.data
            )
          })
          .catch((e) => {
            this.$toasted
              .error('Сервер временно недоступен, повторите попытку позже!')
              .goAway(2000)
          })
      }
    }
  }
}
</script>

<style scoped>
.formatIcons {
  max-width: 45px;
}
</style>
