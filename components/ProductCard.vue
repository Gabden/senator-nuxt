<template>
  <v-card max-width="400">
    <div class="d-flex">
      <v-btn fab small dark color="pink darken-1" class="ma-3">-10%</v-btn>
      <v-spacer></v-spacer>
      <v-btn icon color="pink" class="ma-3">
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn icon color="pink" class="ma-3">
        <v-icon>mdi-heart-outline</v-icon>
      </v-btn>
    </div>

    <v-img
      src="data:image/jpg;base64,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"
      max-width="390"
      max-height="350"
      aspect-ratio="0.85"
      contain
    ></v-img>
    <v-card-title class="text-center">Alba de Miros Verdejo 2017</v-card-title>
    <v-card-subtitle class="text-center">700 мл Испания 12.5%</v-card-subtitle>
    <v-card-text class="text-center pt-2">
      <p
        class="ma-0 pink--text text--accent-3 font-weight-bold "
        style="font-size: 1.65rem !important"
      >
        1 156 руб.
      </p>
      <p
        class="ma-0 gray--text font-weight-bold "
        style="text-decoration: line-through;"
      >
        1 420 руб.
      </p>
    </v-card-text>
    <v-card-actions class="d-flex justify-center mb-5">
      <v-btn class="mx-2 button-borders" fab small @click="decrement">
        <v-icon color="blue-grey">mdi-minus</v-icon>
      </v-btn>
      <span class="title">{{ bpm }}</span>
      <v-btn class="mx-2 button-borders" fab small @click="increment">
        <v-icon color="blue-grey">mdi-plus</v-icon>
      </v-btn>
      <v-btn
        class="mx-2 button-borders"
        fab
        small
        dark
        color="pink"
        @click="increment"
      >
        <v-icon>mdi-cart</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      bpm: 0
    }
  },
  methods: {
    increment() {
      const newValue = this.bpm + 1
      newValue > 6 ? (this.bpm = 6) : (this.bpm = newValue)
    },
    decrement() {
      const newValue = this.bpm - 1
      newValue < 0 ? (this.bpm = 0) : (this.bpm = newValue)
    }
  }
}
</script>

<style scoped>
.button-borders {
  border: 1px solid #607d8b;
}
</style>