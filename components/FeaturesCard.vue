<template>
  <v-card-title class="my-3">
    <v-icon class="mr-5" color="#d50000">{{ card.icon }}</v-icon
    >{{ card.content }}
  </v-card-title>
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
