<script lang="ts" setup>
import { Check } from '@element-plus/icons-vue'
</script>

<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <h1 class="text-3xl font-bold text-primary mb-6">UnoCSS + Element Plus</h1>

    <!-- Element Plus -->
    <el-button class="mb-6" type="primary"> Кнопка Element Plus</el-button>

    <el-icon class="text-3xl text-success">
      <Check />
    </el-icon>

    <!-- UnoCSS -->
    <div class="card mt-8">
      <h2 class="text-xl font-semibold mb-4">Это карточка на UnoCSS</h2>
      <p class="text-gray-600">bg-white, rounded-xl, shadow-md, p-6 — всё от UnoCSS</p>
    </div>

    <button class="btn btn-primary mt-6">Кнопка с shortcut</button>
  </div>
</template>
