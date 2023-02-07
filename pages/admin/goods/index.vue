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
    <div>
      <p class="grey--text">Всего найдено: {{ productsInfo.totalElements }}</p>
    </div>
    <div
      v-for="product in sortedProducts"
      :key="product.productId"
      class="my-5"
    >
      <v-divider></v-divider>
      <ProductListItem :product="product" :page="page" />
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
    let { page } = context.route.query
    page = page ? page * 1 : 1
    return context.$axios
      .get('/api/admin/products?page=' + (page - 1))
      .then((response) => {
        const productsInfo = response.data
        return { productsInfo, page }
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
      IdForFind: '',
      textForFind: ''
    }
  },
  computed: {
    sortedProducts() {
      return (
        this.productsInfo?.content?.reduce((acc, product) => {
          if (product.productDetails.productUnitInStock < 1) {
            acc.push(product)
          } else {
            acc.unshift(product)
          }
          return acc
        }, []) || []
      )
    }
  },
  watch: {
    page(newValue, oldValue) {
      this.updateProducts(newValue)
    }
  },
  methods: {
    async findProductByText() {
      this.$store.commit('SWITCH_LOADER', true)
      await this.$axios
        .get(`/api/admin/product/search?text=${this.textForFind}`)
        .then((response) => {
          this.$store.commit('SWITCH_LOADER', false)
          this.productsInfo = response.data
        })
        .catch((e) => {
          this.$store.commit('SWITCH_LOADER', false)
          this.$toasted
            .error('Сервер временно недоступен, повторите попытку позже!')
            .goAway(2000)
        })
    },
    async findProductById() {
      this.$store.commit('SWITCH_LOADER', true)
      await this.$axios
        .get(`/api/admin/product/${this.IdForFind}`)
        .then((response) => {
          this.productsInfo.content = [response.data]
          this.productsInfo.totalPages = 1
          this.productsInfo.totalElements = 1
          this.$store.commit('SWITCH_LOADER', false)
        })
        .catch((e) => {
          this.$store.commit('SWITCH_LOADER', false)
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
      this.$store.commit('SWITCH_LOADER', true)
      await this.$axios
        .get(url)
        .then((response) => {
          this.$store.commit('SWITCH_LOADER', false)
          this.productsInfo = response.data
        })
        .catch((e) => {
          this.$store.commit('SWITCH_LOADER', false)
          this.$toasted
            .error('Сервер временно недоступен, повторите попытку позже!')
            .goAway(2000)
        })
    }
  },
  head() {
    return {
      title: '«СЕНАТОР» - страница администрирования товаров'
    }
  }
}
</script>

<style></style>
