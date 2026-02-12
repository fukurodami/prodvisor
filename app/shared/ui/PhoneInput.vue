<script lang="ts" setup>
import { computed, ref, watch } from 'vue'

const props = defineProps<{
  modelValue: string
  disabled?: boolean
  error?: string | null
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
 
const phoneRaw = ref(props.modelValue)

// ← ВОТ ЭТА СТРОКА — САМАЯ ВАЖНАЯ!
watch(phoneRaw, (newVal) => {
  emit('update:modelValue', newVal.replace(/\D/g, '').slice(0, 10))
}, { immediate: true })

// Синхронизация извне → внутрь
watch(() => props.modelValue, (newVal) => {
  phoneRaw.value = newVal?.replace(/\D/g, '').slice(0, 10) || ''
})

const internalError = computed(() => {
  if (!phoneRaw.value) return null
  if (phoneRaw.value.length < 10) return 'Введите полный номер (10 цифр)'
  return null
})

const finalError = computed(() => props.error || internalError.value)
</script>

<template>
  <div>
    <el-input
      v-model="phoneRaw"
      :class="{ 'el-input--error': finalError }"
      :disabled="disabled"
      maxlength="10"
      placeholder="(___) ___-__-__"
      type="tel"
    >
      <template #prepend>+7</template>
    </el-input>

    <div v-if="finalError" class="text-red-500 text-sm mt-1 pl-1">
      {{ finalError }}
    </div>
  </div>
</template>

<style scoped>
.el-input--error .el-input__wrapper {
  box-shadow: 0 0 0 1px var(--el-color-danger) inset !important;
}
</style>
