<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <main class="auth_layout min-h-screen max-h-screen h-screen overflow-hidden place-content-center">
    <router-view></router-view>
  </main>
</template>

<style scoped>
.auth_layout {
  background: linear-gradient(270deg, #e3ffe7 0%, #d9e7ff 100%);
}
</style>
