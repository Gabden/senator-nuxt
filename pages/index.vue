<template>
  <div>
    <v-carousel
      cycle
      height="400"
      hide-delimiter-background
      show-arrows-on-hover
      class="mt-5"
    >
      <v-carousel-item v-for="(slide, i) in slides" :key="i">
        <v-sheet :color="colors[i]" height="100%">
          <v-row class="fill-height" align="center" justify="center">
            <div class="display-3">{{ slide }} Slide</div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>

    <v-row class="mt-5">
      <v-col :cols="$vuetify.breakpoint.smAndDown ? 12 : 6" class="my-5">
        <h1 class="text-center">
          СЕН<span class="display-2">A</span>ТОР — бутик лучших вин мира и
          подарков
          <v-icon color="#d50000" class="display-3 mb-1">mdi-glass-wine</v-icon>
        </h1>

        <p class="text-justify">
          На сайте представлена информация об ассортименте бутика Сенатор.
          Возможность зарезервировать вина, крепкий алкоголь, оливковые масла и
          подарочные наборы. Все материалы, размещенные на сайте, носят
          информационный характер и не являются рекламой.
        </p>
        <features-card
          v-for="card in featuresCards"
          :key="card.icon"
          :card="card"
        />
      </v-col>
      <v-col cols="6" class="hidden-sm-and-down">
        <img
          src="../assets/faceSenator.jpg"
          alt="Senator shop enter"
          style="width: 100%; height: 90%"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-pagination
        v-model="page"
        :length="5"
        :total-visible="7"
        class="mb-5"
      ></v-pagination>
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
      <v-pagination
        v-model="page"
        :length="5"
        :total-visible="7"
        class="mb-5"
      ></v-pagination>
    </v-row>
    <h2 class="text-center">Мы соберем коллекцию к вашему визиту</h2>
    <h4 class="text-center my-3">
      Консультации по телефону: +7(920)-955-18-94,<br
        class="hidden-sm-and-up"
      />
      +7(4912)-28-19-37
    </h4>
    <p class="body-2 text-center">
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
  asyncData(context) {
    return context.$axios
      .get('/api/home/notifications')
      .then((response) => {
        const products = response.data.content
        return { products }
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
          content: 'Индивидуальный подход к каждому клиенту'
        }
      ],
      colors: [
        'indigo',
        'warning',
        'pink darken-2',
        'red lighten-1',
        'deep-purple accent-4'
      ],
      slides: ['First', 'Second', 'Third', 'Fourth', 'Fifth']
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
        .get('/api/home/notifications?page=' + (newPage - 1))
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
  }
}
</script>
