<template>
  <div>
    <h1 class="text-center">Создать баннер стартовой страницы</h1>
    <v-form @submit.prevent="createBanner">
      <v-file-input
        v-model="file"
        label="File input"
        accept="image/*"
      ></v-file-input>
      <v-text-field
        v-model="url"
        label="Cсылка для перехода"
        prepend-icon="mdi-link-variant"
        class="my-3"
        required
      ></v-text-field>
      <v-btn color="success" type="submit">Создать</v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: '',
      file: null
    }
  },
  methods: {
    async createBanner() {
      let createdId = null
      const formData = new FormData()
      formData.append('file', this.file)
      this.$store.commit('SWITCH_LOADER', true)
      await this.$axios
        .post('/api/admin/banner/create/img', formData)
        .then((response) => {
          createdId = response.data
        })
        .catch((e) => {
          this.$toasted
            .error('Сервер временно недоступен, повторите попытку позже!')
            .goAway(2000)
        })

      await this.$axios
        .post(`/api/admin/banner/update/url/${createdId}?url=${this.url}`)
        .then((response) => {
          this.$store.commit('SWITCH_LOADER', false)
          this.$toasted.success('Баннер успешно создан').goAway(2000)
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
