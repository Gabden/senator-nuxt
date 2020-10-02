<template>
  <v-app dark>
    <Infobar v-if="!isScrolled" />
    <Navbar id="navbar" />
    <Panel v-if="!$vuetify.breakpoint.mdAndDown" style="margin-top: 15vh" />
    <v-content
      v-if="!isAgeEnough"
      :class="!$vuetify.breakpoint.mdAndDown ? 'pt-0' : ''"
    >
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
    <div v-if="isAgeEnough">
      <v-dialog v-model="isAgeEnough" persistent max-width="650">
        <v-card>
          <v-card-title class="headline d-flex justify-center mb-0 pb-0">
            <p class="text-center mb-0 pb-0">Добро пожаловать на сайт</p>
            <p class=" mb-0 pb-0">
              "Сенатор Лучшие Вина Мира"
              <v-icon color="red" class="display-1 pb-2"
                >mdi-bottle-wine</v-icon
              >
            </p>
          </v-card-title>
          <v-divider class="mb-5"></v-divider>
          <v-card-text class="text-justify mb-0 pb-0">
            <p class="display-1 text-center">Вам уже исполнилось 18 лет?</p>
            <p class="caption">
              Мы используем файлы cookie, для того, чтобы улучшать
              функциональность нашего веб-сервиса, давать вам возможность
              эффективно перемещаться по страницам нашего веб-сайта , а также
              для того, чтобы улучшать взаимодействие пользователя с нашим
              контентом. Нажимая "Да" вы соглашаетесь с правилами использования
              cookie файлов, а также подтверждаете, что вы старше 18 лет
            </p>
          </v-card-text>
          <v-card-actions>
            <v-btn color="green darken-1" outlined text @click="confirmAge">
              Да
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" outlined text @click="declineAge">
              Нет
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
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
      isAgeEnough: false
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
    this.isAgeEnough = this.$store.state.localStorage.isAgeEnough
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

    confirmAge() {
      this.isAgeEnough = false
      this.$store.commit('localStorage/SET_AGE_ENOUGH', this.isAgeEnough)
    },
    declineAge() {
      window.open(
        'https://www.google.com/search?q=%D0%91%D0%B5%D0%B7%D0%B0%D0%BB%D0%BA%D0%BE%D0%B3%D0%BE%D0%BB%D1%8C%D0%BD%D1%8B%D0%B5%20%D0%BD%D0%B0%D0%BF%D0%B8%D1%82%D0%BA%D0%B8'
      )
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
