import { defineStore } from 'pinia'
import { getSelf } from '@/features/auth/api/auth.api'
import type { SelfResponse } from '@/entities/user/types'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as SelfResponse['data'] | null,
    isLoading: false,
    error: null as string | null,
  }),

  getters: {
    fullName: (state) => {
      if (!state.user?.personal) return '—'
      return `${state.user.personal.first_name || ''} ${state.user.personal.last_name || ''}`.trim() || '—'
    },
    phone: (state) => state.user?.contact.phone || '—',
    role: (state) => state.user?.scope.role || '—',
    uuid: (state) => state.user?.uuid || '—',
  },

  actions: {
    async fetchUser() {
      if (this.user || this.isLoading) return

      this.isLoading = true
      this.error = null

      try {
        const response = await getSelf()
        if (response?.data) {
          this.user = response.data
        } else {
          throw new Error('Пользователь не найден')
        }
      } catch (err: any) {
        this.error = err.message || 'Ошибка загрузки профиля'
        console.error('[userStore] fetchUser:', err)
      } finally {
        this.isLoading = false
      }
    },

    clear() {
      this.user = null
      this.error = null
    },
  },
})
