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
    <div>
      <p class="grey--text">Всего найдено: {{ users.totalElements }}</p>
    </div>
    <div v-for="user in users.content" :key="user.id" class="my-5">
      <v-divider></v-divider>
      <AccountListItem :user="user" />
    </div>
    <v-pagination
      v-model="page"
      :length="users.totalPages"
      :total-visible="7"
      @input="changePage"
    ></v-pagination>
  </div>
</template>

<script>
import AccountListItem from '../../../components/admin/AccountListItem'
export default {
  middleware: 'auth-admin',
  components: {
    AccountListItem
  },
  asyncData(context) {
    return context.$axios
      .get('/api/admin/account/all')
      .then((response) => {
        const users = response.data
        return { users }
      })
      .catch((e) => {
        context.error({
          statusCode: 500,
          message: 'Сервер временно недоступен, повторите попытке позже'
        })
      })
  },
  data() {
    return {
      page: 1
    }
  },
  methods: {
    async changePage() {
      this.$store.commit('SWITCH_LOADER', true)
      await this.$axios
        .get(`/api/admin/account/all?page=${this.page - 1}`)
        .then((response) => {
          this.$store.commit('SWITCH_LOADER', false)
          this.users = response.data
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
