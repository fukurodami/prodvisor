<script lang="ts" setup>
import type { PropType } from 'vue'
import type { ImageType } from '@/entities/base'

const { img, title, subTitle, size, borderColor, borderWidth } = defineProps({
  img: {
    type: [String, Object] as PropType<ImageType | null>,
    default: null,
  },
  title: {
    type: String,
    default: null,
  },
  subTitle: {
    type: String,
    default: null,
  },
  size: {
    type: Number,
    default: 40,
  },
  borderColor: {
    type: String,
    default: 'border-gray-200',
  },
  borderWidth: {
    type: Number,
    default: 1,
  },
})

const imgError = ref(false)

const onImageError = () => {
  imgError.value = true
}

const config = useRuntimeConfig()

const imgSrc = computed<string | null>(() => {
  if (!img) return null

  if (typeof img === 'string') {
    return img
  }

  if (img.path) {
    const staticUrl = config.public.baseURLStatic
    if (!staticUrl) return null

    return `${staticUrl}/resize/${size}x${size}/${img.path}`
  }

  return null
})
</script>

<template>
  <div class="flex items-center gap-2">
    <ClientOnly>
      <img
        v-if="imgSrc && !imgError"
        :class="borderColor"
        :src="imgSrc"
        :style="{
          height: size + 'px',
          width: size + 'px',
          borderRadius: '50%',
          borderWidth: borderWidth + 'px',
          borderStyle: 'solid',
        }"
        alt="ava"
        class="avatar flex"
        @error="onImageError"
      />
    </ClientOnly>
    <div v-if="title" class="flex flex-col items-start">
      <span>{{ title }}</span>
      <span>{{ subTitle }}</span>
    </div>
  </div>
</template>

<style scoped>
.avatar {
  object-fit: contain;
}
</style>
