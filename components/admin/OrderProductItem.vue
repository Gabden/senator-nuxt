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
      <p class="font-weight-bold mb-1 title">
        {{ item.product.productName }}
      </p>
      <p v-if="!smallSize" class="mb-2">
        <span class="caption">КОЛ-ВО: </span>
        <strong>{{ item.quantity }}</strong>
      </p>
      <v-select
        v-if="smallSize"
        v-model="quantity"
        :items="[1, 2, 3, 4, 5, 6]"
        label="КОЛ-ВО"
        outlined
        dense
        style="max-width: 70%"
        @input="changeQuantity"
      ></v-select>
      <p class="mb-2" style="text-decoration: line-through;">
        <span class="caption">ЦЕНА: </span>
        <strong>{{ item.cartItemPrice }}</strong> руб.
      </p>
      <p class="mb-2 red--text text--darken-4">
        <span class="caption">СКИДКА: </span>
        <strong>10%</strong>
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
    <v-col cols="1" class="d-flex justify-center align-center">
      <v-btn icon class="mr-3" @click="deleteProductFromOrder">
        <v-icon color="red accent-4" class="display-2">mdi-delete</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'OrderProductItem',
  props: {
    item: {
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
      return 'data:image/jpg;base64,' + this.item.product.productImage.fileData
    }
  },
  created() {
    this.quantity = +this.item.quantity
  },
  methods: {
    changeQuantity() {
      console.log(this.quantity)
    },
    deleteProductFromOrder() {
      this.$store.commit('SWITCH_LOADER', true)
      this.$axios
        .post(`/api/admin/order/cartItem/delete/${this.item.id}`)
        .then((response) => {
          this.$store.commit('SWITCH_LOADER', false)
          this.$toasted.success('Товар удален!').goAway(2000)
        })
        .catch((e) => {
          this.$store.commit('SWITCH_LOADER', false)
          this.$toasted
            .error('Сервер временно недоступен, повторите попытку позже!')
            .goAway(2000)
        })
    }
  }
}
</script>

<style scoped>
.small-font {
  font-size: 0.6rem;
}
</style>
