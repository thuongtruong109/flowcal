<script setup>
import { ref } from "vue";
import {
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import { Icon } from "@iconify/vue";

const options = [
  { name: "Latest" },
  { name: "Oldest" },
  { name: "A-Z" },
  { name: "Reverse" },
];
const selectedOption = ref(options[0]);
</script>

<template>
  <Listbox v-model="selectedOption" class="max-w-40">
    <div class="relative">
      <ListboxButton
        class="w-fit flex items-center border hover:bg-slate-100 px-2 py-1 rounded-lg space-x-1"
      >
        <Icon icon="basil:sort-outline" width="22" height="22" />
        <span class="inline-flex truncate text-sm font-semibold">{{
          selectedOption.name
        }}</span>
      </ListboxButton>

      <transition
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="absolute mt-1 right-0 max-h-60 w-max overflow-auto rounded-lg bg-white p-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        >
          <ListboxOption
            v-slot="{ active, selected }"
            v-for="option in options"
            :key="option.name"
            :value="option"
            as="template"
          >
            <li
              :class="[
                active ? 'bg-green-100 text-green-900' : 'text-gray-900',
                'relative cursor-pointer select-none py-1 pl-6 pr-2 rounded',
              ]"
            >
              <span
                v-if="selected"
                class="absolute inset-y-0 left-0 flex items-center text-green-600"
              >
                <Icon icon="material-symbols:check-small-rounded" width="22" />
              </span>
              <span
                :class="[
                  selected ? 'font-semibold text-green-600' : 'font-normal',
                  'block truncate',
                ]"
                >{{ option.name }}</span
              >
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>
