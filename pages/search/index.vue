<template>
  <FoundedProducts
    :products="products"
    :types="types"
    :manufacturers="manufacturers"
    :countries="countries"
    @changePage="changePage"
    @filtered="filterProducts"
  />
</template>

<script>
import FoundedProducts from '@/components/FoundedProducts.vue'
export default {
  components: {
    FoundedProducts
  },
  async asyncData(context) {
    let products = null
    let types = null
    let manufacturers = null
    let countries = null
    await context.$axios
      .get(`/api/product/search?text=${context.query.text}`)
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
      filterCriteria: null
    }
  },
  methods: {
    changePage(newPage) {
      if (this.filterCriteria) {
        this.getFilteredProducts(this.filterCriteria, newPage)
        return
      }
      this.$store.commit('SWITCH_LOADER', true)
      this.$axios
        .get(
          `/api/product/search?text=${this.$route.query.text}&page=${newPage -
            1}`
        )
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
    },
    filterProducts(criteria) {
      this.filterCriteria = criteria
      this.getFilteredProducts(this.filterCriteria, 1)
    },
    getFilteredProducts(filter, page) {
      this.$store.commit('SWITCH_LOADER', true)
      this.$axios
        .post(`/api/product/filter?page=${page - 1}`, filter)
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
  watchQuery(newQuery, oldQuery) {
    return newQuery.text && oldQuery.text
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
