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
  css: ['~/assets/main.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~plugins/vmask', '~plugins/axios'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify'
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
    '@nuxtjs/google-analytics',
    '@nuxtjs/robots'
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
  axios: {},
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
  // TODO ADD google analytics id
  googleAnalytics: {
    id: 'UA-12301-2'
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
