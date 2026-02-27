import { onUnmounted, ref } from 'vue'
import { sendCode, sendPhone } from '@/features/auth/api/auth.api'
import type {
  AuthMethod,
  LoginResponse,
  SendPhonePayload,
  SendPhoneResponse,
  TelegramData,
} from '@/entities/user/types'
import type { AppToast } from '@/shared/composables/useToast'

export function usePhoneAuth(getCaptchaToken?: () => Promise<string>, toast?: AppToast) {
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

    const nowSec = Math.floor(Date.now() / 1000)
    const expiresSec = Math.floor(expiresAt)

    let secondsLeft = Math.max(600, expiresSec - nowSec)

    if (secondsLeft > 3600) {
      secondsLeft = 600
      console.warn('Сервер вернул аномальный expires_at, используем 10 мин')
    }

    remainingTime.value = secondsLeft

    if (secondsLeft > 0) {
      timerId.value = window.setInterval(() => {
        remainingTime.value -= 1
        if (remainingTime.value <= 0) {
          stopTimer()
          toast?.warning('Время на ввод кода истекло')
        }
      }, 1000)
    } else {
      toast?.warning('Время истекло')
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
    console.log('Phone value:', phone.value, 'Length:', phone.value?.length)
    if (!phone.value || phone.value.length === 0) {
      toast?.warning('Введите номер телефона')
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

      if (!response) {
        throw new Error('Не удалось отправить запрос на авторизацию')
      }

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

      toast?.success('Запрос выполнен')
    } catch (err: any) {
      errorMsg.value = err?.data?.status?.message || err?.message || 'Ошибка авторизации'
      toast?.error(errorMsg.value!)
      console.error('Ошибка:', err)
    } finally {
      isLoading.value = false
    }
  }

  async function verifyCode() {
    if (code.value.length !== 4) {
      toast?.warning('Введите 4-значный код')
      return
    }

    isLoading.value = true
    errorMsg.value = null

    try {
      const fullPhone = `+7${phone.value}`

      const response = await sendCode({
        phone: fullPhone,
        code: code.value,
        grant_type: 'phone_code',
      })

      function isLoginResponse(res: LoginResponse | null): res is LoginResponse {
        return !!res && 'access_token' in res && 'refresh_token' in res && 'expires_in' in res
      }

      if (!isLoginResponse(response)) {
        throw new Error('Не удалось получить токены')
      }

      useCookie('access_token', {
        maxAge: 60 * 60 * 24 * 7,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        httpOnly: false,
      }).value = response.access_token

      useCookie('refresh_token', {
        maxAge: 60 * 60 * 24 * 30,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        httpOnly: false,
      }).value = response.refresh_token

      useCookie('expires_in', {
        maxAge: 60 * 60 * 24 * 30,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        httpOnly: false,
      }).value = String(Date.now() + response.expires_in * 1000)

      successMsg.value = 'Успешный вход!'
      toast?.success('Вход выполнен')
      navigateTo('/categories')
    } catch (err: any) {
      errorMsg.value = err?.data?.status?.message || err?.message || 'Неверный код'
      toast?.error(errorMsg.value!)
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
