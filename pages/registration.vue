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
        <v-form v-model="formValidity" @submit.prevent="register">
          <v-row>
            <v-col cols="12" md="5">
              <v-text-field
                v-model="user.username"
                label="Электронная почта "
                prepend-icon="mdi-email"
                :rules="usernameRules"
                required
              ></v-text-field>
              <v-text-field
                v-model="user.userDetailsDescription.phone"
                v-mask="'+7(###)###-####'"
                label="Телефон "
                prepend-icon="mdi-phone"
                required
                :rules="phoneRules"
              ></v-text-field>
              <v-text-field
                v-model="user.password"
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
                :rules="secondPasswordRules"
                required
                @click:append="showPassword = !showPassword"
              ></v-text-field>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="user.userDetailsDescription.fiolast"
                label="Фамилия"
                prepend-icon="mdi-account"
              ></v-text-field>
              <v-text-field
                v-model="user.userDetailsDescription.fiofirst"
                label="Имя*"
                prepend-icon="mdi-account"
                :rules="passwordRules"
                required
              ></v-text-field>
              <v-text-field
                v-model="user.userDetailsDescription.fiomiddle"
                label="Отчество"
                prepend-icon="mdi-account"
              ></v-text-field>
              <birth-picker v-model="user.userDetailsDescription.birthDate" />
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
import BirthPicker from '@/components/birth-picker'

export default {
  components: {
    BirthPicker
  },
  data() {
    return {
      user: {
        username: '',
        password: '',
        userDetailsDescription: {
          phone: '',
          FIOfirst: '',
          FIOmiddle: '',
          FIOlast: '',
          birthDate: ''
        }
      },
      formValidity: false,
      showPassword: false,
      secondPassword: '',
      error: false,
      errorMsg: 'Ошибка регистрации, обратитесь в службу поддержки',
      usernameRules: [
        (value) => !!value || 'Необходимо ввести адрес электронной почты',
        (value) => value.indexOf('@') !== 0 || 'Email должен содержать имя',
        (value) => value.includes('@') || 'Email должен включать @ символ',
        (value) =>
          value.indexOf('@') < value.lastIndexOf('.') ||
          'Email должен содержать точку после домена',
        (value) =>
          value.indexOf('.') <= value.length - 3 ||
          'Email должен содержать доменную зону'
      ],
      passwordRules: [(value) => !!value || 'Необходимо заполнить поле'],
      secondPasswordRules: [
        (value) => !!value || 'Необходимо заполнить поле',
        (value) => value === this.user.password || 'Пароли не совпадают'
      ],
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
    async register() {
      this.$store.commit('SWITCH_LOADER', true)
      await this.$axios
        .post('/api/account/registration', this.user)
        .then((response) => {
          this.$store.commit('SWITCH_LOADER', false)
          this.$toasted.success('Регистрация прошла успешно!').goAway(2000)
          this.$router.push('/login')
        })
        .catch((e) => {
          console.log(e.response)
          let msg = 'Сервер временно недоступен, повторите попытку позже!'
          if (e.response.status === 406) {
            msg = 'Пользовать с такой почтой уже существует'
          }
          this.$store.commit('SWITCH_LOADER', false)
          this.$toasted.error(msg).goAway(3000)
        })
    }
  },
  head() {
    return {
      title: '«СЕНАТОР» - регистрация на сайте',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Необходимо заполнить анкету для регистрации на сайте senator-wine.ru'
        }
      ]
    }
  }
}
</script>

<style scoped></style>
