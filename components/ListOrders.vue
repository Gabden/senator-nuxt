<template>
  <v-list :width="smallSize ? '350' : '900'">
    <v-list-item-group color="primary">
      <template v-if="orders.length > 0">
        <v-list-item v-for="(order, i) in orders" :key="i">
          <v-expansion-panels>
            <v-expansion-panel class="my-2" :class="btnStatus(order).border">
              <v-expansion-panel-header class="pa-0">
                <v-card-text class="d-flex justify-around"
                  ><span
                    class="title mt-2"
                    :class="smallSize ? 'order-name-sm' : ''"
                    >Заказ #{{ order.customerOrderId }} от
                    {{ order.timestamp.slice(0, 10) }} на сумму:
                    {{ order.reservedCart.grandTotal }} руб.</span
                  >
                  <v-spacer></v-spacer>
                  <v-btn
                    class="ma-2"
                    tile
                    outlined
                    :color="btnStatus(order).buttonColor"
                    :class="smallSize ? 'status-btn-sm' : ''"
                  >
                    <v-icon :left="!smallSize">{{
                      btnStatus(order).icon
                    }}</v-icon>
                    <span v-if="!smallSize">{{
                      btnStatus(order).buttonText
                    }}</span>
                  </v-btn>
                </v-card-text>
              </v-expansion-panel-header>
              <v-expansion-panel-content class="ma-2">
                <div
                  v-for="item in order.reservedCart.reservedCartItems"
                  :key="item.reservedProductId"
                  class="mb-5"
                >
                  <v-divider></v-divider>
                  <ordered-product-list-item :item="item" />
                </div>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-list-item>
      </template>
      <template v-else>
        <p class="display-2 text-center my-5 grey--text">Нет заказов</p>
      </template>
    </v-list-item-group>
  </v-list>
</template>

<script>
import OrderedProductListItem from './OrderedProductListItem.vue'
export default {
  components: {
    OrderedProductListItem
  },
  props: {
    orders: {
      type: Array,
      required: true
    }
  },
  computed: {
    smallSize() {
      return this.$vuetify.breakpoint.smAndDown
    }
  },
  methods: {
    btnStatus(order) {
      switch (order.status) {
        case 'created': {
          return {
            buttonText: 'создан',
            buttonColor: 'primary',
            border: 'order--border-new',
            icon: 'mdi-alert-decagram'
          }
        }
        case 'confirmation': {
          return {
            buttonText: 'в обработке',
            buttonColor: 'lime',
            border: 'order--border-process',
            icon: 'mdi-clock-check'
          }
        }
        case 'processed': {
          return {
            buttonText: 'исполнен',
            buttonColor: 'success',
            border: 'order--border-success',
            icon: 'mdi-check-bold'
          }
        }
        case 'canceled': {
          return {
            buttonText: 'отменен',
            buttonColor: 'red',
            border: 'order--border-canceled',
            icon: 'mdi-close-circle'
          }
        }
      }
      return { buttonText: 'отменен', buttonColor: 'red' }
    }
  }
}
</script>

<style scoped>
.status-btn-sm {
  font-size: 0.6rem !important;
}
.order-name-sm {
  font-size: 0.9rem !important;
}
</style>
