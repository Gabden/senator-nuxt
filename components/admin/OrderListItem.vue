<template>
  <v-row class="text-center" :class="btnStatus.border">
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
      <v-btn
        tile
        outlined
        :color="btnStatus.buttonColor"
        class="ma-5 btn--status"
      >
        {{ btnStatus.buttonText }}
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
    btnStatus() {
      switch (this.order.status) {
        case 'created': {
          return {
            buttonText: 'создан',
            buttonColor: 'primary',
            border: 'order--border-new'
          }
        }
        case 'confirmation': {
          return {
            buttonText: 'в обработке',
            buttonColor: 'lime',
            border: 'order--border-process'
          }
        }
        case 'processed': {
          return {
            buttonText: 'исполнен',
            buttonColor: 'success',
            border: 'order--border-success'
          }
        }
        case 'canceled': {
          return {
            buttonText: 'отменен',
            buttonColor: 'red',
            border: 'order--border-canceled'
          }
        }
      }
      return { buttonText: 'отменен', buttonColor: 'red' }
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
