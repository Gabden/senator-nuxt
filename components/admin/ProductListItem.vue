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
        <span class="caption">ЦЕНА СО СКИДКОЙ: </span>
        <strong>{{ priceWithSale }}</strong> руб.
      </p>

      <p v-if="product.productSalePrice" class="mb-2">
        <span class="caption">АКЦИЯ: </span>
      </p>

      <p v-else class="mb-2">
        <span class="caption">СКИДКА: </span>
        <strong>{{ product.discount }}%</strong>
      </p>
    </v-col>
    <v-spacer v-if="!smallSize"></v-spacer>
    <v-col class="d-flex flex-column">
      <v-btn icon nuxt :to="'/product/' + product.productId"
        ><v-icon class="display-1">mdi-information</v-icon></v-btn
      >
      <v-btn icon class="my-3"
        ><v-icon class="display-1">mdi-pencil-box-multiple</v-icon></v-btn
      >
      <v-btn icon color="red"
        ><v-icon class="display-1">mdi-delete</v-icon></v-btn
      >
    </v-col>
  </v-row>
</template>
<script>
export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  computed: {
    smallSize() {
      return this.$vuetify.breakpoint.smAndDown
    },
    imageSrc() {
      return 'data:image/jpg;base64,' + this.product.productImage.fileData
    },
    priceWithSale() {
      if (this.product.productSalePrice) {
        return this.product.productSalePrice
      }
      return (+this.product.productPrice * (100 - this.product.discount)) / 100
    }
  }
}
</script>

<style></style>
