// shared/api/useAppFetch.ts
import { ref, toRefs } from 'vue'
import { useMessage } from '@shared/composables/useMessage' // ← подключаем твой composable

interface AppFetchState {
  pending: boolean
  error: string | null
  rawError: any | null
}

export function useAppFetch() {
  const state = ref<AppFetchState>({
    pending: false,
    error: null,
    rawError: null,
  })

  const message = useMessage()  // ← экземпляр

  async function makeFetch<T>(requestFn: () => Promise<T>): Promise<T | undefined> {
    state.value.error = null
    state.value.rawError = null
    state.value.pending = true

    try {
      const response = await requestFn()
      return response
    } catch (err: any) {
      if (import.meta.env.DEV) {
        console.error('Error in useAppFetch:', err)
      }

      let errorMessage = 'Неизвестная ошибка'
      let statusCode = 500

      if (err.response) { // предполагаем axios-подобную структуру
        statusCode = err.response.status || 500
        errorMessage = err.response.data?.message || err.response.data || err.message
        state.value.rawError = err.response.data || err

        // Глобальный перехват 401
        if (statusCode === 401) {
          message.error('Сессия истекла. Пожалуйста, войдите заново.')
          // Здесь позже добавим редирект или вызов logout из auth store
          // navigateTo('/login')
        }
      } else {
        errorMessage = err.message || 'Неизвестная ошибка'
        state.value.rawError = err
      }

      state.value.error = errorMessage

      // Можно добавить глобальный toast на любую ошибку, если хочешь
      // message.error(errorMessage)

      return undefined
    } finally {
      state.value.pending = false
    }
  }

  return {
    ...toRefs(state),
    makeFetch,
  }
}
