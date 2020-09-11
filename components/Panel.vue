<template>
  <div class="blue-grey darken-4">
    <v-container class="d-flex justify-center">
      <v-btn
        v-for="category in categories"
        :key="category.name"
        text
        dark
        color="dark"
        nuxt
        :to="category.url"
        >{{ category.name }}</v-btn
      >
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: [
        { name: 'Все товары', url: '/all-products' },
        { name: 'Акции', url: '/sales' },
        { name: 'Новинки', url: '/new-products' },
        { name: 'Алкоголь', url: '/alcohol' },
        { name: 'Напитки', url: '/drinks' },
        { name: 'Оливковое масло', url: '/oils' },
        { name: 'Посуда и аксессуары', url: '/dishes' },
        { name: 'Подарки', url: '/gifts' }
      ]
    }
  }
}
</script>

<style></style>
