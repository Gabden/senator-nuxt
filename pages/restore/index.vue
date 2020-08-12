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
    restorePassword() {
      console.log('restore')
    }
  }
}
</script>

<style></style>
