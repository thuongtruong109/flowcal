<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const backHome = () => router.push({ name: "home" });
</script>

<template>
  <div class="flex items-center cursor-pointer" @click="backHome">
    <!-- https://img.icons8.com/external-basicons-color-edtgraphics/50/external-Infinite-abstract-basicons-color-edtgraphics.png -->
    <img
      src="@/assets/img/metasave_logo.png"
      alt="logo_img"
      class="max-w-8 max-h-8"
    />
    <h1
      class="text-3xl font-bold ml-3 drop-shadow-md"
    >
      Flowcal
    </h1>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Winky+Rough:ital,wght@0,300..900;1,300..900&display=swap');
h1 {
  font-family: "Winky Rough", sans-serif;
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: normal;
  vertical-align: middle;
  letter-spacing: 1px !important;
   background: linear-gradient(90deg, #FFC00E, #7CB342);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text; /* For Firefox */
  color: transparent;
}
</style>
