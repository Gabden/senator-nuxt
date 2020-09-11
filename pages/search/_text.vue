<template>
  <div>
    <v-row>
      <v-col cols="3">
        <FilterProduct
          :types="types"
          :manufacturers="manufacturers"
          :countries="countries"
        />
      </v-col>
      <v-col cols="9">
        <div>
          <p class="grey--text">Всего найдено: {{ products.totalElements }}</p>
        </div>

        <v-row>
          <v-col
            v-for="(product, index) in products.content"
            :key="index"
            cols="3"
            class="mx-auto"
          >
            <product-card :product="product"
          /></v-col>
        </v-row>

        <v-pagination
          v-model="page"
          :length="products.totalPages"
          :total-visible="7"
          class="mb-5"
          @input="changePage"
        ></v-pagination>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ProductCard from '@/components/ProductCard.vue'
import FilterProduct from '@/components/FilterProduct.vue'
export default {
  components: {
    ProductCard,
    FilterProduct
  },
  async asyncData(context) {
    let products = null
    let types = null
    let manufacturers = null
    let countries = null
    await context.$axios
      .get('/api/home/notifications')
      .then((response) => {
        products = response.data
      })
      .catch((e) => {
        context.error({
          statusCode: 500,
          message: 'Сервер временно недоступен, повторите попытке позже'
        })
      })
    await context.$axios
      .get('/api/product/all/types')
      .then((response) => {
        types = response.data
      })
      .catch((e) => {
        context.error({
          statusCode: 500,
          message: 'Сервер временно недоступен, повторите попытке позже'
        })
      })
    await context.$axios
      .get('/api/product/all/manufacturers')
      .then((response) => {
        manufacturers = response.data
      })
      .catch((e) => {
        context.error({
          statusCode: 500,
          message: 'Сервер временно недоступен, повторите попытке позже'
        })
      })

    await context.$axios
      .get('/api/product/all/countries')
      .then((response) => {
        countries = response.data
      })
      .catch((e) => {
        context.error({
          statusCode: 500,
          message: 'Сервер временно недоступен, повторите попытке позже'
        })
      })
    return { products, types, manufacturers, countries }
  },
  data() {
    return {
      page: 1
    }
  },
  methods: {
    changePage() {
      this.$store.commit('SWITCH_LOADER', true)
      this.$axios
        .get(`/api/home/notifications?page=${this.page - 1}`)
        .then((response) => {
          this.$store.commit('SWITCH_LOADER', false)
          this.products = response.data
        })
        .catch((e) => {
          this.$store.commit('SWITCH_LOADER', false)
          this.$store.$toasted
            .error('Сервер временно недоступен, повторите попытку позже!')
            .goAway(2000)
        })
    }
  },
  head() {
    return {
      title: '«СЕНАТОР» - поиск премиум алкоголя и подарков в Рязани',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            "ООО 'Сенатор' 'Лучшие вина мира' и 'Галерея подарков' – компания работающая в сегменте алкоголя и подарков для взрослых премиум класса с 2005 года"
        }
      ]
    }
  }
}
</script>

<style></style>
