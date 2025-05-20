<script setup>
import { Icon } from "@iconify/vue";
</script>

<template>
    <div>
        <button
          type="button"
          class="text-gray-900 bg-white hover:bg-blue-100 border border-gray-200 focus:ring-2 focus:outline-none focus:ring-blue-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-end dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2"
          >
          <Icon icon="logos:facebook" width="18" class="mr-1.5" />
          <span>Facebook</span>
        </button>
        <button
          type="button"
          class="text-gray-900 bg-white hover:bg-red-100 border border-gray-200 focus:ring-2 focus:outline-none focus:ring-red-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-end dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2"
          >
          <Icon icon="devicon:google" width="18" class="mr-1.5" />
          <span>Google</span>
        </button>
        <button
          type="button"
          class="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-2 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-end dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2"
          >
          <Icon icon="mdi:github" width="20" class="mr-1.5" />
          <span>Github</span>
        </button>
    </div>
</template>
