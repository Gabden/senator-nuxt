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

    <v-row>
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
          style="width: 100%"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import FeaturesCard from '@/components/FeaturesCard.vue'
export default {
  components: {
    'features-card': FeaturesCard
  },
  data() {
    return {
      featuresCards: [
        {
          icon: 'mdi-package',
          content: 'Более 1000 товаров премиум класса'
        },
        {
          icon: 'mdi-package',
          content: 'Более 1000 товаров премиум класса'
        },
        {
          icon: 'mdi-package',
          content: 'Более 1000 товаров премиум класса'
        },
        {
          icon: 'mdi-package',
          content: 'Более 1000 товаров премиум класса'
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
  }
}
</script>
