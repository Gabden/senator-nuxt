<template>
  <v-container class="my-5">
    <h1 class="text-center">{{ product.productName }}</h1>
    <h3 class="text-center grey--text">
      {{ product.productDetails.productVolume }}
      {{ product.productDetails.productCountry }}
      {{ product.productDetails.productAlcoholDegree }}
    </h3>
    <v-row class="my-5">
      <v-col cols="12" md="4">
        <div class="d-flex">
          <v-btn fab small dark color="pink darken-1" class="ma-3">{{
            discountOrSale
          }}</v-btn>
          <v-spacer></v-spacer>
        </div>
        <v-img
          :src="imageSrc"
          max-width="500"
          max-height="400"
          aspect-ratio="0.85"
          contain
          class="mx-auto"
        ></v-img>
      </v-col>
      <v-col>
        <p class="mb-0 grey--text">Описание</p>
        <p class="text-justify">
          {{ product.productDescription }}
        </p>
        <p class="mb-0 grey--text">Характеристика</p>
        <p class="text-justify">
          {{ product.productDetails.productTaste }}
        </p>
        <v-row class="my-5">
          <v-col
            v-if="
              product.productDetails && product.productDetails.productVolume
            "
            cols="6"
            md="4"
            class="pa-0"
          >
            <p class="pl-4 mb-0 grey--text" style="font-size: 0.85rem">
              Обьем
            </p>
            <v-btn
              color="red"
              text
              nuxt
              :to="
                `/search/volume?value=${product.productDetails.productVolume}`
              "
              class="text-truncate"
              ><span
                class="d-inline-block text-truncate"
                style="max-width: 160px;"
              >
                {{ product.productDetails.productVolume }}</span
              ></v-btn
            >
          </v-col>
          <v-col
            v-if="
              product.productDetails &&
                product.productDetails.productAlcoholColor
            "
            cols="6"
            md="4"
            class="pa-0"
          >
            <p class="pl-4 mb-0 grey--text" style="font-size: 0.85rem">
              Цвет
            </p>
            <v-btn
              color="red"
              text
              nuxt
              :to="
                `/search/color?value=${product.productDetails.productAlcoholColor}`
              "
              class="text-truncate"
              ><span
                class="d-inline-block text-truncate"
                style="max-width: 160px;"
              >
                {{ product.productDetails.productAlcoholColor }}</span
              ></v-btn
            >
          </v-col>
          <v-col
            v-if="
              product.productDetails && product.productDetails.productRegion
            "
            cols="6"
            md="4"
            class="pa-0"
          >
            <p class="pl-4 mb-0 grey--text" style="font-size: 0.85rem">
              Регион
            </p>
            <v-btn
              color="red"
              text
              nuxt
              :to="
                `/search/region?value=${product.productDetails.productRegion}`
              "
              class="text-truncate"
              ><span
                class="d-inline-block text-truncate"
                style="max-width: 160px;"
              >
                {{ product.productDetails.productRegion }}</span
              ></v-btn
            >
          </v-col>
          <v-col
            v-if="
              product.productDetails &&
                product.productDetails.productAlcoholDegree
            "
            cols="6"
            md="4"
            class="pa-0"
          >
            <p class="pl-4 mb-0 grey--text" style="font-size: 0.85rem">
              Алкоголь
            </p>
            <v-btn
              color="red"
              text
              nuxt
              :to="
                `/search/degree?value=${product.productDetails.productAlcoholDegree.slice(
                  0,
                  2
                )}`
              "
              class="text-truncate"
              ><span
                class="d-inline-block text-truncate"
                style="max-width: 160px;"
              >
                {{ product.productDetails.productAlcoholDegree }}</span
              ></v-btn
            >
          </v-col>
          <v-col
            v-if="
              product.productDetails &&
                product.productDetails.productAlcoholSort
            "
            cols="6"
            md="4"
            class="pa-0"
          >
            <p class="pl-4 mb-0 grey--text" style="font-size: 0.85rem">
              Сорт
            </p>
            <v-btn
              color="red"
              text
              nuxt
              :to="
                `/search/sort?value=${
                  product.productDetails.productAlcoholSort.split(',')[0]
                }`
              "
              class="text-truncate"
              ><span
                class="d-inline-block text-truncate"
                style="max-width: 160px;"
              >
                {{ product.productDetails.productAlcoholSort }}</span
              ></v-btn
            >
          </v-col>
          <v-col
            v-if="
              product.productDetails && product.productDetails.productCountry
            "
            cols="6"
            md="4"
            class="pa-0"
          >
            <p class="pl-4 mb-0 grey--text" style="font-size: 0.85rem">
              Страна
            </p>
            <v-btn
              color="red"
              text
              nuxt
              :to="
                `/search/country?value=${product.productDetails.productCountry}`
              "
              class="text-truncate"
              ><span
                class="d-inline-block text-truncate"
                style="max-width: 160px;"
              >
                {{ product.productDetails.productCountry }}</span
              ></v-btn
            >
          </v-col>
          <v-col
            v-if="
              product.productDetails &&
                product.productDetails.productAlcoholSugar
            "
            cols="6"
            md="4"
            class="pa-0"
          >
            <p class="pl-4 mb-0 grey--text" style="font-size: 0.85rem">
              Сахар
            </p>
            <v-btn
              color="red"
              text
              nuxt
              :to="
                `/search/sugar?value=${
                  product.productDetails.productAlcoholSugar.split(' ')[0]
                }`
              "
              class="text-truncate"
              ><span
                class="d-inline-block text-truncate"
                style="max-width: 160px;"
              >
                {{ product.productDetails.productAlcoholSugar }}</span
              ></v-btn
            >
          </v-col>
          <v-col
            v-if="
              product.productDetails &&
                product.productDetails.productManufacturer
            "
            cols="6"
            md="4"
            class="pa-0"
          >
            <p class="pl-4 mb-0 grey--text" style="font-size: 0.85rem">
              Производитель
            </p>
            <v-btn
              color="red"
              text
              nuxt
              :to="
                `/search/manufacturer?value=${product.productDetails.productManufacturer}`
              "
              class="text-truncate"
              ><span
                class="d-inline-block text-truncate"
                style="max-width: 160px;"
              >
                {{ product.productDetails.productManufacturer }}</span
              ></v-btn
            >
          </v-col>
          <v-col
            v-if="
              product.productDetails &&
                product.productDetails.productAlcoholTemperature
            "
            cols="6"
            md="4"
            class="pa-0"
          >
            <p class="pl-4 mb-0 grey--text" style="font-size: 0.85rem">
              Температура
            </p>
            <v-btn
              color="red"
              text
              nuxt
              :to="
                `/search/temperature?value=${product.productDetails.productAlcoholTemperature}`
              "
              class="text-truncate"
              ><span
                class="d-inline-block text-truncate"
                style="max-width: 160px;"
              >
                {{ product.productDetails.productAlcoholTemperature }}</span
              ></v-btn
            >
          </v-col>
          <v-col
            v-if="
              product.productDetails && product.productDetails.productMature
            "
            cols="6"
            md="4"
            class="pa-0"
          >
            <p class="pl-4 mb-0 grey--text" style="font-size: 0.85rem">
              Выдержка
            </p>
            <v-btn
              color="red"
              text
              nuxt
              :to="
                `/search/mature?value=${product.productDetails.productMature}`
              "
              class="text-truncate"
              ><span
                class="d-inline-block text-truncate"
                style="max-width: 160px;"
              >
                {{ product.productDetails.productMature }}</span
              ></v-btn
            >
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <div class="d-flex justify-center align-center my-5">
          <div v-if="product.productDetails.productUnitInStock > 0">
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
              :class="$vuetify.breakpoint.smAndDown ? 'mt-5' : null"
              dark
              color="pink"
              @click="addToCart"
            >
              Добавить
              <v-icon>mdi-cart</v-icon>
            </v-btn>
          </div>
          <div v-else class="d-flex justify-center mb-5 pb-8">
            <v-btn class="mx-2 empty" color="error" large outlined>
              товар отсутствует
            </v-btn>
          </div>
          <v-spacer></v-spacer>
          <div>
            <p class="mb-0 grey--text " style="font-size: 0.85rem">Цена</p>
            <p
              v-if="product.discount || product.productSalePrice"
              class="grey--text text--darken-2  mb-0 price-size"
              style="text-decoration: line-through;"
            >
              {{ product.productPrice }} руб.
            </p>
            <p class="red--text text--accent-4 price-size">
              <span v-if="product.discount || product.productSalePrice">{{
                priceWithSale
              }}</span>
              <span v-else>{{ product.productPrice }}</span>
              руб.
            </p>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    isFavorite: {
      type: Boolean,
      default: false
    }
  },
  asyncData(context) {
    const url = '/api/product/' + context.route.params.id
    return context.$axios
      .get(url)
      .then((response) => {
        const product = response.data
        return { product }
      })
      .catch((e) => {
        context.error({
          statusCode: 500,
          message: 'Сервер временно недоступен, повторите попытке позже'
        })
      })
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
      return 'data:image/jpg;base64,' + this.product.productImage.fileData
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
  },
  head() {
    return {
      title: `Купить ${this.product.productName} со скидкой в Рязани`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `Продажа ${this.product.productName} по выгодной цене в бутике senator-wine.ru Рязань`
        }
      ]
    }
  }
}
</script>

<style scoped>
.price-size {
  font-size: 1.25rem;
}
.empty {
  cursor: not-allowed;
}
</style>
