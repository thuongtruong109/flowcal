<script setup lang="ts">
import { useRouter } from "vue-router";
import { INav } from "@/types";

const router = useRouter();
const matchRoute = (query: string): boolean =>
  router.currentRoute.value.path === query ? true : false;

const toggles: Array<INav> = [
  {
    path: "/projects",
    width: 42,
    title: "projects",
    img: "/img/project.png",
  },
  {
    path: "/events",
    width: 40,
    title: "events",
    img: "/img/event.png",
  },
  {
    path: "/settings",
    width: 42,
    title: "settings",
    img: "/img/setting.png",
  },
  {
    path: "/about",
    width: 42,
    title: "about",
    img: "/img/about.png",
  },
];

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  router.push({ path: "/auth/signin" });
};

const backHome = () => router.push({ name: "home" });
</script>

<template>
  <nav class="flex flex-col items-center justify-center space-y-6">
    <img
      src="@/assets/img/metasave_logo.png"
      alt="logo_img"
      class="max-w-7 max-h-7 cursor-pointer"
      @click="backHome"
    />

    <span class="h-px w-full bg-slate-200" />

    <router-link
      :to="toggle.path"
      v-for="(toggle, i) in toggles"
      :key="i"
      :title="toggle.title"
    >
      <button
        type="button"
        :title="toggle.title"
        class="cursor-pointer rounded-full p-2"
        :class="
          matchRoute(toggle.path)
            ? 'bg-white text-white dark:bg-gray-700 shadow-lg border'
            : 'hover:bg-gray-200 hover:shadow-xl'
        "
      >
        <img :src="toggle.img" :alt="toggle.title" :width="toggle.width" />
      </button>
    </router-link>

    <button
      type="button"
      @click="logout"
      title="logout"
      class="cursor-pointer rounded-full p-2 hover:bg-gray-200 hover:shadow-lg"
    >
      <img src="/img/profile.png" alt="logout" width="40" />
    </button>
  </nav>
</template>
