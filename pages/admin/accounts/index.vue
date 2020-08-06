<template>
  <div>
    <h1 class="text-center">Страница администрирования учетных записей</h1>
    <h3 class="text-center">
      Здесь вы можете посмотреть, найти или отредактировать учетную запис
    </h3>
    <v-text-field
      type="number"
      label="Поиск по ID"
      prepend-icon="mdi-bottle-wine"
      append-icon="mdi-magnify"
      required
    ></v-text-field>
    <v-text-field
      label="Поиск"
      prepend-icon="mdi-bottle-wine"
      append-icon="mdi-magnify"
      required
    ></v-text-field>
    <v-pagination v-model="page" :length="15" :total-visible="7"></v-pagination>
    <div v-for="n in 3" :key="n" class="my-5">
      <v-divider></v-divider>
      <AccountListItem />
    </div>
    <v-pagination v-model="page" :length="15" :total-visible="7"></v-pagination>
  </div>
</template>

<script>
import AccountListItem from '../../../components/admin/AccountListItem'
export default {
  middleware: 'auth-admin',
  components: {
    AccountListItem
  },
  data() {
    return {
      page: 1
    }
  }
}
</script>

<style></style>
