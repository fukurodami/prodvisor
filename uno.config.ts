// uno.config.ts
import { defineConfig, presetIcons, presetWind4, transformerDirectives } from 'unocss'

export default defineConfig({
  presets: [
    presetWind4(),
    presetIcons({
      scale: 1.2,
      unit: 'em',
    }),
  ],

  transformers: [transformerDirectives()],

  preflights: [
    {
      getCSS: () => `
        :root {
          --color-neutral-50: #F8FAFB;
          --color-neutral-100: #F4F4F7;
          --color-neutral-200: #E2E2E5;
          --color-neutral-300: #CFD1D6;
          --color-neutral-400: #BCBEC3;
          --color-neutral-500: #B1B3BD;
          --color-neutral-600: #95969E;
          --color-neutral-700: #7D7E85;
          --color-neutral-800: #606166;
          --color-neutral-900: #303033;
        }
      `,
    },
  ],

  theme: {
    colors: {
      text: '#303033',
      primary: '#5F5FF6',
      success: '#67C23A',
      warning: '#E6A23C',
      danger: '#F56C6C',
      info: '#909399',
      telegram: '#0088CC',
      indigo: {
        50: '#F2F1FF',
        100: '#DBDBFD',
        600: '#4f46e5',
        700: '#4338ca',
      },
      neutral: {
        25: '#FFFFFF',
        50: '#F8FAFB',
        100: '#F4F4F7',
        200: '#E2E2E5',
        300: '#CFD1D6',
        400: '#BCBEC3',
        500: '#B1B3BD',
        600: '#95969E',
        700: '#7D7E85',
        800: '#606166',
        900: '#303033',
      },
    },
    fontFamily: {
      sans: ['Roboto', 'system-ui', 'sans-serif'],
    },
    fontSize: {
      xs: '0.75rem', // 12px
      sm: '0.875rem', // 14px
      base: '1rem', // 16px
      lg: '1.125rem', // 18px
      xl: '1.25rem', // 20px
    },
  },

  shortcuts: [
    [
      'btn-default',
      'inline-flex items-center gap-2 bg-gray-100' +
        ' border !border-gray-200 !text-gray-900' +
        ' !hover:bg-gray-200 !focus:bg-gray-200 !focus:outline-none' +
        ' !focus:ring-0 !shadow-none',
    ],
    [
      'btn-outline-primary',
      'inline-flex items-center gap-2 bg-transparent' +
        ' border border-primary text-primary hover:bg-primary hover:!text-white' +
        ' !focus:bg-primary !focus:outline-none !focus:ring-0 !shadow-none',
    ],

    ['flex-center', 'flex items-center justify-center'],
    ['flex-col-center', 'flex flex-col items-center justify-center'],
    ['flex-between', 'flex items-center justify-between'],
    ['flex-start', 'flex items-start justify-start'],
    ['flex-end', 'flex items-end justify-end'],
    ['flex-around', 'flex items-center justify-around'],

    ['self-start', 'self-start'],
    ['self-end', 'self-end'],
    ['self-center', 'self-center'],
    ['self-stretch', 'self-stretch'],

    ['card', 'bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-700 shadow-xl p-6'],
    ['section', 'py-12 px-6 md:px-12'],

    ['text-title', 'text-2xl md:text-3xl font-bold text-white'],
    ['text-subtitle', 'text-lg text-gray-300'],
  ],

  content: {
    pipeline: {
      include: ['./**/*.{vue,js,ts,jsx,tsx,html,md}'],
    },
  },
})
