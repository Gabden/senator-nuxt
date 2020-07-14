<template>
  <div>
    <h1 class="text-center">Страница администрирования заказов</h1>
    <h3 class="text-center">
      Здесь вы можете создать, удалить или отредактировать заказ
    </h3>
    <v-text-field
      v-model="orderId"
      type="number"
      label="Поиск по ID"
      prepend-icon="mdi-bottle-wine"
      append-icon="mdi-magnify"
      @click:append="findOrderById"
      @keyup.enter="findOrderById"
    ></v-text-field>
    <v-pagination v-model="page" :length="15" :total-visible="7"></v-pagination>
    <div v-for="n in 3" :key="n" class="my-5 order--border-success order-item">
      <OrderListItem />
    </div>
    <v-pagination v-model="page" :length="15" :total-visible="7"></v-pagination>
  </div>
</template>

<script>
import OrderListItem from '@/components/admin/OrderListItem.vue'
export default {
  components: {
    OrderListItem
  },
  data() {
    return {
      orderId: null,
      page: 1
    }
  },
  methods: {
    findOrderById() {
      console.log(this.orderId)
      this.orderId = null
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
