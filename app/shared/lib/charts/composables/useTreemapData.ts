// shared/lib/charts/composables/useTreemapData.ts
import { computed, ref } from 'vue'
import { getTreemapData } from '@/features/analytics/api/charts.api'
import { transformToTreemapData } from '../utils/treemapDataTransformer'
import type { TreemapNode } from '@/entities/analytics/types'

export function useTreemapData() {
  const rawData = ref<any[]>([])
  const transformedData = ref<TreemapNode[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const loadData = async () => {
    isLoading.value = true
    error.value = null

    try {
      const response = await getTreemapData()
      if (response) {
        rawData.value = response
        transformedData.value = transformToTreemapData(rawData.value, 'year_qty')
      } else {
        error.value = 'Данные treemap не получены'
      }
    } catch (err: any) {
      error.value = err.message || 'Ошибка загрузки treemap'
      console.error('[useTreemapData]', err)
    } finally {
      isLoading.value = false
    }
  }

  const hasData = computed(() => transformedData.value.length > 0)

  return {
    chartData: transformedData,
    isLoading,
    error,
    hasData,
    loadData,
  }
}
