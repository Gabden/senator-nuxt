<template>
  <v-footer color="blue-grey darken-4" padless>
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <p class="white--text text-center">
            ООО "Сенатор"
          </p>
          <p class="white--text text-center">
            Компания работающая в сегменте <br />
            алкоголя премиум класса с 2005 года
          </p>
          <p class="white--text text-center">
            Мы в социальных сетях
          </p>
          <p class="white--text social-block">
            <!-- <a href="https://www.facebook.com/senator24/">
              <v-icon class="blue--text social">mdi-facebook</v-icon>
            </a>
            <a
              class="mx-5"
              href="https://www.instagram.com/senatorwine24/?igshid=1vk88vyuoxkq"
            >
              <v-icon class="pink--text social">mdi-instagram</v-icon>
            </a> -->
            <a href="https://wa.me/79209551894">
              <v-icon class="green--text social">mdi-whatsapp</v-icon>
            </a>
            <a href="https://t.me/+79209551894">
              <img
                v-lazy-load
                alt="Telegram link"
                src="~assets/telegram.svg"
                class="social telegram-social"
              />
            </a>
          </p>
          <div class="pt-2 mt-2 text-center">
            <p class="white--text text-center">
              Мобильное приложение
            </p>
            <a
              href="https://apps.apple.com/mo/app/%D1%81%D0%B5%D0%BD%D0%B0%D1%82%D0%BE%D1%80-senator/id1574491488?l=en"
              class="mr-3"
            >
              <img
                v-lazy-load
                alt="Apple app store"
                src="~assets/appstorebanner.png"
                class="app-store"
              />
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.appbery.appberysenatorwine"
            >
              <img
                v-lazy-load
                alt="Google play market"
                src="~assets/googlebanner.png"
                class="app-store"
              />
            </a>
          </div>
        </v-col>
        <v-col cols="12" md="3">
          <h3 class="text-center grey--text">Быстрые ссылки</h3>
          <router-link
            v-for="link in aboutUs"
            :key="`${link.label}-footer-link`"
            color="white"
            text
            rounded
            class="white--text d-block my-3 text-center"
            :to="link.url"
          >
            {{ link.label }}
          </router-link>
        </v-col>
        <v-col cols="12" md="3">
          <h3 class="text-center grey--text">Свяжитесь с нами</h3>
          <a
            class="blue-grey darken-4 white--text d-block my-3 text-center"
            text
            rounded
            :href="`tel:+79209551894`"
          >
            <v-icon class="white--text mr-1" style="font-size:20px"
              >mdi-phone</v-icon
            >
            <span>+7(920)-955-18-94</span>
          </a>
          <a
            class="blue-grey darken-4 white--text d-block text-center"
            text
            rounded
            :href="`tel:+74912281937`"
          >
            <v-icon class="white--text mr-1" style="font-size:20px"
              >mdi-phone</v-icon
            >
            <span>+7(4912)-28-19-37</span>
          </a>
          <a
            class="blue-grey darken-4 white--text d-block my-3 text-center"
            text
            rounded
            :href="`mailto:senator24a@gmail.com`"
          >
            <v-icon class="white--text mr-1" style="font-size:20px"
              >mdi-email</v-icon
            >
            <span>senator24a@gmail.com</span>
          </a>
          <p class="blue-grey darken-4 white--text text-center">
            <v-icon class="white--text mr-1" style="font-size:20px"
              >mdi-mailbox</v-icon
            >
            <span>390006, г.Рязань, ул.Свободы д.24а</span>
          </p>
        </v-col>
      </v-row>

      <v-row justify="center" no-gutters>
        <v-col cols="12" class="text-center white--text">
          <router-link
            color="white"
            text
            rounded
            class="white--text d-block text-center"
            to="/rules"
          >
            Пользовательское соглашение
          </router-link>
        </v-col>
        <v-col cols="12" class="text-center white--text">
          <router-link
            color="white"
            text
            rounded
            class="white--text d-block my-3 text-center"
            to="/confidential"
          >
            Политика конфиденциальности
          </router-link>
        </v-col>
        <v-col cols="12" class="text-center grey--text">
          Ограничение по возрасту 18+
        </v-col>
        <v-col cols="12" class="text-center grey--text">
          Все материалы на сайте носят информационный характер и не являются
          рекламой
        </v-col>
        <v-col class="py-4 text-center grey--text" cols="12">
          {{ new Date().getFullYear() }} — <strong>ООО "Сенатор"</strong>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    aboutUs: [
      {
        label: 'Начало',
        url: '/'
      },
      {
        label: 'Акции',
        url: '/sales'
      },
      {
        label: 'Корзина',
        url: '/cart'
      },
      {
        label: 'Корпоративным клиентам',
        url: '/business'
      },
      {
        label: 'Контакты',
        url: '/contacts'
      },
      {
        label: 'О нас',
        url: '/about-us'
      }
    ]
  })
}
</script>
<style scoped>
a {
  text-decoration: none;
}
a span {
  text-decoration: underline;
}
.social {
  font-size: 2.5rem;
}
.app-store {
  width: 35vw;
  height: 60px;
}

.social-block {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.telegram-social {
  display: block;
  padding-top: 4px;
  width: 38px;
  height: 38px;
}

@media (min-width: 600px) {
  .app-store {
    width: 27vw;
  }
}
@media (min-width: 800px) {
  .app-store {
    width: 17vw;
  }
}
@media (min-width: 1000px) {
  .app-store {
    width: 14vw;
  }
}
@media (min-width: 1500px) {
  .app-store {
    width: 10vw;
  }
}
</style>
