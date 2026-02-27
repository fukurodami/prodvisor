<script lang="ts" setup>

const props = defineProps<{
  modelValue: string
  length?: number
  disabled?: boolean
  height?: number
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'complete'): void
}>()

const model = ref(props.modelValue || '')

watch(
  () => props.modelValue,
  (val) => {
    model.value = val || ''
  }
)

const placeholder = computed(() => {
  const length = props.length || 4
  return Array(length).fill('_').join(' ')
})

const inputStyle = computed(() => {
  if (props.height) {
    return { height: `${props.height}px` }
  }
  return {}
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
  <BaseInput
    v-model="model"
    :disabled="disabled"
    :placeholder="placeholder"
    :style="inputStyle"
    class="text-center text-2xl font-mono tracking-widest border border-gray-200 !focus:border-primary focus:ring-1 focus:ring-primary"
    inputClass="text-center text-2xl font-mono tracking-widest"
    inputmode="numeric"
    maxlength="4"
    type="text"
  />
</template>
