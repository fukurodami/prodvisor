// shared/api/charts.api.ts
import { useAppFetch } from '@/shared/api/useAppFetch'
import type { TreemapResponse } from '@/entities/analytics/types'

export async function getTreemapData(): Promise<TreemapResponse['data'] | null> {
  const { makeFetch } = useAppFetch()
  const config = useRuntimeConfig()
  const baseURLAnalytics = config.public.baseURLAnalytics

  try {
    const response = await makeFetch<TreemapResponse>(
      '/sys/v1/analytics/new/treemap/',
      {
        method: 'GET',
      },
      false,
      baseURLAnalytics
    )

    return response?.data ?? null
  } catch (err) {
    console.error('[charts.api] getTreemapData failed:', err)
    return null
  }
}
