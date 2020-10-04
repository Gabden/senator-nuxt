<template>
  <v-app dark>
    <Infobar v-if="!isScrolled" />
    <Navbar id="navbar" />
    <Panel v-if="!$vuetify.breakpoint.mdAndDown" style="margin-top: 15vh" />
    <v-content :class="!$vuetify.breakpoint.mdAndDown ? 'pt-0' : ''">
      <v-container>
        <nuxt />
        <CheckAge :aged="checkAge" />
      </v-container>
    </v-content>
    <Footer />
    <v-btn
      v-if="isScrolled"
      fab
      icon
      color="blue-grey darken-1"
      class="scroll-button"
      @click="scrollToTop"
      ><v-icon class="display-1">mdi-arrow-up-circle</v-icon></v-btn
    >
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-app>
</template>
<script>
import Footer from '@/components/Footer.vue'
import Navbar from '@/components/Navbar.vue'
import Infobar from '@/components/Infobar.vue'
import Panel from '@/components/Panel.vue'

import CheckAge from '@/components/CheckAge.vue'

export default {
  components: {
    Navbar,
    Footer,
    Infobar,
    Panel,
    CheckAge
  },
  data() {
    return {
      scrolled: false
    }
  },
  computed: {
    isScrolled() {
      return this.$store.state.main.isScrolled
    },
    overlay() {
      return this.$store.state.loader
    },
    checkAge() {
      return this.$store.state.localStorage.isAgeEnough
    }
  },
  beforeMount() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    scrollToTop() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    },
    handleScroll() {
      this.scrolled = window.scrollY > 0
      this.$store.dispatch('main/isScrolled', this.scrolled)
    }
  }
}
</script>
<style scoped>
.scroll-button {
  position: fixed;
  bottom: 20px;
  right: 30px;
  z-index: 99;
}
</style>
