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

  shortcuts: [
    [
      'btn-default',
      'inline-flex items-center gap-2 bg-gray-100' +
        ' border !border-gray-200 !text-gray-900' +
        ' !hover:bg-gray-200 !focus:bg-gray-200 !focus:outline-none' +
        ' !focus:ring-0 !shadow-none',
    ],
    [
      'btn-white',
      'inline-flex items-center gap-2 bg-white' +
        ' !border-none text-gray-900 !hover:bg-white' +
        ' !focus:bg-white !focus:outline-none !focus:ring-0 !shadow-none',
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

  theme: {
    colors: {
      primary: '#409EFF',
      success: '#67C23A',
      warning: '#E6A23C',
      danger: '#F56C6C',
      info: '#909399',
      indigo: {
        50: '#eef2ff',
        100: '#e0e7ff',
        600: '#4f46e5',
        700: '#4338ca',
      },
      neutral: {},
    },
    fontFamily: {
      sans: ['Roboto', 'system-ui', 'sans-serif'],
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '0.875rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
    },
  },

  content: {
    pipeline: {
      include: ['./**/*.{vue,js,ts,jsx,tsx,html,md}'],
    },
  },
})
