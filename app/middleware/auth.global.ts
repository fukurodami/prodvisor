import { defineNuxtRouteMiddleware } from 'nuxt/app'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { useAuth } from '@/shared/composables/useAuth'

export default defineNuxtRouteMiddleware(async (to: RouteLocationNormalizedLoaded) => {
  if (process.server) return

  if (['/login', '/register'].includes(to.path)) return

  const auth = useAuth()
  await auth.ensureTokenValidity()
  
  if (!auth.isAuthenticated.value) {
    const redirect = encodeURIComponent(to.fullPath)
    return navigateTo(`/login?redirect=${redirect}`, { redirectCode: 302 })
  }
})
