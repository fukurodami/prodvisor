<script lang="ts" setup>
import SelfPopover from '@/features/auth/ui/SelfPopover.vue'
</script>

<template>
  <div class="layout-wrapper">
    <Menubar class="layout-topbar">
      <template #start>
        <span class="layout-topbar__logo">PRODVISOR</span>
        <nav aria-label="Secondary" class="layout-nav">
          <NuxtLink class="layout-nav__link" to="/">Главная</NuxtLink>
          <span aria-hidden="true" class="layout-nav__divider"></span>
          <NuxtLink class="layout-nav__link" to="/analytics">Аналитика</NuxtLink>
        </nav>
      </template>
      <template #end>
        <SelfPopover />
      </template>
    </Menubar>
    <div class="layout-content">
      <slot />
    </div>
    <Toast position="top-right" />
  </div>
</template>

<style lang="scss" scoped>
.layout-wrapper {
  position: relative;
  min-height: 100vh;
}

.layout-topbar {
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1100;
  height: 4rem;
  background: theme('colors.white');
  border-radius: 0;
  border-bottom: 2px solid #e2e2e5;

  &__logo {
    font-size: 1.8rem;
    font-weight: 600;
    text-transform: lowercase;
  }

  :deep(.p-menubar) {
    align-items: center;
    box-sizing: border-box;
    display: flex;
    height: 4rem;
    padding: 0 2rem;
    position: relative;
  }

  :deep(.p-menubar-start),
  :deep(.p-menubar-end) {
    align-items: center;
    display: flex;
    gap: 1rem;
  }

  :deep(.p-button) {
    align-items: center;
    display: inline-flex;
    padding: 0 8px;
  }

  :deep(.layout-nav) {
    align-items: center;
    display: inline-flex;
    gap: 0.75rem;
    left: 50%;
    position: absolute;
    transform: translateX(-50%);
  }

  :deep(.layout-nav__link) {
    color: inherit;
    font-weight: 500;
    text-decoration: none;
    padding: 0.25rem 0.5rem;
    border-radius: 0.5rem;
  }

  :deep(.layout-nav__link:hover) {
    background: rgba(255, 255, 255, 0.08);
  }

  :deep(.layout-nav__divider) {
    display: inline-block;
    width: 1px;
    height: 1.5rem;
    background: rgba(255, 255, 255, 0.2);
  }

  &-inner {
    align-items: center;
    display: flex;
    height: 4rem;
    justify-content: space-between;
    padding: 0 4rem;
  }
}

.layout-content {
  min-height: calc(100vh - 4rem);
  padding-top: 4rem;
}
</style>
