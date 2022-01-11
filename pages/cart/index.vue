<template>
  <v-container>
    <v-card
      v-if="this.$store.getters['localStorage/cartQuantity'] < 1"
      class="mx-auto text-center pa-5"
      color="green lighten-5"
    >
      <v-card-text class="display-2">
        <v-icon class="display-4">mdi-cart-off</v-icon>Корзина
        пуста</v-card-text
      >
    </v-card>
    <div v-else>
      <v-card class="mx-auto text-center" color="green lighten-5">
        <v-card-text class="font-weight-bold">
          <p class="green--text text--darken-4 display-1">
            Внимание!
          </p>
          <p class="green--text text--darken-3">
            При заказе от
            <span class="red--text text--accent-4"> 3 ЕДИНИЦ ТОВАРА</span> из
            категории алкоголь действует скидка
            <span class="red--text text--accent-4">15%</span>
          </p>
          <v-divider class="mx-auto mb-5" style="max-width: 80%"></v-divider>
          <p class="mb-1 green--text text--darken-3">
            Скидка активируется автоматически при выполнении условий описанных
            выше
          </p>
          <p class="mb-1 green--text text--darken-3">
            Дополнительная скидка не применяется на товары по акции
          </p>
          <p class="ma-0 green--text text--darken-3">
            Зарезервированный товар вы сможете получить в магазине Сенатор
          </p>
        </v-card-text>
      </v-card>

      <div
        v-for="(item, index) in $store.state.localStorage.cart.cartItems"
        :key="index"
      >
        <CartItem :product-item="item" @changed="updateCart" />
        <v-divider></v-divider>
      </div>
      <v-divider></v-divider>
      <div
        class="my-5 font-weight-bold d-flex flex-column justify-center align-center"
      >
        <v-col cols="12">
          <p
            class="mb-0 ml-5 text-center"
            style="text-decoration: line-through;"
          >
            Итого: {{ $store.getters['localStorage/grandTotal'] }} руб.
          </p>
          <p class="ml-5 red--text text--accent-4 text-center display-1">
            ИТОГО со скидкой:
            <span
              >{{
                $store.getters['localStorage/grandTotalWithSale']
              }}
              руб.</span
            >
          </p>
        </v-col>
        <v-col cols="4" class="d-flex justify-center">
          <v-btn large color="success" @click="confirmDialog = true"
            >оформить резерв</v-btn
          ></v-col
        >
        <v-dialog v-model="confirmDialog" max-width="400">
          <v-card class="text-justify">
            <v-card-title class="headline d-flex justify-center"
              >Внимание</v-card-title
            >

            <v-card-text class="text-center">
              <span style="font-size: 1.2rem">
                Зарезирвированные товары вы сможете забрать в магазине "Сенатор
                Лучшие Вина Мира" по адресу г.Рязань ул.Свободы д.24а
              </span>
              <v-divider class="my-5"></v-divider>
              <span class="text-justify" style="font-size: 0.8rem"
                >Нажимая на кнопку оформить резерв, Вы соглашаетесь на обработку
                Ваших персональных данных и подтверждаете, что ознакомились c
                <nuxt-link router to="/rules"
                  >Пользовательским соглашением</nuxt-link
                >
                и
                <nuxt-link router to="/confidential"
                  >Политикой конфиденциальности</nuxt-link
                ></span
              >
            </v-card-text>

            <v-card-actions class="d-flex justify-center">
              <v-btn
                color="red accent-4"
                class="mb-5"
                dark
                @click="createOrder"
              >
                оформить резерв
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </div>
  </v-container>
</template>

<script>
import CartItem from '@/components/cart/CartItem'
export default {
  components: {
    CartItem
  },
  data() {
    return {
      confirmDialog: false
    }
  },
  computed: {
    alcoQuantity() {
      return this.$store.getters['localStorage/quantityAlcohol']
    }
  },
  watch: {
    alcoQuantity() {
      this.$store.commit(
        'localStorage/CALC_DISCOUNT',
        this.$store.getters['localStorage/quantityAlcohol']
      )
    }
  },
  created() {
    this.$store.commit(
      'localStorage/CALC_DISCOUNT',
      this.$store.getters['localStorage/quantityAlcohol']
    )
    this.updateCart()
  },
  methods: {
    async updateCart() {
      if (this.$auth.loggedIn) {
        this.$store.commit('SWITCH_LOADER', true)
        if (this.$auth.loggedIn) {
          await this.$axios
            .post(`/api/account/cart/update/${this.$auth.user.cart.cartId}`, {
              cartId: this.$auth.user.cart.cartId,
              cartItems: this.$store.state.localStorage.cart.cartItems,
              grandTotal: this.$store.getters['localStorage/grandTotalWithSale']
            })
            .then((response) => {
              this.$store.commit('SWITCH_LOADER', false)
            })
            .catch((e) => {
              this.$store.commit('SWITCH_LOADER', false)
              this.$toasted
                .error('Сервер временно недоступен, повторите попытку позже!')
                .goAway(2000)
            })
        }
      }
    },
    async createOrder() {
      if (!this.$auth.loggedIn) {
        this.$router.push('/login')
      } else {
        await this.$axios
          .post(`/api/account/create/order/${this.$auth.user.id}`, {
            cartId: this.$auth.user.cart.cartId,
            cartItems: this.$store.state.localStorage.cart.cartItems,
            grandTotal: this.$store.getters['localStorage/grandTotalWithSale']
          })
          .then((response) => {
            this.$store.commit('SWITCH_LOADER', false)
            this.confirmDialog = false
            this.$store.dispatch('localStorage/clearCart')
            this.updateCart()
            this.$router.push('/confirmation')
          })
          .catch((e) => {
            this.$store.commit('SWITCH_LOADER', false)
            this.confirmDialog = false
            this.$toasted
              .error('Сервер временно недоступен, повторите попытку позже!')
              .goAway(2000)
          })
      }
    }
  },
  head() {
    return {
      title: '«СЕНАТОР» - корзина посетителя',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            '«СЕНАТОР»: просмотр корзины товаров. Для оформления заказа необходима регистрация.'
        }
      ]
    }
  }
}
</script>

<style></style>
