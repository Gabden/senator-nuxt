<template>
  <v-app dark>
    <Infobar v-if="!isScrolled" />
    <Navbar id="navbar" @search="search = true" />
    <Panel v-if="!$vuetify.breakpoint.mdAndDown" style="margin-top: 15vh" />
    <v-content :class="!$vuetify.breakpoint.mdAndDown ? 'pt-0' : ''">
      <v-row v-if="search" justify="center" class="mt-5 mb-0">
        <v-text-field
          v-model="searchText"
          hide-details
          rounded
          outlined
          dense
          color="orange"
          single-line
          append-icon="mdi-magnify"
          label="Поиск"
          class="pa-0"
          style="max-width: 75%"
          @click:append="findProducts"
          @keyup.enter="findProducts"
        >
        </v-text-field>
        <v-btn icon @click="search = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-row>
      <v-container>
        <nuxt />
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

export default {
  components: {
    Navbar,
    Footer,
    Infobar,
    Panel
  },
  data() {
    return {
      scrolled: false,
      search: false,
      searchText: null
    }
  },
  computed: {
    isScrolled() {
      return this.$store.state.main.isScrolled
    },
    overlay() {
      return this.$store.state.loader
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
    },
    findProducts() {
      this.search = false
      this.$router.push({ name: 'search', query: { text: this.searchText } })
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
