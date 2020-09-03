<template>
  <div>
    <h1 class="text-center my-5">
      Здесь вы можете редактировать размер скидки на группу товаров
    </h1>
    <h3 class="text-center my-5">Категория</h3>
    <v-row>
      <v-select
        v-model="category.name"
        :items="categories"
        label="Категория"
        filled
      ></v-select>
      <v-text-field
        v-model="category.percent"
        type="number"
        min="10"
        max="100"
        label="Процент скидки"
        append-icon="mdi-percent"
        class="pt-5 ml-5"
      ></v-text-field>
      <v-btn
        tile
        outlined
        color=" green darken-1"
        class="ma-5"
        @click="acceptCategorySale"
      >
        Применить
      </v-btn>
    </v-row>
    <v-divider></v-divider>
    <h3 class="text-center my-5">Тип Вина</h3>
    <v-row>
      <v-select
        v-model="typeOfWine.name"
        :items="typeOfWines"
        label="Тип вина"
        filled
      ></v-select>
      <v-text-field
        v-model="typeOfWine.percent"
        type="number"
        min="10"
        max="100"
        label="Процент скидки"
        append-icon="mdi-percent"
        class="pt-5 ml-5"
      ></v-text-field>
      <v-btn
        tile
        outlined
        color="green darken-1"
        class="ma-5"
        @click="acceptTypeOfWineSale"
      >
        Применить
      </v-btn>
    </v-row>
    <v-divider></v-divider>
    <h3 class="text-center my-5">Тип</h3>
    <!-- t-o-d-o get type from api -->
    <v-row>
      <v-select
        v-model="type.name"
        :items="types"
        label="Тип"
        filled
      ></v-select>
      <v-text-field
        v-model="type.percent"
        type="number"
        min="10"
        max="100"
        label="Процент скидки"
        append-icon="mdi-percent"
        class="pt-5 ml-5"
      ></v-text-field>
      <v-btn
        tile
        outlined
        color="green darken-1"
        class="ma-5"
        @click="acceptTypeSale"
      >
        Применить
      </v-btn>
    </v-row>
    <v-divider></v-divider>
    <h3 class="text-center my-5">Производитель</h3>
    <!-- t-o-d-o get type from api -->
    <v-row>
      <v-select
        v-model="manufacturer.name"
        :items="typeOfWines"
        label="Производитель"
        filled
      ></v-select>
      <v-text-field
        v-model="manufacturer.percent"
        type="number"
        min="10"
        max="100"
        label="Процент скидки"
        append-icon="mdi-percent"
        class="pt-5 ml-5"
      ></v-text-field>
      <v-btn
        tile
        outlined
        color="green darken-1"
        class="ma-5"
        @click="acceptManufacturerSale"
      >
        Применить
      </v-btn>
    </v-row>
    <v-divider></v-divider>
    <h3 class="text-center my-5">Страна</h3>
    <!-- t-o-d-o get type from api -->
    <v-row>
      <v-select
        v-model="country.name"
        :items="typeOfWines"
        label="Страна"
        filled
      ></v-select>
      <v-text-field
        v-model="country.percent"
        type="number"
        min="10"
        max="100"
        label="Процент скидки"
        append-icon="mdi-percent"
        class="pt-5 ml-5"
      ></v-text-field>
      <v-btn
        tile
        outlined
        color="green darken-1"
        class="ma-5"
        @click="acceptCountrySale"
      >
        Применить
      </v-btn>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'GroupSale',
  middleware: 'auth-admin',
  asyncData(context) {
    context.store.commit('SWITCH_LOADER', true)
    return context.$axios
      .get('/api/product/all/types')
      .then((response) => {
        context.store.commit('SWITCH_LOADER', false)
        const types = response.data
        return { types }
      })
      .catch((e) => {
        context.store.commit('SWITCH_LOADER', false)
        context.$toasted
          .error('Сервер временно недоступен, повторите попытку позже!')
          .goAway(2000)
      })
  },
  data() {
    return {
      categories: ['alcohol', 'drinks', 'oil', 'dishes', 'gifts'],
      typeOfWines: ['Красное', 'Белое', 'Розовое', 'Шампанское'],
      category: {
        name: 'alcohol',
        value: '',
        percent: 10
      },
      type: {
        name: 'Портвейн',
        value: '',
        percent: 10
      },
      typeOfWine: {
        name: 'Красное',
        value: '',
        percent: 10
      },
      manufacturer: {
        name: '',
        value: '',
        percent: 10
      },
      country: {
        name: '',
        value: '',
        percent: 10
      }
    }
  },
  methods: {
    acceptCategorySale() {
      const url = `/api/admin/group-sale/edit/category?category=${this.category.name}&discount=${this.category.percent}`
      this.sendRequest(url)
    },
    acceptTypeOfWineSale() {
      const url = `/api/admin/group-sale/edit/color?color=${this.typeOfWine.name}&discount=${this.typeOfWine.percent}`
      this.sendRequest(url)
    },
    acceptTypeSale() {
      const url = `/api/admin/group-sale/edit/type?type=${this.type.name}&discount=${this.type.percent}`
      this.sendRequest(url)
    },
    acceptManufacturerSale() {},
    acceptCountrySale() {},
    sendRequest(url) {
      this.$store.commit('SWITCH_LOADER', true)
      this.$axios
        .post(url)
        .then((response) => {
          this.$store.commit('SWITCH_LOADER', false)
          this.$toasted
            .success('Размер скидки для категории изменен!')
            .goAway(2000)
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

<style></style>
