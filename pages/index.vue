<template>
  <div>
    <v-carousel
      v-if="banners.length > 0"
      cycle
      :height="heightSize"
      hide-delimiter-background
      show-arrows-on-hover
      class="mt-5"
    >
      <v-carousel-item v-for="(banner, i) in banners" :key="i">
        <nuxt-link :to="banner.bannerUrl">
          <v-img
            v-lazy-load
            :src="'data:image/jpg;base64,' + banner.fileData"
            contain
            :max-height="heightSize"
            style="background-size: 100% 100%;"
          ></v-img>
        </nuxt-link>
      </v-carousel-item>
    </v-carousel>

    <v-row
      :class="$vuetify.breakpoint.smAndDown ? null : 'mt-5'"
      style="max-height: 650px"
    >
      <v-col
        :cols="$vuetify.breakpoint.smAndDown ? 12 : 6"
        :class="$vuetify.breakpoint.mdAndDown ? null : 'my-5'"
      >
        <h1
          class="text-center pa-0"
          :class="$vuetify.breakpoint.smAndDown ? 'title-height' : null"
        >
          СЕН<span class="display-2">A</span>ТОР — бутик лучших вин мира и
          подарков
          <v-icon
            color="#d50000"
            class="mb-1"
            :class="$vuetify.breakpoint.smAndDown ? 'display-1' : 'display-2'"
            >mdi-glass-wine</v-icon
          >
        </h1>

        <p class="text-justify mt-3">
          На сайте представлена информация об ассортименте бутика Сенатор.
          Возможность зарезервировать вина, крепкий алкоголь, оливковые масла и
          подарочные наборы. Все материалы, размещенные на сайте, носят
          информационный характер и не являются рекламой.
        </p>
        <features-card
          v-for="card in featuresCards"
          :key="card.icon"
          :card="card"
          :small-screen="$vuetify.breakpoint.smAndDown"
          class="mt-1"
        />
      </v-col>
      <v-col cols="6" class="hidden-sm-and-down">
        <img
          v-lazy-load
          src="../assets/faceSenator.jpg"
          alt="Senator shop enter"
          style="width: 100%; height: 80%"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="(product, index) in products"
        :key="index"
        cols="10"
        sm="6"
        md="4"
        xl="3"
        class="mx-auto"
      >
        <product-card :product="product" />
      </v-col>
      <v-col v-if="products.length > 0" cols="12">
        <v-pagination
          v-model="page"
          :length="5"
          :total-visible="7"
          class="mb-5"
        ></v-pagination>
      </v-col>
    </v-row>
    <h2 class="text-center">Мы соберем коллекцию к вашему визиту</h2>
    <h4 class="text-center my-3">
      Консультации по телефону: +7(920)-955-18-94,<br
        class="hidden-sm-and-up"
      />
      +7(4912)-28-19-37
    </h4>
    <p class="body-2 text-center text-justify">
      В соответствии с рекомендациями ФС РАР от 25.06.18 уведомляем: алкогольная
      продукция может быть приобретена непосредственно в магазине Сенатор. ООО
      «Сенатор», ИНН: 6215012053, лицензия: 62РПА0001379 от 18.01.2018 действует
      с 08.02.2018 по 07.02.2023, 390006 г. Рязань, ул.Свободы, д.24а
    </p>
  </div>
</template>

<script>
import FeaturesCard from '@/components/FeaturesCard.vue'
import ProductCard from '@/components/ProductCard.vue'
export default {
  components: {
    'features-card': FeaturesCard,
    'product-card': ProductCard
  },
  async fetch() {
    this.$store.commit('SWITCH_LOADER', true)
    const fetchProducts = this.$axios.get('/api/home/all/products')
    const fetchBanners = this.$axios.get('/api/home/banners/all')
    const fetchResponse = await Promise.all([fetchProducts, fetchBanners])
    this.products = fetchResponse[0].data.content
    this.banners = fetchResponse[1].data
    this.$store.commit('SWITCH_LOADER', false)
  },
  fetchOnServer: false,
  data() {
    return {
      banners: [],
      products: [],
      page: 1,
      featuresCards: [
        {
          icon: 'mdi-package',
          content: 'Более 1000 товаров премиум класса'
        },
        {
          icon: 'mdi-sale',
          content: 'Скидки и акции'
        },
        {
          icon: 'mdi-account-voice',
          content: 'Бесплатные консультации'
        },
        {
          icon: 'mdi-alert-decagram',
          content: 'Индивидуальный подход'
        }
      ]
    }
  },
  computed: {
    heightSize() {
      if (this.$vuetify.breakpoint.mdAndUp) {
        return 400
      } else if (
        this.$vuetify.breakpoint.mdAndDown &&
        this.$vuetify.breakpoint.smAndUp
      ) {
        return 200
      }
      return 150
    }
  },
  watch: {
    page(newValue, oldValue) {
      this.updateProducts(newValue)
    }
  },
  methods: {
    async updateProducts(newPage) {
      this.$store.commit('SWITCH_LOADER', true)
      await this.$axios
        .get('/api/home/all/products?page=' + (newPage - 1))
        .then((response) => {
          this.$store.commit('SWITCH_LOADER', false)
          this.products = response.data.content
        })
        .catch((e) => {
          this.$store.commit('SWITCH_LOADER', false)
          this.$toasted
            .error('Сервер временно недоступен, повторите попытку позже!')
            .goAway(2000)
        })
    }
  },
  head() {
    return {
      title:
        '«СЕНАТОР» - официальный интернет-сайт бутика премиум алкоголя и подарков в Рязани',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            "ООО 'Сенатор' 'Лучшие вина мира' и 'Галерея подарков' – компания работающая в сегменте алкоголя и подарков для взрослых премиум класса с 2005 года"
        }
      ]
    }
  }
}
</script>
<style scoped>
.title-height {
  line-height: 0.7;
}
</style>
