<template>
  <v-card width="400" class="mx-auto my-5">
    <v-card-title class="grey lighten-4">
      <h1 class="display-1 mx-auto">Личный кабинет</h1>
    </v-card-title>
    <p v-if="error" class="red--text text-center mt-3">{{ errorMsg }}</p>
    <v-card-text>
      <v-form v-model="formValidity" @submit.prevent="login">
        <v-text-field
          v-model="username"
          label="Email"
          prepend-icon="mdi-account-circle"
          :rules="usernameRules"
          class="mt-3"
          required
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="Пароль"
          :type="showPassword ? 'text' : 'password'"
          prepend-icon="mdi-lock"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="passwordRules"
          class="mb-3"
          required
          @click:append="showPassword = !showPassword"
        ></v-text-field>
        <v-card-actions>
          <v-btn color="success" type="submit" :disabled="!formValidity"
            >Войти</v-btn
          >
          <v-spacer></v-spacer>
          <nuxt-link to="/restore">Забыли пароль?</nuxt-link>
        </v-card-actions>
      </v-form>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions class="caption grey lighten-4">
      <span>Еще нет аккаунта?</span>
      <v-spacer></v-spacer>
      <nuxt-link to="/registration">Зарегистрироваться</nuxt-link>
    </v-card-actions>
  </v-card>
</template>

<script>
import requestsService from '../services/requestsService'
export default {
  data() {
    return {
      formValidity: false,
      showPassword: false,
      username: '',
      password: '',
      error: false,
      errorMsg: 'Неправильный адрес электронной почты или пароль',
      usernameRules: [
        (value) => !!value || 'Необходимо ввести адрес электронной почты',
        (value) => value.indexOf('@') !== 0 || 'Email должен содержать имя',
        (value) => value.includes('@') || 'Email должен включать @ символ',
        (value) =>
          value.indexOf('@') < value.lastIndexOf('.') ||
          'Email должен содержать точку после домена',
        (value) =>
          value.indexOf('.') <= value.length - 3 ||
          'Email должен содержать доменную зону'
      ],
      passwordRules: [(value) => !!value || 'Необходимо ввести пароль']
    }
  },
  methods: {
    async login() {
      await this.$auth
        .loginWith('local', {
          data: {
            username: this.username,
            password: this.password
          }
        })
        .then(({ data }) => {
          requestsService.setAuthToken(data.token)
          this.$axios.defaults.headers.common.Authorization =
            'Bearer ' + data.token
          this.$store.commit(
            'localStorage/SET_CART_ID',
            this.$auth.user.cart.cartId
          )
          this.$auth.user.cart.cartItems.forEach((item) => {
            this.$store.commit('localStorage/ADD_TO_CART', {
              product: item.product,
              quantity: item.quantity,
              cartItemPrice: item.cartItemPrice,
              cartItemFinalPrice: item.cartItemFinalPrice,
              discount: item.discount,
              totalPrice: item.totalPrice
            })
          })
        })
        .catch((e) => (this.error = true))

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
  },
  head() {
    return {
      title: '«СЕНАТОР» - вход в учетную запись'
    }
  }
}
</script>

<style></style>
