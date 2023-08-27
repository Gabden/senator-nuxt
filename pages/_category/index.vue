<template>
  <FoundedProducts
    :products="products"
    @changePage="changePage"
    @filtered="filterProducts"
  />
</template>

<script>
import FoundedProducts from '@/components/FoundedProducts'
import { CATEGORIES } from '@/constants/categories'

export default {
  components: {
    FoundedProducts
  },
  async asyncData(context) {
    let products = null
    try {
      const response = await context.$axios.get(
        `/api/product/search/category?name=${context.params.category}`
      )
      const { data } = response
      products = data
    } catch (error) {
      context.error({
        statusCode: 500,
        message: 'Сервер временно недоступен, повторите попытке позже'
      })
    }

    return { products, category: context.params.category }
  },
  data() {
    return {
      filterCriteria: null
    }
  },
  computed: {
    categoryConfig() {
      return CATEGORIES.find(({ code }) => code === this.category)
    }
  },
  methods: {
    async changePage(newPage) {
      if (this.filterCriteria) {
        await this.getFilteredProducts(this.filterCriteria, newPage)
        return
      }

      this.$store.commit('SWITCH_LOADER', true)

      try {
        const response = await this.$axios.get(
          `/api/product/search/category?name=${this.category}&page=${newPage -
            1}`
        )
        const { data } = response
        this.products = data
      } catch (error) {
        this.$store.$toasted
          .error('Сервер временно недоступен, повторите попытку позже!')
          .goAway(2000)
      }

      this.$store.commit('SWITCH_LOADER', false)
    },
    async filterProducts(criteria) {
      this.filterCriteria = criteria
      await this.getFilteredProducts(this.filterCriteria, 1)
    },
    async getFilteredProducts(filter, page) {
      this.$store.commit('SWITCH_LOADER', true)

      try {
        const response = await this.$axios.post(
          `/api/product/filter?page=${page - 1}`,
          filter
        )
        const { data } = response
        this.products = data
      } catch (error) {
        this.$store.$toasted
          .error('Сервер временно недоступен, повторите попытку позже!')
          .goAway(2000)
      }

      this.$store.commit('SWITCH_LOADER', false)
    }
  },
  head() {
    const defaultTitle =
      '«СЕНАТОР» - купить премиум алкоголь и подарки в бутике senator-wine.ru'
    const defaultContent =
      'Скидки на премиум алкоголь в магазине «СЕНАТОР»! Полный ассортимент, подробное описание, цены и скидки ☎ +7(4912)-28-19-37.'
    const { title = defaultTitle, content = defaultContent } =
      this.categoryConfig ?? {}
    return {
      title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content
        }
      ]
    }
  }
}
</script>

<style></style>
