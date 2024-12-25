<script setup>
import { reactive, onMounted } from "vue";
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

if (!Cookies.get("settings")) {
  router.push({
    name: "setup",
  });
}

const data = reactive({
  date: new Date(),
});

function loadSettings() {
  const settings = Cookies.get("settings");
  data.settings = JSON.parse(settings);
}

onMounted(async () => {
  try {
    loadSettings();
  } catch (error) {
    console.log("Failed to load settings:", error);
  }
});

window.setInterval(() => {
  data.date = new Date();
}, 1000);

window.setInterval(() => {
  refreshCookies();
}, 86400000);

async function refreshCookies() {
  Cookies.set("setupComplete", true, {
    expires: 7,
    path: "",
    sameSite: "strict",
  });
  Cookies.set("settings", JSON.stringify(data.settings), {
    expires: 7,
    path: "",
    sameSite: "strict",
  });

  loadSettings();
}
</script>

<template>
  <MainLayout v-if="data.settings">
    <div class="text-7xl">
      <div class="flex justify-between -mb-[40px]">
        <DateHeader :date="data.date" />
        <NowPlaying
          v-if="data.settings?.use_volumio"
          :date="data.date"
          :volumio-name="data.settings?.volumio_name"
          :volumio-server="data.settings?.volumio_server"
        />
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
      <WeatherGrid
        class="w-full"
        :date="data.date"
        :api-key="data.settings?.owm_key"
        :location-key="data.settings?.geoapi_key"
      />
    </div>
  </MainLayout>
</template>
