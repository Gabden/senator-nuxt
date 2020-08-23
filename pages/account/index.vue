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
        <ListOrders v-if="item === 'Заказы'" :orders="$auth.user.orderTable" />
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
export default {
  middleware: 'auth',
  components: {
    ListOrders
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
        secondPassword: ''
      },
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
      return this.$auth.user
        ? this.$auth.user.userDetailsDescription.fiolast +
            ' ' +
            this.$auth.user.userDetailsDescription.fiofirst +
            ' ' +
            this.$auth.user.userDetailsDescription.fiomiddle
        : ''
    }
  },
  created() {
    this.user.phone = this.$auth.user
      ? this.$auth.user.userDetailsDescription.phone
      : ''
    this.user.fiofirst = this.$auth.user
      ? this.$auth.user.userDetailsDescription.fiofirst
      : ''
    this.user.fiomiddle = this.$auth.user
      ? this.$auth.user.userDetailsDescription.fiomiddle
      : ''
    this.user.fiolast = this.$auth.user
      ? this.$auth.user.userDetailsDescription.fiolast
      : ''
    this.user.username = this.$auth.user ? this.$auth.user.username : ''
  },
  methods: {
    changePhone(newPhone) {
      const updatePhoneUrl = `/api/account/update/phone/${this.$auth.user.id}`
      this.updateInfo(updatePhoneUrl)
    },
    changeEmail() {
      const updateUserMailUrl = `/api/account/update/username/${this.$auth.user.id}`
      this.updateInfo(updateUserMailUrl)
      this.$auth.logout()
    },
    changePassword() {
      if (this.user.newPassword !== this.user.secondPassword) {
        this.$toasted.error('Новые пароли не совпадают!').goAway(2000)
        return
      }
      const updatePasswordUrl = `/api/account/update/password/${this.$auth.user.id}`
      this.updateInfo(updatePasswordUrl)
    },
    changeFIO() {
      const updateFioUrl = `/api/account/update/fio/${this.$auth.user.id}`
      this.updateInfo(updateFioUrl)
    },
    updateInfo(url) {
      this.$axios
        .post(url, this.user)
        .then((response) => {
          this.$toasted.success('Данные изменены!').goAway(3000)
          window.location.reload(true)
        })
        .catch((e) => {
          console.log(e.response)
          const message = e.response.data
            ? e.response.data
            : 'Ошибка, повторите попытку позднее!'
          this.$toasted.error(message).goAway(5000)
        })
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
