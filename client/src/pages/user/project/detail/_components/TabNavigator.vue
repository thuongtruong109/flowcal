<script setup lang="ts">
import { Icon } from "@iconify/vue";

const tabs = [
    {
        name: "Kanban",
        icon: "ic:round-dashboard",
        size: 18,
        href: "",
    },
    {
        name: "Todo",
        icon: "pajamas:status",
        size: 15,
        href: "",
    },
    {
        name: "Note",
        icon: "mingcute:pencil-2-ai-fill",
        size: 18,
        href: "",
    },
];

</script>

<template>
    <ul class="flex flex-wrap space-x-4 -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700 pb-1">
        <li v-for="tab in tabs" :key="tab.name">
            <a
                :href="tab.href"
                class="inline-flex items-center justify-center px-2 py-1 rounded group relative"
                :class="tab.name === 'Kanban' ? 'text-sky-600 dark:text-sky-500 dark:ring-sky-500 bg-sky-500/20' : 'hover:text-gray-600 dark:hover:text-gray-300'"
                aria-current="page"
            >
                <Icon :icon="tab.icon" :width="tab.size" :height="tab.size" />
                <span class="ml-1">{{ tab.name }}</span>
                <span
                    class="absolute inline-flex -bottom-1 w-full h-px bg-sky-500 transition-all duration-300 ease-in-out"
                    v-if="tab.name === 'Kanban'"
                ></span>
            </a>
        </li>
    </ul>
</template>