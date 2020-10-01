<template>
  <div>
    <h1 class="text-center">Добавление нового события</h1>
    <h3 class="text-center">
      Необходимо заполнить поля, чтобы добавить новое событие в базу данных
    </h3>
    <v-form @submit.prevent="createEvent">
      <v-text-field
        v-model="name"
        label="Название"
        prepend-icon="mdi-link-variant"
        class="my-3"
        required
      ></v-text-field>
      <v-text-field
        v-model="description"
        label="Описание"
        prepend-icon="mdi-link-variant"
        class="my-3"
        required
      ></v-text-field>
      <v-file-input
        v-model="fileImage"
        label="Выберите на более 10 фото"
        multiple
      ></v-file-input>
      <v-btn color="success" type="submit">Создать</v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  middleware: 'auth-admin',
  data() {
    return {
      name: '',
      description: '',
      fileImage: null
    }
  },
  methods: {
    createEvent() {
      console.log('create event')
    }
  }
}
</script>

<style></style>В
