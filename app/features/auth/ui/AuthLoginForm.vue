<!--&lt;!&ndash; features/auth/ui/AuthLoginForm.vue &ndash;&gt;-->
<!--<script lang="ts" setup>-->
<!--const emit = defineEmits<{-->
<!--  (e: 'login', form: { login: string; password: string }): void;-->
<!--}>()-->

<!--const form = ref({-->
<!--  login: '',-->
<!--  password: '',-->
<!--})-->
<!--</script>-->

<!--<template>-->
<!--  <el-form :model="form" label-position="top">-->
<!--    <el-form-item label="Логин / Email">-->
<!--      <el-input v-model="form.login" placeholder="Введите логин или email" />-->
<!--    </el-form-item>-->

<!--    <el-form-item label="Пароль">-->
<!--      <el-input-->
<!--        v-model="form.password"-->
<!--        placeholder="Введите пароль"-->
<!--        show-password-->
<!--        type="password"-->
<!--      />-->
<!--    </el-form-item>-->

<!--    <el-form-item>-->
<!--      <el-button-->
<!--        style="width: 100%;"-->
<!--        type="primary"-->
<!--        @click="$emit('login', form)"-->
<!--      >-->
<!--        Войти-->
<!--      </el-button>-->
<!--    </el-form-item>-->
<!--  </el-form>-->
<!--</template>-->
