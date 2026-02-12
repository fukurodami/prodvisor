<!--&lt;!&ndash; features/auth/ui/AuthPhoneForm.vue &ndash;&gt;-->
<!--<script lang="ts" setup>-->
<!--import { normalizePhoneNumber } from '~/shared/lib/helpers' // если есть-->

<!--const props = defineProps<{-->
<!--  phone: string;-->
<!--  code: string;-->
<!--  isCodeStep: boolean;-->
<!--  codeLength: number;-->
<!--  loading: boolean;-->
<!--  remainingTime: number;-->
<!--}>()-->

<!--const emit = defineEmits<{-->
<!--  (e: 'update:phone', value: string): void;-->
<!--  (e: 'update:code', value: string): void;-->
<!--  (e: 'send-telegram'): void;-->
<!--  (e: 'send-phone'): void;-->
<!--  (e: 'verify'): void;-->
<!--  (e: 'back'): void;-->
<!--}>()-->

<!--function handlePhoneInput(val: string) {-->
<!--  emit('update:phone', normalizePhoneNumber(val))-->
<!--}-->
<!--</script>-->

<!--<template>-->
<!--  <el-form :model="{ phone, code }" class="phone-auth-form" label-position="top">-->
<!--    <el-form-item v-if="!isCodeStep" label="Номер телефона">-->
<!--      <el-input-->
<!--        v-model="phone"-->
<!--        :disabled="loading"-->
<!--        placeholder="+7 999 999-99-99"-->
<!--        @input="handlePhoneInput"-->
<!--      >-->
<!--        <template #prefix>-->
<!--          <el-icon>-->
<!--            <Phone />-->
<!--          </el-icon>-->
<!--        </template>-->
<!--      </el-input>-->
<!--    </el-form-item>-->

<!--    <div v-if="isCodeStep">-->
<!--      <el-button style="margin-bottom: 16px;" type="text" @click="$emit('back')">-->
<!--        ← Изменить номер-->
<!--      </el-button>-->

<!--      <el-form-item label="Код подтверждения">-->
<!--        &lt;!&ndash; el-input-otp нет в Element Plus по умолчанию, используем или custom, или несколько el-input &ndash;&gt;-->
<!--        <div class="otp-container">-->
<!--          <el-input-->
<!--            v-model="code"-->
<!--            :disabled="loading"-->
<!--            autofocus-->
<!--            maxlength="6"-->
<!--            placeholder="Введите код"-->
<!--          />-->
<!--        </div>-->
<!--        <div v-if="remainingTime > 0" class="timer-hint">-->
<!--          Код действителен {{ remainingTime }} сек-->
<!--        </div>-->
<!--      </el-form-item>-->
<!--    </div>-->

<!--    <el-form-item v-if="!isCodeStep">-->
<!--      <div class="button-group">-->
<!--        <el-button-->
<!--          :loading="loading"-->
<!--          style="width: 100%; margin-bottom: 12px;"-->
<!--          type="primary"-->
<!--          @click="$emit('send-telegram')"-->
<!--        >-->
<!--          Отправить код в Telegram-->
<!--        </el-button>-->

<!--        <el-divider>или</el-divider>-->

<!--        <el-button-->
<!--          :loading="loading"-->
<!--          plain-->
<!--          style="width: 100%;"-->
<!--          type="primary"-->
<!--          @click="$emit('send-phone')"-->
<!--        >-->
<!--          Получить код по звонку-->
<!--        </el-button>-->
<!--      </div>-->
<!--    </el-form-item>-->

<!--    <el-form-item v-else>-->
<!--      <el-button-->
<!--        :loading="loading"-->
<!--        style="width: 100%;"-->
<!--        type="primary"-->
<!--        @click="$emit('verify')"-->
<!--      >-->
<!--        Войти-->
<!--      </el-button>-->
<!--    </el-form-item>-->
<!--  </el-form>-->
<!--</template>-->

<!--<style scoped>-->
<!--.button-group {-->
<!--  display: flex;-->
<!--  flex-direction: column;-->
<!--  gap: 12px;-->
<!--}-->

<!--.timer-hint {-->
<!--  font-size: 13px;-->
<!--  color: var(&#45;&#45;el-text-color-secondary);-->
<!--  margin-top: 8px;-->
<!--}-->
<!--</style>-->
