<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { Icon } from "@iconify/vue";
import Modal from "@/components/Modal.vue";
import { Switch } from "@headlessui/vue";
import ProjectService from "@/services/project";

const router = useRouter();

const isOpen = ref<boolean>(false);
function closeModal(): void {
  isOpen.value = false;
}
function openModal(): void {
  isOpen.value = true;
}

const payload = reactive({
  categoryId: "",
  name: "",
  description: "",
  access: true,
});

const checkInput = computed(
  () => payload.name.length > 0 && payload.categoryId !== ""
);

const templates = reactive([
  {
    id: "1",
    type: "Todo",
    desc: "Organize your daily tasks",
    icon: "material-symbols:format-list-bulleted-rounded",
  },
  {
    id: "2",
    type: "Kanban",
    desc: "Visualize your pipeline",
    icon: "ci:trello",
  },
  {
    id: "3",
    type: "Dashboard",
    desc: "Visualize your collection data",
    icon: "material-symbols:space-dashboard-rounded",
  },
]);

const handleAccess = computed(() => {
  return payload.access ? "public" : "private";
});

const handleCreateProject = async () => {
  const res = await ProjectService.createProject({
    name: payload.name,
    description: payload.description,
    access: handleAccess.value,
    categoryId: payload.categoryId,
  });
  closeModal();
  router.push(`/projects/${res.data._id}`);
};
</script>

<template>
  <Modal :status="isOpen" @close="closeModal">
    <template #openBtn>
      <button
        type="button"
        @click="openModal"
        class="w-full h-full flex items-center dark:text-white font-medium rounded-lg text-sm border-2 border-dashed bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 p-2 justify-center group cursor-pointer group"
      >
        <Icon icon="material-symbols:add" width="20" class="w-6 group-hover:rotate-90 duration-200" />
        <span>New</span>
      </button>
    </template>
    <template #title>
      <h3 class="text-xl">Create new project</h3>
    </template>
    <template #closeBtn>
      <button
        type="button"
        @click="closeModal"
        class="hover:rotate-90 duration-200 ease-linear inline-flex"
      >
        <Icon icon="mdi:close" width="20" />
      </button>
    </template>
    <template #content>
        <form class="flex flex-col items-start">
          <label
            for="project-name"
            class="text-xs font-medium text-gray-400 dark:text-gray-600 flex items-center mb-1"
            ><Icon icon="fluent:slide-text-16-regular" width="14" height="14" class="font-medium mr-1" /> Name</label
          >
          <input
            type="text"
            v-model="payload.name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block min-w-full w-80 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500"
            placeholder="Enter project name"
            required
          />
          <label
            for="project-description"
            class="text-xs font-medium text-gray-400 dark:text-gray-600 flex items-center mt-4 mb-1"
            ><Icon icon="line-md:pencil" width="12" height="12" class="font-medium mr-1" /> Description</label
          >
          <textarea
            v-model="payload.description"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500"
            placeholder="Enter project description"
            rows="3"
          />
        </form>
    </template>
    <template #doneBtn>
      <div class="mt-4 flex justify-between items-center">
        <div class="text-xs font-medium flex gap-2 items-center">
          <Switch
            v-model="payload.access"
            :class="payload.access ? 'bg-black/30' : 'bg-sky-600'"
            class="relative inline-flex w-10 h-5 shrink-0 cursor-pointer shadow-lg rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            <span
              aria-hidden="true"
              :class="payload.access ? 'translate-x-0' : 'translate-x-5'"
              class="pointer-events-none inline-block w-4 h-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
            />
          </Switch>
          <span v-html="payload.access ? 'public' : 'private'"></span>
        </div>

        <button
          type="button"
          class="h-min inline-flex justify-center items-start rounded-md border border-transparent px-4 py-2 text-sm font-medium text-blue-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          :class="
            checkInput
              ? 'opacity-100 bg-blue-100 hover:bg-blue-200 cursor-pointer'
              : 'opacity-50 bg-blue-100 cursor-not-allowed'
          "
          @click="handleCreateProject"
          :disabled="checkInput === false"
        >
          <Icon
            icon="mingcute:firework-line"
            width="19"
            class="mr-1"
          /><span>Create</span>
        </button>
      </div>
    </template>
  </Modal>
</template>
