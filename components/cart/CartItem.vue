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
        :items="[1, 2, 3, 4, 5, 6]"
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
        :items="[1, 2, 3, 4, 5, 6]"
        dense
        style="max-width: 70%"
        @input="changeQuantity"
      ></v-select>
      <div class="mb-2" style="text-decoration: line-through;">
        <span class="caption">ЦЕНА: </span>
        <strong>{{ productItem.product.productPrice }}</strong> руб.
      </div>
      <div
        v-if="!productItem.product.productSalePrice"
        class="mb-2 red--text text--darken-4"
      >
        <span class="caption">СКИДКА: </span>
        <strong>{{ productItem.product.discount }}%</strong>
      </div>
      <div class="mb-2 red--text text--darken-4">
        <span class="caption">ЦЕНА СО СКИДКОЙ: </span>
        <strong>{{ priceWithSale }}</strong> руб.
      </div>
      <div class="mb-2">
        <span class="caption">СУММА: </span
        ><strong>{{ totalPrice }}</strong> руб.
      </div>
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
      if (
        this.productItem.product &&
        this.productItem.product.productImage &&
        this.productItem.product.productImage.fileData
      ) {
        return (
          'data:image/jpg;base64,' +
          this.productItem.product.productImage.fileData
        )
      } else return ''
    },
    priceWithSale() {
      if (this.productItem.product.productSalePrice) {
        return this.productItem.product.productSalePrice
      } else {
        return Math.ceil(
          this.productItem.product.productPrice *
            ((100 - this.productItem.product.discount) / 100)
        )
      }
    },
    totalPrice() {
      return this.priceWithSale * this.productItem.quantity
    }
  },
  created() {
    this.quantity = this.productItem.quantity
  },
  methods: {
    changeQuantity() {
      this.$store.dispatch('localStorage/changeQuantity', {
        product: this.productItem,
        quantity: this.quantity
      })
    },
    deleteFromCart() {
      this.$store.dispatch('localStorage/removeFromCart', {
        product: this.productItem
      })
      this.$toasted
        .error(`${this.productItem.product.productName} удален из корзины`)
        .goAway(2000)
    }
  }
}
</script>

<style scoped>
.small-font {
  font-size: 0.6rem;
}
</style>
