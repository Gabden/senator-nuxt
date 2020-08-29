<template>
  <div>
    <h1 class="text-center">Добавление нового товара</h1>
    <h3 class="text-center">
      Необходимо заполнить поля, чтобы добавить новый товар в базу данных
    </h3>
    <v-form v-model="formValidity" @submit.prevent="createProduct">
      <v-text-field
        v-model="product.productName"
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
            v-model="product.productCategory"
            label="Алкоголь"
            value="alcohol"
          ></v-checkbox>
          <v-checkbox
            v-model="product.productCategory"
            label="Напитки"
            value="drinks"
          ></v-checkbox>
          <v-checkbox
            v-model="product.productCategory"
            label="Оливковое масло"
            value="oil"
          ></v-checkbox>
        </v-col>
        <v-col>
          <v-checkbox
            v-model="product.productCategory"
            label="Посуда"
            value="dishes"
          ></v-checkbox>
          <v-checkbox
            v-model="product.productCategory"
            label="Подарки"
            value="gifts"
          ></v-checkbox>
          <v-checkbox
            v-model="product.productCategory"
            label="Акции"
            value="sale"
          ></v-checkbox>
        </v-col>
        <v-col
          ><v-checkbox
            v-model="product.productCategory"
            label="Новинка"
            value="new"
          ></v-checkbox
        ></v-col>
      </v-row>
      <v-text-field
        v-model="product.productDetails.productType"
        label="Тип алкоголя(Вино, виски, водка и т.д)"
      ></v-text-field>
      <v-textarea
        v-model="product.productDescription"
        label="Описание продукта"
        rows="3"
        :rules="nameRules"
        required
      ></v-textarea>
      <v-text-field
        v-model="product.productPrice"
        type="number"
        label="Цена "
        :rules="nameRules"
        required
      ></v-text-field>
      <v-text-field
        v-model="product.productSalePrice"
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
      <v-text-field
        v-model="product.productDetails.productVolume"
        label="Объем "
      ></v-text-field>
      <v-text-field
        v-model="product.productDetails.productUnitInStock"
        type="number"
        label="Количество"
      ></v-text-field>
      <v-text-field
        v-model="product.productDetails.productCountry"
        label="Страна производитель"
      ></v-text-field>
      <v-text-field
        v-model="product.productDetails.productRegion"
        label="Регион производителя"
      ></v-text-field>
      <v-text-field
        v-model="product.productDetails.productAlcoholDegree"
        label="Содержание спирта"
      ></v-text-field>
      <v-text-field
        v-model="product.productDetails.productAlcoholColor"
        label="Тип (красное, белое, игристое и тд)"
      ></v-text-field>
      <v-text-field
        v-model="product.productDetails.productAlcoholSugar"
        label="Сахар (сухое, полусухое и т.д.)"
      ></v-text-field>
      <v-text-field
        v-model="product.productDetails.productAlcoholTemperature"
        label="Температура подачи"
      ></v-text-field>
      <v-text-field
        v-model="product.productDetails.productAlcoholSort"
        label="Сорт винограда или тип сырья"
      ></v-text-field>
      <v-text-field
        v-model="product.productDetails.productManufacturer"
        label="Фирма производитель"
      ></v-text-field>
      <v-text-field
        v-model="product.productDetails.productMature"
        label="Выдержка"
      ></v-text-field>
      <v-text-field
        v-model="product.productDetails.productTaste"
        label="Короткое описание вкуса"
      ></v-text-field>
      <v-file-input
        v-model="product.imageFile"
        accept="image/*"
        show-size
        label="Изображение"
        required
      ></v-file-input>
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
        productName: '',
        productCategory: [],
        productDescription: '',
        productPrice: null,
        productSalePrice: null,
        discount: 10,
        productDetails: {
          productType: '',
          productCountry: null,
          productRegion: null,
          productAlcoholDegree: null,
          productAlcoholColor: null,
          productAlcoholSugar: null,
          productAlcoholTemperature: null,
          productAlcoholSort: null,
          productVolume: null,
          productManufacturer: null,
          productMature: null,
          productTaste: null,
          productUnitInStock: null,
          imageFile: null
        }
      },
      formValidity: false,
      nameRules: [(value) => !!value || 'Необходимо заполнить поле']
    }
  },
  methods: {
    async createProduct() {
      // console.log(this.product)

      this.product.productCategory = this.product.productCategory.join(',')
      const formData = new FormData()
      formData.append('product', this.product)
      console.log(formData)

      await this.$axios
        .post('/api/admin/product/create', this.product)
        .then((response) => {
          this.$toasted.success('Товар успешно добавлен в базу!').goAway(2000)
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
