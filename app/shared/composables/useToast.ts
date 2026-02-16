import { useToast as primevueToast } from 'primevue/usetoast'

export interface AppToast {
  success: (msg: string, summary?: string) => void
  error: (msg: string, summary?: string) => void
  warning: (msg: string, summary?: string) => void
  info: (msg: string, summary?: string) => void
}

export function useToast() {
  const toast = primevueToast()

  return {
    success: (msg: string, summary = 'Успех') => toast.add({ severity: 'success', summary, detail: msg, life: 3000 }),
    error: (msg: string, summary = 'Ошибка') => toast.add({ severity: 'error', summary, detail: msg, life: 5000 }),
    warning: (msg: string, summary = 'Предупреждение') => toast.add({
      severity: 'warn',
      summary,
      detail: msg,
      life: 4000,
    }),
    info: (msg: string, summary = 'Информация') => toast.add({ severity: 'info', summary, detail: msg, life: 3000 }),
  }
}
