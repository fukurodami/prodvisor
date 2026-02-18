<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    type?: 'button' | 'submit' | 'reset'
    variant?: 'default' | 'white'
  }>(),
  {
    type: 'button',
    variant: 'default',
  }
)

const attrs = useAttrs()

const variantClasses = computed(() => {
  if (props.variant === 'white') {
    return 'btn-white'
  }

  return 'btn-default'
})
</script>

<template>
  <Button :class="variantClasses" :type="props.type" v-bind="attrs">
    <slot />
  </Button>
</template>
