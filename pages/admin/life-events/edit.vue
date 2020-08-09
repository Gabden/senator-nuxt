<template>
  <div>
    <h1 class="text-center">Редактировать мероприятие</h1>
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
      <v-btn color="success" type="submit">Редактировать</v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      description: '',
      fileImage: null
    }
  },
  methods: {
    editEvent() {
      console.log('create event')
    }
  }
}
</script>

<style></style>
