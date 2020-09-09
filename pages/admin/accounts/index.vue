<template>
  <div>
    <h1 class="text-center">Страница администрирования учетных записей</h1>
    <h3 class="text-center">
      Здесь вы можете посмотреть, найти или отредактировать учетную запис
    </h3>
    <v-text-field
      v-model="userId"
      type="number"
      label="Поиск по ID"
      prepend-icon="mdi-account"
      append-icon="mdi-magnify"
      @click:append="findUserById"
      @keyup.enter="findUserById"
    ></v-text-field>
    <v-text-field
      v-model="userEmail"
      label="Поиск по email"
      prepend-icon="mdi-account"
      append-icon="mdi-magnify"
      @click:append="findUserByEmail"
      @keyup.enter="findUserByEmail"
    ></v-text-field>
    <v-text-field
      v-model="userPhone"
      v-mask="'+7(###)###-####'"
      label="Поиск по телефону"
      prepend-icon="mdi-account"
      append-icon="mdi-magnify"
      @click:append="findUserByPhone"
      @keyup.enter="findUserByPhone"
    ></v-text-field>
    <v-text-field
      v-model="userFio"
      label="Поиск по ФИО"
      prepend-icon="mdi-account"
      append-icon="mdi-magnify"
      @click:append="findUserByFio"
      @keyup.enter="findUserByFio"
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
      page: 1,
      userId: null,
      userEmail: null,
      userPhone: null,
      userFio: null
    }
  },
  methods: {
    findUserByEmail() {
      const url = `/api/admin/account/search?email=${this.userEmail}`
      this.findUser(url)
    },
    findUserByPhone() {
      const url = `/api/admin/account/search?phone=${this.userPhone}`
      this.findUser(url)
    },
    findUserById() {
      const url = `/api/admin/account/${this.userId}`
      this.findUser(url)
    },
    async findUserByFio() {
      this.$store.commit('SWITCH_LOADER', true)
      await this.$axios
        .get(`/api/admin/account/search/fio?name=${this.userFio}`)
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
    },
    async findUser(url) {
      this.$store.commit('SWITCH_LOADER', true)
      await this.$axios
        .get(url)
        .then((response) => {
          this.$store.commit('SWITCH_LOADER', false)
          this.users.content = [response.data]
          this.users.totalElements = 1
          this.users.totalPages = 1
        })
        .catch((e) => {
          this.$store.commit('SWITCH_LOADER', false)
          this.$toasted
            .error('Сервер временно недоступен, повторите попытку позже!')
            .goAway(2000)
        })
    },
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
