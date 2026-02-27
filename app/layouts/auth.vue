<template>
  <div class="auth-layout">
    <div class="auth-layout__left">
      <div class="auth-layout__left__content"></div>
    </div>

    <div class="auth-layout__right">
      <Toast position="top-right" />
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Toast from 'primevue/toast'

defineOptions({
  name: 'AuthLayout',
})
</script>

<style lang="scss" scoped>
.auth-layout {
  display: flex;
  min-height: 100vh;
  background-color: white;

  &__left {
    flex: 1;
    padding: 8px;
    height: 100vh;

    &__content {
      position: relative;
      background: url('@/assets/images/login-left-bg.png') center/cover no-repeat;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      height: 100%;
      min-height: 400px;
    }
  }

  &__right {
    flex: 1;
  }
}
</style>
