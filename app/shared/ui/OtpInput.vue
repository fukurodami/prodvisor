<script lang="ts" setup>
defineProps<{
  modelValue: string
  length?: number
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'complete'): void
}>()

const model = ref(props.modelValue)

watch(() => props.modelValue, (val) => {
  model.value = val
})

watch(model, (val) => {
  emit('update:modelValue', val)
  if (val.length === (props.length || 6)) {
    emit('complete')
  }
})
</script>

<template>
  <div class="flex gap-2 justify-center">
    <input
      v-for="(_, i) in length || 6"
      :key="i"
      v-model="model[i]"
      :disabled="disabled"
      class="w-10 h-12 text-center text-xl border rounded-md focus:outline-none focus:border-primary"
      maxlength="1"
      type="tel"
      @input="e => {
        const input = e.target as HTMLInputElement
        input.value = input.value.replace(/\D/g, '')
        if (input.value && i < (length || 6) - 1) {
          (input.nextElementSibling as HTMLInputElement)?.focus()
        }
      }"
      @keydown.backspace="e => {
        const input = e.target as HTMLInputElement
        if (!input.value && i > 0) {
          (input.previousElementSibling as HTMLInputElement)?.focus()
        }
      }"
    />
  </div>
</template>
