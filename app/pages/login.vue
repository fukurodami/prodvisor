<script lang="ts" setup>
import PhoneInput from '@/shared/ui/PhoneInput.vue'
import OtpInput from '@/shared/ui/OtpInput.vue'
import VueHcaptcha from '@hcaptcha/vue3-hcaptcha'
import { usePhoneAuth } from '@/features/auth/composables/usePhoneAuth'
import type { AuthMethod } from '@/entities/user/types'
import { useToast } from '@/shared/composables/useToast'

definePageMeta({ layout: 'auth' })

const captchaRef = ref<InstanceType<typeof VueHcaptcha> | null>(null)

async function getCaptchaToken(): Promise<string> {
  if (!captchaRef.value) throw new Error('hCaptcha не инициализирован')
  try {
    captchaRef.value.reset?.()
    const token = await captchaRef.value.executeAsync()
    return token.response
  } catch (err) {
    console.error('hCaptcha error:', err)
    throw new Error('Не удалось получить токен капчи')
  }
}

const toast = useToast()

const {
  phone,
  code,
  isLoading,
  errorMsg,
  remainingTime,
  sendPhoneNumber: originalSendPhoneNumber,
  verifyCode,
} = usePhoneAuth(getCaptchaToken, toast)

const step = ref<'phone' | 'code'>('phone')
const currentMethod = ref<AuthMethod | null>(null)

async function sendPhoneNumber(method: AuthMethod) {
  currentMethod.value = method
  await originalSendPhoneNumber(method)
  if (!errorMsg.value) {
    step.value = 'code'
  }
}

function goBack() {
  step.value = 'phone'
  code.value = ''
  remainingTime.value = 0
  currentMethod.value = null
}
</script>

<template>
  <div class="login-wrapper">
    <BaseButton
      v-if="step === 'code'"
      class="text-primary self-start mb-14 min-w-0 !px-0"
      label="← Назад"
      text
      variant="white"
      @click="goBack"
    />
    <div class="login-from">
      <Icon v-if="step === 'phone'" :size="56" class="ml-auto mr-auto mb-5" name="logo" />

      <div
        v-else-if="step === 'code'"
        class="mb-5 p-3 border border-indigo-100 bg-indigo-50 rounded-lg w-[56px] h-[56px] ml-auto mr-auto"
      >
        <Icon :size="32" class="ml-auto mr-auto text-primary" name="secure" />
      </div>
      <h2 class="text-[32px] font-bold text-center mb-4">
        {{ step === 'phone' ? 'Войдите в Prodvisor' : 'Подтвердите номер' }}
      </h2>

      <div v-if="step === 'phone'" class="flex flex-col gap-[20px]">
        <span class="text-center">Введите номер телефона для входа или регистрации в системе</span>

        <PhoneInput v-model="phone" :disabled="isLoading" :error="errorMsg" />

        <BaseButton
          :loading="isLoading"
          class="w-full !border-none !bg-telegram hover:!bg-telegram/90"
          icon="telegram"
          label="Получить код в Telegram "
          variant="primary"
          weight="bold"
          @click="sendPhoneNumber('telegram_code')"
        ></BaseButton>

        <BaseButton
          :loading="isLoading"
          class="w-full !text-primary"
          label="Выбрать другой способ"
          weight="bold"
        />

        <!--        <BaseButton-->
        <!--          :loading="isLoading"-->
        <!--          class="block w[100%]"-->
        <!--          label="Звонок"-->
        <!--          outlined-->
        <!--          @click="sendPhoneNumber('phone_code')"-->
        <!--        />-->
      </div>

      <div v-if="step === 'code'" class="flex flex-col gap-[24px]">
        <span class="text-center"
          >Мы отправили код
          {{ currentMethod === 'telegram_code' ? 'в Telegram' : 'по звонку на номер' }} бот по
          номеру<br />
          <strong class="font-bold">+7 {{ phone }}</strong></span
        >

        <OtpInput v-model="code" :disabled="isLoading" :height="60" @complete="verifyCode" />

        <BaseButton
          :loading="isLoading"
          class="w-full"
          label="Подтвердить"
          variant="primary"
          weight="bold"
          @click="verifyCode"
        />
      </div>

      <vue-hcaptcha
        ref="captchaRef"
        sitekey="18e5142d-9054-487b-af5d-ce24cf8a09f9"
        size="invisible"
      />

      <div v-if="remainingTime > 0" class="mt-6 text-center text-neutal-600">
        Отправить еще раз через
        <span class="text-neutal-900">{{ remainingTime }} сек.</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 40px;
}
.login-from {
  align-self: center;
  width: 460px;
  margin: auto;
  padding: 0 40px;

  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
