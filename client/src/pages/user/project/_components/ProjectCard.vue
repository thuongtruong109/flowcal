<script setup lang="ts">
import { useRouter } from "vue-router";
import { Icon } from "@iconify/vue";
import ProjectService from "@/services/project";
import { getCurrentDate } from "@/helpers/date";
const router = useRouter();

defineProps<{
  bgColor: string;
  textColor: string;
  project: any;
}>();

const emit = defineEmits<{
  (event: "favorited"): void;
}>();

const openProject = (projectId: string) => {
  router.push(`/projects/${projectId}`);
};

const onFavorite = async (projectId: string, isFavorite: boolean) => {
  const res = await ProjectService.updateProject(projectId, {
    isFavorite: !isFavorite,
  });
  res && emit("favorited");
};
</script>

<template>
  <div
    class="rounded-lg border-2 border-transparent p-3"
    :class="`bg-[${bgColor}] hover:border-[${textColor}]`"
  >
    <div class="flex justify-between items-center">
      <p class="text-xs text-gray-500">
        {{ getCurrentDate(project.createdAt).monthName }}
        {{ getCurrentDate(project.createdAt).day }},
        {{ getCurrentDate(project.createdAt).year }}
      </p>
      <div
        @click="onFavorite(project._id, project.isFavorite)"
        class="cursor-pointer"
      >
        <Icon
          icon="twemoji:star"
          width="20"
          v-if="project.isFavorite"
        />
        <Icon icon="ph:star-thin" width="20" v-else />
      </div>
    </div>
    <h3
      class="text-lg font-semibold text-center mt-2 cursor-pointer hover:underline"
      :class="`hover:text-[${textColor}]`"
      @click="openProject(project._id)"
    >
      {{ project.name }}
    </h3>
  </div>
</template>
