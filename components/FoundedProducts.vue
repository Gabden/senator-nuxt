<template>
  <div>
    <v-row>
      <v-col cols="12" md="3">
        <FilterProduct @filter="filterProducts" />
      </v-col>
      <v-col cols="12" md="9">
        <p
          v-if="!products.content || products.content.length === 0"
          class="display-2 text-center my-5 grey--text"
        >
          Ничего не удалось найти
        </p>
        <div v-if="products.content && products.content.length > 0">
          <p class="grey--text">Всего найдено: {{ products.totalElements }}</p>
        </div>

        <v-row>
          <v-col
            v-for="product in sortedProducts"
            :key="product.id"
            cols="10"
            sm="6"
            md="4"
            xl="3"
            class="mx-auto"
          >
            <product-card :product="product"
          /></v-col>
        </v-row>

        <v-pagination
          v-if="products.content && products.content.length > 0"
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
  props: {
    products: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      page: 1,
      filterCriteria: null
    }
  },
  computed: {
    sortedProducts() {
      return (
        this.products?.content?.reduce((acc, product) => {
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
    '$route.query'() {
      this.changePageByQuery()
    }
  },
  created() {
    this.changePageByQuery()
  },
  methods: {
    async changePage() {
      await this.$router.push({
        query: { ...this.$route.query, page: this.page }
      })
      this.$emit('changePage', this.page)
    },
    filterProducts(payload) {
      this.page = 1
      this.filterCriteria = payload
      this.$emit('filtered', this.filterCriteria)
    },
    changePageByQuery() {
      const { page } = this.$route.query
      if (page && page !== this.page) {
        this.page = +page
        this.$emit('changePage', page)
      }
    }
  }
}
</script>

<style></style>
