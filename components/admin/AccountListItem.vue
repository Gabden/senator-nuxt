<template>
  <v-row class="my-5 text-no-wrap">
    <v-col>
      <p>
        <img
          src="~assets/default-profile.png"
          alt="Profile"
          width="100"
          height="100"
        />
      </p>
    </v-col>
    <v-spacer v-if="!smallSize"></v-spacer>
    <v-col>
      <p class="font-weight-bold mb-1 subtitle">
        <span class="caption">Id: </span>
        {{ user.id }}
      </p>

      <p class="font-weight-bold mb-1 subtitle">
        <span class="caption">Email: </span>
        {{ user.username }}
      </p>
      <p class="mb-2">
        <span class="caption">Телефон: </span>
        <strong>{{ user.userDetailsDescription.phone }}</strong>
      </p>
      <p class="font-weight-bold mb-1 subtitle">
        <span class="caption">ФИО: </span>
        <strong
          >{{ user.userDetailsDescription.fiolast }}
          {{ user.userDetailsDescription.fiofirst }}
          {{ user.userDetailsDescription.fiomiddle }}</strong
        >
      </p>
    </v-col>
    <v-spacer v-if="!smallSize"></v-spacer>
    <v-col class="d-flex flex-column">
      <v-btn icon class="my-3" nuxt :to="editUserLink"
        ><v-icon class="display-1">mdi-pencil-box-multiple</v-icon></v-btn
      >
      <v-btn icon color="red" @click="deleteDialog = true"
        ><v-icon class="display-1">mdi-delete</v-icon></v-btn
      >
    </v-col>
    <v-dialog v-model="deleteDialog" max-width="290">
      <v-card>
        <v-card-title class="text-center text-justify"
          >Пользователь #{{ user.username }}</v-card-title
        >
        <v-card-text>Подтвердите удаление пользователя!</v-card-text>

        <v-card-actions>
          <v-btn color="green darken-1" text @click="deleteDialog = false">
            Отмена
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="deleteUser">
            Удалить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      deleteDialog: false
    }
  },
  computed: {
    smallSize() {
      return this.$vuetify.breakpoint.smAndDown
    },
    editUserLink() {
      return `/admin/accounts/${this.user.id}`
    }
  },
  methods: {
    deleteUser() {
      this.$store.commit('SWITCH_LOADER', true)
      this.$axios
        .post(`/api/admin/account/delete/${this.user.id}`)
        .then((response) => {
          this.$store.commit('SWITCH_LOADER', false)
          this.$toasted.success('Пользователь удален!').goAway(2000)
          window.location.reload(true)
        })
        .catch((e) => {
          this.$store.commit('SWITCH_LOADER', false)
          this.$toasted
            .error('Сервер временно недоступен, повторите попытку позже!')
            .goAway(2000)
        })
      this.deleteDialog = false
    }
  }
}
</script>

<style></style>
