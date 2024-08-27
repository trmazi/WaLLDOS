<script setup>
import { reactive } from "vue";

import DateHeader from "./components/DateHeader.vue";
import NowPlaying from "./components/NowPlaying.vue";
import BigDate from "./components/BigDate.vue";
import FullDate from "./components/FullDate.vue";
import EventIcon from "./components/EventIcon.vue";
import SecondBar from "./components/SecondBar.vue";
import WeatherGrid from "./components/WeatherGrid.vue";
import ApertureLogo from "./components/ApertureLogo.vue";

const data = reactive({
  date: new Date(),
});

window.setInterval(() => {
  data.date = new Date();
}, 1000);
</script>

<template>
  <div
    class="p-12 w-screen h-screen shadow-[inset_0_-2px_50px_rgba(0,0,0,0.9)] bg-red-100"
  >
    <div
      class="pl-[200px] pr-[23px] w-full h-full grid content-between justify-center"
    >
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
        <hr class="border-2 border-black" />
        <SecondBar :date="data.date" />
      </div>

      <div>
        <hr class="border-2 border-black mb-5" />
        <WeatherGrid :date="data.date" />

        <ApertureLogo />
      </div>
    </div>
  </div>
</template>
