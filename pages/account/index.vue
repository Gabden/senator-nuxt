<template>
  <v-row>
    <div>
      <img
        src="../../assets/default-profile.png"
        alt="Profile"
        width="100"
        height="100"
      />
    </div>
    <v-col :class="smallSize ? 'mt-5' : 'mt-3'">
      <h3 :class="smallSize ? 'name-sm' : 'name-md'">
        Габдулин Денис Валерьевич
      </h3>
      <p :class="smallSize ? 'mail-sm' : 'mail-md'">
        gabden5545@gmail.com
      </p>
    </v-col>
  </v-row>
</template>

<script>
export default {
  computed: {
    smallSize() {
      return this.$vuetify.breakpoint.smAndDown
    }
  }
}
</script>

<style scoped>
.name-sm {
  font-size: 20px;
}
.name-md {
  font-size: 1.75rem;
}
.mail-sm {
  font-size: 18px;
}
.mail-sm {
  font-size: 14px;
}
</style>
