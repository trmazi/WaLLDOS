<script setup>
import { reactive } from "vue";
import { mdiChevronRight } from "@mdi/js";

import MainLayout from "@/layouts/MainLayout.vue";

import BaseButton from "@/components/BaseButton.vue";

const data = reactive({
  date: new Date(),
});

window.setInterval(() => {
  data.date = new Date();
}, 1000);
</script>

<template>
  <MainLayout centered>
    <div class="text-7xl space-y-20">
      <h4 class="-ml-2">Welcome to</h4>
      <h1 class="levelFont text-[200pt] scale-y-110 scale-90f">WaLLDOS</h1>
    </div>

    <div class="text-7xl space-y-10 place-items-center justify-center">
      <h4>Let's get started</h4>
      <BaseButton
        :icon="mdiChevronRight"
        :icon-size="100"
        :small="false"
        rounded-full
        color="portalBlue"
        to="/"
      />
    </div>
  </MainLayout>
</template>
