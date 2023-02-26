<template>
  <div class="blue-grey darken-4">
    <v-container class="d-flex justify-center">
      <v-btn
        v-for="{ title, url } in categories"
        :key="title"
        text
        dark
        color="dark"
        nuxt
        :to="url"
        >{{ title }}</v-btn
      >
    </v-container>
  </div>
</template>

<script>
import { CATEGORIES } from '@/constants/categories'
export default {
  created() {
    this.categories = CATEGORIES
  }
}
</script>

<style></style>
