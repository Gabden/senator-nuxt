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
    <v-col class="my-auto d-flex flex-column">
      <v-btn icon nuxt :to="`/admin/orders/edit/${order.customerOrderId}`">
        <v-icon class="display-1 my-auto">mdi-pencil-box</v-icon></v-btn
      >
      <v-btn icon class="mr-3" @click="deleteDialog = true">
        <v-icon color="red accent-4" class="display-1">mdi-delete</v-icon>
      </v-btn>
    </v-col>
    <v-dialog v-model="deleteDialog" max-width="290">
      <v-card>
        <v-card-title class="text-center text-justify"
          >Заказ #{{ order.customerOrderId }}</v-card-title
        >
        <v-card-text>Подтвердите удаление заказа!</v-card-text>

        <v-card-actions>
          <v-btn color="green darken-1" text @click="deleteDialog = false">
            Отмена
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="deleteOrder">
            Удалить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
  data() {
    return {
      deleteDialog: false
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
    deleteOrder() {
      this.$store.commit('SWITCH_LOADER', true)
      this.$axios
        .post(`/api/admin/order/delete/${this.order.customerOrderId}`)
        .then((response) => {
          this.$store.commit('SWITCH_LOADER', false)
          this.$toasted.success('Товар удален!').goAway(2000)
        })
        .catch((e) => {
          this.$store.commit('SWITCH_LOADER', false)
          this.$toasted
            .error('Сервер временно недоступен, повторите попытку позже!')
            .goAway(2000)
        })
      this.deleteDialog = false
    }
  }
}
</script>

<style scoped>
.btn--status {
  cursor: default;
}
</style>
