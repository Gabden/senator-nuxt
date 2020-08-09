<template>
  <v-row class="my-5">
    <v-col class="d-flex align-center">
      <p class="font-weight-bold mb-1 subtitle">
        Id: 125
      </p>
    </v-col>
    <v-spacer v-if="!smallSize"></v-spacer>
    <v-col class="d-flex align-center">
      <p class="font-weight-bold mb-1 subtitle">
        Дегустация аргентинских вин от Catena Zapata 19.04.2012
      </p>
    </v-col>
    <v-spacer v-if="!smallSize"></v-spacer>
    <v-col class="d-flex flex-column align-center justify-center">
      <v-btn icon class="my-3" link to="/admin/life-events/edit"
        ><v-icon class="display-1">mdi-pencil-box-multiple</v-icon></v-btn
      >
      <v-btn icon color="red"
        ><v-icon class="display-1">mdi-delete</v-icon></v-btn
      >
    </v-col></v-row
  ></template
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
