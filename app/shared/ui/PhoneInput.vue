<script lang="ts" setup>
const props = defineProps<{
  modelValue: string
  label?: string
  error?: string | null
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'filled' | 'outlined'
  class?: string
  inputClass?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const phoneRaw = ref(props.modelValue)

watch(
  phoneRaw,
  (newVal) => {
    emit('update:modelValue', newVal.replace(/\D/g, '').slice(0, 10))
  },
  { immediate: true }
)

watch(
  () => props.modelValue,
  (newVal) => {
    phoneRaw.value = newVal?.replace(/\D/g, '').slice(0, 10) || ''
  }
)

const internalError = computed(() => {
  if (!phoneRaw.value) return null
  return null
})

const finalError = computed(() => props.error || internalError.value)
</script>

<template>
  <BaseInput
    v-model="phoneRaw"
    :class="props.class"
    :disabled="disabled"
    :error="finalError"
    :inputClass="inputClass"
    :placeholder="label || '(999) 999 99 99'"
    :size="size"
    :variant="variant || 'default'"
    maxlength="10"
    type="tel"
    v-bind="$attrs"
  />
</template>
