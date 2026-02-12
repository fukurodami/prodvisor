const EnvVar = {
  srv_api: 'https://api.beyondviolet.com',
  srv_sso: 'https://sso.beyondviolet.com',
}

export default defineNuxtConfig({
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      baseURL: EnvVar.srv_api,
      baseURLSSO: EnvVar.srv_sso,
    },
  },

  modules: ['@pinia/nuxt', '@unocss/nuxt', '@nuxtjs/google-fonts'],

  css: ['element-plus/dist/index.css', '~/assets/css/main.css'],

  components: {
    dirs: [
      '~/components',
      '~/features/**/ui',
      '~/shared/ui',
    ],
  },

  plugins: ['~/plugins/element-plus.ts'],

  alias: {
    '@entities': '~/app/entities',
    '@features': '~/app/features',
    '@shared': '~/app/shared',
    '@widgets': '~/app/widgets',
    '@pages': '~/app/pages',
  },

  // routeRules: {
  //   '/**': { middleware: ['auth'] },
  //   '/login': { middleware: [] },
  //   '/register': { middleware: [] },
  // },

  typescript: {
    strict: true,
    typeCheck: true,
  },

  googleFonts: {
    families: {
      Roboto: [300, 400, 500, 700],
    },
    display: 'swap',
    prefetch: true,
    preconnect: true,
    download: true,
  },

  compatibilityDate: '2026-02-10',
})
