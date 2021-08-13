<template>
  <div class="grey lighten-4" style="height: 100%">
    <p
      class="blue-grey--text text--darken-4 text-center pt-4 mb-1"
      style="letter-spacing: 2px"
    >
      ФИЛЬТР
    </p>
    <v-expansion-panels accordion multiple class="pa-2">
      <v-expansion-panel>
        <v-expansion-panel-header>Категория</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-checkbox
            v-for="category in categories"
            :key="category.name"
            v-model="filter.selectedCategories"
            multiple
            color="warning"
            :value="category.value"
            class="mx-5 my-0"
            :label="category.name"
          ></v-checkbox>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel @change="fetchTypes">
        <v-expansion-panel-header>Вид напитка</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-checkbox
            v-for="(type, index) in getTypes"
            :key="index"
            v-model="filter.selectedTypes"
            color="warning"
            multiple
            :value="type"
            class="mx-5 my-0"
            :label="type"
          ></v-checkbox>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel @change="fetchCountries">
        <v-expansion-panel-header>Страна</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-autocomplete
            v-model="filter.selectedCountry"
            :items="getCountries"
            item-text="Description"
            item-value="API"
            color="warning"
            label="Страна"
            placeholder="Начните печатать"
            prepend-icon="mdi-database-search"
            class="mt-3 mx-auto"
            style="max-width: 90%"
          ></v-autocomplete>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel @change="fetchManufacturers">
        <v-expansion-panel-header>Производитель</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-autocomplete
            v-model="filter.selectedManufacturer"
            :items="getManufacturers"
            item-text="Description"
            item-value="API"
            color="warning"
            label="Производитель"
            placeholder="Начните печатать"
            prepend-icon="mdi-database-search"
            class="mt-3 mx-auto"
            style="max-width: 90%"
          ></v-autocomplete>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>Цена</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-text-field
            v-model="filter.minPrice"
            type="number"
            min
            label="Min"
            placeholder="Мин.цена"
            :rules="priceMinRule"
            class="mt-3 mx-auto"
            style="max-width: 90%"
          ></v-text-field>
          <v-text-field
            v-model="filter.maxPrice"
            type="number"
            label="Max"
            placeholder="Макс.цена"
            :rules="priceMaxRule"
            class="my-3 mx-auto"
            style="max-width: 90%"
          ></v-text-field>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-divider></v-divider>
      <v-btn
        block
        dark
        color="green lighten-1"
        class="mt-4"
        @click="filterProducts"
        >применить</v-btn
      >
    </v-expansion-panels>
  </div>
</template>

<script>
export default {
  data() {
    return {
      priceMinRule: [(value) => value > 0 || 'Число должно быть больше 0'],
      priceMaxRule: [
        (value) =>
          value > parseInt(this.filter.minPrice) ||
          'Число должно быть больше минимального'
      ],
      filter: {
        selectedCategories: null,
        selectedTypes: null,
        selectedCountry: null,
        selectedManufacturer: null,
        minPrice: null,
        maxPrice: null
      },
      categories: [
        { name: 'Акции', value: 'sales' },
        { name: 'Новинки', value: 'new' },
        { name: 'Алкоголь', value: 'alcohol' },
        { name: 'Напитки', value: 'drinks' },
        { name: 'Оливковое масло', value: 'oil' },
        { name: 'Посуда и аксессуары', value: 'dishes' },
        { name: 'Подарки', value: 'gifts' }
      ]
    }
  },
  computed: {
    getTypes() {
      if (this.$store.state.localStorage.types) {
        return this.$store.state.localStorage.types
      }
      return []
    },
    getCountries() {
      if (this.$store.state.localStorage.countries) {
        return this.$store.state.localStorage.countries
      }
      return []
    },
    getManufacturers() {
      if (this.$store.state.localStorage.manufacturers) {
        return this.$store.state.localStorage.manufacturers
      }
      return []
    }
  },
  methods: {
    filterProducts() {
      this.$emit('filter', this.filter)
    },
    async fetchTypes() {
      if (this.getTypes.length > 0) {
        return
      }
      await this.$axios
        .get('/api/product/all/types')
        .then((response) => {
          this.$store.commit('localStorage/SET_TYPES', response.data)
        })
        .catch((e) => {
          this.$toasted
            .error('Сервер временно недоступен, повторите попытку позже!')
            .goAway(2000)
        })
    },
    async fetchManufacturers() {
      if (this.getManufacturers.length > 0) {
        return
      }
      await this.$axios
        .get('/api/product/all/manufacturers')
        .then((response) => {
          this.$store.commit('localStorage/SET_MANUFACTURERS', response.data)
        })
        .catch((e) => {
          this.$toasted
            .error('Сервер временно недоступен, повторите попытку позже!')
            .goAway(2000)
        })
    },
    async fetchCountries() {
      if (this.getCountries.length > 0) {
        return
      }
      await this.$axios
        .get('/api/product/all/countries')
        .then((response) => {
          this.$store.commit('localStorage/SET_COUNTRIES', response.data)
        })
        .catch((e) => {
          this.$toasted
            .error('Сервер временно недоступен, повторите попытку позже!')
            .goAway(2000)
        })
    }
  }
}
</script>

<style></style>
