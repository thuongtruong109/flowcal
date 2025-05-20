<script setup lang="ts">
import { reactive, watchEffect } from "vue";
import OverView from "@/components/project/OverView.vue";
import ProjectCard from "@/pages/user/project/_components/ProjectCard.vue";
import { projectBoxColors } from "@/shared/color";
import Sort from "@/pages/user/project/_components/Sort.vue";
import ProjectService from "@/services/project";
import useAuthStore from "@/store/auth";
import { getIndex } from "@/utils/array";
import { getCurrentDate } from "@/helpers/date";
import { Icon } from "@iconify/vue";
import SearchBox from "@/pages/user/project/_components/SearchBox.vue";
import CreateProjectBtn from "@/pages/user/project/_components/CreateProjectBtn.vue";

const payload = reactive({
  access: "all",
  limit: 12,
  sort: "all",
  filter: "all",
});

const payget = reactive<any>({
  total: "",
  lastUpdated: "",
  projects: [],
});

const getAllProjects = async () => {
  const res = await ProjectService.getProjects(
    payload.access,
    payload.limit,
    payload.sort,
    payload.filter
  );
  if (res) {
    payget.projects = res.data.projects;
    payget.total = res.data.total;
    payget.lastUpdated = res.data.lastUpdated[0]?.updatedAt;
  }
};

watchEffect(() => {
  getAllProjects();
});
</script>

<template>
  <section
    class="text-gray-600 p-4 bg-white dark:bg-gray-800 rounded-xl w-full h-full"
  >
    <div class="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">
      <SearchBox />
      <div class="flex items-center gap-2">
        <Sort />
        <button class="hover:bg-gray-100 dark:hover:bg-gray-600 rounded-full p-2">
          <Icon icon="proicons:info" width="20" height="20" />
        </button>
      </div>
    </div>
    <!-- <div class="flex justify-between">
      <h5 class="text-sm font-medium italic">
        Last updated: {{ getCurrentDate(payget.lastUpdated).year }}
        {{ getCurrentDate(payget.lastUpdated).monthName }},
        {{ getCurrentDate(payget.lastUpdated).day }}
      </h5>
    </div> -->
    <!-- <OverView :total="payget.total" /> -->
    <div class="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
      <CreateProjectBtn />
      <ProjectCard
        v-for="(project, i) in payget.projects"
        :key="project._id"
        :bgColor="`${projectBoxColors[getIndex(projectBoxColors, i)].bg}`"
        :textColor="`${projectBoxColors[getIndex(projectBoxColors, i)].progress}`"
        :project="project"
        @favorited="getAllProjects"
      />
    </div>
  </section>
</template>
