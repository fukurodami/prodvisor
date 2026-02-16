<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import InputText from 'primevue/inputtext'
import FloatLabel from 'primevue/floatlabel'

const props = defineProps<{
  modelValue: string
  disabled?: boolean
  error?: string | null
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const phoneRaw = ref(props.modelValue)

watch(phoneRaw, (newVal) => {
  emit('update:modelValue', newVal.replace(/\D/g, '').slice(0, 10))
}, { immediate: true })

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
  <FloatLabel>
    <InputText
      id="phone"
      v-model="phoneRaw"
      :disabled="disabled"
      :invalid="!!finalError"
      class="w-full border border-gray-300 rounded-lg p-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
      inputmode="numeric"
      maxlength="10"
      pattern="[0-9]*"
      type="tel"
    />
  </FloatLabel>

  <small v-if="finalError" class="text-red-500 mt-1 block">
    {{ finalError }}
  </small>
</template>
