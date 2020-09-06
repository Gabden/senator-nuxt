<template>
  <v-row class="text-center">
    <v-col class="my-auto">Id: {{ order.customerOrderId }}</v-col>
    <v-col>
      <div class="mt-4">
        <span>{{ order.user.username }}</span> <br />
        <span>{{ order.user.userDetailsDescription.phone }}</span>
      </div>
    </v-col>
    <v-col class="my-auto">Дата: {{ order.timestamp.slice(0, 10) }}</v-col>
    <v-col class="my-auto">Сумма: {{ order.reservedCart.grandTotal }}</v-col>
    <v-col class="my-auto">
      <v-btn tile outlined color="green darken-1" class="ma-5 btn--status">
        {{ buttonStatus }}
      </v-btn></v-col
    >
    <v-col class="my-auto">
      <v-btn icon @click="editOrderById">
        <v-icon class="display-1 my-auto">mdi-pencil-box</v-icon></v-btn
      >
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    order: {
      type: Object,
      required: true
    }
  },
  computed: {
    buttonStatus() {
      switch (this.order.status) {
        case 'created': {
          return 'создан'
        }
        case 'confirmation': {
          return 'в обработке'
        }
        case 'processed': {
          return 'исполнен'
        }
        case 'canceled': {
          return 'отменен'
        }
      }
      return 'создан1'
    }
  },
  methods: {
    editOrderById() {
      console.log('editOrderById')
    }
  }
}
</script>

<style scoped>
.btn--status {
  cursor: default;
}
</style>
