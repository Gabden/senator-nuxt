<template>
  <v-list :width="smallSize ? '350' : '900'">
    <v-list-item-group color="primary">
      <template v-if="orders.length > 0">
        <v-list-item v-for="(order, i) in orders" :key="i">
          <v-expansion-panels>
            <v-expansion-panel class="order--border-process my-2">
              <v-expansion-panel-header class="pa-0">
                <v-card-text class="d-flex justify-around"
                  ><span
                    class="title mt-2"
                    :class="smallSize ? 'order-name-sm' : ''"
                    >Заказ #{{ order.customerOrderId }} на сумму:
                    {{ order.reservedCart.grandTotal }} руб.</span
                  >
                  <v-spacer></v-spacer>

                  <!-- <v-btn class="ma-2" tile outlined color="success">
              <v-icon left>mdi-check-bold</v-icon> ИСПОЛНЕН
            </v-btn> -->
                  <v-btn
                    class="ma-2"
                    tile
                    outlined
                    color="orange darken-1"
                    :class="smallSize ? 'status-btn-sm' : ''"
                  >
                    <v-icon :left="!smallSize">mdi-clock-check</v-icon>
                    <span v-if="!smallSize">В обработке</span>
                  </v-btn>

                  <!-- <v-btn class="ma-2" tile outlined color="light-blue darken-1">
              <v-icon left>mdi-alert-decagram</v-icon> Новый
            </v-btn> -->
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
}
.status-btn-sm {
  font-size: 0.6rem !important;
}
.order-name-sm {
  font-size: 0.9rem !important;
}
</style>
