<script lang="ts" setup>
interface Props {
  type?: 'button' | 'submit' | 'reset'
  variant?: 'default' | 'primary' | 'outlined' | 'white'
  label?: string
  icon?: string
  size?: 'sm' | 'md' | 'lg'
  weight?: 'normal' | 'medium' | 'semibold' | 'bold'
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'button',
  variant: 'default',
  size: 'md',
  weight: 'normal',
  loading: false,
})

const attrs = useAttrs()

const variantClasses = computed(() => {
  const variants: Record<string, string> = {
    default: '!bg-neutral-100 !border-neutral-200 !text-neutral-900',
    primary: '!bg-primary !text-white !border-transparent',
    outlined: '!bg-transparent !border-primary !text-primary hover:!bg-primary hover:!text-white',
    white: '!bg-transparent !border-transparent !text-primary hover:!bg-white/10',
  }
  return variants[props.variant] || variants.default
})

const sizeClasses = computed(() => {
  const sizes = {
    sm: 'h-10 text-sm px-4 min-w-[100px]',
    md: 'h-12 text-base px-6 min-w-[140px]',
    lg: 'h-14 text-lg px-8 min-w-[180px]',
  }
  return sizes[props.size]
})

const weightClasses = computed(() => {
  const weights = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  }
  return weights[props.weight]
})
</script>

<template>
  <Button
    :class="[
      'inline-flex items-center justify-center gap-2 rounded-lg transition-all border',
      'focus:outline-none',
      variantClasses,
      sizeClasses,
      weightClasses,
    ]"
    :loading="props.loading"
    :type="props.type"
    v-bind="attrs"
  >
    <Icon
      v-if="props.icon && !props.loading"
      :name="props.icon"
      class="mr-2 flex-shrink-0"
      size="20"
    />
    <span v-if="props.label" class="truncate">{{ props.label }}</span>
    <slot v-else />
  </Button>
</template>
