<template>
  <div>
    <h1 class="text-center">Страница администрирования стартовых баннеров</h1>
    <h3 class="text-center">
      Здесь вы можете создать, удалить или отредактировать баннеры
    </h3>
    <div class="d-flex justify-center my-5">
      <v-btn link to="/admin/banners/create" outlined color="green darken-1"
        >Создать</v-btn
      >
    </div>
    <v-divider></v-divider>
    <BannerListItem
      v-for="banner in banners"
      :key="banner.id"
      :banner="banner"
      class="banner-border mb-5"
    />
  </div>
</template>

<script>
import BannerListItem from '@/components/admin/BannerListItem'
export default {
  middleware: 'auth-admin',
  components: {
    BannerListItem
  },
  asyncData(context) {
    return context.$axios
      .get('/api/home/banners/all')
      .then((response) => {
        const banners = response.data
        return { banners }
      })
      .catch((e) => {
        context.error({
          statusCode: 500,
          message: 'Сервер временно недоступен, повторите попытке позже'
        })
      })
  }
}
</script>

<style scoped>
.banner-border {
  border-left: 5px solid green;
}
</style>
