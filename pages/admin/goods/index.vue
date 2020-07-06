<template>
  <div>
    <h1 class="text-center">Страница администрирования товаров</h1>
    <h3 class="text-center">
      Здесь вы можете создать, удалить или отредактировать товар
    </h3>
    <v-btn
      class="my-5"
      tile
      outlined
      color="success darken-1"
      link
      to="/admin/goods/create"
      >СОЗДАТЬ
    </v-btn>
    <v-text-field
      type="number"
      label="Поиск по ID"
      prepend-icon="mdi-bottle-wine"
      append-icon="mdi-magnify"
      required
    ></v-text-field>
    <v-text-field
      label="Поиск"
      prepend-icon="mdi-bottle-wine"
      append-icon="mdi-magnify"
      required
    ></v-text-field>
    <v-pagination v-model="page" :length="15" :total-visible="7"></v-pagination>
    <div v-for="n in 3" :key="n" class="my-5">
      <v-divider></v-divider>
      <ProductListItem />
    </div>
    <v-pagination v-model="page" :length="15" :total-visible="7"></v-pagination>
  </div>
</template>

<script>
import ProductListItem from '../../../components/admin/ProductListItem'
export default {
  components: {
    ProductListItem
  },
  data() {
    return {
      page: 1
    }
  }
}
</script>

<style></style>
