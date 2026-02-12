<!--&lt;!&ndash; features/auth/ui/AuthMethodSwitcher.vue &ndash;&gt;-->
<!--<script lang="ts" setup>-->
<!--const props = defineProps<{-->
<!--  isPasswordLogin: boolean;-->
<!--}>()-->

<!--const emit = defineEmits<{-->
<!--  (e: 'toggle', isPassword: boolean): void;-->
<!--}>()-->
<!--</script>-->

<!--<template>-->
<!--  <el-tabs v-model="activeTab" type="card" @tab-click="handleTabClick">-->
<!--    <el-tab-pane label="По номеру телефона" name="phone" />-->
<!--    <el-tab-pane label="Логин и пароль" name="password" />-->
<!--  </el-tabs>-->
<!--</template>-->

<!--<script lang="ts">-->
<!--export default {-->
<!--  computed: {-->
<!--    activeTab: {-->
<!--      get() {-->
<!--        return this.isPasswordLogin ? 'password' : 'phone'-->
<!--      },-->
<!--      set(val: string) {-->
<!--        this.$emit('toggle', val === 'password')-->
<!--      },-->
<!--    },-->
<!--  },-->
<!--  methods: {-->
<!--    handleTabClick(tab: any) {-->
<!--      this.$emit('toggle', tab.paneName === 'password')-->
<!--    },-->
<!--  },-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->
<!--/* можно кастомизировать табы под дизайн */-->
<!--</style>-->
