// shared/lib/charts/useECharts.ts
import type { Ref } from 'vue'
import { nextTick, onMounted, onUnmounted, shallowRef } from 'vue'
import type { ECharts, EChartsOption } from './types'

export function useECharts(container: Ref<HTMLElement | null>) {
  const chartInstance = shallowRef<ECharts | null>(null)
  let resizeObserver: ResizeObserver | null = null

  const init = async (theme: string = 'light') => {
    if (!container.value) {
      console.warn('[useECharts] container.value is null!')
      return
    }
    if (chartInstance.value) return

    console.log('[useECharts] starting init, container:', container.value)

    const echarts = await import('echarts')

    console.log('[useECharts] echarts imported successfully')

    try {
      chartInstance.value = echarts.init(container.value, theme, {
        renderer: 'canvas',
      })
      console.log('[useECharts] chart initialized, instance:', chartInstance.value)
    } catch (err) {
      console.error('[useECharts] init error:', err)
    }

    resizeObserver = new ResizeObserver(() => {
      chartInstance.value?.resize()
    })
    resizeObserver.observe(container.value)

    // Cleanup
    onUnmounted(() => {
      resizeObserver?.disconnect()
      chartInstance.value?.dispose()
      chartInstance.value = null
    })
  }

  onMounted(() => nextTick(() => init()))

  const setOption = (option: EChartsOption, notMerge = false) => {
    chartInstance.value?.setOption(option, notMerge)
  }

  const resize = () => chartInstance.value?.resize()

  return {
    chart: chartInstance,
    setOption,
    resize,
  }
}
