<template>
  <div>
    <nuxt-link
      v-for="category in categories"
      :key="category.name"
      :to="category.url"
      style="text-decoration: none;"
    >
      <v-card class="my-5" hover shaped>
        <v-row>
          <v-icon class="display-3 ml-5">{{ category.icon }}</v-icon>
          <v-col>
            <v-card-title>{{ category.name }}</v-card-title>
            <v-card-text>{{ category.msg }}</v-card-text>
          </v-col>
        </v-row>
      </v-card>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  middleware: 'auth-admin',
  data() {
    return {
      categories: [
        {
          name: 'Товары',
          url: '/admin/goods',
          msg: 'Здесь вы можете просматривать и редактировать товар',
          icon: 'mdi-bottle-wine'
        },
        {
          name: 'Групповые скидки',
          url: '/admin/group-sale',
          msg: 'Здесь вы можете редактировать размер скидки на группу товаров',
          icon: 'mdi-label-percent'
        },
        {
          name: 'Заказы',
          url: '/admin/orders',
          msg: 'Здесь вы можете просматривать и редактировать заказы',
          icon: 'mdi-basket'
        },
        {
          name: 'Учетные записи',
          url: '/admin/accounts',
          msg: 'Здесь вы можете просматривать и редактировать заказы',
          icon: 'mdi-account'
        },
        {
          name: 'Акции стартовой страницы',
          url: '/admin/banners',
          msg:
            'Здесь вы можете просматривать и редактировать акции стартовой страницы',
          icon: 'mdi-tag-faces'
        }
        // {
        //   name: 'События',
        //   url: '/admin/life-events',
        //   msg: 'Здесь вы можете просматривать и редактировать события',
        //   icon: 'mdi-calendar-star'
        // }
      ]
    }
  },
  head() {
    return {
      title: '«СЕНАТОР» - страница администрирования'
    }
  }
}
</script>

<style></style>
