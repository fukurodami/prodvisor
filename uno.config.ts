import { defineConfig, presetWind4 } from 'unocss'

export default defineConfig({
  presets: [
    presetWind4(),
  ],

  shortcuts: [
    ['btn', 'px-4 py-2 rounded font-medium transition-colors duration-200'],
    ['btn-primary', 'btn bg-blue-600 text-white hover:bg-blue-700'],
    ['card', 'bg-white rounded-xl shadow-md p-6'],
  ],

  theme: {
    colors: {
      primary: '#409EFF',
      success: '#67C23A',
      warning: '#E6A23C',
      danger: '#F56C6C',
      info: '#909399',
    },
  },
})
