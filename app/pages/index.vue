<script lang="ts" setup>
import { useAuth } from '@/shared/composables/useAuth'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useToast } from '@/shared/composables/useToast'
import { useUserStore } from '@/entities/user/model/user.store'

const auth = useAuth()
const toast = useToast()
const userStore = useUserStore()
const expiresIn = auth.expiresIn

const isRefreshing = ref(false)

onMounted(async () => {
  if (auth.isAuthenticated.value) {
    await userStore.fetchUser()
  }
})

const remainingSeconds = ref(0)

const timerDisplay = computed(() => {
  if (remainingSeconds.value <= 0) return '00:00'

  const min = Math.floor(remainingSeconds.value / 60)
  const sec = remainingSeconds.value % 60

  return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
})

const timerColor = computed(() => {
  if (remainingSeconds.value <= 0) return 'text-red-500 font-bold'
  if (remainingSeconds.value <= 300) return 'text-orange-400 animate-pulse'
  return 'text-green-400'
})

const isAuthenticated = computed(() => auth.isAuthenticated.value)

const currentLocalTime = ref('')

const expiresLocalString = computed(() => {
  if (!expiresIn.value) return '—'
  return new Date(expiresIn.value).toLocaleString()
})

let timerInterval: number | null = null

function updateTimes() {
  const expires = expiresIn.value ?? 0
  const now = Date.now()
  remainingSeconds.value = Math.max(0, Math.floor((expires - now) / 1000))

  currentLocalTime.value = new Date().toLocaleString()
}

function startTimer() {
  if (timerInterval) clearInterval(timerInterval)

  updateTimes()
  timerInterval = window.setInterval(updateTimes, 1000)
}

onMounted(startTimer)

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval)
})

watch(expiresIn, startTimer)

async function refreshToken() {
  if (isRefreshing.value) return

  isRefreshing.value = true

  try {
    await auth.refresh()
    toast.success('Токен успешно обновлён')
  } catch (err: any) {
    toast.error('Не удалось обновить токен. Выполнен выход.')
  } finally {
    isRefreshing.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-950 text-gray-100 p-8 flex flex-col items-center">
    <div class="w-full max-w-4xl">
      <h1 class="text-5xl font-bold mb-12 text-center text-indigo-400">
        Главная
      </h1>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-700 shadow-xl">
          <h2 class="text-xl font-semibold mb-3 text-gray-300">Статус</h2>
          <p :class="isAuthenticated ? 'text-green-400' : 'text-red-400'" class="text-3xl font-bold">
            {{ isAuthenticated ? 'Авторизован' : 'Не авторизован' }}
          </p>
        </div>

        <div class="bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-700 shadow-xl">
          <h2 class="text-xl font-semibold mb-3 text-gray-300">Истекает (ваша зона)</h2>
          <p class="text-2xl font-mono text-indigo-300">
            {{ expiresLocalString }}
          </p>
        </div>

        <div class="bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-700 shadow-xl">
          <h2 class="text-xl font-semibold mb-3 text-gray-300">Сейчас</h2>
          <p class="text-2xl font-mono text-cyan-300">
            {{ currentLocalTime }}
          </p>
        </div>

        <div class="bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-700 shadow-xl">
          <h2 class="text-xl font-semibold mb-3 text-gray-300">Осталось</h2>
          <p :class="timerColor" class="text-5xl font-mono font-bold tracking-widest">
            {{ timerDisplay }}
          </p>
          <p v-if="remainingSeconds <= 0" class="text-red-400 mt-2 text-lg font-medium">
            Токен истёк
          </p>
        </div>
      </div>

      <div class="mb-12 text-center">
        <div v-if="userStore.isLoading" class="text-gray-400">Загрузка профиля...</div>
        <div v-else-if="userStore.error" class="text-red-400">{{ userStore.error }}</div>
        <div v-else-if="userStore.user" class="space-y-2">
          <p class="text-3xl font-semibold">
            Привет, {{ userStore.fullName }}!
          </p>
          <p class="text-lg text-gray-300">
            Телефон: {{ userStore.phone }}
          </p>
          <p class="text-lg text-indigo-300">
            Роль: {{ userStore.role }}
          </p>
        </div>
        <div v-else class="text-gray-400">
          Пользователь не загружен
        </div>
      </div>

      <div class="mt-12 flex flex-col sm:flex-row gap-6 justify-center">
        <button
          :disabled="!isAuthenticated || isRefreshing"
          class="px-10 py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white text-xl font-semibold rounded-xl transition-all shadow-lg hover:shadow-indigo-500/30 flex items-center justify-center gap-3 min-w-[220px]"
          @click="refreshToken"
        >
          <span v-if="isRefreshing" class="animate-spin">↻</span>
          {{ isRefreshing ? 'Обновляется...' : 'Обновить токен' }}
        </button>

        <button
          :disabled="!isAuthenticated"
          class="px-10 py-4 bg-red-600/80 hover:bg-red-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white text-xl font-semibold rounded-xl transition-all shadow-lg hover:shadow-red-500/30 min-w-[220px]"
          @click="auth.logout()"
        >
          Выйти
        </button>
      </div>
    </div>
  </div>
</template>
