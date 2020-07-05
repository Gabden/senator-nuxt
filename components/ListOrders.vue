<template>
  <v-list>
    <v-list-item-group color="primary">
      <v-list-item v-for="(order, i) in orders" :key="i">
        <v-expansion-panels>
          <v-expansion-panel class="order--border-process my-2">
            <v-expansion-panel-header class="pa-0">
              <v-card-text class="d-flex justify-around"
                ><span class="title mt-2">{{ order }}</span>
                <v-spacer></v-spacer>

                <!-- <v-btn class="ma-2" tile outlined color="success">
              <v-icon left>mdi-check-bold</v-icon> ИСПОЛНЕН
            </v-btn> -->
                <v-btn class="ma-2" tile outlined color="orange darken-1">
                  <v-icon left>mdi-clock-check</v-icon> В обработке
                </v-btn>

                <!-- <v-btn class="ma-2" tile outlined color="light-blue darken-1">
              <v-icon left>mdi-alert-decagram</v-icon> Новый
            </v-btn> -->
              </v-card-text>
            </v-expansion-panel-header>
            <v-expansion-panel-content class="ma-2">
              <div v-for="index in 5" :key="index" class="mb-5">
                <v-divider></v-divider>
                <ordered-product-list-item />
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-list-item>
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
  data() {
    return {}
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
</style>
