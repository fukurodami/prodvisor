<script lang="ts" setup>
import { onUnmounted, ref, watch } from 'vue'
import { useECharts } from '../useECharts'
import { useChartTheme } from '../theme'
import type { TreemapOption } from '../types'

const props = defineProps<{
  data: TreemapOption['series'][0]['data']
  title?: string
  height?: string
  sizeMetric?: 'amount' | 'qty'
}>()

const chartContainer = ref<HTMLElement | null>(null)
const { chart, setOption } = useECharts(chartContainer)
const theme = useChartTheme()

const popoverRef = ref<any>(null)
const popoverTarget = ref<HTMLElement | null>(null)
const hoveredNode = ref<any>(null)
let hoverTimer: number | null = null
let lastHoverId: string | null = null

const clearHoverTimer = () => {
  if (hoverTimer) {
    window.clearTimeout(hoverTimer)
    hoverTimer = null
  }
}

const hidePopover = () => {
  popoverRef.value?.hide()
}

const updatePopoverTargetPosition = (evt: any) => {
  if (!popoverTarget.value || !chartContainer.value) return

  const x = evt?.offsetX ?? evt?.event?.offsetX
  const y = evt?.offsetY ?? evt?.event?.offsetY

  if (typeof x !== 'number' || typeof y !== 'number') return

  popoverTarget.value.style.left = `${x}px`
  popoverTarget.value.style.top = `${y}px`
}

const schedulePopover = (evt: any, data: any) => {
  const id = data?.id || data?.name || `${data?.level}-${data?.value ?? ''}`
  lastHoverId = id
  hoveredNode.value = data
  updatePopoverTargetPosition(evt)
  clearHoverTimer()

  hoverTimer = window.setTimeout(() => {
    if (lastHoverId !== id || !popoverRef.value || !popoverTarget.value) return
    popoverRef.value.show(evt?.event || evt, popoverTarget.value)
  }, 500)
}

const onChartMouseOver = (params: any) => {
  const data = params?.data
  const level = data?.level

  if (!data || ![1, 2, 3].includes(level)) {
    clearHoverTimer()
    hidePopover()
    return
  }

  schedulePopover(params?.event, data)
}

const onChartMouseOut = () => {
  clearHoverTimer()
  hidePopover()
}

const COLOR_RANGE_LEGEND = [
  { label: '<= -20', color: '#d62a36' },
  { label: '-20…-10', color: '#e8505b' },
  { label: '-10…-1', color: '#ef8188' },
  { label: '-1…1', color: '#b1b3bd' },
  { label: '1…10', color: '#6fcf94' },
  { label: '10…20', color: '#3aae67' },
  { label: '>= 20', color: '#2f8e54' },
] as const

const COLOR_RANGE = [
  COLOR_RANGE_LEGEND[0].color,
  COLOR_RANGE_LEGEND[1].color,
  COLOR_RANGE_LEGEND[2].color,
  COLOR_RANGE_LEGEND[3].color,
  COLOR_RANGE_LEGEND[4].color,
  COLOR_RANGE_LEGEND[5].color,
  COLOR_RANGE_LEGEND[6].color,
] as const

const colorForChange = (value?: number | null) => {
  if (value == null || Number.isNaN(value)) return COLOR_RANGE[2]
  if (value <= -20) return COLOR_RANGE[0]
  if (value < -10) return COLOR_RANGE[1]
  if (value < -1) return COLOR_RANGE[2]
  if (value <= 1) return COLOR_RANGE[3]
  if (value <= 10) return COLOR_RANGE[4]
  if (value <= 20) return COLOR_RANGE[5]
  return COLOR_RANGE[6]
}

const normalizeTreemapData = (
  nodes: TreemapOption['series'][0]['data'],
  metric: 'amount' | 'qty' = 'qty'
) => {
  const walk = (node: any): any => {
    const level = node?.level
    const next: any = { ...node }

    const metricValue = metric === 'qty' ? (node?.qty ?? 0) : (node?.amount ?? 0)
    const metricChange = metric === 'qty' ? node?.percentChangeQty : node?.percentChange
    next.value = metricValue
    next.metricChange = metricChange

    // Get colors for levels 1 and 2
    const getCSSVar = (name: string, fallback: string) => {
      if (typeof window === 'undefined' || typeof document === 'undefined') return fallback
      const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
      return value || fallback
    }

    const neutral50 = getCSSVar('--color-neutral-50', '#F8FAFB')
    const neutral100 = getCSSVar('--color-neutral-100', '#F4F4F7')

    if (level === 1 || level === 2) {
      next.itemStyle = {
        ...(next.itemStyle || {}),
        color: neutral50,
        borderColor: neutral100,
      }
    } else if (level === 3) {
      next.itemStyle = {
        ...(next.itemStyle || {}),
        color: colorForChange(metricChange),
      }
    }

    if (node?.children?.length) {
      next.children = node.children.map(walk)
    }

    return next
  }

  return nodes.map(walk)
}

const buildOption = (data: TreemapOption['series'][0]['data']): TreemapOption => {
  // Get colors from CSS variables with proper fallbacks
  const getCSSVar = (name: string, fallback: string) => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return fallback
    const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
    return value || fallback
  }

  const neutral50 = getCSSVar('--color-neutral-50', '#F8FAFB')
  const neutral100 = getCSSVar('--color-neutral-100', '#F4F4F7')

  console.log('Treemap colors:', { neutral50, neutral100 })

  const currentMetric = props.sizeMetric || 'qty'

  return {
    tooltip: {
      show: false,
    },
    series: [
      {
        type: 'treemap',
        data: normalizeTreemapData(data, currentMetric),
        rootVisible: false,
        levels: [
          {
            upperLabel: {
              show: false,
            },
          },
          {
            upperLabel: {
              backgroundColor: '#F4F4F7',
              borderColor: '#E2E2E5',
              borderWidth: 1,
              verticalAlign: 'middle',
            },
          },
          {
            label: {
              position: 'inside',
              align: 'center',
              verticalAlign: 'middle',
              formatter: (params: any) => {
                const name = params?.name ?? ''
                const level = params?.data?.level
                if (level !== 3) return name
                const change = params?.data?.metricChange
                if (change == null || Number.isNaN(change)) return name
                const sign = change > 0 ? '+' : ''
                const value = `${sign}${change.toFixed(0)}%`
                return `{name|${name}} {value|${value}}`
              },
            },
            upperLabel: {
              backgroundColor: '#F4F4F7',
              borderColor: '#E2E2E5',
              borderWidth: 1,
            },
          },
        ],
        breadcrumb: {
          show: false,
        },
        label: {
          show: true,
          formatter: (params: any) => {
            const name = params?.name ?? ''
            const level = params?.data?.level
            if (level !== 3) return name
            const change = params?.data?.metricChange
            if (change == null || Number.isNaN(change)) return name
            const sign = change > 0 ? '+' : ''
            const value = `${sign}${change.toFixed(0)}%`
            return `{name|${name}} {value|${value}}`
          },
          color: '#111827',
          backgroundColor: 'transparent',
          fontSize: 11,
          position: 'inside',
          align: 'center',
          verticalAlign: 'middle',
          rich: {
            name: {
              color: '#111827',
              fontWeight: 400,
              align: 'center',
              lineHeight: 14,
            },
            value: {
              color: '#111827',
              fontWeight: 400,
              align: 'center',
              lineHeight: 14,
            },
          } as any,
        },
        upperLabel: {
          show: true,
          height: 24,
          formatter: (params: any) => {
            const name = params?.name ?? ''
            const level = params?.data?.level
            if (level !== 3) return name
            const change = params?.data?.metricChange
            if (change == null || Number.isNaN(change)) return name
            const sign = change > 0 ? '+' : ''
            const value = `${sign}${change.toFixed(0)}%`
            return `{name|${name}} {value|${value}}`
          },
          color: theme.value.text,
          backgroundColor: 'transparent',
          fontSize: 12,
          verticalAlign: 'middle',
          rich: {
            name: {
              color: '#111827',
              fontWeight: 400,
            },
            value: {
              color: '#111827',
              fontWeight: 400,
            },
          } as any,
        },
        itemStyle: {
          borderColorSaturation: 0.75,
          borderWidth: 2,
          gapWidth: 2,
        },
        roam: true,
        zoomOnMouseWheel: true,
        moveOnMouseMove: true,
        scaleLimit: {
          min: 0.5,
          max: 6,
        },
        width: '100%',
        height: '100%',
      },
    ],
    backgroundColor: theme.value.background,
  }
}

watch(
  [chart, () => props.data, () => props.sizeMetric],
  ([newChart, newData, newMetric]) => {
    console.log('[TreemapChart] watch triggered, data:', newData, 'metric:', newMetric)
    if (!newChart || !newData || newData.length === 0) {
      console.warn('[TreemapChart] chart not ready or data empty')
      return
    }

    console.log('[TreemapChart] setting option')
    setOption(buildOption(newData), true)
  },
  { deep: true, immediate: true }
)

watch(
  chart,
  (newChart, oldChart) => {
    if (oldChart) {
      oldChart.off('mouseover', onChartMouseOver)
      oldChart.off('mouseout', onChartMouseOut)
      oldChart.off('globalout', onChartMouseOut)
    }

    if (newChart) {
      newChart.on('mouseover', onChartMouseOver)
      newChart.on('mouseout', onChartMouseOut)
      newChart.on('globalout', onChartMouseOut)
    }
  },
  { immediate: true }
)

onUnmounted(() => {
  clearHoverTimer()
})
</script>

<template>
  <div :style="{ height: height || '500px' }" class="treemap-chart">
    <div ref="chartContainer" class="w-full h-full" />
    <div ref="popoverTarget" class="treemap-popover-target" />
    <Popover ref="popoverRef">
      <div v-if="hoveredNode" class="treemap-popover">
        <div class="treemap-popover__title">{{ hoveredNode.name }}</div>
        <div class="treemap-popover__row">
          <span>Сумма</span>
          <span>{{ (hoveredNode.last_year_amount ?? 0).toLocaleString() }}</span>
        </div>
        <div class="treemap-popover__row">
          <span>Количество</span>
          <span>{{ (hoveredNode.qty ?? 0).toLocaleString() }}</span>
        </div>
        <div class="treemap-popover__row">
          <span>Изменение</span>
          <span
            >{{
              hoveredNode.percentChange != null ? hoveredNode.percentChange.toFixed(2) : '—'
            }}%</span
          >
        </div>
        <div v-if="hoveredNode.e != null" class="treemap-popover__row">
          <span>Эластичность</span>
          <span>{{ hoveredNode.e.toFixed(2) }}</span>
        </div>
      </div>
    </Popover>
  </div>
  <div class="treemap-legend">
    <div v-for="item in COLOR_RANGE_LEGEND" :key="item.label" class="treemap-legend__item">
      <span :style="{ backgroundColor: item.color }" class="treemap-legend__swatch"></span>
      <span class="treemap-legend__label">{{ item.label }}</span>
    </div>
  </div>
</template>

<style scoped>
.treemap-chart {
  background: white;
  border-radius: 0.5rem;
  overflow: hidden;
  position: relative;
}

.treemap-popover-target {
  position: absolute;
  width: 1px;
  height: 1px;
  left: 0;
  top: 0;
  pointer-events: none;
}

.treemap-popover {
  min-width: 220px;
  font-size: 12px;
}

.treemap-popover__title {
  font-weight: 600;
  margin-bottom: 6px;
  color: #111827;
}

.treemap-popover__row {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  color: #374151;
}

.treemap-legend {
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}

.treemap-legend__item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #111827;
}

.treemap-legend__swatch {
  width: 14px;
  height: 10px;
  border-radius: 2px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.treemap-legend__label {
  white-space: nowrap;
}
</style>
