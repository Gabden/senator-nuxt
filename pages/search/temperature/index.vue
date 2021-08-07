<template>
  <FoundedProducts
    :products="products"
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
    await context.$axios
      .get(`/api/product/search/temperature?value=${context.query.value}`)
      .then((response) => {
        products = response.data
      })
      .catch((e) => {
        context.error({
          statusCode: 500,
          message: 'Сервер временно недоступен, повторите попытке позже'
        })
      })
    return { products }
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
          `/api/product/search/temperature?value=${
            this.$route.query.value
          }&page=${newPage - 1}`
        )
        .then((response) => {
          this.$store.commit('SWITCH_LOADER', false)
          this.products = response.data
        })
        .catch((e) => {
          this.$store.commit('SWITCH_LOADER', false)
          this.$toasted
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
          this.$toasted
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
      title:
        '«СЕНАТОР» - поиск премиум алкоголя и подарков по температуре подачи в Рязани',
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
