<script setup>
import Brand from "@/components/header/Brand.vue";
import LeftNavigation from "@/components/LeftNavigation.vue";
import DarkMode from "@/components/header/DarkMode.vue";
import Avatar from "@/components/header/Avatar.vue";
import Footer from "@/components/Footer.vue";
</script>

<template>
  <main
    class="home_page px-3 pt-3 bg-[#F3F6FD] dark:bg-gray-900 relative overflow-x-hidden"
  >
    <div class="flex h-min min-h-[calc(100%-50px)] relative w-full mb-4">
      <LeftNavigation class="h-full sticky w-10" />
      <div class="flex flex-col items-center w-full ml-5">
        <div class="flex justify-end items-center item mb-5 w-full">
          <div class="flex items-end gap-5">
            <DarkMode />
            <Avatar />
          </div>
        </div>
        <router-view></router-view>
      </div>
    </div>
    <Footer />
  </main>
</template>
