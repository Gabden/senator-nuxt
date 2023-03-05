<template>
  <v-card max-width="400">
    <div class="d-flex">
      <v-btn
        fab
        small
        dark
        color="pink darken-1"
        class="ma-3"
        :class="{ 'zero-opacity': !$auth.loggedIn }"
        >{{ discountOrSale }}</v-btn
      >
      <v-spacer></v-spacer>
    </div>
    <nuxt-link :to="'/product/' + product.productId">
      <v-img
        v-lazy-load
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
      <template v-if="isReservationBlocked">
        Цену уточняйте по телефону
        <a class="d-block text-center" text rounded :href="`tel:+74912281937`">
          <span>+7(4912)-28-19-37</span>
        </a>
      </template>

      <template v-if="!$auth.loggedIn">
        <v-btn color="blue-grey darken-1" dark to="/login">Узнать цену</v-btn>
      </template>

      <template v-else>
        <p
          v-if="!isDiscountBlocked"
          class="ma-0 pink--text text--accent-3 font-weight-bold "
          style="font-size: 1.65rem !important"
        >
          <span v-if="product.discount || product.productSalePrice">{{
            priceWithSale
          }}</span>
          <span v-else>{{ product.productPrice }}</span>
          руб.
        </p>
        <p
          v-if="!isCertificate"
          class="ma-0 font-weight-bold "
          :class="
            product.discount || product.productSalePrice
              ? 'gray--text'
              : 'white--text'
          "
          :style="
            isDiscountBlocked
              ? 'font-size: 1.65rem !important'
              : 'text-decoration: line-through;'
          "
        >
          {{ product.productPrice }} руб.
        </p>
      </template>
    </v-card-text>
    <v-card-actions
      v-if="isProductQuantityExist"
      class="d-flex justify-center mb-5 pb-8"
    >
      <v-btn
        class="mx-2 button-borders"
        fab
        small
        :disabled="quantity === 1"
        @click="decrement"
      >
        <v-icon color="blue-grey">mdi-minus</v-icon>
      </v-btn>
      <span class="title">{{ quantity }}</span>
      <v-btn
        class="mx-2 button-borders"
        fab
        small
        :disabled="quantity >= product.productDetails.productUnitInStock"
        @click="increment"
      >
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
    <v-card-actions
      v-if="!isProductQuantityExist"
      class="d-flex justify-center mb-5 pb-8"
    >
      <v-btn class="mx-2 empty" color="error" large outlined>
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
      if (this.isCertificate) {
        return this.product.productPrice
      }

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
      if (!this.product.discount || this.isCertificate) {
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
    },
    isDiscountBlocked() {
      return process.env.DISCOUNT_BLOCKED
    },
    isReservationBlocked() {
      return process.env.RESERVE_BLOCKED
    },
    isProductQuantityExist() {
      return this.product?.productDetails?.productUnitInStock > 0
    },
    isCertificate() {
      const certificate = 'подарочный сертификат'
      return this.product?.productName?.toLowerCase().includes(certificate)
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
        cartItemFinalPrice: this.product.discount
          ? this.priceWithSale
          : this.product.productPrice,
        discount: this.product.discount,
        totalPrice: this.product.discount
          ? this.priceWithSale * this.quantity
          : this.product.productPrice * this.quantity
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
.empty {
  cursor: not-allowed;
}
.zero-opacity {
  opacity: 0;
  cursor: initial;
}
</style>
