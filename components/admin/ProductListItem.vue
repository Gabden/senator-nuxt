<template>
  <v-row class="my-5">
    <v-img
      :src="imageSrc"
      max-width="200"
      max-height="180"
      aspect-ratio="0.85"
      contain
    ></v-img>
    <v-spacer v-if="!smallSize"></v-spacer>
    <v-col>
      <p class="font-weight-bold mb-1 subtitle">
        {{ product.productName }}
      </p>
      <p class="mb-2">
        <span class="caption">ЦЕНА: </span>
        <strong>{{ product.productPrice }}</strong> руб.
      </p>
      <p class="mb-2 red--text text--darken-4">
        <span v-if="product.productSalePrice" class="caption">АКЦИЯ: </span>
        <span v-else class="caption">ЦЕНА СО СКИДКОЙ: </span>
        <strong>{{ priceWithSale }}</strong> руб.
      </p>

      <p v-if="!product.productSalePrice" class="mb-2">
        <span class="caption">СКИДКА: </span>
        <strong>{{ product.discount }}%</strong>
      </p>
    </v-col>
    <v-spacer v-if="!smallSize"></v-spacer>
    <v-col class="d-flex flex-column">
      <v-btn icon nuxt :to="'/product/' + product.productId"
        ><v-icon class="display-1">mdi-information</v-icon></v-btn
      >
      <v-btn
        icon
        nuxt
        :to="'/admin/goods/edit/' + product.productId + '?page=' + page"
        class="my-3"
        ><v-icon class="display-1">mdi-pencil-box-multiple</v-icon></v-btn
      >
      <v-btn icon color="red"
        ><v-icon class="display-1" @click="dialog = true"
          >mdi-delete</v-icon
        ></v-btn
      >
    </v-col>
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="text-center text-justify">{{
          product.productName
        }}</v-card-title>
        <v-card-text>Подтвердите удаление товара!</v-card-text>

        <v-card-actions>
          <v-btn color="green darken-1" text @click="dialog = false">
            Отмена
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="red darken-1"
            text
            @click="deleteProduct(product.productId)"
          >
            Удалить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  props: {
    product: {
      type: Object,
      required: true
    },
    page: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      dialog: false
    }
  },
  computed: {
    smallSize() {
      return this.$vuetify.breakpoint.smAndDown
    },
    imageSrc() {
      if (!this.product) {
        return ''
      }
      return `/api/product/image/${this.product.productId}`
    },
    priceWithSale() {
      if (this.product.productSalePrice) {
        return this.product.productSalePrice
      }
      return Math.ceil(
        (+this.product.productPrice * (100 - this.product.discount)) / 100
      )
    }
  },
  methods: {
    async deleteProduct(id) {
      this.$store.commit('SWITCH_LOADER', true)
      await this.$axios
        .post(`/api/admin/product/delete/${id}`)
        .then((response) => {
          this.$store.commit('SWITCH_LOADER', false)
          this.$toasted.success('Товар удален!').goAway(2000)
          window.location.reload(true)
        })
        .catch((e) => {
          this.$store.commit('SWITCH_LOADER', false)
          this.$toasted
            .error('Сервер временно недоступен, повторите попытку позже!')
            .goAway(2000)
        })
      this.dialog = false
    }
  }
}
</script>

<style></style>
