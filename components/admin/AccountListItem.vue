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
        125
      </p>

      <p class="font-weight-bold mb-1 subtitle">
        <span class="caption">Email: </span>
        gabden5545@gmail.com
      </p>
      <p class="mb-2">
        <span class="caption">Телефон: </span>
        <strong>+7-910-555-01-01</strong>
      </p>
      <p class="font-weight-bold mb-1 subtitle">
        <span class="caption">ФИО: </span>
        <strong>Петросян Евгений Геннадьевич</strong>
      </p>
    </v-col>
    <v-spacer v-if="!smallSize"></v-spacer>
    <v-col class="d-flex flex-column">
      <v-btn icon class="my-3"
        ><v-icon class="display-1">mdi-pencil-box-multiple</v-icon></v-btn
      >
      <v-btn icon color="red"
        ><v-icon class="display-1">mdi-delete</v-icon></v-btn
      >
    </v-col>
  </v-row></template
>

<script>
export default {
  computed: {
    smallSize() {
      return this.$vuetify.breakpoint.smAndDown
    }
  }
}
</script>

<style></style>
