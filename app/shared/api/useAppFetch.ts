import { useAuth } from '@/shared/composables/useAuth'

export function useAppFetch() {


  async function makeFetch<T>(
    url: string,
    options: any = {},
    skipAuthCheck = false,
    customBaseURL?: string,
  ): Promise<T> {
    const config = useRuntimeConfig()
    const baseURL = config.public.baseURL
    const base = customBaseURL ?? baseURL
    const fullUrl = url.startsWith('http') ? url : `${base}${url.startsWith('/') ? '' : '/'}${url}`

    const auth = useAuth()

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

      // if (error.value) {
      //   const serverError = error.value.data?.status?.message
      //     || error.value.data?.message
      //     || error.value.message
      //     || `Ошибка сервера (${error.value.status})`
      //
      //   throw new Error(serverError)
      // }

      if (error.value) {
        console.warn('[useAppFetch] Ошибка ответа:', error.value.status, error.value.data)
      }

      return data.value as T
    } catch (err: any) {
      console.error('[useAppFetch]', err)
      throw err
    }
  }

  return { makeFetch }
}
