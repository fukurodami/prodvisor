<template>
  <div class="auth-layout">
    <div class="auth-left">
      <div class="overlay"></div>
      <div class="content">
        <h1 class="logo">Prodvisor</h1>
        <p class="slogan">
          Аналитика продаж поставщиков в сетях<br />
          <span>Оборот, оборачиваемость, рекомендации</span>
        </p>
      </div>
    </div>

    <div class="auth-right">
      <div class="form-container">
        <Toast position="top-right" />
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Toast from 'primevue/toast'

defineOptions({
  name: 'AuthLayout',
})
</script>

<style scoped>
.auth-layout {
  display: flex;
  min-height: 100vh;
}

.auth-left {
  flex: 1;
  position: relative;
  background: url('https://images.unsplash.com/photo-1551288049-b1f4c8c4e0a9?auto=format&fit=crop&q=80&w=2000') center/cover no-repeat;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.65) 0%, rgba(0, 0, 0, 0.85) 100%);
}

.content {
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 2rem;
  max-width: 480px;
}

.logo {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  letter-spacing: -1px;
}

.slogan {
  font-size: 1.4rem;
  opacity: 0.9;
  line-height: 1.4;
}

.slogan span {
  display: block;
  font-size: 1.1rem;
  margin-top: 0.5rem;
  opacity: 0.8;
}

.auth-right {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0f0f17;
  padding: 2rem;
}

.form-container {
  width: 100%;
  max-width: 480px;
  background: rgba(20, 20, 35, 0.92);
  border-radius: 20px;
  padding: 2.5rem 2rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

@media (max-width: 768px) {
  .auth-layout {
    flex-direction: column;
  }

  .auth-left {
    flex: none;
    height: 40vh;
    min-height: 300px;
  }

  .auth-right {
    flex: 1;
    padding: 1.5rem;
  }

  .form-container {
    max-width: 100%;
    border-radius: 0;
    box-shadow: none;
    background: rgba(20, 20, 35, 0.95);
  }
}
</style>
