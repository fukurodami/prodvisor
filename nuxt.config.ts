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

  modules: ['@pinia/nuxt', '@unocss/nuxt', '@nuxtjs/google-fonts', '@primevue/nuxt-module'],
  googleFonts: {
    families: {
      Cantarell: [300, 400, 500, 700],
    },
    display: 'swap',
    preconnect: true,
  },

  css: ['~/assets/css/main.css', 'primeicons/primeicons.css'],

  components: {
    dirs: ['~/components', '~/features/**/ui', '~/shared/ui'],
  },

  alias: {
    '@/entities': '~/app/entities',
    '@/features': '~/app/features',
    '@/shared': '~/app/shared',
    '@/widgets': '~/app/widgets',
    '@/pages': '~/app/pages',
    '@/assets': '~/app/assets',
  },

  typescript: {
    strict: true,
    typeCheck: true,
  },

  primevue: {
    options: {
      ripple: true,
      inputVariant: 'filled',
      theme: {
        preset: Aura,
        options: {
          prefix: 'p',
          darkModeSelector: 'light',
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
        'Menubar',
      ],
    },
  },

  compatibilityDate: '2026-02-10',
})
