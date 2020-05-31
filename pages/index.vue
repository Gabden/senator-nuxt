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
      <v-col cols="6">
        <h1 class="my-5 text-center">
          SEN<span class="display-2">A</span>TOR — бутик лучших вин мира и
          подарков
          <v-icon color="#d50000" class="display-3 mb-1">mdi-glass-wine</v-icon>
        </h1>

        <p class="text-justify">
          На сайте представлена информация об ассортименте бутика Сенатор.
          Возможность зарезервировать вина, крепкий алкоголь, оливковые масла и
          подарочные наборы. Все материалы, размещенные на сайте, носят
          информационный характер и не являются рекламой.
        </p>
      </v-col>
      <v-col cols="6">
        <v-img src="faceSenator.jpg" alt="Senator shop enter"></v-img>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
