<template>
  <v-app dark>
    <Infobar v-if="!isScrolled" />
    <Navbar />
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
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
  computed: {
    isScrolled() {
      return this.$store.state.main.isScrolled
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
