<template>
  <v-card-title :class="smallScreen ? 'caption my-1' : 'my-2'">
    <v-icon class="mr-5" color="#d50000">{{ card.icon }}</v-icon>
    <span>{{ card.content }}</span>
  </v-card-title>
</template>

<script>
export default {
  props: {
    card: {
      type: Object,
      required: true
    },
    smallScreen: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped></style>
