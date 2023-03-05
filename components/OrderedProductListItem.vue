<template>
  <v-row class="my-5">
    <v-img
      :src="imageSrc"
      max-width="200"
      max-height="180"
      aspect-ratio="0.85"
      contain
      :class="smallSize ? 'mt-5' : ''"
    ></v-img>
    <v-spacer v-if="!smallSize"></v-spacer>
    <v-col>
      <p class="font-weight-bold mb-1 subtitle">
        {{ item.product.productName }}
      </p>
      <p class="mb-2">
        <span class="caption">КОЛ-ВО: </span>
        <strong>{{ item.quantity }}</strong>
      </p>
      <p class="mb-2" style="text-decoration: line-through;">
        <span class="caption">ЦЕНА: </span>
        <strong>{{ item.cartItemPrice }}</strong> руб.
      </p>
      <p class="mb-2 red--text text--darken-4">
        <span class="caption">ЦЕНА СО СКИДКОЙ: </span>
        <strong>{{ item.cartItemFinalPrice }}</strong> руб.
      </p>
      <p class="mb-2">
        <span class="caption">СУММА: </span
        ><strong>{{ item.totalPrice }}</strong> руб.
      </p>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    smallSize() {
      return this.$vuetify.breakpoint.smAndDown
    },
    imageSrc() {
      if (!this.item?.product) {
        return ''
      }
      return `/api/product/image/${this.item.product.productId}`
    }
  }
}
</script>

<style></style>
