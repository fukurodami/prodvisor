<script lang="ts" setup>
import { useUserStore } from '@/entities/user/model/user.store'
import { useAuth } from '@/shared/composables/useAuth'
import BaseButton from '@/shared/ui/BaseButton.vue'

const op = ref<any>(null)
const toggle = (event: any) => {
  op.value.toggle(event)
}

const auth = useAuth()
const userStore = useUserStore()

const isPopoverOpen = ref(false)

const onPopoverShow = () => {
  isPopoverOpen.value = true
}

const onPopoverHide = () => {
  isPopoverOpen.value = false
}
</script>

<template>
  <div>
    <BaseButton type="button" variant="white" @click="toggle">
      <TitleSubtitle :img="userStore.image"></TitleSubtitle>
      <span
        :class="isPopoverOpen ? 'rotate-180' : 'rotate-0'"
        aria-hidden="true"
        class="ml-2 inline-flex items-center transition-transform duration-200"
      >
        <i class="pi pi-chevron-down text-gray-600 text-[16px] leading-none w-4 h-4"></i>
      </span>
    </BaseButton>
    <Popover ref="op" @hide="onPopoverHide" @show="onPopoverShow">
      <div class="w-[16rem]">
        <TitleSubtitle
          :sub-title="`Роль: ${userStore.role}`"
          :title="`Пользователь: ${userStore.fullName}`"
          class="mb-4"
        ></TitleSubtitle>
        <Divider class="!p-0 !m-0 !mb-2"></Divider>
        <BaseButton class="w-[100%]" @click="auth.logout()">Выход</BaseButton>
      </div>
    </Popover>
  </div>
</template>

<style scoped></style>
