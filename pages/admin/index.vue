<template>
  <div>
    <v-card
      v-for="category in categories"
      :key="category.name"
      class="my-5"
      hover
      shaped
    >
      <v-row>
        <v-icon class="display-3 ml-5">{{ category.icon }}</v-icon>
        <v-col>
          <v-card-title>{{ category.name }}</v-card-title>
          <v-card-text>{{ category.msg }}</v-card-text>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
export default {
  //   middleware: 'auth',
  //   meta: { requiresAuth: true, requiresAuthAdmin: true }
  data() {
    return {
      categories: [
        {
          name: 'Товары',
          url: '/',
          msg: 'Здесь вы можете просматривать и редактировать товар',
          icon: 'mdi-bottle-wine'
        },
        {
          name: 'Групповые скидки',
          url: '/',
          msg: 'Здесь вы можете редактировать размер скидки на группу товаров',
          icon: 'mdi-label-percent'
        },
        {
          name: 'Заказы',
          url: '/',
          msg: 'Здесь вы можете просматривать и редактировать заказы',
          icon: 'mdi-basket'
        },
        {
          name: 'Учетные записи',
          url: '/',
          msg: 'Здесь вы можете просматривать и редактировать заказы',
          icon: 'mdi-account'
        },
        {
          name: 'Акции стартовой страницы',
          url: '/',
          msg:
            'Здесь вы можете просматривать и редактировать акции стартовой страницы',
          icon: 'mdi-tag-faces'
        },
        {
          name: 'События',
          url: '/',
          msg: 'Здесь вы можете просматривать и редактировать события',
          icon: 'mdi-calendar-star'
        }
      ]
    }
  }
}
</script>

<style></style>
