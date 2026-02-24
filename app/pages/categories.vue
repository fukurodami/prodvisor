<script lang="ts" setup>
import TreemapChart from '@/shared/lib/charts/components/TreemapChart.vue'
import { useTreemapData } from '@/shared/lib/charts/composables/useTreemapData'
import { onMounted, ref } from 'vue'

const { chartData, isLoading, error, hasData, loadData } = useTreemapData()
const sizeMetric = ref<'amount' | 'qty'>('qty')

onMounted(() => {
  loadData()
})
</script>

<template>
  <div class="w-full" style="min-height: 700px">
    <Teleport defer to="#header-page">Категории продаж</Teleport>

    <div class="w-[80%] mb-4">
      <div class="flex items-center gap-3">
        <span class="text-sm font-medium text-neutral-700">Отображать по:</span>
        <div class="inline-flex border border-neutral-200 rounded-lg overflow-hidden">
          <button
            :class="{
              'bg-neutral-100 text-neutral-900': sizeMetric === 'amount',
              'bg-white text-neutral-600': sizeMetric !== 'amount',
            }"
            class="px-4 py-2 text-sm font-medium border-r border-neutral-200 last:border-r-0 transition-colors"
            type="button"
            @click="sizeMetric = 'amount'"
          >
            По сумме
          </button>
          <button
            :class="{
              'bg-neutral-100 text-neutral-900': sizeMetric === 'qty',
              'bg-white text-neutral-600': sizeMetric !== 'qty',
            }"
            class="px-4 py-2 text-sm font-medium border-r border-neutral-200 last:border-r-0 transition-colors"
            type="button"
            @click="sizeMetric = 'qty'"
          >
            По количеству
          </button>
        </div>
      </div>
    </div>

    <div class="w-[80%]">
      <div v-if="isLoading" class="flex flex-col items-center justify-center h-[500px]">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
        <span class="text-lg text-muted">Загрузка данных...</span>
      </div>

      <div
        v-else-if="error"
        class="flex flex-col items-center justify-center h-[500px] text-center"
      >
        <div class="text-xl text-danger mb-4">Ошибка загрузки</div>
        <p class="text-muted mb-6">{{ error }}</p>
        <button
          class="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
          @click="loadData"
        >
          Попробовать снова
        </button>
      </div>

      <div
        v-else-if="!hasData"
        class="flex flex-col items-center justify-center h-[500px] text-center"
      >
        <div class="text-xl text-muted mb-4">Нет данных</div>
        <p class="text-muted">За выбранный период нет продаж в этой категории</p>
      </div>

      <div v-else class="w-full h-[600px] rounded-xl overflow-hidden border border-neutral-100">
        <TreemapChart :data="chartData" :size-metric="sizeMetric" height="100%" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
