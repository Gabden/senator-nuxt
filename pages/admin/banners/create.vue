<template>
  <div>
    <h1 class="text-center">Создать баннер стартовой страницы</h1>
    <v-form @submit.prevent="createBanner">
      <v-file-input multiple label="File input"></v-file-input>
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
      url: ''
    }
  },
  methods: {
    createBanner() {
      console.log('Create banner click')
    }
  }
}
</script>

<style></style>
