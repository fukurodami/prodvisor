<script lang="ts" setup>
import InputOtp from 'primevue/inputotp'

const props = defineProps<{
  modelValue: string
  length?: number
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'complete'): void
}>()

const model = ref(props.modelValue || '')

watch(() => props.modelValue, (val) => {
  model.value = val || ''
})

watch(model, (val) => {
  const clean = val.replace(/\D/g, '').slice(0, props.length || 4)
  model.value = clean
  emit('update:modelValue', clean)

  if (clean.length === (props.length || 4)) {
    emit('complete')
  }
})
</script>

<template>
  <InputOtp
    v-model="model"
    :disabled="disabled"
    :length="length || 4"
    class="otp-input-custom"
    integerOnly
    @complete="emit('complete')"
  />
</template>
