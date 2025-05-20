<script setup>
import { reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { Icon } from "@iconify/vue";

import AuthService from "@/services/auth";
import { testEmail, testPassword } from "@/utils/regrex";
import OAuth from "./_components/OAuth.vue";

const router = useRouter();

const payload = reactive({
  username: "",
  email: "",
  password: "",
});

const checkElement = reactive({
  checkUsername: "",
  checkEmail: "",
  checkPassword: "",
  checkTerms: false,
});

const validateUsername = computed(() => {
  if (payload.username.length > 0) {
    if (payload.username !== payload.username.toLowerCase()) {
      checkElement.checkUsername = "Username must be lowercase";
      return false;
    }
    if (
      payload.username.split("").length > 0 &&
      payload.username.split("").length <= 3
    ) {
      checkElement.checkUsername = "Username must be at least 3 characters";
      return false;
    } else {
      checkElement.checkUsername = "";
      return true;
    }
  } else {
    checkElement.checkUsername = "Username is required";
    return false;
  }
});

const validateEmail = computed(() => {
  if (payload.email.length > 0) {
    if (!testEmail(payload.email)) {
      checkElement.checkEmail = "Email is invalid!";
      return false;
    } else {
      checkElement.checkEmail = "";
      return true;
    }
  } else {
    checkElement.checkEmail = "Email is required";
    return false;
  }
});

const validatePassword = computed(() => {
  if (payload.password.length > 0) {
    if (!testPassword(payload.password)) {
      checkElement.checkPassword =
        "Password must be 8-20 characters, conclude (uppercase - lowercase - number - special) characters!";
      return false;
    } else {
      checkElement.checkPassword = "";
      return true;
    }
  } else {
    checkElement.checkPassword = "Password is required";
    return false;
  }
});

const isValidate = computed(
  () =>
    validateUsername.value &&
    validateEmail.value &&
    validatePassword.value &&
    checkElement.checkTerms
);

const handleSignup = async () => {
  if (isValidate.value) {
    await AuthService.signup(payload);
    router.push({ path: "/auth/signin" });
  }
};
</script>

<template>
  <section
    class="bg-white rounded-xl shadow-lg flex flex-col items-center justify-center space-y-4 p-6 mx-auto w-fit md:w-1/2 lg:w-1/3 xl:w-1/4 h-fit"
  >
      <h2 class="text-2xl font-bold text-sky-800 text-center">Register to Flowcal</h2>
      <p class="text-xs text-gray-400 text-center">
        Join us and start your journey
      </p>

      <form @submit.prevent="handleSignup" class="grid grid-cols-1 gap-9 w-full">
        <div class="relative">
          <label for="success" class="flex items-center space-x-1 mb-2 text-sm font-semibold">
            <Icon icon="bx:user" width="13" height="13" />
            <span>Username</span>
          </label>
          <input
            type="text"
            class="border border-slate-300 text-sm font-semibold placeholder:font-normal rounded-lg w-full p-2 dark:bg-gray-700"
            placeholder="Enter your username"
            :class="
              validateUsername
                ? 'bg-green-50 border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 focus:ring-green-500 focus:border-green-500 dark:border-green-500'
                : 'bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'
            "
            v-model="payload.username"
            @input="validateUsername"
          />
          <p
            class="mt-1 text-xs absolute"
            :class="
              validateUsername
                ? 'text-green-600 dark:text-green-500'
                : 'text-red-600 dark:text-red-500'
            "
          >
            {{ checkElement.checkUsername }}
          </p>
        </div>

        <div class="relative">
          <label for="success" class="flex items-center space-x-1 mb-2 text-sm font-semibold">
            <Icon icon="mage:email" width="13" height="13" />
            <span>Email</span>
          </label>
          <input
            type="text"
            class="border border-slate-300 text-sm font-semibold placeholder:font-normal rounded-lg w-full p-2 dark:bg-gray-700"
            placeholder="Enter your email"
            :class="
              validateEmail
                ? 'bg-green-50 border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 focus:ring-green-500 focus:border-green-500 dark:border-green-500'
                : 'bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'
            "
            v-model="payload.email"
            @input="validateEmail"
          />
          <p
            class="mt-1 text-xs absolute"
            :class="
              validateEmail
                ? 'text-green-600 dark:text-green-500'
                : 'text-red-600 dark:text-red-500'
            "
          >
            {{ checkElement.checkEmail }}
          </p>
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
            :class="
              validatePassword
                ? 'bg-green-50 border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 focus:ring-green-500 focus:border-green-500 dark:border-green-500'
                : 'bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'
            "
            v-model="payload.password"
            @input="validatePassword"
          />
          <p
            class="mt-1 text-xs absolute"
            :class="
              validatePassword
                ? 'text-green-600 dark:text-green-500'
                : 'text-red-600 dark:text-red-500'
            "
          >
            {{ checkElement.checkPassword }}
          </p>
        </div>

        <div class="flex items-center">
          <input
            id="link-checkbox"
            type="checkbox"
            v-model="checkElement.checkTerms"
            class="w-3 h-3 text-sky-600 bg-gray-100 rounded-sm border-gray-300 focus:ring-sky-500 dark:focus:ring-sky-600 dark:ring-offset-gray-800 focus:ring-1 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            for="link-checkbox"
            class="ml-2 text-xs font-medium text-gray-900 dark:text-gray-300"
            >I've read and agree with
            <a href="" class="text-sky-600 hover:underline">Terms of Services</a>
            and our
            <a href="" class="text-sky-600 hover:underline"> Privacy Policy</a></label
          >
        </div>

        <button
          type="button"
          class="w-full flex justify-center items-center space-x-1 text-white bg-black focus:outline-none shadow-xl font-medium rounded-lg text-sm px-4 py-2 text-center cursor-pointer"
          :class="
            isValidate
              ? 'focus:ring-4 hover:bg-gradient-to-br'
              : 'pointer-events-none cursor-not-allowed'
          "
          @click="handleSignup"
        >
          <Icon
            icon="tabler:arrows-join-2"
            height="22"
            width="22"
          />
          <span>Create</span>
        </button>
      </form>

      <span class="w-2/3 h-px bg-slate-200 mr-5"></span>

      <OAuth />

      <p class="text-sm">
        Already have an account? <router-link to="/auth/signin"  class="text-sky-600 hover:underline">Signin</router-link>
      </p>
  </section>
</template>
