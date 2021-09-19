<template>
  <div>
    <h1 class="text-center">Страница администрирования заказов</h1>
    <h3 class="text-center">
      Здесь вы можете создать, удалить или отредактировать заказ
    </h3>
    <v-text-field
      v-model="orderId"
      type="number"
      label="Поиск по ID заказа"
      prepend-icon="mdi-bottle-wine"
      append-icon="mdi-magnify"
      @click:append="findOrderById"
      @keyup.enter="findOrderById"
    ></v-text-field>
    <v-text-field
      v-model="phone"
      v-mask="'+7(###)###-####'"
      label="Поиск по телефону "
      prepend-icon="mdi-phone"
      append-icon="mdi-magnify"
      @click:append="findOrdersByPhone"
      @keyup.enter="findOrdersByPhone"
    ></v-text-field>
    <v-text-field
      v-model="email"
      label="Поиск по email "
      prepend-icon="mdi-email"
      append-icon="mdi-magnify"
      @click:append="findOrderByEmail"
      @keyup.enter="findOrderByEmail"
    ></v-text-field>
    <div>
      <p class="grey--text">Всего найдено: {{ orders.totalElements }}</p>
    </div>
    <div
      v-for="order in orders.content"
      :key="order.customerOrderId"
      class="order-item"
    >
      <OrderListItem :order="order" class="mb-2" />
    </div>
    <v-pagination
      v-model="page"
      :length="orders.totalPages"
      :total-visible="7"
    ></v-pagination>
  </div>
</template>

<script>
import OrderListItem from '@/components/admin/OrderListItem.vue'
export default {
  middleware: 'auth-admin',
  components: {
    OrderListItem
  },
  asyncData(context) {
    context.store.commit('SWITCH_LOADER', true)
    return context.$axios
      .get('/api/admin/orders/all')
      .then((response) => {
        context.store.commit('SWITCH_LOADER', false)
        const orders = response.data
        return { orders }
      })
      .catch((e) => {
        context.store.commit('SWITCH_LOADER', false)
        context.$toasted
          .error('Сервер временно недоступен, повторите попытку позже!')
          .goAway(2000)
      })
  },
  data() {
    return {
      orderId: null,
      page: 1,
      phone: '',
      email: '',
      currentState: ''
    }
  },
  watch: {
    page(newValue, oldValue) {
      this.updateOrders(newValue)
    }
  },
  methods: {
    orderBorder(status) {
      switch (this.order.status) {
        case 'created': {
          return 'order--border-new'
        }
        case 'confirmation': {
          return 'order--border-process'
        }
        case 'processed': {
          return 'order--border-success'
        }
        case 'canceled': {
          return 'order--border-canceled '
        }
      }
      return 'red'
    },
    updateOrders(newPage) {
      let url = '/api/admin/orders/all?page=' + (newPage - 1)
      if (this.currentState === 'phone') {
        url = `/api/admin/orders/search?phone=${this.phone}&page=${newPage - 1}`
      } else if (this.currentState === 'email') {
        url = `/api/admin/orders/search?email=${this.email}&page=${newPage - 1}`
      }

      this.findOrders(url)
    },
    findOrderById() {
      const url = `/api/admin/order/${this.orderId}`
      this.$store.commit('SWITCH_LOADER', true)
      this.$axios
        .get(url)
        .then((response) => {
          this.$store.commit('SWITCH_LOADER', false)
          this.orders.content = [response.data]
          this.orders.totalPages = 1
          this.orders.totalElements = 1
        })
        .catch((e) => {
          this.$store.commit('SWITCH_LOADER', false)
          this.$store.$toasted
            .error('Сервер временно недоступен, повторите попытку позже!')
            .goAway(2000)
        })
    },
    findOrdersByPhone() {
      this.currentState = 'phone'
      const url = `/api/admin/orders/search?phone=${this.phone}`
      this.findOrders(url)
    },
    findOrderByEmail() {
      this.currentState = 'email'
      const url = `/api/admin/orders/search?email=${this.email}`
      this.findOrders(url)
    },
    findOrders(url) {
      this.$store.commit('SWITCH_LOADER', true)
      this.$axios
        .get(url)
        .then((response) => {
          this.$store.commit('SWITCH_LOADER', false)
          this.orders = response.data
        })
        .catch((e) => {
          this.$store.commit('SWITCH_LOADER', false)
          this.$store.$toasted
            .error('Сервер временно недоступен, повторите попытку позже!')
            .goAway(2000)
        })
    }
  },
  head() {
    return {
      title: '«СЕНАТОР» - страница администрирования заказов'
    }
  }
}
</script>

<style scoped>
.order-item:hover {
  background-color: #eceff1;
}
</style>
