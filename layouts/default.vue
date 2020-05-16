<template>
  <v-app dark>
    <Navbar />
    <v-content>
      <nuxt />
    </v-content>
    <Footer />
  </v-app>
</template>
<script>
import Footer from '@/components/Footer.vue'
import Navbar from '@/components/Navbar.vue'
export default {
  components: {
    Navbar,
    Footer
  }
}
</script>
