<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{
  name: string
  size?: string | number
  color?: string
  class?: string
}>()

const sizeValue = computed(() => {
  if (props.size === undefined) return '1.25em'
  if (typeof props.size === 'number') return `${props.size}px`
  return props.size
})

const spriteHref = computed(() => {
  return `/svg/sprite.svg#${props.name}`
})
</script>

<template>
  <svg
    :key="spriteHref"
    :class="['gl-icon', props.class]"
    :data-testid="`${name}-icon`"
    :height="sizeValue"
    :width="sizeValue"
    role="img"
  >
    <use :href="spriteHref" />
  </svg>
</template>

<style scoped>
.gl-icon {
  fill: currentColor;
}
</style>
