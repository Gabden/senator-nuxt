<template>
  <v-row>
    <div>
      <img
        src="../../assets/default-profile.png"
        alt="Profile"
        width="100"
        height="100"
      />
    </div>
    <v-col :class="smallSize ? 'mt-5' : 'mt-3'">
      <h3 :class="smallSize ? 'name-sm' : 'name-md'">
        Габдулин Денис Валерьевич
      </h3>
      <p :class="smallSize ? 'mail-sm' : 'mail-md'">
        gabden5545@gmail.com
      </p>
    </v-col>
    <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
      <v-tab v-for="item in items" :key="item">
        {{ item }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab" class="mx-auto">
      <v-tab-item v-for="item in items" :key="item">
        <ListOrders v-if="item === 'Заказы'" :orders="orders" />
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
                v-model="username"
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
                v-model="oldPassword"
                label="Cтарый пароль"
                :type="showPassword ? 'text' : 'password'"
                prepend-icon="mdi-lock"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="passwordRules"
                required
                @click:append="showPassword = !showPassword"
              ></v-text-field>
              <v-text-field
                v-model="newPassword"
                label="Новый пароль"
                :type="showPassword ? 'text' : 'password'"
                prepend-icon="mdi-lock"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="passwordRules"
                required
                @click:append="showPassword = !showPassword"
              ></v-text-field>
              <v-text-field
                v-model="secondPassword"
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
                label="Фамилия*"
                prepend-icon="mdi-account"
                :rules="passwordRules"
                required
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
      </v-tab-item>
    </v-tabs-items>
  </v-row>
</template>

<script>
import ListOrders from '@/components/ListOrders.vue'
export default {
  components: {
    ListOrders
  },
  data() {
    return {
      orders: [
        'Заказ №4755 от 2020-03-27',
        'Заказ №4755 от 2020-03-27',
        'Заказ №4755 от 2020-03-27'
      ],
      newPassword: '',
      oldPassword: '',
      secondPassword: '',
      formValidityPass: false,
      formValidityFIO: false,
      showPassword: false,
      formValidityMail: false,
      username: '',
      items: ['Заказы', 'Профиль', 'Настройки'],
      tab: null,
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
    }
  },
  methods: {
    changeEmail() {
      this.$toasted
        .success('Адрес электронной почты успешно изменен!')
        .goAway(2000)
    },
    changePassword() {
      this.$toasted.success('Пароль успешно изменен!').goAway(2000)
    },
    changeFIO() {
      this.$toasted.success('ФИО изменен!').goAway(2000)
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
