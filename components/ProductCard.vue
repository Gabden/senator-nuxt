<template>
  <v-card max-width="400">
    <div class="d-flex">
      <v-btn fab small dark color="pink darken-1" class="ma-3">{{
        discountOrSale
      }}</v-btn>
      <v-spacer></v-spacer>
      <!-- <v-btn icon color="pink" class="ma-3">
        <v-icon v-if="isFavorite">mdi-heart</v-icon>
        <v-icon v-else>mdi-heart-outline</v-icon>
      </v-btn> -->
    </div>
    <nuxt-link :to="'/product/' + product.productId">
      <v-img
        :src="imageSrc"
        max-width="390"
        max-height="350"
        aspect-ratio="0.85"
        contain
      ></v-img>
    </nuxt-link>
    <v-card-title class="text-center d-flex justify-center">
      <span class="d-inline-block text-truncate" style="max-width: 350px;">
        {{ product.productName }}
      </span>
    </v-card-title>
    <v-card-subtitle class="text-center"
      >{{
        product.productDetails.productVolume
          ? product.productDetails.productVolume
          : ''
      }}
      {{
        product.productDetails.productCountry
          ? product.productDetails.productCountry
          : ''
      }}
      {{
        product.productDetails.productAlcoholDegree
          ? product.productDetails.productAlcoholDegree
          : ''
      }}</v-card-subtitle
    >
    <v-card-text class="text-center pt-2">
      <p
        class="ma-0 pink--text text--accent-3 font-weight-bold "
        style="font-size: 1.65rem !important"
      >
        <span v-if="this.product.discount || this.product.productSalePrice">{{ priceWithSale }}</span>
        <span v-else>{{ product.productPrice }}</span>
         руб.
      </p>
      <p
        class="ma-0 font-weight-bold "
        :class="this.product.discount || this.product.productSalePrice ? 'gray--text' : 'white--text'"
        style="text-decoration: line-through;"
      >
        {{ product.productPrice }} руб.
      </p>
    </v-card-text>
    <v-card-actions
      v-if="product.productDetails.productUnitInStock > 0"
      class="d-flex justify-center mb-5 pb-8"
    >
      <v-btn class="mx-2 button-borders" fab small @click="decrement">
        <v-icon color="blue-grey">mdi-minus</v-icon>
      </v-btn>
      <span class="title">{{ quantity }}</span>
      <v-btn class="mx-2 button-borders" fab small @click="increment">
        <v-icon color="blue-grey">mdi-plus</v-icon>
      </v-btn>
      <v-btn
        class="mx-2 button-borders"
        fab
        small
        dark
        color="pink"
        @click="addToCart"
      >
        <v-icon>mdi-cart</v-icon>
      </v-btn>
    </v-card-actions>
    <v-card-actions v-else class="d-flex justify-center mb-5 pb-8">
      <v-btn class="mx-2 button-borders" large outlined disabled>
        товар отсутствует
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true
    },
    isFavorite: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      quantity: 1
    }
  },
  computed: {
    priceWithSale() {
      if (this.product.productSalePrice) {
        return this.product.productSalePrice
      }
      return Math.ceil(
        (+this.product.productPrice * (100 - this.product.discount)) / 100
      )
    },
    discountOrSale() {
      if (this.product.productSalePrice) {
        return 'Sale'
      }
      if (!this.product.discount) {
        return '!'
      }
      return this.product.discount + '%'
    },
    imageSrc() {
      if (
        this.product &&
        this.product.productImage &&
        this.product.productImage.fileData
      ) {
        return 'data:image/jpg;base64,' + this.product.productImage.fileData
      } else return ''
    }
  },
  methods: {
    increment() {
      const newValue = this.quantity + 1
      newValue > 6 ? (this.quantity = 6) : (this.quantity = newValue)
    },
    decrement() {
      const newValue = this.quantity - 1
      newValue < 1 ? (this.quantity = 1) : (this.quantity = newValue)
    },
    addToCart() {
      this.$store.commit('localStorage/ADD_TO_CART', {
        product: this.product,
        quantity: this.quantity,
        cartItemPrice: this.product.productPrice,
        cartItemFinalPrice: this.product.discount ? this.priceWithSale : this.product.productPrice,
        discount: this.product.discount,
        totalPrice: this.product.discount ? this.priceWithSale * this.quantity : this.product.productPrice * this.quantity
      })
      this.$toasted
        .success(`${this.product.productName} успешно добавлен в корзину!`)
        .goAway(2000)
    }
  }
}
</script>

<style scoped>
.button-borders {
  border: 1px solid #607d8b;
}
</style>
