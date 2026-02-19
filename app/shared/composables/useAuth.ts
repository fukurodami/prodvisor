import { refreshTokens } from '@/features/auth/api/auth.api'
import type { SelfResponse } from '@/entities/user/types'
import { useUserStore } from '@/entities/user/model/user.store'

export function useAuth() {
  const accessToken = useCookie<string | null>('access_token', {
    maxAge: 60 * 60 * 24 * 7,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    httpOnly: false,
  })

  const refreshToken = useCookie<string | null>('refresh_token', {
    maxAge: 60 * 60 * 24 * 30,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    httpOnly: false,
  })

  const expiresIn = useCookie<number | null>('expires_in', {
    maxAge: 60 * 60 * 24 * 30,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    httpOnly: false,
  })

  const userStore = useUserStore()

  const state = ref({
    isAuthenticated: !!accessToken.value,
  })

  const isTokenExpired = computed(() => {
    if (!expiresIn.value) return true
    return Date.now() >= expiresIn.value
  })

  async function refresh(): Promise<void> {
    console.log('refresh called')

    if (!refreshToken.value) {
      await logout()
      return
    }

    if (expiresIn.value && Date.now() < expiresIn.value - 5 * 60 * 1000) {
      console.log('Токен ещё живой, рефреш не нужен')
      return
    }

    try {
      const res = await refreshTokens(refreshToken.value)

      if (!res || !res.access_token || !res.refresh_token) {
        await logout()
        return
      }

      accessToken.value = res.access_token
      refreshToken.value = res.refresh_token
      expiresIn.value = Date.now() + res.expires_in * 1000

      state.value.isAuthenticated = true

      await userStore.fetchUser()
    } catch (err: any) {
      await logout()
      throw err
    }
  }

  async function ensureTokenValidity(): Promise<void> {
    if (!accessToken.value) {
      console.log('Нет access_token → logout')
      await logout()
      return
    }

    if (isTokenExpired.value) {
      if (refreshToken.value) {
        await refresh()
      } else {
        await logout()
      }
    }
  }

  async function logout(): Promise<void> {
    clearNuxtData(`self:${accessToken.value ?? 'guest'}`)

    accessToken.value = null
    refreshToken.value = null
    expiresIn.value = null
    state.value.isAuthenticated = false

    userStore.clear()
    await navigateTo('/login', { replace: true })
  }

  async function self(): Promise<SelfResponse['data'] | null> {
    if (!userStore.user) {
      await userStore.fetchUser()
    }

    return userStore.user
  }

  return {
    isAuthenticated: computed(() => state.value.isAuthenticated),
    accessToken,
    refreshToken,
    expiresIn,
    isTokenExpired,
    ensureTokenValidity,
    refresh,
    logout,
    self,
  }
}
