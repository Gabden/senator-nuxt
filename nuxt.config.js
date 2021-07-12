export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    // titleTemplate: '%s - ' + "ООО 'Сенатор'",
    // title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'keywords',
        name: 'keywords',
        content:
          'винмаркет, алкогольный супермаркет, купить алкоголь, интернет магазин алкоголя, купить элитный алкоголь, премиум алкоголь, премиум вино, алкомаркет, винный магазин, винный супермаркет'
      },
      {
        hid: 'yandex-verification',
        name: 'yandex-verification',
        content: 'ae0e7aed0cfdf69b'
      },
      {
        name: 'smartbanner:title',
        content: 'Senator'
      },
      {
        name: 'smartbanner:author',
        content: 'senator-wine.ru'
      },
      {
        name: 'smartbanner:price',
        content: 'FREE'
      },
      {
        name: 'smartbanner:price-suffix-apple',
        content: ' - On the App Store'
      },
      { 
        name: 'smartbanner:price-suffix-google',
        content: ' - In Google Play'
      },

      {
        name: 'smartbanner:icon-apple',
        content: '/appstore.png'
      },

      {
        name: 'smartbanner:icon-google',
        content: '/google.png'
      },

      {
        name: 'smartbanner:button',
        content: 'VIEW'
      },

      {
        name: 'smartbanner:button-url-apple',
        content:
          'https://apps.apple.com/ru/app/%D1%81%D0%B5%D0%BD%D0%B0%D1%82%D0%BE%D1%80-senator/id1574491488?ign-itsct=apps_box_badge&ign-itscg=30200'
      },

      {
        name: 'smartbanner:button-url-google',
        content:
          'https://play.google.com/store/apps/details?id=com.appbery.appberysenatorwine'
      },

      {
        name: 'smartbanner:enabled-platforms',
        content: 'android,ios'
      },

      {
        name: 'smartbanner:close-label',
        content: 'Close'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#FF5722', height: '7px' },
  /*
   ** Global CSS
   */
  css: ['~/assets/main.css', '~/assets/banner/smartbanner.min.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~plugins/vmask', '~plugins/axios', '~plugins/banner.client'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
    [
      '@nuxtjs/google-analytics',
      {
        id: 'UA-158832193-1'
      }
    ]
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/auth',
    '@nuxtjs/sitemap',
    '@nuxtjs/toast',
    '@nuxtjs/robots',
    'nuxt-vuex-localstorage'
  ],
  proxy: {
    '/api': {
      target: 'http://localhost:8098',
      pathRewrite: {
        '^/api': '/'
      }
    }
  },
  auth: {
    plugins: ['~/plugins/auth.js'],
    strategies: {
      local: {
        endpoints: {
          login: { url: '/api/login', method: 'post', propertyName: 'token' },
          logout: { url: '/api/logout', method: 'post' },
          user: {
            url: '/api/api/public/user',
            method: 'get',
            propertyName: false
          }
        }
        // tokenRequired: true,
        // tokenType: 'Bearer'
        // globalToken: true,
        // autoFetchUser: true
      }
    }
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options 
   */
  axios: { proxy: true },
  router: { middleware: 'auth-header' },
  sitemap: {
    hostname: 'https://senator-wine.ru',
    gzip: true,
    exclude: ['/admin/**']
  },
  toast: {
    position: 'top-center',
    register: [
      // Register custom toasts
      {
        name: 'my-error',
        message: 'Oops...Something went wrong',
        options: {
          type: 'error'
        }
      }
    ]
  },
  robots: {
    UserAgent: '*',
    Disallow: '/admin'
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false
      //   themes: {
      //     dark: {
      //       primary: colors.blue.darken2,
      //       accent: colors.grey.darken3,
      //       secondary: colors.amber.darken3,
      //       info: colors.teal.lighten1,
      //       warning: colors.amber.base,
      //       error: colors.deepOrange.accent4,
      //       success: colors.green.accent3
      //     }
      //   }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
