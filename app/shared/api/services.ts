import { useFetch } from 'nuxt/app' // Nuxt built-in

export const authRepository = {
  async getCode(params: any) {
    return useFetch('/oauth/authorize/', {
      method: 'POST',
      body: params,
      baseURL: import.meta.env.VITE_BASE_URL_SSO,
    })
  },
  // Другие endpoints
}

export const suppliersRepository = {
  async getSuppliers() {
    return useFetch('/suppliers/', {
      baseURL: import.meta.env.VITE_BASE_URL_API,
    })
  },
  // Для проекта поставщиков
}
