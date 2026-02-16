import type { ToastServiceMethods } from 'primevue/toastservice'

export function showSuccess(toast: ToastServiceMethods, msg: string, summary = 'Успех') {
  toast.add({
    severity: 'success',
    summary,
    detail: msg,
    life: 3000,
  })
}

export function showError(toast: ToastServiceMethods, msg: string, summary = 'Ошибка') {
  toast.add({
    severity: 'error',
    summary,
    detail: msg,
    life: 5000,
  })
}

export function showWarning(toast: ToastServiceMethods, msg: string, summary = 'Предупреждение') {
  toast.add({
    severity: 'warn',
    summary,
    detail: msg,
    life: 4000,
  })
}

export function showInfo(toast: ToastServiceMethods, msg: string, summary = 'Информация') {
  toast.add({
    severity: 'info',
    summary,
    detail: msg,
    life: 3000,
  })
}
