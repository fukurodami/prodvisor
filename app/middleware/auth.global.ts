import { defineNuxtRouteMiddleware } from 'nuxt/app'
import type { RouteLocationNormalizedLoaded } from 'vue-router'

export default defineNuxtRouteMiddleware(async (to: RouteLocationNormalizedLoaded) => {
  const publicPages = ['/login', '/register']
  if (publicPages.includes(to.path)) {
    return
  }

  const token = useCookie('access_token')

  // Если после проверки токена нет — на логин
  if (!token.value && to.name !== 'login') {
    const redirect = encodeURIComponent(to.fullPath)
    return navigateTo(`/login?redirect=${redirect}`, { redirectCode: 302 })
  }
})
