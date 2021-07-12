<template>
  <v-card class="mx-auto text-center pa-3 mb-0">
    <v-card-text class="display-2">
      Скачайте мобильное приложения Сенатор!
      <div class="py-5 mt-5">
        <a :href="googleStoreLink">
          <img
            alt="Google play market"
            src="~assets/googlebanner.png"
            class="app-store"
          />
        </a>
      </div>

      <div class="py-5 mt-5">
        <a :href="appStoreLink">
          <img
            alt="Apple store"
            src="~assets/appstorebanner.png"
            class="app-store"
          />
        </a>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      appStoreLink:
        'https://apps.apple.com/mo/app/%D1%81%D0%B5%D0%BD%D0%B0%D1%82%D0%BE%D1%80-senator/id1574491488?l=en',
      googleStoreLink:
        'https://play.google.com/store/apps/details?id=com.appbery.appberysenatorwine'
    }
  },
  beforeMount() {
    if (navigator && navigator.userAgent.toLowerCase().indexOf('android') > -1) {
      window.location.href = this.googleStoreLink
    }
    if (navigator && navigator.userAgent.toLowerCase().indexOf('iphone') > -1) {
      window.location.href = this.appStoreLink
    }
  },

  methods: {},
  head() {
    return {
      title: '«СЕНАТОР» - мобильные приложения',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Представлена возможность скачивания мобильных приложения под iOS и Android senator-wine.ru'
        }
      ]
    }
  }
}
</script>

<style scoped>
.app-store {
  width: 25vw;
}

@media (max-width: 600px) {
  .app-store {
    width: 50vw;
  }
}
</style>
