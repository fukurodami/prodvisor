<!--&lt;!&ndash; features/auth/ui/AuthForm.vue &ndash;&gt;-->
<!--<script lang="ts" setup>-->
<!--defineProps<{-->
<!--  remainingTime?: number;-->
<!--  error?: string | null;-->
<!--}>()-->

<!--defineSlots<{-->
<!--  default: () => any;-->
<!--  error?: (props: { error: string | null }) => any;-->
<!--}>()-->
<!--</script>-->

<!--<template>-->
<!--  <div class="auth-form-container">-->
<!--    <h1 class="auth-title">Войти в личный кабинет</h1>-->

<!--    <div v-if="error" class="auth-error">-->
<!--      <el-alert :closable="false" :title="error" show-icon type="error" />-->
<!--    </div>-->

<!--    <slot />-->

<!--    <div v-if="remainingTime > 0" class="auth-timer">-->
<!--      Осталось времени для ввода кода: {{ remainingTime }} сек-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<style scoped>-->
<!--.auth-form-container {-->
<!--  width: 100%;-->
<!--  max-width: 400px;-->
<!--  padding: 32px;-->
<!--  background: var(&#45;&#45;el-bg-color-overlay);-->
<!--  border-radius: var(&#45;&#45;el-border-radius-base);-->
<!--  box-shadow: var(&#45;&#45;el-box-shadow-lighter);-->
<!--}-->

<!--.auth-title {-->
<!--  text-align: center;-->
<!--  margin-bottom: 24px;-->
<!--  font-size: 28px;-->
<!--  font-weight: 600;-->
<!--}-->

<!--.auth-error {-->
<!--  margin-bottom: 20px;-->
<!--}-->

<!--.auth-timer {-->
<!--  margin-top: 16px;-->
<!--  text-align: center;-->
<!--  color: var(&#45;&#45;el-text-color-secondary);-->
<!--  font-size: 14px;-->
<!--}-->
<!--</style>-->
