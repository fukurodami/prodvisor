import { onUnmounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { sendPhone } from '@/features/auth/api/auth.api'
import type { AuthMethod, LoginResponse, SendPhonePayload, SendPhoneResponse, TelegramData } from '@entities/user/types'

export function usePhoneAuth(getCaptchaToken?: () => Promise<string>) {
  const phone = ref('')
  const code = ref('')
  const isLoading = ref(false)
  const errorMsg = ref<string | null>(null)
  const successMsg = ref<string | null>(null)
  const rawResponse = ref<SendPhoneResponse | null>(null)

  const remainingTime = ref(0)
  const timerId = ref<number | null>(null)

  function openTelegramBot(data: TelegramData) {
    const { bot_username, bot_start_payload, expires_at } = data
    if (!bot_username || !bot_start_payload) return

    const url = `https://t.me/${bot_username}?start=${bot_start_payload}`
    window.open(url, '_blank')
    startTimer(expires_at)
  }

  function startTimer(expiresAt: number) {
    stopTimer()
    const offsetSec = 7 * 3600
    const secondsLeft = Math.max(0, Math.ceil(expiresAt + offsetSec - Date.now() / 1000))
    remainingTime.value = secondsLeft

    if (secondsLeft > 0) {
      timerId.value = window.setInterval(() => {
        remainingTime.value -= 1
        if (remainingTime.value <= 0) {
          stopTimer()
          ElMessage.warning('Время на ввод кода истекло')
        }
      }, 1000)
    }
  }

  function stopTimer() {
    if (timerId.value !== null) {
      clearInterval(timerId.value)
      timerId.value = null
    }
  }

  onUnmounted(stopTimer)

  async function sendPhoneNumber(method: AuthMethod) {
    if (phone.value.length !== 10) {
      ElMessage.warning('Введите полный номер телефона (10 цифр после +7)')
      return
    }

    if (isLoading.value) return

    isLoading.value = true
    errorMsg.value = null
    successMsg.value = null
    rawResponse.value = null

    try {
      const fullPhone = `+7${phone.value}`

      let payload: SendPhonePayload = {
        phone: fullPhone,
        response_type: method,
      }

      if (method === 'phone_code' && getCaptchaToken) {
        const token = await getCaptchaToken()
        payload.captcha = token
      }

      const response = await sendPhone(payload)

      rawResponse.value = response

      const { expires_at } = response.data
      if (expires_at) {
        startTimer(expires_at)
      }

      if (method === 'telegram_code') {
        openTelegramBot(response.data as TelegramData)
        successMsg.value = 'Бот открыт. Введите код в течение времени'
      } else {
        successMsg.value = 'Код отправлен по звонку. Введите его ниже'
      }

      ElMessage.success('Запрос выполнен')
    } catch (err: any) {
      errorMsg.value = err?.data?.status?.message || err?.message || 'Ошибка авторизации'
      ElMessage.error(errorMsg.value!)
      console.error('Ошибка:', err)
    } finally {
      isLoading.value = false
    }
  }

  async function verifyCode() {
    if (code.value.length !== 6) {
      ElMessage.warning('Введите 6-значный код')
      return
    }

    isLoading.value = true
    errorMsg.value = null

    try {
      const fullPhone = `+7${phone.value}`

      const payload = {
        phone: fullPhone,
        code: code.value,
        grant_type: 'phone_code',
        app_id: 4,
        app_secret: '251ec2c094984822be439b0b9081f02f',
      }

      const response = await $fetch<LoginResponse>(`${useRuntimeConfig().public.baseURLSSO}/oauth/token/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
      })

      useCookie('access_token').value = response.access_token
      useCookie('refresh_token').value = response.refresh_token
      useCookie('expires_in').value = String(Date.now() + response.expires_in * 1000)

      successMsg.value = 'Успешный вход!'
      ElMessage.success('Вход выполнен')
      navigateTo('/')
    } catch (err: any) {
      errorMsg.value = err?.data?.status?.message || 'Неверный код'
      ElMessage.error(errorMsg.value!)
    } finally {
      isLoading.value = false
    }
  }

  return {
    phone,
    code,
    isLoading,
    errorMsg,
    successMsg,
    rawResponse,
    remainingTime,
    sendPhoneNumber,
    verifyCode,
  }
}
