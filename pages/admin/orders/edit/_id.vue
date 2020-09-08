<template>
  <div>
    <h1 class="text-center">Страница администрирования резерва клиента</h1>
    <h3 class="text-center">
      Здесь вы можете изменить статус заказа, изменить количество товара и тд
    </h3>
    <div class="my-5 d-flex">
      <v-col cols="2">
        <v-select
          v-model="status"
          :items="orderStatuses"
          item-text="name"
          label="Cтатус"
          outlined
          dense
        ></v-select>
      </v-col>
      <v-col>
        <v-btn outlined color="success" class="my-1">Изменить</v-btn>
      </v-col>
    </div>
    <v-divider></v-divider>
    <div
      v-for="product in order.reservedCart.reservedCartItems"
      :key="product.reservedProductId"
    >
      <OrderProductItem :item="product" />
    </div>
  </div>
</template>

<script>
import OrderProductItem from '@/components/admin/OrderProductItem.vue'
export default {
  components: {
    OrderProductItem
  },
  asyncData(context) {
    return context.$axios
      .get('/api/admin/order/' + context.params.id)
      .then((response) => {
        const order = response.data
        return { order }
      })
      .catch((e) => {
        context.error({
          statusCode: 500,
          message: 'Сервер временно недоступен, повторите попытке позже'
        })
      })
  },
  data() {
    return {
      status: {},
      orderStatuses: [
        { name: 'Создан', value: 'created' },
        { name: 'В обработке', value: 'confirmation' },
        { name: 'Исполнен', value: 'processed' },
        { name: 'Отменен', value: 'canceled' }
      ]
    }
  }
}
</script>

<style></style>
