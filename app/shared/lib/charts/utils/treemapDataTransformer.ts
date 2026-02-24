// shared/lib/charts/utils/treemapTransformer.ts
import type { RawTreemapItem, TreemapNode } from '@/entities/analytics/types'

export function transformToTreemapData(
  rawItems: RawTreemapItem[],
  valueField: 'year_qty' | 'year_amount' = 'year_qty'
): TreemapNode[] {
  function processNode(item: RawTreemapItem, currentLevel: number): TreemapNode {
    const name = item.cls_name?.trim() || 'Без названия'

    let amount = item.year_amount ?? 0
    let qty = item.year_qty ?? 0
    let value = valueField === 'year_qty' ? qty : amount
    let lastYearAmount = item.last_year_amount ?? 0
    let lastYearQty = item.last_year_qty ?? 0

    let children: TreemapNode[] | undefined

    if (currentLevel < 3 && item.children && item.children.length > 0) {
      children = []
      let childValueSum = 0
      let childAmountSum = 0
      let childQtySum = 0
      let childLastAmountSum = 0
      let childLastQtySum = 0

      for (const child of item.children) {
        const childNode = processNode(child, currentLevel + 1)
        children.push(childNode)

        childValueSum += childNode.value
        childAmountSum += childNode.amount
        childQtySum += childNode.qty
        childLastAmountSum += childNode.last_year_amount ?? 0
        childLastQtySum += childNode.last_year_qty ?? 0
      }

      value = value || childValueSum
      amount = amount || childAmountSum
      qty = qty || childQtySum
      lastYearAmount = lastYearAmount || childLastAmountSum
      lastYearQty = lastYearQty || childLastQtySum
    }

    if (currentLevel === 3 && item.children && item.children.length > 0) {
      for (const child of item.children) {
        amount += child.year_amount ?? 0
        qty += child.year_qty ?? 0
        value += valueField === 'year_qty' ? (child.year_qty ?? 0) : (child.year_amount ?? 0)
        lastYearAmount += child.last_year_amount ?? 0
        lastYearQty += child.last_year_qty ?? 0
      }
    }

    const transformed: TreemapNode = {
      id: item.cls_code || String(item.sku_key || 'unknown'),
      name,
      level: currentLevel,
      value,
      amount,
      qty,
      last_year_amount: lastYearAmount,
      last_year_qty: lastYearQty,
      percentChange: lastYearAmount > 0 ? ((amount - lastYearAmount) / lastYearAmount) * 100 : null,
      percentChangeQty: lastYearQty > 0 ? ((qty - lastYearQty) / lastYearQty) * 100 : null,
    }

    if (children) {
      transformed.children = children
    }

    return transformed
  }

  const level1Nodes = rawItems.filter((item) => item.level === 1)

  return level1Nodes.map((node) => processNode(node, 1))
}
