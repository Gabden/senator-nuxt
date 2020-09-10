<template>
  <v-row class="my-5">
    <v-col class="d-flex align-center">
      <p class="font-weight-bold mb-1 subtitle">Id: {{ banner.id }}</p>
    </v-col>
    <v-spacer v-if="!smallSize"></v-spacer>
    <v-img
      :src="imageSrc"
      max-width="400"
      max-height="400"
      aspect-ratio="0.85"
      contain
    ></v-img>

    <v-spacer v-if="!smallSize"></v-spacer>
    <v-col class="d-flex flex-column align-center justify-center">
      <v-btn icon class="my-3" link :to="`/admin/banners/edit/${banner.id}`"
        ><v-icon class="display-1">mdi-pencil-box-multiple</v-icon></v-btn
      >
      <v-btn icon color="red" @click="deleteDialog = true"
        ><v-icon class="display-1">mdi-delete</v-icon></v-btn
      >
    </v-col>
    <v-dialog v-model="deleteDialog" max-width="290">
      <v-card>
        <v-card-title class="text-center text-justify"
          >Баннер #{{ banner.id }}</v-card-title
        >
        <v-card-text>Подтвердите удаление баннера!</v-card-text>

        <v-card-actions>
          <v-btn color="green darken-1" text @click="deleteDialog = false">
            Отмена
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="deleteBanner">
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
    banner: {
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
    imageSrc() {
      if (this.banner) {
        return 'data:image/jpg;base64,' + this.banner.fileData
      } else return ''
    }
  },
  methods: {
    deleteBanner() {
      this.$store.commit('SWITCH_LOADER', true)
      this.$axios
        .post(`/api/admin/banner/delete/${this.banner.id}`)
        .then((response) => {
          this.$store.commit('SWITCH_LOADER', false)
          this.$toasted.success('Заказ удален!').goAway(2000)
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
