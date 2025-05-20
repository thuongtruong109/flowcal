<script setup>
import { reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { Icon } from "@iconify/vue";

import AuthService from "@/services/auth";
import useAuthStore from "@/store/auth";
import OAuth from "./_components/OAuth.vue";

const router = useRouter();
const authStore = useAuthStore();

const payload = reactive({
  username: "",
  password: "",
});

const isValidate = computed(
  () => payload.username.length > 0 && payload.password.length > 0
);

const handleSignin = async () => {
  if (isValidate.value) {
    const res = await AuthService.signin(payload);
    if (res.data) {
      await authStore.login(res.data);
      router.push({ path: "/projects" });
    }
  }
};
</script>

<template>
  <section
    class="bg-white rounded-xl shadow-lg flex flex-col items-center justify-center space-y-4 p-6 mx-auto w-fit md:w-1/2 lg:w-1/3 xl:w-1/4 h-fit"
  >
    <h2 class="text-2xl font-bold text-sky-800 text-center">Login to Flowcal</h2>
    <p class="text-xs text-gray-400 text-center">
      Fill credentials to access your account
    </p>
    <form @submit.prevent="handleSignin" class="grid grid-cols-1 gap-5 w-full">
      <div class="relative">
        <label for="success" class="flex items-center space-x-1 mb-2 text-sm font-semibold">
          <Icon icon="bx:user" width="13" height="13" />
          <span>Username</span>
        </label>
        <input
          type="text"
          class="border border-slate-300 text-sm font-semibold placeholder:font-normal rounded-lg w-full p-2 dark:bg-gray-700"
          placeholder="Enter your username"
          v-model="payload.username"
        />
      </div>

      <div class="relative">
        <label for="success" class="flex items-center space-x-1 mb-2 text-sm font-semibold">
          <Icon icon="solar:lock-password-broken" width="13" height="13" />
          <span>Password</span>
        </label>
        <input
          type="text"
          class="border border-slate-300 text-sm font-semibold placeholder:font-normal rounded-lg w-full p-2 dark:bg-gray-700"
          placeholder="Enter your password"
          v-model="payload.password"
        />
      </div>

      <button
        type="button"
        class="w-full flex justify-center items-center space-x-1 text-white bg-black focus:outline-none shadow-xl font-medium rounded-lg text-sm px-4 py-2 text-center cursor-pointer"
        :class="
          isValidate
            ? 'focus:ring-2 hover:bg-gradient-to-br'
            : 'pointer-events-none cursor-not-allowed'
        "
        @click="handleSignin"
      >
        <Icon
          icon="stash:signin-alt"
          height="22"
          width="22"
        />
        <span>Login</span>
      </button>
    </form>

    <span class="w-2/3 h-px bg-slate-200 mr-5"></span>

    <OAuth />

    <p class="text-sm">
      Not have an account?
      <router-link to="/auth/signup" class="text-sky-600 hover:underline">Signup</router-link>
    </p>
  </section>
</template>
