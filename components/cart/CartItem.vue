<template>
  <v-row class="my-5" :class="smallSize ? 'small-font' : ''">
    <v-img
      :src="imageSrc"
      max-width="200"
      max-height="180"
      aspect-ratio="0.85"
      contain
      :class="smallSize ? 'mt-5' : ''"
    ></v-img>
    <v-col v-if="!smallSize" class="d-flex justify-center align-center">
      <v-select
        v-model="quantity"
        :items="itemsQuantity"
        label="КОЛ-ВО"
        outlined
        style="max-width: 30%"
        @input="changeQuantity"
      ></v-select>
    </v-col>
    <v-col>
      <div class="font-weight-bold mb-1 title">
        {{ productItem.product.productName }}
      </div>
      <div v-if="!smallSize" class="mb-2">
        <span class="caption">КОЛ-ВО: </span>
        <strong>{{ productItem.quantity }}</strong>
      </div>
      <v-select
        v-if="smallSize"
        v-model="quantity"
        :items="itemsQuantity"
        dense
        style="max-width: 70%"
        @input="changeQuantity"
      ></v-select>
      <template v-if="$auth.loggedIn">
        <div
          class="mb-2"
          :class="
            (productItem.product.productSalePrice || productItem.discount) &&
            !isDiscountBlocked &&
            !isCertificate
              ? 'linethrough'
              : null
          "
        >
          <span class="caption">ЦЕНА: </span>
          <strong v-if="!isReservationBlocked"
            >{{ productItem.product.productPrice }} руб.</strong
          >
          <strong v-else>-</strong>
        </div>
        <template v-if="!isDiscountBlocked && !isCertificate">
          <div
            v-if="!productItem.product.productSalePrice && productItem.discount"
            class="mb-2 red--text text--darken-4"
          >
            <span class="caption">СКИДКА: </span>
            <strong>{{ productItem.discount }}%</strong>
          </div>
          <div class="mb-2 red--text text--darken-4">
            <span class="caption">ЦЕНА СО СКИДКОЙ: </span>
            <strong>{{ priceWithSale }}</strong> руб.
          </div>
        </template>
        <div class="mb-2">
          <span class="caption">СУММА: </span
          ><strong v-if="!isReservationBlocked">{{ totalPrice }} руб.</strong>
          <strong v-else>-</strong>
        </div>
      </template>
    </v-col>
    <v-col cols="1" class="d-flex justify-center align-center">
      <v-btn icon link to="#" class="mr-3" @click="deleteFromCart">
        <v-icon color="red accent-4" class="display-2">mdi-delete</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    productItem: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      quantity: 1
    }
  },
  computed: {
    smallSize() {
      return this.$vuetify.breakpoint.smAndDown
    },
    imageSrc() {
      if (!this.productItem?.product) {
        return ''
      }
      return `/api/product/image/${this.productItem.product.productId}`
    },
    priceWithSale() {
      if (this.isCertificate) {
        return this.productItem.product.productPrice
      }

      if (this.productItem.product.productSalePrice) {
        return this.productItem.product.productSalePrice
      }

      return Math.ceil(
        this.productItem.cartItemPrice *
          ((100 - this.productItem.discount) / 100)
      )
    },
    totalPrice() {
      return this.priceWithSale * this.productItem.quantity
    },
    itemsQuantity() {
      return Array.from(
        Array(
          +this.productItem.product.productDetails.productUnitInStock + 1
        ).keys()
      ).slice(1)
    },
    isDiscountBlocked() {
      return process.env.DISCOUNT_BLOCKED
    },
    isReservationBlocked() {
      return process.env.RESERVE_BLOCKED
    },
    isCertificate() {
      const certificate = 'Подарочный Сертификат'
      return this.productItem.product?.productName?.includes(certificate)
    }
  },
  created() {
    this.quantity = this.productItem.quantity
  },
  methods: {
    changeQuantity() {
      if (this.quantity !== this.productItem.quantity) {
        this.$store.dispatch('localStorage/changeQuantity', {
          product: this.productItem,
          quantity: this.quantity
        })
        this.$emit('changed')
      }
    },
    deleteFromCart() {
      this.$store.dispatch('localStorage/removeFromCart', {
        product: this.productItem
      })
      this.$toasted
        .error(`${this.productItem.product.productName} удален из корзины`)
        .goAway(2000)
      this.$emit('changed')
    }
  }
}
</script>

<style scoped>
.small-font {
  font-size: 0.6rem;
}
.linethrough {
  text-decoration: line-through;
}
</style>
