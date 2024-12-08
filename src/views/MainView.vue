<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import Cookies from "js-cookie";

import MainLayout from "@/layouts/MainLayout.vue";

import DateHeader from "@/components/DateHeader.vue";
import NowPlaying from "@/components/NowPlaying.vue";
import BigDate from "@/components/BigDate.vue";
import FullDate from "@/components/FullDate.vue";
import EventIcon from "@/components/EventIcon.vue";
import SecondBar from "@/components/SecondBar.vue";
import WeatherGrid from "@/components/WeatherGrid.vue";

const router = useRouter();
if (!Cookies.get("setupComplete")) {
  router.push({
    name: "setup",
  });
}

const data = reactive({
  date: new Date(),
});

window.setInterval(() => {
  data.date = new Date();
}, 1000);
</script>

<template>
  <MainLayout>
    <div class="text-7xl">
      <div class="flex justify-between -mb-[40px]">
        <DateHeader :date="data.date" />
        <NowPlaying :date="data.date" />
      </div>

      <BigDate :date="data.date" />

      <div class="flex place-items-center place-content-between w-full">
        <FullDate :date="data.date" />
        <EventIcon :date="data.date" />
      </div>
      <hr class="border-2 border-black my-2" />
      <SecondBar :date="data.date" />
    </div>

    <div>
      <hr class="border-2 border-black mb-5 w-full" />
      <WeatherGrid class="w-full" :date="data.date" />
    </div>
  </MainLayout>
</template>
