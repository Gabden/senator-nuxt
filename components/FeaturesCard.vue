<template>
  <v-card class="my-5">
    <v-card-title class="headline">
      <v-icon>{{ card.icon }}</v-icon
      >{{ card.content }}</v-card-title
    >
  </v-card>
</template>

<script>
export default {
  props: {
    card: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped></style>
