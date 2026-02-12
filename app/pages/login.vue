<script lang="ts" setup>
import PhoneInput from '@/shared/ui/PhoneInput.vue'
import VueHcaptcha from '@hcaptcha/vue3-hcaptcha'
import { usePhoneAuth } from '@/features/auth/composables/usePhoneAuth'

definePageMeta({ layout: 'auth' })

interface HCaptchaInstance {
  executeAsync: () => Promise<{ response: string }>
  reset: () => void
}

const captchaRef = ref<HCaptchaInstance | null>(null)

const captchaReset = () => {
  if (captchaRef.value) {
    captchaRef.value.reset()
  }
}

async function getCaptchaToken(): Promise<string> {
  if (!captchaRef.value) {
    throw new Error('hCaptcha не инициализирован')
  }

  try {
    captchaRef.value.reset?.()
    const token = await captchaRef.value.executeAsync()
    return token.response
  } catch (err) {
    console.error('hCaptcha executeAsync error:', err)
    throw new Error('Не удалось получить токен капчи')
  }
}

const {
  phone,
  code,
  isLoading,
  errorMsg,
  remainingTime,
  sendPhoneNumber,
  verifyCode,
} = usePhoneAuth(getCaptchaToken)
</script>

<template>
  <div class="simple-login-test">
    <PhoneInput
      v-model="phone"
      :disabled="isLoading"
      :error="errorMsg"
    />

    <div class="flex gap-4 mt-6">
      <el-button
        :loading="isLoading"
        class="flex-1"
        type="primary"
        @click="sendPhoneNumber('telegram_code')"
      >
        Телеграм
      </el-button>

      <el-button
        :loading="isLoading"
        class="flex-1"
        type="primary"
        @click="sendPhoneNumber('phone_code')"
      >
        Звонок
      </el-button>
    </div>

    <vue-hcaptcha
      ref="captchaRef"
      sitekey="18e5142d-9054-487b-af5d-ce24cf8a09f9"
      size="invisible"
      @error="(err: any) => { console.error('hCaptcha error event:', err); errorMsg = 'Ошибка капчи' }"
      @expired="() => { errorMsg = 'Время капчи истекло'; captchaReset }"
    />

    <div v-if="remainingTime > 0" class="mt-6">
      <h3 class="text-center mb-2">Введите код</h3>
      <OtpInput
        v-model="code"
        :disabled="isLoading"
        :length="6"
        @complete="verifyCode"
      />
    </div>

    <div v-if="remainingTime > 0" class="mt-4 text-center text-gray-600">
      Введите код в течение: <strong>{{ remainingTime }} сек</strong>
    </div>
  </div>
</template>
