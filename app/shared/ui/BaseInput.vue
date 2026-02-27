<script lang="ts" setup>
import InputText from 'primevue/inputtext'
import FloatLabel from 'primevue/floatlabel'

defineOptions({
  inheritAttrs: false,
})

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

const attrs = useAttrs()

const computedValue = computed({
  get: () => props.modelValue,
  set: (value: string) => emit('update:modelValue', value),
})

const sizeClasses = computed(() => {
  return {
    sm: 'text-sm p-2',
    md: 'text-base p-3',
    lg: 'text-lg p-4',
  }[props.size || 'md']
})

const variantClasses = computed(() => {
  return {
    filled: 'bg-gray-100 border border-gray-200',
    outlined: 'border-2 border-gray-200 bg-transparent',
    default: 'bg-neutral-100 border border-neutral-200',
  }[props.variant || 'default']
})
</script>

<template>
  <FloatLabel v-if="label">
    <InputText
      v-model="computedValue"
      :class="[
        'w-full rounded-lg transition-all !bg-neutral-100 !border !border-neutral-200',
        'focus:!border-primary focus:!ring-0 focus:!outline-none',
        sizeClasses,
        variantClasses,
        inputClass,
        props.class,
      ]"
      :disabled="disabled"
      :invalid="!!error"
      v-bind="attrs"
    />

    <label v-if="label" :for="attrs.id as string">{{ label }}</label>
  </FloatLabel>

  <InputText
    v-else
    v-model="computedValue"
    :class="[
      'w-full rounded-lg transition-all bg-neutral-100 border border-neutral-200',
      'focus:!border-primary focus:!ring-0 focus:!outline-none',
      sizeClasses,
      variantClasses,
      inputClass,
      props.class,
    ]"
    :disabled="disabled"
    :invalid="!!error"
    v-bind="attrs"
  />

  <small v-if="error" class="text-red-500 mt-1 block">
    {{ error }}
  </small>
</template>
