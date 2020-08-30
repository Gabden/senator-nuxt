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
      v-model="IdForFind"
      type="number"
      label="Поиск по ID"
      prepend-icon="mdi-bottle-wine"
      append-icon="mdi-magnify"
      @click:append="findProductById"
      @keyup.enter="findProductById"
    ></v-text-field>
    <v-text-field
      v-model="textForFind"
      label="Поиск"
      prepend-icon="mdi-bottle-wine"
      append-icon="mdi-magnify"
      @click:append="findProductByText"
      @keyup.enter="findProductByText"
    ></v-text-field>
    <v-pagination
      v-model="page"
      :length="productsInfo.totalPages"
      :total-visible="7"
    ></v-pagination>
    <div>
      <p class="grey--text">Всего найдено: {{ productsInfo.totalElements }}</p>
    </div>
    <div
      v-for="product in productsInfo.content"
      :key="product.productId"
      class="my-5"
    >
      <v-divider></v-divider>
      <ProductListItem :product="product" />
    </div>
    <v-pagination
      v-model="page"
      :length="productsInfo.totalPages"
      :total-visible="7"
    ></v-pagination>
  </div>
</template>

<script>
import ProductListItem from '../../../components/admin/ProductListItem'
export default {
  middleware: 'auth-admin',
  components: {
    ProductListItem
  },
  asyncData(context) {
    return context.$axios
      .get('/api/admin/products')
      .then((response) => {
        const productsInfo = response.data
        return { productsInfo }
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
      page: 1,
      IdForFind: '',
      textForFind: ''
    }
  },
  watch: {
    page(newValue, oldValue) {
      this.updateProducts(newValue)
    }
  },
  methods: {
    async findProductByText() {
      await this.$axios
        .get(`/api/admin/product/search?text=${this.textForFind}`)
        .then((response) => {
          this.productsInfo = response.data
        })
        .catch((e) => {
          this.$toasted
            .error('Сервер временно недоступен, повторите попытку позже!')
            .goAway(2000)
        })
    },
    async findProductById() {
      await this.$axios
        .get(`/api/admin/product/${this.IdForFind}`)
        .then((response) => {
          this.productsInfo.content = [response.data]
          this.productsInfo.totalPages = 1
          this.productsInfo.totalElements = 1
        })
        .catch((e) => {
          this.$toasted
            .error('Сервер временно недоступен, повторите попытку позже!')
            .goAway(2000)
        })
    },
    async updateProducts(newPage) {
      let url = '/api/admin/products?page=' + (newPage - 1)
      if (this.textForFind) {
        url = `/api/admin/product/search?text=${
          this.textForFind
        }&page=${newPage - 1}`
      }
      await this.$axios
        .get(url)
        .then((response) => {
          this.productsInfo = response.data
        })
        .catch((e) => {
          this.$toasted
            .error('Сервер временно недоступен, повторите попытку позже!')
            .goAway(2000)
        })
    }
  }
}
</script>

<style></style>
