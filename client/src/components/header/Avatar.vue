<script setup>
import useAuthStore from "@/store/auth";

const authStore = useAuthStore();
</script>

<template>
  <router-link
    to="/profile"
    class="flex items-center space-x-4 font-medium dark:text-white cursor-pointer"
  >
    <img
      class="w-9 h-9 rounded-full"
      src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
      alt="avatar_img"
    />
    <!-- <p>{{ authStore.getUser.username }}</p> -->
  </router-link>
</template>
