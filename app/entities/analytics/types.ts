// entities/analytics/types.ts
import type { BaseResponse } from '@/entities/base'

export interface RawNode {
  cls_code?: string
  cls_name?: string
  level: number
  children?: RawNode[]
  e?: number
  sku_key?: number
  sku?: string
  name?: string
  brand?: string
  month_key?: number
  store_format_key?: number
  cls_key?: number
  store_format?: string
  year_qty?: number
  year_amount?: number
  last_year_qty?: number
  last_year_amount?: number
  unit?: string
}

export interface TreemapNode {
  id: string
  name: string
  level: number
  value: number
  amount: number
  qty: number
  e?: number
  unit?: string
  brand?: string
  store_format?: string
  percentChange: number | null
  percentChangeQty: number | null
  last_year_amount?: number
  last_year_qty?: number
  children?: TreemapNode[]
}

export interface RawTreemapItem {
  cls_code?: string
  cls_name?: string
  sku?: string
  sku_key?: number
  month_key?: number
  store_format?: string
  store_format_key?: number
  year_qty?: number
  year_amount?: number
  last_year_qty?: number
  last_year_amount?: number
  unit?: string
  level: number
  e?: number
  brand?: string
  children?: RawTreemapItem[]
}

export type TreemapResponse = BaseResponse<RawTreemapItem[]>

export type TreemapData = TreemapNode[]
