<template>
  <div>
    <h1 class="text-center">Заявка на восстановление пароля</h1>
    <h3 class="text-center">Необходимо ввести адрес электронной почты</h3>
    <v-form v-model="formValidity" @submit.prevent="restorePassword">
      <v-text-field
        v-model="username"
        label="Электронная почта*"
        prepend-icon="mdi-email"
        :rules="usernameRules"
        required
        class="my-5"
      ></v-text-field>
      <v-btn
        color="success"
        type="submit"
        :disabled="!formValidity"
        class="mb-5"
        >Восстановить</v-btn
      >
    </v-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formValidity: false,
      username: '',
      usernameRules: [
        (value) => !!value || 'Необходимо ввести адрес электронной почты',
        (value) => value.indexOf('@') !== 0 || 'Email должен содержать имя',
        (value) => value.includes('@') || 'Email должен включать @ символ',
        (value) =>
          value.indexOf('.') - value.indexOf('@') > 1 ||
          'Email должен содержать имя домена',
        (value) =>
          value.includes('.') || 'Email должен содержать точку после домена',
        (value) =>
          value.indexOf('.') <= value.length - 3 ||
          'Email должен содержать доменную зону'
      ]
    }
  },
  methods: {
    async restorePassword() {
      this.$store.commit('SWITCH_LOADER', true)
      await this.$axios
        .post(`/api/account/restore-password?name=${this.username}`)
        .then((response) => {
          this.$store.commit('SWITCH_LOADER', false)
          this.$toasted.success('Новый пароль отправлен на почту!').goAway(2000)
          this.$router.push('/login')
        })
        .catch((e) => {
          console.log(e.response)
          let msg = 'Сервер временно недоступен, повторите попытку позже!'
          if (e.response.status === 406) {
            msg = 'Пользовать с такой почтой не существует'
          }
          this.$store.commit('SWITCH_LOADER', false)
          this.$toasted.error(msg).goAway(3000)
        })
    },
    head() {
      return {
        title: '«СЕНАТОР» - восстановление пароля',
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: 'Представлена форма восстановления пароля senator-wine.ru'
          }
        ]
      }
    }
  }
}
</script>

<style></style>
