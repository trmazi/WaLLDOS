<script setup>
import { reactive } from "vue";

import MainLayout from "@/layouts/MainLayout.vue";
import ApertureLogo from "@/components/ApertureLogo.vue";

const data = reactive({
  date: new Date(),
});

window.setInterval(() => {
  data.date = new Date();
}, 1000);
</script>

<template>
  <MainLayout>
    <div
      class="pr-[23px] w-full h-full grid content-between justify-center text-center"
    >
      <div class="text-7xl space-y-20">
        <h4 class="-ml-2">Welcome to</h4>
        <h1 class="levelFont text-[200pt] scale-y-110 scale-90f">WaLLDOS</h1>
      </div>

      <div class="text-7xl content-between">
        <h4>Let's get started.</h4>
      </div>

      <div>
        <ApertureLogo />
      </div>
    </div>
  </MainLayout>
</template>
