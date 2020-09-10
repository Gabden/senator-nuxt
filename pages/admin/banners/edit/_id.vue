<template>
  <div>
    <h1 class="text-center">Редактировать баннер стартовой страницы</h1>
    <div class="d-flex justify-center my-5">
      <v-img
        :src="imageSrc"
        max-width="200"
        max-height="180"
        aspect-ratio="0.85"
        contain
      ></v-img>
    </div>
    <v-form @submit.prevent="changeBanner">
      <v-file-input v-model="fileImage" label="File input"></v-file-input>
      <v-text-field
        v-model="url"
        label="Cсылка для перехода"
        prepend-icon="mdi-link-variant"
        class="my-3"
        required
      ></v-text-field>
      <v-btn color="success" type="submit">Изменить</v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  asyncData(context) {
    context.store.commit('SWITCH_LOADER', true)
    return context.$axios
      .get(`/api/admin/banner/${context.params.id}`)
      .then((response) => {
        context.store.commit('SWITCH_LOADER', false)
        const banner = response.data
        return { banner }
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
      url: '',
      fileImage: null
    }
  },
  computed: {
    imageSrc() {
      if (this.banner) {
        return 'data:image/jpg;base64,' + this.banner.fileData
      } else return ''
    }
  },
  created() {
    this.url = this.banner.bannerUrl
  },
  methods: {
    async changeBanner() {
      this.$store.commit('SWITCH_LOADER', true)
      if (this.url !== this.banner.bannerUrl) {
        await this.$axios
          .post(
            `/api/admin/banner/update/url/${this.banner.id}?url=${this.url}`
          )
          .then((response) => {
            this.$toasted.success('Cсылка изменена!').goAway(2000)
          })
          .catch((e) => {
            this.$toasted
              .error('Сервер временно недоступен, повторите попытку позже!')
              .goAway(2000)
          })
      }
      if (this.fileImage) {
        const formData = new FormData()
        formData.append('file', this.fileImage)
        await this.$axios
          .post(`/api/admin/banner/update/img/${this.banner.id}`, formData)
          .then((response) => {
            this.$toasted.success('Баннер изменен!').goAway(2000)
          })
          .catch((e) => {
            this.$toasted
              .error('Сервер временно недоступен, повторите попытку позже!')
              .goAway(2000)
          })
      }
      this.$router.push('/admin/banners')
      this.$store.commit('SWITCH_LOADER', false)
    }
  },
  head() {
    return {
      title: '«СЕНАТОР» - страница редактирования баннеров'
    }
  }
}
</script>

<style></style>
