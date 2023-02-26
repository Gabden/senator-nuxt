<template>
  <v-row>
    <div>
      <img
        src="../../assets/default-profile.png"
        alt="Profile"
        width="115"
        height="115"
      />
    </div>
    <v-col :class="smallSize ? 'mt-5' : 'mt-3'">
      <h3 :class="smallSize ? 'name-sm' : 'name-md'">
        {{ fullName }}
      </h3>
      <p :class="smallSize ? 'mail-sm mb-0' : 'mail-md mb-0'">
        {{ $auth.user.username }}
      </p>
      <p :class="smallSize ? 'mail-sm' : 'mail-md'">
        {{ $auth.user.userDetailsDescription.phone }}
      </p>
    </v-col>
    <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
      <v-tab v-for="item in items" :key="item">
        {{ item }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab" class="mx-auto">
      <v-tab-item v-for="item in items" :key="item">
        <div v-if="item === 'Заказы'">
          <div v-if="orders.content.length > 0" class="mt-5">
            <p class="grey--text text-center">
              Всего заказов: {{ orders.totalElements }}
            </p>
          </div>

          <ListOrders :orders="orders.content" />
          <v-pagination
            v-if="orders.content.length > 0"
            v-model="orderPage"
            :length="orders.totalPages"
            :total-visible="7"
          ></v-pagination>
        </div>
        <v-form
          v-if="item === 'Настройки'"
          v-model="formValidityMail"
          @submit.prevent="changeEmail"
        >
          <v-card
            color="basil"
            class="mt-5 text-center"
            :min-width="smallSize ? '300' : '650'"
          >
            <v-card-title class="">Изменить почтовый адрес</v-card-title>
            <v-card-text>
              <v-text-field
                v-model="user.username"
                label="Введите новый адрес"
                prepend-icon="mdi-email"
                :rules="usernameRules"
                required
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-btn
                color="success"
                type="submit"
                :disabled="!formValidityMail"
                class="mx-auto"
                >Изменить</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-form>
        <v-form
          v-if="item === 'Настройки'"
          v-model="formValidityPass"
          @submit.prevent="changePassword"
        >
          <v-card
            color="basil"
            class="mt-5 text-center"
            :min-width="smallSize ? '300' : '650'"
          >
            <v-card-title class="text-center">Изменить пароль</v-card-title>
            <v-card-text>
              <v-text-field
                v-model="user.oldPassword"
                label="Cтарый пароль"
                :type="showPassword ? 'text' : 'password'"
                prepend-icon="mdi-lock"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="passwordRules"
                required
                @click:append="showPassword = !showPassword"
              ></v-text-field>
              <v-text-field
                v-model="user.newPassword"
                label="Новый пароль"
                :type="showPassword ? 'text' : 'password'"
                prepend-icon="mdi-lock"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="passwordRules"
                required
                @click:append="showPassword = !showPassword"
              ></v-text-field>
              <v-text-field
                v-model="user.secondPassword"
                label="Подтвердите новый пароль"
                :type="showPassword ? 'text' : 'password'"
                prepend-icon="mdi-lock"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="passwordRules"
                required
                @click:append="showPassword = !showPassword"
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-btn
                color="success"
                type="submit"
                :disabled="!formValidityPass"
                class="mx-auto"
                >Изменить</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-form>

        <v-form
          v-if="item === 'Профиль'"
          v-model="formValidityFIO"
          @submit.prevent="changeFIO"
        >
          <v-card
            color="basil"
            class="mt-5 text-center"
            :min-width="smallSize ? '300' : '650'"
          >
            <v-card-title class="text-center">Изменить ФИО</v-card-title>
            <v-card-text>
              <v-text-field
                v-model="user.fiolast"
                label="Фамилия"
                prepend-icon="mdi-account"
              ></v-text-field>
              <v-text-field
                v-model="user.fiofirst"
                label="Имя*"
                prepend-icon="mdi-account"
                :rules="passwordRules"
                required
              ></v-text-field>
              <v-text-field
                v-model="user.fiomiddle"
                label="Отчество"
                prepend-icon="mdi-account"
              ></v-text-field>
              <birth-picker v-model="user.birthDate" />
            </v-card-text>
            <v-card-actions>
              <v-btn
                color="success"
                type="submit"
                :disabled="!formValidityFIO"
                class="mx-auto"
                >Изменить</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-form>

        <v-form
          v-if="item === 'Профиль'"
          v-model="phoneValidity"
          @submit.prevent="changePhone"
        >
          <v-card
            color="basil"
            class="mt-5 text-center"
            :min-width="smallSize ? '300' : '650'"
          >
            <v-card-title class="text-center"
              >Изменить номер телефона</v-card-title
            >
            <v-card-text>
              <v-text-field
                v-model="user.phone"
                v-mask="'+7(###)###-####'"
                label="Телефон "
                prepend-icon="mdi-phone"
                required
                :rules="phoneRules"
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-btn
                color="success"
                type="submit"
                :disabled="!phoneValidity"
                class="mx-auto"
                >Изменить</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-form>
      </v-tab-item>
    </v-tabs-items>
  </v-row>
</template>

<script>
import ListOrders from '@/components/ListOrders.vue'
import BirthPicker from '@/components/birth-picker'

export default {
  middleware: 'auth',
  name: 'Account',
  components: {
    ListOrders,
    BirthPicker
  },
  asyncData(context) {
    context.store.commit('SWITCH_LOADER', true)
    return context.$axios
      .get(`/api/account/orders/all?email=${context.$auth.user.username}`)
      .then((response) => {
        context.store.commit('SWITCH_LOADER', false)
        const orders = response.data
        return { orders }
      })
      .catch((e) => {
        context.store.commit('SWITCH_LOADER', false)
        context.$toasted
          .error('Сервер временно недоступен, повторите попытку позже!')
          .goAway(2000)
      })
  },
  data() {
    return {
      user: {
        username: '',
        fiofirst: '',
        fiomiddle: '',
        fiolast: '',
        phone: '',
        newPassword: '',
        oldPassword: '',
        secondPassword: '',
        birthDate: ''
      },
      orderPage: 1,
      formValidityPass: false,
      formValidityFIO: false,
      showPassword: false,
      formValidityMail: false,
      phoneValidity: false,
      items: ['Заказы', 'Профиль', 'Настройки'],
      tab: null,
      phoneRules: [
        (value) =>
          value.length === 3 ||
          value.length - 15 >= 0 ||
          'Неправильный формат номера телефона'
      ],
      passwordRules: [(value) => !!value || 'Необходимо заполнить поле'],
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
  computed: {
    smallSize() {
      return this.$vuetify.breakpoint.smAndDown
    },
    fullName() {
      let fullName = ''
      if (this.$auth.user.userDetailsDescription.fiolast) {
        fullName += this.$auth.user.userDetailsDescription.fiolast + ' '
      }
      if (this.$auth.user.userDetailsDescription.fiofirst) {
        fullName += this.$auth.user.userDetailsDescription.fiofirst + ' '
      }
      if (this.$auth.user.userDetailsDescription.fiomiddle) {
        fullName += this.$auth.user.userDetailsDescription.fiomiddle
      }
      return fullName
    }
  },
  watch: {
    orderPage(old, newValue) {
      this.$store.commit('SWITCH_LOADER', true)
      this.$axios
        .get(
          `/api/account/orders/all?email=${this.$auth.user.username}&page=${this
            .orderPage - 1}`
        )
        .then((response) => {
          this.$store.commit('SWITCH_LOADER', false)
          this.orders = response.data
        })
        .catch((e) => {
          this.$store.commit('SWITCH_LOADER', false)
          this.$toasted
            .error('Сервер временно недоступен, повторите попытку позже!')
            .goAway(2000)
        })
    }
  },
  created() {
    if (!this.$auth.user) {
      return
    }

    const { userDetailsDescription } = this.$auth.user
    this.user = {
      ...userDetailsDescription,
      username: this.$auth.user.username
    }
  },
  methods: {
    async changePhone(newPhone) {
      const updatePhoneUrl = `/api/account/update/phone/${this.$auth.user.id}`
      await this.updateInfo(updatePhoneUrl)
    },
    async changeEmail() {
      const updateUserMailUrl = `/api/account/update/username/${this.$auth.user.id}`
      await this.updateInfo(updateUserMailUrl)
      this.$auth.logout()
    },
    async changePassword() {
      if (this.user.newPassword !== this.user.secondPassword) {
        this.$toasted.error('Новые пароли не совпадают!').goAway(2000)
        return
      }
      const updatePasswordUrl = `/api/account/update/password/${this.$auth.user.id}`
      await this.updateInfo(updatePasswordUrl)
      this.user.oldPassword = ''
      this.user.newPassword = ''
      this.user.secondPassword = ''
    },
    async changeFIO() {
      const updateFioUrl = `/api/account/update/fio/${this.$auth.user.id}`
      await this.updateInfo(updateFioUrl)
    },
    async updateInfo(url) {
      this.$store.commit('SWITCH_LOADER', true)
      await this.$axios
        .post(url, this.user)
        .then((response) => {
          this.$store.commit('SWITCH_LOADER', false)
          this.$toasted.success('Данные изменены!').goAway(3000)
          window.location.reload(true)
        })
        .catch((e) => {
          this.$store.commit('SWITCH_LOADER', false)
          const message = e.response.data
            ? e.response.data
            : 'Ошибка, повторите попытку позднее!'
          this.$toasted.error(message).goAway(5000)
        })
    }
  },
  head() {
    return {
      title: '«СЕНАТОР» - личный кабинет'
    }
  }
}
</script>

<style scoped>
.name-sm {
  font-size: 20px;
}
.name-md {
  font-size: 1.75rem;
}
.mail-sm {
  font-size: 18px;
}
.mail-sm {
  font-size: 14px;
}
</style>
