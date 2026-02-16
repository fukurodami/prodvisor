import Aura from '@primeuix/themes/aura'


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

  modules: [
    '@pinia/nuxt',
    '@unocss/nuxt',
    '@nuxtjs/google-fonts',
    '@primevue/nuxt-module',
  ],

  css: [
    'primeicons/primeicons.css',
  ],

  components: {
    dirs: [
      '~/components',
      '~/features/**/ui',
      '~/shared/ui',
    ],
  },

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

  primevue: {
    options: {
      ripple: true,
      inputVariant: 'filled',
      theme: {
        preset: Aura,
        options: {
          prefix: 'p',
          darkModeSelector: 'system',
          cssLayer: false,
        },
      },
    },
    components: {
      include: [
        'Button',
        'InputText',
        'InputOtp',
        'InputNumber',
        'Card',
        'Dialog',
        'Toast',
        'Calendar',
        'Dropdown',
        'MultiSelect',
        'FileUpload',
        'DataTable',
        'Column',
        'Toast',
      ],
    },
  },

  compatibilityDate: '2026-02-10',
})
