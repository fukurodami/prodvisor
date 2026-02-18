<script lang="ts" setup>
import PhoneInput from '@/shared/ui/PhoneInput.vue'
import OtpInput from '@/shared/ui/OtpInput.vue'
import VueHcaptcha from '@hcaptcha/vue3-hcaptcha'
import { usePhoneAuth } from '@/features/auth/composables/usePhoneAuth'
import Button from 'primevue/button'
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
  <div class="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
    <div class="w-full max-w-md bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
      <div class="p-8">
        <h2 class="text-3xl font-bold text-white text-center mb-8">
          {{ step === 'phone' ? 'Вход' : 'Подтверждение кода' }}
        </h2>

        <Button
          v-if="step === 'code'"
          class="mb-6 text-gray-400 hover:text-white transition-colors w-full justify-start"
          label="← Вернуться к номеру"
          text
          @click="goBack"
        />

        <div v-if="step === 'phone'">
          <PhoneInput
            v-model="phone"
            :disabled="isLoading"
            :error="errorMsg"
          />

          <div class="grid grid-cols-2 gap-4 mt-8">
            <Button
              :loading="isLoading"
              class="p-button-raised p-button-primary"
              label="Телеграм"
              @click="sendPhoneNumber('telegram_code')"
            />

            <Button
              :loading="isLoading"
              class="p-button-outlined p-button-secondary"
              label="Звонок"
              outlined
              @click="sendPhoneNumber('phone_code')"
            />
          </div>
        </div>

        <div v-if="step === 'code'">
          <OtpInput
            v-model="code"
            :disabled="isLoading"
            @complete="verifyCode"
          />

          <Button
            :loading="isLoading"
            class="w-full mt-6 p-button-raised p-button-primary"
            label="Войти"
            @click="verifyCode"
          />
        </div>

        <vue-hcaptcha
          ref="captchaRef"
          sitekey="18e5142d-9054-487b-af5d-ce24cf8a09f9"
          size="invisible"
        />

        <div v-if="remainingTime > 0" class="mt-6 text-center text-gray-300">
          Введите код, отправленный вам
          <strong class="text-white">
            {{ currentMethod === 'telegram_code' ? 'в Telegram' : 'по звонку на номер' }}
          </strong>
          в течение: <strong class="text-indigo-400">{{ remainingTime }} сек</strong>
        </div>
      </div>
    </div>
  </div>
</template>
