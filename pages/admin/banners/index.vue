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
    <BannerListItem v-for="n in 5" :key="n" class="banner-border mb-5" />
  </div>
</template>

<script>
import BannerListItem from '@/components/admin/BannerListItem'
export default {
  middleware: 'auth-admin',
  components: {
    BannerListItem
  }
}
</script>

<style scoped>
.banner-border {
  border-left: 5px solid green;
}
</style>
