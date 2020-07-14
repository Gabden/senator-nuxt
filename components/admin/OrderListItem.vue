<template>
  <v-row class="text-center">
    <v-col class="my-auto">Id: 1258</v-col>
    <v-col>
      <div class="mt-4">
        <span>gabden5545@gmail.com</span> <span>+79140079012</span>
      </div>
    </v-col>
    <v-col class="my-auto">Дата: 12.04.2020</v-col>
    <v-col class="my-auto">Сумма: 12500</v-col>
    <v-col class="my-auto">
      <v-btn tile outlined color="green darken-1" class="ma-5 btn--status">
        ИСПОЛНЕН
      </v-btn></v-col
    >
    <v-col class="my-auto">
      <v-btn icon @click="editOrderById">
        <v-icon class="display-1 my-auto">mdi-pencil-box</v-icon></v-btn
      >
    </v-col>
  </v-row>
</template>

<script>
export default {
  methods: {
    editOrderById() {
      console.log('editOrderById')
    }
  }
}
</script>

<style scoped>
.btn--status {
  cursor: default;
}
</style>
