<template>
  <v-container>
    <v-card width="600" class="mx-auto my-5">
      <v-row>
        <v-col>
          <v-card-title cols="12">
            <h1 class="display-1 mx-auto">Регистрация</h1>
            <h3 class="title font-weight-light mx-auto text-justify">
              Необходимо заполнить поля с информацией о себе
            </h3>
          </v-card-title>
        </v-col>
      </v-row>

      <p v-if="error" class="red--text text-center mt-3">{{ errorMsg }}</p>
      <v-card-text>
        <v-form v-model="formValidity" @submit.prevent="login">
          <v-row>
            <v-col cols="12" md="5">
              <v-text-field
                v-model="username"
                label="Электронная почта "
                prepend-icon="mdi-email"
                :rules="usernameRules"
                required
              ></v-text-field>
              <v-text-field
                v-model="phone"
                v-mask="'+7(###)###-####'"
                label="Телефон "
                prepend-icon="mdi-phone"
                required
                :rules="phoneRules"
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Пароль"
                :type="showPassword ? 'text' : 'password'"
                prepend-icon="mdi-lock"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="passwordRules"
                required
                @click:append="showPassword = !showPassword"
              ></v-text-field>
              <v-text-field
                v-model="secondPassword"
                label="Подтвердите пароль"
                :type="showPassword ? 'text' : 'password'"
                prepend-icon="mdi-lock"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="passwordRules"
                required
                @click:append="showPassword = !showPassword"
              ></v-text-field>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="12" md="6">
              <v-text-field
                label="Фамилия"
                prepend-icon="mdi-account"
              ></v-text-field>
              <v-text-field
                label="Имя*"
                prepend-icon="mdi-account"
                :rules="passwordRules"
                required
              ></v-text-field>
              <v-text-field
                label="Отчество"
                prepend-icon="mdi-account"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-checkbox
                v-model="agreeToTerms"
                label="Принять 'Пользовательское соглашение' и 'Политику конфиденциальности'"
                :rules="agreeToTermsRules"
                required
              ></v-checkbox>
              <p class="caption">
                Ознакомиться с
                <nuxt-link router to="/rules"
                  >Пользовательским соглашением</nuxt-link
                >
                и
                <nuxt-link router to="/confidential"
                  >Политикой конфиденциальности</nuxt-link
                >
              </p>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row justify="center">
            <v-col cols="7" sm="5">
              <v-card-actions class="mt-3 mx-auto">
                <v-btn color="success" type="submit" :disabled="!formValidity"
                  >Зарегистрироваться</v-btn
                >
              </v-card-actions>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      phone: {},
      formValidity: false,
      showPassword: false,
      username: '',
      password: '',
      secondPassword: '',
      error: false,
      errorMsg: 'Ошибка регистрации, обратитесь в службу поддержки',
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
      ],
      passwordRules: [(value) => !!value || 'Необходимо заполнить поле'],
      phoneRules: [
        (value) =>
          value.length === 3 ||
          value.length - 15 >= 0 ||
          'Неправильный формат номера телефона'
      ],
      agreeToTerms: false,
      agreeToTermsRules: [
        (value) =>
          !!value ||
          "Вам необходимо принять 'Пользовательское соглашение' и 'Политику конфиденциальности', чтобы создать аккаунт"
      ]
    }
  },
  methods: {
    login() {
      this.$store
        .dispatch('register', {
          username: this.username,
          password: this.password
        })
        .then(() => {
          this.$router.push({ name: 'secured' })
        })
        // eslint-disable-next-line handle-callback-err
        .catch((err) => {
          this.error = true
        })
    }
  }
}
</script>

<style scoped></style>
