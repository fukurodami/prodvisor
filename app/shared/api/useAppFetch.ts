import { useAuth } from '@/shared/composables/useAuth'

export function useAppFetch() {
  const config = useRuntimeConfig()
  const baseURL = config.public.baseURL

  async function makeFetch<T>(
    url: string,
    options: any = {},
    skipAuthCheck = false,
    customBaseURL?: string,
  ): Promise<T> {
    const auth = useAuth()
    const base = customBaseURL ?? baseURL
    const fullUrl = url.startsWith('http') ? url : `${base}${url.startsWith('/') ? '' : '/'}${url}`

    if (!skipAuthCheck) {
      await auth.ensureTokenValidity()

      if (!auth.isAuthenticated.value) {
        throw new Error('Не авторизован')
      }
    }

    try {
      const { data, error } = await useFetch<T>(fullUrl, {
        ...options,
        onRequest({ options }) {
          const token = auth.accessToken.value
          if (token) {
            (options.headers as Record<string, string> | any) = {
              ...(options.headers ?? {}),
              Authorization: `Bearer ${token}`,
            }
          }
        },
        onResponseError({ response }) {
          if (response.status === 401) {
            auth.logout()
          }
        },
      })

      if (error.value) {
        const serverError = error.value.data?.status?.message
          || error.value.data?.message
          || error.value.message
          || `Ошибка сервера (${error.value.status})`

        throw new Error(serverError)
      }

      if (!data.value) {
        throw new Error('Сервер не вернул данные')
      }

      return data.value as T
    } catch (err: any) {
      console.error('[useAppFetch]', err)
      throw err
    }
  }

  return { makeFetch }
}
