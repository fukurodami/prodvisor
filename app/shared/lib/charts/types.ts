// shared/lib/charts/types.ts
import type { ECharts, EChartsOption, TreemapSeriesOption } from 'echarts'

export type { EChartsOption, ECharts }

export interface TreemapOption extends Omit<EChartsOption, 'series'> {
  tooltip?: {
    show: boolean
  }
  backgroundColor?: string
  series: Array<TreemapSeriesOption & {
    data: Array<{
      name: string
      value: number
      children?: Array<any>
      itemStyle?: any
      level?: number
      metricChange?: number
      qty?: number
      amount?: number
      percentChange?: number | null
      percentChangeQty?: number | null
      last_year_amount?: number
      e?: number
    }>
    rootVisible?: boolean
    levels?: Array<{
      upperLabel?: {
        show?: boolean
        backgroundColor?: string
        borderColor?: string
        borderWidth?: number
        verticalAlign?: string
      }
      label?: {
        position?: 'inside' | 'top' | 'left' | 'right' | 'bottom' | 'outside'
        align?: 'left' | 'center' | 'right'
        verticalAlign?: 'top' | 'middle' | 'bottom'
        formatter?: (params: any) => any
      }
    }>
    breadcrumb?: {
      show: boolean
      itemStyle?: {
        color: string
      }
    }
    label?: {
      show: boolean
      formatter: (params: any) => any
      color?: string
      backgroundColor?: string
      fontSize?: number
      position?: 'inside' | 'top' | 'left' | 'right' | 'bottom' | 'outside'
      align?: 'left' | 'center' | 'right'
      verticalAlign?: 'top' | 'middle' | 'bottom'
      rich?: {
        name: {
          color: string
          fontWeight: number
          align?: string
          lineHeight?: number
          overflow?: string
          ellipsis?: string
        }
        value: {
          color: string
          fontWeight: number
          align?: string
          lineHeight?: number
          overflow?: string
          ellipsis?: string
        }
      }
    }
    upperLabel?: {
      show: boolean
      height?: number
      formatter: (params: any) => any
      color?: string
      backgroundColor?: string
      fontSize?: number
      verticalAlign?: string
      rich?: {
        name: {
          color: string
          fontWeight: number
        }
        value: {
          color: string
          fontWeight: number
        }
      }
    }
    itemStyle?: {
      borderColorSaturation?: number
      borderWidth?: number
      gapWidth?: number
    }
    roam?: boolean
    zoomOnMouseWheel?: boolean
    moveOnMouseMove?: boolean
    scaleLimit?: {
      min: number
      max: number
    }
    width?: string
    height?: string
    [key: string]: any
  }>
}
