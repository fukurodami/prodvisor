export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: ['@pinia/nuxt', '@unocss/nuxt', '@nuxtjs/google-fonts'],

  css: ['element-plus/dist/index.css', '~/assets/css/main.css'],

  plugins: ['~/plugins/element-plus.ts'],

  alias: {
    '@entities': '~/app/entities',
    '@features': '~/app/features',
    '@shared': '~/app/shared',
    '@widgets': '~/app/widgets',
    '@pages': '~/app/pages',
  },

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
