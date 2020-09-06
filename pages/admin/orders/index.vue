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
    <v-pagination
      v-model="page"
      :length="orders.totalPages"
      :total-visible="7"
    ></v-pagination>
    <div
      v-for="order in orders.content"
      :key="order.customerOrderId"
      class="my-5 order--border-success order-item"
    >
      <OrderListItem :order="order" />
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
      email: ''
    }
  },
  watch: {
    page(newValue, oldValue) {
      this.updateOrders(newValue)
    }
  },
  methods: {
    updateOrders(newPage) {
      const url = '/api/admin/orders/all?page=' + (newPage - 1)
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
    },
    findOrderById() {
      console.log(this.orderId)
      this.orderId = null
    },
    findOrdersByPhone() {
      console.log(this.phone)
    },
    findOrderByEmail() {
      console.log(this.email)
    }
  }
}
</script>

<style scoped>
.order--border-success {
  border-left: 5px solid #00c853;
}
.order--border-process {
  border-left: 5px solid #fb8c00;
}
.order--border-new {
  border-left: 5px solid #039be5;
  border-radius: 2px;
}
.order-item:hover {
  background-color: #eceff1;
}
</style>
