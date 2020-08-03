<template>
  <div>
    <h1 class="text-center">Добавление нового товара</h1>
    <h3 class="text-center">
      Необходимо заполнить поля, чтобы добавить новый товар в базу данных
    </h3>
    <v-form v-model="formValidity" @submit.prevent="create">
      <v-text-field
        v-model="product.name"
        label="Название "
        :rules="nameRules"
        required
      ></v-text-field>
      <v-row class="ml-1">
        <div
          dark
          class="blue-grey white--text px-5 d-flex flex-column justify-center"
        >
          <p>Категории</p>
        </div>

        <v-col>
          <v-checkbox
            v-model="product.category"
            label="Алкоголь"
            value="alcohol"
          ></v-checkbox>
          <v-checkbox
            v-model="product.category"
            label="Напитки"
            value="drinks"
          ></v-checkbox>
          <v-checkbox
            v-model="product.category"
            label="Оливковое масло"
            value="oil"
          ></v-checkbox>
        </v-col>
        <v-col>
          <v-checkbox
            v-model="product.category"
            label="Посуда"
            value="dishes"
          ></v-checkbox>
          <v-checkbox
            v-model="product.category"
            label="Подарки"
            value="gifts"
          ></v-checkbox>
          <v-checkbox
            v-model="product.category"
            label="Акции"
            value="sale"
          ></v-checkbox>
        </v-col>
        <v-col
          ><v-checkbox
            v-model="product.category"
            label="Новинка"
            value="new"
          ></v-checkbox
        ></v-col>
      </v-row>
      <v-text-field
        v-model="product.type"
        label="Тип алкоголя(Вино, виски, водка и т.д)"
      ></v-text-field>
      <v-textarea
        v-model="product.description"
        label="Описание продукта"
        rows="3"
        :rules="nameRules"
        required
      ></v-textarea>
      <v-text-field
        v-model="product.price"
        type="number"
        label="Цена "
        :rules="nameRules"
        required
      ></v-text-field>
      <v-text-field
        v-model="product.salePrice"
        type="number"
        label="Цена по акции(Поле либо пустое либо с ценой, ноль не ставить!)"
      ></v-text-field>
      <v-text-field
        v-model="product.discount"
        type="number"
        label="Скидка в процентах(По умолчанию ставить 10)"
        :rules="nameRules"
        required
      ></v-text-field>
      <v-text-field v-model="product.volume" label="Объем "></v-text-field>
      <v-text-field
        v-model="product.quantity"
        type="number"
        label="Количество"
      ></v-text-field>
      <v-text-field
        v-model="product.country"
        label="Страна производитель"
      ></v-text-field>
      <v-text-field
        v-model="product.region"
        label="Регион производителя"
      ></v-text-field>
      <v-text-field
        v-model="product.alcoholDegree"
        label="Содержание спирта"
      ></v-text-field>
      <v-text-field
        v-model="product.wineType"
        label="Тип (красное, белое, игристое и тд)"
      ></v-text-field>
      <v-text-field
        v-model="product.sugar"
        label="Сахар (сухое, полусухое и т.д.)"
      ></v-text-field>
      <v-text-field
        v-model="product.temperatura"
        label="Температура подачи"
      ></v-text-field>
      <v-text-field
        v-model="product.sort"
        label="Сорт винограда или тип сырья"
      ></v-text-field>
      <v-text-field
        v-model="product.manufacturer"
        label="Фирма производитель"
      ></v-text-field>
      <v-text-field v-model="product.age" label="Выдержка"></v-text-field>
      <v-text-field
        v-model="product.taste"
        label="Короткое описание вкуса"
      ></v-text-field>
      <v-file-input show-size label="Изображение" required></v-file-input>
      <v-btn
        type="submit"
        class="my-2"
        tile
        outlined
        color="green darken-1"
        :disabled="!formValidity"
      >
        CОЗДАТЬ
      </v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  middleware: 'auth-admin',
  data() {
    return {
      product: {
        name: '',
        category: [],
        type: '',
        description: '',
        price: null,
        salePrice: null,
        discount: 10,
        volume: null,
        quantity: null,
        country: null,
        region: null,
        alcoholDegree: null,
        wineType: null,
        sugar: null,
        temperatura: null,
        sort: null,
        manufacturer: null,
        age: null,
        taste: null
      },
      formValidity: false,
      nameRules: [(value) => !!value || 'Необходимо заполнить поле']
    }
  },
  methods: {
    create() {}
  }
}
</script>

<style></style>
