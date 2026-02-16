import { refreshTokens } from '@/features/auth/api/auth.api'

export function useAuth() {
  const accessToken = useCookie<string | null>('access_token')
  const refreshToken = useCookie<string | null>('refresh_token')
  const expiresIn = useCookie<number | null>('expires_in')

  const state = ref({
    isAuthenticated: !!accessToken.value,
  })

  const isTokenExpired = computed(() => {
    if (!expiresIn.value) return true
    return Date.now() >= expiresIn.value
  })

  async function refresh(): Promise<void> {
    if (!refreshToken.value) {
      logout()
      return
    }

    try {
      const res = await refreshTokens(refreshToken.value)

      accessToken.value = res.access_token
      refreshToken.value = res.refresh_token

      // Самое важное: сохраняем момент истечения
      expiresIn.value = Date.now() + (res.expires_in * 1000)

      state.value.isAuthenticated = true
    } catch (err: any) {
      logout()
      throw err
    }
  }

  async function ensureTokenValidity(): Promise<void> {
    if (!accessToken.value || isTokenExpired.value) {
      if (refreshToken.value) {
        await refresh()
      } else {
        logout()
      }
    }
  }

  function logout(): void {
    accessToken.value = null
    refreshToken.value = null
    expiresIn.value = null
    state.value.isAuthenticated = false
    navigateTo('/login')
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
  }
}
