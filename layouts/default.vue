<template>
  <v-app dark>
    <Infobar />
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
import Infobar from '@/components/Infobar.vue'

export default {
  components: {
    Navbar,
    Footer,
    Infobar
  },
  data() {
    return {
      scrolled: false
    }
  },
  beforeMount() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      this.scrolled = window.scrollY > 0
      this.$store.dispatch('main/isScrolled', this.scrolled)
    }
  }
}
</script>
