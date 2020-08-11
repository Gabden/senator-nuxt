<template>
  <v-container>
    <v-card
      v-if="false"
      class="mx-auto text-center pa-5"
      color="green lighten-5"
    >
      <v-card-text class="display-2">Корзина пуста</v-card-text>
    </v-card>
    <v-card class="mx-auto text-center" color="green lighten-5">
      <v-card-text class="font-weight-bold">
        <p class="green--text text--darken-4 display-1">
          Внимание!
        </p>
        <p class="green--text text--darken-3">
          При заказе от
          <span class="red--text text--accent-4"> 3 ЕДИНИЦ ТОВАРА</span> из
          категории алкоголь действует скидка
          <span class="red--text text--accent-4">15%</span>
        </p>
        <p class="green--text text--darken-3">
          При заказе от
          <span class="red--text text--accent-4"> 6 ЕДИНИЦ ТОВАРА</span> из
          категории алкоголь действует скидка
          <span class="red--text text--accent-4">20%</span>
        </p>
        <v-divider class="mx-auto mb-5" style="max-width: 80%"></v-divider>
        <p class="mb-1 green--text text--darken-3">
          Скидка активируется автоматически при выполнении условий описанных
          выше
        </p>
        <p class="mb-1 green--text text--darken-3">
          Дополнительная скидка не применяется на товары по акции
        </p>
        <p class="ma-0 green--text text--darken-3">
          Зарезервированный товар вы сможете получить в магазине Сенатор
        </p>
      </v-card-text>
    </v-card>
    <div>
      <v-divider></v-divider>
      <CartItem />
      <v-divider></v-divider>
      <CartItem />
      <v-divider></v-divider>
      <CartItem />
    </div>
    <v-divider></v-divider>
    <div
      class="my-5 font-weight-bold d-flex flex-column justify-center align-center"
    >
      <v-col cols="12">
        <p class="mb-0 ml-5 text-center" style="text-decoration: line-through;">
          Итого: 2520 руб.
        </p>
        <p class="ml-5 red--text text--accent-4 text-center display-1">
          ИТОГО со скидкой: <span>1200 руб.</span>
        </p>
      </v-col>
      <v-col cols="4" class="d-flex justify-center">
        <v-btn large link to="#" color="success">оформить резерв</v-btn></v-col
      >
    </div>
  </v-container>
</template>

<script>
import CartItem from '@/components/cart/CartItem'
export default {
  components: {
    CartItem
  }
}
</script>

<style></style>
