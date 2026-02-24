// shared/lib/charts/theme.ts
import { computed } from 'vue'

const lightColors = {
  background: '#ffffff',
  text: '#1f2937',
  border: '#e5e7eb',
  levels: ['#3b82f6', '#22c55e', '#f59e0b', '#ef4444', '#14b8a6', '#a855f7'],
}

export function useChartTheme() {
  return computed(() => lightColors)
}
