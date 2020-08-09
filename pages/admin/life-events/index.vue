<template>
  <div>
    <h1 class="text-center">Страница администрирования мероприятий</h1>
    <h3 class="text-center">
      Здесь вы можете создать, удалить или отредактировать мероприятие
    </h3>
    <div class="d-flex justify-center my-5">
      <v-btn link to="/admin/life-events/create" outlined color="green darken-1"
        >Создать</v-btn
      >
    </div>
    <EventListItem class="banner-border" />
  </div>
</template>

<script>
import EventListItem from '@/components/admin/EventListItem.vue'
export default {
  components: {
    EventListItem
  }
}
</script>

<style scoped>
.banner-border {
  border-left: 5px solid green;
}
</style>
